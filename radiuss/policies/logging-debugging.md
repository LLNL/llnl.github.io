---
title: Logging and Debugging
layout: info
---

## {{ page.title }}
{: .page-header}

**R.log.1**  Consistent, formatted logs is a recommended practice. RADIUSS products may use [SLIC](https://axom.readthedocs.io/en/develop/axom/slic/docs/sphinx/index.html) to achieve this.

Tag: Tools 

---

**R.log.2**  RADIUSS products should provide at least two types of builds: debug and production.

> Rationale: Production version should not be compiled with debug symbols. A mechanism to enable/disable those at compile time should be provided.

Ref: Smart Libraries practice 19

---
