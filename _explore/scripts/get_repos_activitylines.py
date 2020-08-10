from scraper.github import queryManager as qm
from os import environ as env
import re
from datetime import datetime

ghDataDir = env.get("GITHUB_DATA", "../github-data")
datfilepath = "%s/labRepos_ActivityLines.json" % ghDataDir
query_in = "/repos/OWNNAME/REPONAME/stats/code_frequency"

# Read repo info data file (to use as repo list)
inputLists = qm.DataManager("%s/labReposInfo.json" % ghDataDir, True)
# Populate repo list
repolist = []
print("Getting internal repos ...")
repolist = sorted(inputLists.data["data"].keys())
print("Repo list complete. Found %d repos." % (len(repolist)))

# Initialize data collector
dataCollector = qm.DataManager(datfilepath, False)
dataCollector.data = {"data": {}}

# Initialize query manager
queryMan = qm.GitHubQueryManager()

# Iterate through internal repos
print("Gathering data across multiple queries...")
for repo in repolist:
    print("\n'%s'" % (repo))

    r = repo.split("/")

    gitquery = re.sub("OWNNAME", r[0], query_in)
    gitquery = re.sub("REPONAME", r[1], gitquery)

    try:
        outObj = queryMan.queryGitHub(gitquery, rest=True)
    except Exception as error:
        print("Warning: Could not complete '%s'" % (repo))
        print(error)
        continue

    for item in outObj:
        # Convert unix timestamps into standard dates
        weekinfo = datetime.utcfromtimestamp(item[0]).isocalendar()
        weekstring = str(weekinfo[0]) + "-W" + str(weekinfo[1]) + "-1"
        item[0] = datetime.strptime(weekstring, "%Y-W%W-%w").strftime("%Y-%m-%d")

    # Update collective data
    dataCollector.data["data"][repo] = outObj

    print("'%s' Done!" % (repo))

print("\nCollective data gathering complete!")

# Write output file
dataCollector.fileSave()

print("\nDone!\n")
