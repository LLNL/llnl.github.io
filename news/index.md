---
title: News
layout: news
permalink: /news/
---
{% raw %}
<div class="wrapper">

<div class="twitterFeed">
<h4 class="twitter-title "> Latest from Twitter </h4>
<a class="twitter-timeline " data-chrome="nofooter noheader" href="https://twitter.com/LLNL_OpenSource?ref_src=twsrc%5Etfw" data-tweet-limit="3"></a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 
<a href="https://twitter.com/LLNL_OpenSource?ref_src=twsrc%5Etfw" class="twitter-follow-button" data-show-count="false">Follow @LLNL_OpenSource</a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
</div>

{% endraw %}

<div class="newsMain">
  {% for page in site.posts limit:20 %}
  <article class="news">
    <h3>
      {{ page.title }}
      <small class="pull-right">{{ page.date | date: '%B %d, %Y' }}</small>
    </h3>

    {{ page.content }}

    </article>
  {% endfor %}
  
  <br />
  <a class="btn btn-primary btn-block news" href="/news/archive/" role="button">See all news in the archive</a>
  
  <div class="twitterFeed-mobile" >
      <h4 class="twitter-title"> Latest from Twitter </h4>
      <a class="twitter-timeline" data-chrome="nofooter noheader" href="https://twitter.com/LLNL_OpenSource?ref_src=twsrc%5Etfw" data-tweet-limit="2"></a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 
      <a href="https://twitter.com/LLNL_OpenSource?ref_src=twsrc%5Etfw" class="twitter-follow-button" data-show-count="false">Follow @LLNL_OpenSource</a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
  </div>
  
  
  </div>
</div>


