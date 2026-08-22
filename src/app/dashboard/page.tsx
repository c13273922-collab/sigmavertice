'use client'

import {
  Users,
  Wifi,
  FileText,
  Plane,
  Bell,
  Clock,
  TrendingUp,
  TrendingDown,
  MapPin,
  UserCheck,
  MessageSquare,
  FileCheck,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Radio,
  ChevronRight
} from 'lucide-react'

const cardsConfig = [
  {
    id: 'funcionarios',
    titulo: 'Funcionários',
    valor: '2.847',
    variacao: '+12',
    variacaoPositiva: true,
    icone: Users,
    cor: 'from-blue-500 to-indigo-600',
    sombra: 'shadow-blue-500/20',
    detalhe: 'Ativos no sistema',
  },
  {
    id: 'online',
    titulo: 'Online Agora',
    valor: '1.423',
    variacao: '+8,3%',
    variacaoPositiva: true,
    icone: Wifi,
    cor: 'from-emerald-500 to-teal-600',
    sombra: 'shadow-emerald-500/20',
    detalhe: 'Sessões ativas',
  },
  {
    id: 'processos',
    titulo: 'Processos',
    valor: '892',
    variacao: '+45',
    variacaoPositiva: true,
    icone: FileText,
    cor: 'from-violet-500 to-purple-600',
    sombra: 'shadow-violet-500/20',
    detalhe: 'Em andamento',
  },
  {
    id: 'viagens',
    titulo: 'Viagens',
    valor: '67',
    variacao: '-3',
    variacaoPositiva: false,
    icone: Plane,
    cor: 'from-orange-500 to-amber-600',
    sombra: 'shadow-orange-500/20',
    detalhe: 'Em deslocamento',
  },
  {
    id: 'alertas',
    titulo: 'Alertas',
    valor: '23',
    variacao: '+7',
    variacaoPositiva: false,
    icone: Bell,
    cor: 'from-rose-500 to-red-600',
    sombra: 'shadow-rose-500/20',
    detalhe: 'Críticos: 5',
  },
  {
    id: 'aprovacoes',
    titulo: 'Aprovações Pendentes',
    valor: '41',
    variacao: '+12',
    variacaoPositiva: false,
    icone: Clock,
    cor: 'from-sigma-dourado to-sigma-douradoEscuro',
    sombra: 'shadow-sigma-dourado/20',
    detalhe: 'Aguardando DG',
  },
]

const atividades = [
  {
    id: 1,
    usuario: 'Carlos Mendes',
    acao: 'aprovou o processo',
    complemento: 'Proc. 2026/0412 - Licença Viagem',
    horario: 'há 2 minutos',
    icone: CheckCircle2,
    cor: 'text-emerald-500 bg-emerald-500/10',
  },
  {
    id: 2,
    usuario: 'Ana Paula Silva',
    acao: 'criou novo caso',
    complemento: 'Caso 0891 - Manaus Unidade Centro',
    horario: 'há 12 minutos',
    icone: FolderKanban,
    cor: 'text-blue-500 bg-blue-500/10',
  },
  {
    id: 3,
    usuario: 'Sistema',
    acao: 'gerou alerta crítico',
    complemento: 'Servidor principal - uso CPU 94%',
    horario: 'há 25 minutos',
    icone: AlertTriangle,
    cor: 'text-rose-500 bg-rose-500/10',
  },
  {
    id: 4,
    usuario: 'Roberto Costa',
    acao: 'iniciou viagem',
    complemento: 'Manaus → Tabatinga / Voo 4421',
    horario: 'há 1 hora',
    icone: Plane,
    cor: 'text-orange-500 bg-orange-500/10',
  },
  {
    id: 5,
    usuario: 'Juliana Araújo',
    acao: 'assinou digitalmente',
    complemento: 'Documento PORTARIA 037/2026',
    horario: 'há 2 horas',
    icone: FileCheck,
    cor: 'text-violet-500 bg-violet-500/10',
  },
  {
    id: 6,
    usuario: 'Marcos Lima',
    acao: 'registrou presença',
    complemento: 'Unidade Norte - Plantão Noturno',
    horario: 'há 3 horas',
    icone: UserCheck,
    cor: 'text-teal-500 bg-teal-500/10',
  },
  {
    id: 7,
    usuario: 'Canal de Informações',
    acao: 'nova mensagem',
    complemento: 'Comunicado interno sobre RH',
    horario: 'há 4 horas',
    icone: Radio,
    cor: 'text-sigma-dourado bg-sigma-dourado/10',
  },
]

function FolderKanban(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
      <path d="M8 10v4" />
      <path d="M12 10v2" />
      <path d="M16 10v6" />
    </svg>
  )
}

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '0.05s' }}>
          <h1 className="text-2xl md:text-3xl font-bold text-sigma-azul tracking-tight">
            Centro de Comando <span className="text-sigma-dourado">DG</span>
          </h1>
          <p className="mt-1.5 text-sm text-sigma-textoClaro">
            Visão consolidada de todos os módulos do Sistema Sigma Vértice
          </p>
        </div>
        <div className="flex items-center gap-2 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-200 shadow-sm">
            <Calendar className="w-4 h-4 text-sigma-dourado" />
            <span className="text-sm font-medium text-sigma-azul">
              {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
        {cardsConfig.map((card, index) => {
          const Icon = card.icone
          return (
            <div
              key={card.id}
              className="group relative bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out opacity-0 animate-fade-in-up overflow-hidden"
              style={{ animationDelay: `${0.2 + index * 0.08}s` }}
            >
              <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${card.cor} opacity-[0.08] rounded-bl-[40px] -translate-y-6 translate-x-6 group-hover:scale-150 transition-transform duration-500`} />

              <div className="relative flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.cor} ${card.sombra} shadow-lg flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                  <Icon className="w-6 h-6 text-white" strokeWidth={2.2} />
                </div>
                <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${card.variacaoPositiva ? 'text-emerald-700 bg-emerald-50' : 'text-rose-700 bg-rose-50'}`}>
                  {card.variacaoPositiva ? (
                    <TrendingUp className="w-3.5 h-3.5" />
                  ) : (
                    <TrendingDown className="w-3.5 h-3.5" />
                  )}
                  {card.variacao}
                </div>
              </div>

              <div className="relative space-y-1">
                <p className="text-sm text-sigma-textoClaro font-medium">{card.titulo}</p>
                <p className="text-2xl md:text-3xl font-bold text-sigma-azul tracking-tight">
                  {card.valor}
                </p>
                <p className="text-xs text-gray-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-soft" />
                  {card.detalhe}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div
          className="xl:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden opacity-0 animate-fade-in-up"
          style={{ animationDelay: '0.7s' }}
        >
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sigma-azul to-sigma-azulClaro flex items-center justify-center shadow-blue">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-sigma-azul">Mapa Amazonas</h3>
                <p className="text-xs text-sigma-textoClaro">Unidades, equipes e operações em tempo real</p>
              </div>
            </div>
            <button className="flex items-center gap-1.5 text-sm font-medium text-sigma-dourado hover:text-sigma-douradoEscuro transition-colors">
              Ver mapa completo
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="relative h-[420px] bg-gradient-to-br from-sigma-azul/95 via-sigma-azul to-sigma-azulEscuro overflow-hidden">
            <svg viewBox="0 0 800 600" className="absolute inset-0 w-full h-full opacity-40">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#c9a227" strokeWidth="0.5" strokeOpacity="0.2" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            <div className="absolute inset-0 flex items-center justify-center">
              <svg viewBox="0 0 600 500" className="w-[80%] h-[80%] opacity-60">
                <path
                  d="M 120 80 Q 180 50, 260 70 T 420 60 Q 490 80, 520 150 T 510 280 Q 490 360, 420 400 T 280 430 Q 200 420, 150 380 T 90 260 Q 70 160, 120 80 Z"
                  fill="none"
                  stroke="#c9a227"
                  strokeWidth="2.5"
                  strokeDasharray="0"
                  className="drop-shadow-[0_0_15px_rgba(201,162,39,0.4)]"
                />
                <path
                  d="M 120 80 Q 180 50, 260 70 T 420 60 Q 490 80, 520 150 T 510 280 Q 490 360, 420 400 T 280 430 Q 200 420, 150 380 T 90 260 Q 70 160, 120 80 Z"
                  fill="rgba(201, 162, 39, 0.06)"
                />
                <path
                  d="M 200 150 Q 260 180, 280 250 T 320 350"
                  fill="none"
                  stroke="#c9a227"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  strokeOpacity="0.5"
                />
                <path
                  d="M 350 130 Q 380 220, 360 310"
                  fill="none"
                  stroke="#c9a227"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  strokeOpacity="0.5"
                />
              </svg>
            </div>

            <div className="absolute top-1/4 left-[28%] opacity-0 animate-fade-in" style={{ animationDelay: '0.9s' }}>
              <div className="relative">
                <div className="absolute inset-0 w-4 h-4 bg-emerald-400 rounded-full animate-ping opacity-50" />
                <div className="relative w-4 h-4 bg-emerald-500 rounded-full border-2 border-white shadow-lg" />
              </div>
              <div className="mt-1 px-2 py-1 bg-black/60 backdrop-blur rounded-md text-[10px] text-white whitespace-nowrap">
                Manaus · HQ
              </div>
            </div>
            <div className="absolute top-1/2 left-[42%] opacity-0 animate-fade-in" style={{ animationDelay: '1s' }}>
              <div className="relative">
                <div className="absolute inset-0 w-3 h-3 bg-blue-400 rounded-full animate-ping opacity-50" />
                <div className="relative w-3 h-3 bg-blue-500 rounded-full border-2 border-white shadow-lg" />
              </div>
            </div>
            <div className="absolute top-[38%] left-[55%] opacity-0 animate-fade-in" style={{ animationDelay: '1.05s' }}>
              <div className="relative">
                <div className="absolute inset-0 w-3 h-3 bg-amber-400 rounded-full animate-ping opacity-50" />
                <div className="relative w-3 h-3 bg-amber-500 rounded-full border-2 border-white shadow-lg" />
              </div>
            </div>
            <div className="absolute top-[60%] left-[60%] opacity-0 animate-fade-in" style={{ animationDelay: '1.1s' }}>
              <div className="relative">
                <div className="absolute inset-0 w-3 h-3 bg-violet-400 rounded-full animate-ping opacity-50" />
                <div className="relative w-3 h-3 bg-violet-500 rounded-full border-2 border-white shadow-lg" />
              </div>
              <div className="mt-1 px-2 py-1 bg-black/60 backdrop-blur rounded-md text-[10px] text-white whitespace-nowrap">
                Tabatinga
              </div>
            </div>
            <div className="absolute bottom-[25%] left-[35%] opacity-0 animate-fade-in" style={{ animationDelay: '1.15s' }}>
              <div className="relative">
                <div className="absolute inset-0 w-3 h-3 bg-teal-400 rounded-full animate-ping opacity-50" />
                <div className="relative w-3 h-3 bg-teal-500 rounded-full border-2 border-white shadow-lg" />
              </div>
            </div>
            <div className="absolute top-[55%] left-[22%] opacity-0 animate-fade-in" style={{ animationDelay: '1.2s' }}>
              <div className="relative">
                <div className="absolute inset-0 w-3 h-3 bg-rose-400 rounded-full animate-ping opacity-60" />
                <div className="relative w-3 h-3 bg-rose-500 rounded-full border-2 border-white shadow-lg animate-pulse-soft" />
              </div>
              <div className="mt-1 px-2 py-1 bg-rose-500/80 backdrop-blur rounded-md text-[10px] text-white whitespace-nowrap font-semibold">
                ! Alerta
              </div>
            </div>

            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-black/50 backdrop-blur rounded-lg text-[11px] text-white">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                Sede / HQ
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-black/50 backdrop-blur rounded-lg text-[11px] text-white">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                Unidade
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-black/50 backdrop-blur rounded-lg text-[11px] text-white">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse-soft" />
                Alerta
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-black/50 backdrop-blur rounded-lg text-[11px] text-white">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                Em operação
              </div>
            </div>
          </div>
        </div>

        <div
          className="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col max-h-[540px] opacity-0 animate-fade-in-up"
          style={{ animationDelay: '0.8s' }}
        >
          <div className="flex items-center justify-between p-5 border-b border-gray-100 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sigma-dourado to-sigma-douradoEscuro flex items-center justify-center shadow-gold">
                <MessageSquare className="w-5 h-5 text-sigma-azul" />
              </div>
              <div>
                <h3 className="font-bold text-sigma-azul">Atividades Recentes</h3>
                <p className="text-xs text-sigma-textoClaro">Atualizações do sistema em tempo real</p>
              </div>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse-soft shadow-[0_0_0_4px_rgba(16,185,129,0.15)]" />
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
            {atividades.map((atividade, index) => {
              const Icon = atividade.icone
              return (
                <div
                  key={atividade.id}
                  className="p-4 hover:bg-gray-50/70 transition-colors duration-200 group opacity-0 animate-fade-in"
                  style={{ animationDelay: `${0.9 + index * 0.06}s` }}
                >
                  <div className="flex gap-3">
                    <div className={`w-9 h-9 rounded-xl ${atividade.cor} flex items-center justify-center flex-shrink-0 transform group-hover:scale-110 transition-transform duration-200`}>
                      <Icon className="w-4.5 h-4.5" strokeWidth={2.2} />
                    </div>
                    <div className="flex-1 min-w-0 space-y-0.5">
                      <p className="text-sm text-sigma-azul leading-snug">
                        <span className="font-semibold">{atividade.usuario}</span>
                        <span className="text-sigma-textoClaro"> {atividade.acao} </span>
                        <span className="font-medium">{atividade.complemento}</span>
                      </p>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] text-gray-400">{atividade.horario}</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-sigma-dourado transition-colors flex-shrink-0 self-center" />
                  </div>
                </div>
              )
            })}
          </div>

          <div className="p-4 border-t border-gray-100 shrink-0">
            <button className="w-full py-2.5 rounded-xl bg-gray-50 border border-gray-100 text-sm font-medium text-sigma-azul hover:bg-sigma-azul hover:text-white hover:border-sigma-azul transition-all duration-200 flex items-center justify-center gap-2">
              Ver todas as atividades
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
