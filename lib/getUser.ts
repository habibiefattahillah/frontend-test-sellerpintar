import { userResponseSchema } from "@/types/user";

export const dummyUser = {
  id: "user1",
  username: "user1",
  role: "User",
};

export async function getUserById(id: string) {
  try {
    const res = await fetch(`https://test-fe.mysellerpintar.com/profile`);

    if (!res.ok) throw new Error("Failed to fetch user");

    const json = await res.json();
    return userResponseSchema.parse(json);
  } catch (err) {
    console.error("Using dummy data due to fetch/Zod error:", err);
    return {
      data: dummyUser,
    };
  }
}
