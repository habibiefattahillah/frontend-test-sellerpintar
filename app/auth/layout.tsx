import { ReactNode } from "react";
import AuthCard from "@/components/auth/AuthCard";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white sm:bg-gray-100 p-4">
      <div className="w-full max-w-md md:max-w-lg">
        <AuthCard>{children}</AuthCard>
      </div>
    </div>
  );
}
