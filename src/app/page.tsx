import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function RootHome() {
  const supabase = createClient();
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) redirect("/dashboard");
  } catch {
  }
  redirect("/login");
}
