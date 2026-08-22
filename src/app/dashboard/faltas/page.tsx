import { CalendarX2, Search, Filter, Plus, User, Clock, FilePlus, CheckCircle2, AlertCircle } from 'lucide-react'

export default function FaltasPage() {
  const faltas = [
    { protocolo: 'FAL-0112', funcionario: 'Juliana Ramos', cargo: 'Analista de Processos', tipo: 'Falta injustificada', data: '19/08/2026', periodo: 'Dia todo', abono: null, status: 'pendente' },
    { protocolo: 'FAL-0111', funcionario: 'Rafael Costa', cargo: 'Agente de Campo', tipo: 'Atraso', data: '19/08/2026', periodo: '53 min (manhã)', abono: 'Atestado médico (em análise)', status: 'analise' },
    { protocolo: 'FAL-0110', funcionario: 'Ana Beatriz Souza', cargo: 'Diretora de Operações', tipo: 'Falta justificada', data: '18/08/2026', periodo: 'Tarde', abono: 'Declaração de comparecimento — fórum', status: 'aprovado' },
    { protocolo: 'FAL-0109', funcionario: 'Carlos Mendes', cargo: 'Coordenador de Inteligência', tipo: 'Saída antecipada', data: '17/08/2026', periodo: '2h', abono: 'Compensação de banco de horas', status: 'aprovado' },
  ]

  const badge = (s: string) => ({
    pendente: { t: 'Pendente', c: 'bg-red-500/15 text-red-700', i: AlertCircle },
    analise: { t: 'Em análise', c: 'bg-amber-500/15 text-amber-700', i: Clock },
    aprovado: { t: 'Aprovado', c: 'bg-emerald-500/15 text-emerald-700', i: CheckCircle2 },
  }[s])

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-sigma-dourado to-sigma-douradoEscuro flex items-center justify-center shadow-gold">
              <CalendarX2 className="w-6 h-6 text-sigma-azul" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-sigma-azul">Faltas e Atrasos</h1>
              <p className="text-sm text-sigma-azul/60">Registros de ausência, abonos e aprovações hierárquicas</p>
            </div>
          </div>
        </div>
        <button className="px-4 py-2.5 rounded-lg bg-sigma-dourado text-sigma-azul text-sm font-bold hover:bg-sigma-douradoEscuro hover:text-white transition-colors flex items-center gap-2 self-start sm:self-auto shadow-gold">
          <Plus className="w-4 h-4" /> Registrar ocorrência
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { l: 'Mês atual — registros', v: 47, c: 'text-sigma-azul' },
          { l: 'Pendentes de análise', v: 11, c: 'text-red-700' },
          { l: 'Atrasos (mês)', v: 23, c: 'text-amber-700' },
          { l: 'Taxa de frequência', v: '97.1%', c: 'text-emerald-700' },
        ].map((k, i) => (
          <div key={k.l} className="rounded-xl border border-sigma-azul/10 bg-white p-4 shadow-sm animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
            <p className="text-xs uppercase tracking-wider font-semibold text-sigma-azul/50">{k.l}</p>
            <p className={`text-2xl font-bold mt-2 ${k.c}`}>{k.v}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-sigma-azul/10 bg-white p-5 shadow-sm">
        <div className="flex flex-col md:flex-row gap-3 mb-5">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sigma-azul/40" />
            <input placeholder="Buscar funcionário, FAL- ou tipo..." className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-sigma-azul/15 text-sm focus:outline-none focus:ring-2 focus:ring-sigma-dourado/40" />
          </div>
          <button className="px-3.5 py-2.5 rounded-lg border border-sigma-azul/15 text-sigma-azul/70 hover:bg-sigma-azul-50 transition-colors flex items-center gap-2 text-sm">
            <Filter className="w-4 h-4" /> Filtros
          </button>
        </div>

        <div className="overflow-x-auto rounded-xl border border-sigma-azul/10">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-sigma-azul-50 text-left text-xs uppercase tracking-wider text-sigma-azul/60">
                <th className="px-4 py-3 font-semibold">Protocolo</th>
                <th className="px-4 py-3 font-semibold">Funcionário</th>
                <th className="px-4 py-3 font-semibold">Tipo</th>
                <th className="px-4 py-3 font-semibold">Data</th>
                <th className="px-4 py-3 font-semibold">Período</th>
                <th className="px-4 py-3 font-semibold">Abono / Justificativa</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sigma-azul/5">
              {faltas.map((f, i) => {
                const b = badge(f.status)
                const BIc = b.i
                return (
                  <tr key={f.protocolo} className="hover:bg-sigma-azul-50/40 transition-colors animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
                    <td className="px-4 py-3 font-mono text-xs font-bold text-sigma-douradoEscuro">{f.protocolo}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-sigma-azul to-sigma-azulEscuro text-white font-bold text-xs flex items-center justify-center flex-shrink-0">
                          {f.funcionario.split(' ').map(p => p[0]).slice(0, 2).join('')}
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-sigma-azul truncate">{f.funcionario}</p>
                          <p className="text-xs text-sigma-azul/55 flex items-center gap-1"><User className="w-3 h-3" /> {f.cargo}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${f.tipo.includes('injustificada') ? 'bg-red-500/15 text-red-700' : f.tipo === 'Atraso' ? 'bg-amber-500/15 text-amber-700' : 'bg-sigma-azul/10 text-sigma-azulEscuro'}`}>
                        {f.tipo}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sigma-azul/75 whitespace-nowrap">{f.data}</td>
                    <td className="px-4 py-3 text-sigma-azul/75">{f.periodo}</td>
                    <td className="px-4 py-3 max-w-xs">
                      {f.abono ? (
                        <span className="text-xs inline-flex items-center gap-1 text-sigma-azul/80">
                          <FilePlus className="w-3.5 h-3.5 text-sigma-douradoEscuro" /> {f.abono}
                        </span>
                      ) : (
                        <span className="text-xs text-red-600 font-semibold">Sem justificativa</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${b.c}`}>
                        <BIc className="w-3 h-3" /> {b.t}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      {f.status !== 'aprovado' && (
                        <button className="mr-2 px-3 py-1.5 rounded-md bg-sigma-azul text-white text-[11px] font-bold hover:bg-sigma-azulEscuro transition-colors">
                          Analisar
                        </button>
                      )}
                      <button className="px-3 py-1.5 rounded-md border border-sigma-azul/15 text-sigma-azul/70 text-[11px] font-semibold hover:bg-sigma-azul-50 transition-colors">
                        Ver
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-4 p-4 rounded-xl bg-amber-500/5 border border-amber-500/15 text-xs text-amber-800/80 leading-relaxed">
          <strong className="text-amber-800">📋 Regra:</strong> ocorrências de falta injustificada e atrasos recorrentes alimentam automaticamente o módulo <strong>Disciplinar</strong> conforme política interna da Sigma Vértice.
        </div>
      </div>
    </div>
  )
}
