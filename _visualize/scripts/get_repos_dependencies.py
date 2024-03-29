from scraper.github import queryManager as qm
from os import environ as env

ghDataDir = env.get("GITHUB_DATA", "../github-data")
datfilepath = "%s/intRepos_Dependencies.json" % ghDataDir
queryPath = "../queries/repo-Dependencies.gql"

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
queryMan = qm.GitHubQueryManager(maxRetry=10, retryDelay=1)

# Iterate through internal repos
print("Gathering data across multiple paginated queries...")
for repo in repolist:
    print("\n'%s'" % (repo))

    r = repo.split("/")
    try:
        outObj = queryMan.queryGitHubFromFile(
            queryPath,
            {
                "ownName": r[0],
                "repoName": r[1],
                "numManifests": 100,
                "numDependents": 100,
                "pgCursor": None,
            },
            paginate=True,
            cursorVar="pgCursor",
            keysToList=["data", "repository", "dependencyGraphManifests", "nodes"],
            headers={"Accept": "application/vnd.github.hawkgirl-preview+json"},
        )
    except Exception as error:
        print("Warning: Could not complete '%s'" % (repo))
        print(error)
        continue

    # Update collective data
    dataCollector.data["data"][repo] = outObj["data"]["repository"]

    print("'%s' Done!" % (repo))

print("\nCollective data gathering complete!")

# Write output file
dataCollector.fileSave(newline="\n")

print("\nDone!\n")
