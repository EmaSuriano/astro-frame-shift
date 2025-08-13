import { defineCollection, reference, z } from "astro:content";
import { file, glob } from "astro/loaders";

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

const gallery = defineCollection({
  loader: file("src/data/gallery.json", {
    parser: (text) => {
      const data = JSON.parse(text);
      return data.map((item: any) => ({
        ...item,
        id: slugify(item.title),
      }));
    },
  }),
  schema: z.object({
    src: z.string(),
    alt: z.string(),
    title: z.string(),
    description: z.string(),
    category: z.string(),
    date: z.string(),
    photographer: z.string(),
    photographerLink: z.string().optional(),
  }),
});

export const collections = { gallery };
