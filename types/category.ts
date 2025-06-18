import { z } from "zod";

export const CategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  userId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const CategoryInputSchema = z.object({
  name: z.string(),
});
