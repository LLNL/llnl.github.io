# LLNL Software Catalog

Author: Ian Lee <lee1001@llnl.gov>

Welcome to the Lawrence Livermore National Laboratory software portal! The purpose of this software portal is to serve as a hub for open source software that is produced by Lawrence Livermore National Laboratory.

LLNL produces software on a daily basis. Some of this software is used only internally, other components are licensed for use by external partners and collaborators, still other software is released, or even actively developed, in the open on software hosting platforms such as GitHub.com, Bitbucket.org, Sourceforge.net, and others.
### Prerequisites

Before you begin, make sure you have working installs of Git, Ruby, and Bundler <https://bundler.io/> You will need these tools for development.

### Getting Started

To work locally, first clone into the repository:

```
git clone https://github.com/LLNL/llnl.github.io.git
```

Make sure you are in the directory you just created by running `cd llnl.github.io` Then you can use `bundler` to install the Ruby dependencies:

```
bundle install
```

Running this will install everything in your Gemfile (including Jekyll). Finally, run the development web server with:

```
bundle exec jekyll serve
```

Followed by opening http://localhost:4000 in a web browser.

#### Deployment

To deploy updated content, use:

```
make deploy
```

This will build the site, and rsync it to the staging server. The staging server is sync'd to the production server every 15 minutes. So be patient. :)

#### Tips

The gems in your sourcefile get updated frequently. It is a good idea to occasionally run `bundle update` from within your project's root directory to make sure the sotware on your computer is up to date.

### Contact

If you have any questions or would like to request a private repository, please don't hesitate to contact [Ian Lee](mailto:ian@llnl.gov) or one of [the GitHub organization admins](mailto:github-admin@llnl.gov).

You can also find us on our mailing list: <open-source@llnl.gov>

## Release

The code of this site is released under the MIT License. For more details see the
[LICENSE](LICENSE) File.

LLNL-CODE-705597
LLNL-WEB-680594
