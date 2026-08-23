'use client'

import { Map, Pin, Users, Building2, FileText, AlertTriangle } from 'lucide-react'

export default function MapaAmazonasPage() {
  const municipiosChave = [
    { nome: 'Manaus', funcionarios: 127, online: 89, status: 'online' },
    { nome: 'Tefé', funcionarios: 32, online: 18, status: 'online' },
    { nome: 'Parintins', funcionarios: 28, online: 12, status: 'ausente' },
    { nome: 'Tabatinga', funcionarios: 24, online: 9, status: 'online' },
    { nome: 'Manacapuru', funcionarios: 19, online: 7, status: 'offline' },
    { nome: 'Itacoatiara', funcionarios: 15, online: 6, status: 'online' },
  ]

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-sigma-dourado to-sigma-douradoEscuro flex items-center justify-center shadow-gold">
              <Map className="w-6 h-6 text-sigma-azul" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-sigma-azul">Mapa do Amazonas</h1>
              <p className="text-sm text-sigma-azul/60">62 municípios monitorados em tempo real</p>
            </div>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button className="px-4 py-2 rounded-lg bg-sigma-azul text-white text-sm font-medium hover:bg-sigma-azulEscuro transition-colors flex items-center gap-2">
            <Pin className="w-4 h-4" /> Modo Simulação
          </button>
        </div>
      </div>

      {/* 4 CARDS HARDCODED INLINE (NENHUM MAPA ICONES) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-xl border border-sigma-azul/10 bg-white p-4 shadow-sm animate-fade-in-up" style={{ animationDelay: '0s' }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase tracking-wider text-sigma-azul/50 font-semibold">Funcionários</span>
            <Users className="w-4 h-4 text-sigma-azul" />
          </div>
          <p className="text-2xl font-bold text-sigma-azul">312</p>
        </div>

        <div className="rounded-xl border border-sigma-azul/10 bg-white p-4 shadow-sm animate-fade-in-up" style={{ animationDelay: '0.05s' }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase tracking-wider text-sigma-azul/50 font-semibold">Online agora</span>
            <Pin className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-bold text-sigma-azul">176</p>
        </div>

        <div className="rounded-xl border border-sigma-azul/10 bg-white p-4 shadow-sm animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase tracking-wider text-sigma-azul/50 font-semibold">Unidades</span>
            <Building2 className="w-4 h-4 text-sigma-douradoEscuro" />
          </div>
          <p className="text-2xl font-bold text-sigma-azul">5</p>
        </div>

        <div className="rounded-xl border border-sigma-azul/10 bg-white p-4 shadow-sm animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase tracking-wider text-sigma-azul/50 font-semibold">Municípios cobertos</span>
            <Map className="w-4 h-4 text-sigma-azulEscuro" />
          </div>
          <p className="text-2xl font-bold text-sigma-azul">62</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl border border-sigma-azul/10 bg-gradient-to-br from-sigma-azul-50 to-white p-6 shadow-sm min-h-[480px] flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-sigma-dourado/15 flex items-center justify-center">
              <Map className="w-10 h-10 text-sigma-douradoEscuro" />
            </div>
            <h2 className="text-xl font-bold text-sigma-azul mb-2">Mapa Interativo do Amazonas</h2>
            <p className="text-sm text-sigma-azul/60 max-w-md mb-4">
              Mapa SVG com 62 municípios e pinos pulsantes de presença real será carregado aqui assim que os dados das tabelas <code className="bg-sigma-azul-100 px-1.5 py-0.5 rounded text-xs">municipios</code> e <code className="bg-sigma-azul-100 px-1.5 py-0.5 rounded text-xs">municipios_metricas</code> forem vinculados via Supabase.
            </p>
            <div className="inline-flex gap-2 text-xs">
              <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-700 font-semibold">🟢 Online</span>
              <span className="px-3 py-1 rounded-full bg-amber-500/15 text-amber-700 font-semibold">🟡 Ausente</span>
              <span className="px-3 py-1 rounded-full bg-slate-500/15 text-slate-700 font-semibold">⚪ Offline</span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-sigma-azul/10 bg-white p-5 shadow-sm">
          <h3 className="text-sm font-bold text-sigma-azul uppercase tracking-wider mb-4 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-sigma-douradoEscuro" /> Top Municípios
          </h3>
          <div className="space-y-3">
            {municipiosChave.map((m, i) => (
              <div key={m.nome} className="flex items-center gap-3 p-3 rounded-xl hover:bg-sigma-azul-50 transition-colors animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
                <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${m.status === 'online' ? 'bg-emerald-500' : m.status === 'ausente' ? 'bg-amber-500' : 'bg-slate-400'} ${m.status === 'online' ? 'animate-pulse-soft' : ''}`} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-sigma-azul truncate">{m.nome}</p>
                  <p className="text-xs text-sigma-azul/55">{m.online}/{m.funcionarios} online</p>
                </div>
                <FileText className="w-4 h-4 text-sigma-azul/30" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
