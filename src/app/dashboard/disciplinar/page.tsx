import { Scale, Search, Filter, Plus, AlertTriangle, User, FileText, ShieldAlert, Gavel, Clock, CheckCircle2, XCircle } from 'lucide-react'

export default function DisciplinarPage() {
  const medidas = [
    { protocolo: 'ADV-0032', funcionario: 'Juliana Ramos', tipo: 'Advertência 1', valor: 700, motivo: 'Falta injustificada reincidente (3ª)', status: 'aplicada', data: '19/08/2026' },
    { protocolo: 'ADV-0031', funcionario: 'Rafael Costa', tipo: 'Advertência 2', valor: 800, motivo: 'Descumprimento de procedimento de campo', status: 'recurso', data: '18/08/2026' },
    { protocolo: 'DES-0004', funcionario: '— (sigilo)', tipo: 'Desligamento por justa causa', valor: '—', motivo: 'Quebra reiterada de sigilo + ADV3 aplicada', status: 'impedimento', data: '15/08/2026' },
    { protocolo: 'ADV-0030', funcionario: 'Carlos Mendes', tipo: 'Advertência 3', valor: 900, motivo: 'Não conformidade em relatório oficial', status: 'analise', data: '15/08/2026' },
    { protocolo: 'ADV-0029', funcionario: 'Ana Beatriz Souza', tipo: 'Advertência 1', valor: 700, motivo: 'Atraso recorrente em entregas', status: 'arquivado', data: '02/07/2026' },
  ]

  function badgeInfo(s: string) {
    if (s === 'aplicada') return { t: 'Aplicada', c: 'bg-red-500/15 text-red-700' }
    if (s === 'recurso') return { t: 'Em recurso', c: 'bg-amber-500/15 text-amber-700' }
    if (s === 'analise') return { t: 'Em análise DG', c: 'bg-purple-500/15 text-purple-700' }
    if (s === 'arquivado') return { t: 'Arquivado', c: 'bg-slate-500/15 text-slate-700' }
    return { t: 'Impedimento 12m', c: 'bg-red-500/25 text-red-800' }
  }

  const tipoMed = (t: string) => ({
    'Advertência 1': { c: 'bg-amber-500/15 text-amber-700' },
    'Advertência 2': { c: 'bg-orange-500/15 text-orange-700' },
    'Advertência 3': { c: 'bg-red-500/15 text-red-700' },
    'Desligamento por justa causa': { c: 'bg-red-700/20 text-red-800' },
  }[t] || { c: 'bg-slate-100 text-slate-700' })

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-sigma-dourado to-sigma-douradoEscuro flex items-center justify-center shadow-gold">
              <Scale className="w-6 h-6 text-sigma-azul" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-sigma-azul">Disciplinar</h1>
              <p className="text-sm text-sigma-azul/60">Advertências, suspensões, desligamentos e trilha de sigilo</p>
            </div>
          </div>
        </div>
        <button className="px-4 py-2.5 rounded-lg bg-sigma-dourado text-sigma-azul text-sm font-bold hover:bg-sigma-douradoEscuro hover:text-white transition-colors flex items-center gap-2 self-start sm:self-auto shadow-gold">
          <Plus className="w-4 h-4" /> Novo processo disciplinar
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { l: 'ADV-1 (R$700)', v: 14, c: 'bg-amber-500/15 text-amber-800' },
          { l: 'ADV-2 (R$800)', v: 6, c: 'bg-orange-500/15 text-orange-800' },
          { l: 'ADV-3 (R$900)', v: 3, c: 'bg-red-500/15 text-red-800' },
          { l: 'Suspensões (mês)', v: 2, c: 'bg-purple-500/15 text-purple-800' },
          { l: 'Impedidos 12 meses', v: 4, c: 'bg-red-700/20 text-red-900' },
        ].map((k, i) => (
          <div key={k.l} className={`rounded-xl border border-sigma-azul/10 p-4 shadow-sm bg-white animate-fade-in-up`} style={{ animationDelay: `${i * 0.05}s` }}>
            <span className={`text-[10px] uppercase tracking-wider font-bold ${k.c} px-2 py-0.5 rounded-full`}>{k.l}</span>
            <p className="text-2xl font-bold text-sigma-azul mt-2">{k.v}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-sigma-azul/10 bg-white p-5 shadow-sm">
        <div className="flex flex-col md:flex-row gap-3 mb-5">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sigma-azul/40" />
            <input placeholder="Buscar protocolo ADV-/DES- ou funcionário..." className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-sigma-azul/15 text-sm focus:outline-none focus:ring-2 focus:ring-sigma-dourado/40" />
          </div>
          <button className="px-3.5 py-2.5 rounded-lg border border-sigma-azul/15 text-sigma-azul/70 hover:bg-sigma-azul-50 transition-colors flex items-center gap-2 text-sm">
            <Filter className="w-4 h-4" /> Filtros
          </button>
        </div>

        <div className="space-y-3">
          {medidas.map((m, i) => {
            const b = badgeInfo(m.status)
            const t = tipoMed(m.tipo)
            return (
              <div key={m.protocolo} className={`rounded-xl border p-4 hover:shadow-md transition-all animate-fade-in-up ${m.status === 'impedimento' ? 'border-red-500/30 bg-red-500/[0.03]' : 'border-sigma-azul/10 hover:border-sigma-dourado/30'}`} style={{ animationDelay: `${i * 0.05}s` }}>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${m.tipo.includes('Advertência 3') || m.tipo.includes('Desligamento') ? 'bg-red-500/15' : 'bg-sigma-dourado/15'}`}>
                      <Scale className={`w-6 h-6 ${m.tipo.includes('Advertência 3') || m.tipo.includes('Desligamento') ? 'text-red-700' : 'text-sigma-douradoEscuro'}`} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap gap-2 mb-1.5 items-center">
                        <span className="font-mono text-xs font-bold text-sigma-douradoEscuro bg-sigma-dourado/10 px-2 py-0.5 rounded">{m.protocolo}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${t.c}`}>{m.tipo}</span>
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${b.c}`}>
                          {m.status === 'aplicada' && <Gavel className="w-3 h-3" />}
                          {m.status === 'recurso' && <Clock className="w-3 h-3" />}
                          {m.status === 'analise' && <AlertTriangle className="w-3 h-3" />}
                          {m.status === 'arquivado' && <FileText className="w-3 h-3" />}
                          {m.status === 'impedimento' && <ShieldAlert className="w-3 h-3" />}
                          {b.t}
                        </span>
                        {m.valor !== '—' && (
                          <span className="ml-auto text-sm font-bold text-sigma-azul">
                            Multa: <span className="text-sigma-douradoEscuro">R$ {Number(m.valor).toLocaleString('pt-BR')}</span>
                          </span>
                        )}
                      </div>
                      <p className="font-semibold text-sigma-azul flex items-center gap-2">
                        <User className="w-4 h-4 text-sigma-azul/40" /> {m.funcionario}
                      </p>
                      <p className="text-xs text-sigma-azul/70 mt-1 flex items-start gap-1.5">
                        <FileText className="w-3.5 h-3.5 mt-0.5 text-sigma-azul/40" /> Motivo: <span className="font-medium ml-0.5">{m.motivo}</span>
                      </p>
                      <p className="text-[11px] text-sigma-azul/50 mt-1 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" /> Data da aplicação: {m.data}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5 md:min-w-[120px]">
                    <button className="px-3 py-1.5 rounded-md bg-sigma-azul text-white text-[11px] font-bold hover:bg-sigma-azulEscuro transition-colors">
                      Detalhes / Peças
                    </button>
                    {m.status === 'aplicada' && (
                      <button className="px-3 py-1.5 rounded-md border border-amber-500/30 text-amber-700 text-[11px] font-semibold hover:bg-amber-500/5 transition-colors">
                        Dar entrada em recurso
                      </button>
                    )}
                    {m.status === 'analise' && (
                      <div className="grid grid-cols-2 gap-1">
                        <button className="px-2 py-1.5 rounded-md bg-emerald-600 text-white text-[11px] font-bold hover:bg-emerald-700 transition-colors inline-flex items-center justify-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Aprovar
                        </button>
                        <button className="px-2 py-1.5 rounded-md bg-red-600 text-white text-[11px] font-bold hover:bg-red-700 transition-colors inline-flex items-center justify-center gap-1">
                          <XCircle className="w-3 h-3" /> Rejeitar
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-5 p-4 rounded-xl bg-gradient-to-r from-red-500/5 via-white to-red-500/5 border border-red-500/15 text-xs leading-relaxed text-sigma-azul/75">
          <p className="font-bold text-red-800 mb-1 flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4" /> Observação legal e de política interna
          </p>
          <p>
            Desligamentos por justa causa geram automaticamente <strong className="text-red-700">impedimento de 12 meses</strong> para readmissão, conforme regra cadastrada na tabela <code className="bg-sigma-azul-100 px-1 py-0.5 rounded">configuracoes</code> (<em>configuracao_chave = 'impedimento_desligamento_meses'</em>). Multas ADV1/R$700, ADV2/R$800 e ADV3/R$900 aplicam-se ao salário conforme política. Todo o fluxo é registrado em trilha de auditoria.
          </p>
        </div>
      </div>
    </div>
  )
}
