---
title: Software Licenses Guide
layout: info
description: Learn about licensing requirements for software developed at Lawrence Livermore National Laboratory.
permalink: /about/licenses/
---

# {{ page.title }}
{: .page-header .no_toc}

* Table of Contents
{:toc}

<!-- START: Info box -->
This page contains information meant for LLNL employees with instructions for
how to mark their source code projects. It is not intended to serve as legal
advice.
<!-- END: Info box -->

## Required Files

All LLNL software must contain the following files at the root of the source
code repository:

### 1. README file

All projects shall have a `README.md` file at the root of the repository. The `README.md` must contain the LLNL release number (`LLNL-CODE-XXXXXX`). We recommend putting it at the bottom in a section called "Release".  See [this example](https://github.com/spack/spack#release){% raw %}{% endraw %}.

Additionally, we recommend that all projects have the following sections:

* **A project description.**
* **Getting Started** - Simple instructions for how to install and use your project.
* **Getting Involved** - Information about mailing lists or other ways users can connect with you and each other.
* **Contributing** - Instructions for how you'd like people to contribute to your code.

The `.md` suffix stands for "markdown."  Markdown is a plain text format. It's easy to read and write, but it also allows you to add simple formatting and links so that your `README.md` will render nicely on GitHub. Take a look at GitHub's
[markdown guide](https://guides.github.com/features/mastering-markdown/) for the basics. 

#### README examples
<!-- START: Buttons -->
* [software.llnl.gov](https://software.llnl.gov)
* [Simple README.md Template](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2){% raw %}{% endraw %}
<!-- END: Buttons -->

### 2. NOTICE file

At the root of every source code repository shall be the following text in a file named `NOTICE`:

```
{% include_relative NOTICE %}
```

[Additional information](https://github.com/LLNL/.github/tree/main/community-health/NOTICE.md){% raw %}{% endraw %} about the Notice can be found in our LLNL/.github repo.

### 3. Open source LICENSE file

One of the following files must be included at the top level of your repository with the file name `LICENSE`. The only content which may be changed in the file is the copyright year.

<!-- START: Quicklink boxes -->
* [Apache 2.0 License with LLVM Exception](/pages/about/licenses/apache-2.0-llvm-exception.txt)
* [Apache 2.0 License](/pages/about/licenses/apache-2.0.txt)
* [BSD-3 License](/pages/about/licenses/bsd-3-clause.txt)
* [GPL-2.0 License](/pages/about/licenses/gpl-2.0.txt)
* [GPL-3.0 License](/pages/about/licenses/gpl-3.0.txt)
* [LGPL-2.1 License](/pages/about/licenses/lgpl-2.1.txt)
* [MIT License](/pages/about/licenses/mit.txt)
<!-- END: Quicklink boxes -->

If your repository was approved for release under a different open source license, the text of that license will be provided by the Innovation and Partnerships Office.

If your project has more than one license, then you must include *all* of the relevant licenses in your repository.  We recommend that you name them with descriptive suffixes.  For example, if your project is dual licensed under Apache-2.0 and MIT, you should have top-level `LICENSE-APACHE` and `LICENSE-MIT` files. 

Because GitHub does not automatically detect multiple licenses, we recommend *also* adding a top-level `COPYRIGHT` file with a summary of license details. GitHub's "view license" link will then point to this file.  You can look at [Spack](https://github.com/spack/spack){% raw %}{% endraw %} and its `README.md`, `COPYRIGHT`, and `LICENSE-*` files for an example of how to organize a project with two licenses.

## Other Considerations

In addition to the required files above, you should read the following sections and determine whether they apply to your code.

#### Contribution policies

If you host your code publicly, you may receive contributions from outside the lab. **You should consider documenting your contribution policies in your `README.md` or in a [`CONTRIBUTING.md` file](https://github.com/LLNL/.github/blob/main/community-health/CONTRIBUTING.md){% raw %}{% endraw %}**. It is good practice to make the following details explicit:

* The license under which contributions should be made
* How to submit contributions (pull requests, branches, etc.)

With most open source projects, it is assumed that contributions are made under the *same* license under which the project is distributed. For example, if you distribute your project under the `MIT` license, contributed code is assumed to be under that license as well. The [Cardioid](https://github.com/llnl/cardioid){% raw %}{% endraw %} project makes this explicit in its `README.md`:

```
Cardioid is distributed under the terms of the MIT license. All new contributions must be made under this license.
```

**If you want to provide instructions to your users that they should follow when submitting code to your project, you can put these types of instructions in a [`CONTRIBUTING.md` file](https://help.github.com/articles/setting-guidelines-for-repository-contributors/){% raw %}{% endraw %}**. This file typically deals more with workflow than with copyright or other IP concerns. A link to this file is shown to users when they submit pull requests.

#### SPDX

**[SPDX](https://spdx.org/){% raw %}{% endraw %} is an emerging standard for concisely labeling source code with license information.** While it is not a requirement, we encourage you to use SPDX identifiers in your code, as they significantly reduce the amount of license boilerplate included in each source file.

SPDX provides a standard [list of license identifiers](https://spdx.dev/ids/){% raw %}{% endraw %} that can be used to label code.  To use SPDX identifiers in your project, you should find your license's short identifier in the list, and add a special `SPDX-License-Identifier` line to your `README.md`. For example, if your code is licensed under the `MIT` license like [Cardioid](https://github.com/llnl/cardioid){% raw %}{% endraw %}, you would add this at the bottom of your README file:

```
SPDX-License-Identifier: MIT
```

Additionally, you can use SPDX to label your source files. While not all open source licenses require you to add license information to every source file, for projects that do require a copy in every file, the SPDX short headers are sufficient. For example, source files in [Spack](https://github.com/spack/spack){% raw %}{% endraw %} start with the following comment:

```python
# Copyright 2013-2018 Lawrence Livermore National Security, LLC and other Spack Project Developers. See the top-level COPYRIGHT file for details.
#
# SPDX-License-Identifier: (Apache-2.0 OR MIT)
```

There are two interesting parts here. First, the copyright section prominently mentions LLNS. It also mentions other Spack developers, who hold the copyright on the parts of the code they contributed. The SPDX line allows us to avoid pasting much longer license headers into each file.  All together, this makes for a much shorter and more concise header.

The Spack example mentions a [`COPYRIGHT`](https://github.com/spack/spack/blob/develop/COPYRIGHT){% raw %}{% endraw %} file because Spack is dual-licensed (see above). If you just have a single license, you can simply refer to the `LICENSE` file in your header.

For more information on using SPDX in your code, see the [SPDX website](https://spdx.org/licenses/){% raw %}{% endraw %}.

### Developer Certificate of Origin (DCO)

As mentioned above, the default assumption for open source projects is ["inbound license = outbound license"](https://opensource.guide/legal/){% raw %}{% endraw %}, i.e., contributors provide their code under the same license under which the code is distributed. If this is not enough assurance for your project, you may use the [Developer Certificate of Origin (DCO)](https://developercertificate.org/){% raw %}{% endraw %} with your project.

**In this model, you can require contributors to use Git' [sign-off](https://stackoverflow.com/questions/1962094/what-is-the-sign-off-feature-in-git-for){% raw %}{% endraw %} feature to acknowledge the DCO.** This is *not* a license nor a CLA, but instead is a positive assertion by the contributor that they are authorized to make the contribution they are making. You should document your project's requirement of DCO sign-off in your `README.md` or your [`CONTRIBUTING.md` file](https://help.github.com/articles/setting-guidelines-for-repository-contributors/){% raw %}{% endraw %}.

You are not required to use the DCO, and it may add overhead to your process that deters potential contributors. **Unless you feel that you need this level of assurance for your project, we recommend that you simply rely on the default inbound = outbound assumption.**

### Digital object identifier (DOI)

A digital object identifier (DOI) is a unique persistent identifier that references a digital object and provides long-term access. Just as journal articles carry DOIs, so too can open source software repositories. See the U.S. Office of Scientific and Technical Information's (OSTI's) [FAQ on DOIs](https://www.osti.gov/doecode/FAQs#what-is-a-doi){% raw %}{% endraw %} for details about how DOIs work and why they are beneficial.

After your code receives an LLNL release number, the Information Management team will submit it to OSTI's [DOE CODE](https://www.osti.gov/doecode/FAQs#what-is){% raw %}{% endraw %}, which assigns DOIs to software and adds them to the [DOE Code catalog](https://www.osti.gov/doecode/){% raw %}{% endraw %}. [Contact OSTI](https://www.osti.gov/doecode/contact){% raw %}{% endraw %} with questions or concerns about this process.

OSTI is evaluating a notification workflow that would let a developer know when a DOI has been assigned. Until then, you can find your repo's DOI *and* add it to the repo by following these steps:

1. Type in the name of your repo at [DOE CODE](https://www.osti.gov/doecode/){% raw %}{% endraw %}, then select it.
2. Look in the RESOURCE section for the DOI number.
3. In the SAVE/SHARE section, click Export Metadata and download the YAML file.
4. Include that file in your repo in one of two ways:
    * Create a [CITATION file](https://citation-file-format.github.io/)
    * Add it to the [README file](https://guides.github.com/activities/citable-code/)

<!-- START: CTA -->
## Have Licensing or Documentation Questions?
If you still have questions or need more information, we're happy to help. When reaching out, please provide some basic information about your project and what you're trying to do.
[Email the LLNL GitHub Admins](mailto:github-admin@llnl.gov)
<!-- END: CTA -->
