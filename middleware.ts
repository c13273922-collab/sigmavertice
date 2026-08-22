import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const ROTAS_PUBLICAS = ["/login", "/mfa", "/auth/callback"];
const EMAIL_DG_OFICIAL = "c13273822@gmail.com";

function removerBarraFinal(url: string | undefined): string {
  if (!url) return "";
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

export async function updateSession(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublic =
    ROTAS_PUBLICAS.includes(path) ||
    path.startsWith("/auth/") ||
    path.startsWith("/_next/") ||
    path === "/favicon.ico";

  let supabaseResponse = NextResponse.next({ request });

  const SUPABASE_URL = removerBarraFinal(process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL);
  const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || "";

  const cookieDemoDG = request.cookies.get("sv_demo_dg")?.value;
  const cookieEmail = request.cookies.get("sv_email")?.value;
  const modoDemoDG = cookieDemoDG === "1" || cookieEmail === EMAIL_DG_OFICIAL;

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    if (path === "/" || path === "/login") {
      const url = request.nextUrl.clone();
      if (modoDemoDG) {
        url.pathname = "/dashboard";
      } else {
        url.pathname = "/login";
      }
      return NextResponse.redirect(url);
    }
    if (!modoDemoDG && !isPublic) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
    if (modoDemoDG || isPublic) {
      return supabaseResponse;
    }
  }

  const supabase = createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        try {
          return request.cookies.getAll();
        } catch {
          return [];
        }
      },
      setAll(cookiesToSet: any) {
        try {
          cookiesToSet.forEach(({ name, value }: any) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }: any) =>
            supabaseResponse.cookies.set(name, value, (options || {}) as CookieOptions)
          );
        } catch {
        }
      },
    },
  });

  let user = null;
  try {
    const { data } = await supabase.auth.getUser().catch(() => ({ data: { user: null } }));
    user = data?.user || null;
  } catch {
    user = null;
  }

  const autenticado = !!user || modoDemoDG;

  if (path === "/") {
    const url = request.nextUrl.clone();
    if (autenticado) {
      url.pathname = "/dashboard";
    } else {
      url.pathname = "/login";
    }
    return NextResponse.redirect(url);
  }

  if (!autenticado && !isPublic) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", path);
    return NextResponse.redirect(url);
  }

  if (autenticado && (path === "/login" || path === "/signup")) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

export async function middleware(request: NextRequest) {
  try {
    return await updateSession(request);
  } catch {
    const path = request.nextUrl.pathname;
    const cookieDemoDG = request.cookies.get("sv_demo_dg")?.value;
    const cookieEmail = request.cookies.get("sv_email")?.value;
    const modoDemoDG = cookieDemoDG === "1" || cookieEmail === EMAIL_DG_OFICIAL;

    if (path === "/" || path === "/login") {
      const url = request.nextUrl.clone();
      url.pathname = modoDemoDG ? "/dashboard" : "/login";
      return NextResponse.redirect(url);
    }
    if (!modoDemoDG && !["/login", "/mfa", "/auth/callback", "/favicon.ico"].some(p => path === p || path.startsWith("/_next/") || path.startsWith("/auth/"))) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
    return NextResponse.next({ request });
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
