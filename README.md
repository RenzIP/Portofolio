# Portofolio

Website portofolio pribadi. Dibangun dengan **Astro** + **Tailwind CSS v4**,
output HTML statis (tanpa JavaScript berat).

## Tech Stack

| Bagian | Teknologi |
|---|---|
| Framework | Astro 7 (static output) |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) |
| Tipografi konten | `@tailwindcss/typography` |
| Konten proyek | Astro Content Collections (Markdown) |
| Bahasa | TypeScript (strict) |

## Menjalankan

```bash
npm install
npm run dev      # dev server di http://localhost:4321
npm run build    # build ke ./dist
npm run preview  # preview hasil build
```

## Struktur

```
src/
├── components/     # Nav, Footer, ProjectCard
├── content/
│   └── projects/   # data proyek (1 file .md per proyek)
├── data/
│   └── site.ts     # identitas, kontak, skills — EDIT DI SINI
├── layouts/
│   └── Layout.astro
├── pages/
│   ├── index.astro
│   ├── about.astro
│   ├── contact.astro
│   ├── 404.astro
│   └── projects/
│       ├── index.astro
│       └── [id].astro
├── styles/
│   └── global.css  # tema Tailwind + token warna
└── content.config.ts
```

## Cara menambah proyek

Buat file baru di `src/content/projects/`, mis. `proyek-baru.md`:

```markdown
---
title: "Nama Proyek"
summary: "Deskripsi singkat satu-dua baris."
date: 2026-10-14
tags: ["React", "Node.js"]
repo: "https://github.com/username/repo"
demo: "https://demo.example.com"
featured: true
---

Isi lengkap dalam Markdown...
```

Halaman detail otomatis dibuat di `/projects/proyek-baru`.

## Yang perlu diganti sebelum publish

1. `src/data/site.ts` — nama, role, tagline, email, link sosial, skills
2. `astro.config.mjs` — nilai `site` → domain asli
3. `public/favicon.svg` — favicon sendiri

## Deploy

Gratis via Cloudflare Pages atau Vercel:

- **Build command**: `npm run build`
- **Output directory**: `dist`
- **Node version**: 22.12.0 atau lebih baru

## Catatan

- Dark mode mengikuti preferensi sistem (`prefers-color-scheme`) — tanpa toggle.
- Tidak ada framework JS client-side; halaman tetap ringan.
