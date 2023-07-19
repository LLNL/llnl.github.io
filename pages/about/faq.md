---
title: FAQ
layout: info
description: Get answers to frequently asked questions about Lawrence Livermore National Laboratory's open source software.
permalink: /about/faq/
---

# {{ page.title }}
{: .page-header .no_toc}

<!-- START: Info box -->
**These FAQs primarily target LLNL developers** working in the [LLNL GitHub organization](https://github.com/LLNL){% raw %}{% endraw %}. Don't see your question listed below? Please contact [LLNL GitHub admins](mailto:github-admin@llnl.gov).
<!-- End: Info box -->

* Table of Contents
{:toc}

<!-- START: Accordions Each h2 below will be a separate accordion. If any of the requested functionality (e.g., info boxes) is a problem, let me know and I can adjust -->
## How Do I Set up a GitHub Account?

If you're new to GitHub and open source in general, figuring out how to get set up can be a challenge. You may want to read through the GitHub Help pages on [setting up and managing your GitHub profile](https://help.github.com/categories/setting-up-and-managing-your-github-profile/){% raw %}{% endraw %}.

1. [Create an account on GitHub](https://github.com/join).

    You *do not need* a separate work account and personal account. Instead, you can [link multiple email addresses to the same GitHub account](https://help.github.com/articles/adding-an-email-address-to-your-github-account/){% raw %}{% endraw %}, which is almost always preferred.

2. [Update your profile information](https://github.com/settings/profile){% raw %}{% endraw %}.

    * **Photo**: A headshot photo, or image that is uniquely you.
    * **Name**: Your first and last name.
    * **Bio**: Include a few words about yourself! Don't forget to mention @LLNL.
    * **URL**: This might be your [people.llnl.gov](https://people.llnl.gov) page, or a personal website if you prefer.
    * **Company**: Probably `Lawrence Livermore National Laboratory, @LLNL`.
    * **Location**: Your primary location.

3. Add your `@LLNL` email address (and any aliases) to your [Email Settings](https://github.com/settings/emails){% raw %}{% endraw %} page. This will link any commits done via [your Git identity](https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup#Your-Identity){% raw %}{% endraw %} to your GitHub account.

4. [Enable two-factor authentication (2FA)](https://github.com/settings/security){% raw %}{% endraw %}.
    * [Learn how to set up 2FA at the Lab](https://dev.llnl.gov/security-access/2fa).

## How Do I Set up Two-factor Authentication (2FA)?

<!-- START: Warning box -->
Membership in the @LLNL GitHub organization requires that 2FA has been enabled on your GitHub account.
<!-- END: Warning box -->

There are several options for configuring 2FA for your GitHub account:

### [YubiKey](https://yubico.com){% raw %}{% endraw %} hardware security keys
  * The YubiKey deployment (called "MyPass" at LLNL) is in its pilot phase, and not all users have them yet.
    * YubiKeys are the preferred 2FA option, due to the security of the YubiKey hardware tokens. If you have been issued your LLNL YubiKey, it is highly recommended for securing your GitHub (and other) accounts which support them.
  * [Learn more about setting up your YubiKey with GitHub](https://help.github.com/articles/configuring-two-factor-authentication/#configuring-two-factor-authentication-using-fido-u2f){% raw %}{% endraw %}

### [Google Authenticator](https://support.google.com/accounts/answer/1066447){% raw %}{% endraw %}
  * Google Authenticator is a mobile application which you can install on your personal or government issued phone.
  * It provides a one-time token (OTP) which you can use to authenticate to GitHub.com
  * [Learn more about setting up Google Authenticator with GitHub](https://help.github.com/articles/configuring-two-factor-authentication/#configuring-two-factor-authentication-using-a-totp-mobile-app){% raw %}{% endraw %}

### [Authy](https://authy.com/guides/github/){% raw %}{% endraw %}
  * Authy is a desktop- or laptop-based application which can be used to generate a one-time token (OTP) for use logging in to GitHub.
  * This option is usually best for when you do all or most of your work in an environment where you do not have access to a mobile phone or USB YubiKey.
  * [Learn more about setting up Authy with GitHub.com](https://authy.com/guides/github/){% raw %}{% endraw %}

### Additional 2FA info

* You have the option during 2FA to generate and save a list of recovery codes to get into your account in the event you lose access to one of your 2FA methods. **Saving your recovery codes is *highly* recommended**, and the recovery codes should be stored someplace safe. Some options for storing your recovery codes include:
  * Printing the codes and storing them in a safe place in your office.
  * Storing the recovery codes in a password manager that you might be using.

* **We recommend that you set up multiple 2FA options.** This can protect your access to your account in the event that you lose access to one of your authenticators.

<!-- START: Buttons -->
* [Get More Info on 2FA](https://github.com/blog/1614-two-factor-authentication){% raw %}{% endraw %}
* [Contact the LLNL GitHub Admins](mailto:github-admin@llnl.gov)
<!-- END: Buttons -->

## How Do I Join the LLNL Organization on GitHub?

If you are an employee at LLNL and have 2FA enabled, you are eligible to join the [LLNL GitHub organization](https://github.com/llnl){% raw %}{% endraw %} and appear in the [member list](https://github.com/orgs/LLNL/people){% raw %}{% endraw %}.

1. Send an email, with your GitHub username included, to the [LLNL GitHub admins](mailto:github-admin@llnl.gov) from your `@llnl.gov` email, requesting to be added to the organization.

2. After an administrator has added you to the organization, you will receive a notification email from GitHub. Alternatively, once the invitation has been sent, you will see a notification banner at the top of [github.com/llnl](https://github.com/llnl){% raw %}{% endraw %} which you can use to accept the invitation.

3. Head over to the [@LLNL People](https://github.com/orgs/LLNL/people){% raw %}{% endraw %} page and make your membership `Public`.

## How Do I Get My Repo Reviewed and Released for GitHub?

Before content is placed into an LLNL GitHub.com repository, it should be reviewed and released via LLNL's Information Management (IM) process. All information produced by LLNL must follow the guidance set forth by the LLNL IM policy for both [initial release {% raw %}<i class="fa fa-lock"></i>{% endraw %}](https://dev.llnl.gov/opensource/releasing/) and [incremental contributions {% raw %}<i class="fa fa-lock"></i>{% endraw %}](https://dev.llnl.gov/opensource/contributing/).

## What Is/Isn't Allowed in My Repo?

Remember that these repositories *are hosted on GitHub* servers, ***not** LLNL servers*, and content placed in them should be limited to "email-like" communications. That means:

* No classified information
* No export controlled information (ECI)
* No Health Insurance Portability and Accountability Act (HIPAA) related information
* No personally identifiable information (PII)
* No nondisclosure agreement or vendor-proprietary information
* No controlled unclassifed information (CUI)
* No unclassified controlled nuclear information (UCNI)

When in doubt, contact a Derivative Classifier (DC) and/or IM for further guidance.

## My Project Is Approved for Release. Now What? What about Docs?

Make sure your repo contains [community health files](https://github.com/LLNL/.github/tree/main/community-health){% raw %}{% endraw %}, including:

* An appropriate **open source license** and `LLNL-CODE-xxxxxx` **release number**. 
  * See the [LLNL Software Licensing](/about/licenses) page for details and examples.

* A [**README**](https://guides.github.com/features/wikis/){% raw %}{% endraw %} file that summarizes what the software does and how others can use it.

* A [**NOTICE**](https://github.com/LLNL/.github/blob/main/community-health/NOTICE.md){% raw %}{% endraw %} file that includes LLNL auspice and disclaimer statements.

* A [**CODE OF CONDUCT**](https://github.com/LLNL/.github/blob/main/community-health/CODE_OF_CONDUCT.md){% raw %}{% endraw %} file that defines standards for how to engage in your project's community.

* A [**CONTRIBUTING**](https://github.com/LLNL/.github/blob/main/community-health/CONTRIBUTING.md){% raw %}{% endraw %} file that communicates how others should contribute to your repo.

After your project has been initially released on GitHub and you are ready to provide a new version, a good practice is to tag the version and include [**release notes**](https://github.com/LLNL/.github/blob/main/community-health/release-template.md){% raw %}{% endraw %}.

Another good practice is to provide **user documentation**. Read the Docs (RtD) is a common platform for user guides, tutorials, quick start instructions, and other forms of documentation. Our [LLNL/.github repo](https://github.com/LLNL/.github){% raw %}{% endraw %} contains step-by-step instructions for setting up a RtD instance, a [template](https://github-main.readthedocs.io/en/latest/){% raw %}{% endraw %} you can start with, and links to various resources for tips and additional details.

Submit your repo to [**DOE CODE**](https://www.osti.gov/doecode/FAQs#what-is){% raw %}{% endraw %} so others can find it when searching through DOE-funded projects. After your repo is included in DOE CODE, you may also want to add the [**digital object identifier** (DOI)](/about/licenses/#digital-object-identifier-doi) to the repo.

If your repo is research software, consider submitting it to the [*Journal of Open Source Software* (JOSS)](https://joss.theoj.org/about){% raw %}{% endraw %}. Submission will produce a **citation** to include in your README file, then users or other researchers can cite your software correctly. 

The [JOSS RtD site](https://joss.readthedocs.io/en/latest/submitting.html){% raw %}{% endraw %} describes the submission requirements. JOSS defines *research software* as "software that solves complex modeling problems in a scientific context (physics, mathematics, biology, medicine, social science, neuroscience, engineering); supports the functioning of research instruments or the execution of research experiments; extracts knowledge from large data sets; offers a mathematical library; or similar." (You can also [become a reviewer](https://joss.readthedocs.io/en/latest/editing.html#){% raw %}{% endraw %}, if you are so inclined.)

## How Do I Include My Repo in the LLNL Organization and/or This Website's Catalog?

<!-- START: Warning Box -->
Repositories within the LLNL organization are owned and managed by LLNL. Please do not create personal repositories here.
<!-- END: Warning Box -->

If you've set up your repository within the LLNL organization, you don't need to take any action; it will automatically appear after the next data update.

* If your repository exists under a different organization, you can move it to LLNL by selecting "Transfer Ownership" under Settings.

* Alternatively, you can submit a pull request [updating the `input_lists.json` file](https://github.com/LLNL/llnl.github.io/blob/main/_visualize/input_lists.json){% raw %}{% endraw %} with your organization and/or repository names. List your organization under the `"orgs"` line *only if you intend for all of its repositories to be included in the catalog* (e.g., `glvis`); otherwise, list only the repository under the `"repos"` line within the context of your organization (e.g., `hpc/spindle`).

* If your repo is part of the [RADIUSS project](https://software.llnl.gov/radiuss/projects/), be sure to add it to that repo's [`contributor-ci.yaml` file](https://github.com/LLNL/radiuss/blob/main/contributor-ci.yaml){% raw %}{% endraw %}.

* If you have a project logo, please follow the [instructions](https://github.com/LLNL/llnl.github.io/tree/main/assets/images/logos){% raw %}{% endraw %} for naming and uploading the file. If your repo is part of a non-LLNL organization that has its own avatar, that image will automatically display next to the repo name in the catalog, unless superseded by a repo-specific logo.

## How Do I Let People Know about My New Repo?

Now that your project is on GitHub, make sure users and contributors can find it! There are several ways to do this. Contact [open-source@llnl.gov](mailto:open-source@llnl.gov) if you need help.

1. Include meaningful metadata (description and topic tags) in your repository. Example: [Spack](https://github.com/spack/spack){% raw %}{% endraw %} lists several topic tags below a one-sentence description.

    * Start with our [list](https://github.com/LLNL/llnl.github.io/blob/main/pages/explore/README.md){% raw %}{% endraw %} of recommended, standardized topics.

    * See helpful hints on [GitHub's topic help page](https://help.github.com/articles/about-topics/){% raw %}{% endraw %}. Add tags relevant to your project's programming language, platforms, and more (e.g., Python, HPC, Linux).

2. Let [Twitter](https://twitter.com/LLNL_OpenSource){% raw %}{% endraw %} followers know your project is available on GitHub. Feel free to tag this handle on your own tweet, or submit a request to [open-source@llnl.gov](mailto:open-source@llnl.gov) so we can tweet on your behalf.

3. Publicize any outreach activities or major milestones related to your project such as: 
* A paper/poster/presentation being accepted at a conference
* An upcoming workshop or webinar you're hosting
* Your project receiving an award nominations 
* You're guest blogging or speaking on a podcast

4. Include a summary of your project with GitHub and documentation links on LLNL's [Computing website](https://computing.llnl.gov/projects). Contact [webmaster-comp@llnl.gov](mailto:webmaster-comp@llnl.gov) for this particular task.

## How Do I Contribute News or Other Content to This Website?

Submit a pull request! This website is a GitHub repo just like any other LLNL open source project. News is housed in the [`_posts` directory](https://github.com/LLNL/llnl.github.io/tree/main/_posts){% raw %}{% endraw %}, and templates are found in the [LLNL/.github repo](https://github.com/LLNL/.github){% raw %}{% endraw %}. See the guidelines below about contributing.

Before contributing, please contact [open-source@llnl.gov](mailto:open-source@llnl.gov) with your idea or if you have questions about whether your proposed content requires the LLNL review and release process.

## What Should I Do if My Repo Is No Longer Actively Developed/Maintained?

1. Remove the specific topic tags (e.g., `math-physics`) that connect it to this website's browsable categories.

2. Remove the repo from the RADIUSS [`contributor-ci.yaml` file](https://github.com/LLNL/radiuss/blob/main/contributor-ci.yaml){% raw %}{% endraw %}, if applicable.

3. Submit a pull request [updating the `input_lists.json` file](https://github.com/LLNL/llnl.github.io/blob/main/_visualize/input_lists.json){% raw %}{% endraw %} to remove your repo's name.

4. Change your repo's status via Settings > Manage Access > Who has access > Manage > Danger Zone > Archive this repository (`settings#danger-zone`). Contact [open-source@llnl.gov](mailto:open-source@llnl.gov) if for some reason GitHub won't let you complete this step.

## My Repo Has Grown. How Do I Move it Out of the LLNL Organization?

The process to transfer organizational ownership is straightforward, but generally discouraged. This should really only be done for projects that are starting to build a "bigger than LLNL" community, and the decision should not be made lightly.

Migrating the repo outside of the LLNL organization requires an organization admin. Contact [github-admin@llnl.gov](mailto:github-admin@llnl.gov) to coordinate the move.

**Once the repository has moved to the new organization:**

1. Submit a pull request [updating the `input_lists.json` file](https://github.com/LLNL/llnl.github.io/blob/main/_visualize/input_lists.json){% raw %}{% endraw %} to add the new organization/repo's name. This allows for the software catalog to continue including the project even after it moves.

2. Retain topic tags (e.g., `math-physics`) to connect it to this website's browsable categories.

3. Update the org in the RADIUSS [`contributor-ci.yaml` file](https://github.com/LLNL/radiuss/blob/main/contributor-ci.yaml){% raw %}{% endraw %}, if applicable.

## How Do I Contribute to an LLNL Repo?

Refer to individual projects for their requirements on accepting contributions. In general though, we follow the "fork and pull" Git workflow model:

1. Fork a repository.

2. Develop your changes in your fork.

3. Sync your fork to the upstream repository (`git remote add upstream git@github.com:org/repo.git`){% raw %}{% endraw %}.

4. Create a pull request to the "upstream" repository.

5. If approved, changes will be merged in by a repository maintainer.
<!-- END: Accordions -->
