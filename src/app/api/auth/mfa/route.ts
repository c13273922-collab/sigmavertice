import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { codigo } = body || {};
    const codigoStr = String(codigo || "").trim();

    if (!/^\d{6}$/.test(codigoStr)) {
      return NextResponse.json(
        { sucesso: false, erro: "Informe um código de 6 dígitos." },
        { status: 400 }
      );
    }

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { sucesso: false, erro: "Sessão inválida. Refaça o login." },
        { status: 401 }
      );
    }

    return NextResponse.json({
      sucesso: true,
      redirecionar: "/dashboard",
    });
  } catch (err: any) {
    return NextResponse.json(
      { sucesso: false, erro: err?.message || "Erro ao validar código." },
      { status: 500 }
    );
  }
}
