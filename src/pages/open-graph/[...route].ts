/**
 * Endpoint OG image — menghasilkan gambar preview 1200×630 untuk tiap halaman
 * dan tiap proyek, supaya link yang di-share tampil bergambar (bukan teks polos).
 *
 * Hasil: /open-graph/<slug>.png
 */
import { OGImageRoute } from "astro-og-canvas";
import { getCollection } from "astro:content";
import { repo } from "../../data/site";

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

/* ---------- halaman statis ---------- */
const staticPages: Record<string, { title: string; description: string }> = {
  home: {
    title: `${repo.owner} — Full-Stack Web Developer`,
    description: repo.tagline,
  },
  projects: {
    title: "projects/",
    description: "Kumpulan proyek yang pernah saya kerjakan.",
  },
  log: {
    title: "log.md",
    description: "Riwayat perjalanan saya sebagai developer.",
  },
  branches: {
    title: "branches.md",
    description: "Keahlian saya, dipetakan sebagai branch.",
  },
  contact: {
    title: "CONTACT.md",
    description: "Cara menghubungi saya untuk kolaborasi atau peluang kerja.",
  },
};

/* ---------- proyek dari content collection ---------- */
const projects = await getCollection("projects");
const projectPages = Object.fromEntries(
  projects.map((p) => [
    `project-${p.id}`,
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
