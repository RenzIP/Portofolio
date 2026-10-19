---
title: "Marketplace Talas Sangkuriang"
summary: "Situs katalog produk untuk penjual olahan talas: halaman statis tanpa build step, fokus pada foto produk."
date: 2026-09-30
tags: ["HTML", "CSS", "JavaScript"]
repo: "https://github.com/RenzIP/marketplace-talas-sangkuriang"
featured: true
status: "selesai"
cover: "../../assets/projects/marketplace-talas.png"
---

## Latar belakang

Penjual olahan talas butuh tempat menampilkan varian produk beserta harganya,
dan yang paling penting: fotonya harus terlihat bagus. Bukan aplikasi dengan
login dan keranjang — katalog.

## Yang dikerjakan

- **Hero section** dan galeri produk untuk varian talas: original, susu, black
  forest, full, dan beberapa varian lain.
- **Halaman statis murni** — satu `index.html`, satu `style.css`, satu `script.js`.
  Tidak ada bundler, tidak ada dependensi, tidak ada langkah build.
- **Interaksi ringan di JavaScript**: navigasi katalog dan detail produk.

## Kenapa tanpa framework

Kalau kebutuhan cuma menampilkan katalog yang jarang berubah, menambah React
atau Next.js berarti menambah build step, dependensi, dan permukaan serangan
tanpa manfaat yang sepadan. Satu file HTML yang bisa dibuka dari mana saja
lebih mudah dirawat — termasuk oleh orang yang bukan programmer.

## Catatan

Berat halaman hampir seluruhnya dari gambar. Pelajaran utamanya: mengompres dan
menyeragamkan ukuran foto produk memberi dampak performa jauh lebih besar
daripada mengutak-atik CSS.
