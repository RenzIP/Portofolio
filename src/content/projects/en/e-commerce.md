---
title: "E-Commerce — Laravel Storefront"
summary: "An online store built with Laravel and Livewire: authentication, product catalogue, cart, and checkout flow."
date: 2026-07-01
tags: ["Laravel", "PHP", "Livewire", "MySQL"]
repo: "https://github.com/RenzIP/e-commerce"
featured: true
status: "selesai"
cover: "../../../assets/projects/e-commerce.png"
---

## Background

I wanted to learn a back-end framework that is actually used by the industry
here, not just the one that is loud on the internet. Laravel was the answer.

## What I built

- **Authentication** with sign-up, sign-in, sign-out, and password reset flows.
- **Product catalogue** with detail pages.
- **Cart and checkout** — the path from picking a product to a recorded order.
- **Interactive components with Livewire**, so filters and cart actions run
  without writing JavaScript myself.

## Technical decisions

Livewire keeps cart and filter state on the server. For an application where the
data must stay consistent, that is far simpler than maintaining the same state
twice, in the browser and in the back end.

## Note

The biggest time sink was not a feature but the auth routes — moving the logout
action from a plain route to a Livewire action so the session is actually
destroyed. A small bug with a large effect.
