import { z } from 'zod';

export const postSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }).max(200, { message: "Title must be less than 200 characters" }),
  slug: z.string().min(1, { message: "Slug is required" }).max(200, { message: "Slug must be less than 200 characters" }),
  content: z.string().min(1, { message: "Content is required" }),
  excerpt: z.string().max(500, { message: "Excerpt must be less than 500 characters" }).optional(),
  cover_image: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal('')),
  published: z.boolean().default(false),
});

export type PostFormData = z.infer<typeof postSchema>;