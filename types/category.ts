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

export const CategoryResponseSchema = z.object({
  data: z.array(CategorySchema),
  total: z.number(),
  page: z.number(),
  limit: z.number(),
});

export const SingleCategoryResponseSchema = z.object({
  data: CategorySchema,
});

export type Category = z.infer<typeof CategorySchema>;
export type CategoryInput = z.infer<typeof CategoryInputSchema>;
export type CategoryResponse = z.infer<typeof CategoryResponseSchema>;
export type SingleCategoryResponse = z.infer<
  typeof SingleCategoryResponseSchema
>;
