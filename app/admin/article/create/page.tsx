"use client";

import { Button } from "@/components/ui/button";

import { ArrowLeft } from "lucide-react";
import { useState } from "react";

import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import ArticleForm from "@/components/article/ArticleForm";
import { ArticleFormValues } from "@/types/article";

export default function ArticleCreate() {
  const [thumbnail, setThumbnail] = useState<File | null>(null);

  function onSubmit(values: ArticleFormValues) {
    alert("Article created: " + JSON.stringify(values));
    if (thumbnail) {
      console.log("Thumbnail file:", thumbnail);
    }
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
            window.location.href = parentPath;
          }}
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-lg font-semibold">Create Article</span>
        </Button>

        <ArticleForm
          onSubmit={onSubmit}
          initialValues={{
            title: "",
            category: "",
            content: "",
          }}
          actions={
            <>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  const parentPath =
                    window.location.pathname.replace(/\/[^/]+$/, "") || "/";
                  window.location.href = parentPath;
                }}
              >
                Cancel
              </Button>
              <Button type="button" variant="outline">
                Preview
              </Button>
              <Button type="submit">Upload</Button>
            </>
          }
        />
      </div>
    </div>
  );
}
