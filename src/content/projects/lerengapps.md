---
title: "LerengApps — Perekam Jalur Pendakian"
summary: "Aplikasi Android untuk merekam jalur pendakian bersama rombongan, menghitung kontur elevasi dari data lokal, dan mengirim rekaman ke MongoDB."
date: 2026-11-10
tags: ["Java", "Android", "SQLite", "BLE", "MongoDB"]
repo: "https://github.com/RenzIP/LerengApps"
featured: true
status: "arsip"
---

## Apa ini

Lereng Offline adalah aplikasi Android untuk merekam satu jalur pendakian
bersama rombongan dan menampilkan profil elevasinya. Track, event BLE, dan
dataset elevasi disimpan di SQLite privat di perangkat — tanpa API elevasi
pihak ketiga.

## Yang ada di dalamnya

- Perekaman jalur GPS/GNSS dengan elevasi, plus impor CSV dan GPX.
- Kartu kontur & elevasi: peta kontur 2D, relief 3D oblique, dan profil kontur
  sepanjang jalur.
- Interval kontur bisa diatur: 5 m, 10 m, 20 m, otomatis, atau 1–200 m.
- Perhitungan grid dan interpolasi IDW berjalan asinkron agar impor besar tidak
  membekukan UI.
- Rekaman bisa dikirim ke MongoDB lewat endpoint HTTPS yang disiapkan sendiri.

## Status

Aplikasi Android, tanpa demo web. Repo tersedia di GitHub.
