import os
import subprocess
import json
import time

date = (time.strftime("%Y-%m-%d"))
datfilepath = "../github-data/orgRepoCounts.json"
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

# Read pretty GraphQL query into single line string variable
filename = "../queries/orgs-RepoCounts.gql"
if not os.path.isfile(filename) :
	raise RuntimeError("Query '"+filename+"' does not exist.")
print "Reading query '"+filename+"' ..."
with open(filename,"r") as q:
	query_raw = q.read().replace('\n',' ')
query_in = ' '.join(query_raw.split())
gitquery = json.dumps({'query': query_in})
print "File read!"

# Retrieve authorization token
print "Reading authorization token..."
# TODO: Might not really want this at global scope
token = os.environ['GITHUB_API_TOKEN']
authhead = 'Authorization: bearer '+token
print "Token read!"

# Actual query exchange
print "Sending query..."
bashcurl_prefix = 'curl -H TMPauthhead -X POST -d TMPgitquery https://api.github.com/graphql'
bashcurl_list = bashcurl_prefix.split()
bashcurl_list[2] = authhead
bashcurl_list[6] = gitquery
result = subprocess.check_output(bashcurl_list)
print "Checking response..."
if '"message": "Bad credentials"' in result :
	raise RuntimeError("Invalid response; Bad GitHub credentials")
print "Data recieved!"

# Combine new data with existing data
outObj = json.loads(result)
allData[date] = outObj["data"]
allDataString = json.dumps(allData)

# Write output file
date = (time.strftime("%Y-%m-%d"))
print "\nWriting file '"+datfilepath+"'"
with open(datfilepath,"w") as fileout:
	fileout.write(allDataString)
print "Wrote file!"

print "\nDone!\n"
