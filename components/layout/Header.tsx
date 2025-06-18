import { SidebarTrigger } from "../ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";

export default function AppHeader({ title }: { title: string }) {
  return (
    <header className="flex items-center justify-between p-4 border text-black">
      <div className="flex items-center space-x-4">
        <SidebarTrigger className="px-0" />
        <h1 className="text-xl font-bold">{title}</h1>
      </div>
      <div className="flex items-center space-x-2 font-bold">
        <Avatar>
          <AvatarImage src="/path/to/avatar.jpg" alt="User Avatar" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <Link href="/profile" className="text-sm hover:underline">
          Profile
        </Link>
      </div>
    </header>
  );
}
