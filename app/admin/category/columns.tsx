"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Category } from "@/types/category";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import FormDialog from "@/components/common/FormDialog";
import { useState } from "react";

export const categoryColumn: ColumnDef<Category>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => (
      <div className="text-sm text-muted-foreground">
        {new Date(row.getValue("createdAt")).toLocaleDateString()}
      </div>
    ),
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => {
      const id = row.getValue("id");
      const name = row.getValue("name");

      const [isEditOpen, setIsEditOpen] = useState(false);

      return (
        <div className="flex justify-center items-center space-x-2">
          <span
            className="text-blue-500 hover:underline cursor-pointer"
            onClick={() => setIsEditOpen(true)}
          >
            Edit
          </span>

          <FormDialog
            title="Edit Category"
            description="Update the name of the category."
            submitLabel="Save"
            isOpen={isEditOpen}
            onOpenChange={setIsEditOpen}
            defaultName={name as string}
            onSubmit={(data) => {
              console.log(`Updating category ${id} to ${data.name}`);
              setIsEditOpen(false);
            }}
          />

          <ConfirmDialog
            title="Delete Category"
            description={`Delete category "${name}"? This will remove it from master data permanently.`}
            onConfirm={() => {
              console.log(`Deleting category with ID: ${id}`);
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
