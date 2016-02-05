---
title: Homepage
layout: default
---

## Open Source Software Repositories

{% for repo in site.github.public_repositories %}

<div class="panel panel-default">
    <div class="panel-heading">
        <h3 class="panel-title">
            <a href="{{ repo.html_url }}">{{ repo.name }}</a>
            <small>{{ repo.language }}</small>
            <span class="pull-right">
                <span class="fa fa-code-fork"></span> {{ repo.forks }}
                <span class="fa fa-star"></span> {{ repo.watchers }}
            </span>
        </h3>
    </div>

    <div class="panel-body">
        <p>{{ repo.description }}</p>
    </div>
</div>

{% endfor %}
