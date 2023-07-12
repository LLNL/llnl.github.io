---
title: Contributors
layout: default
description: Get an overview of contributors to LLNL's GitHub repos, 
permalink: /visualize/contributors/
---

{% raw %}

<link rel="stylesheet" type="text/css" href="/css/graphstyle.css" />

<h1 class="page-header text-center">
    LLNL GitHub Visualizations: Contributors
</h1>

Over 400 LLNL employees contribute to our repositories, but we also benefit from the work of external contributors. The majority of our repos have been enhanced by the work of the open source community.
<!-- Preset vis display areas -->
<center>
    <svg class="pieMembers"></svg><svg class="pieRepos"></svg>
    <br /><svg class="hierarchyPack"></svg>
</center>

<!-- Load basic D3 and helper scripts -->
<script src="https://ajax.googleapis.com/ajax/libs/d3js/5.16.0/d3.min.js" charset="UTF-8"></script>
<script type="text/javascript" src="../../static/d3-tip/1.0/d3-tip.js"></script>
<script type="text/javascript" src="../../static/d3-v4-cloud/1.2.2/build/d3.layout.cloud.js"></script>
<script type="text/javascript" src="https://unpkg.com/d3-simple-slider@1.8.0/dist/d3-simple-slider.min.js"></script>
<script type="text/javascript" src="../../js/visualize/helpers.js"></script>

<!-- Load drawing JS -->
<script type="text/javascript" src="../../js/visualize/contributors/pie_members.js"></script>
<script type="text/javascript" src="../../js/visualize/contributors/pie_repos.js"></script>
<script type="text/javascript" src="../../js/visualize/contributors/pack_hierarchy.js"></script>

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
    draw_pie_members('pieMembers');
    draw_pie_repos('pieRepos');
    draw_pack_hierarchy('hierarchyPack');
</script>

{% endraw %}
