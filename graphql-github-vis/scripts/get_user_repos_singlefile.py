import sys
import os.path
import subprocess
import json
import re
import time

date = (time.strftime("%Y-%m-%d"))
datfilepath = "../github-data/usrsRepos.json"
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

# Read existing org member data file
orgsMembersPath = "../github-data/orgsMembers.json"
if not os.path.isfile(orgsMembersPath) :
	raise RuntimeError("Data file '"+orgsMembersPath+"' does not exist.")
print "Reading '"+orgsMembersPath+"' ..."
with open(orgsMembersPath,"r") as q:
	data_raw = q.read()
dataObj = json.loads(data_raw)
print "File read!"

# Populate today's user list
if not date in dataObj :
	raise RuntimeError("No orgsMembers data for "+date)
userCountCheck = 0
userlist = []
for org in dataObj[date] :
	print "Getting members of "+org+" ..."
	for user in dataObj[date][org]["members"]["nodes"] :
		userlist.append(user["login"])
	userCountCheck += dataObj[date][org]["members"]["totalCount"]
if not userCountCheck==len(userlist) :
	raise RuntimeError("User count error: "+str(userCountCheck)+" reported, "+str(len(userlist))+" parsed")
# Remove duplicates (from same user listed in multiple orgs)
userlist = list(set(userlist))
print "User list complete. Found "+str(userCountCheck)+" total users, "+str(len(userlist))+" unique users."

# Read pretty GraphQL query into single line string variable
filename = "../queries/user-Repos.gql"
if not os.path.isfile(filename) :
	raise RuntimeError("Query '"+filename+"' does not exist.")
print "Reading '"+filename+"' ..."
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


# Iterate through users
print "Gathering data across multiple paginated queries..."
collective = {u'data': {}}
tab = "    "

for usr in userlist:
	pageNum = 0
	print "\n'"+usr+"'"
	print tab+"page "+str(pageNum)

	print tab+"Modifying query..."
	newqueryUsr = re.sub('USRNAME', usr, query_in)
	newquery = re.sub(' PGCURS', '', newqueryUsr)
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
	collective["data"][usr] = outObj["data"]["user"]

	# Paginate if needed
	hasNext = outObj["data"]["user"]["contributedRepositories"]["pageInfo"]["hasNextPage"]
	while hasNext :
		pageNum += 1
		print tab+"page "+str(pageNum)
		cursor = outObj["data"]["user"]["contributedRepositories"]["pageInfo"]["endCursor"]

		print tab+"Modifying query..."
		newquery = re.sub(' PGCURS', ', after:"'+cursor+'"', newqueryUsr)
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
		collective["data"][usr]["contributedRepositories"]["nodes"].extend(outObj["data"]["user"]["contributedRepositories"]["nodes"])
		hasNext = outObj["data"]["user"]["contributedRepositories"]["pageInfo"]["hasNextPage"]

	del collective["data"][usr]["contributedRepositories"]["pageInfo"]
	print "'"+usr+"' Done!"

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
