import helpers
import json
import re

datfilepath = "../github-data/labUsers.json"
allData = {}

# Only looking at LLNL org members
orglist = ["llnl"]

# Read pretty GraphQL query
query_in = helpers.read_gql("../queries/org-Members.gql")

# Retrieve authorization token
authhead = helpers.get_gitauth()

# Iterate through orgs of interest
print("Gathering data across multiple paginated queries...")
collective = {u'data': {}}
tab = "    "

for org in orglist:
	pageNum = 1
	print("\n'%s'" %(org))
	print(tab+"page %d" %(pageNum))

	print(tab+"Modifying query...")
	newqueryOrg = re.sub('ORGNAME', org, query_in)
	newquery = re.sub(' PGCURS', '', newqueryOrg)
	gitquery = json.dumps({'query': newquery})
	print(tab+"Query ready!")

	# Actual query exchange
	outObj = helpers.query_github(authhead,gitquery)
	if outObj["errors"] :
		print(tab+"Could not complete '%s'" %(org))
		collective["data"].pop(org, None)
		continue

	# Update collective data
	for user in outObj["data"]["organization"]["members"]["nodes"]:
		userKey = user["login"]
		collective["data"][userKey] = user

	# Paginate if needed
	hasNext = outObj["data"]["organization"]["members"]["pageInfo"]["hasNextPage"]
	while hasNext :
		pageNum += 1
		print(tab+"page %d" %(pageNum))
		cursor = outObj["data"]["organization"]["members"]["pageInfo"]["endCursor"]

		print(tab+"Modifying query...")
		newquery = re.sub(' PGCURS', ', after:"'+cursor+'"', newqueryOrg)
		gitquery = json.dumps({'query': newquery})
		print(tab+"Query ready!")

		# Actual query exchange
		outObj = helpers.query_github(authhead,gitquery)
		if outObj["errors"] :
			print(tab+"Could not complete '%s'" %(org))
			collective["data"].pop(org, None)
			continue

		# Update collective data
		for user in outObj["data"]["organization"]["members"]["nodes"]:
			userKey = user["login"]
			collective["data"][userKey] = user
		hasNext = outObj["data"]["organization"]["members"]["pageInfo"]["hasNextPage"]

	print("'%s' Done!" %(org))

print("\nCollective data gathering complete!")

# Combine new data with existing data
allData["data"] = collective["data"]
allDataString = json.dumps(allData, indent=4, sort_keys=True)

# Write output file
print("\nWriting file '%s'" %(datfilepath))
with open(datfilepath,"w") as fileout:
	fileout.write(allDataString)
print("Wrote file!")

print("\nDone!\n")
