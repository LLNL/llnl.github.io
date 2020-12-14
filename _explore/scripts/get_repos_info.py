from scraper.github import queryManager as qm
from os import environ as env

ghDataDir = env.get("GITHUB_DATA", "../github-data")
datfilepath = "%s/intReposInfo.json" % ghDataDir
queryPath = "../queries/org-Repos-Info.gql"
queryPathInd = "../queries/repo-Info.gql"

# Read input lists of organizations and independent repos of interest
inputLists = qm.DataManager("../input_lists.json", True)
orglist = inputLists.data["orgs"]
repolist = inputLists.data["repos"]

# Initialize data collector
dataCollector = qm.DataManager(datfilepath, False)
dataCollector.data = {"data": {}}

# Initialize query manager
queryMan = qm.GitHubQueryManager()

# Iterate through orgs of interest
print("Gathering data across multiple paginated queries...")
for org in orglist:
    print("\n'%s'" % (org))

    try:
        outObj = queryMan.queryGitHubFromFile(
            queryPath,
            {"orgName": org, "numRepos": 50, "pgCursor": None},
            paginate=True,
            cursorVar="pgCursor",
            keysToList=["data", "organization", "repositories", "nodes"],
        )
    except Exception as error:
        print("Warning: Could not complete '%s'" % (org))
        print(error)
        continue

    # Update collective data
    for repo in outObj["data"]["organization"]["repositories"]["nodes"]:
        repoKey = repo["nameWithOwner"]
        dataCollector.data["data"][repoKey] = repo

    print("'%s' Done!" % (org))

print("\nCollective data gathering Part1of2 complete!")

# Iterate through independent repos
print("Adding independent repos...")
print("Gathering data across multiple queries...")
for repo in repolist:
    print("\n'%s'" % (repo))

    r = repo.split("/")
    try:
        outObj = queryMan.queryGitHubFromFile(
            queryPathInd, {"ownName": r[0], "repoName": r[1]}
        )
    except Exception as error:
        print("Warning: Could not complete '%s'" % (repo))
        print(error)
        continue

    # Update collective data
    repoKey = outObj["data"]["repository"]["nameWithOwner"]
    dataCollector.data["data"][repoKey] = outObj["data"]["repository"]

    print("'%s' Done!" % (repo))

print("\nCollective data gathering Part2of2 complete!")

# Write output file
dataCollector.fileSave(newline="\n")

print("\nDone!\n")
