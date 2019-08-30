---
title: RADIUSS Policies & Guidelines
layout: info
---

## {{ page.title }}
{: .page-header}

<!--
Prepared by LLNL under Contract DE-AC52-07NA27344.

This document was prepared as an account of work sponsored by an agency of the United States government. Neither the United States government nor Lawrence Livermore National Security, LLC, nor any of their employees makes any warranty, expressed or implied, or assumes any legal liability or responsibility for the accuracy, completeness, or usefulness of any information, apparatus, product, or process disclosed, or represents that its use would not infringe privately owned rights. Reference herein to any specific commercial product, process, or service by trade name, trademark, manufacturer, or otherwise does not necessarily constitute or imply its endorsement, recommendation, or favoring by the United States government or Lawrence Livermore National Security, LLC. The views and opinions of authors expressed herein do not necessarily state or reflect those of the United States government or Lawrence Livermore National Security, LLC, and shall not be used for advertising or product endorsement purposes.

LLNL-TR-781103

IM #975025
-->


>#### About
>
>The RADIUSS project aims at promoting and supporting a selection of open source software developed at the LLNL. With these tools and libraries, we expect to cover a wide range of features a team would need to develop a modern simulation code, particularly when targeting High Performance Computing (HPC). 
>
>As an initial step, we wanted to provide some quality assurance with a set of policies and guidelines the RADIUSS projects respectively must and should comply with. These Mandatory and Recommended practices are directed to RADIUSS projects developers and leaders, but we are convinced RADIUSS users in particular may find these advices useful for their own projects as well.
>
>Since we intend to keep our best practices up-to-date, these policies and guidelines may evolve in the future. In particular, tools mentioned are not to be eternal. However, we tried to make these recommendation as generic as possible, so that they could apply to the various types of projects RADIUSS has to deal with, and may serve to others. While we try not to interfere to much in projects management, with found relevant to focus or support effort on a subset of fundamental tools, so that knowledge and practices can easily be shared, and for the sake of interoperability.
>
>RADIUSS and the Projects it covers are open-source and widely using GitHub for repository management. It means we are open to suggestions and you are free to submit an issue or a pull request.
>
>#### Legend
>
>[![Generic badge](https://img.shields.io/badge/M.section-N-blue.svg)]() Designates a __Mandatory__ point (Policy)
>
>[![Generic badge](https://img.shields.io/badge/R.section-N-9cf.svg)]() Designates a __Recommended__ point (Guideline)


#### Licensing

[![Generic badge](https://img.shields.io/badge/M.lic-1-blue.svg)](/radiuss/policies/licensing/) &emsp;Use [OSI](https://opensource.org/licenses)-approved permissive open-source license for new projects.

[![Generic badge](https://img.shields.io/badge/M.lic-2-blue.svg)](/radiuss/policies/licensing/) &emsp;Provide a list of dependencies and their associated licenses in SPDX format.

[![Generic badge](https://img.shields.io/badge/R.lic-3-9cf.svg)](/radiuss/policies/licensing/) &emsp;Consider moving to an OSI-approved, permissive open-source license for existing projects.

&nbsp;

#### Documentation

[![Generic badge](https://img.shields.io/badge/M.doc-1-blue.svg)](/radiuss/policies/documentation/) &emsp;Publish documentation in a web-based form.

[![Generic badge](https://img.shields.io/badge/M.doc-2-blue.svg)](/radiuss/policies/documentation/) &emsp;Provide a concise description of the project.

[![Generic badge](https://img.shields.io/badge/M.doc-3-blue.svg)](/radiuss/policies/documentation/) &emsp;Version control documentation coherently with source code.

[![Generic badge](https://img.shields.io/badge/M.doc-4-blue.svg)](/radiuss/policies/documentation/) &emsp;Provide a reliable way to contact the development team.

[![Generic badge](https://img.shields.io/badge/R.doc-5-9cf.svg)](/radiuss/policies/documentation/) &emsp;Produce Web and PDF documentation from a readable plain-text format.

[![Generic badge](https://img.shields.io/badge/R.doc-6-9cf.svg)](/radiuss/policies/documentation/) &emsp;Provide and maintain example codes along with documentation.

&nbsp;

#### Build

[![Generic badge](https://img.shields.io/badge/M.bui-1-blue.svg)](/radiuss/policies/build/) &emsp;Package installation and provide automated builds of dependencies (Spack).

[![Generic badge](https://img.shields.io/badge/R.bui-2-9cf.svg)](/radiuss/policies/build/) &emsp;Have C/C++ and FORTRAN projects buildable with [CMake](https://cmake.org). 

[![Generic badge](https://img.shields.io/badge/R.bui-3-9cf.svg)](/radiuss/policies/logging-debugging/) &emsp;Provide production and debugging builds.

&nbsp;

#### Version Control

[![Generic badge](https://img.shields.io/badge/M.ver-1-blue.svg)](/radiuss/policies/version-control/) &emsp;The source code has to be version controlled (Git).

[![Generic badge](https://img.shields.io/badge/M.ver-2-blue.svg)](/radiuss/policies/version-control/) &emsp;Provide a transparent, online contribution process based on pull requests and issues collection.

&nbsp;

#### Testing and Continuous Integration

[![Generic badge](https://img.shields.io/badge/M.tes-1-blue.svg)](/radiuss/policies/tests-ci/) &emsp;Use regression tests in the development process.

[![Generic badge](https://img.shields.io/badge/M.tes-2-blue.svg)](/radiuss/policies/tests-ci/) &emsp;Provide a test suite for correctness of installation verification.

[![Generic badge](https://img.shields.io/badge/M.tes-3-blue.svg)](/radiuss/policies/tests-ci/) &emsp;Provide a development test suite along with sources for external contributors.

[![Generic badge](https://img.shields.io/badge/M.tes-4-blue.svg)](/radiuss/policies/tests-ci/) &emsp;Take advantage of continuous integration (CI).

[![Generic badge](https://img.shields.io/badge/R.tes-5-9cf.svg)](/radiuss/policies/tests-ci/) &emsp;Continuously check compatibility with different compilers.

[![Generic badge](https://img.shields.io/badge/R.tes-6-9cf.svg)](/radiuss/policies/tests-ci/) &emsp;Ensure code quality/health in an automated manner.

&nbsp;

#### Portability

[![Generic badge](https://img.shields.io/badge/M.por-1-blue.svg)](/radiuss/policies/portability/) &emsp;Give best effort at portability to common HPC platforms and compiling toolchains.

[![Generic badge](https://img.shields.io/badge/R.por-2-9cf.svg)](/radiuss/policies/portability/) &emsp;Support Apple MacOS (Xcode) and Microsoft Windows (Visual Studio).

&nbsp;

#### Packaging

[![Generic badge](https://img.shields.io/badge/M.pac-1-blue.svg)](/radiuss/policies/packaging/) &emsp;Version and build characteristics must be easily accessible.

[![Generic badge](https://img.shields.io/badge/M.pac-2-blue.svg)](/radiuss/policies/packaging/) &emsp;Use a limited and well-defined symbol, macro, library, and include file namespace.

[![Generic badge](https://img.shields.io/badge/M.pac-3-blue.svg)](/radiuss/policies/packaging/) &emsp;Use MPI in a way that is compatible with other products.

&nbsp;

---

#### References

- [Better Scientific Software](https://bssw.io)
- [xSDK Community Policies](https://xsdk.info/policies)
- [Smart Libraries: Best SQE Practices for Libraries with Emphasis on Scientific Computing](https://www.osti.gov/biblio/936460)
