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

[![Generic badge](https://img.shields.io/badge/M.bui-1-blue.svg)]() **Package your installation and provide automated builds of dependencies via [Spack](https://spack.io/).** 

**Rationale:** Automating the build process prevents duplication of effort and allows others to build a copy of the code and to incorporate needed fixes in dependency tools and libraries. Spack is a package management tool that allows easy configuration with multiple dependency versions, configurations, platforms, and compilers.

***Ref:** Enforce WSC 1.1 and WSC 1.2*

Tag: Tools 

---

[![Generic badge](https://img.shields.io/badge/M.bui-2-blue.svg)]() **Compilable projects (e.g. those written in C++ and/or Fortran) must be buildable with [CMake](https://cmake.org).**

**Details:** We suggest considering [BLT](https://github.com/llnl/blt) (Build, Link and Test) which handles known CMake limitations and provides a set of templates to easily stand up a robust CMake-based build system.

**Rationale:** Consistent use of CMake and BLT will enable individual users, computing centers, and package managers (such as Spack) to install the package in a way that is compatible with other RADIUSS products on the same system.

***Ref:** WSC 3.1*

Tag: Tools 

---

[![Generic badge](https://img.shields.io/badge/R.bui-3-9cf.svg)]()  **Provide build options for production (optimized) and debug deployments.**

**Rationale:** Production versions should not be compiled with debug symbols and should include platform-specific optimizations so long as they pass all tests. Debug versions should be avialable for users who can self-assess bugs and thus provide more specific bug reports or fixes.

***Ref:** Smart Libraries practice 19*

---
