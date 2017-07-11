---
title: Using GitHub
layout: default
---

{::options gfm_quirks: "paragraph_end" /}

## {{ page.title }}
{: .page-header}

### Introduction

If you're new to GitHub and open source in general, figuring out how to get set up can be a challenge. This guide is for getting started with GitHub, and specifically targets LLNL developers working in the [LLNL GitHub organization](https://github.com/LLNL).

### Setting up your GitHub Account

If you're new to GitHub, you may want to read through the GitHub Help pages on [Setting up and managing your GitHub profile](https://help.github.com/categories/setting-up-and-managing-your-github-profile/). Here are some of the highlights:

1. [Create an account on GitHub](https://github.com/join)

    - You *do not need* a separate work account and personal account, unless you prefer to.

2. [Update your profile information](https://github.com/settings/profile)

    - **Photo**: A headshot photo, or image that is uniquely you.
    - **Name**: Your first and last name.
    - **Bio**: Include a few words about yourself! Don't forget to mention @LLNL.
    - **URL**: This might be your https://people.llnl.gov page, or a personal website if you prefer.
    - **Company**: Probably `Lawrence Livermore National Laboratory, @LLNL`.
    - **Location**: Your primary location.

3. Add your `@LLNL` email address (and any aliases) to your [Email Settings](https://github.com/settings/emails) page.

    - This will link any commits done via [your Git identity](https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup#Your-Identity) to your GitHub account.

4. [Enable Two-factor authentication](https://github.com/settings/security)

    - *This will soon be a requirement for membership in the @LLNL GitHub organization.*
    - Two-factor authentication is set at your account level.
    - You will be given the option to setup two-factor authentication with an app (such as Google Authenticator) or SMS.
    - Selecting either option also provides you with a list of recovery codes to get into your account in the event you are locked out.
    - If you setup with an app, you will still have the option to set a backup SMS number (recommended).
    - For more information, check out the [Two-factor Authentication](https://github.com/blog/1614-two-factor-authentication) post on the GitHub Blog.


### Joining the Organization

If you are an employee at LLNL, and have 2FA enabled, congratulations, you are eligible to join the LLNL GitHub organization!

1. Send an email, with your GitHub username included, to [github-admin@llnl.gov](mailto:github-admin@llnl.gov) from your `@llnl.gov` email, requesting to be added to the organization.

2. After an administrator has added you to the organization, you will receive a notification email from GitHub.

    - Alternatively, once the invitation has been sent, you will see a notification banner at the top of https://github.com/llnl which you can use to accept the invitation.

3. Head over to the [@LLNL People](https://github.com/orgs/LLNL/people) page make your membership `Public`.

4. Welcome to the organization!

### Working with LLNL Repositories

Repositories within the LLNL organization are owned and managed by LLNL. Please do not create personal repositories here.

#### Private Repositories

The LLNL GitHub Organization has a limited number (currently 50) of private repositories available for LLNL Employees to host software not ready or not applicable for unlimited public release. In general, we would like to encourage that all open source work be done completely in the open, but we want to be able to provide the flexibility to have some privacy available, e.g. for industrial partnerships, university collaborations leading up to a publication, etc.

Remember that these repositories are *still hosted* on GitHub servers, and content placed in them should be limited to "email like" communications. That means:

* NO Classified
* NO Export Controlled
* NO Official Use Only (OUO)
* NO NDA or vendor-proprietary information
* NO Unclassified Controlled Information (UCI)
* NO Unclassified Controlled Nuclear Information (UCNI)

When in doubt, contact a Derivative Classifier (DC) and / or Information Management (IM) for further guidance.

### Other References

There are many great "getting started" guides for GitHub, here are a few that we recommend if you're looking for more information:

- [18F Handbook: GitHub](https://handbook.18f.gov/github/)
- https://github.com/fisma-ready/github

The Federal government also provides some relevant information:

- [Guidance for Agency Use of Third-Party Websites and Applications](https://www.whitehouse.gov/sites/default/files/omb/assets/memoranda_2010/m10-23.pdf)

See also:

- [18F Blog: Facts about Publishing Open Source Code](https://18f.gsa.gov/2016/08/08/facts-about-publishing-open-source-code-in-government/)
