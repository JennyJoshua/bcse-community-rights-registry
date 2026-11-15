"use server";

import { clearDemoSession } from "@/lib/demo-auth";
import { redirect } from "next/navigation";

export async function signOutAction() {
  await clearDemoSession();
  redirect("/");
}
