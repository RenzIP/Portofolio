---
title: "PEMIRA ULBI — Student E-Voting Site"
summary: "ULBI's student election site: candidate data, voter verification by OTP, voting booths, and public results."
date: 2026-01-11
tags: ["Laravel", "PHP", "Blade"]
repo: "https://github.com/Pemira-Website/Website-PEMIRA-ULBI"
featured: false
status: "arsip"
---

## What it is

The PEMIRA ULBI website is used for the student election: it lists candidates,
verifies voters, records votes, and publishes results. I built the web side
with Laravel.

## What's in it

- Voter login with OTP and an expiry window.
- A voting booth per election type (student president and student association),
  including an empty-box option.
- Results can be published or held back through configuration.
- Audit logs for admin activity, vote status, and candidate withdrawal.
- Role-based access control for admins.

## Status

The demo is no longer live. The repository is kept as an archive.
