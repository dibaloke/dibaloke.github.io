#!/usr/bin/env python3
"""Check a generated Jekyll site for broken internal links and asset references."""

from html.parser import HTMLParser
from pathlib import Path
import argparse
import re
import sys
from urllib.parse import unquote, urljoin, urlsplit


class References(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.links = []
        self.ids = set()
        self.navigation = []
        self.in_navigation = False

    def handle_starttag(self, tag, attrs):
        values = dict(attrs)
        if tag == "nav" and values.get("id") in ("site-navigation", "site-nav"):
            self.in_navigation = True
        if tag == "a" and self.in_navigation and "href" in values:
            self.navigation.append(values["href"])
        if values.get("id"):
            self.ids.add(values["id"])
        if tag == "a" and values.get("name"):
            self.ids.add(values["name"])
        for attribute in ("href", "src", "poster"):
            if values.get(attribute):
                self.links.append(values[attribute])
        if tag == "object" and values.get("data"):
            self.links.append(values["data"])

    def handle_endtag(self, tag):
        if tag == "nav":
            self.in_navigation = False


def main():
    args = argparse.ArgumentParser(description=__doc__)
    args.add_argument("directory", nargs="?", default="_site")
    args.add_argument("--site-url", default="https://dibaloke.github.io")
    options = args.parse_args()
    root = Path(options.directory).resolve()
    if not root.is_dir():
        sys.exit(f"Missing build directory: {root}. Run jekyll build first.")

    pages = {}
    for path in sorted(root.rglob("*.html")):
        parser = References()
        parser.feed(path.read_text(encoding="utf-8"))
        pages[path] = parser

    errors = set()
    for route in ("index.html", "publication/index.html", "experience/index.html",
                  "others/index.html", "cv/index.html",
                  "writing/index.html", "fm-bench/index.html"):
        if not (root / route).is_file():
            errors.add(f"Missing main page: {route}")

    home = pages.get(root / "index.html")
    if home:
        if not home.navigation:
            errors.add("Homepage is missing main navigation")
        for route in ("publication/index.html", "experience/index.html",
                      "others/index.html", "cv/index.html", "writing/index.html",
                      "sitemap/index.html", "fm-bench/index.html", "404.html"):
            page = pages.get(root / route)
            if page and page.navigation != home.navigation:
                errors.add(f"{route}: main navigation differs from homepage")

    site = urlsplit(options.site_url)
    count = 0
    references = {page: parser.links for page, parser in pages.items()}
    for path in sorted(root.rglob("*.css")):
        references[path] = [match[1].strip() for match in re.findall(
            r"url\(\s*(['\"]?)(.*?)\1\s*\)", path.read_text(encoding="utf-8")
        )]
    for page, links in references.items():
        relative = page.relative_to(root).as_posix()
        public_path = "/" + relative
        if public_path.endswith("index.html"):
            public_path = public_path[:-len("index.html")]
        for link in links:
            url = urlsplit(urljoin(options.site_url + public_path, link))
            if url.scheme not in ("http", "https") or url.netloc != site.netloc:
                continue
            count += 1
            destination = (root / unquote(url.path).lstrip("/")).resolve()
            if not destination.is_relative_to(root):
                errors.add(f"{relative}: link escapes site directory: {link}")
                continue
            if destination.is_dir():
                destination /= "index.html"
            if not destination.is_file():
                errors.add(f"{relative}: missing target: {link}")
            elif url.fragment and destination in pages:
                fragment = unquote(url.fragment)
                if fragment not in pages[destination].ids:
                    errors.add(f"{relative}: missing anchor: {link}")

    if errors:
        print("Site validation failed:", file=sys.stderr)
        for error in sorted(errors):
            print(f"  {error}", file=sys.stderr)
        return 1
    print(f"Checked {len(pages)} HTML pages and {count} internal references; no broken targets.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
