import { defineCollection, z } from "astro:content"

const work = defineCollection({
  type: "content",
  schema: z.object({
    company: z.string(),
    role: z.string(),
    dateStart: z.coerce.date(),
    dateEnd: z.union([z.coerce.date(), z.string()]),
  }),
})

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()),
    draft: z.boolean().optional(),
    coverImage: z.string().optional(), // Added coverImage property
  }),
})

const projects = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()),
    draft: z.boolean().optional(),
    demoUrl: z.string().optional(),
    repoUrl: z.string().optional(),
    coverImage: z.string().optional(), // Added coverImage property
  }),
})

const legal = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
  }),
})

const fantasybooks = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    series: z.string().optional(), // Optional bookseries property
    releaseyear: z.string().optional(), // Optional releaseyear property
    summary: z.string(),
    date: z.coerce.date(),
    bookauthor: z.string().optional(), // Added bookauthor property
    tags: z.array(z.string()),
    draft: z.boolean().optional(),
    demoUrl: z.string().optional(),
    repoUrl: z.string().optional(),
    coverImage: z.string().optional(), // Added coverImage property
  }),
})

export const collections = { work, blog, projects, legal, fantasybooks }
