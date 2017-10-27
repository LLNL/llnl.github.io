import helpers
import json
import re

datfilepath = "../github-data/labReposInfo.json"
allData = {}

# Read input lists of organizations and independent repos of interest
inputLists = helpers.read_json("../input_lists.json")
orglist = inputLists["orgs"]
repolist = inputLists["repos"]

# Read pretty GraphQL queries
#	Org repos
query_in = helpers.read_gql("../queries/org-Repos-Info.gql")
#	Solo repos
query_solo_in = helpers.read_gql("../queries/repo-Info.gql")

# Retrieve authorization token
authhead = helpers.get_gitauth()

# Iterate through orgs of interest
print("Gathering data across multiple paginated queries...")
collective = {u'data': {}}
tab = "    "

for org in orglist:
	pageNum = 1
	print("\n'"+org+"'")
	print(tab+"page "+str(pageNum))

	print(tab+"Modifying query...")
	newqueryOrg = re.sub('ORGNAME', org, query_in)
	newquery = re.sub(' PGCURS', '', newqueryOrg)
	gitquery = json.dumps({'query': newquery})
	print(tab+"Query ready!")

	# Actual query exchange
	outObj = helpers.query_github(authhead,gitquery)
	if outObj["errors"] :
		print(tab+"Could not complete '"+org+"'")
		collective["data"].pop(org, None)
		continue

	# Update collective data
	for repo in outObj["data"]["organization"]["repositories"]["nodes"]:
		repoKey = repo["nameWithOwner"]
		collective["data"][repoKey] = repo

	# Paginate if needed
	hasNext = outObj["data"]["organization"]["repositories"]["pageInfo"]["hasNextPage"]
	while hasNext :
		pageNum += 1
		print(tab+"page "+str(pageNum))
		cursor = outObj["data"]["organization"]["repositories"]["pageInfo"]["endCursor"]

		print(tab+"Modifying query...")
		newquery = re.sub(' PGCURS', ', after:"'+cursor+'"', newqueryOrg)
		gitquery = json.dumps({'query': newquery})
		print(tab+"Query ready!")

		# Actual query exchange
		outObj = helpers.query_github(authhead,gitquery)
		if outObj["errors"] :
			print(tab+"Could not complete '"+org+"'")
			collective["data"].pop(org, None)
			continue

		# Update collective data
		for repo in outObj["data"]["organization"]["repositories"]["nodes"]:
			repoKey = repo["nameWithOwner"]
			collective["data"][repoKey] = repo
		hasNext = outObj["data"]["organization"]["repositories"]["pageInfo"]["hasNextPage"]

	print("'"+org+"' Done!")

print("\nCollective data gathering Part1of2 complete!")

# Iterate through independent repos
print("Adding independent repos...")
print("Gathering data across multiple queries...")
for repo in repolist :

	r = repo.split("/")
	print(tab+"Modifying query...")
	newquery = re.sub('OWNNAME', r[0], query_solo_in)
	newquery = re.sub('REPONAME', r[1], newquery)
	gitquery = json.dumps({'query': newquery})
	print(tab+"Query ready!")

	# Actual query exchange
	outObj = helpers.query_github(authhead,gitquery)
	if outObj["errors"] :
		print(tab+"Could not complete '"+repo+"'")
		collective["data"].pop(repo, None)
		continue

	# Update collective data
	repoKey = outObj["data"]["repository"]["nameWithOwner"]
	collective["data"][repoKey] = outObj["data"]["repository"]

print("\nCollective data gathering Part2of2 complete!")

# Combine new data with existing data
allData["data"] = collective["data"]
allDataString = json.dumps(allData, indent=4, sort_keys=True)

# Write output file
print("\nWriting file '"+datfilepath+"'")
with open(datfilepath,"w") as fileout:
	fileout.write(allDataString)
print("Wrote file!")

print("\nDone!\n")
