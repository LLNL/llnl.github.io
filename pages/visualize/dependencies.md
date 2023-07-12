---
title: Dependencies
layout: default
description: See how LLNL both benefits from and contributes to a flourishing open source ecosystem.
permalink: /visualize/dependencies/
---

{% raw %}

<link rel="stylesheet" type="text/css" href="../../css/graphstyle.css" />
<link rel="stylesheet" type="text/css" href="../../css/main.css" />

<h1 class="page-header text-center">
    LLNL GitHub Visualizations: Dependencies
</h1>

Livermore's work both fuels and depends on myriad open source packages. We're proud to be part of a robust development ecosystem both within and outside of the Laboratory.

<!-- Preset vis display areas -->
<center>
    <svg class="forceGraph"></svg> <svg class="connectionsTree"></svg>
    <br /><form name="Keyword Search" onsubmit="searchForm(event)"><label>Search: </label><input id="search" type="text" placeholder="Type search term here&hellip;" spellcheck="false"></form>
</center>

<!-- Load basic D3 and helper scripts -->
<script src="https://ajax.googleapis.com/ajax/libs/d3js/5.16.0/d3.min.js" charset="UTF-8"></script>
<script type="text/javascript" src="../../static/d3-tip/1.0/d3-tip.js"></script>
<script type="text/javascript" src="../../static/d3-v4-cloud/1.2.2/build/d3.layout.cloud.js"></script>
<script type="text/javascript" src="https://unpkg.com/d3-simple-slider@1.8.0/dist/d3-simple-slider.min.js"></script>
<script type="text/javascript" src="../../js/visualize/helpers.js"></script>

<!-- Load drawing JS -->
<script type="text/javascript" src="../../js/visualize/dependencies/force_dependencyGraph.js"></script>

<script>
    // GiHub Data Directory
    var ghDataDir = '../github-data';
    // Global chart standards
    var stdTotalWidth = 500,
        stdTotalHeight = 500;
    var stdMargin = { top: 40, right: 40, bottom: 40, left: 40 },
        stdWidth = stdTotalWidth - stdMargin.left - stdMargin.right,
        stdHeight = stdTotalHeight - stdMargin.top - stdMargin.bottom,
        stdMaxBuffer = 1.07;
    var stdDotRadius = 4,
        stdLgndDotRadius = 5,
        stdLgndSpacing = 20;
    // Call draw functions
    draw_force_graph('forceGraph', 'connectionsTree');
</script>

{% endraw %}
