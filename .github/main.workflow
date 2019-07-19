workflow "Data Auto Update" {
  on = "schedule(0 1 * * *)"
  resolves = ["./_action-update"]
}

action "./_action-update" {
  uses = "./kljhuk"
  secrets = ["GITHUB_TOKEN"]
}
