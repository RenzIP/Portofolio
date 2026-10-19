---
title: "Personal Portfolio"
summary: "The site you are reading — framed as a git repository. Astro + Tailwind v4, static HTML output."
date: 2026-10-14
tags: ["Astro", "Tailwind", "TypeScript"]
repo: "https://github.com/RenzIP/portofolio"
featured: false
status: "aktif"
cover: "../../../assets/projects/portofolio.png"
---

## Purpose

One place to show my projects, my skills, and how to reach me — without it
feeling like a CV template.

## Concept

The portfolio is framed as a repository: the sidebar is a file tree, every page
is a file name (`README.md`, `log.md`, `branches.md`, `CONTACT.md`), project
history is rendered as `git log --graph`, and the 404 page is the output of a
failed `git checkout`.

## Technical decisions

- **Astro** for static output: fast to load and search-engine friendly.
- **Content Collections** — adding a project means adding one Markdown file.
- **No client-side JS framework.** The only JavaScript is the router for view
  transitions plus a few small interactions (command palette, copy hash).
- **OG images generated at build time** for every page and every project, so
  links shared to WhatsApp/LinkedIn still look right.
- **Project images** processed by `astro:assets` into WebP with three `srcset` sizes.
- **`prefers-reduced-motion` respected** in every animation.
- **Four languages** (Indonesian, English, Japanese, Chinese) with real URLs —
  `/en/...`, `/ja/...`, `/zh/...` — plus `hreflang` alternates for search engines.

## Build numbers

| Metric | Value |
| --- | --- |
| Pages | 49 |
| Build time | ~1.5 s |
| Home HTML (gzip) | ~13 KB |
| CSS (gzip) | ~13 KB |
| Client JavaScript (gzip) | ~6 KB |

## Note

The site is deliberately built without heavy JavaScript. Pages stay light and
open quickly even on a slow connection.
