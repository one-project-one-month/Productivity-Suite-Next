"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const getUserSession = async () => {
  return await auth.api.getSession({
    headers: await headers(),
  });
};

export type Session = Awaited<ReturnType<typeof getUserSession>> | null;

export const checkSessionAndRedirect = async (type: "PROTECTED" | "AUTH") => {
  const session = await getUserSession();
  if (type === "PROTECTED" && !session) {
    redirect("/auth/sign-in");
  } else if (session) {
    redirect("/");
  }
};
