---
layout: academic
permalink: /others/
title: "Coursework & Projects"
description: "Projects and coursework from Dibaloke Chanda’s master’s studies in data science, plus independent learning and certifications."
---
<header class="page-heading">
  <h1>Coursework &amp; Projects</h1>
  </header>

<section aria-labelledby="coursework-title">
  <div class="section-heading"><div><p class="eyebrow">Master’s in Data Science</p><h2 class="section-title" id="coursework-title">Coursework &amp; projects</h2></div></div>
  <div class="resource-grid coursework-grid">
    <article class="resource-card">
      <p class="card-label">MSSC 5650</p>
      <h3>Theory of Optimization</h3>
      <p>Intermediate and advanced topics in unconstrained optimization. This course inspired my notes on the mathematical foundations of convex optimization.</p>
      <div class="resource-links"><a class="text-link" href="https://dibalokechanda.github.io/posts/Prerequisites-for-Convex-Optimization1-blog/">Optimization notes I <span aria-hidden="true">↗</span></a><a class="text-link" href="https://dibalokechanda.github.io/posts/Prerequisites-for-Convex-Optimization2-blog/">Optimization notes II <span aria-hidden="true">↗</span></a></div>
    </article>
    <article class="resource-card">
      <p class="card-label">COSC 6330</p>
      <h3>Advanced Machine Learning</h3>
      <p>A mathematically rigorous study of machine learning, including Mercer’s theorem and reproducing kernel Hilbert spaces for understanding support vector machines. My course project was later published at MLSP 2023.</p>
      <div class="resource-links"><a class="text-link" href="https://graph-based-mtl-fault-detection.github.io/">MLSP 2023 project <span aria-hidden="true">↗</span></a></div>
    </article>
    <article class="resource-card">
      <p class="card-label">MSSC 6040</p>
      <h3>Applied Linear Algebra</h3>
      <p>A deeper understanding of linear algebra that inspired me to create a dedicated blog for my lecture notes.</p>
      <div class="resource-links"><a class="text-link" href="https://dibalokechanda.github.io/Linear-Algebra/">Linear Algebra blog <span aria-hidden="true">↗</span></a></div>
    </article>
    <article class="resource-card">
      <p class="card-label">MSSC 5790</p>
      <h3>Bayesian Statistics</h3>
      <p>An introduction to Bayesian statistics that helped me expand my reference notes with advanced probability distributions.</p>
      <div class="resource-links"><a class="text-link" href="https://dibalokechanda.github.io/posts/a-reference-guide-to-distributions-blog/">A reference guide to distributions <span aria-hidden="true">↗</span></a></div>
    </article>
    <article class="resource-card">
      <p class="card-label">COSC 6520</p>
      <h3>Data Analytics</h3>
      <p>An introduction to R programming alongside statistical machine learning topics.</p>
    </article>
    <article class="resource-card">
      <p class="card-label">MSSC 6250</p>
      <h3>Statistical Machine Learning</h3>
      <p>My final project explored “Explainability of Machine Learning Models using Co-operative Game Theory.”</p>
      <div class="resource-links"><a class="text-link" href="{{ '/files/MSSC_6250_Project_Dibaloke.pdf' | relative_url }}">Project write-up <span aria-hidden="true">↗</span></a><a class="text-link" href="https://github.com/dibalokechanda/shapley_mssc_6250">Code <span aria-hidden="true">↗</span></a></div>
    </article>
    <article class="resource-card">
      <p class="card-label">COSC 6820</p>
      <h3>Data Ethics</h3>
      <p>My final project examined “Generative AI: Ethical Challenges and Prevention Strategies with Watermarking and Traceability.”</p>
      <div class="resource-links"><a class="text-link" href="{{ '/files/Final_Paper_Data_Ethics_Dibaloke.pdf' | relative_url }}">Project write-up <span aria-hidden="true">↗</span></a></div>
    </article>
    <article class="resource-card">
      <p class="card-label">COSC 5500</p>
      <h3>Visual Analytics</h3>
      <p>I built Tableau dashboards visualizing crime data and Airbnb listings in Chicago. For my final project, I developed an R Shiny app that helps Airbnb guests explore nearby crime rates, with filters for time ranges and crime categories.</p>
      <div class="resource-links"><a class="text-link" href="https://public.tableau.com/views/DibalokeChandaVisualAnalyticsSpring2024TableauProject_3/Dashboard1?:language=en-GB&amp;:sid=&amp;:redirect=auth&amp;:display_count=n&amp;:origin=viz_share_link">Tableau dashboard <span aria-hidden="true">↗</span></a><a class="text-link" href="https://github.com/dibalokechanda/Viz_Analytics_Final_Project">R Shiny project <span aria-hidden="true">↗</span></a></div>
    </article>
    <article class="resource-card">
      <p class="card-label">COSC 5610</p>
      <h3>Data Mining</h3>
      <p>Decision trees, Naive Bayes, KNN, regression, K-means clustering, DBSCAN, hierarchical clustering, support vector machines, and association rules.</p>
    </article>
    <article class="resource-card">
      <p class="card-label">COSC 6570</p>
      <h3>Data at Scale</h3>
      <p>Relational data stores, codebooks, schema diagrams, NoSQL graph, key-value, document, and wide-column stores, and MapReduce. My final project proposed a scalable national cancer-genomic database integrating these concepts.</p>
    </article>
    <article class="resource-card">
      <p class="card-label">COSC 6510</p>
      <h3>Data Intelligence</h3>
      <p>Foundations of business and data intelligence, including decision support systems; descriptive, predictive, and prescriptive analytics; data types; and measurement scales.</p>
    </article>
    <article class="resource-card">
      <p class="card-label">COSC 6060</p>
      <h3>Distributed and Cloud Computing</h3>
      <p>Advanced distributed and cloud computing concepts: system architectures, process management, communication mechanisms, fault tolerance, security, and consistency models.</p>
    </article>
  </div>
</section>

<section class="certification-section" aria-labelledby="certifications-title">
  <div class="section-heading"><div><p class="eyebrow">Independent learning</p><h2 class="section-title" id="certifications-title">Certificates &amp; specializations</h2></div></div>
  <div class="prose"><p>My undergraduate background is in Electrical, Electronic, and Communication Engineering. Without formal undergraduate exposure to deep learning, machine learning, or data science, I began teaching myself through Coursera. These are the certifications I completed along the way.</p></div>
  <div class="certificate-grid">
    {% for certificate in site.data.certificates %}
    <article class="certificate-card">
      {% if certificate.credential_id %}
      <a class="certificate-preview" href="{{ certificate.url }}" target="_blank" rel="noopener noreferrer" aria-label="View certificate: {{ certificate.title | escape }}">
        <span class="certificate-preview-fallback">{% include academic/icon.html name="arrow-up-right" %}<span>View original certificate</span></span>
        <img src="https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~{{ certificate.credential_id }}.jpeg" alt="Coursera certificate for {{ certificate.title | escape }}" loading="lazy" decoding="async" width="1200" height="900" data-certificate-preview>
      </a>
      {% else %}
      <a class="certificate-preview certificate-preview--specialization" href="{{ certificate.url }}" target="_blank" rel="noopener noreferrer" aria-label="View certificate: {{ certificate.title | escape }}">
        <span class="eyebrow">Deep Learning</span><span class="specialization-count">5<span>courses completed</span></span><span class="text-link">View specialization certificate {% include academic/icon.html name="arrow-up-right" %}</span>
      </a>
      {% endif %}
      <div class="certificate-body">
        <p class="card-label">Coursera{% unless certificate.credential_id %} · Specialization{% endunless %}</p>
        <h3>{{ certificate.title }}</h3>
        <a class="text-link" href="{{ certificate.url }}" target="_blank" rel="noopener noreferrer" aria-label="Verify certificate: {{ certificate.title | escape }}">Verify certificate {% include academic/icon.html name="arrow-up-right" %}</a>
      </div>
    </article>
    {% endfor %}
  </div>
</section>
