---
title: Homepage
layout: default
---

# LLNL Software Portal

Welcome to the Lawrence Livermore National Laboratory software portal! The
purpose of this software portal (or catalog if you prefer) is to serve as the
definitive source of truth pointing to all software that has been produced and
released by Lawrence Livermore National Laboratory.

LLNL produces software on a daily basis. Some of this software is used only
internally, other components are licensed for use by external partners and
collaborators, still other software is released, or even actively developed, in
the open on software hosting platforms such as GitHub.com, Bitbucket.org,
Sourceforge.net, and others.

This page is designed to be a single stop to find all types of software
produced and available due to the expertise of Lawrence Livermore National
Laboratory scientists and engineers.

If you have any questions, please don't hesitate to
[email our mailing list](mailto:open-source@llnl.gov).

{% assign sorted_software = (site.software | sort: 'title') %}
{% for package in sorted_software %}
<div class="well">
    <h1>{{ package.title }}</h1>

    <p>{{ package.description }}</p>

    <strong>Author</strong>: {{ package.author }}

    {% if package.source_code_url or package.project_url %}
    <br/>
    {% endif %}

    {% if package.source_code_url %}
    <strong>Source Code</strong>: <a href="{{ package.source_code_url }}">{{ package.source_code_url }}</a>
    {% endif %}

    {% if package.source_code_url and package.project_url %}
    <br/>
    {% endif %}

    {% if package.project_url %}
    <strong>Project Page</strong>: <a href="{{ package.project_url }}">{{ package.project_url }}</a>
    {% endif %}
</div>
{% endfor %}
