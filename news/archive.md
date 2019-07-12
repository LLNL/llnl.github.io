---
title: News Archive
layout: news
permalink: /news/archive/
---

  {% for page in site.posts %}
  <article class="news">
    <h3>
      {{ page.title }}
      <small class="pull-right">{{ page.date | date: '%B %d, %Y' }}</small>
    </h3>

    {{ page.content }}
    </article>
  {% endfor %}
