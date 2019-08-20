---
title: Packaging
layout: info
---

## {{ page.title }}
{: .page-header}
[Back to Policies and Guidelines home](/radiuss/policies/)

**M.pac.1** Version and build characteristics must be easily accessible.

Details: Each RADIUSS product API must include a way to return the current version number of the software and indicate which configure/CMake and compiler options were used to build the package. For development versions of the software, each package must provide the current commit ID in the repository.

> Rationale: This allows users to make an inventory of what they have, which can aid debugging and configuration management. 

Ref: Smart Libraries Practice 10 / xSDK M8

---

**M.pac.2** Usage of a limited and well-defined symbol, macro, library, and include file namespace is considered a mandatory practice.

Details: For example, there should be no publicly visible include files such as `utils.h`, package named `libutil.a`, or macros named YES or TRUE. Namespacing of include files can be handled either by prepending installed include files with a package name (e.g.,`<XXXutils.h>`) or by placing and referencing all installed include files in a subdirectory with a package name (e.g.,`<XXX/utils.h>`). 

> Rationale: This allows users to unambiguously identify the components within their installed configuration. 

Ref: Smart Libraries Practice 18 / Less restrictive than xSDK M9

---

**M.pac.3** Attention must be paid to using MPI in a way that is compatible with other products.

Details: Each RADIUSS product that utilizes MPI must restrict its MPI operations to MPI communicators that are provided to it and not use directly MPI_COMM_WORLD. Products must use configure tests or version tests to detect MPI 2 or MPI 3 features that may not be available; it should not be assumed that a full MPI 2 or MPI 3 implementation is available. Products can change the MPI error-handling mode by default but should have an option to prevent them from changing the MPI error handling (which may have been set by another package or the application). The product should also behave appropriately regardless of the MPI error handling being used.

Ref: xSDK M3.

---
