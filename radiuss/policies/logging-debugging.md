---
title: Logging and Debugging
layout: info
---

### {{ page.title }}
{: .page-header}
[Back to Policies and Guidelines home](/radiuss/policies/)

M → Mandatory

R → Recommended

[![Generic badge](https://img.shields.io/badge/R.log-1-blue.svg)]()  **Consistent, formatted logs is a recommended practice. RADIUSS products may use [SLIC](https://axom.readthedocs.io/en/develop/axom/slic/docs/sphinx/index.html) to achieve this.**

Tag: Tools 

---

[![Generic badge](https://img.shields.io/badge/R.log-2-blue.svg)]()  **RADIUSS products should provide at least two types of builds: debug and production.**

> Rationale: Production version should not be compiled with debug symbols. A mechanism to enable/disable those at compile time should be provided.

Ref: Smart Libraries practice 19

---
