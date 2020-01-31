[![M.lic.1](https://img.shields.io/badge/M.lic-1-red.svg)]()  **New projects must use an [OSI](https://opensource.org/licenses)-approved, permissive open-source license (e.g., Apache, MIT, or BSD 3-Clause).**  

>Details
>: Similarly, any required dependencies must use an OSI-approved license that is considered compatible with the open-source permissive license for distribution purposes. Non-critical optional dependencies may use any OSI-approved license.
>
>Rationale
>: A permissive open-source license is friendlier to use by commercial entities. Note that strong copyleft licenses (e.g., GPL) are not considered compatible with permissive licenses. Weaker copyleft licenses (e.g., LGPL or GPL v2 with runtime exception) can be considered compatible for distribution purposes.
>
>Ref
>: *xSDK M7*

---

[![M.lic.2](https://img.shields.io/badge/M.lic-2-red.svg)]()  **Provide a list of dependencies and their associated licenses in SPDX format.**

>Details
>: The [SPDX License List](https://spdx.org/licenses/) is a list of commonly found licenses and exceptions used in open-source software that enables easy and efficient identification of such licenses. At the minimum, this should be done for all internaly bundled source code, and optionally for external dependencies as well.
>
>Example
>: See the Spack [COPYRIGHT](https://github.com/spack/spack/blob/develop/COPYRIGHT) file.
>
><span style="color:red">QUESTION: Should we try to standardize where this information is found? e.g. in the COPYRIGHT file, or README? Is the format in the Spack COPYRIGHT example one we're proposing to standardize on? What about optional vs. required dependencies? </span>
>
>Rationale
>: This provides important information in a concise format to users and projects who are making decisions about whether to adopt RADIUSS products without forcing them to track down this information for each dependency.
>
>Tag
>: Tools 

---

[![R.lic.3](https://img.shields.io/badge/R.lic-3-yellow.svg)]()  **Existing projects should consider moving to an [OSI](https://opensource.org/licenses)-approved, permissive open-source license for existing projects (e.g., Apache, MIT, or BSD 3-Clause).** 

>Details
>: Unlike M.lic.1, we recognize that projects that have existed for a long time may have adopted non-permissive licenses at their outset and it may be infeasible to convert. But the long-term benefits may make this worth considering.
>
>Rationale
>: *See M.lic.1*

---
