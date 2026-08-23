import { Building2, Search, Filter, Plus, MapPin, Users, FileText, Activity, ChevronRight } from 'lucide-react'
import Link from 'next/link'

export default function UnidadesPage() {
  const unidades = [
    {
      sigla: 'HQ',
      nome: 'Matriz Manaus — Diretoria Geral',
      endereco: 'Av. Sete de Setembro, 1000 — Centro, Manaus/AM',
      tipo: 'Sede Administrativa',
      funcionarios: 78,
      municipios_atuacao: 62,
      status: 'online',
      responsavel: 'Diretoria Geral',
    },
    {
      sigla: 'OP-MA',
      nome: 'Unidade Operacional Manaus',
      endereco: 'Distrito Industrial, Manaus/AM',
      tipo: 'Operacional',
      funcionarios: 49,
      municipios_atuacao: 12,
      status: 'online',
      responsavel: 'Diretoria de Operações',
    },
    {
      sigla: 'INT-MA',
      nome: 'Núcleo de Inteligência Manaus',
      endereco: 'Zona Centro-Sul, Manaus/AM',
      tipo: 'Inteligência',
      funcionarios: 21,
      municipios_atuacao: 62,
      status: 'online',
      responsavel: 'Coordenação de Inteligência',
    },
    {
      sigla: 'TEF',
      nome: 'Unidade Regional Tefé',
      endereco: 'Av. Getúlio Vargas, S/N — Centro, Tefé/AM',
      tipo: 'Regional Interior',
      funcionarios: 32,
      municipios_atuacao: 13,
      status: 'online',
      responsavel: 'Coordenação Tefé',
    },
    {
      sigla: 'PAR',
      nome: 'Unidade Regional Parintins',
      endereco: 'Rua Amazonas, 300 — Centro, Parintins/AM',
      tipo: 'Regional Interior',
      funcionarios: 28,
      municipios_atuacao: 8,
      status: 'ausente',
      responsavel: 'Coordenação Parintins',
    },
    {
      sigla: 'TAB',
      nome: 'Unidade de Fronteira Tabatinga',
      endereco: 'Av. Beira Rio, 880 — Tabatinga/AM',
      tipo: 'Fronteira',
      funcionarios: 24,
      municipios_atuacao: 7,
      status: 'online',
      responsavel: 'Coordenação Tabatinga',
    },
  ]

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-sigma-dourado to-sigma-douradoEscuro flex items-center justify-center shadow-gold">
              <Building2 className="w-6 h-6 text-sigma-azul" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-sigma-azul">Unidades</h1>
              <p className="text-sm text-sigma-azul/60">Sede, regionais, núcleos e postos avançados da Sigma Vértice</p>
            </div>
          </div>
        </div>
        <button className="px-4 py-2.5 rounded-lg bg-sigma-dourado text-sigma-azul text-sm font-bold hover:bg-sigma-douradoEscuro hover:text-white transition-colors flex items-center gap-2 self-start sm:self-auto shadow-gold">
          <Plus className="w-4 h-4" /> Cadastrar unidade
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-xl border border-sigma-azul/10 bg-white p-4 shadow-sm animate-fade-in-up">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase tracking-wider text-sigma-azul/50 font-semibold">Unidades cadastradas</span>
            <Building2 className="w-4 h-4 text-sigma-azul" />
          </div>
          <p className="text-2xl font-bold text-sigma-azul">5</p>
        </div>
        <div className="rounded-xl border border-sigma-azul/10 bg-white p-4 shadow-sm animate-fade-in-up" style={{ animationDelay: '0.05s' }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase tracking-wider text-sigma-azul/50 font-semibold">Funcionários alocados</span>
            <Users className="w-4 h-4 text-sigma-douradoEscuro" />
          </div>
          <p className="text-2xl font-bold text-sigma-douradoEscuro">232</p>
        </div>
        <div className="rounded-xl border border-sigma-azul/10 bg-white p-4 shadow-sm animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase tracking-wider text-sigma-azul/50 font-semibold">Online agora</span>
            <Activity className="w-4 h-4 text-emerald-700" />
          </div>
          <p className="text-2xl font-bold text-emerald-700">4</p>
        </div>
        <div className="rounded-xl border border-sigma-azul/10 bg-white p-4 shadow-sm animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase tracking-wider text-sigma-azul/50 font-semibold">Municípios cobertos</span>
            <MapPin className="w-4 h-4 text-sigma-azulEscuro" />
          </div>
          <p className="text-2xl font-bold text-sigma-azulEscuro">62</p>
        </div>
      </div>

      <div className="rounded-2xl border border-sigma-azul/10 bg-white p-5 shadow-sm">
        <div className="flex flex-col md:flex-row gap-3 mb-5">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sigma-azul/40" />
            <input placeholder="Buscar unidade, responsável ou cidade..." className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-sigma-azul/15 text-sm focus:outline-none focus:ring-2 focus:ring-sigma-dourado/40" />
          </div>
          <button className="px-3.5 py-2.5 rounded-lg border border-sigma-azul/15 text-sigma-azul/70 hover:bg-sigma-azul-50 transition-colors flex items-center gap-2 text-sm">
            <Filter className="w-4 h-4" /> Filtros
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {unidades.map((u, i) => (
            <div key={u.sigla} className="rounded-2xl border border-sigma-azul/10 bg-gradient-to-br from-white to-sigma-azul-50/30 p-5 hover:shadow-md hover:border-sigma-dourado/30 transition-all animate-fade-in-up group" style={{ animationDelay: `${i * 0.05}s` }}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sigma-azul to-sigma-azulEscuro text-white flex items-center justify-center font-bold text-xs shadow-sm group-hover:scale-105 transition-transform">
                    {u.sigla}
                  </div>
                  <div>
                    <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      u.status === 'online' ? 'bg-emerald-500/15 text-emerald-700' : 'bg-amber-500/15 text-amber-700'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${u.status === 'online' ? 'bg-emerald-500 animate-pulse-soft' : 'bg-amber-500'}`} />
                      {u.status === 'online' ? 'Operacional' : 'Atenção'}
                    </span>
                    <h3 className="font-bold text-sigma-azul mt-1.5">{u.nome}</h3>
                  </div>
                </div>
              </div>

              <p className="text-xs text-sigma-azul/65 mb-3 inline-flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 mt-0.5 text-sigma-azul/40" /> {u.endereco}
              </p>

              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="rounded-lg bg-white border border-sigma-azul/10 p-2.5 text-center">
                  <span className="text-[10px] uppercase tracking-wider text-sigma-azul/55 block">Tipo</span>
                  <p className="text-[11px] font-bold text-sigma-azul mt-0.5 truncate">{u.tipo}</p>
                </div>
                <div className="rounded-lg bg-white border border-sigma-azul/10 p-2.5 text-center">
                  <span className="text-[10px] uppercase tracking-wider text-sigma-azul/55 block flex items-center justify-center gap-0.5">
                    <Users className="w-2.5 h-2.5" /> Equipe
                  </span>
                  <p className="text-sm font-bold text-sigma-douradoEscuro mt-0.5">{u.funcionarios}</p>
                </div>
                <div className="rounded-lg bg-white border border-sigma-azul/10 p-2.5 text-center">
                  <span className="text-[10px] uppercase tracking-wider text-sigma-azul/55 block flex items-center justify-center gap-0.5">
                    <FileText className="w-2.5 h-2.5" /> Municípios
                  </span>
                  <p className="text-sm font-bold text-sigma-azul mt-0.5">{u.municipios_atuacao}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-sigma-azul/10 flex items-center justify-between gap-2">
                <div className="text-xs text-sigma-azul/60 min-w-0">
                  Resp.: <span className="font-semibold text-sigma-azul truncate inline-block max-w-[180px] align-bottom">{u.responsavel}</span>
                </div>
                <Link href="#" className="inline-flex items-center gap-1 text-xs font-bold text-sigma-douradoEscuro group-hover:text-sigma-dourado transition-colors flex-shrink-0">
                  Detalhes <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
