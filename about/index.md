---
title: About the LLNL Software Catalog
layout: default
description: Learn about LLNL's open source software and why we're committed to creating open source codes whenever feasible.
permalink: /about/
breadcrumb: About
menus:
  about:
    title: Overview
    weight: 1
---

<div class="col-12 col-xxl-2 d-none d-xxl-block pe-5 sticky-top jump-links float-start" id="llnl-side-container">
  <div class="nav pt-2 ps-3 sticky-top d-flex flex-column" aria-orientation="vertical">
    {% include components/icon-list-item.html title='Collaboration Fuels Our Culture' url='#collaboration-fuels-our-culture' icon='fa-chevron-down' %}
    {% include components/icon-list-item.html title='Learn More About OSS at LLNL' url='#learn-more-about-oss-at-llnl' icon='fa-chevron-down' %}
    {% include components/icon-list-item.html title='Other Resources' url='#other-resources' icon='fa-chevron-down' %}
    {% include components/icon-list-item.html title='Contact' url='#contact' icon='fa-chevron-down' %}
  </div>
</div>

<div class="container">
  <div class="col-12" markdown="1">

## Collaboration Fuels Our Culture

<div class="row">
  <div class="col-12 col-lg-6" markdown="1">
Welcome to the Lawrence Livermore National Laboratory ([LLNL](https://www.llnl.gov/)) software catalog&mdash;a hub for open source software (OSS) produced at the Lab.

LLNL developers create and evolve software on a daily basis. Some of this software is used only internally, other components are licensed for use by external partners and collaborators, and still other software is released and actively developed out in the open on software-hosting platforms. This website is the gateway to all of it.

LLNL is a Department of Energy ([DOE](https://www.energy.gov/national-laboratories)) institution, so we abide by the [Federal Source Code Policy](https://www.energy.gov/articles/doe-federal-source-code-policy)* that guides release of open source software (OSS). And not just because we have to but because we *want* to. Long before GitHub was founded, [we started releasing software](https://software.llnl.gov/visualize/) for public use and collaboration.
  </div>
  <div class="col-12 col-lg-6 mb-3">
    <div class="responsive-iframe-container">
      <iframe class="responsive-iframe" width="50%" src="https://www.youtube.com/embed/nTxMn1NWHQU?enablejsapi=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
  </div>
</div>

We often work with other national labs, universities, and industry partners. Working on these projects is a lot easier when we can share code directly. The Exascale Computing Project ([ECP](https://www.exascaleproject.org)) uses OSS to develop the exascale ecosystem of apps, analytics, infrastructure, and so much more. Future breakthroughs will likely owe some debt to the best practices and accelerated development made possible by OSS.

One of the great things about a large government organization is that we're not motivated by profit. "The greater good" might sound like a cliché, but it's true. LLNL's national security mission governs our work, so our OSS portfolio of apps, libraries, compilers, and other tools support that mission. This includes everything from monitoring the performance of our supercomputers to making multiphysics codes run more smoothly.

Case in point: The DOE's Advanced Simulation and Computing ([ASC](https://asc.llnl.gov)) Program leverages OSS to build, field, and integrate Linux clusters into production service at our [Livermore Computing high-performance computing center](https://hpc.llnl.gov/). ASC is responsible for developing computer simulation capabilities that analyze and predict the performance, safety, and effectiveness of the nation's nuclear stockpile. In other words, the stakes are high for ensuring our code is accurate. With OSS, we can develop quickly and choose the best solutions.

This website abounds with examples of projects that have found a home in the open source community. Access is key, which is why we jumped at the chance to index our software on [Code.gov](https://code.gov). You'll find our work in the DOE [repo list](https://code.gov/#!/browse-projects?agencies=DOE), and we invite you to browse our projects on [GitHub](https://github.com/LLNL).

\* The original policy memorandum is no longer available online. For details, please see

<!-- START: Quicklinks -->
<div class="row gx-5 gy-5">
  <div class="col-12 col-sm-6 col-lg-3">
    {% include components/quick-link.html title="The People's Code Blog Post" url="https://www.cio.gov/2016/08/11/peoples-code.html" icon="fa-code" %}
  </div>
  <div class="col-12 col-sm-6 col-lg-3">
    {% include components/quick-link.html title="The Archived Policy on GitHub" url="https://github.com/WhiteHouse/source-code-policy" icon="fa-github" %}
  </div>
</div>
<!-- END: Quicklinks -->

## Learn More About OSS at LLNL
{:.mt-5}

<div class="row mb-5 gy-5">
  <div class="col-12 col-lg-4">
<!-- START: Quicklinks boxes -->
{% capture cardContent %}
* [LLNL Software News](/news)
* [The Case for Open Source Software](https://18f.gsa.gov/2018/07/12/the-case-for-open-source-software/)
* [OSS Spotlight: LLNL and ZFS on Linux](https://medium.com/codedotgov/oss-spotlight-lawrence-livermore-national-laboratory-and-zfs-on-linux-6596fca6e5f6)
* [Spack, A Lab-Developed ‘App Store for Supercomputers,’ becoming Standard-Bearer](https://www.llnl.gov/news/spack-lab-developed-app-store-supercomputers-becoming-standard-bearer)
{% endcapture %}
{% assign cardContent = cardContent | markdownify %}
{% include components/card.html title='Open Source at LLNL' content=cardContent classes="h-100" %}
<!-- END: Quicklinks boxes -->
  </div>
  <div class="col-12 col-lg-4">
<!-- START: Quicklinks boxes -->
{% capture cardTitle %}
*Science & Technology Review* coverage
{% endcapture %}
{% capture cardContent %}
* [Ambassadors of Code (cover story)](https://str.llnl.gov/2018-01/lee)
* [Ambassadors of Code (video, 3:04)](https://youtu.be/nTxMn1NWHQU)
* [Commentary by Bruce Hendrickson](https://str.llnl.gov/2018-01/comjan18)
* [Visualization Software Stands the Test of Time](https://str.llnl.gov/2021-05/brugger)
{% endcapture %}
{% assign cardTitle = cardTitle | markdownify %}
{% assign cardContent = cardContent | markdownify %}
{% include components/card.html title=cardTitle content=cardContent classes="h-100" %}
<!-- END: Quicklinks boxes -->
  </div>
  <div class="col-12 col-lg-4">
<!-- START: Quicklinks boxes -->
{% capture cardContent %}
* [Releasing Open Source Software at the Lab (poster)](https://computing.llnl.gov/sites/default/files/COMP_Poster_OSS.pdf)
* [Open Source at LLNL (video, 11:31)](https://youtu.be/kL4wIYhNVxE)
* [Open Source at LLNL (slides)](https://computing.llnl.gov/sites/default/files/2020CompExpo_Open_Source.pdf)
{% endcapture %}
{% assign cardContent = cardContent | markdownify %}
{% include components/card.html title='LLNL Computing Virtual Expo Materials' content=cardContent classes="h-100" %}
<!-- END: Quicklinks boxes -->
  </div>
</div>

## Other Resources
<!-- START: Quicklinks boxes -->

<div class="row gx-5 gy-5">
  <div class="col-12 col-sm-6 col-lg-3">
    {% include components/quick-link.html title="18F Handbook: GitHub" url="https://handbook.18f.gov/github/" icon="fa-github" %}
  </div>
  <div class="col-12 col-sm-6 col-lg-3">
    {% include components/quick-link.html title="Controls Necessary for Federal Use of GitHub" url="https://github.com/fisma-ready/github" icon="fa-github" %}
  </div>
  <div class="col-12 col-sm-6 col-lg-3">
    {% include components/quick-link.html title="Guidance for Agency Use of Third-Party Websites and Applications" url="https://obamawhitehouse.archives.gov/sites/default/files/omb/assets/memoranda_2010/m10-23.pdf" icon="fa-file-pdf" %}
  </div>
  <div class="col-12 col-sm-6 col-lg-3">
    {% include components/quick-link.html title="Facts about Publishing Open Source Code" url="https://18f.gsa.gov/2016/08/08/facts-about-publishing-open-source-code-in-government/" icon="fa-globe" %}
  </div>
</div>
<!-- END: Quicklinks boxes -->

{% capture ctaContent %}
For more information, check out our [FAQ](/about/faq). Contact [open-source@llnl.gov](mailto:open-source@llnl.gov) with questions about open source software at LLNL. Contact [github-admin@llnl.gov](mailto:github-admin@llnl.gov) with questions about working in the LLNL GitHub organization or to request a private repository. Visit the [software licensing portal](https://softwarelicensing.llnl.gov/) for information about licensing LLNL's proprietary codes.
{% endcapture %}
{% assign ctaContent = ctaContent | markdownify %}
{% include components/call-to-action.html title='Contact' icon='fa-comments-question-check' content=ctaContent  %}

  </div>
</div>
