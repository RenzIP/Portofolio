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
| Bahasa | TypeScript (strict) |

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
│   ├── TopBar.astro        # breadcrumb path + badge branch
│   ├── FileTree.astro      # sidebar navigasi (desktop)
│   ├── MobileNav.astro     # navigasi horizontal (mobile)
│   ├── StatusBar.astro     # footer bergaya status bar
│   ├── CommitGraph.astro   # timeline gaya `git log --graph`
│   └── ProjectCard.astro   # kartu entri proyek
├── content/
│   └── projects/           # data proyek (1 file .md per proyek)
├── data/
│   └── site.ts             # identitas, file tree, commits, branches — EDIT DI SINI
├── layouts/
│   └── RepoLayout.astro    # kerangka utama
├── pages/
│   ├── index.astro         # README.md
│   ├── log.astro           # log.md
│   ├── branches.astro      # branches.md
│   ├── contact.astro       # CONTACT.md
│   ├── 404.astro
│   └── projects/
│       ├── index.astro
│       └── [id].astro
├── styles/
│   └── global.css          # tema + token warna
└── content.config.ts
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
