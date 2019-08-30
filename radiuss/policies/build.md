---
title: Build
layout: info
---

### {{ page.title }}
{: .page-header}
[Back to Policies and Guidelines home](/radiuss/policies/)

---

#### Legend

[![generic badge](https://img.shields.io/badge/M.section-N-blue.svg)]() Designates a __mandatory__ point (policy).

[![generic badge](https://img.shields.io/badge/R.section-N-9cf.svg)]() Designates a __recommended__ point (guideline).

&nbsp;

---

[![Generic badge](https://img.shields.io/badge/M.bui-1-blue.svg)]() **Package installation and provide automated builds of their dependencies. In particular, a [Spack](https://spack.io/) package must be made available.** 

> Rationale: Automating the build process prevents duplication of effort and allows others to build a copy of the code and to incorporate needed fixes in dependency tools and libraries. Spack is a package management tool designed for both HPC environments and for laptops that allows easy configuration with multiple dependency versions, configurations, platforms, and compilers.

Ref: Enforce WSC 1.1 and WSC 1.2

Tag: Tools 

---

[![Generic badge](https://img.shields.io/badge/M.bui-2-blue.svg)]() **Have C++ and/or FORTRAN projects buildable with [CMake](https://cmake.org).**

Details : We suggest considering [BLT](https://github.com/llnl/blt) (Build, Link and Test) which handle CMake limitations, particularly in Livermore Computing context.

> Rationale: Consistent use of CMake and BLT will enable individual users, computing centers, and package managers (such as Spack) to install the package in a way that is compatible with other RADIUSS products on the same system.

Ref: WSC 3.1

Tag: Tools 

---

[![Generic badge](https://img.shields.io/badge/R.bui-3-9cf.svg)]()  **Provide production and debugging builds.**

> Rationale: Production version should not be compiled with debug symbols. A mechanism to enable/disable those at compile time should be provided.

Ref: Smart Libraries practice 19

---
