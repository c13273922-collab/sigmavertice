'use client'

import { useState, useRef, useEffect } from 'react'
import { ShieldCheck, ArrowLeft, RefreshCw } from 'lucide-react'

export default function MFAPage() {
  const [codigo, setCodigo] = useState<string[]>(['', '', '', '', '', ''])
  const [isLoading, setIsLoading] = useState(false)
  const inputRefs = useRef<Array<HTMLInputElement | null>>([])

  useEffect(() => {
    inputRefs.current[0]?.focus()
  }, [])

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return

    const novoCodigo = [...codigo]
    novoCodigo[index] = value.slice(-1)
    setCodigo(novoCodigo)

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }

    if (novoCodigo.every(d => d !== '') && novoCodigo.join('').length === 6) {
      handleVerificar(novoCodigo.join(''))
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !codigo[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const texto = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    if (!texto) return

    const novoCodigo = [...codigo]
    for (let i = 0; i < texto.length && i < 6; i++) {
      novoCodigo[i] = texto[i]
    }
    setCodigo(novoCodigo)

    const proximoIndex = Math.min(texto.length, 5)
    inputRefs.current[proximoIndex]?.focus()

    if (novoCodigo.every(d => d !== '')) {
      handleVerificar(novoCodigo.join(''))
    }
  }

  const handleVerificar = async (_code: string) => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      window.location.href = '/dashboard'
    }, 1000)
  }

  const handleReenviar = () => {
    setCodigo(['', '', '', '', '', ''])
    inputRefs.current[0]?.focus()
  }

  return (
    <main className="min-h-screen bg-gradient-sigma relative overflow-hidden flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-5%] right-[-5%] w-[400px] h-[400px] rounded-full bg-sigma-dourado/8 blur-3xl animate-float" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-sigma-dourado/5 blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 w-full max-w-lg opacity-0 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <button
          onClick={() => window.history.back()}
          className="mb-6 flex items-center gap-2 text-white/60 hover:text-sigma-dourado transition-colors duration-200 opacity-0 animate-fade-in-down"
          style={{ animationDelay: '0.2s' }}
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Voltar para login</span>
        </button>

        <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl p-8 md:p-10">
          <div className="flex flex-col items-center mb-8">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-sigma-dourado to-sigma-douradoEscuro flex items-center justify-center shadow-gold mb-5 opacity-0 animate-fade-in-down" style={{ animationDelay: '0.3s' }}>
              <ShieldCheck className="w-10 h-10 text-sigma-azul" strokeWidth={2.5} />
            </div>
            <div className="text-center opacity-0 animate-fade-in-up" style={{ animationDelay: '0.45s' }}>
              <h1 className="text-2xl font-bold text-white mb-2">
                Código de Autenticação
              </h1>
              <p className="text-sm text-white/55">
                Digite o código de 6 dígitos enviado para seu dispositivo
              </p>
            </div>
          </div>

          <div
            className="flex justify-center gap-2 md:gap-3 mb-8 opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0.6s' }}
            onPaste={handlePaste}
          >
            {codigo.map((digito, index) => (
              <input
                key={index}
                ref={(el) => { inputRefs.current[index] = el }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digito}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                disabled={isLoading}
                className="w-12 h-14 md:w-14 md:h-16 text-center text-2xl font-bold bg-white/5 border-2 border-white/15 rounded-xl text-white focus:outline-none focus:border-sigma-dourado focus:ring-2 focus:ring-sigma-dourado/30 transition-all duration-300 disabled:opacity-50"
                autoComplete="one-time-code"
              />
            ))}
          </div>

          {isLoading && (
            <div className="flex justify-center mb-6 opacity-0 animate-fade-in">
              <div className="w-6 h-6 border-2 border-sigma-dourado/30 border-t-sigma-dourado rounded-full animate-spin" />
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.75s' }}>
            <button
              onClick={handleReenviar}
              disabled={isLoading}
              className="flex-1 py-3 px-6 bg-white/5 border border-white/15 text-white/80 font-medium rounded-xl hover:bg-white/10 hover:border-white/25 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Reenviar código
            </button>
            <button
              onClick={() => handleVerificar(codigo.join(''))}
              disabled={codigo.some(d => d === '') || isLoading}
              className="flex-1 py-3 px-6 bg-gradient-to-r from-sigma-dourado via-sigma-douradoClaro to-sigma-dourado text-sigma-azul font-bold rounded-xl shadow-gold hover:shadow-lg hover:shadow-sigma-dourado/30 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
            >
              Verificar
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 text-center opacity-0 animate-fade-in" style={{ animationDelay: '0.9s' }}>
            <p className="text-xs text-white/40">
              Verificação em duas etapas · Segurança Sigma Vértice
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
