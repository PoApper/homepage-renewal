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
    description: z.string(),
    startDate: z.date(),
    members: z.array(z.string()),
  }),
});

export const collections = {
  category: categoryCollection,
  project: projectCollection,
};