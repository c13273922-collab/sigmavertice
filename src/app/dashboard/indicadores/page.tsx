import { BarChart3, TrendingUp, TrendingDown, Minus, Calendar, Filter, Users, FileText, Plane, Receipt, Target, Activity } from 'lucide-react'

export default function IndicadoresPage() {
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

      {/* 4 KPIs HARDCODED INLINE (NENHUM ARRAY COM FUNCAO) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-sigma-azul/10 bg-white p-5 shadow-sm hover:shadow-md hover:border-sigma-dourado/30 transition-all animate-fade-in-up" style={{ animationDelay: '0s' }}>
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 rounded-xl bg-sigma-dourado/15 flex items-center justify-center">
              <Target className="w-5 h-5 text-sigma-douradoEscuro" />
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700">
              <TrendingUp className="w-3.5 h-3.5" /> +2.3%
            </span>
          </div>
          <p className="text-xs uppercase tracking-wider text-sigma-azul/50 font-semibold mb-1">Taxa de cumprimento de prazos</p>
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-3xl font-bold text-sigma-azul">94.2%</span>
            <span className="text-xs text-sigma-azul/55">Meta: 95%</span>
          </div>
          <div className="h-2 rounded-full bg-sigma-azul-50 overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-sigma-dourado to-sigma-douradoEscuro transition-all shadow-gold" style={{ width: '94.2%' }} />
          </div>
        </div>

        <div className="rounded-2xl border border-sigma-azul/10 bg-white p-5 shadow-sm hover:shadow-md hover:border-sigma-dourado/30 transition-all animate-fade-in-up" style={{ animationDelay: '0.05s' }}>
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 rounded-xl bg-sigma-dourado/15 flex items-center justify-center">
              <Users className="w-5 h-5 text-sigma-douradoEscuro" />
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700">
              <TrendingUp className="w-3.5 h-3.5" /> +1.1%
            </span>
          </div>
          <p className="text-xs uppercase tracking-wider text-sigma-azul/50 font-semibold mb-1">Satisfação dos colaboradores</p>
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-3xl font-bold text-sigma-azul">87.5%</span>
            <span className="text-xs text-sigma-azul/55">Meta: 90%</span>
          </div>
          <div className="h-2 rounded-full bg-sigma-azul-50 overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-sigma-dourado to-sigma-douradoEscuro transition-all shadow-gold" style={{ width: '87.5%' }} />
          </div>
        </div>

        <div className="rounded-2xl border border-sigma-azul/10 bg-white p-5 shadow-sm hover:shadow-md hover:border-sigma-dourado/30 transition-all animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 rounded-xl bg-sigma-dourado/15 flex items-center justify-center">
              <Plane className="w-5 h-5 text-sigma-douradoEscuro" />
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-red-700">
              <TrendingDown className="w-3.5 h-3.5" /> -4.8%
            </span>
          </div>
          <p className="text-xs uppercase tracking-wider text-sigma-azul/50 font-semibold mb-1">Custo médio por viagem (R$)</p>
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-3xl font-bold text-sigma-azul">2.352</span>
            <span className="text-xs text-sigma-azul/55">Meta: 2.500</span>
          </div>
          <div className="h-2 rounded-full bg-sigma-azul-50 overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-sigma-dourado to-sigma-douradoEscuro transition-all shadow-gold" style={{ width: '70%' }} />
          </div>
        </div>

        <div className="rounded-2xl border border-sigma-azul/10 bg-white p-5 shadow-sm hover:shadow-md hover:border-sigma-dourado/30 transition-all animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 rounded-xl bg-sigma-dourado/15 flex items-center justify-center">
              <Activity className="w-5 h-5 text-sigma-douradoEscuro" />
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-red-700">
              <TrendingDown className="w-3.5 h-3.5" /> -1.1h
            </span>
          </div>
          <p className="text-xs uppercase tracking-wider text-sigma-azul/50 font-semibold mb-1">Tempo médio aprovação (h)</p>
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-3xl font-bold text-sigma-azul">6.4</span>
            <span className="text-xs text-sigma-azul/55">Meta: 8h</span>
          </div>
          <div className="h-2 rounded-full bg-sigma-azul-50 overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-sigma-dourado to-sigma-douradoEscuro transition-all shadow-gold" style={{ width: '80%' }} />
          </div>
        </div>
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
            <div className="animate-fade-in-up" style={{ animationDelay: '0s' }}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-semibold text-sigma-azul flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-sigma-azul/60" /> Processos
                </span>
                <span className="text-xs font-bold text-sigma-azul">32%</span>
              </div>
              <div className="h-2 rounded-full bg-sigma-azul-50 overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-700" style={{ width: '32%' }} />
              </div>
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: '0.06s' }}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-semibold text-sigma-azul flex items-center gap-1.5">
                  <Receipt className="w-3.5 h-3.5 text-sigma-azul/60" /> Casos
                </span>
                <span className="text-xs font-bold text-sigma-azul">18%</span>
              </div>
              <div className="h-2 rounded-full bg-sigma-azul-50 overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-red-500 to-red-700" style={{ width: '18%' }} />
              </div>
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: '0.12s' }}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-semibold text-sigma-azul flex items-center gap-1.5">
                  <Plane className="w-3.5 h-3.5 text-sigma-azul/60" /> Viagens
                </span>
                <span className="text-xs font-bold text-sigma-azul">24%</span>
              </div>
              <div className="h-2 rounded-full bg-sigma-azul-50 overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-sigma-dourado to-sigma-douradoEscuro" style={{ width: '24%' }} />
              </div>
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: '0.18s' }}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-semibold text-sigma-azul flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-sigma-azul/60" /> Documentos
                </span>
                <span className="text-xs font-bold text-sigma-azul">26%</span>
              </div>
              <div className="h-2 rounded-full bg-sigma-azul-50 overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-700" style={{ width: '26%' }} />
              </div>
            </div>
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
