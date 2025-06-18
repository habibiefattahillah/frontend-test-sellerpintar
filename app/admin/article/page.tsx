"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/common/DataTable";
import { articleColumn } from "./columns";
import { Article } from "@/types/article";
import { getArticles } from "@/lib/getArticles";
import { usePageTitle } from "@/context/PageTitleContext";

export default function ArticlePage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const { setTitle } = usePageTitle();

  useEffect(() => {
    setLoading(true);
    getArticles(page)
      .then((res) => {
        setArticles(res.data);
        setTotal(res.total);
      })
      .finally(() => setLoading(false));
  }, [page]);

  useEffect(() => {
    setTitle("Article");
  }, [setTitle]);

  return (
    <div className="p-6">
      <div className="bg-white shadow-md rounded-lg border py-6 space-y-4">
        <h1 className="text-lg font-semibold border-b pb-2 px-6">
          Total Articles: {total}
        </h1>
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <DataTable
            columns={articleColumn}
            data={articles}
            page={page}
            setPage={setPage}
            total={total}
          />
        )}
      </div>
    </div>
  );
}
