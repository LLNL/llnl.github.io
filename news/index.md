---
title: News
layout: news
permalink: /news/
---


  <div class="filterBtnGroup btn-group" role="group">
    <button class="btn btn-default" id="allB">All</button>
    <button class="btn btn-default" id="event">Events</button>
    <button class="btn btn-default" id="event-report">Event Reports</button>
    <button class="btn btn-default" id="multimedia">Multimedia</button>
    <button class="btn btn-default" id="new-repo">New Repos</button>
    <button class="btn btn-default" id="profile">Profiles</button>
    <button class="btn btn-default" id="release">Releases</button>
    <button class="btn btn-default" id="story">Stories</button>
    <button class="btn btn-default" id="this-website">Meta</button>
  </div>

  {% assign cap = 20 %} {% comment %} maximum number of each type to store {% endcomment %}
  {% capture shh %}
    {% increment event %}
    {% increment eventReport %}
    {% increment multimedia %}
    {% increment newRepo %}
    {% increment profile %}
    {% increment release %}
    {% increment story %}
    {% increment meta %}
  {% endcapture %}
  {% for page in site.posts %}
    {% if page.categories contains "event" and event <= cap %}
      {% capture quiet %}
        {% increment event %}
      {% endcapture %}
    {% elsif page.categories contains "event-report" and eventReport <= cap %}
      {% capture quiet %}
        {% increment eventReport %}
      {% endcapture %}
    {% elsif page.categories contains "multimedia" and multimedia <= cap %}
      {% capture quiet %}
        {% increment multimedia %}
      {% endcapture %}
    {% elsif page.categories contains "new-repo" and newRepo <= cap %}
      {% capture quiet %}
        {% increment newRepo %}
      {% endcapture %}
    {% elsif page.categories contains "profile" and profile <= cap %}
      {% capture quiet %}
        {% increment profile %}
      {% endcapture %}
    {% elsif page.categories contains "release" and release <= cap %}
      {% capture quiet %}
        {% increment release %}
      {% endcapture %}
    {% elsif page.categories contains "story" and story <= cap %}
      {% capture quiet %}
        {% increment story %}
      {% endcapture %}
    {% elsif page.categories contains "this-website" and meta <= cap %}
      {% capture quiet %}
        {% increment meta %}
      {% endcapture %}
    {% else %}
      {% continue %}
    {% endif %}
  <article class="news all post{% increment index %} {% if index <= cap %}allB {% endif %}{{page.categories | join: " " }}">
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
