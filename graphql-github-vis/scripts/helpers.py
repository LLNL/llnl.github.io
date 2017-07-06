import os.path
import json
import subprocess
import time
from datetime import datetime
import dateutil.parser
import pytz


# Read input list file into array variable
def read_input(filepath):
	if not os.path.isfile(filepath) :
		raise RuntimeError("Input '"+filepath+"' does not exist.")
	print "Reading input '"+filepath+"' ..."
	with open(filepath,"r") as f_in:
		inputString = f_in.read()
	inList = inputString.split('\n')
	print "File read!"
	return inList

# Read json data file into dictionary if it exists, return filled or empty dictionary
def read_existing(filepath):
	dataObj = {}
	if not os.path.isfile(filepath) :
		print "No existing data file '"+filepath+"', will create new file."
	else :
		print "Reading existing data file '"+filepath+"' ..."
		with open(filepath,"r") as q:
			data_raw = q.read()
		dataObj = json.loads(data_raw)
		print "File read!"
	return dataObj

# Read json data file into dictionary
def read_json(filepath):
	if not os.path.isfile(filepath) :
		raise RuntimeError("Data file '"+filepath+"' does not exist.")
	print "Reading '"+filepath+"' ..."
	with open(filepath,"r") as q:
		data_raw = q.read()
	dataObj = json.loads(data_raw)
	print "File read!"
	return dataObj


# Read pretty GraphQL query into single line string variable
def read_gql(filepath):
	if not os.path.isfile(filepath) :
		raise RuntimeError("Query '"+filepath+"' does not exist.")
	print "Reading '"+filepath+"' ..."
	with open(filepath,"r") as q:
		query_raw = q.read().replace('\n',' ')
	query_in = ' '.join(query_raw.split())
	print "File read!"
	return query_in

# Returns authorization header for GitHub APIs
def get_gitauth():
	print "Reading authorization token..."
	# TODO: Might not really want this at global scope
	token = os.environ['GITHUB_API_TOKEN']
	authhead = 'Authorization: bearer '+token
	print "Token read!"
	return authhead

# Query GitHub GraphQL API, return result as json dictionary
def query_github(authhead,gitquery):
	tab = "    "

	print tab+"Sending GraphQL query..."
	bashcurl = 'curl -H TMPauthhead -X POST -d TMPgitquery https://api.github.com/graphql'
	bashcurl_list = bashcurl.split()
	bashcurl_list[2] = authhead
	bashcurl_list[6] = gitquery
	result = subprocess.check_output(bashcurl_list)

	print tab+"Checking response..."
	resultChecker = "".join(result.split())
	if '"message":"Badcredentials"' in resultChecker :
		raise RuntimeError(result)

	print tab+"Data recieved!"
	outObj = json.loads(result)

	# Make sure the limit didn't run out
	api = outObj["data"]["rateLimit"]
	print json.dumps(api)
	if api["cost"] > api["remaining"] :
		print tab+"Limit reached during query."
		awaitResetGraphQL(api["resetAt"])
		print tab+"Repeating query..."
		return query_github(authhead, gitquery)

	# Strip limit data
	del outObj["data"]["rateLimit"]

	return outObj

# Query GitHub REST API, return result as json dictionary
def query_githubrest(authhead,endpoint): # e.g. endpoint = '/users/defunkt'
	tab = "    "

	print tab+"Sending REST query..."
	bashcurl = 'curl -iH TMPauthhead https://api.github.com'+endpoint
	bashcurl_list = bashcurl.split()
	bashcurl_list[2] = authhead
	fullResponse = subprocess.check_output(bashcurl_list).split('\r\n\r\n')
	heads = fullResponse[0].split('\r\n')
	if len(fullResponse) > 1 :
		result = fullResponse[1]
	else :
		result = ""

	print tab+"Checking response..."
	resultChecker = "".join(result.split())
	if '"message":"ProblemsparsingJSON"' in resultChecker :
		raise RuntimeError(result)
	if '"message":"BodyshouldbeaJSONobject"' in resultChecker :
		raise RuntimeError(result)
	if '"message":"ValidationFailed"' in resultChecker :
		raise RuntimeError(result)
	if '"message":"Badcredentials"' in resultChecker :
		raise RuntimeError(result)
	if '"message":"NotFound"' in resultChecker :
		return None

	print tab+"Data recieved!"

	# Parse headers
	del heads[0]
	headdict = {}
	for aHead in heads:
		h = aHead.split(': ')
		headdict[h[0]] = h[1]
	api = {}
	api["limit"] = int(headdict["X-RateLimit-Limit"])
	api["remaining"] = int(headdict["X-RateLimit-Remaining"])
	api["reset"] = int(headdict["X-RateLimit-Reset"])
	# Make sure the limit didn't run out
	print json.dumps(api)
	if not api["remaining"] > 0 :
		print tab+"Limit reached during query."
		awaitResetREST(api["reset"])
		print tab+"Repeating query..."
		return query_githubrest(authhead,endpoint)

	if result :
		result = '{ "data": '+result+' }'
	else :
		result = '{ "data": null }'
	outObj = json.loads(result)
	return outObj


def check_restAPI_limit(authhead):
	tab = "    "
	print tab+"Checking REST query limit..."
	bashcurl = 'curl -H TMPauthhead https://api.github.com/rate_limit'
	bashcurl_list = bashcurl.split()
	bashcurl_list[2] = authhead
	result = subprocess.check_output(bashcurl_list)
	resultChecker = "".join(result.split())
	if '"message":"Badcredentials"' in resultChecker :
		raise RuntimeError(result)
	outObj = json.loads(result)
	return outObj["resources"]["core"]


def awaitReset(datetimeObj):
	print "--- Timestamp "+time.strftime('%c')
	now = pytz.utc.localize(datetime.utcnow())
	waitTime = round((datetimeObj - now).total_seconds())+1
	print "--- Timestamp UTC "+now.strftime('%c')
	print "--- GITHUB NEEDS A BREAK until UTC "+datetimeObj.strftime('%c')
	print "--- Waiting "+str(waitTime)+" seconds..."
	time.sleep(waitTime)
	print "--- READY!"

def awaitResetREST(utcTimeStamp):
	resetTime = pytz.utc.localize(datetime.utcfromtimestamp(utcTimeStamp))
	awaitReset(resetTime)

def awaitResetGraphQL(isoString):
	resetTime = dateutil.parser.parse(isoString)
	awaitReset(resetTime)