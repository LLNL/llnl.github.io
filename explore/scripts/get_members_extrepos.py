import helpers
import json
import re

datfilepath = "../github-data/extRepos.json"
allData = {}

# Read lab user data file (to use as member list)
dataObj = helpers.read_json("../github-data/labUsers.json")

# Populate member list
memberlist = []
print("Getting LLNL members ...")
memberlist = dataObj["data"].keys()
print("Member list complete. Found "+str(len(memberlist))+" users.")
memberlist.sort()

# Read repo info data file (to use as repo list)
dataObj = helpers.read_json("../github-data/labReposInfo.json")

# Populate repo list
repolist = []
print("Getting internal repos ...")
repolist = dataObj["data"].keys()
print("Repo list complete. Found "+str(len(repolist))+" repos.")
repolist.sort()

# Read pretty GraphQL query
query_in = helpers.read_gql("../queries/user-Repos.gql")

# Retrieve authorization token
authhead = helpers.get_gitauth()

# Iterate through lab members
print("Gathering data across multiple paginated queries...")
collective = {u'data': {}}
tab = "    "

for usr in memberlist:
	pageNum = 1
	print("\n'"+usr+"'")
	print(tab+"page "+str(pageNum))

	print(tab+"Modifying query...")
	newqueryUsr = re.sub('USRNAME', usr, query_in)
	newquery = re.sub(' PGCURS', '', newqueryUsr)
	gitquery = json.dumps({'query': newquery})
	print(tab+"Query ready!")

	# Actual query exchange
	outObj = helpers.query_github(authhead,gitquery)
	if outObj["errors"] :
		print(tab+"Could not complete '"+usr+"'")
		collective["data"].pop(usr, None)
		continue

	# Update collective data
	for repo in outObj["data"]["user"]["contributedRepositories"]["nodes"]:
		repoKey = repo["nameWithOwner"]
		if repoKey in repolist :
			continue
		if not repoKey in collective["data"].keys() :
			collective["data"][repoKey] = repo
			collective["data"][repoKey]["labContributors"] = {"nodes":[]}
		collective["data"][repoKey]["labContributors"]["nodes"].append(usr)
		collective["data"][repoKey]["labContributors"]["nodes"].sort()

	# Paginate if needed
	hasNext = outObj["data"]["user"]["contributedRepositories"]["pageInfo"]["hasNextPage"]
	while hasNext :
		pageNum += 1
		print(tab+"page "+str(pageNum))
		cursor = outObj["data"]["user"]["contributedRepositories"]["pageInfo"]["endCursor"]

		print(tab+"Modifying query...")
		newquery = re.sub(' PGCURS', ', after:"'+cursor+'"', newqueryUsr)
		gitquery = json.dumps({'query': newquery})
		print(tab+"Query ready!")

		# Actual query exchange
		outObj = helpers.query_github(authhead,gitquery)
		if outObj["errors"] :
			print(tab+"Could not complete '"+usr+"'")
			collective["data"].pop(usr, None)
			continue

		# Update collective data
		for repo in outObj["data"]["user"]["contributedRepositories"]["nodes"]:
			repoKey = repo["nameWithOwner"]
			if repoKey in repolist :
				continue
			if not repoKey in collective["data"].keys() :
				collective["data"][repoKey] = repo
				collective["data"][repoKey]["labContributors"] = {"nodes":[]}
			collective["data"][repoKey]["labContributors"]["nodes"].append(usr)
			collective["data"][repoKey]["labContributors"]["nodes"].sort()

		hasNext = outObj["data"]["user"]["contributedRepositories"]["pageInfo"]["hasNextPage"]

	print("'"+usr+"' Done!")

print("\nCollective data gathering complete!")

# Combine new data with existing data
allData["data"] = collective["data"]
allDataString = json.dumps(allData, indent=4, sort_keys=True)

# Write output file
print("\nWriting file '"+datfilepath+"'")
with open(datfilepath,"w") as fileout:
	fileout.write(allDataString)
print("Wrote file!")

print("\nDone!\n")
