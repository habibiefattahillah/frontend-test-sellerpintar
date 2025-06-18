import {
  CategoryResponseSchema,
  SingleCategoryResponseSchema,
} from "@/types/category";

// Dummy data
const now = new Date().toISOString();
export const dummyCategories = Array.from({ length: 100 }, (_, i) => {
  const id = (i + 1).toString();
  return {
    id,
    name: `Category ${id}`,
    userId: `user${id}`,
    createdAt: now,
    updatedAt: now,
  };
});

export async function getCategories(page: number) {
  try {
    const res = await fetch(
      `https://test-fe.mysellerpintar.com/categories?page=${page}&limit=10`
    );

    if (!res.ok) throw new Error("Failed to fetch categories");

    const json = await res.json();
    const parsed = CategoryResponseSchema.parse(json);
    if (!parsed.data || !Array.isArray(parsed.data)) {
      throw new Error("Invalid category data");
    }

    return parsed;
  } catch (err) {
    console.error("Using dummy categories due to fetch/Zod error:", err);

    const pageSize = 10;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    return {
      data: dummyCategories.slice(start, end),
      total: dummyCategories.length,
      page,
      limit: pageSize,
    };
  }
}

export async function getCategoryById(id: string) {
  try {
    const res = await fetch(
      `https://test-fe.mysellerpintar.com/categories/${id}`
    );

    if (!res.ok) throw new Error("Failed to fetch category");

    const json = await res.json();
    const parsed = SingleCategoryResponseSchema.parse(json);

    return parsed.data;
  } catch (err) {
    console.error("Using dummy category due to fetch/Zod error:", err);
    return dummyCategories.find((cat) => cat.id === id) || null;
  }
}
