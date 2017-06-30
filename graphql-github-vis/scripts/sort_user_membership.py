import helpers
import json
import time

date = (time.strftime("%Y-%m-%d"))
datfilepath = "../github-data/usersMembership.json"
allData = {}

# Check for and read existing data file
allData = helpers.read_existing(datfilepath)

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

# Build user inside/outside sets
insideSet = set([])
outsideSet = set([])
print "Sorting user membership..."
for memb in membersObj[date] :
	insideSet.add(memb)
print "Sorting user repos..."
for repo in usersObj[date] :
	for usr in usersObj[date][repo]["mentionableUsers"]["nodes"] :
		username = usr["login"]
		if username in insideSet :
			continue
		else :
			outsideSet.add(username)
print "Sorting complete!"
insideList = list(insideSet)
insideList.sort()
outsideList = list(outsideSet)
outsideList.sort()

print "Prepping data for output..."
collective = {"data":{}}
collective["data"]["insideUsers"] = {"totalCount":len(insideList),"nodes":[]}
for repo in insideList :
	dictPair = {"login":repo}
	collective["data"]["insideUsers"]["nodes"].extend([dictPair])
collective["data"]["outsideUsers"] = {"totalCount":len(outsideList),"nodes":[]}
for repo in outsideList :
	dictPair = {"login":repo}
	collective["data"]["outsideUsers"]["nodes"].extend([dictPair])
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
