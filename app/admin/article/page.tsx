"use client";

import { DataTable } from "@/components/common/DataTable";
import { articleColumn } from "./columns";
import { Article } from "@/types/article";

const data: Article[] = [
  {
    id: "1",
    title: "Sample Article",
    content: "This is a sample article content.",
    userId: "user1",
    categoryId: "category1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    category: {
      id: "category1",
      name: "Sample Category",
      userId: "user1",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    user: { id: "user1", username: "sampleuser", role: "admin" },
  },
];

export default function ArticlePage() {
  return (
    <div className="p-6">
      <div className="bg-white shadow-md rounded-lg border py-6 space-y-4">
        <h1 className="text-lg font-semibold border-b pb-2 px-6">
          Total Articles: {data.length}
        </h1>
        <DataTable columns={articleColumn} data={data} />
      </div>
    </div>
  );
}
