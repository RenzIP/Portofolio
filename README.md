# Portofolio — konsep "The Repo"

Website portofolio pribadi yang dibingkai sebagai **sebuah git repository**.
Setiap bagian situs adalah "file" di dalam repo: `README.md`, `projects/`,
`log.md`, `branches.md`, `CONTACT.md`.

Dibangun dengan **Astro** + **Tailwind CSS v4**, output HTML statis.

## Tech Stack

| Bagian | Teknologi |
|---|---|
| Framework | Astro 7 (static output) |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) |
| Tipografi | `@tailwindcss/typography` |
| Font | JetBrains Mono + Space Grotesk (self-hosted via `@fontsource-variable`) |
| Konten proyek | Astro Content Collections (Markdown) |
| Navigasi | View Transitions (`ClientRouter`) + Command Palette (Ctrl/⌘+K) |
| SEO | `@astrojs/sitemap` + `robots.txt` |
| Bahasa | TypeScript (strict) |

## Fitur

- **Boot screen** — animasi `git clone` singkat saat kunjungan **pertama** (sekali
  per sesi, `sessionStorage`); bisa dilewati dengan klik/tombol apa pun, dan
  otomatis dilewati bila `prefers-reduced-motion` aktif.
- **Command palette** — tekan `Ctrl+K` (atau `⌘+K`) untuk mencari halaman/proyek.
  Navigasi keyboard penuh: `↑` `↓` pilih, `↵` buka, `Esc` tutup.
- **View transitions** — perpindahan halaman gaya `git checkout` (konten lama
  geser kiri, konten baru masuk dari kanan, arah dibalik saat back).
  TopBar + sidebar persisten antar halaman (`transition:persist`).
- **Commit graph hidup** — dot HEAD berdenyut (pause saat offscreen), klik hash
  untuk menyalin (dengan fallback non-secure context), garis vertikal
  tergambar perlahan saat masuk viewport.
- **Status bar hidup** — jam lokal live (update tiap 30 detik) + label branch
  mengikuti halaman aktif.
- **Micro-interaction** — tombol CTA terasa "ditekan" (`pressable`, scale 0.97,
  120ms); hormat `prefers-reduced-motion`.
- **Easter egg terminal** — Konami code (↑↑↓↓←→←→BA) membuka overlay terminal
  `git log --graph` dengan efek ketik; nonaktif saat reduced-motion.
- **Scroll progress bar** — garis amber di atas menunjukkan posisi baca.
- **Scroll reveal** — section muncul saat masuk viewport (`IntersectionObserver`).
- **Animasi masuk** — konten muncul halus dengan stagger.
- **404 dengan efek ketik** — perintah `git checkout` yang gagal, diketik real-time.
- **Salin email sekali klik** di halaman kontak.
- **Dark/light** — mengikuti preferensi sistem.
- **OG image otomatis** — setiap halaman & proyek punya kartu preview 1200×630
  yang digenerate saat build (`astro-og-canvas`), jadi link yang di-share ke
  WhatsApp/LinkedIn/Telegram tampil bergambar.
- **Sitemap & robots.txt** — otomatis saat build.
- **Favicon** commit-graph kustom (SVG, ringan).
- **Gambar teroptimasi** — cover proyek diproses `astro:assets`: konversi WebP
  otomatis (35 KB → 2–10 KB), `srcset` responsif 3 varian, lazy loading.
- **Structured data (JSON-LD)** — `WebSite` + `Person` + `WebPage` +
  `BreadcrumbList`, dan `SoftwareSourceCode` di halaman proyek.
- **Security headers** — `_headers` untuk Cloudflare Pages/Netlify: CSP,
  HSTS, X-Frame-Options, Permissions-Policy, + aturan cache per-jalur.

Semua animasi otomatis dimatikan bila pengguna mengaktifkan
`prefers-reduced-motion` (aksesibilitas).

## Menjalankan

```bash
npm install
npm run dev      # dev server di http://localhost:4321
npm run build    # build ke ./dist
npm run preview  # preview hasil build
```

## Konsep desain

Metafora: **portofolio = git repository**.

| Elemen web | Padanan "repo" |
|---|---|
| Navigasi | File tree di sidebar (desktop) / baris tab (mobile) |
| Halaman | Nama file: `README.md`, `log.md`, `branches.md`, `CONTACT.md` |
| Section heading | Sintaks markdown (`## Tentang`) |
| Pengalaman kerja | `git log --graph` — commit dengan hash, refs, dan pesan |
| Keahlian | Daftar branch (`feat/frontend`, `feat/backend`, ...) |
| 404 | Output error `git checkout` |
| Footer | Status bar editor (`main` · UTF-8 · LF · Astro) |

Prinsip visual:
- **Tipografi**: monospace (JetBrains Mono) sebagai teks utama — terasa seperti
  membaca kode/dokumen, bukan halaman web biasa.
- **Palet**: "kertas & tinta" terang (`#fbfbfa` / `#1a1a1a`) + aksen **amber**
  (sengaja dipilih agar tidak menyerupai GitHub) dan **violet** untuk branch.
- **Sudut tajam** (radius 2–4px) supaya terasa seperti UI editor, bukan kartu web.
- **Hanya 1 file JS opsional** — halaman tetap ringan.

## Struktur

```
src/
├── components/
│   ├── BootScreen.astro      # layar loading `git clone` (kunjungan pertama)
│   ├── ScrollProgress.astro  # bar progress di atas
│   ├── ScrollReveal.astro    # animasi muncul saat di-scroll
│   ├── TopBar.astro          # breadcrumb path + tombol cari + badge branch
│   ├── FileTree.astro        # sidebar navigasi (desktop)
│   ├── MobileNav.astro       # navigasi horizontal (mobile)
│   ├── CommandPalette.astro  # palet perintah Ctrl/⌘+K
│   ├── GitTerminal.astro     # easter egg terminal (Konami code)
│   ├── StatusBar.astro       # footer bergaya status bar (jam live)
│   ├── CommitGraph.astro     # timeline gaya `git log --graph`
│   └── ProjectCard.astro     # kartu entri proyek
├── content/
│   └── projects/             # data proyek (1 file .md per proyek)
├── data/
│   └── site.ts               # identitas, file tree, commits, branches — EDIT DI SINI
├── layouts/
│   └── RepoLayout.astro      # kerangka utama
├── pages/
│   ├── index.astro           # README.md
│   ├── log.astro             # log.md
│   ├── branches.astro        # branches.md
│   ├── contact.astro         # CONTACT.md
│   ├── 404.astro             # 404 dengan efek ketik
│   ├── open-graph/
│   │   └── [...route].ts     # generator OG image
│   └── projects/
│       ├── index.astro
│       └── [id].astro
├── styles/
│   └── global.css            # tema + token warna + animasi
├── assets/
│   └── projects/             # cover proyek (diproses astro:assets)
├── og-fonts/                 # font TTF untuk generate OG image
└── content.config.ts

scripts/
└── gen-covers.cjs            # generate placeholder cover proyek
```

## Cara menambah proyek

Buat file di `src/content/projects/`, mis. `proyek-baru.md`:

```markdown
---
title: "Nama Proyek"
summary: "Deskripsi singkat satu-dua baris."
date: 2026-10-14
tags: ["React", "Node.js"]
repo: "https://github.com/username/repo"
demo: "https://demo.example.com"
featured: true
status: "aktif"        # aktif | selesai | arsip
---

Isi lengkap dalam Markdown...
```

Halaman detail otomatis dibuat di `/projects/proyek-baru`.

## Yang perlu diganti sebelum publish

1. `src/data/site.ts` — nama, tagline, email, lokasi, file tree, `commits`, `branches`
2. `src/content/projects/*.md` — ganti dengan proyek aslimu
3. `astro.config.mjs` — nilai `site` → domain asli
4. `public/favicon.svg` — favicon sendiri

## Deploy

Gratis via Cloudflare Pages atau Vercel:

- **Build command**: `npm run build`
- **Output directory**: `dist`
- **Node version**: 22.12.0 atau lebih baru
