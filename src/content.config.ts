import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/projects" }),
  // `image()` di-resolve Astro jadi ImageMetadata, sehingga bisa dipakai
  // langsung oleh komponen <Image /> dari astro:assets.
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      date: z.coerce.date(),
      tags: z.array(z.string()).default([]),
      repo: z.string().url().optional(),
      demo: z.string().url().optional(),
      featured: z.boolean().default(false),
      status: z.enum(["aktif", "selesai", "arsip"]).default("selesai"),
      cover: image().optional(),
    }),
});

export const collections = { projects };
