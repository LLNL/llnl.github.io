import helpers
import json
import re

datfilepath = "../github-data/labRepos_PullsIssues.json"
allData = {}

# Read repo info data file (to use as repo list)
dataObj = helpers.read_json("../github-data/labReposInfo.json")

# Populate repo list
repolist = []
print("Getting internal repos ...")
repolist = sorted(dataObj["data"].keys())
print("Repo list complete. Found %d repos." % (len(repolist)))

# Read pretty GraphQL query
query_in = helpers.read_gql("../queries/repo-PullsIssues.gql")

# Retrieve authorization token
authhead = helpers.get_gitauth()

# Iterate through internal repos
print("Gathering data across multiple queries...")
collective = {u'data': {}}
tab = "    "

for repo in repolist:
	print("\n'%s'" % (repo))

	repoSplit = repo.split("/")

	print(tab + "Modifying query...")
	newquery = re.sub('OWNNAME', repoSplit[0], query_in)
	newquery = re.sub('REPONAME', repoSplit[1], newquery)
	gitquery = json.dumps({'query': newquery})
	print(tab + "Query ready!")

	# Actual query exchange
	outObj = helpers.query_github(authhead, gitquery)
	if outObj["errors"]:
		print(tab + "Could not complete '%s'" % (repo))
		collective["data"].pop(repo, None)
		continue
	# Update collective data
	collective["data"][repo] = outObj["data"]["repository"]

	print("'%s' Done!" % (repo))

print("\nCollective data gathering complete!")

# Combine new data with existing data
allData["data"] = collective["data"]
allDataString = json.dumps(allData, indent=4, sort_keys=True)

# Write output file
print("\nWriting file '%s'" % (datfilepath))
with open(datfilepath, "w") as fileout:
	fileout.write(allDataString)
print("Wrote file!")

print("\nDone!\n")
