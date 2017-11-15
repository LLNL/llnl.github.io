import helpers
import json
import re
from datetime import datetime

datfilepath = "../github-data/labRepos_Activity.json"
allData = {}

# Read repo info data file (to use as repo list)
dataObj = helpers.read_json("../github-data/labReposInfo.json")

# Populate repo list
repolist = []
print("Getting internal repos ...")
repolist = sorted(dataObj["data"].keys())
print("Repo list complete. Found %d repos." % (len(repolist)))

# Rest endpoint query
query_in = "/repos/OWNNAME/REPONAME/stats/commit_activity"

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
	gitquery = re.sub('OWNNAME', repoSplit[0], query_in)
	gitquery = re.sub('REPONAME', repoSplit[1], gitquery)
	print(tab + "Query ready!")

	# Actual query exchange
	outObj = helpers.query_githubrest(authhead, gitquery)
	if outObj["errors"]:
		print(tab + "Could not complete '%s'" % (repo))
		collective["data"].pop(repo, None)
		continue

	# Convert unix timestamps into standard dates
	for item in outObj["data"]:
		weekinfo = datetime.utcfromtimestamp(item["week"]).isocalendar()
		weekstring = str(weekinfo[0]) + "-W" + str(weekinfo[1]) + "-1"
		item["week"] = datetime.strptime(weekstring, "%Y-W%W-%w").strftime('%Y-%m-%d')

	# Update collective data
	collective["data"][repo] = outObj["data"]
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
