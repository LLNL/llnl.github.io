---
title: News
layout: news
permalink: /news/
---


  <div class="filterBtnGroup btn-group" role="group">
    <button class="btn btn-default" id="news">All</button>
    <button class="btn btn-default" id="event">Events</button>
    <button class="btn btn-default" id="event-report">Event Reports</button>
    <button class="btn btn-default" id="new-repo">New Repos</button>
    <button class="btn btn-default" id="profile">Profiles</button>
    <button class="btn btn-default" id="release">Releases</button>
    <button class="btn btn-default" id="story">Stories</button>
    <button class="btn btn-default" id="this-website">Meta</button>
  </div>

  {% for page in site.posts limit:15 %}
  <article class="news {{page.categories | join: " " }}">
    <h3>
      {{ page.title }}
    </h3>
    <h4>
      <small>{{ page.date | date: '%B %d, %Y' }} {% for categories in page.categories %} ({{ categories }}) {% endfor %}</small>
    </h4>

    {{ page.content }}

  </article>
  {% endfor %}
  
   <br />
                <a class="btn btn-primary btn-block news" href="/news/archive/" role="button">See all news in the archive</a>


 

