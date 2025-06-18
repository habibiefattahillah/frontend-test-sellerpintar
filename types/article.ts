import { z } from "zod";
import { CategorySchema } from "./category";
import { UserSchema } from "./user";

const ArticleFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  category: z.string().min(1, "Category is required"),
  content: z.string().min(1, "Content is required"),
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

export const SingleArticleResponseSchema = z.object({
  data: ArticleSchema,
});

export type ArticleResponse = z.infer<typeof ArticleResponseSchema>;
export type Article = z.infer<typeof ArticleSchema>;
export type ArticleFormValues = z.infer<typeof ArticleFormSchema>;
export type SingleArticleResponse = z.infer<typeof SingleArticleResponseSchema>;
