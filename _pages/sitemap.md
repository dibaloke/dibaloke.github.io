---
layout: academic
title: Sitemap
permalink: /sitemap/
---
<header class="page-heading"><h1>Sitemap</h1></header>
<ul class="sitemap-links">{% for item in site.data.navigation.main %}<li><a href="{{ item.url | relative_url }}">{{ item.title }} {% include academic/icon.html name="arrow-up-right" %}</a></li>{% endfor %}<li><a href="{{ '/cv/' | relative_url }}">Curriculum vitae {% include academic/icon.html name="arrow-up-right" %}</a></li><li><a href="{{ '/others/' | relative_url }}">Coursework &amp; projects {% include academic/icon.html name="arrow-up-right" %}</a></li></ul>
