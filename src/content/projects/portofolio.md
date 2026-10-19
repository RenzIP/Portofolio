---
title: "Portofolio Pribadi"
summary: "Situs yang sedang Anda baca — dibingkai sebagai git repository. Astro + Tailwind v4, output HTML statis."
date: 2026-10-14
tags: ["Astro", "Tailwind", "TypeScript"]
repo: "https://github.com/RenzIP/portofolio"
featured: false
status: "aktif"
cover: "../../assets/projects/portofolio.png"
---

## Tujuan

Satu tempat untuk menampilkan proyek, keahlian, dan cara menghubungi saya —
tanpa terasa seperti template CV.

## Konsep

Portofolio ini dibingkai sebagai repository: sidebar berisi file tree, tiap
halaman adalah nama file (`README.md`, `log.md`, `branches.md`, `CONTACT.md`),
riwayat proyek ditampilkan sebagai `git log --graph`, dan 404 adalah output
`git checkout` yang gagal.

## Keputusan teknis

- **Astro** untuk output statis: cepat dimuat dan ramah SEO.
- **Content Collections** — menambah proyek cukup dengan satu file Markdown.
- **Tanpa framework JS di klien.** Satu-satunya JavaScript adalah router untuk
  view transition dan beberapa interaksi kecil (palet perintah, salin hash).
- **OG image digenerate saat build** untuk tiap halaman dan tiap proyek, supaya
  tautan yang dibagikan ke WhatsApp/LinkedIn tetap tampil rapi.
- **Gambar proyek** diproses `astro:assets` menjadi WebP dengan `srcset` tiga ukuran.
- **`prefers-reduced-motion` dihormati** di semua animasi.
- **4 bahasa** (Indonesia, Inggris, Jepang, Cina) dengan URL sungguhan —
  `/en/...`, `/ja/...`, `/zh/...` — plus tautan `hreflang` untuk mesin pencari.

## Angka build

| Metrik | Nilai |
| --- | --- |
| Halaman | 49 |
| Waktu build | ~1,4 detik |
| HTML beranda (gzip) | ~13 KB |
| CSS (gzip) | ~13 KB |
| JavaScript di klien (gzip) | ~6 KB |

## Catatan

Situs ini sengaja dibuat tanpa JavaScript berat. Halaman tetap ringan dan bisa
dibuka cepat bahkan di koneksi lambat.
