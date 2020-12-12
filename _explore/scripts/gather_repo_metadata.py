from scraper.github import queryManager as qm

ghDataDir = "../../explore/github-data"
genDatafile = "%s/intReposInfo.json" % ghDataDir
topicsDatafile = "%s/intRepos_Topics.json" % ghDataDir
writeFile = "%s/intRepo_Metadata.json" % ghDataDir

# initialize data manager and load repo info
genDataCollector = qm.DataManager(genDatafile, True)

# initialize data manager and load repo topics
topicsCollector = qm.DataManager(topicsDatafile, True)

# initialize data manager to write collected info
infoWriter = qm.DataManager(writeFile, False)

print("\nGathering repo metadata...\n")

# iterate through repos
for repo in genDataCollector.data["data"]:

    repoData = {}

    repoObj = genDataCollector.data["data"][repo]

    repoData["name"] = repo
    repoData["description"] = repoObj["description"]
    repoData["website"] = repoObj["homepageUrl"]

    # gather any repo topics
    if repoObj["repositoryTopics"]["totalCount"] > 0:
        topicRepo = topicsCollector.data["data"][repo]
        topics = []
        for topicObj in topicRepo["repositoryTopics"]["nodes"]:
            topics.append(topicObj["topic"]["name"])
        repoData["topics"] = topics
    else:
        repoData["topics"] = None

    # record info for this repo
    infoWriter.data[repo] = repoData

# write data to file
infoWriter.fileSave(newline="\n")

print("\nDone!\n")
