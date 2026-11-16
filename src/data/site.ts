/**
 * Data identitas & navigasi bergaya repository.
 *
 * Konsep: portofolio ini dibingkai sebagai sebuah git repository.
 * Setiap section = sebuah "file" di dalam repo.
 *
 * Prinsip isi file ini: semua yang ada di sini harus bisa diverifikasi.
 * Tanggal, hash commit, dan nama repo diambil dari repository publik
 * di GitHub — bukan karangan.
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
      { label: "ruang/", path: "/", hint: "Ruang kerja", isDir: true },
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
 * `hash` adalah short-hash commit ASLI dari repository publik.
 * `source` adalah nama repo; `repo` diisi path lengkap kalau repo bukan
 * milik RenzIP (misalnya repo organisasi). Hash-nya bisa dicari di
 * `git log` repo terkait.
 */
export const commits = [
  {
    hash: "2f58e50",
    source: "LerengApps",
    date: "Nov 2026",
    refs: ["HEAD", "main"],
    title: "feat: kontur terrain dengan interval yang bisa diatur",
    body: "Interval 5/10/20 m, otomatis, atau 1–200 m. Grid dan interpolasi IDW dihitung dari sampel elevasi lokal di perangkat.",
    stack: ["Java", "Android", "SQLite"],
  },
  {
    hash: "985df20",
    source: "Graphic-Diagram-Online-Frontend",
    date: "Jul 2026",
    refs: ["main"],
    title: "feat: alur lupa password",
    body: "Reset password lewat email, plus penyesuaian halaman masuk dan sesi. Frontend Next.js, backend Go/Fiber + Redis.",
    stack: ["Go", "Next.js", "Redis", "WebSocket"],
  },
  {
    hash: "91e7972",
    source: "Graphic-Diagram-Online-Frontend",
    date: "Jul 2026",
    refs: [],
    title: "feat: indikator status koneksi WebSocket",
    body: "Status koneksi dan penanganan WebSocket dibuat eksplisit supaya pengguna tahu saat kanvas kehilangan sinkronisasi.",
    stack: ["Next.js", "WebSocket", "Redis"],
  },
  {
    hash: "6f55090",
    source: "Website-PEMIRA-ULBI",
    repo: "Pemira-Website/Website-PEMIRA-ULBI",
    date: "Jun 2026",
    refs: [],
    title: "feat: mode pemilihan himatif dan konfigurasi suara",
    body: "Jenis pemilihan bisa dikonfigurasi, termasuk mode khusus himatif dan opsi kotak kosong. Laravel + Blade.",
    stack: ["Laravel", "PHP", "Blade"],
  },
  {
    hash: "52ff770",
    source: "kavanahub",
    repo: "KavanaHub/kavanahub",
    date: "Jan 2026",
    refs: [],
    title: "feat: profil pengguna dan tampilan per peran",
    body: "Halaman profil dinamis untuk lima peran, dengan edit data dan logout. Next.js + Express.js.",
    stack: ["Next.js", "Express.js", "MySQL"],
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
    items: ["Go", "Fiber", "Node.js", "Express.js", "PHP / Laravel", "Python", "PostgreSQL", "MySQL", "Redis"],
  },
  {
    name: "feat/desktop-mobile",
    tone: "add",
    summary: "Aplikasi desktop, Android, dan mobile di luar web.",
    items: ["Java / Android", "C# / WinForms", "Python", "Flutter", "Dart"],
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
