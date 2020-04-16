---
title: Events
layout: news
permalink: /news/events/
---

<div class="grid">
  {% for page in site.posts %}
    {% if page.categories contains "event" or page.categories contains "event-report" %}
    <article class="news">
     <h3>
        {{ page.title }}
        <small class="pull-right">{{ page.date | date: '%B %d, %Y' }} {% for categories in page.categories %} ({{ categories }}) {% endfor %}</small>
      </h3>

      {{ page.content }}

      </article>
    {% endif %}
  {% endfor %}
</div>
