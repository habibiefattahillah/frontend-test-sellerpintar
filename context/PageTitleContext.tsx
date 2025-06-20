"use client";
import { createContext, useContext, useState } from "react";

const PageTitleContext = createContext<{
  title: string;
  setTitle: (title: string) => void;
}>({
  title: "",
  setTitle: () => {},
});

export const usePageTitle = () => useContext(PageTitleContext);

export function PageTitleProvider({ children }: { children: React.ReactNode }) {
  const [title, setTitle] = useState("");
  return (
    <PageTitleContext.Provider value={{ title, setTitle }}>
      {children}
    </PageTitleContext.Provider>
  );
}
