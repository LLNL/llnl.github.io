from scraper.github import queryManager as qm
from os import environ as env

ghDataDir = env.get("GITHUB_DATA", "../github-data")
datfilepath = "%s/extRepos.json" % ghDataDir
queryPath = "../queries/user-Repos.gql"

# Read repo info data file (to use as repo list)
inputLists = qm.DataManager("%s/intReposInfo.json" % ghDataDir, True)
# Populate repo list
repolist = []
print("Getting internal repos ...")
repolist = sorted(inputLists.data["data"].keys())
print("Repo list complete. Found %d repos." % (len(repolist)))

# Read internal user data file (to use as member list)
inputLists = qm.DataManager("%s/intUsers.json" % ghDataDir, True)
# Populate member list
memberlist = []
print("Getting internal members ...")
memberlist = sorted(inputLists.data["data"].keys())
print("Member list complete. Found %d users." % (len(memberlist)))

# Initialize data collector
dataCollector = qm.DataManager(datfilepath, False)
dataCollector.data = {"data": {}}

# Initialize query manager
queryMan = qm.GitHubQueryManager()

# Iterate through internal members
print("Gathering data across multiple paginated queries...")
for usr in memberlist:
    print("\n'%s'" % (usr))

    try:
        outObj = queryMan.queryGitHubFromFile(
            queryPath,
            {"userName": usr, "numRepos": 50, "pgCursor": None},
            paginate=True,
            cursorVar="pgCursor",
            keysToList=["data", "user", "repositoriesContributedTo", "nodes"],
        )
    except Exception as error:
        print("Warning: Could not complete '%s'" % (usr))
        print(error)
        continue

    # Update collective data
    for repo in outObj["data"]["user"]["repositoriesContributedTo"]["nodes"]:
        repoKey = repo["nameWithOwner"]
        if repoKey in repolist:
            continue
        if repoKey not in dataCollector.data["data"]:
            dataCollector.data["data"][repoKey] = repo
            dataCollector.data["data"][repoKey]["labContributors"] = {"nodes": []}
        dataCollector.data["data"][repoKey]["labContributors"]["nodes"].append(usr)
        dataCollector.data["data"][repoKey]["labContributors"]["nodes"].sort()

    print("'%s' Done!" % (usr))

print("\nCollective data gathering complete!")

# Write output file
dataCollector.fileSave(newline="\n")

print("\nDone!\n")
