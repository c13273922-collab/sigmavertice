'use client'

import { FolderKanban, Search, Filter, Plus, HandCoins, AlertTriangle, Clock, CheckCircle2, XCircle } from 'lucide-react'
import Link from 'next/link'

export default function CasosPage() {
  const casos = [
    { protocolo: 'CASO-0142', titulo: 'Investigação de suspeita de vazamento — Equipe AM', tipo: 'Interno', severidade: 'Alta', status: 'aberto', responsavel: 'Carlos Mendes', criado: '19/08/2026' },
    { protocolo: 'CASO-0141', titulo: 'Análise de denúncia anônima recebida', tipo: 'Denúncia', severidade: 'Média', status: 'analise', responsavel: '—', criado: '19/08/2026' },
    { protocolo: 'CASO-0140', titulo: 'Verificação de adiantamento de viagem', tipo: 'Financeiro', severidade: 'Normal', status: 'resolvido', responsavel: 'Ana Beatriz', criado: '17/08/2026' },
    { protocolo: 'CASO-0139', titulo: 'Revisão de procedimento de campo', tipo: 'Processo', severidade: 'Normal', status: 'fechado', responsavel: 'Rafael Costa', criado: '15/08/2026' },
  ]

  const badgeStatus = (s: string) => ({
    aberto: { txt: 'Aberto', cls: 'bg-red-500/15 text-red-700', chave: 'aberto' },
    analise: { txt: 'Em análise', cls: 'bg-amber-500/15 text-amber-700', chave: 'analise' },
    resolvido: { txt: 'Resolvido', cls: 'bg-emerald-500/15 text-emerald-700', chave: 'resolvido' },
    fechado: { txt: 'Fechado', cls: 'bg-slate-500/15 text-slate-700', chave: 'fechado' },
  }[s])

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-sigma-dourado to-sigma-douradoEscuro flex items-center justify-center shadow-gold">
              <FolderKanban className="w-6 h-6 text-sigma-azul" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-sigma-azul">Casos</h1>
              <p className="text-sm text-sigma-azul/60">Gestão de incidentes, denúncias e investigações</p>
            </div>
          </div>
        </div>
        <button className="px-4 py-2.5 rounded-lg bg-sigma-dourado text-sigma-azul text-sm font-bold hover:bg-sigma-douradoEscuro hover:text-white transition-colors flex items-center gap-2 self-start sm:self-auto shadow-gold">
          <Plus className="w-4 h-4" /> Abrir Caso
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div className="rounded-xl border border-sigma-azul/10 bg-white p-4 shadow-sm animate-fade-in-up" style={{ animationDelay: '0s' }}>
          <span className="text-[11px] uppercase tracking-wider font-bold text-red-700 bg-red-500/15 px-2 py-0.5 rounded-full">Abertos</span>
          <p className="text-2xl font-bold text-sigma-azul mt-2">7</p>
        </div>
        <div className="rounded-xl border border-sigma-azul/10 bg-white p-4 shadow-sm animate-fade-in-up" style={{ animationDelay: '0.05s' }}>
          <span className="text-[11px] uppercase tracking-wider font-bold text-amber-700 bg-amber-500/15 px-2 py-0.5 rounded-full">Em análise</span>
          <p className="text-2xl font-bold text-sigma-azul mt-2">12</p>
        </div>
        <div className="rounded-xl border border-sigma-azul/10 bg-white p-4 shadow-sm animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <span className="text-[11px] uppercase tracking-wider font-bold text-emerald-700 bg-emerald-500/15 px-2 py-0.5 rounded-full">Resolvidos</span>
          <p className="text-2xl font-bold text-sigma-azul mt-2">38</p>
        </div>
        <div className="rounded-xl border border-sigma-azul/10 bg-white p-4 shadow-sm animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
          <span className="text-[11px] uppercase tracking-wider font-bold text-slate-700 bg-slate-500/15 px-2 py-0.5 rounded-full">Fechados (mês)</span>
          <p className="text-2xl font-bold text-sigma-azul mt-2">24</p>
        </div>
      </div>

      <div className="rounded-2xl border border-sigma-azul/10 bg-white p-5 shadow-sm">
        <div className="flex flex-col md:flex-row gap-3 mb-5">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sigma-azul/40" />
            <input placeholder="Buscar CASO- ou palavra-chave..." className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-sigma-azul/15 text-sm focus:outline-none focus:ring-2 focus:ring-sigma-dourado/40" />
          </div>
          <button className="px-3.5 py-2.5 rounded-lg border border-sigma-azul/15 text-sigma-azul/70 hover:bg-sigma-azul-50 transition-colors flex items-center gap-2">
            <Filter className="w-4 h-4" /> Filtros
          </button>
        </div>

        <div className="overflow-x-auto rounded-xl border border-sigma-azul/10">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-sigma-azul-50 text-left text-xs uppercase tracking-wider text-sigma-azul/60">
                <th className="px-4 py-3 font-semibold">Protocolo</th>
                <th className="px-4 py-3 font-semibold">Título</th>
                <th className="px-4 py-3 font-semibold">Tipo</th>
                <th className="px-4 py-3 font-semibold">Severidade</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Responsável</th>
                <th className="px-4 py-3 font-semibold text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sigma-azul/5">
              {casos.map((c, i) => {
                const b = badgeStatus(c.status)
                return (
                  <tr key={c.protocolo} className="hover:bg-sigma-azul-50/40 transition-colors animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
                    <td className="px-4 py-3 font-mono text-xs font-bold text-sigma-douradoEscuro">{c.protocolo}</td>
                    <td className="px-4 py-3 font-medium text-sigma-azul max-w-sm truncate">{c.titulo}</td>
                    <td className="px-4 py-3 text-sigma-azul/75">{c.tipo}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                        c.severidade === 'Alta' ? 'bg-red-500/15 text-red-700' :
                        c.severidade === 'Média' ? 'bg-amber-500/15 text-amber-700' : 'bg-slate-500/15 text-slate-700'
                      }`}>{c.severidade}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-bold ${b.cls}`}>
                        {b.chave === 'aberto' && <AlertTriangle className="w-3 h-3" />}
                        {b.chave === 'analise' && <Clock className="w-3 h-3" />}
                        {b.chave === 'resolvido' && <CheckCircle2 className="w-3 h-3" />}
                        {b.chave === 'fechado' && <XCircle className="w-3 h-3" />}
                        {b.txt}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sigma-azul/75">{c.responsavel}</td>
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      {c.responsavel === '—' && (
                        <button className="mr-2 px-3 py-1.5 rounded-md bg-sigma-azul text-white text-[11px] font-bold hover:bg-sigma-azulEscuro transition-colors inline-flex items-center gap-1">
                          <HandCoins className="w-3 h-3" /> Assumir
                        </button>
                      )}
                      <Link href="#" className="text-xs font-semibold text-sigma-douradoEscuro hover:text-sigma-dourado transition-colors">
                        Ver →
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
