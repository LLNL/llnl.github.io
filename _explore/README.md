# How to Generate New Data

```bash
cd _explore/scripts/
./MASTER.sh
```

_(Additional script functionality detailed in the [`./scripts` section below][jump2 scripts].)_

**IMPORTANT!**  
Data fetching scripts require an environment variable `GITHUB_API_TOKEN` containing a valid GitHub [OAuth token][oauth] or [personal access token][personaltoken].  
You will also need to install the Python dependencies as listed in [`requirements.txt`][requires].

# About the Contents of this Directory

## [./input_lists.json][inputs file]

Simple text files containing input lists. (e.g. list of organizations, list of independent repositories)

## [./queries][queries dir]

The actual queries sent to [GitHub's GraphQL API][gitgraphql] when the data fetching scripts are run. This makes writing/editing queries easier, as it allows them to remain in individual, human-readable text files.

## [./scripts][scripts dir]

Scripts for data fetching and manipulation. Data is written to [`explore/github-data`][data dir] in appropriate json formats.

New files are created for each type of data structure.  
For most files, data is overwritten each time the scripts are run.  
Other scripts may collect cumulative data with a daily timestamp. If one of these scripts is run multiple times in a single day, the entry for that day will be overwritten.

Running [`MASTER.sh`][mastersh] will run all of the necessary scripts in the appropriate order to fetch the latest data. It will also update [`LAST_MASTER_UPDATE.txt`][lastmasterup] to record when this complete data update was last run.

The scripts are only for gathering new data. You do not need them to run in order to view the webpage visualizations.

[jump2 scripts]: #scripts
[inputs file]: input_lists.json
[data dir]: ../explore/github-data
[queries dir]: queries
[scripts dir]: scripts
[requires]: scripts/requirements.txt
[mastersh]: scripts/MASTER.sh
[lastmasterup]: LAST_MASTER_UPDATE.txt
[gitgraphql]: https://developer.github.com/v4/
[oauth]: https://github.com/settings/developers
[personaltoken]: https://github.com/settings/tokens
