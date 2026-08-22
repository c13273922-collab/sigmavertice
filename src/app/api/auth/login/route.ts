import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { email, senha, usuario } = body || {};

    const credencialEmail = email || (usuario?.includes("@") ? usuario : `${usuario}@sigmavertice.local`);
    const credencialSenha = senha || body?.password;

    if (!credencialEmail || !credencialSenha) {
      return NextResponse.json(
        { sucesso: false, erro: "Usuário e senha são obrigatórios." },
        { status: 400 }
      );
    }

    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credencialEmail,
      password: credencialSenha,
    });

    if (error || !data.user) {
      return NextResponse.json(
        { sucesso: false, erro: error?.message || "Credenciais inválidas." },
        { status: 401 }
      );
    }

    return NextResponse.json({
      sucesso: true,
      proximoPasso: "mfa",
      usuario: {
        id: data.user.id,
        email: data.user.email,
        possuiMfa: !!data.user.factors?.length,
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { sucesso: false, erro: err?.message || "Erro interno ao autenticar." },
      { status: 500 }
    );
  }
}
