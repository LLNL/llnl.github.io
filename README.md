# LLNL Software Catalog

Author: Ian Lee <lee1001@llnl.gov>

Welcome to the Lawrence Livermore National Laboratory software portal! The purpose of this software portal is to serve as a hub for open source software produced by LLNL.

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

- [Project logos](https://github.com/LLNL/llnl.github.io/blob/main/assets/images/logos/README.md)
- ["Explore" categories](https://github.com/LLNL/llnl.github.io/blob/main/pages/explore/README.md)
- [News posts](https://github.com/LLNL/llnl.github.io/blob/main/pages/news/README.md)
- Data [visualizations](https://github.com/LLNL/llnl.github.io/blob/main/_visualize/README.md) and [scripts](https://github.com/LLNL/llnl.github.io/blob/main/_visualize/scripts/README.md)
- [Data fetching](https://github.com/LLNL/llnl.github.io/blob/main/visualize/README.md)
- [RADIUSS site](https://github.com/LLNL/radiuss/blob/main/README.md)

## Contact

If you have any questions or would like to request a private repository, please don't hesitate to contact [Ian Lee](mailto:ian@llnl.gov) or one of [the GitHub organization admins](mailto:github-admin@llnl.gov).

You can also find us on our mailing list: <open-source@llnl.gov>.

## Release

The code of this site is released under the MIT License. For more details, see the
[LICENSE](LICENSE) File.

LLNL-CODE-705597
LLNL-WEB-680594
