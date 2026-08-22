import { SearchCheck, Search, Filter, Download, Calendar, User, Clock, ShieldAlert, KeyRound, FileWarning, Database, CheckCircle2, AlertTriangle } from 'lucide-react'

export default function AuditoriaPage() {
  const logs = [
    { id: 14812, acao: 'LOGIN_MFA_SUCESSO', entidade: 'auth.sessao', entidade_id: 'SES-1c3f…a9', usuario: 'FUNC-0001 (DG)', ip: '200.xxx.xxx.42', data: '19/08 15:02:18', status: 'sucesso', antes: null, depois: 'autenticado' },
    { id: 14811, acao: 'UPDATE', entidade: 'public.processos', entidade_id: 'PROC-0281', usuario: 'FUNC-0002', ip: '200.xxx.xxx.18', data: '19/08 14:58:44', status: 'sucesso', antes: 'status="disponivel"', depois: 'status="analise"' },
    { id: 14810, acao: 'INSERT', entidade: 'public.mensagens', entidade_id: 'MSG-918271', usuario: 'FUNC-0001', ip: '200.xxx.xxx.42', data: '19/08 14:55:01', status: 'sucesso', antes: null, depois: 'hash_arquivo=sha512…f1a2b3' },
    { id: 14809, acao: 'LOGIN_SENHA_FALHA', entidade: 'auth.users', entidade_id: 'tentativa@…', usuario: '(autenticar)', ip: '45.xxx.xxx.11', data: '19/08 14:50:37', status: 'falha', antes: null, depois: null },
    { id: 14808, acao: 'DELETE (tentativa bloqueada)', entidade: 'public.documentos', entidade_id: 'DOC-0410', usuario: 'FUNC-0004', ip: '177.xxx.xxx.53', data: '19/08 14:42:11', status: 'bloqueado', antes: 'tentou apagar DOC', depois: 'RLS+trigger bloquearam' },
    { id: 14807, acao: 'SELECT_ACESSO', entidade: 'public.funcionarios', entidade_id: 'view massiva', usuario: 'FUNC-0003', ip: '200.xxx.xxx.37', data: '19/08 14:30:00', status: 'sucesso', antes: null, depois: '62 rows (regra perm_coord)' },
    { id: 14806, acao: 'UPDATE_SENHA', entidade: 'auth.users', entidade_id: 'usr-fa0b…1', usuario: 'FUNC-0007 (via ADM)', ip: '200.xxx.xxx.42', data: '19/08 14:11:52', status: 'sucesso', antes: 'hash (oculto)', depois: 'novo hash (oculto)' },
    { id: 14805, acao: 'UPLOAD_ARQUIVO', entidade: 'storage.bucket', entidade_id: 'PROC-0281_anexo.pdf', usuario: 'FUNC-0002', ip: '200.xxx.xxx.18', data: '19/08 14:02:08', status: 'sucesso', antes: null, depois: 'antimalware=OK, sha512=…a8f' },
  ]

  const badge = (s: string) => ({
    sucesso: { t: 'Sucesso', c: 'bg-emerald-500/15 text-emerald-700', i: CheckCircle2 },
    falha: { t: 'Falha', c: 'bg-red-500/15 text-red-700', i: AlertTriangle },
    bloqueado: { t: 'Bloqueado (segurança)', c: 'bg-red-700/25 text-red-800', i: ShieldAlert },
  }[s])

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-sigma-dourado to-sigma-douradoEscuro flex items-center justify-center shadow-gold">
              <SearchCheck className="w-6 h-6 text-sigma-azul" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-sigma-azul">Auditoria</h1>
              <p className="text-sm text-sigma-azul/60">Trilha íntegra e imutável de todas as ações do sistema</p>
            </div>
          </div>
        </div>
        <div className="flex gap-2 self-start sm:self-auto flex-wrap">
          <button className="px-3.5 py-2.5 rounded-lg border border-sigma-azul/15 text-sigma-azul/70 hover:bg-sigma-azul-50 transition-colors flex items-center gap-2 text-sm">
            <Download className="w-4 h-4" /> Exportar CSV
          </button>
          <button className="px-3.5 py-2.5 rounded-lg border border-sigma-azul/15 text-sigma-azul/70 hover:bg-sigma-azul-50 transition-colors flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4" /> Período
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { l: 'Eventos (24h)', v: 2841, i: Database, c: 'text-sigma-azul' },
          { l: 'Logins com sucesso', v: 412, i: KeyRound, c: 'text-emerald-700' },
          { l: 'Falhas de autenticação', v: 37, i: AlertTriangle, c: 'text-red-700' },
          { l: 'Ações bloqueadas (RLS)', v: 4, i: ShieldAlert, c: 'text-red-800' },
          { l: 'Arquivos verificados', v: 89, i: FileWarning, c: 'text-sigma-douradoEscuro' },
        ].map((k, i) => {
          const Ic = k.i
          return (
            <div key={k.l} className="rounded-xl border border-sigma-azul/10 bg-white p-4 shadow-sm animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase tracking-wider text-sigma-azul/50 font-semibold">{k.l}</span>
                <Ic className={`w-4 h-4 ${k.c}`} />
              </div>
              <p className={`text-2xl font-bold ${k.c}`}>{v => v.toLocaleString('pt-BR')({})}{typeof k.v === 'number' ? k.v.toLocaleString('pt-BR') : k.v}</p>
            </div>
          )
        })}
      </div>

      <div className="rounded-2xl border-2 border-red-500/20 bg-gradient-to-br from-red-500/[0.04] via-white to-red-500/[0.04] p-5 shadow-sm">
        <h2 className="font-bold text-sigma-azul mb-1 flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-red-700" /> Regras de auditoria — Sigma Vértice
        </h2>
        <ul className="text-xs text-sigma-azul/75 space-y-1 mt-2">
          <li>✅ Trigger genérica registra <strong>INSERT / UPDATE / DELETE</strong> com <code className="bg-sigma-azul-100 px-1 py-0.5 rounded">antes</code> e <code className="bg-sigma-azul-100 px-1 py-0.5 rounded">depois</code> em JSON.</li>
          <li>✅ <strong>Nunca armazena senha, token, MFA seed ou dado biométrico</strong> (colunas sensíveis são omitidas por trigger).</li>
          <li>✅ IP, User-Agent, sessão, usuário e horário (UTC) registrados em cada evento.</li>
          <li>✅ Tabela <code className="bg-sigma-azul-100 px-1 py-0.5 rounded">auditoria</code> só pode ser lida por <em>diretor_geral</em> (RLS). Nenhum usuário, nem coordenador, apaga ou edita.</li>
          <li>✅ Retenção mínima de 7 anos, exportação CSV assinada digitalmente.</li>
        </ul>
      </div>

      <div className="rounded-2xl border border-sigma-azul/10 bg-white p-5 shadow-sm">
        <div className="flex flex-col md:flex-row gap-3 mb-5">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sigma-azul/40" />
            <input placeholder="Buscar por usuário, protocolo, ação, IP..." className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-sigma-azul/15 text-sm focus:outline-none focus:ring-2 focus:ring-sigma-dourado/40" />
          </div>
          <button className="px-3.5 py-2.5 rounded-lg border border-sigma-azul/15 text-sigma-azul/70 hover:bg-sigma-azul-50 transition-colors flex items-center gap-2 text-sm">
            <Filter className="w-4 h-4" /> Filtros avançados
          </button>
        </div>

        <div className="overflow-x-auto rounded-xl border border-sigma-azul/10">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-sigma-azul-50 text-left text-[10px] uppercase tracking-wider text-sigma-azul/60">
                <th className="px-3 py-3 font-semibold"># ID</th>
                <th className="px-3 py-3 font-semibold">Data / Hora</th>
                <th className="px-3 py-3 font-semibold">Usuário</th>
                <th className="px-3 py-3 font-semibold">IP</th>
                <th className="px-3 py-3 font-semibold">Ação</th>
                <th className="px-3 py-3 font-semibold">Entidade</th>
                <th className="px-3 py-3 font-semibold">ID Registro</th>
                <th className="px-3 py-3 font-semibold">Antes</th>
                <th className="px-3 py-3 font-semibold">Depois</th>
                <th className="px-3 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sigma-azul/5 font-mono">
              {logs.map((l, i) => {
                const b = badge(l.status)
                const BIc = b.i
                return (
                  <tr key={l.id} className={`hover:bg-sigma-azul-50/40 transition-colors animate-fade-in-up ${l.status === 'bloqueado' ? 'bg-red-500/[0.03]' : ''}`} style={{ animationDelay: `${i * 0.04}s` }}>
                    <td className="px-3 py-3 text-sigma-azul/55">#{l.id}</td>
                    <td className="px-3 py-3 text-sigma-azul whitespace-nowrap flex items-center gap-1">
                      <Clock className="w-3 h-3 text-sigma-azul/40" /> {l.data}
                    </td>
                    <td className="px-3 py-3 text-sigma-azulEscuro whitespace-nowrap flex items-center gap-1">
                      <User className="w-3 h-3 text-sigma-azul/40" /> {l.usuario}
                    </td>
                    <td className="px-3 py-3 text-sigma-azul/65">{l.ip}</td>
                    <td className="px-3 py-3">
                      <span className={`px-2 py-0.5 rounded-full font-bold ${
                        l.acao.startsWith('LOGIN') ? 'bg-blue-500/15 text-blue-800' :
                        l.acao.startsWith('INSERT') ? 'bg-emerald-500/15 text-emerald-800' :
                        l.acao.startsWith('UPDATE') ? 'bg-amber-500/15 text-amber-800' :
                        l.acao.startsWith('DELETE') ? 'bg-red-500/15 text-red-800' :
                        l.acao.startsWith('SELECT') ? 'bg-slate-500/15 text-slate-800' :
                        'bg-purple-500/15 text-purple-800'
                      }`}>{l.acao}</span>
                    </td>
                    <td className="px-3 py-3 text-sigma-azul">{l.entidade}</td>
                    <td className="px-3 py-3 text-sigma-douradoEscuro font-bold truncate max-w-[120px]">{l.entidade_id}</td>
                    <td className="px-3 py-3 text-sigma-azul/60 truncate max-w-[180px]">{l.antes || '—'}</td>
                    <td className="px-3 py-3 text-emerald-700 truncate max-w-[180px]">{l.depois || '—'}</td>
                    <td className="px-3 py-3">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-bold whitespace-nowrap ${b.c}`}>
                        <BIc className="w-3 h-3" /> {b.t}
                      </span>
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
