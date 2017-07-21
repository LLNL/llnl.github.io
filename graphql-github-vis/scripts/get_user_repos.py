import helpers
import json
import re
import time

date = (time.strftime("%Y-%m-%d"))
xYear = (time.strftime("%Y"))
datfilepath = "../github-data/membersRepos."+xYear+".json"
allData = {}

# Check for and read existing data file
allData = helpers.read_existing(datfilepath)

# Read org member data file
dataObj = helpers.read_json("../github-data/orgsMembers."+xYear+".json")
if not date in dataObj :
	raise RuntimeError("No orgsMembers data for "+date)

# Populate today's user list
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

# Read pretty GraphQL query
query_in = helpers.read_gql("../queries/user-Repos.gql")

# Retrieve authorization token
authhead = helpers.get_gitauth()

# Iterate through users
print "Gathering data across multiple paginated queries..."
collective = {u'data': {}}
tab = "    "

for usr in userlist:
	pageNum = 1
	print "\n'"+usr+"'"
	print tab+"page "+str(pageNum)

	print tab+"Modifying query..."
	newqueryUsr = re.sub('USRNAME', usr, query_in)
	newquery = re.sub(' PGCURS', '', newqueryUsr)
	gitquery = json.dumps({'query': newquery})
	print tab+"Query ready!"

	# Actual query exchange
	outObj = helpers.query_github(authhead,gitquery)

	# Update collective data
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
		outObj = helpers.query_github(authhead,gitquery)

		# Update collective data
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
