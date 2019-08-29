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
>M → Mandatory (Policy)
>
>R → Recommended (Guideline)


#### Licensing

[![Generic badge](https://img.shields.io/badge/M.lic-1-blue.svg)](/radiuss/policies/licensing/) &emsp;Use OSI-approved permissive open-source license for new projects

[![Generic badge](https://img.shields.io/badge/M.lic-2-blue.svg)](/radiuss/policies/licensing/) &emsp;Provide a list of dependencies and their license

[![Generic badge](https://img.shields.io/badge/R.lic-3-blue.svg)](/radiuss/policies/licensing/) &emsp;Consider moving to an OSI-approved, permissive open-source license

[![Generic badge](https://img.shields.io/badge/R.lic-4-blue.svg)](/radiuss/policies/licensing/) &emsp;Format dependencies and their licenses with SPDX

&nbsp;

#### Documentation

[![Generic badge](https://img.shields.io/badge/M.doc-1-blue.svg)](/radiuss/policies/documentation/) &emsp;Publish documentation in a web-based form

[![Generic badge](https://img.shields.io/badge/M.doc-2-blue.svg)](/radiuss/policies/documentation/) &emsp;Version control documentation coherently with source code

[![Generic badge](https://img.shields.io/badge/M.doc-3-blue.svg)](/radiuss/policies/documentation/) &emsp;Provide contact information of development team

[![Generic badge](https://img.shields.io/badge/R.doc-4-blue.svg)](/radiuss/policies/documentation/) &emsp;Document using a human-readable format that can be converted to PDF and HTML

[![Generic badge](https://img.shields.io/badge/R.doc-5-blue.svg)](/radiuss/policies/documentation/) &emsp;Provide code samples along with documentation

&nbsp;

#### Build

[![Generic badge](https://img.shields.io/badge/M.bui-1-blue.svg)](/radiuss/policies/build/) &emsp;Package installation and provide automated builds of dependencies (Spack)

[![Generic badge](https://img.shields.io/badge/R.bui-2-blue.svg)](/radiuss/policies/build/) &emsp;Have C/C++ and FORTRAN projects buildable with CMake

&nbsp;

#### Version Control

[![Generic badge](https://img.shields.io/badge/M.ver-1-blue.svg)](/radiuss/policies/version-control/) &emsp;The source code has to be version controlled (Git)

[![Generic badge](https://img.shields.io/badge/M.ver-2-blue.svg)](/radiuss/policies/version-control/) &emsp;Accept online contribution based on pull requests, and collect issues (GitHub)

&nbsp;

#### Testing and Continuous Integration

[![Generic badge](https://img.shields.io/badge/M.tes-1-blue.svg)](/radiuss/policies/tests-ci/) &emsp;Use regression tests in the development process

[![Generic badge](https://img.shields.io/badge/M.tes-2-blue.svg)](/radiuss/policies/tests-ci/) &emsp;Provide a comprehensive test suite for correctness of installation verification

[![Generic badge](https://img.shields.io/badge/M.tes-3-blue.svg)](/radiuss/policies/tests-ci/) &emsp;Take advantage of Continuous Integration

[![Generic badge](https://img.shields.io/badge/R.tes-4-blue.svg)](/radiuss/policies/tests-ci/) &emsp;Verify continuously the compatibility with different compilers

[![Generic badge](https://img.shields.io/badge/R.tes-5-blue.svg)](/radiuss/policies/tests-ci/) &emsp;Ensure code quality/health in an automated manner

&nbsp;

#### Portability

[![Generic badge](https://img.shields.io/badge/M.por-1-blue.svg)](/radiuss/policies/portability/) &emsp;Support common HPC platforms and toolchains

[![Generic badge](https://img.shields.io/badge/R.por-2-blue.svg)](/radiuss/policies/portability/) &emsp;Support Apple MacOS and Microsoft Windows

&nbsp;

#### Packaging

[![Generic badge](https://img.shields.io/badge/M.pac-1-blue.svg)](/radiuss/policies/packaging/) &emsp;Provide current version number and build information

[![Generic badge](https://img.shields.io/badge/R.pac-2-blue.svg)](/radiuss/policies/packaging/) &emsp;Use a limited and well-defined symbol, macro, library, and include file namespace

[![Generic badge](https://img.shields.io/badge/M.pac-3-blue.svg)](/radiuss/policies/packaging/) &emsp;Respect MPI compatibility best practices

&nbsp;

#### Logging and Debugging

[![Generic badge](https://img.shields.io/badge/R.log-1-blue.svg)](/radiuss/policies/logging-debugging/) &emsp;Use consistent, formatted logs

[![Generic badge](https://img.shields.io/badge/R.log-2-blue.svg)](/radiuss/policies/logging-debugging/) &emsp;Provide production and debugging builds

---

#### References

- [Better Scientific Software](https://bssw.io)
- [xSDK Community Policies](https://xsdk.info/policies)
- [Smart Libraries: Best SQE Practices for Libraries with Emphasis on Scientific Computing](https://www.osti.gov/biblio/936460)
