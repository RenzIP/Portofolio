// Generate placeholder cover untuk tiap proyek (SVG → PNG via sharp).
// Gaya: kartu repo — kertas terang, aksen amber/violet, judul + stack.
const fs = require("node:fs");
const path = require("node:path");
const sharp = require("sharp");

const OUT = "src/assets/projects";
fs.mkdirSync(OUT, { recursive: true });

const projects = [
  {
    slug: "silog",
    title: "Silog",
    subtitle: "Sistem Logistik",
    accent: "#f59e0b",
    tags: ["Flutter", "Dart", "OOP"],
    badge: "GD-BDG",
  },
  {
    slug: "portofolio",
    title: "Portofolio",
    subtitle: "Personal Site",
    accent: "#8b5cf6",
    tags: ["Astro", "Tailwind", "TypeScript"],
    badge: "v1.0",
  },
];

const W = 1200;
const H = 630;

const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function svg({ title, subtitle, accent, tags, badge }) {
  // chip lebar seragam supaya rapi
  const CHIP_W = 176;
  const CHIP_GAP = 14;
  const tagChips = tags
    .map((t, i) => {
      const x = 72 + i * (CHIP_W + CHIP_GAP);
      return `
      <rect x="${x}" y="466" width="${CHIP_W}" height="48" rx="4"
            fill="#fbfbfa" stroke="#c4c4bb" stroke-width="2"/>
      <text x="${x + CHIP_W / 2}" y="497" font-family="monospace" font-size="20"
            fill="#44443f" text-anchor="middle">${esc(t)}</text>`;
    })
    .join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="paper" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#fbfbfa"/>
      <stop offset="100%" stop-color="#f0f0ec"/>
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#paper)"/>

  <!-- grid halus, kesan editor -->
  <g stroke="#e2e2dd" stroke-width="1" opacity="0.7">
    ${Array.from({ length: 12 }, (_, i) => `<line x1="0" y1="${i * 56}" x2="${W}" y2="${i * 56}"/>`).join("")}
  </g>

  <!-- aksen kiri -->
  <rect x="0" y="0" width="14" height="${H}" fill="${accent}"/>

  <!-- badge kanan atas -->
  <rect x="${W - 220}" y="56" width="148" height="46" rx="4"
        fill="#fbfbfa" stroke="${accent}" stroke-width="2"/>
  <text x="${W - 146}" y="86" font-family="monospace" font-size="20"
        fill="${accent}" text-anchor="middle" font-weight="bold">${esc(badge)}</text>

  <!-- judul -->
  <text x="72" y="250" font-family="sans-serif" font-size="82" font-weight="bold"
        fill="#1a1a1a">${esc(title)}</text>
  <text x="72" y="330" font-family="monospace" font-size="40"
        fill="#44443f">${esc(subtitle)}</text>

  <!-- garis pemisah -->
  <line x1="72" y1="390" x2="${W - 72}" y2="390" stroke="#e2e2dd" stroke-width="2"/>

  <!-- label -->
  <text x="72" y="436" font-family="monospace" font-size="20"
        fill="#6b6b64" letter-spacing="2">STACK</text>

  ${tagChips}

  <!-- footer -->
  <text x="72" y="${H - 40}" font-family="monospace" font-size="20"
        fill="#6b6b64">placeholder — ganti dengan screenshot asli</text>
</svg>`;
}

(async () => {
  for (const p of projects) {
    const out = path.join(OUT, `${p.slug}.png`);
    await sharp(Buffer.from(svg(p))).png().toFile(out);
    const { size } = fs.statSync(out);
    console.log(`✓ ${out} (${Math.round(size / 1024)} KB)`);
  }
})();
