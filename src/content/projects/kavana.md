---
title: "Kavana — Sistem Bimbingan Online"
summary: "Sistem bimbingan akademik D4 Teknik Informatika ULBI: proposal, logbook, laporan, jadwal sidang, dan revisi dalam satu alur."
date: 2025-11-14
tags: ["Next.js", "Express.js", "MySQL", "Redis", "Google Cloud"]
repo: "https://github.com/KavanaHub/kavanahub"
demo: "https://kavana.my.id"
featured: true
status: "aktif"
---

## Apa ini

Kavana adalah sistem bimbingan online untuk Program Studi D4 Teknik Informatika
ULBI. Sebelumnya prosesnya tersebar di chat, spreadsheet, dan file drive
pribadi; Kavana menyatukannya jadi satu alur dengan status dan riwayat yang
jelas.

## Alur yang ditangani

- Pemilihan track Proyek 1–3 dan Internship 1–2, termasuk jalur regular, RPL,
  dan mahasiswa mengulang.
- Pengajuan proposal, validasi koordinator sesuai track, dan assign pembimbing.
- Logbook bimbingan (maksimal 8 sesi disetujui), approval dosen, dan export PDF
  formulir bimbingan.
- Upload laporan sidang, penjadwalan dengan validasi bentrok, penilaian, dan
  revisi.
- Lima peran: mahasiswa, dosen, koordinator, kaprodi, admin.

## Teknis

Next.js di frontend; Express.js di backend yang berjalan di Google Cloud
Functions/Cloud Run; MySQL sebagai database; Redis untuk cache, rate limit,
OTP, dan revokasi token. Login dilindungi Cloudflare Turnstile.

## Status

Aktif di [kavana.my.id](https://kavana.my.id).
