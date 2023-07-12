---
title: LLNL Software Portal
layout: homepage
description: Explore a repository of open source software projects developed at Lawrence Livermore National Laboratory.
permalink: /
---

{% raw %}

<!-- @Doug, can you add an invisible h1: LLNL Software Portal? -->

<p class="title-para">Welcome to the LLNL software portal — a hub for open source projects developed at the Lab.<br />Our <a href="/explore/#/AllSoftware">full catalog</a> is updated as repositories are added or modified.</p>

<!-- START: CTA -->
Looking for RADIUSS projects? 
Find HPC build tools, math and physics libraries, data management and visualization tools, workflow tools, and portable programming and memory management libraries.
<a href="/radiuss/projects/" target="_blank"><br/>Browse RADIUSS Projects</a>
<!-- END: CTA -->

<section class="flex-container" id="categories">
    <div ng-repeat="category in catData" ng-if="category.title!='All Software'" class="flex-category dynamic">
        <img ng-src="{{ category.icon.path }}" style="width: 150px; height: 150px" alt="{{ category.icon.alt }}" />
        <h4><a href="../explore#{{ category.hash }}">{{ category.title }}</a></h4>
        <p class="text-center">{{ category.description.short }}</p>

        <div ng-repeat="repo in topicRepos[catData.indexOf(category)]">
            <p class="links" ng-show="topicRepos[catData.indexOf(category)].indexOf(repo) < 4">
                <span>
                    <a href="https://github.com/{{ repo.ownerLogin }}" alt="View Owner on GitHub" title="Owner: {{ repo.ownerLogin }}">
                        <img alt="organization logo" class="orgAvatar" ng-src="{{ repo.ownerAvatar }}" />
                    </a>
                </span>

                <span>
                    <a href="{{ repo.gitUrl }}" alt="{{ repo.description || '[No Description]' }}" title="{{ repo.description || '[No Description]' }}">
                        {{ repo.name }}
                    </a>
                </span>

                <span>
                    <a href="{{ repo.gitUrl }}/stargazers" alt="Stargazers" title="Stargazers">
                        {{ repo.stars }} <span class="fa fa-star"></span>
                    </a>
                </span>

                <span>
                    <a ng-click="repoHref(repo.nameWithOwner); $event.stopPropagation();" alt="Repo Info" title="Repo Info">
                        <span class="fa fa-info-circle"></span>
                    </a>
                </span>
            </p>
        </div>
        <a class="more" ng-if="topicRepos[catData.indexOf(category)].length > 4" href="../explore#{{ category.hash }}">...MORE</a>
    </div>
</section>

{% endraw %}

<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular.min.js"></script>
<script src="/js/app.js"></script>
<script src="/js/Category.service.js"></script>
<script src="/js/category-info.js"></script>
