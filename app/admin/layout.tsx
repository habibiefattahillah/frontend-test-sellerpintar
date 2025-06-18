import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/layout/AppSidebar";
import AppHeader from "@/components/layout/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <AppHeader title="Admin Panel" />
        <div className="p-6 bg-gray-100 h-full">{children}</div>
      </main>
    </SidebarProvider>
  );
}
