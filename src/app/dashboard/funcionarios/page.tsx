import { Users, UserPlus, Search, Filter, Shield } from 'lucide-react'
import Link from 'next/link'

export default function FuncionariosPage() {
  const perfis = [
    { tag: '🔴', nome: 'Diretor Geral', qtd: 1, cor: 'bg-red-500/15 text-red-700' },
    { tag: '🔵', nome: 'Diretor Central', qtd: 4, cor: 'bg-blue-500/15 text-blue-700' },
    { tag: '🟢', nome: 'Coordenador', qtd: 12, cor: 'bg-emerald-500/15 text-emerald-700' },
    { tag: '⚪', nome: 'Funcionário', qtd: 295, cor: 'bg-slate-500/15 text-slate-700' },
  ]

  const funcionarios = [
    { protocolo: 'FUNC-0001', nome: 'Usuário DG Teste', cargo: 'Diretor Geral', role: 'diretor_geral', unidade: 'Manaus — HQ', status: 'online' },
    { protocolo: 'FUNC-0002', nome: 'Ana Beatriz Souza', cargo: 'Diretora de Operações', role: 'diretor_central', unidade: 'Manaus — HQ', status: 'online' },
    { protocolo: 'FUNC-0003', nome: 'Carlos Mendes', cargo: 'Coordenador de Inteligência', role: 'coordenador', unidade: 'Manaus — Inteligência', status: 'ausente' },
    { protocolo: 'FUNC-0004', nome: 'Juliana Ramos', cargo: 'Analista de Processos', role: 'funcionario', unidade: 'Tefé', status: 'offline' },
    { protocolo: 'FUNC-0005', nome: 'Rafael Costa', cargo: 'Agente de Campo', role: 'funcionario', unidade: 'Tabatinga', status: 'online' },
  ]

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-sigma-dourado to-sigma-douradoEscuro flex items-center justify-center shadow-gold">
              <Users className="w-6 h-6 text-sigma-azul" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-sigma-azul">Funcionários</h1>
              <p className="text-sm text-sigma-azul/60">Gestão de pessoas, cargos, permissões e unidades</p>
            </div>
          </div>
        </div>
        <button className="px-4 py-2.5 rounded-lg bg-sigma-dourado text-sigma-azul text-sm font-bold hover:bg-sigma-douradoEscuro hover:text-white transition-colors flex items-center gap-2 self-start sm:self-auto shadow-gold">
          <UserPlus className="w-4 h-4" /> Novo Funcionário
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {perfis.map((p, i) => (
          <div key={p.nome} className="rounded-xl border border-sigma-azul/10 bg-white p-4 shadow-sm animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase tracking-wider text-sigma-azul/50 font-semibold">{p.nome}</span>
              <span className="text-lg">{p.tag}</span>
            </div>
            <p className="text-2xl font-bold text-sigma-azul">{p.qtd}</p>
            <span className={`inline-block mt-2 px-2.5 py-0.5 rounded-full text-xs font-semibold ${p.cor}`}>role_{p.nome.toLowerCase().replace(' ', '_')}</span>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-sigma-azul/10 bg-white p-5 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5">
          <div className="flex gap-2 flex-1 max-w-xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sigma-azul/40" />
              <input placeholder="Buscar por nome, protocolo ou cargo..." className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-sigma-azul/15 text-sm focus:outline-none focus:ring-2 focus:ring-sigma-dourado/40 focus:border-sigma-dourado" />
            </div>
            <button className="px-3.5 py-2.5 rounded-lg border border-sigma-azul/15 text-sigma-azul/70 hover:bg-sigma-azul-50 transition-colors flex items-center gap-2">
              <Filter className="w-4 h-4" /> Filtros
            </button>
          </div>
          <div className="flex items-center gap-2 text-xs text-sigma-azul/55">
            <Shield className="w-4 h-4" /> Dados protegidos por RLS
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-sigma-azul/10">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-sigma-azul-50 text-left text-xs uppercase tracking-wider text-sigma-azul/60">
                <th className="px-4 py-3 font-semibold">Protocolo</th>
                <th className="px-4 py-3 font-semibold">Nome</th>
                <th className="px-4 py-3 font-semibold">Cargo</th>
                <th className="px-4 py-3 font-semibold">Unidade</th>
                <th className="px-4 py-3 font-semibold">Perfil</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sigma-azul/5">
              {funcionarios.map((f, i) => (
                <tr key={f.protocolo} className="hover:bg-sigma-azul-50/40 transition-colors animate-fade-in-up" style={{ animationDelay: `${i * 0.04}s` }}>
                  <td className="px-4 py-3 font-mono text-xs text-sigma-douradoEscuro font-semibold">{f.protocolo}</td>
                  <td className="px-4 py-3 font-medium text-sigma-azul">{f.nome}</td>
                  <td className="px-4 py-3 text-sigma-azul/75">{f.cargo}</td>
                  <td className="px-4 py-3 text-sigma-azul/75">{f.unidade}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-sigma-azul/10 text-sigma-azulEscuro">
                      {f.role}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${
                      f.status === 'online' ? 'text-emerald-700' : f.status === 'ausente' ? 'text-amber-700' : 'text-slate-600'
                    }`}>
                      <span className={`w-2 h-2 rounded-full ${f.status === 'online' ? 'bg-emerald-500 animate-pulse-soft' : f.status === 'ausente' ? 'bg-amber-500' : 'bg-slate-400'}`} />
                      {f.status.charAt(0).toUpperCase() + f.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link href="#" className="text-xs font-semibold text-sigma-douradoEscuro hover:text-sigma-dourado transition-colors">
                      Ver detalhes →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-xs text-sigma-azul/50 text-center">
          ⚙️ Quando a migration <code className="bg-sigma-azul-100 px-1.5 py-0.5 rounded">funcionarios</code> estiver populada, esta tela carregará dados reais com paginação e filtros por unidade/cargo.
        </p>
      </div>
    </div>
  )
}
