import helpers
import json
import re
import time

date = (time.strftime("%Y-%m-%d"))
xYear = (time.strftime("%Y"))
datfilepath = "../github-data/reposUsers."+xYear+".json"
allData = {}

# Check for and read existing data file
allData = helpers.read_existing(datfilepath)

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

# Read pretty GraphQL query
query_in = helpers.read_gql("../queries/repo-Users.gql")

# Retrieve authorization token
authhead = helpers.get_gitauth()

# Iterate through internal repos
print "Gathering data across multiple paginated queries..."
collective = {u'data': {}}
tab = "    "

for repo in repolist:
	pageNum = 1
	print "\n'"+repo+"'"
	print tab+"page "+str(pageNum)

	repoSplit = repo.split("/")

	print tab+"Modifying query..."
	newqueryRep = re.sub('OWNNAME', repoSplit[0], query_in)
	newqueryRep = re.sub('REPONAME', repoSplit[1], newqueryRep)
	newquery = re.sub(' PGCURS', '', newqueryRep)
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

	# Paginate if needed
	hasNext = outObj["data"]["repository"]["mentionableUsers"]["pageInfo"]["hasNextPage"]
	while hasNext :
		pageNum += 1
		print tab+"page "+str(pageNum)
		cursor = outObj["data"]["repository"]["mentionableUsers"]["pageInfo"]["endCursor"]

		print tab+"Modifying query..."
		newquery = re.sub(' PGCURS', ', after:"'+cursor+'"', newqueryRep)
		gitquery = json.dumps({'query': newquery})
		print tab+"Query ready!"

		# Actual query exchange
		outObj = helpers.query_github(authhead,gitquery)
		if outObj["errors"] :
			print tab+"Could not complete '"+repo+"'"
			collective["data"].pop(repo, None)
			continue

		# Update collective data
		collective["data"][repo]["mentionableUsers"]["nodes"].extend(outObj["data"]["repository"]["mentionableUsers"]["nodes"])
		hasNext = outObj["data"]["repository"]["mentionableUsers"]["pageInfo"]["hasNextPage"]

	del collective["data"][repo]["mentionableUsers"]["pageInfo"]
	print "'"+repo+"' Done!"

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
