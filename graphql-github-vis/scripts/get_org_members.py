import os
import subprocess
import json
import re
import time

date = (time.strftime("%Y-%m-%d"))
datfilepath = "../github-data/orgsMembers.json"
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

# Read pretty GraphQL query into single line string variable
filename = "../queries/org-Members.gql"
if not os.path.isfile(filename) :
	raise RuntimeError("Query '"+filename+"' does not exist.")
print "Reading query '"+filename+"' ..."
with open(filename,"r") as q:
	query_raw = q.read().replace('\n',' ')
query_in = ' '.join(query_raw.split())
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
	print "Checking response..."
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
	hasNext = outObj["data"]["organization"]["members"]["pageInfo"]["hasNextPage"]
	while hasNext :
		pageNum += 1
		print tab+"page "+str(pageNum)
		cursor = outObj["data"]["organization"]["members"]["pageInfo"]["endCursor"]

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
		print tab+"Checking response..."
		if '"message": "Bad credentials"' in result :
			raise RuntimeError("Invalid response; Bad GitHub credentials")
		print tab+"Data recieved!"

		# Update collective data
		outObj = json.loads(result)
		collective["data"][org]["members"]["nodes"].extend(outObj["data"]["organization"]["members"]["nodes"])
		hasNext = outObj["data"]["organization"]["members"]["pageInfo"]["hasNextPage"]

	del collective["data"][org]["members"]["pageInfo"]
	print "'"+org+"' Done!"

print "\nCollective data gathering complete!"

# Combine new data with existing data
allData[date] = collective["data"]
allDataString = json.dumps(allData)

# Write output file
print "\nWriting file '"+datfilepath+"'"
with open(datfilepath,"w") as fileout:
	fileout.write(allDataString)
print "Wrote file!"

print "\nDone!\n"
