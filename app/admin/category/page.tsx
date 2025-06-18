"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/common/DataTable";
import { categoryColumn } from "./columns";
import { Category } from "@/types/category";
import { getCategories } from "@/lib/getCategories";
import { usePageTitle } from "@/context/PageTitleContext";
import FormDialog from "@/components/common/FormDialog";

export default function CategoryPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [editDialog, setEditDialog] = useState<{
    open: boolean;
    category?: Category;
  }>({ open: false });

  const { setTitle } = usePageTitle();

  useEffect(() => {
    setLoading(true);
    getCategories(page)
      .then((res) => {
        setCategories(res.data);
        setTotal(res.total);
      })
      .finally(() => setLoading(false));
  }, [page]);

  useEffect(() => {
    setTitle("Category");
  }, [setTitle]);

  return (
    <div className="p-6">
      <div className="bg-white shadow-md rounded-lg border py-6 space-y-4">
        <h1 className="text-lg font-semibold border-b pb-2 px-6">
          Total Categories: {total}
        </h1>

        {showDialog && (
          <FormDialog
            title="Add Category"
            description="Enter a name for the new category."
            isOpen={showDialog}
            onOpenChange={setShowDialog}
            onSubmit={(data) => {
              console.log("Creating category:", data.name);
              setShowDialog(false);
            }}
            submitLabel="Create"
          />
        )}

        {editDialog.open && editDialog.category && (
          <FormDialog
            title="Edit Category"
            description="Update the name of the category."
            isOpen={editDialog.open}
            onOpenChange={(open) =>
              setEditDialog((prev) => ({ ...prev, open }))
            }
            onSubmit={(data) => {
              console.log(
                `Updating category ${editDialog.category?.id} with name:`,
                data.name
              );
              setEditDialog({ open: false });
            }}
            submitLabel="Save Changes"
            defaultName={editDialog.category.name}
          />
        )}

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <>
            <DataTable
              columns={categoryColumn}
              data={categories}
              page={page}
              setPage={setPage}
              total={total}
              addButton={{
                text: "Add Category",
                onClick: () => {
                  setShowDialog(true);
                },
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}
