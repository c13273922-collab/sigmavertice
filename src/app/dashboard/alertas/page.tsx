import { Bell, Search, Filter, CheckCircle2, Clock, XCircle, AlertTriangle, AlertOctagon, Info } from 'lucide-react'

export default function AlertasPage() {
  const alertas = [
    { protocolo: 'ALT-0071', titulo: 'Viagem VT-0092 aguardando aprovação há mais de 24h', tipo: 'urgente', origem: 'Fluxo de aprovação', alvo: 'Diretor Geral', criado: '19/08 14:12', status: 'ativo' },
    { protocolo: 'ALT-0070', titulo: '3 processos sem responsável atribuído — distribuição manual sugerida', tipo: 'alto', origem: 'Módulo Processos', alvo: 'Coordenação', criado: '19/08 12:05', status: 'ativo' },
    { protocolo: 'ALT-0069', titulo: 'Tentativas de login com falhas recorrentes (IP suspeito)', tipo: 'urgente', origem: 'Segurança / MFA', alvo: 'Administração', criado: '19/08 11:40', status: 'ativo' },
    { protocolo: 'ALT-0068', titulo: 'Taxa de cumprimento de prazos na unidade Tefé abaixo da meta', tipo: 'medio', origem: 'Indicadores', alvo: 'Diretoria', criado: '19/08 08:21', status: 'lido' },
    { protocolo: 'ALT-0067', titulo: '2º aniversário de admissão — enviar cumprimentos automáticos', tipo: 'baixo', origem: 'Gestão de Pessoas', alvo: 'RH', criado: '18/08 19:00', status: 'resolvido' },
  ]

  function tipoInfo(t: string) {
    if (t === 'urgente') return { t: 'Urgente', c: 'bg-red-500/15 text-red-700', bar: 'bg-red-500' }
    if (t === 'alto') return { t: 'Alto', c: 'bg-orange-500/15 text-orange-700', bar: 'bg-orange-500' }
    if (t === 'medio') return { t: 'Médio', c: 'bg-amber-500/15 text-amber-700', bar: 'bg-amber-500' }
    return { t: 'Informativo', c: 'bg-blue-500/15 text-blue-700', bar: 'bg-blue-500' }
  }

  function statusInfo(s: string) {
    if (s === 'ativo') return { t: 'Ativo', c: 'bg-red-500/15 text-red-700' }
    if (s === 'lido') return { t: 'Lido', c: 'bg-amber-500/15 text-amber-700' }
    return { t: 'Resolvido', c: 'bg-emerald-500/15 text-emerald-700' }
  }

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
        <div className="rounded-xl border border-sigma-azul/10 bg-white p-4 shadow-sm animate-fade-in-up">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] uppercase tracking-wider font-bold bg-red-500/15 text-red-700 px-2 py-0.5 rounded-full">Ativos (urgentes)</span>
            <AlertOctagon className="w-4 h-4 text-red-700" />
          </div>
          <p className="text-2xl font-bold text-sigma-azul">7</p>
        </div>
        <div className="rounded-xl border border-sigma-azul/10 bg-white p-4 shadow-sm animate-fade-in-up" style={{ animationDelay: '0.05s' }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] uppercase tracking-wider font-bold bg-amber-500/15 text-amber-700 px-2 py-0.5 rounded-full">Ativos (demais)</span>
            <Bell className="w-4 h-4 text-amber-700" />
          </div>
          <p className="text-2xl font-bold text-sigma-azul">18</p>
        </div>
        <div className="rounded-xl border border-sigma-azul/10 bg-white p-4 shadow-sm animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] uppercase tracking-wider font-bold bg-blue-500/15 text-blue-700 px-2 py-0.5 rounded-full">Lidos hoje</span>
            <CheckCircle2 className="w-4 h-4 text-blue-700" />
          </div>
          <p className="text-2xl font-bold text-sigma-azul">29</p>
        </div>
        <div className="rounded-xl border border-sigma-azul/10 bg-white p-4 shadow-sm animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] uppercase tracking-wider font-bold bg-emerald-500/15 text-emerald-700 px-2 py-0.5 rounded-full">Resolvidos 7d</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
          </div>
          <p className="text-2xl font-bold text-sigma-azul">124</p>
        </div>
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
            const tp = tipoInfo(a.tipo)
            const st = statusInfo(a.status)
            return (
              <div key={a.protocolo} className={`rounded-xl border p-4 hover:shadow-md transition-all animate-fade-in-up ${a.status === 'ativo' && a.tipo === 'urgente' ? 'border-red-500/30 bg-red-500/5 shadow-[0_0_0_3px_rgba(239,68,68,0.08)]' : 'border-sigma-azul/10 bg-white hover:border-sigma-dourado/30'}`} style={{ animationDelay: `${i * 0.05}s` }}>
                <div className="flex gap-4 items-start">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${a.tipo === 'urgente' ? 'bg-red-500/15 animate-pulse-soft' : 'bg-sigma-dourado/15'}`}>
                    {a.tipo === 'urgente' && <AlertOctagon className="w-5 h-5 text-red-700" />}
                    {a.tipo === 'alto' && <AlertTriangle className="w-5 h-5 text-sigma-douradoEscuro" />}
                    {a.tipo === 'medio' && <Bell className="w-5 h-5 text-sigma-douradoEscuro" />}
                    {a.tipo === 'baixo' && <Info className="w-5 h-5 text-sigma-douradoEscuro" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap gap-2 mb-1.5 items-center">
                      <span className="font-mono text-[11px] font-bold text-sigma-douradoEscuro bg-sigma-dourado/10 px-2 py-0.5 rounded">{a.protocolo}</span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${tp.c} inline-flex items-center gap-1`}>
                        {a.tipo === 'urgente' && <AlertOctagon className="w-3 h-3" />}
                        {a.tipo === 'alto' && <AlertTriangle className="w-3 h-3" />}
                        {a.tipo === 'medio' && <Bell className="w-3 h-3" />}
                        {a.tipo === 'baixo' && <Info className="w-3 h-3" />}
                        {tp.t}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${st.c} inline-flex items-center gap-1`}>
                        {a.status === 'ativo' && <Clock className="w-3 h-3" />}
                        {a.status === 'lido' && <Bell className="w-3 h-3" />}
                        {a.status === 'resolvido' && <CheckCircle2 className="w-3 h-3" />}
                        {st.t}
                      </span>
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
