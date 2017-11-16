import os.path
import json
import subprocess
import time
from datetime import datetime
import pytz
import re
import warnings


# Read json data file into dictionary if it exists, return filled or empty dictionary
def read_existing(filepath):
	dataObj = {}
	if not os.path.isfile(filepath):
		print("No existing data file '%s', will create new file." % (filepath))
	else:
		print("Reading existing data file '%s' ..." % (filepath))
		with open(filepath, "r") as q:
			data_raw = q.read()
		dataObj = json.loads(data_raw)
		print("File read!")
	return dataObj


# Read json data file into dictionary
def read_json(filepath):
	if not os.path.isfile(filepath):
		raise RuntimeError("Data file '%s' does not exist." % (filepath))
	print("Reading '%s' ..." % (filepath))
	with open(filepath, "r") as q:
		data_raw = q.read()
	dataObj = json.loads(data_raw)
	print("File read!")
	return dataObj


# Read pretty GraphQL query into single line string variable
def read_gql(filepath):
	if not os.path.isfile(filepath):
		raise RuntimeError("Query '%s' does not exist." % (filepath))
	print("Reading '%s' ..." % (filepath))
	with open(filepath, "r") as q:
		query_raw = q.read().replace('\n', ' ')
	query_in = ' '.join(query_raw.split())
	print("File read!")
	return query_in


# Returns authorization header for GitHub APIs
def get_gitauth():
	print("Reading authorization token...")
	# TODO: Might not really want this at global scope
	token = os.environ['GITHUB_API_TOKEN']
	authhead = 'Authorization: bearer ' + token
	print("Token read!")
	return authhead


# Query GitHub GraphQL API, return result as json dictionary
def query_github(authhead, gitquery, requestCount=0):
	tab = "    "
	apiError = False
	requestCount += 1
	maxRequests = 10

	print(tab + "Sending GraphQL query...")
	bashcurl = 'curl -iH TMPauthhead -X POST -d TMPgitquery https://api.github.com/graphql'
	bashcurl_list = bashcurl.split()
	bashcurl_list[2] = authhead
	bashcurl_list[6] = gitquery
	fullResponse = subprocess.check_output(bashcurl_list).decode().split('\r\n\r\n')
	heads = fullResponse[0].split('\r\n')
	if len(fullResponse) > 1:
		result = fullResponse[1]
	else:
		result = ""

	print(tab + "Checking response...")
	print(tab + heads[0])
	http = heads[0].split()
	statusNum = int(http[1])
	# Check for accepted but not yet processed, usually due to un-cached data
	if statusNum == 202:
		if requestCount >= maxRequests:
			return maxRequestFailure(maxRequests, tab)
		print(tab + "Query accepted but not yet processed. Trying again in 3sec...")
		time.sleep(3)
		return query_github(authhead, gitquery, requestCount)
	# Check for error responses
	if statusNum >= 400 or statusNum == 204:
		warnings.warn(result, Warning)
		apiError = True
	if statusNum == 502 or statusNum == 503:
		if requestCount >= maxRequests:
			return maxRequestFailure(maxRequests, tab)
		print(tab + "Server error. Trying again in 3sec...")
		time.sleep(3)
		return query_github(authhead, gitquery, requestCount)

	print(tab + "Data recieved!")
	outObj = json.loads(result)
	if "errors" in outObj.keys():
		warnings.warn(json.dumps(outObj["errors"]), Warning)

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
	print(tab + json.dumps(api))
	if not api["remaining"] > 0:
		print(tab + "Limit reached during query.")
		awaitReset(api["reset"])
		print(tab + "Repeating query...")
		return query_github(authhead, gitquery)

	if outObj:
		outObj["errors"] = apiError
	return outObj


# Query GitHub REST API, return result as json dictionary
def query_githubrest(authhead, endpoint, requestCount=0):  # e.g. endpoint = '/users/defunkt'
	tab = "    "
	apiError = False
	requestCount += 1
	maxRequests = 10

	print(tab + "Sending REST query...")
	bashcurl = 'curl -iH TMPauthhead https://api.github.com' + endpoint
	bashcurl_list = bashcurl.split()
	bashcurl_list[2] = authhead
	fullResponse = subprocess.check_output(bashcurl_list).decode().split('\r\n\r\n')
	heads = fullResponse[0].split('\r\n')
	if len(fullResponse) > 1:
		result = fullResponse[1]
	else:
		result = ""

	print(tab + "Checking response...")
	print(tab + heads[0])
	http = heads[0].split()
	statusNum = int(http[1])
	# Check for accepted but not yet processed, usually due to un-cached data
	if statusNum == 202:
		if requestCount >= maxRequests:
			return maxRequestFailure(maxRequests, tab)
		print(tab + "Query accepted but not yet processed. Trying again in 3sec...")
		time.sleep(3)
		return query_githubrest(authhead, endpoint, requestCount)
	# Check for error responses
	if statusNum >= 400 or statusNum == 204:
		warnings.warn(result, Warning)
		apiError = True
	if statusNum == 502 or statusNum == 503:
		if requestCount >= maxRequests:
			return maxRequestFailure(maxRequests, tab)
		print(tab + "Server error. Trying again in 3sec...")
		time.sleep(3)
		return query_githubrest(authhead, endpoint, requestCount)

	print(tab + "Data recieved!")

	# Parse headers
	del heads[0]
	headdict = {}
	linkDict = None
	for aHead in heads:
		h = aHead.split(': ')
		headdict[h[0]] = h[1]
	if "Link" in headdict:
		linkDict = parseRestLink(headdict["Link"])
		print(tab + json.dumps(linkDict))
	api = {}
	api["limit"] = int(headdict["X-RateLimit-Limit"])
	api["remaining"] = int(headdict["X-RateLimit-Remaining"])
	api["reset"] = int(headdict["X-RateLimit-Reset"])
	# Make sure the limit didn't run out
	print(tab + json.dumps(api))
	if not api["remaining"] > 0:
		print(tab + "Limit reached during query.")
		awaitReset(api["reset"])
		print(tab + "Repeating query...")
		return query_githubrest(authhead, endpoint)

	if result:
		result = '{ "data": ' + result + ' }'
	else:
		result = '{ "data": null }'
	outObj = json.loads(result)
	if outObj:
		outObj["errors"] = apiError
		if linkDict and outObj:
			for prop in linkDict.keys():
				outObj[prop] = linkDict[prop]
	return outObj


def maxRequestFailure(maxRequests, tab="    "):
	print(tab + "Query attempted but failed %d times" % (maxRequests))
	outObj = json.loads('{ "data": null }')
	outObj["errors"] = True
	return outObj


def awaitReset(utcTimeStamp):
	resetTime = pytz.utc.localize(datetime.utcfromtimestamp(utcTimeStamp))
	print("--- Timestamp")
	print("      " + time.strftime('%c'))
	now = pytz.utc.localize(datetime.utcnow())
	waitTime = round((resetTime - now).total_seconds()) + 1
	print("--- UTC Timestamp")
	print("      " + now.strftime('%c'))
	print("--- GITHUB NEEDS A BREAK Until UTC Timestamp")
	print("      " + resetTime.strftime('%c'))
	print("--- Waiting %d seconds..." % (waitTime))
	time.sleep(waitTime)
	print("--- READY!")


def parseRestLink(linkinfo):
	linkProperties = linkinfo.split(', ')
	propDict = {}
	for item in linkProperties:
		divided = re.split(r'&page=|>; rel="|"', item)
		propDict[divided[2]] = int(divided[1])
	return propDict
