---
title: Using GitHub
layout: info
---

## {{ page.title }}
{: .page-header .no_toc}

* Table of Contents
{:toc}

If you're new to GitHub and open source in general, figuring out how to get set up can be a challenge. This guide is for getting started with GitHub, and specifically targets LLNL developers working in the [LLNL GitHub organization](https://github.com/LLNL).

### Setting up Your GitHub Account

If you're new to GitHub, you may want to read through the GitHub Help pages on [Setting up and managing your GitHub profile](https://help.github.com/categories/setting-up-and-managing-your-github-profile/). Here are some of the highlights:

1. [Create an account on GitHub](https://github.com/join)

    - You *do not need* a separate work account and personal account. Instead, you can [link multiple email addresses to the same GitHub account](https://help.github.com/articles/adding-an-email-address-to-your-github-account/), which is almost always preferred.

2. [Update your profile information](https://github.com/settings/profile)

    - **Photo**: A headshot photo, or image that is uniquely you.
    - **Name**: Your first and last name.
    - **Bio**: Include a few words about yourself! Don't forget to mention @LLNL.
    - **URL**: This might be your [people.llnl.gov](https://people.llnl.gov) page, or a personal website if you prefer.
    - **Company**: Probably `Lawrence Livermore National Laboratory, @LLNL`.
    - **Location**: Your primary location.

3. Add your `@LLNL` email address (and any aliases) to your [Email Settings](https://github.com/settings/emails) page.

    - This will link any commits done via [your Git identity](https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup#Your-Identity) to your GitHub account.

4. [Enable two-factor authentication (2FA)](https://github.com/settings/security)

    - *Membership in the @LLNL GitHub organization will soon require that 2FA has been enabled on your GitHub account*
    - There are several options for configuring 2FA for your GitHub account:
        1. [YubiKey](https://yubico.com) hardware security keys
            - Note that the YubiKey deployment (called "MyPass" at LLNL) is in its pilot phase, and not all users have them yet.
            - YubiKeys are the preferred 2FA option, due to the security of the YubiKey hardware tokens. If you have been issued your LLNL YubiKeys they are highly recommended for securing your GitHub (and other) accounts which support them.
            - [Learn more about setting up your Yubikey with GitHub.com](https://help.github.com/articles/configuring-two-factor-authentication/#configuring-two-factor-authentication-using-fido-u2f)
        2. [Google Authenticator](https://support.google.com/accounts/answer/1066447)
            - Google Authenticator is a mobile application which you can install on your personal or government issued phone.
            - It provides a one-time token (OTP) which you can use to authenticate to GitHub.com
            - [Learn more about setting up Google Authenticator with GitHub.com](https://help.github.com/articles/configuring-two-factor-authentication/#configuring-two-factor-authentication-using-a-totp-mobile-app)
        3. [Authy](https://authy.com/guides/github/).
            - Authy is a desktop- or laptop-based application which can be used to generate a one-time token (OTP) for use logging in to GitHub.com.
            - This option is usually best for when you do all or most of your work in an environment where you do not have access to a mobile phone or USB YubiKey.
            - [Learn more about setting up Authy with GitHub.com](https://authy.com/guides/github/)
    - You will also have the option during 2FA to generate and save a list of recovery codes to get into your account in the event you lose access to one of your 2FA methods. This is *highly* recommended, and the recovery codes should be stored someplace safe. Some options for storing your recovery codes include:
        - Printing the codes and storing them in a safe place in your office.
        - Storing the recovery codes in a password manager that you might be using.
    - We recommend that you set up *MULTIPLE* 2FA options. This can protect your access to your account in the event that you lose access to one of your authenticators.
    - For more information, check out the [Two-factor Authentication](https://github.com/blog/1614-two-factor-authentication) post on the GitHub Blog.
    - Having trouble setting up 2FA? Contact the [LLNL GitHub Admins](mailto:github-admin@llnl.gov) who may be able to help.

### Joining the Organization

If you are an employee at LLNL and have 2FA enabled, congratulations! You are eligible to join the LLNL GitHub organization.

1. Send an email, with your GitHub username included, to [github-admin@llnl.gov](mailto:github-admin@llnl.gov) from your `@llnl.gov` email, requesting to be added to the organization.

2. After an administrator has added you to the organization, you will receive a notification email from GitHub.

    - Alternatively, once the invitation has been sent, you will see a notification banner at the top of [github.com/llnl](https://github.com/llnl) which you can use to accept the invitation.

3. Head over to the [@LLNL People](https://github.com/orgs/LLNL/people) page and make your membership `Public`.

4. Review the "Working with LLNL Repositories" information below.

5. Welcome to the organization!

### Working with LLNL Repositories

Repositories within the LLNL organization are owned and managed by LLNL. Please do not create personal repositories here.

Remember, all information produced by LLNL must follow the guidance set forth by the LLNL Information Management (IM) Policy for both [initial release {% raw %}<i class="fa fa-lock"></i>{% endraw %}](https://dev.llnl.gov/opensource/releasing/) and [incremental contributions {% raw %}<i class="fa fa-lock"></i>{% endraw %}](https://dev.llnl.gov/opensource/contributing/).

#### Repository Content

Before content is placed into an LLNL GitHub.com repository, it should be reviewed and released via the IM process. Once released, an appropriate open source license and `LLNL-CODE-` release number should be provided and included in the repository.

Remember that these repositories *are hosted* on GitHub servers, *NOT LLNL servers*, and content placed in them should be limited to "email like" communications. That means:

* NO Classified
* NO Export Controlled
* NO Official Use Only (OUO)
* NO Health Insurance Portability and Accountability Act (HIPAA)
* NO Personally Identifiable Information (PII)
* NO NDA or vendor-proprietary information
* NO Unclassified Controlled Information (UCI)
* NO Unclassified Controlled Nuclear Information (UCNI)

When in doubt, contact a Derivative Classifier (DC) and/or IM for further guidance.

#### Repository Visibility

Now that your project is on GitHub, make sure users and contributors can find it! There are several ways to do this. Contact [open-source@llnl.gov](mailto:open-source@llnl.gov) for help with the following tasks:

* Include meaningful metadata (description and topic tags) in your repository. Example: [Spack](https://github.com/spack/spack) lists several topic tags below a one-sentence description.
    * Start with our [list](https://github.com/LLNL/llnl.github.io/blob/master/categories/README.md) of recommended, standardized topics.
    * See helpful hints on [GitHub's topic help page](https://help.github.com/articles/about-topics/). Add tags relevant to your project's programming language, platforms, and more (e.g., Python, HPC, Linux).
    * If your repo is part of the [RADIUSS project](https://software.llnl.gov/radiuss/), be sure to add the `radiuss` topic along with the appropriate [category tags](https://github.com/LLNL/llnl.github.io/blob/master/radiuss/README.md).
* Let [Twitter](https://twitter.com/LLNL_OpenSource) followers know your project is available on GitHub.
* Publicize any outreach activities or major milestones related to your project. Examples: You have a paper/poster/presentation accepted at a conference; you're hosting a workshop or webinar; your project is nominated for an award; or you're speaking on a podcast or guest blogging.
* Make sure your repository is included on this website’s home page and [full catalog](https://software.llnl.gov/). If you’ve set up your repository within the LLNL organization, you don’t need to take any action; it will automatically appear after the next data update.
    * If your repository exists under a different organization, you can move it to LLNL by selecting “Transfer Ownership” under Settings.
    * Alternatively, you can submit a pull request [updating the `input_lists.json` file](https://github.com/LLNL/llnl.github.io/blob/master/_explore/input_lists.json), with your organization and/or repository names.
    * If you have a project logo, please follow the [instructions](https://github.com/LLNL/llnl.github.io/tree/master/assets/images/logos) for naming and uploading the file. If your repo is part of a non-LLNL organization that has its own avatar, that image will automatically display next to the repo name in the catalog, unless superseded by a repo-specific logo.
* Include a summary of your project with GitHub and documentation links on LLNL's [Computing website](https://computing.llnl.gov/). Contact [webmaster-comp@llnl.gov](mailto:webmaster-comp@llnl.gov) for this particular task.

### Other References

There are many great "getting started" guides for GitHub. Here are a few we recommend:

- [18F Handbook: GitHub](https://handbook.18f.gov/github/)
- [fisma-ready/github: Controls necessary for Federal use of GitHub](https://github.com/fisma-ready/github)

The Federal government also provides some relevant information:

- [Guidance for Agency Use of Third-Party Websites and Applications](https://obamawhitehouse.archives.gov/sites/default/files/omb/assets/memoranda_2010/m10-23.pdf)

See also:

- [18F Blog: Facts about Publishing Open Source Code](https://18f.gsa.gov/2016/08/08/facts-about-publishing-open-source-code-in-government/)
