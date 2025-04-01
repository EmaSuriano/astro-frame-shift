import { defineCollection, reference, z } from "astro:content";
import { file, glob } from "astro/loaders";

const gallery = defineCollection({
  loader: file("src/data/gallery.json"),
  schema: z.object({
    id: z.number(),
    src: z.string(),
    alt: z.string(),
    title: z.string(),
    description: z.string(),
    category: z.string(),
    date: z.string(),
    photographer: z.string(),
  }),
});

export const collections = { gallery };
