
# RADIUSS Policies and Guidelines

<!--
Prepared by LLNL under Contract DE-AC52-07NA27344.

This document was prepared as an account of work sponsored by an agency of the United States government. Neither the United States government nor Lawrence Livermore National Security, LLC, nor any of their employees makes any warranty, expressed or implied, or assumes any legal liability or responsibility for the accuracy, completeness, or usefulness of any information, apparatus, product, or process disclosed, or represents that its use would not infringe privately owned rights. Reference herein to any specific commercial product, process, or service by trade name, trademark, manufacturer, or otherwise does not necessarily constitute or imply its endorsement, recommendation, or favoring by the United States government or Lawrence Livermore National Security, LLC. The views and opinions of authors expressed herein do not necessarily state or reflect those of the United States government or Lawrence Livermore National Security, LLC, and shall not be used for advertising or product endorsement purposes.

LLNL-TR-781103

IM #975025
-->

M → Mandatory

R → Recommended


## Licensing

**M.lic.1**  [Use OSI-approved permissive open-source license for new projects](/radiuss/policies_guidelines/licensing.md)

**M.lic.2**  [Provide a list of dependencies and their license](/radiuss/policies_guidelines/licensing.md)

**R.lic.3**  [Consider moving to an OSI-approved, permissive open-source license](/radiuss/policies_guidelines/licensing.md)

**R.lic.4**  [Format dependencies and their licenses with SPDX](/radiuss/policies_guidelines/licensing.md)


## Documentation

**M.doc.1** [Publish documentation in a web-based form](/radiuss/policies_guidelines/documentation.md)

**M.doc.2** [Version-control documentation coherently with source code](/radiuss/policies_guidelines/documentation.md)

**M.doc.3** [Provide contact information of development team](/radiuss/policies_guidelines/documentation.md)

**R.doc.4** [Document using a human readable format that can be converted to pdf and html](/radiuss/policies_guidelines/documentation.md)

**R.doc.5** [Provide code samples along with documentation](/radiuss/policies_guidelines/documentation.md)


## Build

**M.bui.1** [Package installation and provide automated builds of dependencies (Spack)](/radiuss/policies_guidelines/build.md)

**R.bui.2** [Have C/C++ and FORTRAN projects buildable with CMake](/radiuss/policies_guidelines/build.md)


## Version Control

**M.ver.1** [The source code has to be version controlled (Git)](/radiuss/policies_guidelines/version-control.md)

**M.ver.2** [Accept online contribution based on pull requests, and collect issues (GitHub)](/radiuss/policies_guidelines/version-control.md)


## Testing and Continuous Integration

**M.tes.1** [Use regression tests in the development process](/radiuss/policies_guidelines/tests-ci.md)

**M.tes.2** [Provide a comprehensive test suite for correctness of installation verification](/radiuss/policies_guidelines/tests-ci.md)

**M.tes.3** [Take advantage of Continuous Integration](/radiuss/policies_guidelines/tests-ci.md)

**R.tes.4** [Verify continuously the compatibility with different compilers](/radiuss/policies_guidelines/tests-ci.md)

**R.tes.5** [Ensure code quality/health in an automated manner](/radiuss/policies_guidelines/tests-ci.md)


## Portability

**M.por.1** [Support common HPC platforms and toolchains](/radiuss/policies_guidelines/portability.md)

**R.por.2** [Support Apple macOS and Microsoft Windows](/radiuss/policies_guidelines/portability.md)


## Packaging

**M.pac.1** [Provide current version number and build information](/radiuss/policies_guidelines/packaging.md)

**R.pac.2** [Use a limited and well-defined symbol, macro, library, and include file namespace](/radiuss/policies_guidelines/packaging.md)

**M.pac.3** [Repect MPI compatibility best practices](/radiuss/policies_guidelines/packaging.md)


## Logging and Debugging

**R.log.1** [Use consistent, formatted logs](/radiuss/policies_guidelines/logging-debugging.md)

**R.log.2** [Provide production and debugging builds](/radiuss/policies_guidelines/logging-debugging.md)
