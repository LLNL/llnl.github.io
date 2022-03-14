<a name="mdoc1"></a>
[![Generic badge](https://img.shields.io/badge/M.doc-1-red.svg)](#mdoc1) **Develop documentation from a readable plain-text format that can be publish documentation in a web-based format or as a PDF**

>Rationale
>: Web-based documentation is accessible, searchable, and linkable. It allows users to easily point each other to relevant parts of the documentation in emails, the code, and other documents. It also makes it easier to manage under revision control (see also M.doc.3). All of these tools allow developers to create web-based manuals and API documentation automatically, using a familiar, non-HTML plain-text format. Examples:
>
> * [Sphinx](http://www.sphinx-doc.org/en/master/#)
> * [LaTeX](https://www.latex-project.org/)
> * [Doxygen](http://www.doxygen.nl/)
>
>Ref
>: *WSC 4.1*
>: *WSC 4.4*

---
<a name="mdoc2"></a>
[![Generic badge](https://img.shields.io/badge/M.doc-2-red.svg)](#mdoc2) **Provide a concise description of the software functionality wherever your project is summarized**

>Details
>: The description should typically be answering "What is it for ?" and "Should I use it ?", and not simply an extension of an acronym or otherwise fully generic description that does not differentiate the software from other products. This description (1-3 sentences) should be consistently used in:
>
> * The GitHub host web interface (modified with the 'Edit' button)
> * The top of the root README.md
> * The corresponding Spack package
>
>Rationale
>: Developers who come across your project or repository should be able to determine almost immediately if your project is applicable to their needs. The GitHub repo description is also used as the basis to automatically describe each project at [https://software.llnl.gov/](https://software.llnl.gov/).

---
<a name="mdoc3"></a>
[![Generic badge](https://img.shields.io/badge/M.doc-3-red.svg)](#mdoc3) **Version control your documentation consistent with and alongside your source code.**

>Rationale
>: When documentation is version controlled consistent with the corresponding source code, developers and users can easily retrieve the documentation associated with any revision of the code. Versioning documentation along with source code (in the same repository) also allows and encourages any developer to easily contribute to the documentation as part of their pull request.
>
>Ref
>: *WSC 4.3*

---
<a name="mdoc4"></a>
[![Generic badge](https://img.shields.io/badge/M.doc-4-red.svg)](#mdoc4) **Provide a documented, reliable way to contact the development team.**

>Details
>: Contact can be through email address, a web-based submission form, or via GitHub (issues, pull requests). In the case of email, a generic name is preferred that can be reflected to alternate or multiple team members as needed. Joining a mailing list should not be required.
>
>Rationale
>: Users should be able to easily contact the development team in order to report bugs or request basic assistance. RADIUSS can provide support for those libraries included in the RADIUSS project for basic fixes and support.
>
>Ref
>: [*xSDK M5*](https://github.com/xsdk-project/xsdk-community-policies/blob/master/package_policies/M5.md)

---
<a name="rdoc5"></a>
[![Generic badge](https://img.shields.io/badge/R.doc-5-yellow.svg)](#rdoc5) **Provide and maintain example source code along with documentation.**

>Details
>: Examples should be compiled and tested as part of a release to make sure they are kept up to date with API changes. New examples should be added when major new features are released, or existing examples should be extended to include those new features. Existing [proxy apps](https://software.llnl.gov/explore/#/ProxyApplications) are a potential good starting place.
>
>Rationale
>: This recommendation serves two purposes. The first is for documentation of the concrete usage of the product, training, or new feature demonstration. The second is for maintenance purpose as these examples provides a primary set of tests for non-regression or installation verification (see [Testing and Continuous Integration](/project/policies/tests-ci)).

---
<a name="rdoc6"></a>
[![Generic badge](https://img.shields.io/badge/R.doc-6-yellow.svg)](#rdoc6) **Provide a documented policy for handling pull requests from external contributors**

>Details
>: Successful open source projects will attract bug fixes and feature development from the external community, preferably via pull requests on GitHub associated with a particular issue in the tracker. Teams should have a policy documenting expectations for when a pull request may be accepted, rejected, or returned for modifications.
>
>Rationale
>: Developers providing fixes will be discouraged from future contributions if they feel they are being ignored. Similarly, they are probably using a branched version of your software to workaround the fix they provided, which leads to additional inefficiencies.

---
