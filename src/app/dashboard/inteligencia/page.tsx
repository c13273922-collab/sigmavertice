import { Brain, TrendingUp, Target, Lightbulb, Search, Filter, AlertTriangle, CheckCircle2 } from 'lucide-react'

export default function InteligenciaPage() {
  const insights = [
    { titulo: 'Aumento de atividade na região de Tabatinga', severidade: 'alta', confianca: 94, tipo: 'Geopolítica', fonte: 'Análise automática · IA', criado: '19/08 14:22' },
    { titulo: 'Padrão de atrasos recorrentes em unidade Tefé', severidade: 'media', confianca: 87, tipo: 'Operacional', fonte: 'Análise de dados', criado: '19/08 10:05' },
    { titulo: 'Sazonalidade de fluxo aéreo: agosto aumenta em 38%', severidade: 'baixa', confianca: 98, tipo: 'Planejamento', fonte: 'Histórico + 6 meses', criado: '18/08 17:40' },
    { titulo: 'Risco de sobrecarga em setor de aprovações', severidade: 'media', confianca: 81, tipo: 'Processos', fonte: 'Modelo preditivo', criado: '17/08 09:18' },
  ]

  const fontes = [
    { nome: 'Monitoramento Brasil', registros: 1247, status: 'online' },
    { nome: 'Feed de notícias AM', registros: 612, status: 'online' },
    { nome: 'Base histórica operacional', registros: 8429, status: 'online' },
    { nome: 'Integração IBGE', registros: 62, status: 'atualizando' },
  ]

  const badgeSev = (s: string) => ({
    alta: { t: 'Alta', c: 'bg-red-500/15 text-red-700', bar: 'bg-red-500' },
    media: { t: 'Média', c: 'bg-amber-500/15 text-amber-700', bar: 'bg-amber-500' },
    baixa: { t: 'Baixa', c: 'bg-emerald-500/15 text-emerald-700', bar: 'bg-emerald-500' },
  }[s])

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-sigma-dourado to-sigma-douradoEscuro flex items-center justify-center shadow-gold">
              <Brain className="w-6 h-6 text-sigma-azul" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-sigma-azul">Inteligência</h1>
              <p className="text-sm text-sigma-azul/60">Análises, insights preditivos e fontes de dados integradas</p>
            </div>
          </div>
        </div>
      </div>

      {/* 4 CARDS HARDCODED INLINE (NENHUM ARRAY COM FUNCAO) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-xl border border-sigma-azul/10 bg-white p-4 shadow-sm animate-fade-in-up" style={{ animationDelay: '0s' }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase tracking-wider text-sigma-azul/50 font-semibold">Insights ativos</span>
            <Brain className="w-4 h-4 text-sigma-douradoEscuro" />
          </div>
          <p className="text-2xl font-bold text-sigma-azul">38</p>
        </div>

        <div className="rounded-xl border border-sigma-azul/10 bg-white p-4 shadow-sm animate-fade-in-up" style={{ animationDelay: '0.05s' }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase tracking-wider text-sigma-azul/50 font-semibold">Fontes integradas</span>
            <TrendingUp className="w-4 h-4 text-sigma-azulEscuro" />
          </div>
          <p className="text-2xl font-bold text-sigma-azul">7</p>
        </div>

        <div className="rounded-xl border border-sigma-azul/10 bg-white p-4 shadow-sm animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase tracking-wider text-sigma-azul/50 font-semibold">Confiança média</span>
            <Target className="w-4 h-4 text-emerald-700" />
          </div>
          <p className="text-2xl font-bold text-sigma-azul">91%</p>
        </div>

        <div className="rounded-xl border border-sigma-azul/10 bg-white p-4 shadow-sm animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase tracking-wider text-sigma-azul/50 font-semibold">Alertas priorizados</span>
            <Lightbulb className="w-4 h-4 text-red-700" />
          </div>
          <p className="text-2xl font-bold text-sigma-azul">9</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl border border-sigma-azul/10 bg-white p-5 shadow-sm">
          <div className="flex flex-col md:flex-row gap-3 mb-5 items-start md:items-center justify-between">
            <h2 className="font-bold text-sigma-azul flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-sigma-douradoEscuro" /> Insights recentes
            </h2>
            <div className="flex gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sigma-azul/40" />
                <input placeholder="Buscar insight..." className="w-full pl-10 pr-4 py-2 rounded-lg border border-sigma-azul/15 text-xs focus:outline-none focus:ring-2 focus:ring-sigma-dourado/40" />
              </div>
              <button className="px-3 py-2 rounded-lg border border-sigma-azul/15 text-sigma-azul/70 hover:bg-sigma-azul-50 transition-colors flex items-center gap-1.5 text-xs">
                <Filter className="w-3.5 h-3.5" /> Filtros
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {insights.map((ins, i) => {
              const b = badgeSev(ins.severidade)
              return (
                <div key={i} className="rounded-xl border border-sigma-azul/10 p-4 hover:shadow-md hover:border-sigma-dourado/30 transition-all animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-2">
                    <h3 className="font-semibold text-sigma-azul">{ins.titulo}</h3>
                    <div className="flex gap-2 flex-wrap">
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${b.c}`}>Severidade {b.t}</span>
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-sigma-azul/10 text-sigma-azulEscuro">{ins.tipo}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-sigma-azul/55 items-center">
                    <div className="flex-1 min-w-[160px]">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-sigma-azul">Confiança</span>
                        <span className="font-bold text-sigma-douradoEscuro">{ins.confianca}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-sigma-azul-50 overflow-hidden">
                        <div className={`h-full rounded-full ${b.bar} transition-all`} style={{ width: `${ins.confianca}%` }} />
                      </div>
                    </div>
                    <span className="flex items-center gap-1"><Brain className="w-3.5 h-3.5" /> {ins.fonte}</span>
                    <span>{ins.criado}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-sigma-azul/10 bg-white p-5 shadow-sm space-y-4">
          <h2 className="font-bold text-sigma-azul flex items-center gap-2">
            <Target className="w-5 h-5 text-sigma-douradoEscuro" /> Fontes de dados
          </h2>
          <div className="space-y-2.5">
            {fontes.map((f, i) => (
              <div key={f.nome} className="flex items-center justify-between p-3 rounded-xl bg-sigma-azul-50/60 hover:bg-sigma-azul-50 transition-colors animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
                <div className="flex items-center gap-3 min-w-0">
                  <span className={`w-2.5 h-2.5 rounded-full ${f.status === 'online' ? 'bg-emerald-500 animate-pulse-soft' : 'bg-amber-500'}`} />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-sigma-azul truncate">{f.nome}</p>
                    <p className="text-[11px] text-sigma-azul/55">{f.registros.toLocaleString('pt-BR')} registros</p>
                  </div>
                </div>
                {f.status === 'online' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                )}
              </div>
            ))}
          </div>

          <div className="rounded-xl p-4 bg-gradient-to-br from-sigma-dourado/15 to-white border border-sigma-dourado/30 mt-5">
            <Brain className="w-6 h-6 text-sigma-douradoEscuro mb-2" />
            <h3 className="font-bold text-sigma-azul mb-1">IA Sigma Vértice</h3>
            <p className="text-xs text-sigma-azul/70 mb-3 leading-relaxed">
              Motor analítico treinado em dados anonimizados da operação. Sempre sugere e justifica, mas nunca decide — decisão humana obrigatória.
            </p>
            <button className="w-full py-2 rounded-lg bg-sigma-dourado text-sigma-azul text-xs font-bold hover:bg-sigma-douradoEscuro hover:text-white transition-colors shadow-gold">
              Executar análise geral
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
