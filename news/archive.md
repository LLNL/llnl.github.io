---
title: News Archive
layout: news
permalink: /news/archive/
---
{% assign postsByYear = site.posts | group_by_exp:"page", "page.date | date: '%Y'" %}

<div class="filterBtnGroup btn-group" role="group" style="margin-bottom: 30px;">
    <button class="btn btn-default" id="news">All</button>
    <button class="btn btn-default" id="event">Events</button>
    <button class="btn btn-default" id="event-report">Event Reports</button>
    <button class="btn btn-default" id="new-repo">New Repos</button>
    <button class="btn btn-default" id="profile">Profiles</button>
    <button class="btn btn-default" id="release">Releases</button>
    <button class="btn btn-default" id="story">Stories</button>
    <button class="btn btn-default" id="this-website">Meta</button>
</div>

<div>
   {% for year in postsByYear %}
        <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#{{year.name}}" aria-expanded="true" aria-controls="{{year.name}}"> {{year.name}} <i class= "fa fa-caret-down"></i></button>

        <div>
            <div class="collapse in" id="{{year.name}}" >
                {% for post in year.items %}
                    <article class="news  {{post.categories | join: " " }}">
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
