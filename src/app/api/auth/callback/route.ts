import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(req: NextRequest) {
  const { searchParams, origin } = new URL(req.url);
  const code = searchParams.get("code");
  const proximo = searchParams.get("next") || "/dashboard";

  if (code) {
    try {
      const supabase = createClient();
      await supabase.auth.exchangeCodeForSession(code);
    } catch {
    }
  }

  return NextResponse.redirect(`${origin}${proximo}`);
}
