"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Article } from "@/types/article";
import Link from "next/link";

export const articleColumn: ColumnDef<Article>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "thumbnail",
    header: "Thumbnail",
    cell: ({ row }) => (
      <img
        src={row.getValue("thumbnail")}
        alt={row.getValue("title")}
        className="w-16 h-16 object-cover"
      />
    ),
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "category.name",
    header: "Category",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => new Date(row.getValue("createdAt")).toLocaleDateString(),
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <Link
          href={`/admin/article/${row.getValue("id")}`}
          className="text-blue-500 hover:underline"
        >
          Preview
        </Link>
        <Link
          href={`/admin/article/edit?id=${row.getValue("id")}`}
          className="text-blue-500 hover:underline"
        >
          Edit
        </Link>
        <p className="text-red-500 hover:underline cursor-pointer">Delete</p>
      </div>
    ),
  },
];
