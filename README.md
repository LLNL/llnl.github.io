# LLNL Software Catalog

Author: Ian Lee <lee1001@llnl.gov>

Welcome to the Lawrence Livermore National Laboratory software catalog! The purpose of this website is to serve as a hub for open source software produced by LLNL.

LLNL produces software on a daily basis. Some of this software is used only internally, other components are licensed for use by external partners and collaborators, still other software is released, or even actively developed, in the open on software hosting platforms such as GitHub.com, Bitbucket.org, Sourceforge.net, and others.

## Prerequisites

Before you begin, make sure you have working installs of Git, Ruby, and [Bundler](https://bundler.io). You will need these tools for development.

## Getting Started

To work locally, first clone into the repository:

```bash
git clone https://github.com/LLNL/llnl.github.io.git
```

Make sure you are in the directory you just created by running `cd llnl.github.io` Then you can use `bundler` to install the Ruby dependencies (see the [Jekyll installation docs](https://jekyllrb.com/docs/installation/) for step-by-step guides to setting this up):

```bash
bundle install
```

Running this will install everything in your Gemfile (including Jekyll).

```bash
bundle exec jekyll serve
```

Finally, open <http://localhost:4000> in a web browser.

*Note:* The [RADIUSS website](https://software.llnl.gov/radiuss/) and [product catalog](https://software.llnl.gov/radiuss/projects/) "live" on this site but are managed by a [separate repo](https://github.com/LLNL/radiuss).

### Checking Spelling

The [GitHub workflow](.github/workflows/main.yaml) currently includes an action for
a Rust tool called [crate-ci/typos](https://github.com/marketplace/actions/typos-action)
that will spell check all posts and pages. If you CI fails, the spelling suggestions will be shown and you can manually
update the mistakes, or [install typos](https://github.com/crate-ci/typos#install)
and have all errors fixed automatically:

```bash
typos ./pages ./_posts ./README.md --write-changes
```

If there is a word that needs to be ignored, see [instructions](https://github.com/crate-ci/typos#false-positives)
for adding an entry to the [_typos.toml](_typos.toml) file.

### Tips

The gems in your sourcefile get updated frequently. It is a good idea to occasionally run `bundle update` from within your project's root directory to make sure the software on your computer is up to date.

Sometimes there can be dependency conflicts if your local version of Ruby is different from this repo or GitHub pages deployment settings. You can find the version number of each of GitHub Page's current dependency's [here](https://pages.github.com/versions/). You can often avoid dependency issues if you use the same versions, including for Ruby.

For example, the default version of Ruby used to deploy GitHub Pages on github.com as of 2021-04-08 was Ruby 2.7.1. If you tried running Ruby version 3.0.0 locally on macOS, you'll need to do some extra steps to correctly install the dependencies for this repository. You'd need to run `bundle add webrick` as it is no longer a prepackaged dependency with Ruby in 3.0.0. You may also need to run `gem install eventmachine -- --with-openssl-dir=/usr/local/opt/openssl@1.1` as MacOS >10.14 doesn't use OpenSSL from the same path as is still assumed to be in by eventmachine.

## Contributions and Catalog Requirements

Start with the [FAQ](https://software.llnl.gov/about/faq/). Please see the following `README` files for additional instructions:

- Catalog categories: see below
- [Project logos](https://github.com/LLNL/llnl.github.io/blob/main/assets/images/logos/README.md)
- [News posts](https://github.com/LLNL/llnl.github.io/blob/main/news/README.md)
- Data [visualizations](https://github.com/LLNL/llnl.github.io/blob/main/_visualize/README.md) and [scripts](https://github.com/LLNL/llnl.github.io/blob/main/_visualize/scripts/README.md)
- [Data fetching](https://github.com/LLNL/llnl.github.io/blob/main/visualize/README.md)
- [RADIUSS site](https://github.com/LLNL/radiuss/blob/main/README.md)

### Catalog Categories

A [JSON file](https://github.com/LLNL/llnl.github.io/blob/main/visualize/github-data/category_info.json) contains the info for the software catalog categories displayed on the home page. If any changes need to be made to these categories, just edit the data in the JSON and the home page will reflect your changes automatically. (These catalog categories/topics are distinct from the category tags on [News posts](https://github.com/LLNL/llnl.github.io/blob/main/news/README.md).)

A repository can have up to 20 tags. The list below also contains each category's blurb to ensure consistency in phrasing and length. Note that in some cases the category is plural but the corresponding tag is singular.

For each category, this file contains its title, [icon][icon dir] filepath, and category description. This data is read by the [category info javascript][js dir].

[icon dir]: ../assets/images/
[js dir]: ../js/category-info.js

- **App Infrastructure**: Browse tools for basic functionality common in HPC codes - `app-infrastructure`
- **Applications**: Browse scientific simulation codes and IT management tools - `application`
- **Build Tools**: Automate and simplify complex dependencies and deployments - `build-tools`
- **Data Management & Viz**: Manage visualizations with robust features and configurable analysis - `data-management`, `data-viz`
- **Docs & Tutorials**: Learn more about our software via documentation, examples, and tutorials - `docs`, `documentation`, `tutorial`, `tutorials`
- **File Systems**: Configure data storage and retrieval for more efficient workloads - `file-system`
- **Full Catalog / All Software**: Browse all LLNL open source projects - no tags required
- **Math & Physics Libraries**: Optimize solvers, higher order methods, and AMR frameworks - `math-physics`
- **Performance & Workflow**: Manage and scale complex workflows, tracking, and data collection - `performance`, `workflows`
- **Portable Execution & Memory Mgmt**: Automate data motion and memory allocation on advanced architectures - `memory-management`, `portability`
- **Proxy Applications**: Prepare for testing and porting applications - `proxy-application`
- **System Software**: Manage laptop and desktop computer systems, HPC clusters, and parallel environments - `system-software`

In general, topic tags raise a repo's visibility on GitHub and help users find related projects. The following tags, which are are not associated with the home page categories above, are recommended for LLNL repos: `amr` (adaptive mesh refinement), `arbitrary-lagrangian-eulerian` (ALE), `artificial-intelligence`, `benchmark`, `biology`, `checkpoint`, `chemistry`, `cmake`, `compiler`, `cpp` (C++), `data-analysis`, `deep-learning`, `energy`, `exascale-computing`, `finite-elements`, `fortran`, `gpu`, `graph`, `high-dimensional-data`, `hpc`, `java`, `javascript`, `library`, `machine-learning`, `materials`, `materials-science`, `matlab`, `molecular-dynamics`, `monte-carlo`, `mpi`, `natural-language-processing`, `neural-network`, `openmp`, `parallel-computing`, `pde`, `python`, `seismology`, `shell`, `simulation`, `solver`, `templates`, `testing`, `uncertainty-quantification`.

Repos that appear on the [RADIUSS site](https://software.llnl.gov/radiuss/projects/) are listed in that repo's [`contributor-ci.yaml` file](https://github.com/LLNL/radiuss/blob/main/contributor-ci.yaml).

To add a new category to the catalog:

1. Update the list above with the category name (in alphabetical order), description, and tag.
2. Update [`category_info.json`](https://github.com/LLNL/llnl.github.io/blob/main/visualize/github-data/category_info.json) with category metadata such as Font Awesome icon, descriptive blurb, and corresponding topic(s). (See also the [Data fetching README](https://github.com/LLNL/llnl.github.io/blob/main/visualize/README.md) for Font Awesome syntax.)
3. Tag repos with the new topic as appropriate.

To add your repo to the catalog, see instructions in [the site FAQ](https://software.llnl.gov/about/faq/#how-do-i-include-my-repo-in-the-llnl-organization-andor-this-websites-catalog).

## Contact

If you have any questions or would like to request a private repository, please don't hesitate to contact [Ian Lee](mailto:ian@llnl.gov) or one of [the GitHub organization admins](mailto:github-admin@llnl.gov).

You can also find us on our mailing list: <open-source@llnl.gov>.

## Release

The code of this site is released under the MIT License. For more details, see the
[LICENSE](LICENSE) File.

LLNL-CODE-705597
LLNL-WEB-680594
