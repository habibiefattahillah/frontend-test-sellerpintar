"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Article } from "@/types/article";
import Link from "next/link";
import ConfirmDialog from "@/components/common/ConfirmDialog";

export const articleColumn: ColumnDef<Article>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "thumbnail",
    header: "Thumbnail",
    cell: ({ row }) => (
      <div className="flex justify-center items-center">
        <img
          src={row.getValue("thumbnail")}
          alt={row.getValue("title")}
          className="w-16 h-16 object-cover"
        />
      </div>
    ),
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => <div>{row.getValue("title")}</div>,
  },
  {
    accessorKey: "category.name",
    header: "Category",
    cell: ({ row }) => (
      <div className="flex justify-center items-center">
        {(row.original.category?.name as string) || "Uncategorized"}
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => (
      <div className="flex justify-center items-center">
        {new Date(row.getValue("createdAt")).toLocaleDateString()}
      </div>
    ),
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => {
      const id = row.getValue("id");
      const title = row.getValue("title");

      return (
        <div className="flex justify-center items-center space-x-2">
          <Link
            href={`/admin/article/${id}`}
            className="text-blue-500 hover:underline"
          >
            Preview
          </Link>
          <Link
            href={`/admin/article/edit?id=${id}`}
            className="text-blue-500 hover:underline"
          >
            Edit
          </Link>
          <ConfirmDialog
            title="Delete Article"
            description={`Deleting "${title}" is permanent and cannot be undone. All related content will be removed.`}
            onConfirm={() => {
              console.log(`Deleting article with ID: ${id}`);
            }}
            trigger={
              <span className="text-red-500 hover:underline cursor-pointer">
                Delete
              </span>
            }
          />
        </div>
      );
    },
  },
];
