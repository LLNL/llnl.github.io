import helpers
import json
import re
import time

date = (time.strftime("%Y-%m-%d"))
xYear = (time.strftime("%Y"))
datfilepath = "../github-data/orgsRepos."+xYear+".json"
allData = {}

# Check for and read existing data file
allData = helpers.read_existing(datfilepath)

# Read input list of organizations of interest
orglist = helpers.read_input("../inputs/Orgs")

# Read input list of independent repos of interest
repolist = helpers.read_input("../inputs/Repos")

# Read pretty GraphQL queries
#	Main query
query_in = helpers.read_gql("../queries/org-Repos.gql")
#	Repo name query
query_name_in = helpers.read_gql("../queries/repo-PrettyName.gql")

# Retrieve authorization token
authhead = helpers.get_gitauth()

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
	outObj = helpers.query_github(authhead,gitquery)
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
		outObj = helpers.query_github(authhead,gitquery)

		# Update collective data
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
	outObj = helpers.query_github(authhead,gitquery)
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
