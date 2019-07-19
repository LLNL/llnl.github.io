workflow "Data Auto Update" {
  on = "schedule(0 1 * * *)"
  resolves = ["./_action-update"]
}

action "action update" {
  uses = "./_action-update/"
  secrets = ["GITHUB_TOKEN"]
}
