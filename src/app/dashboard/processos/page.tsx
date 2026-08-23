'use client'

import { FileText, Plus, Search, Filter, Clock, UserCheck, CircleDot, HandCoins, User } from 'lucide-react'
import Link from 'next/link'

export default function ProcessosPage() {
  const processos = [
    { protocolo: 'PROC-0281', titulo: 'Abertura de novo processo de viagem TAB-MA-001', responsavel: 'Ana Beatriz', status: 'analise', prioridade: 'Alta', criado: '19/08/2026' },
    { protocolo: 'PROC-0280', titulo: 'Revisão de contrato de unidade Tefé', responsavel: '—', status: 'disponivel', prioridade: 'Média', criado: '19/08/2026' },
    { protocolo: 'PROC-0279', titulo: 'Regularização documental de agente de campo', responsavel: 'Carlos Mendes', status: 'aprovacao', prioridade: 'Alta', criado: '18/08/2026' },
    { protocolo: 'PROC-0278', titulo: 'Relatório de execução de operação', responsavel: 'Rafael Costa', status: 'concluido', prioridade: 'Normal', criado: '18/08/2026' },
  ]

  const badgeStatus = (s: string) => ({
    analise: { txt: 'Em análise', cls: 'bg-amber-500/15 text-amber-700' },
    disponivel: { txt: 'Disponível', cls: 'bg-blue-500/15 text-blue-700' },
    aprovacao: { txt: 'Aprovação DG', cls: 'bg-purple-500/15 text-purple-700' },
    concluido: { txt: 'Concluído', cls: 'bg-emerald-500/15 text-emerald-700' },
  }[s] || { txt: s, cls: 'bg-slate-100 text-slate-700' })

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-sigma-dourado to-sigma-douradoEscuro flex items-center justify-center shadow-gold">
              <FileText className="w-6 h-6 text-sigma-azul" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-sigma-azul">Processos</h1>
              <p className="text-sm text-sigma-azul/60">Workflow de protocolos, atribuição e aprovações</p>
            </div>
          </div>
        </div>
        <button className="px-4 py-2.5 rounded-lg bg-sigma-dourado text-sigma-azul text-sm font-bold hover:bg-sigma-douradoEscuro hover:text-white transition-colors flex items-center gap-2 self-start sm:self-auto shadow-gold">
          <Plus className="w-4 h-4" /> Novo Processo
        </button>
      </div>

      {/* 4 CARDS STATUS HARDCODED INLINE */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-xl border border-sigma-azul/10 bg-white p-4 shadow-sm animate-fade-in-up" style={{ animationDelay: '0s' }}>
          <div className="flex items-center justify-between mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-500/15 text-blue-700">Abertos</span>
            <CircleDot className="w-4 h-4 text-sigma-azul/50" />
          </div>
          <p className="text-2xl font-bold text-sigma-azul">42</p>
        </div>

        <div className="rounded-xl border border-sigma-azul/10 bg-white p-4 shadow-sm animate-fade-in-up" style={{ animationDelay: '0.05s' }}>
          <div className="flex items-center justify-between mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/15 text-amber-700">Em análise</span>
            <Clock className="w-4 h-4 text-sigma-azul/50" />
          </div>
          <p className="text-2xl font-bold text-sigma-azul">28</p>
        </div>

        <div className="rounded-xl border border-sigma-azul/10 bg-white p-4 shadow-sm animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center justify-between mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-500/15 text-purple-700">Aguardando aprovação</span>
            <UserCheck className="w-4 h-4 text-sigma-azul/50" />
          </div>
          <p className="text-2xl font-bold text-sigma-azul">11</p>
        </div>

        <div className="rounded-xl border border-sigma-azul/10 bg-white p-4 shadow-sm animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
          <div className="flex items-center justify-between mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-700">Concluídos (mês)</span>
            <FileText className="w-4 h-4 text-sigma-azul/50" />
          </div>
          <p className="text-2xl font-bold text-sigma-azul">67</p>
        </div>
      </div>

      <div className="rounded-2xl border border-sigma-azul/10 bg-white p-5 shadow-sm">
        <div className="flex flex-col md:flex-row gap-3 mb-5">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sigma-azul/40" />
            <input placeholder="Buscar PROC- ou título..." className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-sigma-azul/15 text-sm focus:outline-none focus:ring-2 focus:ring-sigma-dourado/40" />
          </div>
          <button className="px-3.5 py-2.5 rounded-lg border border-sigma-azul/15 text-sigma-azul/70 hover:bg-sigma-azul-50 transition-colors flex items-center gap-2">
            <Filter className="w-4 h-4" /> Filtros
          </button>
        </div>

        <div className="space-y-3">
          {processos.map((p, i) => {
            const b = badgeStatus(p.status)
            return (
              <div key={p.protocolo} className="rounded-xl border border-sigma-azul/10 p-4 hover:shadow-md hover:border-sigma-dourado/30 transition-all animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1.5">
                      <span className="font-mono text-xs font-bold text-sigma-douradoEscuro bg-sigma-dourado/10 px-2 py-0.5 rounded">{p.protocolo}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${b.cls}`}>{b.txt}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${p.prioridade === 'Alta' ? 'bg-red-500/15 text-red-700' : p.prioridade === 'Média' ? 'bg-amber-500/15 text-amber-700' : 'bg-slate-500/15 text-slate-700'}`}>
                        Prioridade {p.prioridade}
                      </span>
                    </div>
                    <h3 className="font-semibold text-sigma-azul truncate">{p.titulo}</h3>
                    <div className="flex items-center gap-4 mt-1.5 text-xs text-sigma-azul/55 flex-wrap">
                      <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> {p.responsavel}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {p.criado}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 self-stretch md:self-auto">
                    {p.status === 'disponivel' && (
                      <button className="px-3.5 py-2 rounded-lg bg-gradient-to-r from-sigma-azul to-sigma-azulEscuro text-white text-xs font-bold hover:shadow-blue transition-all flex items-center gap-1.5">
                        <HandCoins className="w-3.5 h-3.5" /> Solicitar para assumir
                      </button>
                    )}
                    <Link href="#" className="px-3.5 py-2 rounded-lg border border-sigma-azul/15 text-sigma-azul text-xs font-semibold hover:bg-sigma-azul-50 transition-colors">
                      Abrir →
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <p className="mt-5 text-xs text-sigma-azul/50 text-center border-t border-sigma-azul/5 pt-4">
          🤖 Distribuição Inteligente: % compatibilidade por cargo/perfil e bot automático (tabela <code className="bg-sigma-azul-100 px-1 py-0.5 rounded">distribuicoes</code>).
        </p>
      </div>
    </div>
  )
}
