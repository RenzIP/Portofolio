---
title: "Silog — Sistem Logistik"
summary: "Aplikasi manajemen gudang dan pengiriman dengan model data berorientasi objek di Flutter/Dart."
date: 2026-09-20
tags: ["Flutter", "Dart", "OOP"]
repo: "https://github.com/RenzIP/silog-714240042"
featured: true
status: "aktif"
cover: "../../assets/projects/silog.png"
---

## Latar belakang

Proyek praktikum yang mensimulasikan alur logistik: penerimaan barang di gudang,
pengelolaan stok, hingga pembuatan pengiriman ke kota tujuan.

## Yang dikerjakan

- Model domain `Barang`, `Gudang`, `Pengiriman`, dan `Pelanggan`.
- **Enkapsulasi**: stok hanya bisa diubah lewat method tervalidasi
  (`terimaBarang`, `keluarkanBarang`), bukan diakses langsung.
- **Imutabilitas**: atribut identitas seperti `kode` dan `resi` dijadikan `final`.
- Validasi transisi status pengiriman agar tidak bisa mundur.

## Hasil

Struktur kelas yang aman dari perubahan data yang tidak sah, dengan pesan error
yang jelas ketika aturan bisnis dilanggar.
