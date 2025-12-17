---
title: Releases
layout: default
description: An automated feed of open source software releases by LLNL project teams.
permalink: /releases/
breadcrumb: Releases
---

{% raw %}
<div class="container" ng-app="app" ng-controller="ReleaseController" ng-cloak>
    <div class="row">
        <div class="col-12">
            <button ng-class="{'btn-year btn btn-outline-gradient me-3': true, 'active': activeYear === null}" data-year="{{ year }}" ng-click="clearYear()">All</button>
            <button ng-repeat="year in years | filter:filterYearsByLowerBoundYear" ng-class="{'btn-year btn btn-outline-gradient me-3': true, 'active': activeYear === year}" data-year="{{ year }}" ng-click="setYear(year)">{{ year }}</button>
        </div>
    </div>
    <div class="row mt-5 mb-0">
        <div class="col-12">
{% endraw %}
{% include components/icon-header.html title='Releases' icon='fa-code' tag="h2" %}
{% raw %}
        </div>
    </div>
    <div class="row">
        <div class="col-12" id="release-container">
            <article ng-repeat="release in releases | filter:filterPostsByLowerBoundYear | filter:filterByPublishedAt | orderBy: sortBy : sortByReverse" id="{{ release.name }}" class="border-bottom border-bottom-impact-blue border-2 pb-4 transition-slide-up">
                <h3 title="{{ release.name }}"><a class="text-decoration-none" href="{{ release.url }}">{{ release.project }} - {{ release.tagName }}</a></h3>
                <p class="fs-13 fw-semibold text-quantum-slate"><time datetime="{{ release.publishedAt }}">{{ release.publishedAt.value | date: 'MMMM d, yyyy' }}</time></p>
                <p><b>Name</b>: {{ release.name }}</p>
                <div ng-if="release.content" class="content">{{ release.content }}</div>
            </article>
        </div>
    </div>
</div>
{% endraw %}

<script>
var releases = {"items":[{% for post in site.categories.release %}{
  "title": {{post.title | jsonify}},
  "slug": {{ post.title | slugify | jsonify }},
  "url": {{ post.url | prepend: site.baseurl | prepend: site.url | jsonify }},
  "date": {{ post.date | date: '%B %-d, %Y' | jsonify }},
  "category": {{ post.category | jsonify }},
  "tags": {{ post.tags | jsonify }},
  "author": {{ post.author | jsonify }},
  "content": {{ post.content | jsonify }}
}{% unless forloop.last %},{% endunless %}{% endfor %}]}
</script>

<!--script src="/assets/js/libs/angular.min.js"></script-->
<script src="/assets/js/libs/angular.js"></script>
<script src="/assets/js/libs/angular-animate.min.js"></script>
<script src="/assets/js/news/release.js"></script>
