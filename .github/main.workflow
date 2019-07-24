workflow "Scheduled Data Updates" {
  resolves = ["Run Data Update"]
  on = "schedule(15 8/12 * * *)"
}

action "Run Data Update" {
  uses = "./_action-update"
  secrets = ["GITHUB_TOKEN"]
  env = {
    DATA_BRANCHNAME = "bot-data-update"
    GIT_EMAIL = "lc-bot@users.noreply.github.com"
    GIT_NAME = "David B. Ott"
  }
}
