---
title: "Silog — Sistem Logistik"
summary: "Aplikasi manajemen gudang dan pengiriman dengan model data berorientasi objek di Flutter/Dart."
date: 2026-09-16
tags: ["Flutter", "Dart", "OOP"]
repo: "https://github.com/RenzIP/silog-714240042"
featured: true
status: "aktif"
cover: "../../assets/projects/silog.png"
---

## Latar belakang

Proyek praktikum yang mensimulasikan alur logistik: penerimaan barang di gudang,
pengelolaan stok, hingga pembuatan pengiriman ke kota tujuan. Dikerjakan bertahap
per modul, jadi yang menarik justru menjaga modelnya tetap waras saat fitur
bertambah.

## Yang dikerjakan

- Model domain `Barang`, `Gudang`, `Pengiriman`, dan `Pelanggan`.
- **Enkapsulasi**: stok hanya bisa diubah lewat method tervalidasi
  (`terimaBarang`, `keluarkanBarang`), bukan diakses langsung.
- **Imutabilitas**: atribut identitas seperti `kode` dan `resi` dijadikan `final`.
- Validasi transisi status pengiriman agar tidak bisa mundur.
- Antarmuka Flutter untuk menampilkan stok dan membuat pengiriman.

## Hasil

Struktur kelas yang aman dari perubahan data yang tidak sah, dengan pesan error
yang jelas ketika aturan bisnis dilanggar.

## Catatan

Ini proyek yang mengubah cara saya menulis kode: kalau sebuah aturan bisnis bisa
dilanggar dari luar kelas, itu bukan bug di UI — itu bug di model.
