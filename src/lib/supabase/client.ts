import { createBrowserClient } from "@supabase/ssr";

function removerBarraFinal(url: string | undefined): string {
  if (!url) return "";
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

export function createClient() {
  const SUPABASE_URL = removerBarraFinal(process.env.NEXT_PUBLIC_SUPABASE_URL);
  const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || "";

  return createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}
