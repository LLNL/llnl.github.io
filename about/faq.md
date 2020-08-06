---
title: FAQ
layout: info
---

## {{ page.title }}
{: .page-header .no_toc}

*These FAQs primarily target LLNL developers working in the [LLNL GitHub organization](https://github.com/LLNL). Don't see your question listed below? Please contact [LLNL GitHub admins](mailto:github-admin@llnl.gov).*

* Table of Contents
{:toc}

### How do I set up a GitHub account?

If you’re new to GitHub and open source in general, figuring out how to get set up can be a challenge. You may want to read through the GitHub Help pages on [Setting up and managing your GitHub profile](https://help.github.com/categories/setting-up-and-managing-your-github-profile/).

1. [Create an account on GitHub](https://github.com/join).

    You *do not need* a separate work account and personal account. Instead, you can [link multiple email addresses to the same GitHub account](https://help.github.com/articles/adding-an-email-address-to-your-github-account/), which is almost always preferred.

2. [Update your profile information](https://github.com/settings/profile).

    * **Photo**: A headshot photo, or image that is uniquely you.
    * **Name**: Your first and last name.
    * **Bio**: Include a few words about yourself! Don't forget to mention @LLNL.
    * **URL**: This might be your [people.llnl.gov](https://people.llnl.gov) page, or a personal website if you prefer.
    * **Company**: Probably `Lawrence Livermore National Laboratory, @LLNL`.
    * **Location**: Your primary location.

3. Add your `@LLNL` email address (and any aliases) to your [Email Settings](https://github.com/settings/emails) page. This will link any commits done via [your Git identity](https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup#Your-Identity) to your GitHub account.

4. [Enable two-factor authentication (2FA)](https://github.com/settings/security).

### What is two-factor authentication (2FA)?

*Membership in the @LLNL GitHub organization will soon require that 2FA has been enabled on your GitHub account.* There are several options for configuring 2FA for your GitHub account:

* [YubiKey](https://yubico.com) hardware security keys
    * Note that the YubiKey deployment (called "MyPass" at LLNL) is in its pilot phase, and not all users have them yet.
        * YubiKeys are the preferred 2FA option, due to the security of the YubiKey hardware tokens. If you have been issued your LLNL YubiKeys they are highly recommended for securing your GitHub (and other) accounts which support them.
    * [Learn more about setting up your YubiKey with GitHub.com](https://help.github.com/articles/configuring-two-factor-authentication/#configuring-two-factor-authentication-using-fido-u2f)

* [Google Authenticator](https://support.google.com/accounts/answer/1066447)
    * Google Authenticator is a mobile application which you can install on your personal or government issued phone.
    * It provides a one-time token (OTP) which you can use to authenticate to GitHub.com
    * [Learn more about setting up Google Authenticator with GitHub.com](https://help.github.com/articles/configuring-two-factor-authentication/#configuring-two-factor-authentication-using-a-totp-mobile-app)
    
* [Authy](https://authy.com/guides/github/)
    * Authy is a desktop- or laptop-based application which can be used to generate a one-time token (OTP) for use logging in to GitHub.com.
    * This option is usually best for when you do all or most of your work in an environment where you do not have access to a mobile phone or USB YubiKey.
    * [Learn more about setting up Authy with GitHub.com](https://authy.com/guides/github/)

Additional 2FA info:
    
* You also have the option during 2FA to generate and save a list of recovery codes to get into your account in the event you lose access to one of your 2FA methods. This is *highly* recommended, and the recovery codes should be stored someplace safe. Some options for storing your recovery codes include:
    * Printing the codes and storing them in a safe place in your office.
    * Storing the recovery codes in a password manager that you might be using.
    
* We recommend that you set up *MULTIPLE* 2FA options. This can protect your access to your account in the event that you lose access to one of your authenticators.
    * For more information, check out the [Two-factor Authentication](https://github.com/blog/1614-two-factor-authentication) post on the GitHub Blog.
    * Having trouble setting up 2FA? Contact the [LLNL GitHub admins](mailto:github-admin@llnl.gov) who may be able to help.

### How do I join the LLNL organization on GitHub?

If you are an employee at LLNL and have 2FA enabled, you are eligible to join the [LLNL GitHub organization](https://github.com/llnl) and appear in the [member list](https://github.com/orgs/LLNL/people).

1. Send an email, with your GitHub username included, to the [LLNL GitHub admins](mailto:github-admin@llnl.gov) from your `@llnl.gov` email, requesting to be added to the organization.

2. After an administrator has added you to the organization, you will receive a notification email from GitHub. Alternatively, once the invitation has been sent, you will see a notification banner at the top of [github.com/llnl](https://github.com/llnl) which you can use to accept the invitation.

3. Head over to the [@LLNL People](https://github.com/orgs/LLNL/people) page and make your membership `Public`.

### How do I get my repo reviewed and released for GitHub?

Before content is placed into an LLNL GitHub.com repository, it should be reviewed and released via LLNL's Information Management (IM) process. All information produced by LLNL must follow the guidance set forth by the LLNL IM policy for both [initial release {% raw %}<i class="fa fa-lock"></i>{% endraw %}](https://dev.llnl.gov/opensource/releasing/) and [incremental contributions {% raw %}<i class="fa fa-lock"></i>{% endraw %}](https://dev.llnl.gov/opensource/contributing/).

### What is/isn’t allowed to be included in my repo?

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

### My project is approved for release. Now what?

Make sure your repo contains:

* An appropriate open source license and `LLNL-CODE-xxxxxx` release number. See the [LLNL Software Licensing](https://software.llnl.gov/about/licenses) page for details and examples.

* A [README](https://guides.github.com/features/wikis/) file that summarizes what the software does and how others can use it.

* A [NOTICE](https://github.com/LLNL/llnl.github.io/blob/master/NOTICE) file that includes LLNL auspice and disclaimer statements.

After your project has been initially released on GitHub and you are ready to provide a new version, a good practice is to tag the version and include [release notes](https://github.com/LLNL/.github/blob/master/release-template.md).

Another good practice is to provide user documentation. Read the Docs (RtD) is a common platform for user guides, tutorials, quick start instructions, and other forms of documentation. Our [.github repo](https://github.com/LLNL/.github) contains step-by-step instructions for setting up a RtD instance, a [template](https://github-main.readthedocs.io/en/latest/) you can start with, and links to various resources for tips and additional details.

### How do I include my repo in the LLNL organization and/or this website’s catalog?

Repositories within the LLNL organization are owned and managed by LLNL. Please do not create personal repositories here.

Make sure your repository is included on this website’s home page and [full catalog](https://software.llnl.gov/). If you’ve set up your repository within the LLNL organization, you don’t need to take any action; it will automatically appear after the next data update.

* If your repository exists under a different organization, you can move it to LLNL by selecting “Transfer Ownership” under Settings.

* Alternatively, you can submit a pull request [updating the `input_lists.json` file](https://github.com/LLNL/llnl.github.io/blob/master/_explore/input_lists.json), with your organization and/or repository names.

* If you have a project logo, please follow the [instructions](https://github.com/LLNL/llnl.github.io/tree/master/assets/images/logos) for naming and uploading the file. If your repo is part of a non-LLNL organization that has its own avatar, that image will automatically display next to the repo name in the catalog, unless superseded by a repo-specific logo.

### How do I let people know about my new repo?

Now that your project is on GitHub, make sure users and contributors can find it! There are several ways to do this. Contact [open-source@llnl.gov](mailto:open-source@llnl.gov) if you need help.

1. Include meaningful metadata (description and topic tags) in your repository. Example: [Spack](https://github.com/spack/spack) lists several topic tags below a one-sentence description.

    * Start with our [list](https://github.com/LLNL/llnl.github.io/blob/master/category/README.md) of recommended, standardized topics.

    * See helpful hints on [GitHub's topic help page](https://help.github.com/articles/about-topics/). Add tags relevant to your project's programming language, platforms, and more (e.g., Python, HPC, Linux).

    * If your repo is part of the [RADIUSS project](https://software.llnl.gov/radiuss/), be sure to add the `radiuss` topic along with the appropriate [category tags](https://github.com/LLNL/llnl.github.io/blob/master/radiuss/README.md).

2. Let [Twitter](https://twitter.com/LLNL_OpenSource) followers know your project is available on GitHub. Feel free to tag this handle on your own tweet, or submit a request to [open-source@llnl.gov](mailto:open-source@llnl.gov) so we can tweet on your behalf.

3. Publicize any outreach activities or major milestones related to your project. Examples: You have a paper/poster/presentation accepted at a conference; you're hosting a workshop or webinar; your project is nominated for an award; or you're speaking on a podcast or guest blogging.

4. Include a summary of your project with GitHub and documentation links on LLNL's [Computing website](https://computing.llnl.gov/projects). Contact [webmaster-comp@llnl.gov](mailto:webmaster-comp@llnl.gov) for this particular task.

### How do I contribute news or other content to this website?

Submit a pull request! This website is a GitHub repo just like any other LLNL open source project. News is housed in the [`_posts` directory](https://github.com/LLNL/llnl.github.io/tree/master/_posts), and templates are found in the [LLNL/.github repo](https://github.com/LLNL/.github). See the guidelines below about contributing.

Before contributing, please contact [open-source@llnl.gov](mailto:open-source@llnl.gov) with your idea or if you have questions about whether your proposed content requires the LLNL review and release process.

### What should I do if my repo is no longer actively developed/maintained?

1. Remove your repo’s topic tags (e.g., `math-physics`), which connect it to this website’s browsable categories. Also remove the `radiuss` tag, if applicable.

2. Submit a pull request [updating the `input_lists.json` file](https://github.com/LLNL/llnl.github.io/blob/master/_explore/input_lists.json) to remove your repo’s name.

3. Change your repo's status via Settings > Manage Access > Who has access > Manage > Danger Zone > Archive this repository (`settings#danger-zone`). Contact [open-source@llnl.gov](mailto:open-source@llnl.gov) if for some reason GitHub won't let you complete this step.

### My repo has grown. How do I move it out of the LLNL organization?

The process to transfer organizational ownership is straightforward, but generally discouraged. This should really only be done for projects that are starting to build a "bigger than LLNL" community, and the decision should not be made lightly. 

Migrating the repo outside of the LLNL organization requires an organization admin. Contact [github-admin@llnl.gov](mailto:github-admin@llnl.gov) to coordinate the move.

Once the repository has moved to the new organization:

1. Submit a pull request [updating the `input_lists.json` file](https://github.com/LLNL/llnl.github.io/blob/master/_explore/input_lists.json) to add the new organization/repo’s name. This allows for the software catalog to continue including the project even after it moves.

2. Retain topic tags (e.g., `math-physics`) to connect it to this website’s browsable categories, including the `radiuss` tag, if applicable.

### How do I contribute to an LLNL repo?

Refer to individual projects for their requirements on accepting contributions. In general though, we follow the "fork and pull" Git workflow model:

1. Fork a repository.

2. Develop your changes in your fork.

3. Sync your fork to the upstream repository (`git remote add upstream git@github.com:org/repo.git`).

4. Create a pull request to the "upstream" repository.

5. If approved, changes will be merged in by a repository maintainer.

