---
title: News
layout: news
permalink: /news/
---


  {% for page in site.posts limit:15 %}
  <article class="news">
    <h3>
      {{ page.title }}
      <small class="pull-right">{{ page.date | date: '%B %d, %Y' }} {% for categories in page.categories %} ({{ categories }}) {% endfor %}</small>
    </h3>

    {{ page.content }}

  </article>
  {% endfor %}
  
   <br />
                <a class="btn btn-primary btn-block news" href="/news/archive/" role="button">See all news in the archive</a>
 

