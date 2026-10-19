---
title: "GraDiOl — Editor Diagram Kolaboratif"
summary: "Editor diagram berbasis web untuk kerja bareng secara real-time: Next.js di depan, Go + Redis di belakang."
date: 2026-07-16
tags: ["Go", "Next.js", "Redis", "PostgreSQL", "WebSocket"]
repo: "https://github.com/RenzIP/Graphic-Diagram-Online-Frontend"
featured: true
status: "aktif"
cover: "../../assets/projects/gradi-ol.png"
---

## Latar belakang

GraDiOl (Graphic Diagram Online) adalah editor diagram di browser tempat beberapa
orang bisa menggarap kanvas yang sama secara bersamaan — tanpa saling menimpa
pekerjaan. Proyek ini sengaja saya kerjakan dua repo terpisah: frontend dan
backend, supaya batas tanggung jawabnya jelas.

## Arsitektur

| Bagian | Teknologi |
| --- | --- |
| Frontend | Next.js (App Router), React |
| Backend | Go 1.25, Fiber v2 (HTTP + WebSocket) |
| Database | PostgreSQL (Supabase) lewat GORM |
| Realtime | Redis — presence, penguncian node, pub/sub |
| Auth | Supabase Auth (JWT) |

Backend: [Graphic-Diagram-Online-Backend](https://github.com/RenzIP/Graphic-Diagram-Online-Backend).

## Yang dikerjakan

- **Kanvas** dengan grid, minimap, dan render edge terpisah dari node, supaya
  menggambar ulang satu koneksi tidak menyentuh seluruh kanvas.
- **Kolaborasi real-time**: presence bar (siapa sedang di dokumen), indikator
  status koneksi, dan penguncian node per pengguna lewat Redis — dua orang tidak
  bisa mengedit node yang sama di saat bersamaan.
- **Riwayat versi** dokumen, dengan panel properti untuk mengatur node terpilih.
- **Import diagram** dari DSL teks maupun dari gambar ASCII.
- **Manajemen workspace**: halaman team, workspace, dan admin; autentikasi
  termasuk alur lupa password.

## Bagian yang paling menantang

Konsistensi state. Frontend memegang state kanvas, backend memegang otoritas
perubahan, dan Redis menyimpan kunci sementara. Yang susah bukan menggambar
kotak di layar, tapi memastikan urutan operasi tetap sama di dua tempat —
terutama saat koneksi putus lalu tersambung lagi.

## Status

Aktif. Backend punya blueprint deploy (`render.yaml`) dan skema PostgreSQL
di repo, termasuk perintah migrasi dan seed data demo.
