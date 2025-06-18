import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/layout/AppSidebar";
import AppHeader from "@/components/layout/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="h-min-screen w-full">
        <AppHeader title="Admin Panel" />
        {children}
      </main>
    </SidebarProvider>
  );
}
