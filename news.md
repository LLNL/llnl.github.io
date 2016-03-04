---
layout: default
permalink: /news/
---

{% for page in site.posts %}
<div class="row">
  <h2>
    <a href="{{ page.url }}">{{ page.title }}</a>
    <small class="pull-right">{{ page.date | date: '%B %d, %Y' }}</small>
  </h2>

  {{ page.content }}
</div>
{% endfor %}
