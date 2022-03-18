<a name="mpkg1"></a>
[![Generic badge](https://img.shields.io/badge/M.pkg-1-red.svg)](#mpkg1) **Version number and build characteristics must be easily accessible**

>Details
>: Each product API must include the functionality to return the current version number of the software and indicate which configure/CMake and compiler options were used to build the package. For development versions of the software, a build or install should allow to trace back to the commit ID of the source used.
>
>Rationale
>: This allows users to make an inventory of what they have, which is critical for reproducibility, and which can aid debugging and configuration management.
>
>Ref
>: *Smart Libraries Practice 10 / [xSDK M8](https://github.com/xsdk-project/xsdk-community-policies/blob/master/package_policies/M8.md)*

---
<a name="mpkg2"></a>
[![Generic badge](https://img.shields.io/badge/M.pkg-2-red.svg)](#mpkg2) **Use a limited, unique, and well-defined symbol, macro, library, and include file namespace.**

>Details
>: i.e., "Don't pollute the global namespace". For example, there should be no publicly visible include files with generic names such as `utils.h`, a package named `libutil.a`, or macros named YES or TRUE. Namespacing of include files can be handled either by prepending installed include files with a package name (e.g.,`<XXXutils.h>`) or by placing and referencing all of them in a subdirectory with the package name (e.g.,`<XXX/utils.h>`).
>
>Rationale
>: Library developers must acknowledge that their software will be built as part of much larger packages. In that context, the use of generic names in the global namespace increases the chance that users of their library will run into build- and link-time errors that must be worked around.
>
>Ref
>: *Smart Libraries Practice 18 / Less restrictive than [xSDK M9](https://github.com/xsdk-project/xsdk-community-policies/blob/master/package_policies/M9.md)*

---
<a name="mpkg3"></a>
[![Generic badge](https://img.shields.io/badge/M.pkg-3-red.svg)](#mpkg3) **Use MPI in a way that is compatible with other products.**

>**Details**
>
> * Each RADIUSS product that utilizes MPI must restrict its MPI operations to MPI communicators that are provided to it and not use directly `MPI_COMM_WORLD`.
> * Products must use configure tests or version tests to detect MPI 2 or MPI 3 features that may not be available; it should not be assumed that a full MPI 2 or MPI 3 implementation is available.
> * Products can change the MPI error-handling mode by default but should have an option to prevent them from changing the MPI error handling (which may have been set by another package or the application). The product should also behave appropriately regardless of the MPI error handling being used.
> * This rule also implies that you should not mock interfaces in a way that overrides the public API of other packages. For example, including a header file from your package should not cause other code in the same compilation unit to use a mocked MPI interface instead of the expected MPI.
>
>Ref
>: *[xSDK M3](https://github.com/xsdk-project/xsdk-community-policies/blob/master/package_policies/M3.md)*

---
