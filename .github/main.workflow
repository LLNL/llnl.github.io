workflow "Scheduled Data Updates" {
  on = "schedule(15 8/12 * * *)"
  resolves = ["Run Data Update"]
}

action "Run Data Update" {
  uses = "./_action-update"
  secrets = [
    "GITHUB_TOKEN",
    "BOT_TOKEN",
  ]
  env = {
    DATA_BRANCHNAME = "bot-data-update"
    GIT_EMAIL = "lc-bot@users.noreply.github.com"
    GIT_NAME = "David B. Ott"
  }
}

workflow "Pull Request for Data Updates" {
  on = "push"
  resolves = ["Create Pull Request"]
}

action "Create Pull Request" {
  uses = "vsoch/pull-request-action@master"
  secrets = ["GITHUB_TOKEN"]
  env = {
    BRANCH_PREFIX = "bot-data-update"
    PULL_REQUEST_BRANCH = "master"
  }
}
