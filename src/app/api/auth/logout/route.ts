import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST() {
  try {
    const supabase = createClient();
    await supabase.auth.signOut();
  } catch {
  }

  const resposta = NextResponse.json({ sucesso: true, redirecionar: "/login" });
  resposta.cookies.delete("sb-access-token");
  resposta.cookies.delete("sb-refresh-token");
  return resposta;
}

export async function GET() {
  return POST();
}
