/**
 * Data identitas & navigasi bergaya repository.
 *
 * Konsep: portofolio ini dibingkai sebagai sebuah git repository.
 * Setiap section = sebuah "file" di dalam repo.
 */

export const repo = {
  owner: "renz",
  name: "renz",
  branch: "main",
  tagline:
    "Full-Stack Web Developer yang membangun antarmuka cepat, API rapi, dan kode yang enak dirawat.",
  about: [
    "Saya Full-Stack Web Developer. Saya suka mengerjakan produk dari dua sisi sekaligus — antarmuka yang enak dipakai di depan, dan API yang rapi serta aman di belakang.",
    "Fokus saya: struktur kode yang jelas, performa yang terukur, dan detail yang tidak mengorbankan kemudahan perawatan. Kode yang baik adalah kode yang masih terbaca enam bulan kemudian.",
  ],
  email: "halo@example.com",
  location: "Bandung, Indonesia",
  status: "Terbuka untuk peluang",
} as const;

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
      { label: "log.md", path: "/log", hint: "Pengalaman", isDir: false },
      { label: "branches.md", path: "/branches", hint: "Keahlian", isDir: false },
      { label: "CONTACT.md", path: "/contact", hint: "Kontak", isDir: false },
    ],
  },
] as const;

/**
 * Timeline pengalaman — ditampilkan sebagai commit log.
 */
export const commits = [
  {
    hash: "a3f91c2",
    date: "2024 — sekarang",
    refs: ["HEAD", "main"],
    title: "feat: membangun produk web full-stack",
    body: "Mengerjakan antarmuka dan API untuk aplikasi web, dari perancangan skema data sampai deploy.",
    stack: ["TypeScript", "React", "Node.js", "PostgreSQL"],
  },
  {
    hash: "7d2e0b8",
    date: "2024",
    refs: [],
    title: "feat: eksplorasi mobile dengan Flutter",
    body: "Membangun aplikasi manajemen logistik sebagai praktikum — model domain, validasi, dan enkapsulasi data.",
    stack: ["Flutter", "Dart", "OOP"],
  },
  {
    hash: "1c8b4a5",
    date: "2023",
    refs: ["tag: v0.1.0"],
    title: "init: dasar pemrograman web",
    body: "HTML, CSS, JavaScript. Proyek pertama: halaman statis dan latihan manipulasi DOM.",
    stack: ["HTML", "CSS", "JavaScript"],
  },
] as const;

/**
 * Keahlian ditampilkan sebagai "branch" — tiap branch mewakili satu area.
 */
export const branches = [
  {
    name: "feat/frontend",
    tone: "accent",
    summary: "Antarmuka web yang cepat, responsif, dan mudah dirawat.",
    items: ["Astro", "React", "TypeScript", "Tailwind CSS", "Vite"],
  },
  {
    name: "feat/backend",
    tone: "violet",
    summary: "API, autentikasi, dan pengelolaan data di sisi server.",
    items: ["Node.js", "Express", "Python", "REST API", "PostgreSQL"],
  },
  {
    name: "feat/mobile",
    tone: "add",
    summary: "Aplikasi mobile lintas platform dengan Flutter.",
    items: ["Flutter", "Dart", "State Management"],
  },
  {
    name: "chore/tooling",
    tone: "ink",
    summary: "Alat bantu kerja dan kolaborasi tim.",
    items: ["Git", "GitHub", "Figma", "Linux CLI"],
  },
] as const;

export const socials = [
  { label: "GitHub", href: "https://github.com/RenzIP", handle: "@RenzIP" },
  { label: "LinkedIn", href: "https://linkedin.com/in/username", handle: "in/username" },
  { label: "Email", href: "mailto:halo@example.com", handle: "halo@example.com" },
] as const;
