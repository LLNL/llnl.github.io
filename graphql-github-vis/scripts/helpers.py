import os.path
import json
import subprocess


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
	if '"message": "Bad credentials"' in result :
		raise RuntimeError("Invalid response; Bad GitHub credentials")
	print tab+"Data recieved!"
	outObj = json.loads(result)
	return outObj

# Query GitHub REST API, return result as json dictionary
def query_githubrest(authhead,endpoint): # e.g. endpoint = '/users/defunkt'
	tab = "    "
	print tab+"Sending REST query..."
	bashcurl = 'curl -H TMPauthhead https://api.github.com'+endpoint
	bashcurl_list = bashcurl.split()
	bashcurl_list[2] = authhead
	result = subprocess.check_output(bashcurl_list)
	print tab+"Checking response..."
	if '"message": "Bad credentials"' in result :
		raise RuntimeError("Invalid response; Bad GitHub credentials")
	if result :
		print tab+"Data recieved!"
		result = '{ "data": '+result+' }'
	else :
		print tab+"NULL recieved"
		result = '{ "data": null }'
	outObj = json.loads(result)
	return outObj
