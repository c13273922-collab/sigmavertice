import { BarChart3, TrendingUp, TrendingDown, Minus, Calendar, Filter, Users, FileText, Plane, Receipt, Target, Activity } from 'lucide-react'

export default function IndicadoresPage() {
  const kpis = [
    { label: 'Taxa de cumprimento de prazos', valor: 94.2, tendencia: 'up', variacao: '+2.3%', meta: 95, ic: Target },
    { label: 'Satisfação dos colaboradores', valor: 87.5, tendencia: 'up', variacao: '+1.1%', meta: 90, ic: Users },
    { label: 'Custo médio por viagem (R$)', valor: '2.352', tendencia: 'down', variacao: '-4.8%', meta: '2.500', ic: Plane },
    { label: 'Tempo médio aprovação (h)', valor: 6.4, tendencia: 'down', variacao: '-1.1h', meta: 8, ic: Activity },
  ]

  const barras = [
    { m: 'Mar', v: 62 }, { m: 'Abr', v: 71 }, { m: 'Mai', v: 68 },
    { m: 'Jun', v: 82 }, { m: 'Jul', v: 89 }, { m: 'Ago', v: 94 },
  ]
  const max = Math.max(...barras.map(b => b.v))

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-sigma-dourado to-sigma-douradoEscuro flex items-center justify-center shadow-gold">
              <BarChart3 className="w-6 h-6 text-sigma-azul" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-sigma-azul">Indicadores</h1>
              <p className="text-sm text-sigma-azul/60">KPIs estratégicos e operacionais com metas mensais</p>
            </div>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap self-start sm:self-auto">
          <button className="px-3.5 py-2 rounded-lg border border-sigma-azul/15 text-sigma-azul/70 hover:bg-sigma-azul-50 transition-colors flex items-center gap-2 text-xs font-semibold">
            <Calendar className="w-4 h-4" /> Últimos 6 meses
          </button>
          <button className="px-3.5 py-2 rounded-lg border border-sigma-azul/15 text-sigma-azul/70 hover:bg-sigma-azul-50 transition-colors flex items-center gap-2 text-xs font-semibold">
            <Filter className="w-4 h-4" /> Filtros
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((k, i) => {
          const Ic = k.ic
          const percent = typeof k.valor === 'number' ? Math.min(100, k.valor) : 70
          const tendIcon = k.tendencia === 'up' ? TrendingUp : k.tendencia === 'down' ? TrendingDown : Minus
          const TendIc = tendIcon
          const tendCor = k.tendencia === 'up' ? 'text-emerald-700' : k.tendencia === 'down' ? 'text-red-700' : 'text-slate-600'
          return (
            <div key={k.label} className="rounded-2xl border border-sigma-azul/10 bg-white p-5 shadow-sm hover:shadow-md hover:border-sigma-dourado/30 transition-all animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-sigma-dourado/15 flex items-center justify-center">
                  <Ic className="w-5 h-5 text-sigma-douradoEscuro" />
                </div>
                <span className={`inline-flex items-center gap-1 text-xs font-bold ${tendCor}`}>
                  <TendIc className="w-3.5 h-3.5" /> {k.variacao}
                </span>
              </div>
              <p className="text-xs uppercase tracking-wider text-sigma-azul/50 font-semibold mb-1">{k.label}</p>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-3xl font-bold text-sigma-azul">{k.valor}{typeof k.valor === 'number' && !isNaN(k.valor) ? '%' : ''}</span>
                <span className="text-xs text-sigma-azul/55">Meta: {k.meta}{typeof k.meta === 'number' ? '%' : ''}</span>
              </div>
              <div className="h-2 rounded-full bg-sigma-azul-50 overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-sigma-dourado to-sigma-douradoEscuro transition-all shadow-gold" style={{ width: `${percent}%` }} />
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl border border-sigma-azul/10 bg-white p-5 shadow-sm">
          <h2 className="font-bold text-sigma-azul mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-sigma-douradoEscuro" /> Cumprimento de metas — últimos 6 meses
          </h2>
          <div className="h-64 flex items-end gap-4 px-2">
            {barras.map((b, i) => (
              <div key={b.m} className="flex-1 flex flex-col items-center gap-2 animate-fade-in-up" style={{ animationDelay: `${i * 0.08}s` }}>
                <span className="text-[11px] font-bold text-sigma-douradoEscuro">{b.v}%</span>
                <div className="w-full bg-sigma-azul-50 rounded-t-lg relative overflow-hidden group" style={{ height: `${(b.v / max) * 200}px` }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-sigma-azulEscuro to-sigma-dourado hover:from-sigma-dourado hover:to-sigma-azulEscuro transition-all duration-500 rounded-t-lg shadow-gold" />
                </div>
                <span className="text-xs font-semibold text-sigma-azul/60">{b.m}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-sigma-azul/10 bg-white p-5 shadow-sm">
          <h2 className="font-bold text-sigma-azul mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-sigma-douradoEscuro" /> Distribuição por módulo
          </h2>
          <div className="space-y-4">
            {[
              { l: 'Processos', v: 32, c: 'from-blue-500 to-blue-700', ic: FileText },
              { l: 'Casos', v: 18, c: 'from-red-500 to-red-700', ic: Receipt },
              { l: 'Viagens', v: 24, c: 'from-sigma-dourado to-sigma-douradoEscuro', ic: Plane },
              { l: 'Documentos', v: 26, c: 'from-emerald-500 to-emerald-700', ic: FileText },
            ].map((m, i) => {
              const MIc = m.ic
              return (
                <div key={m.l} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.06}s` }}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-semibold text-sigma-azul flex items-center gap-1.5">
                      <MIc className="w-3.5 h-3.5 text-sigma-azul/60" /> {m.l}
                    </span>
                    <span className="text-xs font-bold text-sigma-azul">{m.v}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-sigma-azul-50 overflow-hidden">
                    <div className={`h-full rounded-full bg-gradient-to-r ${m.c}`} style={{ width: `${m.v}%` }} />
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-sigma-azul/5 to-white border border-sigma-azul/10">
            <p className="text-[11px] uppercase tracking-wider text-sigma-azul/55 font-bold mb-1">Próxima avaliação</p>
            <p className="font-bold text-sigma-azul">Comitê Diretoria — 30/08/2026</p>
          </div>
        </div>
      </div>
    </div>
  )
}
