import { FileBarChart, Plus, Search, Filter, Download, Calendar, Clock, User, BarChart3, Eye, CheckCircle2, AlertTriangle } from 'lucide-react'

export default function RelatoriosPage() {
  const relatorios = [
    { protocolo: 'REL-0241', titulo: 'Relatório Gerencial — Operação Agosto/2026 (parcial)', tipo: 'Gerencial', autor: 'Diretoria Geral', data: '19/08/2026', status: 'rascunho', formato: 'PDF' },
    { protocolo: 'REL-0240', titulo: 'Boletim de Indicadores — Cumprimento de Metas Jul/2026', tipo: 'Indicadores', autor: 'Controladoria', data: '15/08/2026', status: 'finalizado', formato: 'PDF + XLSX' },
    { protocolo: 'REL-0239', titulo: 'Auditoria Interna — Ciclo Q3 / 2026 (preliminar)', tipo: 'Auditoria', autor: 'Comitê de Auditoria', data: '12/08/2026', status: 'aprovacao', formato: 'PDF' },
    { protocolo: 'REL-0238', titulo: 'Mapa de Risco — Unidades do Interior AM', tipo: 'Risco', autor: 'Inteligência', data: '10/08/2026', status: 'finalizado', formato: 'PDF' },
    { protocolo: 'REL-0237', titulo: 'Relatório de RH — Headcount, Turnover e Absenteísmo', tipo: 'Pessoas', autor: 'RH', data: '05/08/2026', status: 'finalizado', formato: 'PDF + DOCX' },
  ]

  const badge = (s: string) => ({
    rascunho: { t: 'Rascunho', c: 'bg-slate-500/15 text-slate-700', i: FileBarChart },
    aprovacao: { t: 'Aprovação DG', c: 'bg-purple-500/15 text-purple-700', i: AlertTriangle },
    finalizado: { t: 'Finalizado', c: 'bg-emerald-500/15 text-emerald-700', i: CheckCircle2 },
  }[s])

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-sigma-dourado to-sigma-douradoEscuro flex items-center justify-center shadow-gold">
              <FileBarChart className="w-6 h-6 text-sigma-azul" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-sigma-azul">Relatórios</h1>
              <p className="text-sm text-sigma-azul/60">Emissão, aprovação e arquivamento de relatórios oficiais</p>
            </div>
          </div>
        </div>
        <div className="flex gap-2 self-start sm:self-auto flex-wrap">
          <button className="px-4 py-2.5 rounded-lg border border-sigma-azul/15 text-sigma-azul text-sm font-semibold hover:bg-sigma-azul-50 transition-colors flex items-center gap-2">
            <BarChart3 className="w-4 h-4" /> Gerar novo
          </button>
          <button className="px-4 py-2.5 rounded-lg bg-sigma-dourado text-sigma-azul text-sm font-bold hover:bg-sigma-douradoEscuro hover:text-white transition-colors flex items-center gap-2 shadow-gold">
            <Plus className="w-4 h-4" /> Submeter REL-
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { l: 'Emitidos no mês', v: 28, c: 'text-sigma-azul' },
          { l: 'Em aprovação DG', v: 5, c: 'text-purple-700' },
          { l: 'Finalizados 2026', v: 241, c: 'text-emerald-700' },
          { l: 'Modelos oficiais', v: 14, c: 'text-sigma-douradoEscuro' },
        ].map((k, i) => (
          <div key={k.l} className="rounded-xl border border-sigma-azul/10 bg-white p-4 shadow-sm animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
            <p className="text-xs uppercase tracking-wider font-semibold text-sigma-azul/50">{k.l}</p>
            <p className={`text-2xl font-bold mt-2 ${k.c}`}>{k.v}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-sigma-dourado/30 bg-gradient-to-br from-sigma-dourado/10 to-white p-5 shadow-sm">
        <h2 className="font-bold text-sigma-azul mb-3 flex items-center gap-2">
          📋 Modelos oficiais (clique para preencher)
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { n: 'Relatório de Viagem', i: 'VT + adiantamento + comprovantes' },
            { n: 'Relatório de Caso', i: 'CASO- linha do tempo + anexos' },
            { n: 'Boletim Gerencial Mensal', i: 'KPIs, gráficos, anexos obrigatórios' },
            { n: 'Termo de Abertura de PROC-', i: 'Descrição, prioridade, anexos' },
          ].map((m, i) => (
            <button key={i} className="rounded-xl border border-sigma-dourado/30 bg-white p-4 text-left hover:bg-sigma-dourado/10 hover:shadow-sm transition-all animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
              <FileBarChart className="w-5 h-5 text-sigma-douradoEscuro mb-2" />
              <p className="text-sm font-bold text-sigma-azul mb-0.5">{m.n}</p>
              <p className="text-[11px] text-sigma-azul/60">{m.i}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-sigma-azul/10 bg-white p-5 shadow-sm">
        <div className="flex flex-col md:flex-row gap-3 mb-5">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sigma-azul/40" />
            <input placeholder="Buscar REL-, título ou autor..." className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-sigma-azul/15 text-sm focus:outline-none focus:ring-2 focus:ring-sigma-dourado/40" />
          </div>
          <button className="px-3.5 py-2.5 rounded-lg border border-sigma-azul/15 text-sigma-azul/70 hover:bg-sigma-azul-50 transition-colors flex items-center gap-2 text-sm">
            <Filter className="w-4 h-4" /> Filtros
          </button>
          <button className="px-3.5 py-2.5 rounded-lg border border-sigma-azul/15 text-sigma-azul/70 hover:bg-sigma-azul-50 transition-colors flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4" /> Período
          </button>
        </div>

        <div className="overflow-x-auto rounded-xl border border-sigma-azul/10">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-sigma-azul-50 text-left text-xs uppercase tracking-wider text-sigma-azul/60">
                <th className="px-4 py-3 font-semibold">Protocolo</th>
                <th className="px-4 py-3 font-semibold">Título</th>
                <th className="px-4 py-3 font-semibold">Tipo</th>
                <th className="px-4 py-3 font-semibold">Autor</th>
                <th className="px-4 py-3 font-semibold">Data</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Formato</th>
                <th className="px-4 py-3 font-semibold text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sigma-azul/5">
              {relatorios.map((r, i) => {
                const b = badge(r.status)
                const BIc = b.i
                return (
                  <tr key={r.protocolo} className="hover:bg-sigma-azul-50/40 transition-colors animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
                    <td className="px-4 py-3 font-mono text-xs font-bold text-sigma-douradoEscuro whitespace-nowrap">{r.protocolo}</td>
                    <td className="px-4 py-3 font-medium text-sigma-azul max-w-sm">{r.titulo}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-sigma-azul/10 text-sigma-azulEscuro">{r.tipo}</span>
                    </td>
                    <td className="px-4 py-3 text-sigma-azul/75 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-sigma-azul/40" /> {r.autor}
                    </td>
                    <td className="px-4 py-3 text-sigma-azul/75 whitespace-nowrap flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-sigma-azul/40" /> {r.data}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${b.c}`}>
                        <BIc className="w-3 h-3" /> {b.t}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[11px] font-mono text-sigma-azul/65">{r.formato}</td>
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      <button className="px-2 py-1.5 rounded-md border border-sigma-azul/15 text-sigma-azul text-[11px] font-semibold hover:bg-sigma-azul-50 transition-colors inline-flex items-center gap-1 mr-2">
                        <Eye className="w-3 h-3" /> Visualizar
                      </button>
                      <button className="px-2 py-1.5 rounded-md bg-sigma-dourado/15 text-sigma-douradoEscuro text-[11px] font-bold hover:bg-sigma-dourado hover:text-white transition-colors inline-flex items-center gap-1">
                        <Download className="w-3 h-3" /> Baixar
                      </button>
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
