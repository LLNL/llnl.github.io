<a name="mlic1"></a>
[![M.lic.1](https://img.shields.io/badge/M.lic-1-red.svg)](#mlic1)  **New projects must use an [OSI](https://opensource.org/licenses)-approved, permissive open-source license (e.g., Apache, Apache-2.0 with LLVM-exception, MIT, or BSD 3-Clause).**

>Details
>: Similarly, any required dependencies must use an OSI-approved license that is considered compatible with the open-source permissive license for distribution purposes. Non-critical optional dependencies may use any OSI-approved license.
>
>Rationale
>: A permissive open-source license is friendlier to use by commercial entities. Note that strong copyleft licenses (e.g., GPL) are not considered compatible with permissive licenses. Weaker copyleft licenses (e.g., LGPL or GPL v2 with runtime exception) can be considered compatible for distribution purposes.
>
>Ref
>: [*xSDK M7*](https://github.com/xsdk-project/xsdk-community-policies/blob/master/package_policies/M7.md)

---
<a name="mlic2"></a>
[![M.lic.2](https://img.shields.io/badge/M.lic-2-red.svg)](#mlic2)  **Provide a list of dependencies and their associated licenses in SPDX format.**

>Details
>: The [SPDX License List](https://spdx.org/licenses/) is a list of commonly found licenses and exceptions used in open-source software that enables easy and efficient identification of such licenses. At the minimum, this should be done for all internally bundled source code, and optionally for external dependencies as well. It should preferably be placed in the NOTICE (or LICENSE) file in the root of the repository or in the bottom of a README.md. Examples:
>
> * See the Spack [COPYRIGHT](https://github.com/spack/spack/blob/develop/COPYRIGHT) file.
> * See the Cardioid [README](https://github.com/LLNL/cardioid/blob/master/README.md) file.
>
>Rationale
>: This provides important information in a concise format to users and projects who are making decisions about whether to adopt RADIUSS products without forcing them to track down this information for each dependency.
>
>Ref
>: See [this link](/about/licenses) for LLNL Software Licensing Guidelines.

---
<a name="rlic3"></a>
[![R.lic.3](https://img.shields.io/badge/R.lic-3-yellow.svg)](#rlic3)  **Existing projects should consider moving to an [OSI](https://opensource.org/licenses)-approved, permissive open-source license for existing projects (e.g., Apache, MIT, or BSD 3-Clause).**

>Details
>: Unlike M.lic.1, we recognize that projects that have existed for a long time may have adopted non-permissive licenses at their outset and it may be infeasible to convert. But the long-term benefits may make this worth considering.
>
>Rationale
>: [*See M.lic.1*](#mlic1)

---
