import helpers
import json
import re
import time

date = (time.strftime("%Y-%m-%d"))
datfilepath = "../github-data/reposUsers.json"
allData = {}

# Check for and read existing data file
allData = helpers.read_existing(datfilepath)

# Read user repo data file (to use as member list)
usrsReposObj = helpers.read_json("../github-data/usrsRepos.json")
if not date in dataObj :
	raise RuntimeError("No usrsRepos data for "+date)

# Read repo ownership data file (to use as org repo list)
reposOwnershipObj = helpers.read_json("../github-data/reposOwnership.json")
if not date in dataObj :
	raise RuntimeError("No reposOwnership data for "+date)

#TODO