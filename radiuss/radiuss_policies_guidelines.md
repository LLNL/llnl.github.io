---
title: RADIUSS Policies and Guidelines
layout: info
release_number: LLNL-TR-781103
---

## {{ page.title }}
{: .page-header .no_toc}

* Table of Contents
{:toc}

RADIUSS aims to provide a set of broadly-used open-source libraries and tools used for HPC scientific application development.  

Items marked with **M** are *mandatory*, whereas those marked with **R** are *recommended* best practices.

---

1\. Building, Testing, and Deployment  
-------------------------------------

**M1.1: All RADIIUS products must support automated builds of their dependencies.**  

*Rationale*: Automating the build process prevents duplication of effort and allows 
others to build a copy of the code and to incorporate needed fixes in dependency tools 
and libraries.

**M1.2: All RADIIUS products must support installation using [RADIUSS Policies and Guidelinespack](https://spack.io/>).**  

*Rationale*: Spack is a package management tool designed for both HPC environments and 
for laptops that allows easy configuration with multiple dependency versions, 
configurations, platforms, and compilers.

**M1.3: All products must include regression tests.**  

*Rationale*: Regression tests prevent new features from affecting prior functionality, 
and they allow developers to have more confidence in their changes when modifying code. 

**M1.4: RADIUSS products must provide a comprehensive test suite that can be run by users and does not require the purchase of commercial software.  Tests must be runnable (and should be run) by users.**  

*Rationale*: An executable test suite gives users confidence that the product gives 
correct results.

**R1.5: RADIUSS products coded in C++ and/or FORTRAN should be built using [CMake](https://cmake.org) and [BLT](https://github.com/LLNL/blt) (Build, Link and Test).**  

*Rationale*: Consistent use of CMake and BLT will enable individual users, computing 
centers, and package managers (such as Spack) to install the package in a way that is 
compatible with other RADIUSS products on the same system.  Consistent use of a common toolset
also makes it easier to for new developers to quickly become productive.

**R1.6: A significant subset of the test suite should complete within a few hours on standard workstation-level hardware.**  

*Rationale*: A limited set of tests is needed to quickly identify obvious (not subtle) 
problems.

**R1.7: A significant subset of the tests should target batch-only environments.**  

*Rationale*: Problems specific to batch environments may not manifest while running interactively.

**R1.8:  The test suite should include an option to perform compilation across a matrix of compilers.**  

*Rationale*: This option helps guard against platform-specific or compiler-specific errors.  Ideally, it should execute in minutes, not hours. 

---

2\. Version Control and Configuration Management
------------------------------------------------

**M2.1: All RADIUSS products must be version-controlled and must use [Git](https://git-scm.com).**  

*Rationale*: Version control is essential for collaborative development and change 
tracking.  Git is the most popular version control system by a wide margin and many
sophisticated web-based collaboration tools are available for it.


**M2.2: Each RADIUSS product must be maintained at** [GitHub](https://github.com).
*Rationale*: GitHub is one of the most-used repositories of open source software.
It includes collaboration tools such as issue tracking, pull requests, and wikis.

Branching and pull requests:  

- Allow project maintainers to review changes, comment, and iterate with developers before new features are committed to a code base. 
	
- Simplify management of large numbers of contributions, particularly across teams, and they enable many features to be developed concurrently. 

**M2.3: All RADIUSS products must use Continuous Integration (CI) so that changes are tested as they are introduced.**

*Rationale*: CI helps prevent integration problems by identifying issues as they arise instead of allowing 
them to compound. This helps reduce rework and reduces cost and time

Example CI Tools:

- [Travis CI](https://travis-ci.org) for projects hosted on GitHub
	
- GitLab CI for projects hosted on a [GitLab](https://about.gitlab.com) instance such as [LC-GitLab](https://lc.llnl.gov/gitlab)
	
- [Azure Pipelines](https://azure.microsoft.com/en-us/services/devops/pipelines)

Example Projects using CI:

- RAJA with Travis CI on GitHub.  See [.travis.yml](https://github.com/LLNL/RAJA/blob/develop/.travis.yml). 
	
- VisIT with Circle CI on GitHub.  See [.circleci/config.yml](https://github.com/visit-dav/visit/blob/develop/.circleci/config.yml).
		

**R2.4: Products should use Pull Requests to facilitate code review and testing of code changes.**  

*Rationale*: The product maintainer can review code and associated test 
results before merging it into a public branch. Pull requests can also 
be linked to GitHub issues, which anyone can be create.


**R2.5: Products should enforce code quality/health with static checkers and/or other tools.**  

*Rationale*: Code quality checkers help to prevent code constructs that may 
result in errors in future environments where the code may run. They also reduce 
noise in build output that may obfuscate real errors. Code style checkers can 
also help enforce consistent style across a project
	
---

3\. Portability
--------------

**M3.1: RADIUSS products must support common HPC platforms, including standard Linux distributions, and common compiler toolchains such as GNU, Clang, and vendor compilers.**  

*Rationale*:  This will ensure a broad base of users.

**R3.2: Support for Apple Mac OS and Microsoft Windows Visual Studio is recommended.**  

*Rationale*:  This allows code development on common desktop and laptop machines.

---

4\. Licensing
------------

**M4.1: New RADIUSS products must use an OSI-approved, permissive open-source license (e.g., Apache, MIT, or BSD 3-Clause).  Similarly, any required dependencies must use an OSI-approved license that is considered compatible with the open-source permissive license for distribution purposes. Non-critical optional dependencies may use any OSI-approved license.**  

*Rationale:* A permissive open-source license is friendlier to use by commercial entities. Note that strong copyleft licenses (e.g., GPL) are not considered compatible with permissive licenses. Weaker copyleft licenses (e.g., LGPL or GPL v2 with runtime exception) can be considered compatible for distribution purposes.

**M4.2: RADIUSS products must provide a list of dependencies and their associated licenses.**  

*Rationale:* This provides critical information to users and projects that include RADIUSS products.

**R4.3: Existing RADIUSS products should consider transitioning to an OSI-approved, permissive open-source license (e.g., Apache, MIT, or BSD 3-Clause).**  

*Rationale:* See M4.1

**R4.3: RADIUSS products should provide a list of dependencies and their associated licenses in Software Package Data Exchange (SPDX) format.**  

*Rationale:* The [SPDX License List](https://spdx.org/licenses) is a list of commonly found licenses and exceptions used in open source software that enables easy and efficient identification of such licenses. See also M4.2.  
Example:  See the Spack [COPYRIGHT](https://github.com/spack/spack/blob/develop/COPYRIGHT) file.

---

5\. Interfaces, Packaging, and Behavior
---------------------------------------
**M5.1: Each RADIUSS product API must include a way to return the current version number of the software and indicate which configure/CMAKE and compiler options were used to build the package. For development versions of the software, each package must provide the current commit ID in the repository.**  

*Rationale:* This allows users to make an inventory of what they have, which can aid debugging and configuration management.

**M5.2: Each RADIUSS product that utilizes MPI must restrict its MPI operations to MPI communicators that are provided to it and not directly use MPI_COMM_WORLD.**  
*Rationale:* Prevent resource leaks.

**M5.3: RADIUSS products must use tests to detect which MPI features are available.**  

*Rationale:* Help ensure compatibility with different MPI implementations.

**R5.4: Each RADIUSS product should use a limited and well-defined symbol, macro, library, and include file name space.**  

*Rationale:* This allows users to unambiguously identify the components within their installed configuration. For example, there should be no publicly-visible include files such as ``utils.h``, or a package named ``libutil.a``, nor any macros named ``YES`` or ``TRUE``. Namespacing of include files can be handled either by prepending each include file with a package name, for example ``<XXXutils.h>``, or by placing and referencing all include files in a subdirectory with a package name, for example ``<XXX/utils.h>``. Note that using a ``-I/XXX/`` and referencing it in source via ``<utils.h>`` would not be acceptable namespacing due to the inherent fragility of this approach.

**R5.5: RADIUSS products should behave appropriately regardless of the MPI error-handling being used and should have an option to prevent them from changing the MPI error handling.**  

*Rationale:* Prevent clients from unexpected side-effects of error-handling.

---

6-. Logging and Debugging support
---------------------------------

**R6.1  RADIUSS products should use SLIC for logging.**  

*Rationale:*  Consistency and ease of maintenance, etc.

**R6.2  RADIUSS products should make debug support configurable at compile time.**

*Rationale:*  Users don't always need (or want) debug information, and providing debug support may degrade performance.

---

7\. Documentation
-----------------

**M7.1 RADIUSS products must publish documentation in a web-based form.**  

*Rationale:* Web-based documentation is accessible, searchable, and linkable. It allows users to easily point each other to relevant parts of the documentation in emails, in the code, and in other documents.

**R7.2 RADIUSS product documentation source must be revision-controlled along with source code.**   

*Rationale:* The documentation should be version controlled along with source code so that developers and users can easily retrieve the documentation associated with any revision of the code. Versioning documentation with source code also allows any developer to easily contribute to the documentation.

**R7.3 RADIUSS product documentation should be produced using Sphinx, LaTeX, or Doxygen.**  

*Rationale:* All of these tools allow you to create web-based manuals and API documentation automatically, using a familiar, non-HTML plain-text format

**R7.4 Radiuss products should include working code samples.**  

*Rationale:* Code samples increase productivity by helping developers quickly learn how to use libraries, etc.
	

---

References
----------

[Better Scientific Software](https://bssw.io) - contains some best practices for HPC teams

[xSDK Community Policies](https://xsdk.info/policies) - A set of mandatory policies that a software package must satisfy in order to be considered xSDK compatible. xSDK is a set of libraries, tools, and frameworks for HPC software development.

[Smart Libraries: Best SQE Practices for Libraries with Emphasis on Scientific Computing](https://www.osti.gov/biblio/936460) by Mark Miller, et al., UCRL-JRNL-208636 (2004).

---
