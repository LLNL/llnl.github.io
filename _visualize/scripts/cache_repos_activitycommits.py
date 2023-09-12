from scraper.github import queryManager as qm
from os import environ as env
import re

ghDataDir = env.get("GITHUB_DATA", "../github-data")
query_in = "/repos/OWNNAME/REPONAME/stats/commit_activity"

# Read repo info data file (to use as repo list)
inputLists = qm.DataManager("%s/intReposInfo.json" % ghDataDir, True)
# Populate repo list
repolist = []
print("Getting internal repos ...")
repolist = sorted(inputLists.data["data"].keys())
print("Repo list complete. Found %d repos." % (len(repolist)))

# Initialize data collector
dataCollector = qm.DataManager()
dataCollector.data = {"data": {}}

# Initialize query manager
queryMan = qm.GitHubQueryManager(maxRetry=1, retryDelay=1)

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

    print("'%s' Done!" % (repo))

print("\nCache requests complete!")
print("\nDone!\n")
