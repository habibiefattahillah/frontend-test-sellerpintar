"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import ArticleForm from "@/components/article/ArticleForm";
import { ArticleFormValues } from "@/types/article";
import { getArticleById } from "@/lib/getArticles";

export default function ArticleEdit() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");

  const [initialValues, setInitialValues] = useState<ArticleFormValues | null>(
    null
  );
  const [thumbnail, setThumbnail] = useState<File | null>(null);

  useEffect(() => {
    if (id) {
      getArticleById(id).then((data) => {
        if (data) {
          setInitialValues({
            title: data.title,
            category: data.category.name,
            content: data.content,
          });
        }
      });
    }
  }, [id]);

  function onSubmit(values: ArticleFormValues) {
    alert("Article updated: " + JSON.stringify(values));
  }

  if (!initialValues) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6">
      <div className="bg-white shadow-md rounded-lg border py-6 space-y-4">
        <Button
          variant="ghost"
          className="flex items-center space-x-2 mx-6"
          onClick={() => {
            const parentPath =
              window.location.pathname.replace(/\/[^/]+$/, "") || "/";
            router.push(parentPath);
          }}
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-lg font-semibold">Edit Article</span>
        </Button>

        <ArticleForm
          onSubmit={onSubmit}
          initialValues={initialValues}
          actions={
            <>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </>
          }
        />
      </div>
    </div>
  );
}
