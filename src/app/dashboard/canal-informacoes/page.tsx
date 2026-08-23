import { Radio, Megaphone, Search, Filter, Plus, ExternalLink, Clock, Pin, ChevronRight } from 'lucide-react'
import Link from 'next/link'

export default function CanalInformacoesPage() {
  const destaques = [
    { titulo: 'Comunicado Oficial — Novo Canal: extinção do WhatsApp', categoria: 'Oficial DG', data: '19/08/2026', destacado: true },
    { titulo: 'Instrução: procedimento de entrada em unidades Tabatinga/AM', categoria: 'Operação', data: '18/08/2026' },
    { titulo: 'Publicado Calendário de Reuniões da Diretoria — 2º semestre/2026', categoria: 'Agenda', data: '17/08/2026' },
  ]

  const canais = [
    { nome: 'Comunicados Oficiais', cor: 'from-sigma-dourado to-sigma-douradoEscuro', descricao: 'Avisos formais assinados pela Diretoria Geral', qtd: 87 },
    { nome: 'Instruções Operacionais', cor: 'from-sigma-azul to-sigma-azulEscuro', descricao: 'Procedimentos, manuais e fluxos executivos', qtd: 124 },
    { nome: 'Boletins de Inteligência', cor: 'from-emerald-600 to-emerald-800', descricao: 'Resumos analíticos e monitoramento estratégico', qtd: 46 },
    { nome: 'Recursos Humanos', cor: 'from-blue-500 to-blue-700', descricao: 'Benefícios, admissão, férias e carreira', qtd: 63 },
    { nome: 'TI & Segurança', cor: 'from-purple-600 to-purple-800', descricao: 'Avisos de sistema, MFA, tokens e acesso', qtd: 39 },
    { nome: 'Agenda da Diretoria', cor: 'from-red-500 to-red-700', descricao: 'Reuniões, comitês e eventos oficiais', qtd: 21 },
  ]

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-sigma-dourado to-sigma-douradoEscuro flex items-center justify-center shadow-gold">
              <Radio className="w-6 h-6 text-sigma-azul" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-sigma-azul">Canal de Informações</h1>
              <p className="text-sm text-sigma-azul/60">Comunicados oficiais, boletins e documentos de referência</p>
            </div>
          </div>
        </div>
        <button className="px-4 py-2.5 rounded-lg bg-sigma-dourado text-sigma-azul text-sm font-bold hover:bg-sigma-douradoEscuro hover:text-white transition-colors flex items-center gap-2 self-start sm:self-auto shadow-gold">
          <Plus className="w-4 h-4" /> Publicar comunicado
        </button>
      </div>

      <div className="rounded-2xl overflow-hidden border border-red-500/20 bg-gradient-to-br from-red-500/8 via-white to-white shadow-sm animate-fade-in-up">
        <div className="bg-gradient-to-r from-red-600 to-red-500 px-5 py-3 flex items-center gap-3">
          <Megaphone className="w-5 h-5 text-white" />
          <span className="text-xs uppercase tracking-widest font-bold text-white">Aviso Prioritário · Diretoria Geral</span>
        </div>
        <div className="p-5">
          <h2 className="text-xl font-bold text-sigma-azul mb-2 flex items-start gap-2">
            🚨 {destaques[0].titulo}
          </h2>
          <p className="text-sm text-sigma-azul/75 leading-relaxed mb-3">
            A partir desta data, o WhatsApp deixa de ser meio oficial de comunicação interna da Sigma Vértice.
            Todos os avisos, protocolos, chat, arquivos e processos passam a ser exclusivamente pelos servidores internos e pelo presente Portal.
            Instruções de instalação foram enviadas por e-mail a cada colaborador com seus códigos pessoais de ativação.
          </p>
          <div className="flex flex-wrap gap-2 items-center justify-between">
            <div className="flex gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-red-500/15 text-red-700">Sigilo: Restrito</span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-sigma-dourado/15 text-sigma-douradoEscuro">{destaques[0].categoria}</span>
              <span className="text-[11px] text-sigma-azul/55 flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {destaques[0].data}</span>
            </div>
            <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-sigma-azul text-white text-xs font-bold hover:bg-sigma-azulEscuro transition-colors">
              Ler comunicado completo <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {canais.map((c, i) => (
          <div key={c.nome} className="rounded-2xl border border-sigma-azul/10 bg-white p-5 shadow-sm hover:shadow-md hover:border-sigma-dourado/30 transition-all cursor-pointer group animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
            <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${c.cor} flex items-center justify-center text-white shadow-sm mb-3 group-hover:scale-105 transition-transform`}>
              <Radio className="w-5 h-5" />
            </div>
            <div className="flex items-start justify-between gap-3 mb-1">
              <h3 className="font-bold text-sigma-azul">{c.nome}</h3>
              <span className="text-[11px] font-bold text-sigma-douradoEscuro bg-sigma-dourado/10 px-2 py-0.5 rounded-full whitespace-nowrap">
                {c.qtd} publicações
              </span>
            </div>
            <p className="text-xs text-sigma-azul/65 mb-3 leading-relaxed">{c.descricao}</p>
            <Link href="#" className="text-xs font-bold text-sigma-douradoEscuro group-hover:text-sigma-dourado transition-colors inline-flex items-center gap-1">
              Abrir canal <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-sigma-azul/10 bg-white p-5 shadow-sm">
        <div className="flex flex-col md:flex-row gap-3 mb-5 items-start md:items-center justify-between">
          <h2 className="font-bold text-sigma-azul flex items-center gap-2">
            <Pin className="w-5 h-5 text-sigma-douradoEscuro" /> Publicações recentes
          </h2>
          <div className="flex gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sigma-azul/40" />
              <input placeholder="Buscar no canal..." className="w-full pl-10 pr-4 py-2 rounded-lg border border-sigma-azul/15 text-xs focus:outline-none focus:ring-2 focus:ring-sigma-dourado/40" />
            </div>
            <button className="px-3 py-2 rounded-lg border border-sigma-azul/15 text-sigma-azul/70 hover:bg-sigma-azul-50 transition-colors flex items-center gap-1.5 text-xs">
              <Filter className="w-3.5 h-3.5" /> Filtros
            </button>
          </div>
        </div>

        <div className="space-y-2.5">
          {destaques.concat([
            { titulo: 'Atualização: valores diária de viagem — nova tabela vigente 01/09', categoria: 'Financeiro', data: '16/08/2026' },
            { titulo: 'Convite: pesquisa de clima organizacional (anônima e confidencial)', categoria: 'RH', data: '14/08/2026' },
          ]).filter((_, i) => i > 0).concat([
            { titulo: 'Atualização: valores diária de viagem — nova tabela vigente 01/09', categoria: 'Financeiro', data: '16/08/2026' },
            { titulo: 'Convite: pesquisa de clima organizacional (anônima e confidencial)', categoria: 'RH', data: '14/08/2026' },
          ]).slice(0, 5).map((d, i) => (
            <div key={i} className="flex items-center justify-between gap-4 p-3.5 rounded-xl hover:bg-sigma-azul-50 transition-colors group border border-transparent hover:border-sigma-dourado/20 animate-fade-in-up" style={{ animationDelay: `${i * 0.04}s` }}>
              <div className="flex items-start gap-3 min-w-0 flex-1">
                <div className="w-8 h-8 rounded-lg bg-sigma-dourado/15 flex items-center justify-center flex-shrink-0 group-hover:bg-sigma-dourado/25 transition-colors">
                  <Radio className="w-4 h-4 text-sigma-douradoEscuro" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-semibold text-sigma-azul truncate group-hover:text-sigma-douradoEscuro transition-colors">{d.titulo}</h4>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sigma-azul/10 text-sigma-azulEscuro">{d.categoria}</span>
                    <span className="text-[10px] text-sigma-azul/55 flex items-center gap-1"><Clock className="w-3 h-3" /> {d.data}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button className="p-2 rounded-md text-sigma-azul/50 hover:text-sigma-azul hover:bg-sigma-azul-50 transition-colors" title="Abrir anexo">
                  <ExternalLink className="w-4 h-4" />
                </button>
                <ChevronRight className="w-4 h-4 text-sigma-azul/30 group-hover:text-sigma-douradoEscuro transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
