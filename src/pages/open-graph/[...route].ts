/**
 * Endpoint OG image — menghasilkan gambar preview 1200×630 untuk tiap halaman
 * dan tiap proyek, supaya link yang di-share tampil bergambar (bukan teks polos).
 *
 * Hasil: /open-graph/<slug>.png
 */
import { OGImageRoute } from "astro-og-canvas";
import { getCollection } from "astro:content";
import { repo } from "../../data/site";
import { locales } from "../../i18n/ui";
import { ogPrefix, projectLang, projectSlug, t } from "../../i18n/utils";

/* ---------- warna (RGB), diselaraskan dengan tema situs ---------- */
const PAPER: [number, number, number] = [251, 251, 250]; // #fbfbfa
const INK: [number, number, number] = [26, 26, 26]; // #1a1a1a
const INK_SOFT: [number, number, number] = [68, 68, 63]; // #44443f
const ACCENT: [number, number, number] = [245, 158, 11]; // #f59e0b amber

const FONTS = [
  "./src/og-fonts/jetbrains-mono-regular.ttf",
  "./src/og-fonts/jetbrains-mono-bold.ttf",
  "./src/og-fonts/space-grotesk.ttf",
];

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
          title: `${repo.author} — ${t(lang, "ogJobTitle")}`,
          description: t(lang, "tagline"),
        },
      ],
      [
        `${p}projects`,
        { title: "projects/", description: t(lang, "ogProjectsDesc") },
      ],
      [`${p}log`, { title: "log.md", description: t(lang, "ogLogDesc") }],
      [
        `${p}branches`,
        { title: "branches.md", description: t(lang, "ogBranchesDesc") },
      ],
      [
        `${p}contact`,
        { title: "CONTACT.md", description: t(lang, "ogContactDesc") },
      ],
    ];
  }),
);

/* ---------- proyek dari content collection, per bahasa ---------- */
const projects = await getCollection("projects");
const projectPages = Object.fromEntries(
  projects.map((p) => [
    `${ogPrefix(projectLang(p.id))}project-${projectSlug(p.id)}`,
    { title: p.data.title, description: p.data.summary },
  ]),
);

export const { getStaticPaths, GET } = await OGImageRoute({
  pages: { ...staticPages, ...projectPages },

  getImageOptions: (_path, page) => ({
    title: page.title,
    description: page.description,
    // latar: kertas dengan gradasi sangat halus, konsisten dengan situs
    bgGradient: [PAPER, [245, 245, 243]],
    border: { color: ACCENT, width: 14, side: "inline-start" },
    padding: 72,
    fonts: FONTS,
    font: {
      title: {
        color: INK,
        size: 62,
        weight: "Bold",
        lineHeight: 1.15,
        families: ["Space Grotesk", "JetBrains Mono"],
      },
      description: {
        color: INK_SOFT,
        size: 30,
        lineHeight: 1.4,
        families: ["JetBrains Mono"],
      },
    },
  }),
});
