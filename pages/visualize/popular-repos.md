---
title: Popular Repos
layout: default
description: Get details about our most popular repos, including how usage has grown over time.
permalink: /visualize/popular-repos/
---

{% raw %}

<link rel="stylesheet" type="text/css" href="../../css/graphstyle.css" />

<h1 class="page-header text-center">
    LLNL GitHub Visualizations: Popular Repos
</h1>

We contribute to a variety of code repositories, some of which fuel internal work here at the Laboratory and others that are used widely by enterprise companies, academic institutions, and other national labs.

<!-- Preset vis display areas -->
<center>
    <svg class="listPopularRepos"></svg>
    <br /> <svg class="cluster"></svg>
    <br /> <svg class="repoCreationHistory"></svg>
    <br /> <svg class="repoStarHistory"></svg>
    <br /> <svg class="repoActivityChart"></svg>
    <br /> <svg class="commitPie"></svg> <svg class="linePie"></svg>
    <br /> <svg class="popularLicenses"></svg>
</center>

<!-- Load basic D3 and helper scripts -->
<script src="https://ajax.googleapis.com/ajax/libs/d3js/5.16.0/d3.min.js" charset="UTF-8"></script>
<script type="text/javascript" src="../../static/d3-tip/1.0/d3-tip.js"></script>
<script type="text/javascript" src="../../static/d3-v4-cloud/1.2.2/build/d3.layout.cloud.js"></script>
<script type="text/javascript" src="https://unpkg.com/d3-simple-slider@1.8.0/dist/d3-simple-slider.min.js"></script>
<script type="text/javascript" src="../../js/visualize/helpers.js"></script>

<!-- Load drawing JS -->
<script type="text/javascript" src="../../js/visualize/largeRepos/cluster_repoSize.js"></script>
<script type="text/javascript" src="../../js/visualize/largeRepos/line_repoActivity.js"></script>
<script type="text/javascript" src="../../js/visualize/largeRepos/generate_popularRepos.js"></script>
<script type="text/javascript" src="../../js/visualize/largeRepos/line_repoCreationHistory.js"></script>
<script type="text/javascript" src="../../js/visualize/largeRepos/sunburst_licenses.js"></script>
<script type="text/javascript" src="../../js/visualize/largeRepos/list_popularRepos.js"></script>
<script type="text/javascript" src="../../js/visualize/largeRepos/pie_activityCommits.js"></script>
<script type="text/javascript" src="../../js/visualize/largeRepos/pie_activityLines.js"></script>
<script type="text/javascript" src="../../js/visualize/largeRepos/line_repoStarHistory.js"></script>

<script>
    // GiHub Data Directory
    var ghDataDir = '../github-data';
    // Global chart standards
    var stdTotalWidth = 500,
        stdTotalHeight = 400;
    var stdMargin = { top: 40, right: 40, bottom: 40, left: 40 },
        stdWidth = stdTotalWidth - stdMargin.left - stdMargin.right,
        stdHeight = stdTotalHeight - stdMargin.top - stdMargin.bottom,
        stdMaxBuffer = 1.07;
    var stdDotRadius = 4,
        stdLgndDotRadius = 5,
        stdLgndSpacing = 20;
    // Call draw functions
    var popularityURL = ghDataDir + '/intReposInfo.json';
    var popularityFiles = [popularityURL];
    var mostPopularRepositories = [];
    var cutOffSize = 10;
    Promise.all(popularityFiles.map(url => d3.json(url))).then(values => {
        mostPopularRepositories = generate_popularRepos(values[0], cutOffSize);
    }).then(() => {
        draw_cluster('cluster');
        draw_line_repoCreationHistory('repoCreationHistory', mostPopularRepositories);
        draw_line_repoActivity('repoActivityChart');
        draw_sunburst_licenses('popularLicenses');
        draw_pie_commits('commitPie');
        draw_pie_lines('linePie');
        draw_popularRepos('listPopularRepos', 5, true);
        draw_line_repoStarHistory('repoStarHistory');
    });
    
</script>

{% endraw %}
