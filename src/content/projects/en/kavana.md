---
title: "Kavana — Online Academic Supervision"
summary: "The academic supervision system for ULBI's D4 Informatics Engineering programme: proposals, logbooks, reports, defence scheduling, and revisions in one flow."
date: 2025-11-14
tags: ["Next.js", "Express.js", "MySQL", "Redis", "Google Cloud"]
repo: "https://github.com/KavanaHub/kavanahub"
demo: "https://kavana.my.id"
featured: true
status: "aktif"
---

## What it is

Kavana is the online supervision system for the D4 Informatics Engineering
programme at ULBI. The process used to be scattered across chat, spreadsheets,
and personal drive files; Kavana puts it into one flow with clear status and
history.

## The flow it handles

- Track selection for Projects 1–3 and Internships 1–2, including the regular
  and RPL pathways and repeating students.
- Proposal submission, coordinator validation per track, and supervisor
  assignment.
- Supervision logbook (up to 8 approved sessions), lecturer approval, and PDF
  export of the supervision form.
- Report upload, defence scheduling with conflict checks, grading, and
  revisions.
- Five roles: student, lecturer, coordinator, head of programme, admin.

## Technical side

Next.js on the front end; Express.js on the back end running on Google Cloud
Functions/Cloud Run; MySQL as the database; Redis for cache, rate limiting,
OTP, and token revocation. Login is protected by Cloudflare Turnstile.

## Status

Live at [kavana.my.id](https://kavana.my.id).
