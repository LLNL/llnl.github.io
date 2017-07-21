import helpers
import json
import re
import time

date = (time.strftime("%Y-%m-%d"))
xYear = (time.strftime("%Y"))
datfilepath = "./foobar.json"
allData = {}

# Read repo ownership data file (to use as org repo list)
dataObj = helpers.read_json("../github-data/reposOwnership."+xYear+".json")
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
query_in = "/repos/OWNNAME/REPONAME/commits?sha=master&since=2017-07-10T00:00:00Z"

# Retrieve authorization token
authhead = helpers.get_gitauth()

# Iterate through internal repos
print "Gathering data across multiple paginated queries..."
collective = {u'data': {}}
tab = "    "

repolist = ["llnl/llnl.github.io"]
for repo in repolist:
	pageNum = 1
	print "\n'"+repo+"'"
	print tab+"page "+str(pageNum)

	repoSplit = repo.split("/")

	print tab+"Modifying query..."
	gitquery = re.sub('OWNNAME', repoSplit[0], query_in)
	gitquery = re.sub('REPONAME', repoSplit[1], gitquery)
	print tab+"Query ready!"

	# Actual query exchange
	outObj = helpers.query_githubrest(authhead,gitquery)
	# Check for null
	if not outObj :
		print "'"+repo+"' does not exist on GitHub."
		continue
	if not outObj["data"] :
		print "Could not get commit history for '"+repo+"'."
		outObj["data"] = []

	# Extract data of interest TODO

	# Update collective data TODO fix
	collective["data"][repo] = outObj["data"]

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

		# Extract data of interest TODO

		# Update collective data TODO fix
		collective["data"][repo].extend(outObj["data"])
		hasNext = ("next" in outObj)

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
