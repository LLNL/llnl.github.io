---
title: News Archive
layout: news
permalink: /news/archive/
---
{% assign postsByYear = site.posts | group_by_exp:"page", "page.date | date: '%Y'" %}

<div class="filterBtnGroup btn-group" role="group" style="margin-bottom: 30px;">
    <button type="button" class="btn" id="allB">All</button>
    <button type="button" class="btn" id="event">Events</button>
    <button type="button" class="btn" id="event-report">Event Reports</button>
    <button type="button" class="btn" id="multimedia">Multimedia</button>
    <button type="button" class="btn" id="new-repo">New Repos</button>
    <button type="button" class="btn" id="profile">Profiles</button>
    <button type="button" class="btn" id="release">Releases</button>
    <button type="button" class="btn" id="story">Stories</button>
    <button type="button" class="btn" id="this-website">Meta</button>
  </div>

<div>
   {% for year in postsByYear limit:3 %}
        <button type="button" class="btn" data-toggle="collapse" data-target="#{{year.name}}" aria-expanded="true" aria-controls="{{year.name}}"> {{year.name}} <i class= "fa fa-caret-down"></i></button>

        <div>
            <div class="collapse in" id="{{year.name}}" >
                {% for post in year.items %}
                    <article class="news allB all {{post.categories | join: " " }}">
                        <h3>
                            {{post.title}}
                        </h3>
                        <h4>
                            <small>{{ post.date | date: '%B %d, %Y' }} {% for categories in post.categories %} ({{ categories }}) {% endfor %}</small>
                        </h4>

                        {{ post.content }}
                        
                    </article>
                {% endfor %}
            </div>
        </div>
    {% endfor %}
</div>
