import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const work = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/work' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    description: z.string(),
    heroImage: z.string().optional(),
    heroAspectRatio: z.string().optional(),
    thumbnailPosition: z.string().optional(),
    category: z.enum(['Custom Builds', 'Production Management', 'Systems', 'CNC']),
    tags: z.array(z.string()),
    role: z.string(),
    duration: z.string(),
    projectValue: z.string().optional(),
    constraint: z.string(),
    outcome: z.string(),
    valueCreated: z.array(z.string()),
    skillsDemonstrated: z.array(z.string()),
    processImages: z.array(z.object({
      src: z.string(),
      alt: z.string(),
      label: z.string(),
      description: z.string().optional(),
    })).optional(),
    order: z.number().default(0),
    draft: z.boolean().default(false),
    publishDate: z.string().optional(),
  }),
});

export const collections = { work };
