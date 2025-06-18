import { Category } from "./category";
import { User } from "./user";

export type Article = {
  id: string;
  title: string;
  content: string;
  userId: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  category: Category;
  user: User;
};

export type ArticleInput = {
  title: string;
  content: string;
  categoryId: string;
};
