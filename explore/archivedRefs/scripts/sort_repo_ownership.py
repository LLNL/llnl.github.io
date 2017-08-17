import helpers
import json
import time

date = (time.strftime("%Y-%m-%d"))
xYear = (time.strftime("%Y"))
datfilepath = "../github-data/reposOwnership."+xYear+".json"
allData = {}

# Check for and read existing data file
allData = helpers.read_existing(datfilepath)

# Read input list of organizations of interest
orgList = helpers.read_input("../inputs/Orgs")

# Read org repos data file
orgsReposObj = helpers.read_json("../github-data/orgsRepos."+xYear+".json")
if not date in orgsReposObj :
	raise RuntimeError("No orgsRepos data for "+date)

# Read user repos data file
membersReposObj = helpers.read_json("../github-data/membersRepos."+xYear+".json")
if not date in membersReposObj :
	raise RuntimeError("No membersRepos data for "+date)

# Build repo inside/outside sets
insideSet = set([])
outsideSet = set([])
print "Sorting organization repos..." # Includes independent repos
for org in orgsReposObj[date] :
	for repo in orgsReposObj[date][org]["repositories"]["nodes"] :
		repoName = repo["nameWithOwner"]
		insideSet.add(repoName)
print "Sorting user repos..."
for usr in membersReposObj[date] :
	for repo in membersReposObj[date][usr]["contributedRepositories"]["nodes"] :
		repoName = repo["nameWithOwner"]
		if repoName in insideSet :
			continue
		repoOwner = repoName.lower().split("/")[0]
		if repoOwner in orgList :
			insideSet.add(repoName)
		else :
			outsideSet.add(repoName)
print "Sorting complete!"
insideList = list(insideSet)
insideList.sort()
outsideList = list(outsideSet)
outsideList.sort()

print "Prepping data for output..."
collective = {"data":{}}
collective["data"]["insideRepositories"] = {"totalCount":len(insideList),"nodes":[]}
for repo in insideList :
	dictPair = {"nameWithOwner":repo}
	collective["data"]["insideRepositories"]["nodes"].extend([dictPair])
collective["data"]["outsideRepositories"] = {"totalCount":len(outsideList),"nodes":[]}
for repo in outsideList :
	dictPair = {"nameWithOwner":repo}
	collective["data"]["outsideRepositories"]["nodes"].extend([dictPair])
collective = json.loads(json.dumps(collective))
print "Data ready!"

# Combine new data with existing data
allData[date] = collective["data"]
allDataString = json.dumps(allData)

# Write output file
print "\nWriting file '"+datfilepath+"'"
with open(datfilepath,"w") as fileout:
	fileout.write(allDataString)
print "Wrote file!"

print "\nDone!\n"
