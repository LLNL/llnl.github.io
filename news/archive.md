---
title: News Archive
layout: default
permalink: /news/archive
---

  {% for page in site.posts %}
  <article>
    <h3>
      {{ page.title }}
      <small class="pull-right">{{ page.date | date: '%B %d, %Y' }}</small>
    </h3>

    {{ page.content }}
    </article>
  {% endfor %}
