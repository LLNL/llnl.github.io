---
title: Testing and Continuous Integration
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

[![Generic badge](https://img.shields.io/badge/M.tes-1-blue.svg)]() **Use regression tests in the development process.** 

> Rationale: Regression tests prevent new features from affecting prior functionality, and they allow developers to have more confidence in their changes when modifying code.

Ref: WSC 5.1

---

[![Generic badge](https://img.shields.io/badge/M.tes-2-blue.svg)]() **Provide a test suite for correctness of installation verification.**

Details: This doesn’t mean that unit-tests should be installed. When installing from source, tests should be run after build, including unit-tests. Then at install some tests -- which could derive from example codes -- must be run and deployed for future verifications.

> Rationale: An executable test suite gives users confidence that the product gives correct results. It is also recommended that at least a significant subset of the tests be can be run in batch-only environments. 

Ref: xSDK M2

---

[![Generic badge](https://img.shields.io/badge/M.tes-2-blue.svg)]() **Provide a development test suite along with sources for external contributors.**

> Rationale: External contributors should be able to test there code to the same standard as the development team. This ensure easier integration of new contribution and transparency in the process. 

---

[![Generic badge](https://img.shields.io/badge/M.tes-3-blue.svg)]() **Take advantage of continuous integration (CI).**

> Rationale: CI helps to prevent integration problems by identifying issues as they arise instead of allowing them to compound. This process helps reduce rework, cost, and time. Examples of CI tools include [Travis CI](https://travis-ci.org) for projects hosted on GitHub, or [GitLab CI](https://about.gitlab.com) for projects hosted on a GitLab instance such as [LC-GitLab](https://lc.llnl.gov/gitlab). Some products may use Azure Pipelines in the future.

Examples:
 - RAJA with Travis CI on GitHub. See [.travis.yml](https://lc.llnl.gov/gitlab) 
 - VisIT with Circle CI on GitHub. See [.circleci/config.yml](https://github.com/visit-dav/visit/blob/develop/.circleci/config.yml)
 - MFEM with AppVeyor on GitHub. See [.appveyor.yml](https://github.com/mfem/mfem/blob/master/.appveyor.yml)
 - Ascent with Azure Pipelines on GitHub. See [azure-pipelines.yml](https://github.com/Alpine-DAV/ascent/blob/develop/azure-pipelines.yml)

---

[![Generic badge](https://img.shields.io/badge/R.tes-4-9cf.svg)]() **Continuously check compatibility with different compilers.** 

Details: During the development process, tests should include compilation across a matrix of compilers.

> Rationale: This helps to guard against platform-specific or compiler-specific errors.

---

[![Generic badge](https://img.shields.io/badge/R.tes-5-9cf.svg)]() **Ensure code quality/health in an automated manner.**

> Rationale: Code quality checkers help to prevent code constructs that may result in errors in future environments where the code may run. They also reduce noise in build output that may obfuscate real errors. Code style checkers can also help enforce consistent style across a project.

Ref: WSC 5.4

---
