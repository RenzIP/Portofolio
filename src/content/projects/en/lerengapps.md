---
title: "LerengApps — Hiking Track Recorder"
summary: "An Android app for recording a group hike, computing elevation contours from local data, and syncing recordings to MongoDB."
date: 2026-11-10
tags: ["Java", "Android", "SQLite", "BLE", "MongoDB"]
repo: "https://github.com/RenzIP/LerengApps"
featured: true
status: "arsip"
---

## What it is

Lereng Offline is an Android app for recording a single group hike and showing
its elevation profile. Tracks, BLE events, and elevation datasets stay in a
private SQLite database on the device — there is no third-party elevation API.

## What's in it

- GPS/GNSS track recording with elevation, plus CSV and GPX import.
- A contour and elevation card: 2D contour map, oblique 3D relief, and a
  contour profile along the track.
- Contour intervals of 5 m, 10 m, 20 m, automatic, or a custom 1–200 m.
- Grid and IDW interpolation run asynchronously so large imports don't freeze
  the UI.
- Recordings can be sent to MongoDB through an HTTPS endpoint you provide.

## Status

An Android app with no web demo. The repository is on GitHub.
