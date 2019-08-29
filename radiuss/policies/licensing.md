---
title: Licensing
layout: info
---

### {{ page.title }}
{: .page-header}
[Back to Policies and Guidelines home](/radiuss/policies/)

M → Mandatory

R → Recommended

---

[![M.lic.1](https://img.shields.io/badge/M.lic-1-blue.svg)]()  **New RADIUSS products must use an [OSI](https://opensource.org/licenses)-approved, permissive open-source license (e.g., Apache, MIT, or BSD 3-Clause).**  

Details: Similarly, any required dependencies must use an OSI-approved license that is considered compatible with the open-source permissive license for distribution purposes. Non-critical optional dependencies may use any OSI-approved license.

> Rationale: A permissive open-source license is friendlier to use by commercial entities. Note that strong copyleft licenses (e.g., GPL) are not considered compatible with permissive licenses. Weaker copyleft licenses (e.g., LGPL or GPL v2 with runtime exception) can be considered compatible for distribution purposes.

Ref: xSDK M7

---

[![M.lic.2](https://img.shields.io/badge/M.lic-2-blue.svg)]()  **RADIUSS products must provide a list of dependencies and their associated licenses.**

> Rationale: This provides critical information to users and projects that include RADIUSS products.

---

[![R.lic.3](https://img.shields.io/badge/R.lic-3-blue.svg)]()  **Existing RADIUSS products should consider transitioning to an [OSI](https://opensource.org/licenses)-approved, permissive open-source license (e.g., Apache, MIT, or BSD 3-Clause).** 

---

[![R.lic.4](https://img.shields.io/badge/R.lic-4-blue.svg)]()  **RADIUSS products should provide a list of dependencies and their associated licenses in [Software Package Data Exchange (SPDX)](https://spdx.org/licenses) format.**

> Rationale: The SPDX License List is a list of commonly found licenses and exceptions used in open-source software that enables easy and efficient identification of such licenses.

Example:  See the Spack [COPYRIGHT](https://github.com/spack/spack/blob/develop/COPYRIGHT) file.

Tag: Tools 

---
