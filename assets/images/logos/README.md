# Project Logos

The home page displays a logo next to each repo when they appear under the topic categories. This feature applies only to the home page, not to the [Explore](https://software.llnl.gov/explore/#/AllSoftware) view.

If a repo has its own logo, that should display. If not, then its organization's avatar should display. Every repo should have one logo or avatar; no repo should be "empty." Organization avatars are pulled from GitHub.

Repo logo files should follow a naming convention and be added to the [logos directory](https://github.com/LLNL/llnl.github.io/tree/main/assets/images/logos). All files must be in .png format.

- Repository logo: `<repo_name>.png` (`org.png` is acceptable for repos in non-LLNL orgs, as they are unique inside their directory folders)
- Directory: `/assets/images/logos/<org name>`

An LLNL repo with its own logo also needs the image file name added to [`repo_logos.json`](https://github.com/LLNL/llnl.github.io/blob/main/assets/images/logos/repo_logos.json).
