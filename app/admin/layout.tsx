// app/layout.tsx
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/layout/AppSidebar";
import AppHeader from "@/components/layout/Header";
import { PageTitleProvider } from "@/context/PageTitleContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <PageTitleProvider>
        <AppSidebar />
        <main className="w-full">
          <AppHeader />
          <div className="p-6 bg-gray-100 h-full">{children}</div>
        </main>
      </PageTitleProvider>
    </SidebarProvider>
  );
}
