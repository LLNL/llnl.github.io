---
title: LLNL Software Licensing
layout: default
---

## {{ page.title }}
{: .page-header}

*This page contains information meant for LLNL Employees with instructions for
how to mark their source code projects. It is not intended to serve as legal
advice*

### Required Content

All LLNL software must contain the following markings:

#### 1. README file

All projects shall have a `README.md` file at the root of the repository,
including at least the following information:

- "Getting Started" instructions
- "Releasability" section, containing the `LLNL-CODE-XXXXXX` number

#### 2. Disclaimer file

At the root of every source code repository shall be the following text in a file named `DISCLAIMER`:

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

#### 3. Source Code Headers

All source code files in a repository shall have a comment at the top of each
source code file with the following content:

```
Copyright (c) 2018, Lawrence Livermore National Security, LLC

Use of this source code is governed by the LICENSE file at: <URL>
```

The `<URL>` should be the path to the license file at the root of the Git
repository.

Note: For the purposes of these instructions, a "source code file" is defined as
a file where a comment such as the above could be added to the file without
affecting the behavior of the source code. Examples include, but are not limited
to: `.c`, `.cpp`, `.py`, `.java`, etc

#### Open Source licenses

The following are the official texts for various open source licenses approved
by LLNL. Remember that any open source release (and license) must be reviewed
and approved via the Information Management system, found at:
<https://im-int.llnl.gov/policy/software>

- [MIT License](/about/licenses/mit.txt)
- [BSD-3 License](/about/licenses/bsd-3.txt)
- [Apache 2.0 License](/about/licenses/apache-2.0.txt)
- [GPL-2.0 License](/about/licenses/gpl-2.0.txt)
- [GPL-3.0 License](/about/licenses/gpl-3.0.txt)
- [LGPL-2.1 License](/about/licenses/lgpl-2.1.txt)

### Have Questions?

If you still have questions / need more information, contact: <github-admin@llnl.gov>
