import helpers
import json
import time

date = (time.strftime("%Y-%m-%d"))
xYear = (time.strftime("%Y"))
datfilepath = "../github-data/usersMembership."+xYear+".json"
allData = {}
dat2filepath = "../github-data/outsidersLabRepos."+xYear+".json"
allData2 = {}

# Check for and read existing data files
allData = helpers.read_existing(datfilepath)
allData2 = helpers.read_existing(dat2filepath)

# Read repo user data file (to use as general user list)
usersObj = helpers.read_json("../github-data/reposUsers.json")
if not date in usersObj :
	raise RuntimeError("No reposUsers data for "+date)

# Populate today's user list
userCountCheck = 0
userlist = []
for repo in usersObj[date] :
	print "Getting contributers to "+repo+" ..."
	for user in usersObj[date][repo]["mentionableUsers"]["nodes"] :
		userlist.append(user["login"])
	userCountCheck += usersObj[date][repo]["mentionableUsers"]["totalCount"]
if not userCountCheck==len(userlist) :
	raise RuntimeError("User count error: "+str(userCountCheck)+" reported, "+str(len(userlist))+" parsed")
# Remove duplicates (from same user listed in multiple repos)
userlist = list(set(userlist))
print "User list complete. Found "+str(userCountCheck)+" total users, "+str(len(userlist))+" unique users."

# Read user repo data file (to use as lab member list)
membersObj = helpers.read_json("../github-data/membersRepos.json")
if not date in membersObj :
	raise RuntimeError("No membersRepos data for "+date)

# Build user inside/outside sets and list of outside users' lab repos
insideSet = set([])
outsideSet = set([])
outsiders = {}
print "Sorting user membership..."
for memb in membersObj[date] :
	insideSet.add(memb)
for repo in usersObj[date] :
	for usr in usersObj[date][repo]["mentionableUsers"]["nodes"] :
		username = usr["login"]
		if username in insideSet :
			continue
		else :
			outsideSet.add(username)
			if username in outsiders :
				outsiders[username].extend([repo])
			else :
				outsiders[username] = [repo]
print "Sorting complete!"
insideList = list(insideSet)
insideList.sort()
outsideList = list(outsideSet)
outsideList.sort()

print "Prepping data1 for output..."
collective = {"data":{}}
collective["data"]["insideUsers"] = {"totalCount":len(insideList),"nodes":[]}
for user in insideList :
	dictPair = {"login":user}
	collective["data"]["insideUsers"]["nodes"].extend([dictPair])
collective["data"]["outsideUsers"] = {"totalCount":len(outsideList),"nodes":[]}
for user in outsideList :
	dictPair = {"login":user}
	collective["data"]["outsideUsers"]["nodes"].extend([dictPair])
collective = json.loads(json.dumps(collective))
print "Data1 ready!"

print "Prepping data2 for output..."
collective2 = {"data":{}}
for user in outsiders :
	collective2["data"][user] = {"contributedLabRepositories":{}}
	collective2["data"][user]["contributedLabRepositories"]["totalCount"] = len(outsiders[user])
	collective2["data"][user]["contributedLabRepositories"]["nodes"] = []
	for repo in outsiders[user] :
		dictPair = {"nameWithOwner":repo}
		collective2["data"][user]["contributedLabRepositories"]["nodes"].extend([dictPair])
print "Data2 ready!"

# Combine new data with existing data
allData[date] = collective["data"]
allDataString = json.dumps(allData)
allData2[date] = collective2["data"]
allData2String = json.dumps(allData2)

# Write output files
print "\nWriting file '"+datfilepath+"'"
with open(datfilepath,"w") as fileout:
	fileout.write(allDataString)
print "Wrote file!"
print "\nWriting file '"+dat2filepath+"'"
with open(dat2filepath,"w") as fileout:
	fileout.write(allData2String)
print "Wrote file!"

print "\nDone!\n"
