/**
 * Endpoint OG image — menghasilkan gambar preview 1200×630 untuk tiap halaman
 * dan tiap proyek, supaya link yang di-share tampil bergambar (bukan teks polos).
 *
 * Hasil: /open-graph/<slug>.png
 */
import { OGImageRoute } from "astro-og-canvas";
import { getCollection } from "astro:content";
import { locales, type Lang } from "../../i18n/ui";
import { ruang } from "../../i18n/ruang";
import { ogPrefix, projectLang, projectSlug, t } from "../../i18n/utils";

/* ---------- warna (RGB), diselaraskan dengan tema situs ---------- */
const PAPER: [number, number, number] = [251, 251, 250]; // #fbfbfa
const INK: [number, number, number] = [26, 26, 26]; // #1a1a1a
const INK_SOFT: [number, number, number] = [68, 68, 63]; // #44443f
const ACCENT: [number, number, number] = [245, 158, 11]; // #f59e0b amber
const ROOM: [number, number, number] = [11, 10, 9]; // #0b0a09
const ROOM_WARM: [number, number, number] = [23, 19, 15]; // #17130f
const CREAM: [number, number, number] = [244, 236, 225]; // #f4ece1
const CREAM_SOFT: [number, number, number] = [168, 159, 146]; // #a89f92

const FONTS = [
  "./src/og-fonts/jetbrains-mono-regular.ttf",
  "./src/og-fonts/jetbrains-mono-bold.ttf",
  "./src/og-fonts/space-grotesk.ttf",
];

/* Huruf Latin tidak punya glif kanji/kana; tanpa fallback, judul dan
 * deskripsi Jepang/Tionghoa tercetak sebagai kotak kosong. Dua berkas ini
 * adalah subset Noto yang hanya memuat karakter di konten ja/zh, jadi
 * ukurannya ratusan KB, bukan belasan MB. Kalau teks ja/zh berubah dan
 * muncul karakter baru, jalankan ulang subsetting (lihat README). */
const CJK_FONTS: Partial<Record<Lang, string[]>> = {
  ja: [
    "./src/og-fonts/noto-sans-jp-regular.ttf",
    "./src/og-fonts/noto-sans-jp-bold.ttf",
  ],
  zh: [
    "./src/og-fonts/noto-sans-sc-regular.ttf",
    "./src/og-fonts/noto-sans-sc-bold.ttf",
  ],
};
const CJK_FAMILY: Partial<Record<Lang, string>> = {
  ja: "Noto Sans JP",
  zh: "Noto Sans SC",
};

/* ---------- halaman statis, per bahasa ---------- */
// Kunci TIDAK boleh mengandung "/" — itu yang membuat folder sampah
// seperti /open-graph/project-en/gradi-ol.png sebelum perbaikan.
const staticPages = Object.fromEntries(
  locales.flatMap((lang) => {
    const p = ogPrefix(lang);
    return [
      [
        `${p}home`,
        {
          title: ruang[lang].meta.title,
          description: ruang[lang].meta.description,
          lang,
        },
      ],
      [
        `${p}projects`,
        { title: "projects/", description: t(lang, "ogProjectsDesc"), lang },
      ],
      [
        `${p}log`,
        { title: "log.md", description: t(lang, "ogLogDesc"), lang },
      ],
      [
        `${p}branches`,
        {
          title: "branches.md",
          description: t(lang, "ogBranchesDesc"),
          lang,
        },
      ],
      [
        `${p}contact`,
        { title: "CONTACT.md", description: t(lang, "ogContactDesc"), lang },
      ],
    ];
  }),
);

/* ---------- proyek dari content collection, per bahasa ---------- */
const projects = await getCollection("projects");
const projectPages = Object.fromEntries(
  projects.map((p) => [
    `${ogPrefix(projectLang(p.id))}project-${projectSlug(p.id)}`,
    {
      title: p.data.title,
      description: p.data.summary,
      lang: projectLang(p.id),
    },
  ]),
);

/** Beranda adalah Ruang 3D, jadi kartunya ikut gelap; halaman arsip
 *  tetap kertas terang supaya tetap terasa satu keluarga dengan repo. */
const homeKeys = new Set(locales.map((lang) => `${ogPrefix(lang)}home`));

export const { getStaticPaths, GET } = await OGImageRoute({
  pages: { ...staticPages, ...projectPages },

  getImageOptions: (path, page) => {
    const isHome = homeKeys.has(path);
    const cjkFamily = CJK_FAMILY[page.lang];
    const titleFamilies = ["Space Grotesk", "JetBrains Mono"];
    const descriptionFamilies = ["JetBrains Mono"];
    if (cjkFamily) {
      titleFamilies.push(cjkFamily);
      descriptionFamilies.push(cjkFamily);
    }
    return {
      title: page.title,
      description: page.description,
      // beranda: ruangan malam yang hangat; arsip: kertas dengan gradasi halus
      bgGradient: isHome ? [ROOM, ROOM_WARM] : [PAPER, [245, 245, 243]],
      // Beranda memakai render ruang asli supaya preview tautan langsung
      // memperlihatkan apa yang menunggu di halaman, bukan kartu teks polos.
      ...(isHome
        ? { bgImage: { path: "./src/assets/og/ruang-home.jpg", fit: "cover" as const } }
        : {}),
      border: { color: ACCENT, width: 14, side: "inline-start" },
      padding: 72,
      fonts: [...FONTS, ...(CJK_FONTS[page.lang] ?? [])],
      font: {
        title: {
          color: isHome ? CREAM : INK,
          size: 62,
          weight: "Bold",
          lineHeight: 1.15,
          families: titleFamilies,
        },
        description: {
          color: isHome ? CREAM_SOFT : INK_SOFT,
          size: 30,
          lineHeight: 1.4,
          families: descriptionFamilies,
        },
      },
    };
  },
});
