// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  // Domain produksi. Dipakai untuk canonical URL, OG image, dan sitemap.
  // Harus sama dengan `siteUrl` di src/data/site.ts.
  site: "https://bagasip.my.id",
  integrations: [
    sitemap({
      // Kecualikan halaman error & aset OG image dari sitemap.
      filter: (page) =>
        !page.includes("/404") && !page.includes("/open-graph/"),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
