---
title: Visualize
layout: default
description: See how LLNL's open source programming has evolved over time with a look at activity across Lab repos.
permalink: /visualize/
---

{% raw %}

<link rel="stylesheet" type="text/css" href="/css/graphstyle.css" />

<!-- @Doug, I promoted this header to an h1; can you please confirm that I did it right? It looks like all of the Software site needs this update. -->
<h1 class="page-header text-center">
    LLNL GitHub Visualizations: Repositories
</h1>

Lawrence Livermore National Lab has contributed to open source repositories for years. See how our commits have evolved over time and how our open source contributions have grown.

<!-- Preset vis display areas -->
<center>
    <svg class="repoCreationHistory"></svg>
    <br /><svg class="repoActivityChart"></svg>
    <br /><svg class="repoStarHistoryChart"></svg>
    <br /><svg class="repoPulls"></svg><svg class="repoIssues"></svg>
    <br /><svg class="languagePie"></svg><svg class="topicCloud"></svg>
    <br /><svg class="licenseSunburst"></svg>
</center>

<!-- Load basic D3 and helper scripts -->
<script src="https://ajax.googleapis.com/ajax/libs/d3js/5.16.0/d3.min.js" charset="UTF-8"></script>
<script type="text/javascript" src="../static/d3-tip/1.0/d3-tip.js"></script>
<script type="text/javascript" src="../static/d3-v4-cloud/1.2.2/build/d3.layout.cloud.js"></script>
<script type="text/javascript" src="https://unpkg.com/d3-simple-slider@1.8.0/dist/d3-simple-slider.min.js"></script>
<script type="text/javascript" src="../js/visualize/helpers.js"></script>

<!-- Load drawing JS -->
<script type="text/javascript" src="../js/visualize/line_repoCreationHistory.js"></script>
<script type="text/javascript" src="../js/visualize/line_repoActivityExplore.js"></script>
<script type="text/javascript" src="../js/visualize/scatter_repoPulls.js"></script>
<script type="text/javascript" src="../js/visualize/scatter_repoIssues.js"></script>
<script type="text/javascript" src="../js/visualize/pie_languageExplore.js"></script>
<script type="text/javascript" src="../js/visualize/cloud_topics.js"></script>
<script type="text/javascript" src="../js/visualize/sunburst_licenses.js"></script>
<script type="text/javascript" src="../js/visualize/line_repoStarHistoryExplore.js"></script>

<script>
    // GiHub Data Directory
    var ghDataDir = './github-data';
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
    draw_line_repoCreationHistory('repoCreationHistory');
    draw_line_repoActivity('repoActivityChart');
    draw_scatter_repoPulls('repoPulls');
    draw_scatter_repoIssues('repoIssues');
    draw_pie_language('languagePie');
    draw_cloud_topics('topicCloud');
    draw_sunburst_licenses('licenseSunburst');
    draw_line_repoStarHistory('repoStarHistoryChart');
</script>

{% endraw %}
