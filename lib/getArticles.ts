import { ArticleResponseSchema } from "@/types/article";

// Dummy Data
const now = new Date().toISOString();
export const dummyArticles = Array.from({ length: 500 }, (_, i) => {
  const id = (i + 1).toString();
  return {
    id,
    title: `Dummy Title ${id}`,
    content: `This is dummy content for article ${id}.`,
    userId: `user${id}`,
    categoryId: `cat${id}`,
    createdAt: now,
    updatedAt: now,
    category: {
      id: `cat${id}`,
      name: `Category ${id}`,
      userId: `user${id}`,
      createdAt: now,
      updatedAt: now,
    },
    user: {
      id: `user${id}`,
      username: `user${id}`,
      role: "User",
    },
  };
});

export async function getArticles(page: number) {
  try {
    const res = await fetch(
      `https://test-fe.mysellerpintar.com/articles?page=${page}&limit=10`
    );

    if (!res.ok) throw new Error("Failed to fetch");

    const json = await res.json();
    const parsed = ArticleResponseSchema.parse(json);

    return parsed;
  } catch (err) {
    console.error("Using dummy data due to fetch/Zod error:", err);

    const pageSize = 10;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    return {
      data: dummyArticles.slice(start, end),
      total: dummyArticles.length,
      page,
      limit: pageSize,
    };
  }
}

import { SingleArticleResponseSchema } from "@/types/article";

export async function getArticleById(id: string) {
  try {
    const res = await fetch(
      `https://test-fe.mysellerpintar.com/articles/${id}`
    );

    if (!res.ok) throw new Error("Failed to fetch article");

    const json = await res.json();
    const parsed = SingleArticleResponseSchema.parse(json);

    return parsed.data;
  } catch (err) {
    console.error("Using dummy data due to fetch/Zod error:", err);
    return dummyArticles.find((article) => article.id === id) || null;
  }
}
