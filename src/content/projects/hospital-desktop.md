---
title: "Hospital Management — Aplikasi Desktop"
summary: "Aplikasi C# WinForms untuk operasional rumah sakit: login berbasis peran, data pasien, staf, unit, laboratorium, dan ekspor Excel."
date: 2026-02-09
tags: ["C#", "WinForms", ".NET", "SQL"]
repo: "https://github.com/RenzIP/Hospital-Management-Desktop"
featured: true
status: "selesai"
cover: "../../assets/projects/hospital-desktop.png"
---

## Latar belakang

Proyek mata kuliah Pemrograman Berorientasi Objek: membangun aplikasi desktop
yang dipakai lebih dari satu jenis pengguna, dengan hak akses berbeda. Ini
proyek pertama saya yang benar-benar memaksa saya memisahkan lapisan.

## Yang dikerjakan

- **Login berbasis peran** (admin, staf, dan peran lain sesuai `RoleHelper`),
  dengan pembatasan menu mengikuti peran yang masuk.
- **Model domain** terpisah untuk `Patient`, `Staff`, `Unit`, `Laboratory`, dan `User`.
- **Pengelolaan data** pasien, staf, unit, dan laboratorium lewat form tambah/ubah.
- **Pencatatan modal dan inventaris** unit.
- **Ekspor laporan ke Excel** dari dalam aplikasi (`ExcelHelper`).

## Struktur

```
Controllers/   LoginController
Models/        Patient, Staff, Unit, Laboratory, User
Views/         form per entitas (WinForms Designer + code-behind)
Helpers/       DatabaseHelper, ExcelHelper, RoleHelper
```

Pemisahan `Controllers` / `Models` / `Views` / `Helpers` bukan sekadar gaya —
waktu itu satu-satunya cara saya bisa menambah entitas baru tanpa menyalin
kode query ke setiap form.

## Catatan jujur

Proyek ini ditulis di .NET Framework dengan WinForms, jadi tampilannya mengikuti
kontrol bawaan Windows. Fokusnya ada di logika peran dan pengelolaan data,
bukan di UI.
