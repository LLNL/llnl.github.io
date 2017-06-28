import sys
import os.path
import subprocess
import json
import re
import time

date = (time.strftime("%Y-%m-%d"))
datfilepath = "../github-data/orgsRepos.json"
allData = {}

# Check for and read existing data file
if not os.path.isfile(datfilepath) :
	print "No existing data file '"+datfilepath+"', will create new file."
else :
	print "Reading existing data file '"+datfilepath+"' ..."
	with open(datfilepath,"r") as q:
		data_raw = q.read()
	allData = json.loads(data_raw)
	print "File read!"

# Read input list of organizations of interest
filename = "../inputs/Orgs"
if not os.path.isfile(filename) :
	raise RuntimeError("Input '"+filename+"' does not exist.")
print "Reading input '"+filename+"' ..."
with open(filename,"r") as f_in:
	inputList = f_in.read()
orglist = inputList.split()
print "File read!"

# Read input list of independent repos of interest
filename = "../inputs/Repos"
if not os.path.isfile(filename) :
	raise RuntimeError("Input '"+filename+"' does not exist.")
print "Reading input '"+filename+"' ..."
with open(filename,"r") as f_in:
	inputList = f_in.read()
repolist = inputList.split()
print "File read!"

# Read pretty GraphQL queries into single line string variables
#	Main query
filename = "../queries/org-Repos.gql"
if not os.path.isfile(filename) :
	raise RuntimeError("Query '"+filename+"' does not exist.")
print "Reading '"+filename+"' ..."
with open(filename,"r") as q:
	query_raw = q.read().replace('\n',' ')
query_in = ' '.join(query_raw.split())
print "File read!"
#	Repo name query
filename = "../queries/repo-PrettyName.gql"
if not os.path.isfile(filename) :
	raise RuntimeError("Query '"+filename+"' does not exist.")
print "Reading '"+filename+"' ..."
with open(filename,"r") as q:
	query_raw = q.read().replace('\n',' ')
query_name_in = ' '.join(query_raw.split())
print "File read!"

# Retrieve authorization token
print "Reading authorization token..."
# TODO: Might not really want this at global scope
token = os.environ['GITHUB_API_TOKEN']
authhead = 'Authorization: bearer '+token
print "Token read!"

# Iterate through orgs of interest
print "Gathering data across multiple paginated queries..."
collective = {u'data': {}}
tab = "    "

for org in orglist:
	pageNum = 0
	print "\n'"+org+"'"
	print tab+"page "+str(pageNum)

	print tab+"Modifying query..."
	newqueryOrg = re.sub('ORGNAME', org, query_in)
	newquery = re.sub(' PGCURS', '', newqueryOrg)
	gitquery = json.dumps({'query': newquery})
	print tab+"Query ready!"

	# Actual query exchange
	print tab+"Sending query..."
	bashcurl = 'curl -H TMPauthhead -X POST -d TMPgitquery https://api.github.com/graphql'
	bashcurl_list = bashcurl.split()
	bashcurl_list[2] = authhead
	bashcurl_list[6] = gitquery
	result = subprocess.check_output(bashcurl_list)
	print tab+"Checking response..."
	if '"message": "Bad credentials"' in result :
		raise RuntimeError("Invalid response; Bad GitHub credentials")
	print tab+"Data recieved!"
	outObj = json.loads(result)
	# Check for null
	if not outObj["data"]["organization"] :
		print "'"+org+"' does not exist on GitHub."
		continue

	# Update collective data
	collective["data"][org] = outObj["data"]["organization"]

	# Paginate if needed
	hasNext = outObj["data"]["organization"]["repositories"]["pageInfo"]["hasNextPage"]
	while hasNext :
		pageNum += 1
		print tab+"page "+str(pageNum)
		cursor = outObj["data"]["organization"]["repositories"]["pageInfo"]["endCursor"]

		print tab+"Modifying query..."
		newquery = re.sub(' PGCURS', ', after:"'+cursor+'"', newqueryOrg)
		gitquery = json.dumps({'query': newquery})
		print tab+"Query ready!"

		# Actual query exchange
		print tab+"Sending query..."
		bashcurl = 'curl -H TMPauthhead -X POST -d TMPgitquery https://api.github.com/graphql'
		bashcurl_list = bashcurl.split()
		bashcurl_list[2] = authhead
		bashcurl_list[6] = gitquery
		result = subprocess.check_output(bashcurl_list)
		print "Checking response..."
		if '"message": "Bad credentials"' in result :
			raise RuntimeError("Invalid response; Bad GitHub credentials")
		print tab+"Data recieved!"

		# Update collective data
		outObj = json.loads(result)
		collective["data"][org]["repositories"]["nodes"].extend(outObj["data"]["organization"]["repositories"]["nodes"])
		hasNext = outObj["data"]["organization"]["repositories"]["pageInfo"]["hasNextPage"]

	del collective["data"][org]["repositories"]["pageInfo"]
	print "'"+org+"' Done!"

print "\nCollective data gathering complete!"

# Add independent repos
print "Adding independent repos..."
indysetup = {"name":"Other...","repositories":{"totalCount":0,"nodes":[]}}
indynodes = []

for repo in repolist :
	r = repo.split("/")
	print tab+"Modifying query..."
	newqueryN = re.sub('OWNNAME', r[0], query_name_in)
	newquery = re.sub('REPONAME', r[1], newqueryN)
	gitquery = json.dumps({'query': newquery})
	print tab+"Query ready!"

	# Actual query exchange
	print tab+"Sending query..."
	bashcurl = 'curl -H TMPauthhead -X POST -d TMPgitquery https://api.github.com/graphql'
	bashcurl_list = bashcurl.split()
	bashcurl_list[2] = authhead
	bashcurl_list[6] = gitquery
	result = subprocess.check_output(bashcurl_list)
	print tab+"Checking response..."
	if '"message": "Bad credentials"' in result :
		raise RuntimeError("Invalid response; Bad GitHub credentials")
	print tab+"Data recieved!"
	outObj = json.loads(result)
	# Check for null
	if not outObj["data"]["repository"] :
		print tab+"'"+repo+"' does not exist on GitHub."
		continue
	indynodes.append(outObj["data"]["repository"])

indysetup["repositories"]["nodes"] = indynodes
indysetup["repositories"]["totalCount"] = len(indynodes)
collective["data"][""] = indysetup
print "Independent repos added!"

# Combine new data with existing data
allData[date] = collective["data"]
allDataString = json.dumps(allData)

# Write output file
print "\nWriting file '"+datfilepath+"'"
with open(datfilepath,"w") as fileout:
	fileout.write(allDataString)
print "Wrote file!"

print "\nDone!\n"
