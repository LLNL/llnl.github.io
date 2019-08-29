---
title: RADIUSS Policies and Guidelines
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
>The RADIUSS project aims at promoting and supporting a selection of open source software developed at the LLNL. With these tools and libraries, we expect to cover a wide range of features a team would need to develop a modern simulation code, particularly when targeting High Performance Computing (HPC). 
>
>As an initial step, we wanted to provide some quality assurance with a set of policies and guidelines the RADIUSS projects respectively must and should comply with. These Mandatory and Recommended practices are directed to RADIUSS projects developers and leaders, but we are convinced RADIUSS users in particular may find these advices useful for their own projects as well.
>
>Since we intend to keep our best practices up-to-date, these policies and guidelines may evolve in the future. In particular, tools mentioned are not to be eternal. However, we tried to make these recommendation as generic as possible, so that they could apply to the various types of projects RADIUSS has to deal with, and may serve to others. While we try not to interfere to much in projects management, with found relevant to focus or support effort on a subset of fundamental tools, so that knowledge and practices can easily be shared, and for the sake of interoperability.
>
>RADIUSS and the Projects it covers are open-source and widely using GitHub for repository management. It means we are open to suggestions and you are free to submit an issue or a pull request.
>
>#### Legend
>
>M → Mandatory (Policy)
>
>R → Recommended (Guideline)


### Licensing

**M.lic.1**  [Use OSI-approved permissive open-source license for new projects](/radiuss/policies/licensing/)

**M.lic.2**  [Provide a list of dependencies and their license](/radiuss/policies/licensing/)

**R.lic.3**  [Consider moving to an OSI-approved, permissive open-source license](/radiuss/policies/licensing/)

**R.lic.4**  [Format dependencies and their licenses with SPDX](/radiuss/policies/licensing/)


### Documentation

**M.doc.1** [Publish documentation in a web-based form](/radiuss/policies/documentation/)

**M.doc.2** [Version control documentation coherently with source code](/radiuss/policies/documentation/)

**M.doc.3** [Provide contact information of development team](/radiuss/policies/documentation/)

**R.doc.4** [Document using a human-readable format that can be converted to PDF and HTML](/radiuss/policies/documentation/)

**R.doc.5** [Provide code samples along with documentation](/radiuss/policies/documentation/)


### Build

**M.bui.1** [Package installation and provide automated builds of dependencies (Spack)](/radiuss/policies/build/)

**R.bui.2** [Have C/C++ and FORTRAN projects buildable with CMake](/radiuss/policies/build/)


### Version Control

**M.ver.1** [The source code has to be version controlled (Git)](/radiuss/policies/version-control/)

**M.ver.2** [Accept online contribution based on pull requests, and collect issues (GitHub)](/radiuss/policies/version-control/)


### Testing and Continuous Integration

**M.tes.1** [Use regression tests in the development process](/radiuss/policies/tests-ci/)

**M.tes.2** [Provide a comprehensive test suite for correctness of installation verification](/radiuss/policies/tests-ci/)

**M.tes.3** [Take advantage of Continuous Integration](/radiuss/policies/tests-ci/)

**R.tes.4** [Verify continuously the compatibility with different compilers](/radiuss/policies/tests-ci/)

**R.tes.5** [Ensure code quality/health in an automated manner](/radiuss/policies/tests-ci/)


### Portability

**M.por.1** [Support common HPC platforms and toolchains](/radiuss/policies/portability/)

**R.por.2** [Support Apple MacOS and Microsoft Windows](/radiuss/policies/portability/)


### Packaging

**M.pac.1** [Provide current version number and build information](/radiuss/policies/packaging/)

**R.pac.2** [Use a limited and well-defined symbol, macro, library, and include file namespace](/radiuss/policies/packaging/)

**M.pac.3** [Respect MPI compatibility best practices](/radiuss/policies/packaging/)


### Logging and Debugging

**R.log.1** [Use consistent, formatted logs](/radiuss/policies/logging-debugging/)

**R.log.2** [Provide production and debugging builds](/radiuss/policies/logging-debugging/)

---

### References

- [Better Scientific Software](https://bssw.io)
- [xSDK Community Policies](https://xsdk.info/policies)
- [Smart Libraries: Best SQE Practices for Libraries with Emphasis on Scientific Computing](https://www.osti.gov/biblio/936460)
