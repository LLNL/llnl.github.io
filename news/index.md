---
title: News
layout: news
permalink: /news/
---


  {% for page in site.posts limit:20 %}
  <article class="news">
    <h3>
      {{ page.title }}
      <small class="pull-right">{{ page.date | date: '%B %d, %Y' }} {% for tag in page.tags %} ({{ tag }}) {% endfor %}</small>
    </h3>

    {{ page.content }}

  </article>
  {% endfor %}
  
   <br />
                <a class="btn btn-primary btn-block news" href="/news/archive/" role="button">See all news in the archive</a>
 

