import { defineCollection, z } from "astro:content";

const categoryCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
  }),
});

const projectCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()),
    postDate: z.date(),
    writer: z.string(),
    writer_email: z.string(),
  }),
});

export const collections = {
  category: categoryCollection,
  project: projectCollection,
};