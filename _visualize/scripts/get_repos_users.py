from scraper.github import queryManager as qm
from os import environ as env

ghDataDir = env.get("GITHUB_DATA", "../github-data")
datfilepathExt = "%s/extUsers.json" % ghDataDir
datfilepathInt = "%s/intUsers.json" % ghDataDir
queryPath = "../queries/repo-Users.gql"

# Read repo info data file (to use as repo list)
inputLists = qm.DataManager("%s/intReposInfo.json" % ghDataDir, True)
# Populate repo list
repolist = []
print("Getting internal repos ...")
repolist = sorted(inputLists.data["data"].keys())
print("Repo list complete. Found %d repos." % (len(repolist)))

# Initialize internal user data collector
# and Read internal user data file (to use as member list)
dataCollectorInt = qm.DataManager(datfilepathInt, True)
# Populate member list
memberlist = []
print("Getting internal members ...")
memberlist = sorted(dataCollectorInt.data["data"].keys())
print("Member list complete. Found %d users." % (len(memberlist)))

# Initialize external user data collector
dataCollectorExt = qm.DataManager(datfilepathExt, False)
dataCollectorExt.data = {"data": {}}

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
            {"ownName": r[0], "repoName": r[1], "numUsers": 50, "pgCursor": None},
            paginate=True,
            cursorVar="pgCursor",
            keysToList=["data", "repository", "mentionableUsers", "nodes"],
        )
    except Exception as error:
        print("Warning: Could not complete '%s'" % (repo))
        print(error)
        continue

    # Update collective data
    for user in outObj["data"]["repository"]["mentionableUsers"]["nodes"]:
        userKey = user["login"]
        if userKey in memberlist:
            if (
                "contributedLabRepositories"
                not in dataCollectorInt.data["data"][userKey]
            ):
                dataCollectorInt.data["data"][userKey]["contributedLabRepositories"] = {
                    "nodes": []
                }
            dataCollectorInt.data["data"][userKey]["contributedLabRepositories"][
                "nodes"
            ].append(repo)
            dataCollectorInt.data["data"][userKey]["contributedLabRepositories"][
                "nodes"
            ].sort()
        else:
            if userKey not in dataCollectorExt.data["data"]:
                dataCollectorExt.data["data"][userKey] = user
                dataCollectorExt.data["data"][userKey]["contributedLabRepositories"] = {
                    "nodes": []
                }
            dataCollectorExt.data["data"][userKey]["contributedLabRepositories"][
                "nodes"
            ].append(repo)
            dataCollectorExt.data["data"][userKey]["contributedLabRepositories"][
                "nodes"
            ].sort()

    print("'%s' Done!" % (repo))

print("\nCollective data gathering complete!")

# Write output files
dataCollectorExt.fileSave(newline="\n")
dataCollectorInt.fileSave(newline="\n")

print("\nDone!\n")
