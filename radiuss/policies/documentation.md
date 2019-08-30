---
title: Documentation
layout: info
---

### {{ page.title }}
{: .page-header}
[Back to Policies and Guidelines home](/radiuss/policies/)

---

#### Legend

[![generic badge](https://img.shields.io/badge/M.section-N-blue.svg)]() Designates a __mandatory__ point (policy).

[![generic badge](https://img.shields.io/badge/R.section-N-9cf.svg)]() Designates a __recommended__ point (guideline).

&nbsp;

---

[![Generic badge](https://img.shields.io/badge/M.doc-1-blue.svg)]() **Publish documentation in a web-based form.**

> Rationale: Web-based documentation is accessible, searchable, and linkable. It allows users to easily point each other to relevant parts of the documentation in emails, the code, and other documents. 

Ref: WSC 4.1

---

[![Generic badge](https://img.shields.io/badge/M.doc-2-blue.svg)]() **Provide a concise description of the project.**


Details: 
 - The description should typically be answering "What is it for ?" and "Should I use it ?".
 - One possible location for this description is at top of the root README.md. 
 - This description should also be used in the repository host web interface (ie GitHub most of the time here). This information is in fact automatically retrieved to generate https://software.llnl.gov/.
 - This description should also be placed in the corresponding Spack package.
 
> Rationale: With increasing number of products and dependencies in simulation softwares, one has to be able to navigate them whatever his background. 

---

[![Generic badge](https://img.shields.io/badge/M.doc-3-blue.svg)]() **Version controlled documentation coherently with source code.**

> Rationale: When documentation is version controlled coherently with source code, developers and users can easily retrieve the documentation associated with any revision of the code. Versioning documentation along with source code (in the same repository) also allows any developer to easily contribute to the documentation. 

Ref: WSC 4.3

---

[![Generic badge](https://img.shields.io/badge/M.doc-4-blue.svg)]() **Provide a documented, reliable way to contact the development team, even for RADIUSS itself.**

Ref: xSDK M5

---

[![Generic badge](https://img.shields.io/badge/R.doc-5-9cf.svg)]() **Produce Web and PDF documentation from a readable plain-text format.** 

> Rationale: All of these tools allow developers to create web-based manuals and API documentation automatically, using a familiar, non-HTML plain-text format.

Examples :
 - [Sphinx](http://www.sphinx-doc.org/en/master/#)
 - [LaTeX](https://www.latex-project.org/)
 - [Doxygen](http://www.doxygen.nl/).

Ref: WSC 4.4

Tag: Tools

---

[![Generic badge](https://img.shields.io/badge/R.doc-6-9cf.svg)]() **Provide and maintain example codes along with documentation.**

Details:
 - Examples should be compiled and tested as part of a release to make sure they are kept up to date with API changes.
 - New examples should be added when major new features are released, or existing examples should be extended to include those new features.
 - Existing proxy apps (e.g. https://software.llnl.gov/category/#/PROXYAPPLICATIONS) are a potential good starting place.

> Rationale: This recommendation serves two purposes. The first is for documentation of the concrete usage of the product, training, or new feature demonstration. The second is for maintenance purpose as these examples provides a primary set of tests for non-regression or installation verification (cf [Testing and Continuous Integration](/radiuss/policies/tests-ci.md)) 
 
---
