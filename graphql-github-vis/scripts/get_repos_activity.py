import helpers
import json
import re
import time
from datetime import datetime

date = (time.strftime("%Y-%m-%d"))
datfilepath = "../github-data/reposActivity.json"
allData = {}

# Read repo ownership data file (to use as org repo list)
dataObj = helpers.read_json("../github-data/reposOwnership.json")
if not date in dataObj :
	raise RuntimeError("No reposOwnership data for "+date)

# Populate today's repo list
repolist = []
print "Getting internal repos ..."
repoNodes = dataObj[date]["insideRepositories"]["nodes"]
for repo in repoNodes :
	repolist.append(repo["nameWithOwner"])
repoCountCheck = dataObj[date]["insideRepositories"]["totalCount"]
if not repoCountCheck==len(repolist) :
	raise RuntimeError("User count error: "+str(repoCountCheck)+" reported, "+str(len(repolist))+" parsed")
print "Repo list complete. Found "+str(len(repolist))+" repos."

# Rest endpoint query
query_in = "/repos/OWNNAME/REPONAME/stats/commit_activity"

# Retrieve authorization token
authhead = helpers.get_gitauth()

# Iterate through internal repos
print "Gathering data across multiple queries..."
collective = {u'data': {}}
tab = "    "
for repo in repolist:
	print "\n'"+repo+"'"

	repoSplit = repo.split("/")

	print tab+"Modifying query..."
	newqueryRep = re.sub('OWNNAME', repoSplit[0], query_in)
	gitquery = re.sub('REPONAME', repoSplit[1], newqueryRep)
	print tab+"Query ready!"

	# Actual query exchange
	outObj = helpers.query_githubrest(authhead,gitquery)
	# Check for null
	if not outObj["data"] :
		print "'"+repo+"' does not exist on GitHub."
		continue

	# Convert unix timestamps into standard dates
	for item in outObj["data"] :
		item["week"] = datetime.utcfromtimestamp(item["week"]).strftime('%Y-%m-%d')

	# Update collective data
	collective["data"][repo] = outObj["data"]
	print "'"+repo+"' Done!"

print "\nCollective data gathering complete!"

# Combine new data with existing data
allData["data"] = collective["data"]
allDataString = json.dumps(allData)

# Write output file
print "\nWriting file '"+datfilepath+"'"
with open(datfilepath,"w") as fileout:
	fileout.write(allDataString)
print "Wrote file!"

print "\nDone!\n"
