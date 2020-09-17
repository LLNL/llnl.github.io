from scraper.github import queryManager as qm
from os import environ as env

ghDataDir = env.get("GITHUB_DATA", "../github-data")
datfilepath = "%s/dependencyInfo.json" % ghDataDir
queryPath = "../queries/dependency-Info.gql"

# Read repo info data file (to use as repo list)
inputLists = qm.DataManager("%s/labRepos_Dependencies.json" % ghDataDir, True)
# Populate repo list
repolist = []
print("Getting internal repos ...")
for repoName in inputLists.data["data"]:
    for node in inputLists.data["data"][repoName]["dependencyGraphManifests"]["nodes"]:
        for repo in node["dependencies"]["nodes"]:
            if (
                repo["repository"] is not None
                and repo["repository"]["nameWithOwner"] is not None
            ):
                repolist.append(repo["repository"]["nameWithOwner"])
repolist = list(dict.fromkeys(repolist))
repolist = sorted(repolist)
print("Repo list complete. Found %d repos." % (len(repolist)))

# Initialize data collector
dataCollector = qm.DataManager(datfilepath, False)
dataCollector.data = {"data": {}}

# Initialize query manager
queryMan = qm.GitHubQueryManager()

# Iterate through internal repos
print("Gathering data across multiple paginated queries...")
for repo in repolist:
    print("\n'%s'" % (repo))

    r = repo.split("/")
    try:
        outObj = queryMan.queryGitHubFromFile(
            queryPath,
            {"ownName": r[0], "repoName": r[1],},
            paginate=False,
            cursorVar="pgCursor",
            keysToList=["data", "languages", "owner"],
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
dataCollector.fileSave()

print("\nDone!\n")
