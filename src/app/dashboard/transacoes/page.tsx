import { Receipt, ArrowUpRight, ArrowDownLeft, Search, Filter, Plus, Eye, Clock, User } from 'lucide-react'

export default function TransacoesPage() {
  const transacoes = [
    { protocolo: 'TRX-0198', descricao: 'Adiantamento viagem VT-0091 — Ana Beatriz', tipo: 'saida', valor: 2100, responsavel: 'Tesouraria', data: '19/08/2026 14:02', status: 'aprovado', categoria: 'Adiantamento' },
    { protocolo: 'TRX-0197', descricao: 'Pagamento fornecedor logística TAB', tipo: 'saida', valor: 5820, responsavel: 'Financeiro', data: '19/08/2026 11:30', status: 'aprovado', categoria: 'Fornecedor' },
    { protocolo: 'TRX-0196', descricao: 'Reembolso de adiantamento — R. Costa VT-0089', tipo: 'entrada', valor: 350.5, responsavel: 'Rafael Costa', data: '18/08/2026 17:48', status: 'conciliado', categoria: 'Reembolso' },
    { protocolo: 'TRX-0195', descricao: 'Solicitação de saída — Manutenção unidade Tefé', tipo: 'saida', valor: 1240, responsavel: 'Coordenação', data: '18/08/2026 09:12', status: 'pendente', categoria: 'Manutenção' },
  ]

  const badge = (s: string) => ({
    aprovado: { t: 'Aprovado', c: 'bg-emerald-500/15 text-emerald-700' },
    conciliado: { t: 'Conciliado', c: 'bg-blue-500/15 text-blue-700' },
    pendente: { t: 'Pendente aprovação', c: 'bg-amber-500/15 text-amber-700' },
  }[s])

  const formatar = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-sigma-dourado to-sigma-douradoEscuro flex items-center justify-center shadow-gold">
              <Receipt className="w-6 h-6 text-sigma-azul" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-sigma-azul">Transações</h1>
              <p className="text-sm text-sigma-azul/60">Controle de entradas, saídas e adiantamentos com trilha de auditoria</p>
            </div>
          </div>
        </div>
        <button className="px-4 py-2.5 rounded-lg bg-sigma-dourado text-sigma-azul text-sm font-bold hover:bg-sigma-douradoEscuro hover:text-white transition-colors flex items-center gap-2 self-start sm:self-auto shadow-gold">
          <Plus className="w-4 h-4" /> Nova Transação
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 to-white p-5 shadow-sm animate-fade-in-up">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase tracking-wider text-emerald-700 font-semibold">Entradas (mês)</span>
            <ArrowDownLeft className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="text-2xl font-bold text-emerald-700">R$ 28.450,00</p>
          <p className="text-[11px] text-emerald-700/70 mt-1">14 transações · 100% conciliadas</p>
        </div>
        <div className="rounded-xl border border-red-500/20 bg-gradient-to-br from-red-500/5 to-white p-5 shadow-sm animate-fade-in-up" style={{ animationDelay: '0.05s' }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase tracking-wider text-red-700 font-semibold">Saídas (mês)</span>
            <ArrowUpRight className="w-5 h-5 text-red-600" />
          </div>
          <p className="text-2xl font-bold text-red-700">R$ 42.350,00</p>
          <p className="text-[11px] text-red-700/70 mt-1">38 transações · 3 aprovações pendentes</p>
        </div>
        <div className="rounded-xl border border-sigma-dourado/30 bg-gradient-to-br from-sigma-dourado/10 to-white p-5 shadow-sm animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase tracking-wider text-sigma-douradoEscuro font-semibold">Saldo projetado</span>
            <Receipt className="w-5 h-5 text-sigma-douradoEscuro" />
          </div>
          <p className="text-2xl font-bold text-sigma-azul">R$ 186.218,40</p>
          <p className="text-[11px] text-sigma-azul/60 mt-1">Fechamento em 31/08/2026</p>
        </div>
      </div>

      <div className="rounded-2xl border border-sigma-azul/10 bg-white p-5 shadow-sm">
        <div className="flex flex-col md:flex-row gap-3 mb-5">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sigma-azul/40" />
            <input placeholder="Buscar TRX-, descrição ou responsável..." className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-sigma-azul/15 text-sm focus:outline-none focus:ring-2 focus:ring-sigma-dourado/40" />
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
                <th className="px-4 py-3 font-semibold">Descrição</th>
                <th className="px-4 py-3 font-semibold">Tipo</th>
                <th className="px-4 py-3 font-semibold">Valor</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Responsável</th>
                <th className="px-4 py-3 font-semibold">Data</th>
                <th className="px-4 py-3 font-semibold text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sigma-azul/5">
              {transacoes.map((t, i) => {
                const b = badge(t.status)
                return (
                  <tr key={t.protocolo} className="hover:bg-sigma-azul-50/40 transition-colors animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
                    <td className="px-4 py-3 font-mono text-xs font-bold text-sigma-douradoEscuro">{t.protocolo}</td>
                    <td className="px-4 py-3 text-sigma-azul font-medium max-w-xs">{t.descricao}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 text-xs font-bold ${t.tipo === 'entrada' ? 'text-emerald-700' : 'text-red-700'}`}>
                        {t.tipo === 'entrada' ? <ArrowDownLeft className="w-3.5 h-3.5" /> : <ArrowUpRight className="w-3.5 h-3.5" />}
                        {t.tipo.charAt(0).toUpperCase() + t.tipo.slice(1)}
                      </span>
                    </td>
                    <td className={`px-4 py-3 font-bold ${t.tipo === 'entrada' ? 'text-emerald-700' : 'text-red-700'}`}>
                      {t.tipo === 'entrada' ? '+' : '-'} {formatar(t.valor)}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${b.c}`}>{b.t}</span>
                    </td>
                    <td className="px-4 py-3 text-sigma-azul/75 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-sigma-azul/40" /> {t.responsavel}
                    </td>
                    <td className="px-4 py-3 text-sigma-azul/75 flex items-center gap-1.5 whitespace-nowrap">
                      <Clock className="w-3.5 h-3.5 text-sigma-azul/40" /> {t.data}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button className="text-xs font-semibold text-sigma-douradoEscuro hover:text-sigma-dourado transition-colors inline-flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" /> Comprovante
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
