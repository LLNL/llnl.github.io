---
title: Licensing
layout: info
---

### {{ page.title }}
{: .page-header}
[Back to Policies and Guidelines home](/radiuss/policies/)

---

#### legend

[![generic badge](https://img.shields.io/badge/M.section-N-blue.svg)]() Designates a __mandatory__ point (policy).

[![generic badge](https://img.shields.io/badge/R.section-N-9cf.svg)]() Designates a __recommended__ point (guideline).

&nbsp;

---

[![M.lic.1](https://img.shields.io/badge/M.lic-1-blue.svg)]()  **Use an [OSI](https://opensource.org/licenses)-approved, permissive open-source license (e.g., Apache, MIT, or BSD 3-Clause).**  

Details: Similarly, any required dependencies must use an OSI-approved license that is considered compatible with the open-source permissive license for distribution purposes. Non-critical optional dependencies may use any OSI-approved license.

> Rationale: A permissive open-source license is friendlier to use by commercial entities. Note that strong copyleft licenses (e.g., GPL) are not considered compatible with permissive licenses. Weaker copyleft licenses (e.g., LGPL or GPL v2 with runtime exception) can be considered compatible for distribution purposes.

Ref: xSDK M7

---

[![M.lic.2](https://img.shields.io/badge/M.lic-2-blue.svg)]()  **Provide a list of dependencies and their associated licenses in SPDX format.**

Details: The SPDX License List is a list of commonly found licenses and exceptions used in open-source software that enables easy and efficient identification of such licenses. At the minimum, this should be done for all internaly bundled source code, and optionally for external dependencies as well.

> Rationale: This provides critical information to users and projects that include RADIUSS products.

Example:  See the Spack [COPYRIGHT](https://github.com/spack/spack/blob/develop/COPYRIGHT) file.

Tag: Tools 

---

[![R.lic.3](https://img.shields.io/badge/R.lic-3-9cf.svg)]()  **Consider moving to an [OSI](https://opensource.org/licenses)-approved, permissive open-source license for existing projects (e.g., Apache, MIT, or BSD 3-Clause).** 

---
