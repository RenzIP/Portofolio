/**
 * Data identitas & navigasi bergaya repository.
 *
 * Konsep: portofolio ini dibingkai sebagai sebuah git repository.
 * Setiap section = sebuah "file" di dalam repo.
 *
 * Prinsip isi file ini: semua yang ada di sini harus bisa diverifikasi.
 * Tanggal, hash commit, dan nama repo diambil dari repository publik
 * di github.com/RenzIP — bukan karangan.
 */

export const repo = {
  owner: "RenzIP",
  name: "portofolio",
  branch: "main",
  /** Nama yang dipakai di judul, JSON-LD, dan halaman depan. */
  author: "Bagas",
  tagline:
    "Full-Stack Web Developer yang membangun antarmuka cepat, API rapi, dan kode yang enak dirawat.",
  about: [
    "Saya Bagas, full-stack web developer. Saya mengerjakan produk dari dua sisi sekaligus: antarmuka yang enak dipakai di depan, dan API yang rapi serta aman di belakang.",
    "Proyek terbesar saya sejauh ini GraDiOl — editor diagram kolaboratif real-time. Next.js di frontend, Go + Fiber + Redis di backend, dengan presence, penguncian node, dan riwayat versi.",
    "Di luar web saya juga mengerjakan aplikasi desktop (C# WinForms, Python) dan mobile (Flutter) untuk tugas kuliah. Polanya sama: modelkan data dengan benar dulu, baru tulis UI-nya.",
  ],
  email: "baagas7474@gmail.com",
  location: "Bandung, Indonesia",
  status: "Terbuka untuk peluang",
} as const;

/** URL situs — harus sama dengan `site` di astro.config.mjs. */
export const siteUrl = "https://bagasip.my.id";

/**
 * File tree untuk sidebar — ini juga jadi sumber navigasi.
 * `path` dipakai sebagai rute, `label` sebagai nama file.
 */
export const fileTree = [
  {
    dir: "src",
    files: [
      { label: "README.md", path: "/", hint: "Tentang saya", isDir: false },
      { label: "projects/", path: "/projects", hint: "Proyek", isDir: true },
      { label: "log.md", path: "/log", hint: "Riwayat", isDir: false },
      { label: "branches.md", path: "/branches", hint: "Keahlian", isDir: false },
      { label: "CONTACT.md", path: "/contact", hint: "Kontak", isDir: false },
    ],
  },
] as const;

/**
 * Timeline proyek — ditampilkan sebagai commit log.
 *
 * `hash` adalah short-hash commit ASLI dari repository publik
 * github.com/RenzIP/<source>, dan `date` adalah tanggal commit tersebut.
 * Hash-nya bisa dicari di `git log` repo terkait.
 */
export const commits = [
  {
    hash: "985df20",
    source: "Graphic-Diagram-Online-Frontend",
    date: "Jul 2026 — sekarang",
    refs: ["HEAD", "main"],
    title: "feat: editor diagram kolaboratif real-time (GraDiOl)",
    body: "Frontend Next.js App Router + backend Go/Fiber. Presence pengguna, penguncian node lewat Redis, riwayat versi, dan import diagram dari DSL maupun ASCII.",
    stack: ["Go", "Next.js", "Redis", "WebSocket"],
  },
  {
    hash: "f920fe7",
    source: "marketplace-talas-sangkuriang",
    date: "Sep 2026",
    refs: [],
    title: "feat: katalog produk marketplace talas",
    body: "Situs katalog statis tanpa build step — HTML, CSS, dan JavaScript biasa, dengan galeri produk sebagai beban utama halaman.",
    stack: ["HTML", "CSS", "JavaScript"],
  },
  {
    hash: "f9f28fd",
    source: "silog-714240042",
    date: "Sep 2026",
    refs: [],
    title: "feat: sistem logistik dengan Flutter",
    body: "Tugas praktikum: model domain gudang, barang, dan pengiriman dengan enkapsulasi dan validasi transisi status.",
    stack: ["Flutter", "Dart", "OOP"],
  },
  {
    hash: "1bdabd0",
    source: "e-commerce",
    date: "Jul 2026",
    refs: [],
    title: "feat: aplikasi e-commerce Laravel",
    body: "Toko online dengan Laravel dan Livewire — autentikasi, katalog produk, dan alur checkout.",
    stack: ["Laravel", "PHP", "Livewire"],
  },
  {
    hash: "ec93036",
    source: "Anonymous-chat-socket",
    date: "Feb 2026",
    refs: [],
    title: "feat: chat anonim real-time lewat WebSocket",
    body: "Server Python + klien desktop CustomTkinter: room ber-password, pesan pribadi, kirim file sampai 5 MB, indikator mengetik.",
    stack: ["Python", "WebSocket", "CustomTkinter"],
  },
  {
    hash: "7bd3058",
    source: "Hospital-Management-Desktop",
    date: "Feb 2026",
    refs: [],
    title: "feat: aplikasi desktop manajemen rumah sakit",
    body: "Aplikasi C# WinForms dengan login berbasis peran, pengelolaan pasien, staf, unit, dan laboratorium, plus ekspor laporan ke Excel.",
    stack: ["C#", "WinForms", ".NET"],
  },
  {
    hash: "1f4e46d",
    source: "portofolio",
    date: "Nov 2025 — sekarang",
    refs: ["tag: v1.0"],
    title: "init: portofolio pribadi berbasis Astro",
    body: "Situs yang sedang Anda baca. Astro + Tailwind v4, output statis, tanpa JavaScript framework di sisi klien.",
    stack: ["Astro", "Tailwind CSS", "TypeScript"],
  },
] as const;

/**
 * Keahlian ditampilkan sebagai "branch" — tiap branch mewakili satu area.
 * Isi `items` hanya hal yang benar-benar dipakai di proyek di atas.
 */
export const branches = [
  {
    name: "feat/frontend",
    tone: "accent",
    summary: "Antarmuka web yang cepat, responsif, dan mudah dirawat.",
    items: ["Astro", "Next.js", "React", "TypeScript", "Tailwind CSS"],
  },
  {
    name: "feat/backend",
    tone: "violet",
    summary: "API, autentikasi, dan pengelolaan data di sisi server.",
    items: ["Go", "Fiber", "Node.js", "PHP / Laravel", "Python", "PostgreSQL", "Redis"],
  },
  {
    name: "feat/desktop-mobile",
    tone: "add",
    summary: "Aplikasi desktop dan mobile di luar web.",
    items: ["C# / WinForms", "Python", "Flutter", "Dart"],
  },
  {
    name: "chore/tooling",
    tone: "ink",
    summary: "Alat bantu kerja dan kolaborasi tim.",
    items: ["Git", "GitHub", "Cloud Run", "Linux CLI"],
  },
] as const;

export const socials = [
  { label: "GitHub", href: "https://github.com/RenzIP", handle: "@RenzIP" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/bagasip/",
    handle: "in/bagasip",
  },
  {
    label: "Email",
    href: "mailto:baagas7474@gmail.com",
    handle: "baagas7474@gmail.com",
  },
] as const;
