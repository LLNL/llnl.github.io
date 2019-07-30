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
    BRANCH_PREFIX = "bot-update/"
    GIT_EMAIL = "lc-bot@users.noreply.github.com"
    GIT_NAME = "David B. Ott"
  }
}
