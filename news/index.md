---
title: News
layout: news
permalink: /news/
---


  <div class="buttonGroup">
    <button id="news">All</button>
    <button id="event">Events</button>
    <button id="event-report">Event Reports</button>
    <button id="new-repo">New Repos</button>
    <button id="profile">Profiles</button>
    <button id="release">Releases</button>
    <button id="story">Stories</button>
    <button id="this-website">Meta</button>
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


 

