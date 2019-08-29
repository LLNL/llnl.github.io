---
title: Build
layout: info
---

### {{ page.title }}
{: .page-header}
[Back to Policies and Guidelines home](/radiuss/policies/)

M → Mandatory

R → Recommended

[![Generic badge](https://img.shields.io/badge/M.bui-1-blue.svg)]() All RADIUSS products must provide packaged installation and automated builds of their dependencies. In particular, a [Spack](https://spack.io/) package must be made available. 

> Rationale: Automating the build process prevents duplication of effort and allows others to build a copy of the code and to incorporate needed fixes in dependency tools and libraries. Spack is a package management tool designed for both HPC environments and for laptops that allows easy configuration with multiple dependency versions, configurations, platforms, and compilers.

Ref: Enforce WSC 1.1 and WSC 1.2

Tag: Tools 

---

[![Generic badge](https://img.shields.io/badge/M.bui-2-blue.svg)]() RADIUSS products coded in C++ and/or FORTRAN should be buildable using [CMake](https://cmake.org). [BLT](https://github.com/llnl/blt) (Build, Link and Test) may be helpful as well.

> Rationale: Consistent use of CMake and BLT will enable individual users, computing centers, and package managers (such as Spack) to install the package in a way that is compatible with other RADIUSS products on the same system.

Ref: WSC 3.1

Tag: Tools 

---
