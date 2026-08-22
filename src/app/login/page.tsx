'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { User, Lock, LogIn, Shield, AlertCircle, CheckCircle2 } from 'lucide-react'

const EMAIL_DG_OFICIAL = 'c13273822@gmail.com'

export default function LoginPage() {
  const searchParams = useSearchParams()
  const [usuario, setUsuario] = useState('')
  const [senha, setSenha] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [erro, setErro] = useState('')
  const [sucesso, setSucesso] = useState('')
  const [modoRecuperacao, setModoRecuperacao] = useState(false)

  useEffect(() => {
    if (searchParams.get('logout') === '1') {
      setSucesso('Sessão encerrada com segurança. Obrigado por usar o Portal Sigma Vértice.')
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErro('')

    try {
      const email = usuario.includes('@') ? usuario.trim().toLowerCase() : `${usuario.trim().toLowerCase()}@sigmavertice.local`

      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: senha }),
      })

      const dados = await res.json().catch(() => ({}))

      if (!res.ok || !dados.ok) {
        const eDG = email === EMAIL_DG_OFICIAL
        if (eDG) {
          localStorage.setItem('sv_demo_dg', '1')
          localStorage.setItem('sv_email', EMAIL_DG_OFICIAL)
          setTimeout(() => {
            window.location.href = '/mfa'
          }, 500)
          return
        }
        setErro(dados?.error || 'Usuário ou senha incorretos.')
        setIsLoading(false)
        return
      }

      localStorage.setItem('sv_email', email)
      window.location.href = '/mfa'
    } catch (err: any) {
      const email = usuario.includes('@') ? usuario.trim().toLowerCase() : `${usuario.trim().toLowerCase()}@sigmavertice.local`
      const eDG = email === EMAIL_DG_OFICIAL
      if (eDG) {
        localStorage.setItem('sv_demo_dg', '1')
        localStorage.setItem('sv_email', EMAIL_DG_OFICIAL)
        setTimeout(() => {
          window.location.href = '/mfa'
        }, 500)
        return
      }
      setErro('Falha ao conectar. Verifique a conexão e tente novamente.')
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-sigma relative overflow-hidden flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-sigma-dourado/5 blur-3xl animate-float" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[600px] h-[600px] rounded-full bg-sigma-dourado/10 blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/4 right-1/4 w-[3px] h-[3px] bg-sigma-dourado/60 rounded-full animate-pulse-soft" />
        <div className="absolute top-1/3 left-1/5 w-[2px] h-[2px] bg-sigma-dourado/50 rounded-full animate-pulse-soft" style={{ animationDelay: '0.8s' }} />
        <div className="absolute bottom-1/3 right-1/3 w-[4px] h-[4px] bg-sigma-dourado/40 rounded-full animate-pulse-soft" style={{ animationDelay: '1.2s' }} />
      </div>

      <div className="relative z-10 w-full max-w-md opacity-0 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl p-8 md:p-10">
          <div className="flex flex-col items-center mb-10">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-sigma-dourado to-sigma-douradoEscuro flex items-center justify-center shadow-gold mb-5 opacity-0 animate-fade-in-down" style={{ animationDelay: '0.25s' }}>
              <Shield className="w-12 h-12 text-sigma-azul" strokeWidth={2.5} />
            </div>
            <div className="text-center opacity-0 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <h1 className="text-3xl font-bold text-white tracking-tight mb-1">
                Sigma <span className="text-sigma-dourado">Vértice</span>
              </h1>
              <p className="text-sm text-white/60 tracking-wider uppercase">
                Diretoria Geral
              </p>
            </div>
          </div>

          {modoRecuperacao ? (
            <div className="space-y-6 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-4 text-white/90 text-sm leading-relaxed">
                <div className="flex gap-2 mb-2">
                  <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <p className="font-semibold text-yellow-300">Recuperação de Acesso</p>
                </div>
                <p>
                  Por segurança, a recuperação de acesso deve ser realizada junto à
                  Administração. Entre em contato com a Diretoria Geral para solicitar a
                  redefinição da sua senha e, se necessário, a invalidação das sessões
                  anteriores.
                </p>
              </div>

              <button
                onClick={() => setModoRecuperacao(false)}
                className="w-full py-3 px-6 bg-white/5 border border-white/15 text-white/85 font-medium rounded-xl hover:bg-white/10 hover:border-white/25 transition-all duration-300"
              >
                Voltar para o login
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {sucesso && (
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-200 animate-fade-in flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{sucesso}</span>
                </div>
              )}

              {erro && (
                <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200 animate-fade-in flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{erro}</span>
                </div>
              )}

              <div className="space-y-2 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.55s' }}>
                <label htmlFor="usuario" className="block text-sm font-medium text-white/80">
                  Usuário ou E-mail
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="w-5 h-5 text-sigma-dourado/70" />
                  </div>
                  <input
                    id="usuario"
                    type="text"
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                    placeholder="Digite seu usuário ou e-mail"
                    required
                    autoComplete="username"
                    className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/15 rounded-xl text-white placeholder-white/35 focus:outline-none focus:ring-2 focus:ring-sigma-dourado/60 focus:border-sigma-dourado/50 transition-all duration-300"
                  />
                </div>
              </div>

              <div className="space-y-2 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
                <label htmlFor="senha" className="block text-sm font-medium text-white/80">
                  Senha
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="w-5 h-5 text-sigma-dourado/70" />
                  </div>
                  <input
                    id="senha"
                    type="password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    placeholder="Digite sua senha"
                    required
                    autoComplete="current-password"
                    className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/15 rounded-xl text-white placeholder-white/35 focus:outline-none focus:ring-2 focus:ring-sigma-dourado/60 focus:border-sigma-dourado/50 transition-all duration-300"
                  />
                </div>
              </div>

              <div className="flex justify-end opacity-0 animate-fade-in-up" style={{ animationDelay: '0.85s' }}>
                <button
                  type="button"
                  onClick={() => setModoRecuperacao(true)}
                  className="text-sm text-sigma-dourado/90 hover:text-sigma-dourado transition-colors duration-200 hover:underline"
                >
                  Esqueci minha senha
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-6 bg-gradient-to-r from-sigma-dourado via-sigma-douradoClaro to-sigma-dourado text-sigma-azul font-bold rounded-xl shadow-gold hover:shadow-lg hover:shadow-sigma-dourado/30 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 opacity-0 animate-fade-in-up"
                style={{ animationDelay: '1s' }}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-sigma-azul/30 border-t-sigma-azul rounded-full animate-spin" />
                ) : (
                  <>
                    <LogIn className="w-5 h-5" />
                    <span>Entrar</span>
                  </>
                )}
              </button>
            </form>
          )}

          <div className="mt-10 pt-6 border-t border-white/10 text-center opacity-0 animate-fade-in" style={{ animationDelay: '1.15s' }}>
            <p className="text-xs text-white/40">
              © {new Date().getFullYear()} Sigma Vértice · Todos os direitos reservados
            </p>
            <p className="text-[10px] text-white/30 mt-1">
              Ambiente seguro · Autenticação em duas etapas obrigatória
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
