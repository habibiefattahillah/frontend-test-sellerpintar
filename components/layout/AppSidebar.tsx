import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { LogoDark } from "../icons/Logo";
import { Newspaper, Folder, LogOut } from "lucide-react";
import Link from "next/link";

const items = [
  {
    title: "Articles",
    url: "/admin/article",
    icon: Newspaper,
  },
  {
    title: "Categories",
    url: "/admin/category",
    icon: Folder,
  },
  {
    title: "Logout",
    url: "/admin/logout",
    icon: LogOut,
  },
];

export default function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="pt-8 px-4 bg-primary">
        <LogoDark className="w-32" />
      </SidebarHeader>
      <SidebarContent className="px-4 bg-primary">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="flex items-center gap-2 text-primary-foreground rounded py-2 hover:text-primary-foreground hover:bg-primary-foreground/20"
                  >
                    <Link href={item.url}>
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
