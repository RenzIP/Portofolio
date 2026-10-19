---
title: "Talas Sangkuriang Marketplace"
summary: "A product catalogue site for a taro-based food seller: static pages, no build step, with the focus on product photos."
date: 2026-09-30
tags: ["HTML", "CSS", "JavaScript"]
repo: "https://github.com/RenzIP/marketplace-talas-sangkuriang"
featured: true
status: "selesai"
cover: "../../../assets/projects/marketplace-talas.png"
---

## Background

The seller needed somewhere to show her taro products with their prices, and the
thing that mattered most was that the photos look good. Not an application with
logins and a cart — a catalogue.

## What I built

- A **hero section** and a product gallery for the taro variants: original, milk,
  black forest, full, and several others.
- **Pure static pages** — one `index.html`, one `style.css`, one `script.js`.
  No bundler, no dependencies, no build step.
- **Light JavaScript interaction**: catalogue navigation and product detail.

## Why no framework

If the requirement is showing a catalogue that rarely changes, adding React or
Next.js means adding a build step, dependencies, and attack surface for no
proportional benefit. A single HTML file that opens anywhere is easier to
maintain — including by people who are not programmers.

## Note

Almost all of the page weight is images. The main lesson: compressing and
standardising product photo sizes does far more for performance than fiddling
with CSS.
