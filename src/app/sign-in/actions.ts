"use server";

import { redirect } from "next/navigation";
import { createDemoSession } from "@/lib/demo-auth";

export async function signInAction(formData: FormData) {
  const userId = formData.get("userId");
  if (typeof userId !== "string") redirect("/sign-in?error=invalid");
  try {
    await createDemoSession(userId);
  } catch {
    redirect("/sign-in?error=setup");
  }
  redirect("/app");
}
