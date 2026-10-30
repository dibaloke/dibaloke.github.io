---
layout: academic
permalink: /publication/
title: Publications
description: Selected journal articles, conference papers, and manuscripts by Dibaloke Chanda, spanning computational pathology, graph learning, and machine learning.
redirect_from:
  - /publications/
---
<header class="page-heading"><h1>Publications</h1><a class="text-link" href="{{ site.author.googlescholar }}">Complete list on Google Scholar {% include academic/icon.html name="arrow-up-right" %}</a></header>
<section aria-label="Publication library" data-publication-library>
  <div class="publication-toolbar"><div class="filter-group" role="group" aria-label="Filter publications"><button type="button" class="filter-button" data-filter="all" aria-pressed="true">All work</button><button type="button" class="filter-button" data-filter="journal" aria-pressed="false">Journal articles</button><button type="button" class="filter-button" data-filter="conference" aria-pressed="false">Conferences</button><button type="button" class="filter-button" data-filter="accepted" aria-pressed="false">Accepted</button><button type="button" class="filter-button" data-filter="under-review" aria-pressed="false">Under review</button></div><label class="publication-search">{% include academic/icon.html name="search" %}<span class="sr-only">Search publications</span><input type="search" placeholder="Search publications…" data-publication-search></label></div>
  <p class="result-count" data-result-count aria-live="polite">{{ site.data.publications | size }} publications</p>
  <div class="publication-list">{% for paper in site.data.publications %}{% include academic/publication.html paper=paper heading="h2" %}{% endfor %}</div>
  <p class="empty-state" data-empty-state hidden>No publications match your search. Try another title, author, or venue.</p>
</section>
