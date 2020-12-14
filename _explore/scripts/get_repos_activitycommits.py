from scraper.github import queryManager as qm
from os import environ as env
import re
from datetime import datetime

ghDataDir = env.get("GITHUB_DATA", "../github-data")
datfilepath = "%s/intRepos_ActivityCommits.json" % ghDataDir
query_in = "/repos/OWNNAME/REPONAME/stats/commit_activity"

# Read repo info data file (to use as repo list)
inputLists = qm.DataManager("%s/intReposInfo.json" % ghDataDir, True)
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
        # Remove per-day data, keep only weekly totals
        try:
            del item["days"]
        except KeyError:
            pass
        # Convert unix timestamps into standard dates (rounded to nearest week to improve aggregate data)
        weekinfo = datetime.utcfromtimestamp(item["week"]).isocalendar()
        weekstring = str(weekinfo[0]) + "-W" + str(weekinfo[1]) + "-1"
        item["week"] = datetime.strptime(weekstring, "%Y-W%W-%w").strftime("%Y-%m-%d")

    # Update collective data
    dataCollector.data["data"][repo] = outObj

    print("'%s' Done!" % (repo))

print("\nCollective data gathering complete!")

# Write output file
dataCollector.fileSave(newline="\n")

print("\nDone!\n")
