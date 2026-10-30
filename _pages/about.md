---
layout: academic
permalink: /
title: Dibaloke Chanda
description: Graduate researcher at Marquette University exploring computational pathology, foundation models, and interpretable machine learning.
home: true
redirect_from:
  - /about/
  - /about.html
---

<section class="profile-section profile-section--intro" id="profile" aria-labelledby="profile-title">
  <div class="profile-identity">
    <div class="profile-portrait"><img src="{{ '/images/profile.jpg' | relative_url }}" alt="Dibaloke Chanda" width="250" height="250" loading="eager" fetchpriority="high"></div>
    <div class="profile-card"><h1 class="profile-name" id="profile-title">Dibaloke Chanda</h1><p>Graduate student · Computer Science</p><p class="profile-status"><span class="status-dot"></span> Marquette University</p><p class="profile-location">{% include academic/icon.html name="location" %} Milwaukee, Wisconsin</p><nav class="profile-socials" aria-label="Profile links"><a href="{{ site.author.googlescholar }}">{% include academic/icon.html name="google-scholar" %} Google Scholar</a><a href="https://github.com/{{ site.author.github }}">{% include academic/icon.html name="github" %} GitHub</a>{% if site.author.linkedin %}<a href="https://www.linkedin.com/in/{{ site.author.linkedin }}/">{% include academic/icon.html name="linkedin" %} LinkedIn</a>{% endif %}<a href="mailto:{{ site.author.email }}">{% include academic/icon.html name="mail" %} Email</a>{% if site.author.orcid %}<a href="{{ site.author.orcid }}">{% include academic/icon.html name="orcid" %} ORCID</a>{% endif %}</nav></div>
  </div>
  <div class="profile-copy"><p class="eyebrow">A little about me</p><p>I’m a graduate student in the Computer Science department at <a href="https://www.marquette.edu/">Marquette University</a>, working at the intersection of machine learning, computational pathology, and model interpretability.</p><p>My interests include foundation models, unsupervised pre-training, generative AI, large language models, and adversarial attacks. I’m drawn to the question of what models learn—and how we can make sense of it.</p><p>Previously, I was a lecturer in the Electrical, Electronic, and Communication Engineering department at <a href="https://mist.ac.bd/">MIST</a>. Teaching continues to shape how I approach research: work through the details, connect the ideas, and share what I learn.</p><div class="profile-facts"><div><p class="card-label">Current chapter</p><h2>Graduate studies</h2><p>Marquette University</p></div><div><p class="card-label">Research focus</p><h2>Vision &amp; interpretable AI</h2><p>Foundation models · Computational pathology</p></div></div><a class="text-link" href="{{ '/experience/' | relative_url }}">Follow my experience {% include academic/icon.html name="arrow-right" %}</a></div>
</section>

<section class="research-intro" aria-label="Research overview">
  <p>I study multimodal and agentic AI in computational pathology. My research explores how we can <span>make these systems interpretable, analyze uncertainty in their predictions, understand their vulnerabilities, and learn from complex data.</span></p>
  <div class="tag-list"><span class="tag">Computational pathology</span><span class="tag">Explainable AI</span><span class="tag">Graph learning</span></div>
</section>



<section class="home-section selected-section" aria-labelledby="selected-title">
  <div class="section-heading"><div><h2 id="selected-title">Selected Publications</h2></div><a class="button button-secondary button-small" href="{{ '/publication/' | relative_url }}">All {{ site.data.publications | size }} publications {% include academic/icon.html name="arrow-right" %}</a></div>
  <div class="work-grid">{% assign selected_papers = site.data.publications | where: "selected", true %}{% for paper in selected_papers %}{% assign illustration = 'vision' %}{% if paper.topic == 'pathology' %}{% assign illustration = 'pathology' %}{% elsif paper.topic == 'graphs' %}{% assign illustration = 'graph-learning' %}{% endif %}{% if paper.id == 'explainability-graph-attack' %}{% assign illustration = 'explainability' %}{% endif %}
    {% assign default_image = '/assets/images/research/' | append: illustration | append: '.svg' %}{% assign paper_image = paper.image | default: default_image %}
    {% assign fallback_url = '/publication/' | relative_url | append: '#' | append: paper.id %}{% assign paper_url = paper.links.first.url | default: fallback_url %}
    <article class="work-card"><a class="work-image{% if paper.image %} work-image--figure{% endif %}" href="{{ paper_url }}" data-work-open data-dialog-id="paper-{{ paper.id }}" aria-haspopup="dialog" aria-label="View research details: {{ paper.title | escape }}"><img src="{{ paper_image | relative_url }}" alt="{% if paper.image %}{{ paper.image_alt | default: paper.title | escape }}{% endif %}" width="900" height="520" loading="lazy"></a><div class="work-body"><div class="work-meta"><span>{{ paper.type }}{% if paper.year %} · {{ paper.year }}{% endif %}</span><button class="work-arrow" type="button" data-work-open data-dialog-id="paper-{{ paper.id }}" aria-haspopup="dialog" aria-label="View research details: {{ paper.title | escape }}">{% include academic/icon.html name="arrow-up-right" %}</button></div><h3><a href="{{ paper_url }}" data-work-open data-dialog-id="paper-{{ paper.id }}" aria-haspopup="dialog">{{ paper.title }}</a></h3><p class="work-authors">{{ paper.authors | escape | replace: 'Dibaloke Chanda', '<strong>Dibaloke Chanda</strong>' }}</p><p class="work-venue">{{ paper.venue }}{% include academic/publication-status.html paper=paper %}</p>{% include academic/publication-links.html paper=paper %}</div></article>
    {% include academic/research-dialog.html paper=paper illustration=illustration %}
  {% endfor %}</div>
</section>

<section class="home-section selected-projects" aria-labelledby="projects-title">
  <div class="section-heading"><div><h2 id="projects-title">Selected Projects</h2></div></div>
  <div class="project-grid">
    {% for project in site.data.projects %}
    {% assign project_url = project.url | relative_url %}{% if project.url contains '://' %}{% assign project_url = project.url %}{% endif %}
    <article class="resource-card project-card">
      <a class="project-visual" href="{{ project_url }}" aria-label="Explore {{ project.title }}"><img src="{{ project.image | relative_url }}" alt="" width="{{ project.image_width }}" height="{{ project.image_height }}" loading="lazy" decoding="async"></a>
      <div class="project-content">
      <p class="card-label">{{ project.category }}</p>
      <h3><a href="{{ project_url }}">{{ project.title }} {% include academic/icon.html name="arrow-up-right" %}</a></h3>
      <p>{{ project.description }}</p>
      <div class="tag-list" aria-label="Project topics">{% for tag in project.tags %}<span class="tag">{{ tag }}</span>{% endfor %}</div>
      <a class="text-link" href="{{ project_url }}" aria-label="Explore {{ project.title }}">Explore project {% include academic/icon.html name="arrow-up-right" %}</a>
      </div>
    </article>
    {% endfor %}
  </div>
</section>

<section class="home-section notes-section" aria-labelledby="news-title">
  <div class="news-column"><div class="section-heading"><div><p class="eyebrow">Along the way</p><h2 id="news-title">News &amp; <span>milestones.</span></h2></div></div><div class="news-list">{% for item in site.data.news limit: 4 %}<article class="news-item">{% if item.date %}<time datetime="{{ item.date | date: '%Y-%m-%d' }}">{{ item.date | date: '%b %Y' }}</time>{% else %}<span class="news-when">{{ item.date_label }}</span>{% endif %}<p>{% if item.url %}<a href="{{ item.url }}">{{ item.title }} {% include academic/icon.html name="arrow-up-right" %}</a>{% else %}{{ item.title }}{% endif %}{% if item.description %}<span class="news-description">{{ item.description }}</span>{% endif %}</p></article>{% endfor %}</div><details class="older-news"><summary>Earlier milestones <span aria-hidden="true">+</span></summary>{% for item in site.data.news offset: 4 %}<article class="news-item">{% if item.date %}<time datetime="{{ item.date | date: '%Y-%m-%d' }}">{{ item.date | date: '%b %Y' }}</time>{% else %}<span class="news-when">{{ item.date_label }}</span>{% endif %}<p>{% if item.url %}<a href="{{ item.url }}">{{ item.title }}</a>{% else %}{{ item.title }}{% endif %}{% if item.description %}<span class="news-description">{{ item.description }}</span>{% endif %}</p></article>{% endfor %}</details></div>
  <aside class="writing-feature"><span class="feature-icon">{% include academic/icon.html name="book" %}</span><p class="eyebrow">Learning in public</p><h2>Ideas worth<br><span>sharing.</span></h2><p>I write about deep learning, mathematics, and the things I learn along the way. My notes connect the intuition with the details.</p><a class="button button-primary" href="{{ '/writing/' | relative_url }}">Explore my writing {% include academic/icon.html name="arrow-right" %}</a><div class="writing-topics"><span>Deep learning</span><span>Linear algebra</span><span>Machine learning</span></div></aside>
</section>
