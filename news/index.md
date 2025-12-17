---
title: News
layout: default
description: Catch up on the latest information about LLNL's open source software projects and activities.
permalink: /news/
breadcrumb: News
---

{% raw %}
<div ng-app="app" ng-controller="PostController" class="contain-paint" ng-cloak>
<div class="d-none d-xl-block sticky-xl-top">
    <div class="col-12 col-xl-2 float-lg-start ps-3" id="llnl-side-category-container">
        <a role="button" href="#" ng-class="{'llnl-list-item text-decoration-none d-flex align-items-center px-2 my-3 fs-14 fw-medium text-black text-impact-blue-hover': true, 'active': activeCategory === null}" ng-click="setCategory(null)">
            <div class="icon me-3 d-flex align-items-center justify-content-center">
                <i class="mx-1 fa fa-light fa-newspaper fa-lg"></i>
            </div>
            <span class="">All News</span>
        </a>
        <a role="button" ng-repeat="category in categories" ng-class="{'llnl-list-item text-decoration-none d-flex align-items-center px-2 my-3 fs-14 fw-medium text-black text-impact-blue-hover': true, 'active': activeCategory === category}" ng-click="setCategory(category)">
            <div class="icon me-3 d-flex align-items-center justify-content-center">
                <i class="mx-1 fa fa-light {{ category | categoryIcon }} fa-lg"></i>
            </div>
            <span class="">{{ category | deslugify | titleCase }}</span>
        </a>
    </div>
</div>

<div class="container">
    <div class="col-12">
        <div class="mb-3">
            <button ng-class="{'btn btn-outline-gradient me-3': true, 'active': activeYear === null}" ng-click="setYear(null)">All</button>
            <button ng-repeat="year in years | filter:filterYearsByLowerBoundYear" ng-click="setYear(year)" ng-class="{'btn btn-outline-gradient me-3': true, 'active': activeYear === year}">{{ year }}</button>
        </div>
        <div ng-if="!activeCategory" class="d-flex align-items-center mb-3">
            <i class="fa fa-light fa-newspaper fa-xxl"></i>
            <h2 class="ms-3 my-0">All News</h2>
        </div>
        <div ng-if="activeCategory" class="d-flex align-items-center mb-3">
            <i class="fa fa-light {{ activeCategory | categoryIcon }} fa-xxl"></i>
            <h2 class="ms-3 my-0">{{ activeCategory | deslugify | titleCase }}</h2>
        </div>
        <article ng-repeat="post in posts | filter:filterPostsByCategory | filter:filterPostsByLowerBoundYear | filter:filterPostsByActiveYear | orderBy: sortByValue" class="border-bottom border-bottom-impact-blue border-2 pb-4 mt-5 transition-slide-up">
            <h3 class="d-inline-block mt-0">{{ post.title }} <a href="#{{ post.slug }}" class="d-inline-block text-decoration-none fa fa-link fs-13 ps-2 align-middle"></a></h3>
            <div class="fs-13 fw-semibold text-quantum-slate"><time ng-if="post.date" datetime="{{ post.date }}">{{ post.date | localeDate }}</time> <div ng-if="post.categories.length > 0" class="llnl-post-categories d-inline">(<span ng-repeat="category in post.categories" class="comma-delimit">{{ category | deslugify | titleCase }}</span>)</div></div>
            <div ng-bind-html="post.content | safeHtml"></div>
        </article>
    </div>
</div>

{% endraw %}

{% assign sortedCategories = site.categories | sort %}
{% assign postsByYear = site.posts | group_by_exp:"post", "post.date | date: '%Y'" %}
<script>
var years = {"items":[{% for year in postsByYear %}{{ year.name | jsonify }}{% unless forloop.last %},{% endunless %}{% endfor %}]};
var categories = {"items":[{% for category in sortedCategories %}{% unless category[0] contains "release" %}{{ category[0] | jsonify }}{% unless forloop.last %},{% endunless %}{% endunless %}{% endfor %}]};
var posts = {"items":[{% for post in site.posts %}{% unless post.categories contains "release" %}{
  "title": {{post.title | jsonify}},
  "slug": {{ post.title | slugify | jsonify }},
  "url": {{ post.url | prepend: site.baseurl | prepend: site.url | jsonify }},
  "date": {
    "year": {{ post.date | date: '%Y' }},
    "month": {{ post.date | date: '%m' }} - 1,
    "day": {{ post.date | date: '%d' }},
  },
  "categories": {{ post.categories | jsonify }},
  "tags": {{ post.tags | jsonify }},
  "author": {{ post.author | jsonify }},
  "content": {{ post.content | jsonify }}
}{% unless forloop.last %},{% endunless %}{% endunless %}{% endfor %}]}</script>
<!--script src="/assets/js/libs/angular.min.js"></script-->
<script src="/assets/js/libs/angular.js"></script>
<script src="/assets/js/libs/angular-animate.min.js"></script>
<script src="/assets/js/news/news.js" ></script>
