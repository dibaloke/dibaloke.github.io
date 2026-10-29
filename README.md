# Dibaloke Chanda · Academic website

A personal academic website for research, publications, teaching, and technical writing. Built with Jekyll and hosted on GitHub Pages. The design uses a shared responsive layout, locally served assets, and a small vanilla JavaScript file.

## Preview locally

Install Ruby 3.3, Bundler, and your platform's C/C++ build tools, then run:

```sh
bundle install
bundle exec jekyll serve --livereload
```

Open <http://localhost:4000>. Restart Jekyll after editing `_config.yml`.

Node.js is not needed for the redesigned site. The existing `package.json` and legacy theme assets are retained for compatibility with the original Academic Pages theme.

## Edit content

| File | Content |
| --- | --- |
| `_config.yml` | Site identity, description, author links, and URL |
| `_data/navigation.yml` | Main navigation |
| `_data/publications.yml` | Publication titles, authors, venues, and resource links |
| `_data/research.yml` | Research interests |
| `_data/news.yml` | Dated research updates |
| `_data/writing.yml` | Technical writing and learning resources |
| `_pages/` | Page introductions, experience, CV, and other academic content |
| `images/profile.jpg` | Original profile portrait |
| `files/Dibaloke_Chanda_CV.pdf` | Downloadable CV |

The shared design lives in `_layouts/academic.html` and the academic assets under `assets/`. Content dates and biographical details reflect the information supplied in the original repository; update them as your work develops.

## Validate before publishing

```sh
JEKYLL_ENV=production bundle exec jekyll build --strict_front_matter --trace
python3 scripts/check_site.py
```

The GitHub Actions validation workflow runs these checks on pull requests and pushes to `main` or `master`. It builds the site and checks generated internal links and local asset references. It does not deploy the website. GitHub Pages publishing remains controlled by the repository's Pages settings.

## Credits

The repository originated from [Academic Pages](https://academicpages.github.io/), based on [Minimal Mistakes](https://mmistakes.github.io/minimal-mistakes/). Original theme licensing is retained in `LICENSE`.

The redesign follows the supplied reference screenshots: a portrait-led introduction, bold DM Sans typography, cobalt accents, pale gradients, visual research cards, compact publication rows, and an expanded research dialog. DM Sans is self-hosted; its SIL Open Font License is included in `assets/fonts/dm-sans/`. The original portrait and CV are preserved.

Research dialogs (`assets/js/research-dialogs.js`) use native browser focus handling and preserve direct paper links when JavaScript is unavailable. The SVGs in `assets/images/research/` are conceptual illustrations, not paper figures or reported results.

Template posts, sample collections, and unused demo pages are excluded in `_config.yml`, with their source retained. The publication archive now reads from `_data/publications.yml`; the former `/publications/` URL redirects to `/publication/`.
