// types/article.ts
import { z } from "zod";

export const CategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  userId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const UserSchema = z.object({
  id: z.string(),
  username: z.string(),
  role: z.string(),
});

export const ArticleSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  userId: z.string(),
  categoryId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  category: CategorySchema,
  user: UserSchema,
});

export const ArticleResponseSchema = z.object({
  data: z.array(ArticleSchema),
  total: z.number(),
  page: z.number(),
  limit: z.number(),
});

export type ArticleResponse = z.infer<typeof ArticleResponseSchema>;
export type Article = z.infer<typeof ArticleSchema>;
