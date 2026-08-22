import { Plane, Plus, Search, Filter, HandCoins, MapPin, CalendarDays, Clock, User, CheckCircle2, AlertTriangle } from 'lucide-react'
import Link from 'next/link'

export default function ViagensPage() {
  const viagens = [
    { protocolo: 'VT-0092', origem: 'Manaus', destino: 'Tabatinga', saida: '22/08/2026', retorno: '26/08/2026', motivo: 'Missão de campo', status: 'aprovacao', responsavel: 'Rafael Costa', adiantamento: 'R$ 3.200,00' },
    { protocolo: 'VT-0091', origem: 'Manaus', destino: 'Tefé', saida: '21/08/2026', retorno: '23/08/2026', motivo: 'Acompanhamento operacional', status: 'aprovada', responsavel: 'Ana Beatriz', adiantamento: 'R$ 2.100,00' },
    { protocolo: 'VT-0090', origem: 'Manaus', destino: 'Parintins', saida: '20/08/2026', retorno: '20/08/2026', motivo: 'Reunião com unidade local', status: 'disponivel', responsavel: '—', adiantamento: 'R$ 1.450,00' },
    { protocolo: 'VT-0089', origem: 'Tefé', destino: 'Manaus', saida: '15/08/2026', retorno: '16/08/2026', motivo: 'Retorno de missão', status: 'concluida', responsavel: 'Juliana Ramos', adiantamento: 'R$ 1.800,00' },
  ]

  const badgeStatus = (s: string) => ({
    aprovacao: { t: 'Aguardando DG', c: 'bg-purple-500/15 text-purple-700', i: AlertTriangle },
    aprovada: { t: 'Aprovada', c: 'bg-emerald-500/15 text-emerald-700', i: CheckCircle2 },
    disponivel: { t: 'Para assumir', c: 'bg-blue-500/15 text-blue-700', i: HandCoins },
    concluida: { t: 'Concluída', c: 'bg-slate-500/15 text-slate-700', i: Plane },
  }[s])

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-sigma-dourado to-sigma-douradoEscuro flex items-center justify-center shadow-gold">
              <Plane className="w-6 h-6 text-sigma-azul" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-sigma-azul">Viagens</h1>
              <p className="text-sm text-sigma-azul/60">Controle de deslocamentos, adiantamentos e aprovação DG</p>
            </div>
          </div>
        </div>
        <button className="px-4 py-2.5 rounded-lg bg-sigma-dourado text-sigma-azul text-sm font-bold hover:bg-sigma-douradoEscuro hover:text-white transition-colors flex items-center gap-2 self-start sm:self-auto shadow-gold">
          <Plus className="w-4 h-4" /> Nova Viagem
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { l: 'Para aprovação DG', v: 5, c: 'bg-purple-500/15 text-purple-700' },
          { l: 'Aprovadas (mês)', v: 18, c: 'bg-emerald-500/15 text-emerald-700' },
          { l: 'Executadas hoje', v: 3, c: 'bg-blue-500/15 text-blue-700' },
          { l: 'Adiantamento total (mês)', v: 'R$ 42.350', c: 'bg-sigma-dourado/15 text-sigma-douradoEscuro' },
        ].map((k, i) => (
          <div key={k.l} className="rounded-xl border border-sigma-azul/10 bg-white p-4 shadow-sm animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
            <span className={`text-[11px] uppercase tracking-wider font-bold ${k.c} px-2 py-0.5 rounded-full`}>{k.l}</span>
            <p className="text-xl font-bold text-sigma-azul mt-2">{k.v}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-sigma-azul/10 bg-white p-5 shadow-sm">
        <div className="flex flex-col md:flex-row gap-3 mb-5">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sigma-azul/40" />
            <input placeholder="Buscar VT- ou destino..." className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-sigma-azul/15 text-sm focus:outline-none focus:ring-2 focus:ring-sigma-dourado/40" />
          </div>
          <button className="px-3.5 py-2.5 rounded-lg border border-sigma-azul/15 text-sigma-azul/70 hover:bg-sigma-azul-50 transition-colors flex items-center gap-2">
            <Filter className="w-4 h-4" /> Filtros
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {viagens.map((v, i) => {
            const b = badgeStatus(v.status)
            const Icon = b.i
            return (
              <div key={v.protocolo} className="rounded-xl border border-sigma-azul/10 p-5 hover:shadow-md hover:border-sigma-dourado/30 transition-all animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
                <div className="flex items-start justify-between mb-3">
                  <span className="font-mono text-xs font-bold text-sigma-douradoEscuro bg-sigma-dourado/10 px-2.5 py-1 rounded">{v.protocolo}</span>
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${b.c}`}>
                    <Icon className="w-3.5 h-3.5" /> {b.t}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-[11px] uppercase text-sigma-azul/55 tracking-wider">Origem</p>
                    <p className="font-bold text-sigma-azul">{v.origem}</p>
                  </div>
                  <div className="flex-1 flex items-center text-sigma-azul/30">
                    <div className="h-px flex-1 bg-sigma-azul/15" />
                    <Plane className="w-4 h-4 mx-2 text-sigma-dourado" />
                    <div className="h-px flex-1 bg-sigma-azul/15" />
                  </div>
                  <div className="text-center">
                    <p className="text-[11px] uppercase text-sigma-azul/55 tracking-wider">Destino</p>
                    <p className="font-bold text-sigma-azul">{v.destino}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                  <div className="flex items-center gap-1.5 text-sigma-azul/70"><CalendarDays className="w-3.5 h-3.5 text-sigma-azul/40" /> Saída: <span className="font-semibold text-sigma-azul">{v.saida}</span></div>
                  <div className="flex items-center gap-1.5 text-sigma-azul/70"><Clock className="w-3.5 h-3.5 text-sigma-azul/40" /> Retorno: <span className="font-semibold text-sigma-azul">{v.retorno}</span></div>
                  <div className="flex items-center gap-1.5 text-sigma-azul/70 col-span-1"><User className="w-3.5 h-3.5 text-sigma-azul/40" /> {v.responsavel}</div>
                  <div className="text-right font-bold text-sigma-douradoEscuro">{v.adiantamento}</div>
                </div>

                <p className="text-xs text-sigma-azul/60 mb-3 flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 mt-0.5 text-sigma-azul/40" />
                  Motivo: <span className="text-sigma-azul font-medium ml-1">{v.motivo}</span>
                </p>

                <div className="flex gap-2 pt-3 border-t border-sigma-azul/5">
                  {v.status === 'disponivel' && (
                    <button className="flex-1 px-3 py-2 rounded-lg bg-gradient-to-r from-sigma-azul to-sigma-azulEscuro text-white text-xs font-bold hover:shadow-blue transition-all inline-flex items-center justify-center gap-1.5">
                      <HandCoins className="w-3.5 h-3.5" /> Solicitar para assumir
                    </button>
                  )}
                  <Link href="#" className={`${v.status === 'disponivel' ? 'px-3 py-2 rounded-lg border border-sigma-azul/15 text-sigma-azul text-xs font-semibold hover:bg-sigma-azul-50 transition-colors' : 'flex-1 px-3 py-2 rounded-lg bg-sigma-dourado/15 text-sigma-douradoEscuro text-xs font-bold hover:bg-sigma-dourado hover:text-white transition-all'}`}>
                    Detalhes →
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
