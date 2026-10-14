// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  // Ganti dengan domain aslimu setelah deploy (mis. https://renz.pages.dev).
  // Dipakai untuk canonical URL.
  site: "https://example.com",
  vite: {
    plugins: [tailwindcss()],
  },
});
