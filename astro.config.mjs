// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  // Ganti dengan domain aslimu setelah deploy (mis. https://renz.pages.dev).
  // Dipakai untuk canonical URL dan sitemap.
  site: "https://example.com",
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
