import os.path
import json
import time

date = (time.strftime("%Y-%m-%d"))
datfilepath = "../github-data/reposOwnership.json"
allData = {}

# Check for and read existing data file
if not os.path.isfile(datfilepath) :
	print "No existing data file '"+datfilepath+"', will create new file."
else :
	print "Reading existing data file '"+datfilepath+"' ..."
	with open(datfilepath,"r") as q:
		data_raw = q.read()
	allData = json.loads(data_raw)
	print "File read!"

# Read input list of organizations of interest
filename = "../inputs/Orgs"
if not os.path.isfile(filename) :
	raise RuntimeError("Input '"+filename+"' does not exist.")
print "Reading input '"+filename+"' ..."
with open(filename,"r") as f_in:
	inputList = f_in.read()
orgList = inputList.split()
print "File read!"

# Read existing org repos data file
filename = "../github-data/orgsRepos.json"
if not os.path.isfile(filename) :
	raise RuntimeError("Data file '"+filename+"' does not exist.")
print "Reading '"+filename+"' ..."
with open(filename,"r") as q:
	data_raw = q.read()
orgsReposObj = json.loads(data_raw)
print "File read!"
if not date in orgsReposObj :
	raise RuntimeError("No orgsRepos data for "+date)

# Read existing user repos data file
filename = "../github-data/usrsRepos.json"
if not os.path.isfile(filename) :
	raise RuntimeError("Data file '"+filename+"' does not exist.")
print "Reading '"+filename+"' ..."
with open(filename,"r") as q:
	data_raw = q.read()
usrsReposObj = json.loads(data_raw)
print "File read!"
if not date in usrsReposObj :
	raise RuntimeError("No usrsRepos data for "+date)

# Build repo inside/outside sets
insideSet = set([])
outsideSet = set([])
print "Sorting organization repos..." # Includes independent repos
for org in orgsReposObj[date] :
	for repo in orgsReposObj[date][org]["repositories"]["nodes"] :
		repoName = repo["nameWithOwner"]
		insideSet.add(repoName)
print "Sorting user repos..."
for usr in usrsReposObj[date] :
	for repo in usrsReposObj[date][usr]["contributedRepositories"]["nodes"] :
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
