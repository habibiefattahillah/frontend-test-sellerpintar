"use client";

import { useEffect, useState } from "react";
import { getUserById } from "@/lib/getUser";
import { User } from "@/types/user";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUserById("user1").then((res) => {
      setUser(res.data);
    });
  }, []);

  if (!user) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white rounded-lg shadow-md p-8 w-[400px] text-center space-y-6">
        <h2 className="text-xl font-semibold">User Profile</h2>

        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-xl font-bold">
            {user.username.charAt(0).toUpperCase()}
          </div>
        </div>

        <div className="space-y-3 text-left text-sm">
          <div className="flex justify-between">
            <span className="font-medium">Username :</span>
            <span>{user.username}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Role :</span>
            <span>{user.role}</span>
          </div>
        </div>

        <Link href="/admin/article">
          <Button className="w-full" onClick={() => alert("OT")}>
            Back to dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}
