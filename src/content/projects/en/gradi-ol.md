---
title: "GraDiOl — Collaborative Diagram Editor"
summary: "A browser-based diagram editor for real-time teamwork: Next.js on the front end, Go + Redis on the back end."
date: 2026-07-16
tags: ["Go", "Next.js", "Redis", "PostgreSQL", "WebSocket"]
repo: "https://github.com/RenzIP/Graphic-Diagram-Online-Frontend"
featured: true
status: "aktif"
cover: "../../../assets/projects/gradi-ol.png"
---

## Background

GraDiOl (Graphic Diagram Online) is a browser diagram editor where several
people can work on the same canvas at the same time — without overwriting each
other's work. I deliberately split it into two repositories, front end and back
end, so the responsibility boundary stays obvious.

## Architecture

| Part | Technology |
| --- | --- |
| Front end | Next.js (App Router), React |
| Back end | Go 1.25, Fiber v2 (HTTP + WebSocket) |
| Database | PostgreSQL (Supabase) via GORM |
| Real-time | Redis — presence, node locks, pub/sub |
| Auth | Supabase Auth (JWT) |

Back end: [Graphic-Diagram-Online-Backend](https://github.com/RenzIP/Graphic-Diagram-Online-Backend).

## What I built

- **Canvas** with a grid, a minimap, and an edge renderer kept separate from the
  node renderer, so redrawing one connection doesn't touch the whole canvas.
- **Real-time collaboration**: a presence bar (who is in the document), a
  connection status indicator, and per-user node locking through Redis — two
  people cannot edit the same node at once.
- **Version history** for each document, plus a property panel for the selected node.
- **Diagram import** from a text DSL and from ASCII drawings.
- **Workspace management**: team, workspace, and admin pages; authentication
  including the forgot-password flow.

## The hardest part

State consistency. The front end holds canvas state, the back end holds the
authority to change it, and Redis holds the temporary locks. Drawing a box on
screen is easy; keeping the two sides in the same order — especially when a
connection drops and comes back — is not.

## Status

Active. The back end ships a deploy blueprint (`render.yaml`) and the PostgreSQL
schema, including migration and demo seed commands.
