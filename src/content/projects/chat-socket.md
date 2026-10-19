---
title: "Anonymous Chat — Chat Desktop Real-time"
summary: "Aplikasi chat desktop anonim lewat WebSocket: tanpa registrasi, room ber-password, kirim file, dan notifikasi."
date: 2026-02-04
tags: ["Python", "WebSocket", "CustomTkinter", "Pillow"]
repo: "https://github.com/RenzIP/Anonymous-chat-socket"
featured: true
status: "selesai"
cover: "../../assets/projects/chat-socket.png"
---

## Latar belakang

Saya ingin tahu bagaimana rasanya membangun aplikasi chat dari nol tanpa
framework realtime siap pakai — hanya WebSocket, satu server, dan satu klien
desktop. Aturan mainnya: tidak ada registrasi, pengguna cukup memilih nickname.

## Yang dikerjakan

- **Server Python** berbasis library `websockets`, mengelola banyak room sekaligus.
- **Klien desktop** dengan CustomTkinter, tema gelap.
- **Room ber-password** — room bisa dibuat publik atau dikunci.
- **Pesan pribadi** antar pengguna di room yang sama.
- **Kirim file** (gambar dan dokumen) dengan batas 5 MB, gambar diproses lewat Pillow.
- **Indikator mengetik**, balas pesan dengan referensi, pemilih emoji, dan daftar
  pengguna online.
- **Notifikasi desktop** untuk pesan baru saat jendela tidak difokuskan.

## Keputusan teknis

Semua state room hidup di memori server — tidak ada database. Untuk proyek
belajar ini justru menguntungkan: tidak ada lapisan persistensi yang menutupi
bug logika. Konsekuensinya jelas, dan saya tulis apa adanya di README: server
restart berarti room hilang.

## Yang saya pelajari

Batas ukuran file, antrean pesan saat koneksi lambat, dan penanganan klien yang
putus mendadak tanpa pamit — tiga hal yang tidak pernah muncul kalau hanya
membuat UI chat.
