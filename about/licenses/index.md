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

### Have Questions?

If you still have questions / need more information, contact:
<github-admin@llnl.gov>
