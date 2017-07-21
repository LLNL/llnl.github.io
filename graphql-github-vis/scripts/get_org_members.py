import helpers
import json
import re
import time

date = (time.strftime("%Y-%m-%d"))
xYear = (time.strftime("%Y"))
datfilepath = "../github-data/orgsMembers."+xYear+".json"
allData = {}

# Check for and read existing data file
allData = helpers.read_existing(datfilepath)

# Read input list of organizations of interest
orglist = helpers.read_input("../inputs/Orgs")

# Read pretty GraphQL query
query_in = helpers.read_gql("../queries/org-Members.gql")

# Retrieve authorization token
authhead = helpers.get_gitauth()

# Iterate through orgs of interest
print "Gathering data across multiple paginated queries..."
collective = {u'data': {}}
tab = "    "

for org in orglist:
	pageNum = 1
	print "\n'"+org+"'"
	print tab+"page "+str(pageNum)

	print tab+"Modifying query..."
	newqueryOrg = re.sub('ORGNAME', org, query_in)
	newquery = re.sub(' PGCURS', '', newqueryOrg)
	gitquery = json.dumps({'query': newquery})
	print tab+"Query ready!"

	# Actual query exchange
	outObj = helpers.query_github(authhead,gitquery)
	# Check for null
	if not outObj["data"]["organization"] :
		print "'"+org+"' does not exist on GitHub."
		continue

	# Update collective data
	collective["data"][org] = outObj["data"]["organization"]

	# Paginate if needed
	hasNext = outObj["data"]["organization"]["members"]["pageInfo"]["hasNextPage"]
	while hasNext :
		pageNum += 1
		print tab+"page "+str(pageNum)
		cursor = outObj["data"]["organization"]["members"]["pageInfo"]["endCursor"]

		print tab+"Modifying query..."
		newquery = re.sub(' PGCURS', ', after:"'+cursor+'"', newqueryOrg)
		gitquery = json.dumps({'query': newquery})
		print tab+"Query ready!"

		# Actual query exchange
		outObj = helpers.query_github(authhead,gitquery)

		# Update collective data
		collective["data"][org]["members"]["nodes"].extend(outObj["data"]["organization"]["members"]["nodes"])
		hasNext = outObj["data"]["organization"]["members"]["pageInfo"]["hasNextPage"]

	del collective["data"][org]["members"]["pageInfo"]
	print "'"+org+"' Done!"

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
