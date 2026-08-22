import { Bell, Search, Filter, CheckCircle2, Clock, XCircle, AlertTriangle, AlertOctagon, Info } from 'lucide-react'

export default function AlertasPage() {
  const alertas = [
    { protocolo: 'ALT-0071', titulo: 'Viagem VT-0092 aguardando aprovação há mais de 24h', tipo: 'urgente', origem: 'Fluxo de aprovação', alvo: 'Diretor Geral', criado: '19/08 14:12', status: 'ativo' },
    { protocolo: 'ALT-0070', titulo: '3 processos sem responsável atribuído — distribuição manual sugerida', tipo: 'alto', origem: 'Módulo Processos', alvo: 'Coordenação', criado: '19/08 12:05', status: 'ativo' },
    { protocolo: 'ALT-0069', titulo: 'Tentativas de login com falhas recorrentes (IP suspeito)', tipo: 'urgente', origem: 'Segurança / MFA', alvo: 'Administração', criado: '19/08 11:40', status: 'ativo' },
    { protocolo: 'ALT-0068', titulo: 'Taxa de cumprimento de prazos na unidade Tefé abaixo da meta', tipo: 'medio', origem: 'Indicadores', alvo: 'Diretoria', criado: '19/08 08:21', status: 'lido' },
    { protocolo: 'ALT-0067', titulo: '2º aniversário de admissão — enviar cumprimentos automáticos', tipo: 'baixo', origem: 'Gestão de Pessoas', alvo: 'RH', criado: '18/08 19:00', status: 'resolvido' },
  ]

  const tipo = (t: string) => ({
    urgente: { t: 'Urgente', c: 'bg-red-500/15 text-red-700', i: AlertOctagon, bar: 'bg-red-500' },
    alto: { t: 'Alto', c: 'bg-orange-500/15 text-orange-700', i: AlertTriangle, bar: 'bg-orange-500' },
    medio: { t: 'Médio', c: 'bg-amber-500/15 text-amber-700', i: Bell, bar: 'bg-amber-500' },
    baixo: { t: 'Informativo', c: 'bg-blue-500/15 text-blue-700', i: Info, bar: 'bg-blue-500' },
  }[t])

  const status = (s: string) => ({
    ativo: { t: 'Ativo', c: 'bg-red-500/15 text-red-700', i: Clock },
    lido: { t: 'Lido', c: 'bg-amber-500/15 text-amber-700', i: Bell },
    resolvido: { t: 'Resolvido', c: 'bg-emerald-500/15 text-emerald-700', i: CheckCircle2 },
  }[s])

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-sigma-dourado to-sigma-douradoEscuro flex items-center justify-center shadow-gold">
              <Bell className="w-6 h-6 text-sigma-azul" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-sigma-azul">Alertas</h1>
              <p className="text-sm text-sigma-azul/60">Notificações priorizadas, ações pendentes e monitoramento</p>
            </div>
          </div>
        </div>
        <div className="flex gap-2 self-start sm:self-auto flex-wrap">
          <button className="px-3.5 py-2 rounded-lg bg-sigma-azul/10 text-sigma-azulEscuro text-xs font-bold hover:bg-sigma-azul hover:text-white transition-colors">
            Marcar todos como lidos
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { l: 'Ativos (urgentes)', v: 7, c: 'bg-red-500/15 text-red-700', i: AlertOctagon },
          { l: 'Ativos (demais)', v: 18, c: 'bg-amber-500/15 text-amber-700', i: Bell },
          { l: 'Lidos hoje', v: 29, c: 'bg-blue-500/15 text-blue-700', i: CheckCircle2 },
          { l: 'Resolvidos 7d', v: 124, c: 'bg-emerald-500/15 text-emerald-700', i: CheckCircle2 },
        ].map((k, i) => {
          const Ic = k.i
          return (
            <div key={k.l} className="rounded-xl border border-sigma-azul/10 bg-white p-4 shadow-sm animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[11px] uppercase tracking-wider font-bold ${k.c} px-2 py-0.5 rounded-full`}>{k.l}</span>
                <Ic className={`w-4 h-4 ${k.c}`} />
              </div>
              <p className="text-2xl font-bold text-sigma-azul">{k.v}</p>
            </div>
          )
        })}
      </div>

      <div className="rounded-2xl border border-sigma-azul/10 bg-white p-5 shadow-sm">
        <div className="flex flex-col md:flex-row gap-3 mb-5">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sigma-azul/40" />
            <input placeholder="Buscar alerta, protocolo ou palavra-chave..." className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-sigma-azul/15 text-sm focus:outline-none focus:ring-2 focus:ring-sigma-dourado/40" />
          </div>
          <button className="px-3.5 py-2.5 rounded-lg border border-sigma-azul/15 text-sigma-azul/70 hover:bg-sigma-azul-50 transition-colors flex items-center gap-2 text-sm">
            <Filter className="w-4 h-4" /> Filtros
          </button>
          <div className="inline-flex rounded-lg border border-sigma-azul/15 p-1 shadow-sm bg-sigma-azul-50/50">
            {['Todos', 'Ativos', 'Lidos', 'Resolvidos'].map((t, i) => (
              <button key={t} className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${i === 0 ? 'bg-white text-sigma-azul shadow-sm' : 'text-sigma-azul/60 hover:text-sigma-azul'}`}>{t}</button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {alertas.map((a, i) => {
            const tp = tipo(a.tipo)
            const st = status(a.status)
            const TIc = tp.i
            const SIc = st.i
            return (
              <div key={a.protocolo} className={`rounded-xl border p-4 hover:shadow-md transition-all animate-fade-in-up ${a.status === 'ativo' && a.tipo === 'urgente' ? 'border-red-500/30 bg-red-500/5 shadow-[0_0_0_3px_rgba(239,68,68,0.08)]' : 'border-sigma-azul/10 bg-white hover:border-sigma-dourado/30'}`} style={{ animationDelay: `${i * 0.05}s` }}>
                <div className="flex gap-4 items-start">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${a.tipo === 'urgente' ? 'bg-red-500/15 animate-pulse-soft' : 'bg-sigma-dourado/15'}`}>
                    <TIc className={`w-5 h-5 ${a.tipo === 'urgente' ? 'text-red-700' : 'text-sigma-douradoEscuro'}`} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap gap-2 mb-1.5 items-center">
                      <span className="font-mono text-[11px] font-bold text-sigma-douradoEscuro bg-sigma-dourado/10 px-2 py-0.5 rounded">{a.protocolo}</span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${tp.c} inline-flex items-center gap-1`}><TIc className="w-3 h-3" /> {tp.t}</span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${st.c} inline-flex items-center gap-1`}><SIc className="w-3 h-3" /> {st.t}</span>
                      <span className="text-[11px] text-sigma-azul/55 ml-auto flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {a.criado}</span>
                    </div>
                    <h3 className="font-semibold text-sigma-azul">{a.titulo}</h3>
                    <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-sigma-azul/55">
                      <span>Origem: <strong className="text-sigma-azul/75">{a.origem}</strong></span>
                      <span>Alvo: <strong className="text-sigma-azul/75">{a.alvo}</strong></span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    {a.status === 'ativo' && (
                      <>
                        <button className="px-3 py-1.5 rounded-md bg-sigma-azul text-white text-[11px] font-bold hover:bg-sigma-azulEscuro transition-colors whitespace-nowrap">
                          Resolver
                        </button>
                        <button className="px-3 py-1.5 rounded-md border border-sigma-azul/15 text-sigma-azul text-[11px] font-semibold hover:bg-sigma-azul-50 transition-colors">
                          Ignorar
                        </button>
                      </>
                    )}
                    {a.status === 'resolvido' && (
                      <button className="px-3 py-1.5 rounded-md border border-sigma-azul/15 text-sigma-azul/60 text-[11px] font-semibold hover:bg-sigma-azul-50 transition-colors">
                        Detalhes
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
