from scraper.github import queryManager as qm
from os import environ as env
from datetime import date, timedelta

ghDataDir = env.get("GITHUB_DATA", "../github-data")
datfilepath = "%s/intRepos_StarHistory.json" % ghDataDir
queryPath = "../queries/repo-Stargazers.gql"

# Read repo info data file (to use as repo list)
inputLists = qm.DataManager("%s/intReposInfo.json" % ghDataDir, True)
# Populate repo list
repolist = []
print("Getting internal repos ...")
repolist = sorted(inputLists.data["data"].keys())
print("Repo list complete. Found %d repos." % (len(repolist)))

# Initialize query manager
queryMan = qm.GitHubQueryManager()

# Initialize data collector
dataCollector = qm.DataManager(datfilepath, False)
dataCollector.data = {"data": {}}

# Iterate through internal repos
print("Gathering data across multiple paginated queries...")
for repo in repolist:
    print("\n'%s'" % (repo))

    r = repo.split("/")
    try:
        outObj = queryMan.queryGitHubFromFile(
            queryPath,
            {"ownName": r[0], "repoName": r[1], "numUsers": 100, "pgCursor": None},
            paginate=True,
            cursorVar="pgCursor",
            keysToList=["data", "repository", "stargazers", "edges"],
        )
    except Exception as error:
        print("Warning: Could not complete '%s'" % (repo))
        print(error)
        continue

    # Update collective data
    dataCollector.data["data"][repo] = outObj["data"]["repository"]

    print("'%s' Done!" % (repo))

print("\nCollective data gathering complete!")


def next_weekday(d, weekday):
    days_ahead = weekday - d.weekday()
    if days_ahead <= 0:
        days_ahead += 7
    return d + timedelta(days_ahead)


def toDate(isoStr):
    return next_weekday(date.fromisoformat(isoStr["starredAt"].split("T")[0]), 0)


for repo in dataCollector.data["data"]:
    dateRange = list(
        map(toDate, dataCollector.data["data"][repo]["stargazers"]["edges"])
    )
    dateList = []
    dateElement = {"date": None, "value": None}
    for dateEntry in dateRange:
        if dateElement["date"] is None:
            dateElement["date"] = dateEntry.isoformat()
            dateElement["value"] = 1
        elif dateElement["date"] == dateEntry.isoformat():
            dateElement["value"] += 1
        else:
            dateList.append(dateElement.copy())
            dateElement["date"] = dateEntry.isoformat()
            dateElement["value"] = 1
    dataCollector.data["data"][repo] = dateList

# Write output files
dataCollector.fileSave(newline="\n")

print("\nDone!\n")
