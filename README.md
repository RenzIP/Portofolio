# Portofolio — Ruang kerja & arsip repo

Dua lapis, satu situs.

**Beranda** adalah *Ruang*: ruangan kerja 3D yang digerakkan scroll. Kamera
melewati lima titik — meja GraDiOl, rak sepuluh buku proyek, papan arsitektur,
arsip commit, dan jendela kontak. Benda di ruangan bisa diklik.

**Halaman dalam** adalah *arsip repo*: `/projects`, `/log`, `/branches`,
`/contact`, dan detail tiap proyek tetap dibingkai sebagai file di dalam
repository — tempat isi panjang dan hash commit tinggal.

Dibangun dengan **Astro 7** + **Tailwind CSS v4**, output HTML statis.

## Tech Stack

| Bagian | Teknologi |
|---|---|
| Framework | Astro 7 (static output) |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) |
| Tipografi | `@tailwindcss/typography` |
| Font | Bricolage Grotesque, Instrument Serif, JetBrains Mono (self-hosted via `@fontsource*`) |
| 3D | Three.js r150 (UMD, di-host sendiri di `public/vendor/`) |
| Konten proyek | Astro Content Collections (Markdown) |
| Navigasi | Beranda: scroll + klik objek. Arsip: View Transitions (`ClientRouter`) + Command Palette (Ctrl/⌘+K) |
| SEO | `@astrojs/sitemap` + `robots.txt` |
| Bahasa | TypeScript (strict) |

## Fitur

- **Beranda 3D** — ruangan kerja yang bisa di-scroll; kamera berpindah lewat
  lima stasiun. Objeknya bukan hiasan: klik buku untuk membuka lembar proyek,
  klik papan untuk lompat ke arsip commit, klik jendela untuk membuka email.
- **Daftar proyek tanpa kanvas** — tekan `L` atau tombol daftar untuk membaca
  semuanya sebagai daftar biasa; `Esc` menutup. Fokus keyboard terkunci di
  dalam panel selama panel terbuka.
- **Fallback tanpa WebGL** — kalau kanvas gagal dibuat, beranda langsung
  menampilkan daftar proyek, bukan layar kosong.
- **Boot screen arsip** — animasi `git clone` singkat saat kunjungan **pertama**
  (sekali per sesi, `sessionStorage`); bisa dilewati dengan klik/tombol apa pun,
  dan otomatis dilewati bila `prefers-reduced-motion` aktif.
- **Command palette arsip** — tekan `Ctrl+K` (atau `⌘+K`) untuk mencari
  halaman/proyek. Navigasi keyboard penuh: `↑` `↓` pilih, `↵` buka, `Esc` tutup.
- **View transitions arsip** — perpindahan halaman gaya `git checkout` (konten
  lama geser kiri, konten baru masuk dari kanan, arah dibalik saat back). Sidebar
  persisten antar halaman (`transition:persist`, per bahasa); TopBar dirender
  ulang tiap navigasi supaya breadcrumb dan tautan pemilih bahasa selalu
  menunjuk halaman yang sedang dibuka.
- **Commit graph hidup** — dot HEAD berdenyut (pause saat offscreen), klik hash
  untuk menyalin (dengan fallback non-secure context), garis vertikal
  tergambar perlahan saat masuk viewport.
- **Status bar hidup** — jam lokal live (update tiap 30 detik) + label branch
  mengikuti halaman aktif.
- **Micro-interaction** — tombol CTA terasa "ditekan" (`pressable`, scale 0.97,
  120ms); hormat `prefers-reduced-motion`.
- **Easter egg terminal** — Konami code (↑↑↓↓←→←→BA) membuka overlay terminal
  `git log --graph` dengan efek ketik; nonaktif saat reduced-motion.
- **Scroll progress bar arsip** — garis amber di atas menunjukkan posisi baca.
- **Scroll reveal** — section muncul saat masuk viewport (`IntersectionObserver`).
- **Animasi masuk** — konten muncul halus dengan stagger.
- **404 dengan efek ketik** — perintah `git checkout` yang gagal, diketik real-time.
- **Salin email sekali klik** di halaman kontak.
- **4 bahasa** — Indonesia (default, tanpa prefix), Inggris (`/en/`), Jepang
  (`/ja/`), Cina (`/zh/`). Tiap bahasa punya URL sendiri, jadi bisa di-bookmark,
  dibagikan, dan dirayapi mesin pencari. Tautan `hreflang` mengarahkan Google ke
  versi yang tepat, dan OG image-nya juga terpisah per bahasa.
- **OG image otomatis** — setiap halaman & proyek punya kartu preview 1200×630
  yang digenerate saat build (`astro-og-canvas`). Beranda memakai render ruang
  gelap; halaman arsip tetap kertas terang. Teks Jepang/Tionghoa memakai subset
  Noto Sans JP/SC supaya tidak tercetak sebagai kotak kosong.
- **Sitemap & robots.txt** — otomatis saat build.
- **Favicon** commit-graph kustom (SVG, ringan).
- **Gambar teroptimasi** — cover proyek diproses `astro:assets`: konversi WebP
  otomatis (35 KB → 2–10 KB), `srcset` responsif 3 varian, lazy loading.
- **Structured data (JSON-LD)** — `WebSite` + `Person` + `WebPage` +
  `BreadcrumbList`, dan `SoftwareSourceCode` di halaman proyek.
- **Security headers** — `_headers` untuk Cloudflare Pages/Netlify: CSP,
  HSTS, X-Frame-Options, Permissions-Policy, + aturan cache per-jalur.

Animasi dekoratif — parallax mouse, debu yang melayang, transisi panel — berhenti
saat pengguna mengaktifkan `prefers-reduced-motion`. Gerakan kamera tetap
mengikuti scroll karena itu kendali langsung pengguna, bukan animasi otomatis.

## Menjalankan

```bash
npm install
npm run dev      # dev server di http://localhost:4321
npm run build    # build ke ./dist
npm run preview  # preview hasil build
```

`npx astro check` untuk type-check; tidak ada script npm terpisah untuk itu.

`scripts/gen-covers.cjs` masih memuat daftar proyek lama, jadi jangan dijalankan
sebelum daftarnya diperbarui. Hanya GraDiOl yang punya cover gambar saat ini.

## Konsep desain

Dua metafora, dipisah dengan sengaja:

| Lapis | Metafora | Nuansa |
|---|---|---|
| Beranda `/` | **Ruang kerja** — kamera berjalan dari meja ke rak, papan, arsip, lalu jendela | Gelap dan hangat; Bricolage Grotesque untuk judul, Instrument Serif untuk aksen |
| Halaman dalam | **Arsip repo** — semuanya file di dalam repository | Kertas & tinta, monospace, sudut tajam |

Beranda menjawab "siapa ini dan apa yang dia bangun" dalam satu gerakan scroll.
Arsip menjawab "jelaskan lebih dalam" — isi panjang, hash commit, dan tautan
keluar tinggal di sana. Beranda sengaja tidak memakai `ClientRouter`: pindah ke
arsip memuat halaman penuh supaya konteks WebGL tidak tertinggal di DOM.

Metafora arsip:

| Elemen web | Padanan "repo" |
|---|---|
| Navigasi | File tree di sidebar (desktop) / baris tab (mobile) |
| Halaman | Nama file: `ruang/`, `log.md`, `branches.md`, `CONTACT.md` |
| Section heading | Sintaks markdown (`## Tentang`) |
| Pengalaman kerja | `git log --graph` — commit dengan hash, refs, dan pesan |
| Keahlian | Daftar branch (`feat/frontend`, `feat/backend`, ...) |
| 404 | Output error `git checkout` |
| Footer | Status bar editor (`main` · UTF-8 · LF · Astro) |

Prinsip visual arsip:
- **Tipografi**: monospace (JetBrains Mono) sebagai teks utama — terasa seperti
  membaca kode/dokumen, bukan halaman web biasa.
- **Palet**: "kertas & tinta" terang (`#fbfbfa` / `#1a1a1a`) + aksen **amber**
  (sengaja dipilih agar tidak menyerupai GitHub) dan **violet** untuk branch.
- **Sudut tajam** (radius 2–4px) supaya terasa seperti UI editor, bukan kartu web.
- **Three.js hanya di beranda** — halaman arsip tetap HTML + JS kecil, jadi
  biaya 3D tidak dibayar di setiap navigasi.

## Struktur

```
src/
├── components/
│   ├── BootScreen.astro      # layar loading `git clone` (kunjungan pertama)
│   ├── ScrollProgress.astro  # bar progress di atas
│   ├── ScrollReveal.astro    # animasi muncul saat di-scroll
│   ├── TopBar.astro          # breadcrumb path + tombol cari + pemilih bahasa
│   ├── LanguageSwitcher.astro # tautan ID / EN / JA / ZH
│   ├── FileTree.astro        # sidebar navigasi (desktop)
│   ├── MobileNav.astro       # navigasi horizontal (mobile)
│   ├── CommandPalette.astro  # palet perintah Ctrl/⌘+K
│   ├── GitTerminal.astro     # easter egg terminal (Konami code)
│   ├── StatusBar.astro       # footer bergaya status bar (jam live)
│   ├── CommitGraph.astro     # timeline gaya `git log --graph`
│   └── ProjectCard.astro     # kartu entri proyek
├── content/
│   └── projects/             # data proyek — 1 file .md per proyek per bahasa
│       ├── *.md              # bahasa Indonesia (default)
│       ├── en/*.md           # Inggris
│       ├── ja/*.md           # Jepang
│       └── zh/*.md           # Cina
├── data/
│   └── site.ts               # identitas, file tree, commits, branches — EDIT DI SINI
├── i18n/
│   ├── ui.ts                 # kamus teks UI arsip (id/en/ja/zh)
│   ├── ruang.ts              # teks ruangan 3D, termasuk label tekstur
│   └── utils.ts              # helper bahasa, path ber-locale, terjemahan
├── layouts/
│   ├── RepoLayout.astro      # kerangka halaman arsip
│   └── RuangLayout.astro     # dokumen beranda 3D (tanpa ClientRouter)
├── pages/
│   ├── [...lang]/
│   │   ├── index.astro       # Ruang kerja 3D  (juga /en/, /ja/, /zh/)
│   │   ├── log.astro         # log.md
│   │   ├── branches.astro    # branches.md
│   │   ├── contact.astro     # CONTACT.md
│   │   └── projects/
│   │       ├── index.astro   # daftar proyek
│   │       └── [id].astro    # detail proyek
│   ├── 404.astro             # 404 dengan efek ketik (satu bahasa)
│   └── open-graph/
│       └── [...route].ts     # generator OG image (per bahasa)
├── styles/
│   ├── global.css            # tema + token warna + animasi arsip
│   └── ruang.css             # gaya beranda 3D + fallback
├── assets/
│   ├── og/                   # render ruang untuk kartu OG beranda
│   └── projects/             # cover proyek (diproses astro:assets)
├── og-fonts/                 # font OG; subset Noto JP/SC untuk teks CJK
└── content.config.ts

public/
├── ruang/
│   └── scene.js              # scene Three.js + UI ruangan (data dari #ruang-data)
├── vendor/
│   └── three.min.js          # Three.js r150, di-host sendiri
└── _headers                  # CSP, HSTS, aturan cache

scripts/
└── gen-covers.cjs            # generator cover (daftar proyeknya masih lama)
```

### Kenapa `[...lang]`

Satu file halaman melayani semua bahasa: rest-parameter `[...lang]` boleh kosong,
jadi `index.astro` menghasilkan `/` (Indonesia, tanpa prefix) sekaligus `/en/`,
`/ja/`, dan `/zh/`. Markup-nya ditulis sekali — tidak ada empat salinan file
yang harus dijaga sinkron.

## Cara menambah proyek

Karena situs ini 4 bahasa, satu proyek = empat file Markdown dengan slug sama:
`src/content/projects/proyek-baru.md` (Indonesia, wajib) plus versi terjemahannya
di `en/`, `ja/`, dan `zh/`. Kalau salah satu bahasa belum ada, halaman proyek itu
hanya muncul di bahasa yang filenya tersedia — jadi tidak akan ada halaman kosong.

Isi Indonesia (default):

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

Halaman detail otomatis dibuat di `/projects/proyek-baru` (dan `/en/projects/...`,
`/ja/projects/...`, `/zh/projects/...`).

### Menambah bahasa baru

1. Tambahkan kode bahasa di `languages` (`src/i18n/ui.ts`).
2. Tambahkan kamusnya (`const xx: Dict = { ... }`) — TypeScript akan menolak
   kalau ada kunci yang kurang, jadi tidak ada teks Indonesia yang bocor.
3. Tambahkan folder `src/content/projects/xx/`.
4. Selesai. Rute `/xx/...`, `hreflang`, pemilih bahasa, dan OG image mengikuti
   otomatis karena semuanya diturunkan dari daftar bahasa itu.

## Status & yang tersisa

Sudah beres:

- **Beranda Ruang** — scene 3D, lima stasiun, lembar proyek, daftar tanpa
  kanvas, fallback tanpa WebGL, dan teks id/en/ja/zh.
- **Identitas nyata** — nama, email, dan LinkedIn di `src/data/site.ts`
  (dipakai juga oleh JSON-LD dan meta tag).
- **Domain produksi** `https://bagasip.my.id` di `astro.config.mjs`,
  `siteUrl` (`src/data/site.ts`), dan `public/robots.txt`.
- **10 entri proyek.** Field `commits` memakai short-hash commit **asli** dari
  repository publik di `github.com/RenzIP`, jadi tiap hash bisa dibuka dan
  diverifikasi lewat link repo di sampingnya.
- **4 bahasa** dengan kamus terketik (`src/i18n/ui.ts` + `src/i18n/ruang.ts`),
  rute ber-prefix, `hreflang`, dan OG image per bahasa.

Yang masih perlu bahan dari pemilik situs:

1. **GoalPath dan CuanLimbah** masih entri jujur tanpa tanggal, demo, atau
   repo. Isi detailnya kalau sudah ada — jangan dikarang.
2. **Screenshot asli** tiap proyek. Saat ini hanya GraDiOl yang punya cover
   gambar (`src/assets/projects/gradi-ol.png`); cover itu tampil di halaman
   detail, sedangkan daftar proyek sengaja tanpa gambar supaya kartunya rata.
   Tambahkan PNG 1200×630 ke `src/assets/projects/`, isi `cover` di frontmatter,
   lalu `npm run build`.
3. **Angka hasil** per proyek (jumlah pengguna, waktu muat, ukuran data) —
   hanya kalau datanya benar-benar ada dan bisa dipertanggungjawabkan.
4. **Koreksi terjemahan Jepang & Cina oleh penutur asli.** Teks EN/JA/ZH ditulis
   oleh asisten, bukan penutur asli. Untuk lamaran kerja ini penting: kalau
   targetnya perusahaan Jepang atau Cina, mintakan orang yang fasih membacanya
   sebelum link-nya dipakai. Kalau tidak ada yang bisa memeriksa, hapus saja
   bahasa itu — satu bahasa sepuluh yang keliru lebih baik daripada empat bahasa
   yang dua di antaranya salah.
5. Halaman 404 hanya berbahasa Indonesia (satu file `404.html` untuk semua URL).
   Kalau perlu per bahasa, itu butuh routing 404 terpisah di Cloudflare Pages.

## Deploy

Situs ini statis — tidak butuh server. Domain `bagasip.my.id` sudah dikelola di
Cloudflare, jadi jalur terpendeknya Cloudflare Pages:

- **Build command**: `npm run build`
- **Output directory**: `dist`
- **Node version**: 22.12.0 atau lebih baru

Setelah deploy pertama, tambahkan `bagasip.my.id` sebagai custom domain di
project Pages tersebut. `public/_headers` (CSP, HSTS, cache) otomatis dibaca
Cloudflare Pages.
