import helpers
import json
import re

datfilepath = "../github-data/labRepos_CreationHistory.json"
allData = {}

# Check for and read existing data file
allData = helpers.read_existing(datfilepath)

# Read repo info data file (to use as repo list)
dataObj = helpers.read_json("../github-data/labReposInfo.json")

# Populate repo list
repolist = []
print "Getting internal repos ..."
repolist = dataObj["data"].keys()
print "Repo list complete. Found "+str(len(repolist))+" repos."
repolist.sort()

# Read pretty GraphQL query
query_in = helpers.read_gql("../queries/repo-CreationDate.gql")

# Rest endpoint query
query_commits_in = "/repos/OWNNAME/REPONAME/commits?until=CREATETIME&per_page=100"
query_commits_in2 = "/repos/OWNNAME/REPONAME/commits?per_page=100"

# Retrieve authorization token
authhead = helpers.get_gitauth()

# Iterate through internal repos
print "Gathering data across multiple paginated queries..."
collective = {u'data': {}}
tab = "    "

for repo in repolist:

	# History doesn't change, only update new repos or those that had no previous commits
	if "data" in allData.keys() and repo in allData["data"].keys() :
		if allData["data"][repo]["firstCommitAt"] :
			print tab+"Already recorded data for '"+repo+"'"
			continue

	pageNum = 1
	print "\n'"+repo+"'"
	print tab+"page "+str(pageNum)

	repoSplit = repo.split("/")

	# Query 1
	print tab+"Get creation date and default branch"
	print tab+"Modifying query..."
	newquery = re.sub('OWNNAME', repoSplit[0], query_in)
	newquery = re.sub('REPONAME', repoSplit[1], newquery)
	gitquery = json.dumps({'query': newquery})
	print tab+"Query ready!"

	# Actual query exchange
	outObj = helpers.query_github(authhead,gitquery)
	if outObj["errors"] :
		print tab+"Could not complete '"+repo+"'"
		collective["data"].pop(repo, None)
		continue

	# Update collective data
	collective["data"][repo] = outObj["data"]["repository"]

	# Query 2
	print tab+"Get pre-GitHub commit timestamps"
	print tab+"Modifying query..."
	gitquery = re.sub('OWNNAME', repoSplit[0], query_commits_in)
	gitquery = re.sub('REPONAME', repoSplit[1], gitquery)
	gitquery = re.sub('CREATETIME', collective["data"][repo]["createdAt"], gitquery)
	print tab+"Query ready!"

	# Actual query exchange
	outObj = helpers.query_githubrest(authhead,gitquery)
	if outObj["errors"] :
		print tab+"Could not get pre-GitHub commits for '"+repo+"'"
		outObj["data"] = []

	# Update collective data
	collective["data"][repo]["commitTimestamps"] = []
	for commit in outObj["data"] :
		collective["data"][repo]["commitTimestamps"].append(commit["commit"]["committer"]["date"])

	# If no pre-GitHub commits, check the greater commit history
	if len(collective["data"][repo]["commitTimestamps"]) > 0 and collective["data"][repo]["commitTimestamps"][0] :
		collective["data"][repo]["initBeforeGitHubRepo"] = True
	else:
		print tab+"No pre-GitHub commits found, getting full history"
		collective["data"][repo]["initBeforeGitHubRepo"] = False

		# Query 3
		print tab+"Modifying query..."
		gitquery = re.sub('OWNNAME', repoSplit[0], query_commits_in2)
		gitquery = re.sub('REPONAME', repoSplit[1], gitquery)
		print tab+"Query ready!"

		# Actual query exchange
		outObj = helpers.query_githubrest(authhead,gitquery)
		if outObj["errors"] :
			print tab+"Could not complete '"+repo+"'"
			collective["data"].pop(repo, None)
			continue

		# Update collective data
		for commit in outObj["data"] :
			collective["data"][repo]["commitTimestamps"].append(commit["commit"]["committer"]["date"])

	# Paginate if needed
	hasNext = ("next" in outObj)
	while hasNext :
		pageNum += 1
		print tab+"page "+str(pageNum)

		print tab+"Modifying query..."
		newquery = gitquery+"&page="+str(pageNum)
		print tab+"Query ready!"

		# Actual query exchange
		outObj = helpers.query_githubrest(authhead,newquery)
		if outObj["errors"] :
			print tab+"Could not complete '"+repo+"'"
			collective["data"].pop(repo, None)
			continue
		
		# Update collective data
		for commit in outObj["data"] :
			collective["data"][repo]["commitTimestamps"].append(commit["commit"]["committer"]["date"])

		hasNext = ("next" in outObj)

	# Sort dates
	collective["data"][repo]["commitTimestamps"].sort()
	# Save earliest commit date
	firstdate = None
	if len(collective["data"][repo]["commitTimestamps"]) > 0 :
		firstdate = collective["data"][repo]["commitTimestamps"][0]
	collective["data"][repo]["firstCommitAt"] = firstdate

	del collective["data"][repo]["commitTimestamps"]
	print "'"+repo+"' Done!"

print "\nCollective data gathering complete!"

# Combine new data with existing data
if "data" not in allData.keys() :
	allData["data"] = {}
for repo in collective["data"].keys() :
	allData["data"][repo] = collective["data"][repo]
allDataString = json.dumps(allData, indent=4, sort_keys=True)

# Write output file
print "\nWriting file '"+datfilepath+"'"
with open(datfilepath,"w") as fileout:
	fileout.write(allDataString)
print "Wrote file!"

print "\nDone!\n"
