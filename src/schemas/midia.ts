import { z } from 'zod';

export const midiaSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }).max(200, { message: "Title must be less than 200 characters" }),
  source: z.string().min(1, { message: "Source is required" }).max(200, { message: "Source must be less than 200 characters" }),
  url: z.string().url({ message: "Please enter a valid URL" }),
  description: z.string().max(500, { message: "Description must be less than 500 characters" }).optional(),
  thumbnail: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal('')),
  published_date: z.date().optional(),
});

export type MidiaFormData = z.infer<typeof midiaSchema>;