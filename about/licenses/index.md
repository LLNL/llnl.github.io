---
title: Software Licenses Guide
layout: default
description: Learn about licensing requirements for software developed at Lawrence Livermore National Laboratory.
permalink: /about/licenses/
breadcrumb: Software Licenses Guide
menus:
  about:
    weight: 4
---

<div class="col-12 col-xxl-2 d-none d-xxl-block pe-5 jump-links float-xxl-start sticky-xxl-top" id="llnl-side-container">
  <div class="nav pt-2 ps-3 sticky-top d-flex flex-column" aria-orientation="vertical">
    {% include components/icon-list-item.html title='Required Files' url='#required-files' icon='fa-chevron-down' %}
    {% include components/icon-list-item.html title='Other Considerations' url='#other-considerations' icon='fa-chevron-down' %}
  </div>
</div>

<div class="container">
  <div class="col-12" markdown="1">

<!-- START: Info box -->
{% capture alertContent %}
This page contains information meant for LLNL employees with instructions for how to mark their source code projects. It is not intended to serve as legal advice. Visit the [software licensing portal](https://softwarelicensing.llnl.gov/) for information about licensing LLNL's proprietary codes.
{% endcapture %}
{% assign alertContent = alertContent | markdownify %}
{% include components/alert.html type="warning" icon="fa-circle-info" content=alertContent  %}
<!-- END: Info box -->

## Required Files

All LLNL software must contain the following files at the root of the source code repository:

### 1. README file

{:.mt-5.mb-2}

All projects shall have a `README.md` file at the root of the repository. The `README.md` must contain the LLNL release number (`LLNL-CODE-XXXXXX`). We recommend putting it at the bottom in a section called "Release".  See [this example](https://github.com/spack/spack#release).

Additionally, we recommend that all projects have the following sections:

* **A project description.**
* **Getting Started** - Simple instructions for how to install and use your project.
* **Getting Involved** - Information about mailing lists or other ways users can connect with you and each other.
* **Contributing** - Instructions for how you'd like people to contribute to your code.

The `.md` suffix stands for *markdown*.  Markdown is a plain text format. It's easy to read and write, but it also allows you to add simple formatting and links so that your `README.md` will render nicely on GitHub. Take a look at GitHub's
[markdown guide](https://guides.github.com/features/mastering-markdown/) for the basics.

#### README examples

<!-- START: Buttons -->
{% include components/button.html content='software.llnl.gov' url="https://github.com/LLNL/llnl.github.io/blob/main/README.md" tag="a" %}
{% include components/button.html content='Simple README.md Template' url="https://gist.github.com/PurpleBooth/109311bb0361f32d87a2" tag="a" %}
<!-- END: Buttons -->

### 2. NOTICE file

{:.mt-5.mb-2}
At the root of every source code repository shall be the following text in a file named `NOTICE`. A [template for this file](https://github.com/LLNL/.github/tree/main/community-health/NOTICE.md) can be found in our [LLNL/.github](https://github.com/LLNL/.github) repo.

{% highlight liquid %}
This work was produced under the auspices of the U.S. Department of Energy by
Lawrence Livermore National Laboratory under Contract DE-AC52-07NA27344.

This work was prepared as an account of work sponsored by an agency of the
United States Government. Neither the United States Government nor Lawrence
Livermore National Security, LLC, nor any of their employees makes any warranty,
expressed or implied, or assumes any legal liability or responsibility for the
accuracy, completeness, or usefulness of any information, apparatus, product, or
process disclosed, or represents that its use would not infringe privately owned
rights. Reference herein to any specific commercial product, process, or service
by trade name, trademark, manufacturer, or otherwise does not necessarily
constitute or imply its endorsement, recommendation, or favoring by the United
States Government or Lawrence Livermore National Security, LLC. The views and
opinions of authors expressed herein do not necessarily state or reflect those
of the United States Government or Lawrence Livermore National Security, LLC,
and shall not be used for advertising or product endorsement purposes.
{% endhighlight %}

### 3. Open source LICENSE file

{:.mt-5.mb-2}
One of the following files must be included at the top level of your repository with the file name `LICENSE`. The only content which may be changed in the file is the copyright year.

<!-- START: Quicklink boxes -->
<div class="row gy-4 gx-5 mb-4">
  <div class="col-12 col-sm-6 col-lg-3">
    {% include components/quick-link.html title="Apache 2.0 License with LLVM Exception" icon="fa-file-lines" url="/about/licenses/apache-2.0-llvm-exception.txt" %}
  </div>
  <div class="col-12 col-sm-6 col-lg-3">
    {% include components/quick-link.html title="Apache 2.0 License" icon="fa-file-lines" url="/about/licenses/apache-2.0.txt" %}
  </div>
  <div class="col-12 col-sm-6 col-lg-3">
    {% include components/quick-link.html title="BSD-3 License" icon="fa-file-lines" url="/about/licenses/bsd-3-clause.txt" %}
  </div>
  <div class="col-12 col-sm-6 col-lg-3">
    {% include components/quick-link.html title="BSD-Commercial License" icon="fa-file-lines" url="/about/licenses/bsd-commercial.txt" %}
  </div>
  <div class="col-12 col-sm-6 col-lg-3">
    {% include components/quick-link.html title="GPL-2.0 License" icon="fa-file-lines" url="/about/licenses/gpl-2.0.txt" %}
  </div>
  <div class="col-12 col-sm-6 col-lg-3">
    {% include components/quick-link.html title="GPL-3.0 License" icon="fa-file-lines" url="/about/licenses/gpl-3.0.txt" %}
  </div>
  <div class="col-12 col-sm-6 col-lg-3">
    {% include components/quick-link.html title="LGPL-2.1 License" icon="fa-file-lines" url="/about/licenses/lgpl-2.1.txt" %}
  </div>
  <div class="col-12 col-sm-6 col-lg-3">
    {% include components/quick-link.html title="MIT License" icon="fa-file-lines" url="/about/licenses/mit.txt" %}
  </div>
</div>
<!-- END: Quicklink boxes -->

If your repository was approved for release under a different open source license, the text of that license will be provided by the Innovation and Partnerships Office.

If your project has more than one license, then you must include *all* of the relevant licenses in your repository.  We recommend that you name them with descriptive suffixes.  For example, if your project is dual licensed under Apache-2.0 and MIT, you should have top-level `LICENSE-APACHE` and `LICENSE-MIT` files.

Because GitHub does not automatically detect multiple licenses, we recommend *also* adding a top-level `COPYRIGHT` file with a summary of license details. GitHub's "view license" link will then point to this file.  You can look at [Spack](https://github.com/spack/spack) and its `README.md`, `COPYRIGHT`, and `LICENSE-*` files for an example of how to organize a project with two licenses. See also the Linux Foundation's [recommendations for copyright notices](https://www.linuxfoundation.org/blog/blog/copyright-notices-in-open-source-software-projects).

## Other Considerations

In addition to the required files above, you should read the following sections and determine whether they apply to your code.

### Contribution policies

If you host your code publicly, you may receive contributions from outside the lab. **You should consider documenting your contribution policies in your `README.md` or in a [`CONTRIBUTING.md` file](https://github.com/LLNL/.github/blob/main/community-health/CONTRIBUTING.md)**. It is good practice to make the following details explicit:

* The license under which contributions should be made
* How to submit contributions (pull requests, branches, etc.)

With most open source projects, it is assumed that contributions are made under the *same* license under which the project is distributed. For example, if you distribute your project under the `MIT` license, contributed code is assumed to be under that license as well. The [Cardioid](https://github.com/llnl/cardioid) project makes this explicit in its `README.md`:

```bash
Cardioid is distributed under the terms of the MIT license. All new contributions must be made under this license.
```

**If you want to provide instructions to your users that they should follow when submitting code to your project, you can put these types of instructions in a [`CONTRIBUTING.md` file](https://help.github.com/articles/setting-guidelines-for-repository-contributors/)**. This file typically deals more with workflow than with copyright or other IP concerns. A link to this file is shown to users when they submit pull requests.

### SPDX

**[SPDX](https://spdx.org/) is an emerging standard for concisely labeling source code with license information.** While it is not a requirement, we encourage you to use SPDX identifiers in your code, as they significantly reduce the amount of license boilerplate included in each source file.

SPDX provides a standard [list of license identifiers](https://spdx.dev/ids/) that can be used to label code.  To use SPDX identifiers in your project, you should find your license's short identifier in the list and add a special `SPDX-License-Identifier` line to your `README.md`. For example, if your code is licensed under the `MIT` license like [Cardioid](https://github.com/llnl/cardioid), you would add this at the bottom of your README file:

```bash
SPDX-License-Identifier: MIT
```

Additionally, you can use SPDX to label your source files. While not all open source licenses require you to add license information to every source file, for projects that do require a copy in every file, the SPDX short headers are sufficient. For example, source files in [Spack](https://github.com/spack/spack) start with the following comment:

```python
# Copyright 2013-2018 Lawrence Livermore National Security, LLC and other Spack Project Developers. See the top-level COPYRIGHT file for details.
#
# SPDX-License-Identifier: (Apache-2.0 OR MIT)
```

Note the copyright section prominently mentions LLNS. It also mentions other Spack developers, who hold the copyright on the parts of the code they contributed. The SPDX line allows us to avoid pasting much longer license headers into each file. Altogether, this makes for a much shorter and more concise header.

The Spack example mentions a [`COPYRIGHT`](https://github.com/spack/spack/blob/develop/COPYRIGHT) file because Spack is dual-licensed (see above). If you just have a single license, you can simply refer to the `LICENSE` file in your header.

For more information on using SPDX in your code, see the [SPDX website](https://spdx.org/licenses/).

### Source file license headers

Header requirements can vary depending on the chosen license. Most open source licenses (e.g., Apache 2.0, MIT,  GPL) do not strictly require license headers in each file, while others (e.g., LGPL-3.0) do. In any case, brief headers are recommended to ensure that whichever license you choose is also included with the source code, especially if those files are re-used.

For example, visit the [Spack](https://github.com/spack/spack) or [Flux](https://github.com/flux-framework) projects to see how the different source files are labeled with headers depending on the license.

### Developer Certificate of Origin (DCO)

As mentioned above, the default assumption for open source projects is ["inbound license = outbound license"](https://opensource.guide/legal/), i.e., contributors provide their code under the same license under which the code is distributed. If this is not enough assurance for your project, you may use the [Developer Certificate of Origin (DCO)](https://developercertificate.org/) with your project.

**In this model, you can require contributors to use Git's [sign-off](https://stackoverflow.com/questions/1962094/what-is-the-sign-off-feature-in-git-for) feature to acknowledge the DCO.** This is *not* a license nor a CLA but instead is a positive assertion by the contributor that they are authorized to make the contribution they are making. You should document your project's requirement of DCO sign-off in your `README.md` or your [`CONTRIBUTING.md` file](https://help.github.com/articles/setting-guidelines-for-repository-contributors/).

You are not required to use the DCO, and it may add overhead to your process that deters potential contributors. **Unless you feel that you need this level of assurance for your project, we recommend that you simply rely on the default inbound = outbound assumption.**

### Digital object identifier (DOI)

A digital object identifier (DOI) is a unique persistent identifier that references a digital object and provides long-term access. Just as journal articles carry DOIs, so too can open source software repositories. See the U.S. Office of Scientific and Technical Information's (OSTI's) [FAQ on DOIs](https://www.osti.gov/doecode/FAQs#what-is-a-doi) for details about how DOIs work and why they are beneficial.

After your code receives an LLNL release number, the Information Management team will submit it to OSTI's [DOE CODE](https://www.osti.gov/doecode/FAQs#what-is), which assigns DOIs to software and adds them to the [DOE Code catalog](https://www.osti.gov/doecode/). [Contact OSTI](https://www.osti.gov/doecode/contact) with questions or concerns about this process.

OSTI is evaluating a notification workflow that would let a developer know when a DOI has been assigned. Until then, you can find your repo's DOI *and* add it to the repo by following these steps:

1. Type in the name of your repo at [DOE CODE](https://www.osti.gov/doecode/), then select it.
2. Look in the RESOURCE section for the DOI number.
3. In the SAVE/SHARE section, click Export Metadata and download the YAML file.
4. Include that file in your repo in one of two ways:
    * Create a [CITATION file](https://citation-file-format.github.io/)
    * Add it to the [README file](https://guides.github.com/activities/citable-code/)

<!-- START: CTA -->
{% capture ctaContent %}
If you still have questions or need more information, we're happy to help. When reaching out, please provide some basic information about your project and what you're trying to do.
[Email the LLNL GitHub Admins](mailto:github-admin@llnl.gov).
{% endcapture %}
{% assign ctaContent = ctaContent | markdownify %}
{% include components/call-to-action.html title='Have Licensing or Documentation Questions?' icon='fa-comments-question-check' content=ctaContent  %}
<!-- END: CTA -->

  </div>
</div>
