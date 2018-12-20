---
title: LLNL Software Licensing
layout: default
---

## {{ page.title }}
{: .page-header}

*This page contains information meant for LLNL Employees with instructions for
how to mark their source code projects. It is not intended to serve as legal
advice.*

### Required Files

All LLNL software must contain the following files at the root of the source
code repository:

#### 1. README file

All projects shall have a `README.md` file at the root of the repository.
The `README.md` must contain the LLNL release number
(`LLNL-CODE-XXXXXX`). We recommend putting it at the bottom in a section
called "Release".  See
[this example](https://github.com/spack/spack#release).

Additionally, we recommend that all projects have the following sections:

- A description of your project.
- "Getting Started": Simple instructions for how to install and use your
  project.
- "Getting Involved": Information about mailing lists or other ways users
  connect with you and each other.
- "Contributing": Instructions for how you'd like people to contribute to
  your code.

The `.md` suffix stands for "markdown".  Markdown is a plain text format.
It's easy to read and write, but it also allows you to add simple
formatting and links so that your `README.md` will render nicely on
GitHub. Take a look at GitHub's
[markdown guide](https://guides.github.com/features/mastering-markdown/)
for the basics.  For inspiration, look at other projects' `README.md`
files at [software.llnl.gov](https://software.llnl.gov/), or take a look
at this
[simple README.md template](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2).

#### 2. NOTICE file

At the root of every source code repository shall be the following text in a
file named `NOTICE`:

```
{% include_relative NOTICE %}
```

#### 3. Open Source LICENSE file

One of the following files must be included at the top level of your repository
with the file name `LICENSE`. The only content which may be changed in the file
is the copyright year.

- [MIT License](/about/licenses/mit.txt)
- [BSD-3 License](/about/licenses/bsd-3-clause.txt)
- [Apache 2.0 License](/about/licenses/apache-2.0.txt)
- [GPL-2.0 License](/about/licenses/gpl-2.0.txt)
- [GPL-3.0 License](/about/licenses/gpl-3.0.txt)
- [LGPL-2.1 License](/about/licenses/lgpl-2.1.txt)

If your repository was approved for release under a different open source
license, the text of that license will be provided by the Innovation and
Partnerships Office.

### Other Considerations

#### SPDX

Use of [SPDX identifiers](https://spdx.org/) in source code for projects is
allowed. It isn’t a requirement, but if projects want to use them, they are
welcome to. If used, the identifiers must correspond to the license and other
parameters under which the project was approved for release. E.g.
[Cardioid](https://github.com/llnl/cardioid) was released under the MIT license
so it would use the `SPDX-License-Identifier: (MIT)` SPDX identifier.

Additionally, while not all open source licenses require a license notice in
every source file (instead they rely on the top level files LICENSE / COPYRIGHT
and NOTICE in the source code repository, typically with text like "A copy of
the license and copyright notice must be included with the software"), for
those that do require or wish to include a copy in every file, the SPDX short
headers are sufficient. As an example, [Spack](https://github.com/spack/spack)
would include the following comment block at the top of it's source code files:

```bash
# Copyright 2013-2018 Lawrence Livermore National Security, LLC and other
# Spack Project Developers. See the top-level COPYRIGHT file for details.
#
# SPDX-License-Identifier: (Apache-2.0 OR MIT)
```

#### Developer Certificate of Origin

LLNL projects may elect to require their contributors to explicitly use the Git
`Signed-off-by: ...` feature which implies the Developer Certificate of Origin
(DCO) (see: https://developercertificate.org/). This is NOT a license nor a
CLA, but instead is a positive assertion by the contributor that they are
authorized to make the contribution they are making.

The other option is implicit and relies on a less formal understanding that
"contributions in = licensing out" where the incoming contributions are treated
the same as the original license.

Again, this won’t be a requirement, but is an implementation detail of the way
a project may elect to take contributions from it’s contributors.

### Have Questions?

If you still have questions or need more information, contact the
[LLNL GitHub Admins](github-admin@llnl.gov).
