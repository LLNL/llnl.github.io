---
title: News
layout: default
permalink: /news/
---


  {% for page in site.posts limit:20 %}
  <article>
    <h3>
      {{ page.title }}
      <small class="pull-right">{{ page.date | date: '%B %d, %Y' }}</small>
    </h3>

    {{ page.content }}
    </article>
  {% endfor %}

<br />
<a class="btn btn-primary btn-block" href="/news/archive/" role="button">See all news in the archive</a>
