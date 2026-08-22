import { Settings, Shield, Users, Building2, KeyRound, FileCheck, Bell, Radio, Database, Plus, Search, Filter, ChevronRight, UserCog, Eye, Save } from 'lucide-react'

export default function AdministracaoPage() {
  const secoes = [
    { ic: Users, titulo: 'Gestão de Usuários', desc: 'Criar, inativar, resetar senha e vincular auth.users → funcionarios', cor: 'from-blue-500 to-blue-700' },
    { ic: Shield, titulo: 'Permissões e Perfis', desc: 'Role_sistema + permissões finas por módulo e ação', cor: 'from-red-500 to-red-700' },
    { ic: Building2, titulo: 'Unidades e Municípios', desc: 'Cadastrar novas unidades e vincular regiões e gestores', cor: 'from-emerald-500 to-emerald-700' },
    { ic: KeyRound, titulo: 'Autenticação e MFA', desc: 'Forçar MFA, tempo de sessão, bloqueio por IP e tentativas', cor: 'from-purple-500 to-purple-700' },
    { ic: FileCheck, titulo: 'Políticas do Sistema', desc: 'Valores advertências 1/2/3, impedimento 12 meses, limites upload', cor: 'from-amber-500 to-amber-700' },
    { ic: Bell, titulo: 'Notificações e Alertas', desc: 'Quais alertas cada perfil recebe: portal, push e e-mail', cor: 'from-sigma-dourado to-sigma-douradoEscuro' },
    { ic: Radio, titulo: 'Canais e Comunicados', desc: 'Categorias, aprovadores e publicações do Canal Informações', cor: 'from-cyan-500 to-cyan-700' },
    { ic: Database, titulo: 'Integrações e Storage', desc: 'Buckets Supabase, antimalware, chaves e webhooks externos', cor: 'from-slate-600 to-slate-800' },
  ]

  const configuracoes = [
    { chave: 'mfa_obrigatorio', valor: 'true', grupo: 'Segurança', tipo: 'boolean', descricao: 'Exigir MFA TOTP para todos os perfis após primeiro login.' },
    { chave: 'sessao_duracao_horas', valor: '8', grupo: 'Segurança', tipo: 'number', descricao: 'Duração máxima da sessão sem atividade.' },
    { chave: 'adv1_valor_reais', valor: '700,00', grupo: 'Disciplinar', tipo: 'currency', descricao: 'Multa aplicada na 1ª Advertência.' },
    { chave: 'adv2_valor_reais', valor: '800,00', grupo: 'Disciplinar', tipo: 'currency', descricao: 'Multa aplicada na 2ª Advertência.' },
    { chave: 'adv3_valor_reais', valor: '900,00', grupo: 'Disciplinar', tipo: 'currency', descricao: 'Multa aplicada na 3ª Advertência.' },
    { chave: 'impedimento_desligamento_meses', valor: '12', grupo: 'Disciplinar', tipo: 'number', descricao: 'Meses de impedimento para readmissão após desligamento por justa causa.' },
    { chave: 'chat_upload_tamanho_max_mb', valor: '50', grupo: 'Arquivos', tipo: 'number', descricao: 'Tamanho máximo por arquivo no chat e anexos de processo.' },
    { chave: 'viagem_exige_aprovacao_dg', valor: 'true', grupo: 'Viagens', tipo: 'boolean', descricao: 'Qualquer viagem só é liberada após aprovação do Diretor Geral.' },
    { chave: 'distribuicao_bot_ativa', valor: 'true', grupo: 'Processos', tipo: 'boolean', descricao: 'Ativar o bot de distribuição inteligente por % de compatibilidade.' },
  ]

  const grupoBadge = (g: string) => ({
    Segurança: 'bg-red-500/15 text-red-700',
    Disciplinar: 'bg-amber-500/15 text-amber-800',
    Arquivos: 'bg-blue-500/15 text-blue-700',
    Viagens: 'bg-emerald-500/15 text-emerald-700',
    Processos: 'bg-purple-500/15 text-purple-700',
  }[g] || 'bg-slate-500/15 text-slate-700')

  const tipoBadge = (t: string) => ({
    boolean: { cls: 'bg-sigma-azul/10 text-sigma-azulEscuro', txt: 'Sim/Não' },
    number: { cls: 'bg-slate-500/15 text-slate-700', txt: 'Número' },
    currency: { cls: 'bg-sigma-dourado/15 text-sigma-douradoEscuro', txt: 'Moeda (R$)' },
  }[t])

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-sigma-dourado to-sigma-douradoEscuro flex items-center justify-center shadow-gold">
              <Settings className="w-6 h-6 text-sigma-azul" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-sigma-azul">Administração</h1>
              <p className="text-sm text-sigma-azul/60">Central de configurações — acesso exclusivo Diretor Geral</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-red-500/10 border border-red-500/20 self-start sm:self-auto">
          <Shield className="w-4 h-4 text-red-700" />
          <span className="text-xs font-bold text-red-800 uppercase tracking-wider">Acesso restrito · role = diretor_geral</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {secoes.map((s, i) => {
          const SIc = s.ic
          return (
            <button key={s.titulo} className="rounded-2xl border border-sigma-azul/10 bg-white p-5 shadow-sm hover:shadow-md hover:border-sigma-dourado/30 transition-all text-left group animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${s.cor} flex items-center justify-center text-white mb-3 group-hover:scale-105 transition-transform shadow-sm`}>
                <SIc className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sigma-azul mb-1 text-sm">{s.titulo}</h3>
              <p className="text-[11px] text-sigma-azul/60 leading-relaxed mb-3">{s.desc}</p>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-sigma-douradoEscuro group-hover:text-sigma-dourado transition-colors">
                Abrir <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </button>
          )
        })}
      </div>

      <div className="rounded-2xl border border-sigma-azul/10 bg-white p-5 shadow-sm">
        <div className="flex flex-col md:flex-row gap-3 mb-5 items-start md:items-center justify-between">
          <div>
            <h2 className="font-bold text-sigma-azul flex items-center gap-2 text-lg">
              <UserCog className="w-5 h-5 text-sigma-douradoEscuro" /> Configurações do sistema
              <span className="text-[11px] font-mono font-normal bg-sigma-azul-100 text-sigma-azulEscuro px-2 py-0.5 rounded">public.configuracoes</span>
            </h2>
            <p className="text-xs text-sigma-azul/60 mt-1">
              Toda alteração grava automaticamente antes/depois na trilha de auditoria.
            </p>
          </div>
          <div className="flex gap-2 w-full md:w-auto flex-wrap">
            <div className="relative md:max-w-xs flex-1 min-w-[180px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sigma-azul/40" />
              <input placeholder="Buscar chave..." className="w-full pl-10 pr-4 py-2 rounded-lg border border-sigma-azul/15 text-xs focus:outline-none focus:ring-2 focus:ring-sigma-dourado/40" />
            </div>
            <button className="px-3 py-2 rounded-lg border border-sigma-azul/15 text-sigma-azul/70 hover:bg-sigma-azul-50 transition-colors flex items-center gap-1.5 text-xs">
              <Filter className="w-3.5 h-3.5" /> Grupo
            </button>
            <button className="px-3.5 py-2 rounded-lg bg-sigma-dourado text-sigma-azul text-xs font-bold hover:bg-sigma-douradoEscuro hover:text-white transition-colors flex items-center gap-1.5 shadow-gold">
              <Plus className="w-3.5 h-3.5" /> Nova chave
            </button>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-sigma-azul/10">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-sigma-azul-50 text-left text-[11px] uppercase tracking-wider text-sigma-azul/60">
                <th className="px-4 py-3 font-semibold">Grupo</th>
                <th className="px-4 py-3 font-semibold">Chave</th>
                <th className="px-4 py-3 font-semibold">Tipo</th>
                <th className="px-4 py-3 font-semibold">Valor atual</th>
                <th className="px-4 py-3 font-semibold">Descrição</th>
                <th className="px-4 py-3 font-semibold text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sigma-azul/5">
              {configuracoes.map((c, i) => {
                const t = tipoBadge(c.tipo)
                return (
                  <tr key={c.chave} className="hover:bg-sigma-azul-50/40 transition-colors animate-fade-in-up" style={{ animationDelay: `${i * 0.04}s` }}>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${grupoBadge(c.grupo)}`}>{c.grupo}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-mono text-xs font-bold text-sigma-douradoEscuro">{c.chave}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${t.cls}`}>{t.txt}</span>
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="text"
                        defaultValue={c.valor}
                        className="w-full max-w-[140px] px-3 py-1.5 rounded-lg border border-sigma-azul/15 text-sm font-bold text-sigma-azul focus:outline-none focus:ring-2 focus:ring-sigma-dourado/40 bg-sigma-azul-50/40 focus:bg-white"
                      />
                    </td>
                    <td className="px-4 py-3 text-xs text-sigma-azul/75 max-w-sm leading-relaxed">{c.descricao}</td>
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      <button className="px-2.5 py-1.5 rounded-md border border-sigma-azul/15 text-sigma-azul text-[11px] font-semibold hover:bg-sigma-azul-50 transition-colors inline-flex items-center gap-1 mr-2">
                        <Eye className="w-3 h-3" /> Histórico
                      </button>
                      <button className="px-2.5 py-1.5 rounded-md bg-sigma-dourado text-sigma-azul text-[11px] font-bold hover:bg-sigma-douradoEscuro hover:text-white transition-colors inline-flex items-center gap-1 shadow-gold">
                        <Save className="w-3 h-3" /> Salvar
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
