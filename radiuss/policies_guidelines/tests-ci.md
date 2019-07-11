## Testing and Continuous Integration

**M.tes.1** Usage of regression tests in the development process is considered a mandatory practice.

> Rationale: Regression tests prevent new features from affecting prior functionality, and they allow developers to have more confidence in their changes when modifying code.

Ref: WSC 5.1

---

**M.tes.2** RADIUSS products must provide a comprehensive test suite for correctness of installation verification.

> Rationale: An executable test suite gives users confidence that the product gives correct results. A significant subset of the test suite should complete within a few hours on standard workstation-level hardware. It is also recommended that at least a significant subset of the tests be can be run in batch-only environments. 

Ref: xSDK M2

---

**M.tes.3** Usage of Continuous Integration (CI) is considered a mandatory practice. 

> Rationale: CI helps to prevent integration problems by identifying issues as they arise instead of allowing them to compound. This helps reduce rework and reduces cost and time. Examples of CI tools include Travis CI for projects hosted on GitHub or GitLab CI for projects hosted on a GitLab instance such as LC-GitLab. Some products may use Azure Pipelines in the future.

Examples:
 - RAJA with Travis CI on GitHub.  See .travis.yml 
 - VisIT with Circle CI on GitHub.  See  .circleci/config.yml
 - MFEM with AppVeyor on GitHub.  See  .appveyor.yml
 - Ascent with Azure Pipelines on GitHub. See azure-pipelines.yml

---

**R.tes.4** During the devolopment process, tests should include compilation across a matrix of compilers.

> Rationale: This help to guard against platform-specific or compiler-specific errors.

---

**R.tes.5** Products should ensure code quality/health in an automated manner.

> Rationale: Code quality checkers help to prevent code constructs that may result in errors in future environments where the code may run. They also reduce noise in build output that may obfuscate real errors. Code style checkers can also help enforce consistent style across a project.

Ref: WSC 5.4

---
