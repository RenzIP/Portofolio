---
title: "E-Commerce — Toko Online Laravel"
summary: "Aplikasi toko online dengan Laravel dan Livewire: autentikasi, katalog produk, keranjang, dan alur checkout."
date: 2026-07-01
tags: ["Laravel", "PHP", "Livewire", "MySQL"]
repo: "https://github.com/RenzIP/e-commerce"
featured: true
status: "selesai"
cover: "../../assets/projects/e-commerce.png"
---

## Latar belakang

Saya ingin menguasai satu framework backend yang benar-benar dipakai di industri
di Indonesia, bukan hanya framework yang sedang ramai di internet. Laravel
adalah jawabannya.

## Yang dikerjakan

- **Autentikasi** dengan alur daftar, masuk, keluar, dan reset password.
- **Katalog produk** dengan halaman detail.
- **Keranjang dan checkout** — alur dari memilih produk sampai pesanan tercatat.
- **Komponen interaktif dengan Livewire**, sehingga filter dan aksi keranjang
  berjalan tanpa menulis JavaScript sendiri.

## Keputusan teknis

Livewire dipilih supaya state keranjang dan filter tetap di server. Untuk
aplikasi yang datanya harus konsisten, ini jauh lebih sederhana daripada
mengelola state yang sama dua kali di browser dan di backend.

## Catatan

Salah satu hal yang paling banyak menyita waktu bukan fitur, tapi rute
autentikasi — memindahkan aksi logout dari route biasa ke aksi Livewire supaya
sesi benar-benar terhapus. Bug kecil, efeknya besar.
