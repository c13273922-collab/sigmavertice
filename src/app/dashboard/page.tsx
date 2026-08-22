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
  ChevronRight,
} from 'lucide-react'

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

      {/* ===== 6 CARDS HARDCODED, SEM ARRAY (NÃO TEM ERRO POSSÍVEL) ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">

        {/* CARD 1: FUNCIONARIOS */}
        <div className="group relative bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out opacity-0 animate-fade-in-up overflow-hidden" style={{ animationDelay: '0.2s' }}>
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 opacity-[0.08] rounded-bl-[40px] -translate-y-6 translate-x-6 group-hover:scale-150 transition-transform duration-500" />
          <div className="relative flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-blue-500/20 shadow-lg flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
              <Users className="w-6 h-6 text-white" strokeWidth={2.2} />
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full text-emerald-700 bg-emerald-50">
              <TrendingUp className="w-3.5 h-3.5" />
              +12
            </div>
          </div>
          <div className="relative space-y-1">
            <p className="text-sm text-sigma-textoClaro font-medium">Funcionários</p>
            <p className="text-2xl md:text-3xl font-bold text-sigma-azul tracking-tight">2.847</p>
            <p className="text-xs text-gray-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-soft" />
              Ativos no sistema
            </p>
          </div>
        </div>

        {/* CARD 2: ONLINE */}
        <div className="group relative bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out opacity-0 animate-fade-in-up overflow-hidden" style={{ animationDelay: '0.28s' }}>
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-600 opacity-[0.08] rounded-bl-[40px] -translate-y-6 translate-x-6 group-hover:scale-150 transition-transform duration-500" />
          <div className="relative flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-emerald-500/20 shadow-lg flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
              <Wifi className="w-6 h-6 text-white" strokeWidth={2.2} />
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full text-emerald-700 bg-emerald-50">
              <TrendingUp className="w-3.5 h-3.5" />
              +8,3%
            </div>
          </div>
          <div className="relative space-y-1">
            <p className="text-sm text-sigma-textoClaro font-medium">Online Agora</p>
            <p className="text-2xl md:text-3xl font-bold text-sigma-azul tracking-tight">1.423</p>
            <p className="text-xs text-gray-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-soft" />
              Sessões ativas
            </p>
          </div>
        </div>

        {/* CARD 3: PROCESSOS */}
        <div className="group relative bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out opacity-0 animate-fade-in-up overflow-hidden" style={{ animationDelay: '0.36s' }}>
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-violet-500 to-purple-600 opacity-[0.08] rounded-bl-[40px] -translate-y-6 translate-x-6 group-hover:scale-150 transition-transform duration-500" />
          <div className="relative flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-violet-500/20 shadow-lg flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
              <FileText className="w-6 h-6 text-white" strokeWidth={2.2} />
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full text-emerald-700 bg-emerald-50">
              <TrendingUp className="w-3.5 h-3.5" />
              +45
            </div>
          </div>
          <div className="relative space-y-1">
            <p className="text-sm text-sigma-textoClaro font-medium">Processos</p>
            <p className="text-2xl md:text-3xl font-bold text-sigma-azul tracking-tight">892</p>
            <p className="text-xs text-gray-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-soft" />
              Em andamento
            </p>
          </div>
        </div>

        {/* CARD 4: VIAGENS */}
        <div className="group relative bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out opacity-0 animate-fade-in-up overflow-hidden" style={{ animationDelay: '0.44s' }}>
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-orange-500 to-amber-600 opacity-[0.08] rounded-bl-[40px] -translate-y-6 translate-x-6 group-hover:scale-150 transition-transform duration-500" />
          <div className="relative flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 shadow-orange-500/20 shadow-lg flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
              <Plane className="w-6 h-6 text-white" strokeWidth={2.2} />
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full text-rose-700 bg-rose-50">
              <TrendingDown className="w-3.5 h-3.5" />
              -3
            </div>
          </div>
          <div className="relative space-y-1">
            <p className="text-sm text-sigma-textoClaro font-medium">Viagens</p>
            <p className="text-2xl md:text-3xl font-bold text-sigma-azul tracking-tight">67</p>
            <p className="text-xs text-gray-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-soft" />
              Em deslocamento
            </p>
          </div>
        </div>

        {/* CARD 5: ALERTAS */}
        <div className="group relative bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out opacity-0 animate-fade-in-up overflow-hidden" style={{ animationDelay: '0.52s' }}>
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-rose-500 to-red-600 opacity-[0.08] rounded-bl-[40px] -translate-y-6 translate-x-6 group-hover:scale-150 transition-transform duration-500" />
          <div className="relative flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-red-600 shadow-rose-500/20 shadow-lg flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
              <Bell className="w-6 h-6 text-white" strokeWidth={2.2} />
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full text-rose-700 bg-rose-50">
              <TrendingDown className="w-3.5 h-3.5" />
              +7
            </div>
          </div>
          <div className="relative space-y-1">
            <p className="text-sm text-sigma-textoClaro font-medium">Alertas</p>
            <p className="text-2xl md:text-3xl font-bold text-sigma-azul tracking-tight">23</p>
            <p className="text-xs text-gray-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-soft" />
              Críticos: 5
            </p>
          </div>
        </div>

        {/* CARD 6: APROVACOES */}
        <div className="group relative bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out opacity-0 animate-fade-in-up overflow-hidden" style={{ animationDelay: '0.6s' }}>
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-sigma-dourado to-sigma-douradoEscuro opacity-[0.08] rounded-bl-[40px] -translate-y-6 translate-x-6 group-hover:scale-150 transition-transform duration-500" />
          <div className="relative flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sigma-dourado to-sigma-douradoEscuro shadow-sigma-dourado/20 shadow-lg flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
              <Clock className="w-6 h-6 text-white" strokeWidth={2.2} />
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full text-rose-700 bg-rose-50">
              <TrendingDown className="w-3.5 h-3.5" />
              +12
            </div>
          </div>
          <div className="relative space-y-1">
            <p className="text-sm text-sigma-textoClaro font-medium">Aprovações Pendentes</p>
            <p className="text-2xl md:text-3xl font-bold text-sigma-azul tracking-tight">41</p>
            <p className="text-xs text-gray-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-soft" />
              Aguardando DG
            </p>
          </div>
        </div>
      </div>

      {/* ===== MAPA + ATIVIDADES (HARDCODED, SEM ARRAY DE OBJETOS) ===== */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* MAPA */}
        <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden opacity-0 animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
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
                <path d="M 120 80 Q 180 50, 260 70 T 420 60 Q 490 80, 520 150 T 510 280 Q 490 360, 420 400 T 280 430 Q 200 420, 150 380 T 90 260 Q 70 160, 120 80 Z" fill="none" stroke="#c9a227" strokeWidth="2.5" className="drop-shadow-[0_0_15px_rgba(201,162,39,0.4)]" />
                <path d="M 120 80 Q 180 50, 260 70 T 420 60 Q 490 80, 520 150 T 510 280 Q 490 360, 420 400 T 280 430 Q 200 420, 150 380 T 90 260 Q 70 160, 120 80 Z" fill="rgba(201, 162, 39, 0.06)" />
                <path d="M 200 150 Q 260 180, 280 250 T 320 350" fill="none" stroke="#c9a227" strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.5" />
                <path d="M 350 130 Q 380 220, 360 310" fill="none" stroke="#c9a227" strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.5" />
              </svg>
            </div>
            <div className="absolute top-1/4 left-[28%] opacity-0 animate-fade-in" style={{ animationDelay: '0.9s' }}>
              <div className="relative">
                <div className="absolute inset-0 w-4 h-4 bg-emerald-400 rounded-full animate-ping opacity-50" />
                <div className="relative w-4 h-4 bg-emerald-500 rounded-full border-2 border-white shadow-lg" />
              </div>
              <div className="mt-1 px-2 py-1 bg-black/60 backdrop-blur rounded-md text-[10px] text-white whitespace-nowrap">Manaus · HQ</div>
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
              <div className="mt-1 px-2 py-1 bg-black/60 backdrop-blur rounded-md text-[10px] text-white whitespace-nowrap">Tabatinga</div>
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
              <div className="mt-1 px-2 py-1 bg-rose-500/80 backdrop-blur rounded-md text-[10px] text-white whitespace-nowrap font-semibold">! Alerta</div>
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-black/50 backdrop-blur rounded-lg text-[11px] text-white"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />Sede / HQ</div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-black/50 backdrop-blur rounded-lg text-[11px] text-white"><span className="w-2.5 h-2.5 rounded-full bg-blue-500" />Unidade</div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-black/50 backdrop-blur rounded-lg text-[11px] text-white"><span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse-soft" />Alerta</div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-black/50 backdrop-blur rounded-lg text-[11px] text-white"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" />Em operação</div>
            </div>
          </div>
        </div>

        {/* ATIVIDADES RECENTES (HARDCODED SEM ARRAY) */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col max-h-[540px] opacity-0 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
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

            {/* ATIV 1 */}
            <div className="p-4 hover:bg-gray-50/70 transition-colors duration-200 group opacity-0 animate-fade-in" style={{ animationDelay: '0.9s' }}>
              <div className="flex gap-3">
                <div className="w-9 h-9 rounded-xl text-emerald-500 bg-emerald-500/10 flex items-center justify-center flex-shrink-0 transform group-hover:scale-110 transition-transform duration-200">
                  <CheckCircle2 className="w-4.5 h-4.5" strokeWidth={2.2} />
                </div>
                <div className="flex-1 min-w-0 space-y-0.5">
                  <p className="text-sm text-sigma-azul leading-snug">
                    <span className="font-semibold">Carlos Mendes</span>
                    <span className="text-sigma-textoClaro"> aprovou o processo </span>
                    <span className="font-medium">Proc. 2026/0412 - Licença Viagem</span>
                  </p>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-gray-400">há 2 minutos</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-sigma-dourado transition-colors flex-shrink-0 self-center" />
              </div>
            </div>

            {/* ATIV 2 */}
            <div className="p-4 hover:bg-gray-50/70 transition-colors duration-200 group opacity-0 animate-fade-in" style={{ animationDelay: '0.96s' }}>
              <div className="flex gap-3">
                <div className="w-9 h-9 rounded-xl text-blue-500 bg-blue-500/10 flex items-center justify-center flex-shrink-0 transform group-hover:scale-110 transition-transform duration-200">
                  {/* FolderKanban substituto inline (componente lucide real, inline fora de arrays) */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7V5a2 2 0 0 1 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H19a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z"/><path d="M3 7h18"/></svg>
                </div>
                <div className="flex-1 min-w-0 space-y-0.5">
                  <p className="text-sm text-sigma-azul leading-snug">
                    <span className="font-semibold">Ana Paula Silva</span>
                    <span className="text-sigma-textoClaro"> criou novo caso </span>
                    <span className="font-medium">Caso 0891 - Manaus Unidade Centro</span>
                  </p>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-gray-400">há 12 minutos</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-sigma-dourado transition-colors flex-shrink-0 self-center" />
              </div>
            </div>

            {/* ATIV 3 */}
            <div className="p-4 hover:bg-gray-50/70 transition-colors duration-200 group opacity-0 animate-fade-in" style={{ animationDelay: '1.02s' }}>
              <div className="flex gap-3">
                <div className="w-9 h-9 rounded-xl text-rose-500 bg-rose-500/10 flex items-center justify-center flex-shrink-0 transform group-hover:scale-110 transition-transform duration-200">
                  <AlertTriangle className="w-4.5 h-4.5" strokeWidth={2.2} />
                </div>
                <div className="flex-1 min-w-0 space-y-0.5">
                  <p className="text-sm text-sigma-azul leading-snug">
                    <span className="font-semibold">Sistema</span>
                    <span className="text-sigma-textoClaro"> gerou alerta crítico </span>
                    <span className="font-medium">Servidor principal - uso CPU 94%</span>
                  </p>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-gray-400">há 25 minutos</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-sigma-dourado transition-colors flex-shrink-0 self-center" />
              </div>
            </div>

            {/* ATIV 4 */}
            <div className="p-4 hover:bg-gray-50/70 transition-colors duration-200 group opacity-0 animate-fade-in" style={{ animationDelay: '1.08s' }}>
              <div className="flex gap-3">
                <div className="w-9 h-9 rounded-xl text-orange-500 bg-orange-500/10 flex items-center justify-center flex-shrink-0 transform group-hover:scale-110 transition-transform duration-200">
                  <Plane className="w-4.5 h-4.5" strokeWidth={2.2} />
                </div>
                <div className="flex-1 min-w-0 space-y-0.5">
                  <p className="text-sm text-sigma-azul leading-snug">
                    <span className="font-semibold">Roberto Costa</span>
                    <span className="text-sigma-textoClaro"> iniciou viagem </span>
                    <span className="font-medium">Manaus → Tabatinga / Voo 4421</span>
                  </p>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-gray-400">há 1 hora</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-sigma-dourado transition-colors flex-shrink-0 self-center" />
              </div>
            </div>

            {/* ATIV 5 */}
            <div className="p-4 hover:bg-gray-50/70 transition-colors duration-200 group opacity-0 animate-fade-in" style={{ animationDelay: '1.14s' }}>
              <div className="flex gap-3">
                <div className="w-9 h-9 rounded-xl text-violet-500 bg-violet-500/10 flex items-center justify-center flex-shrink-0 transform group-hover:scale-110 transition-transform duration-200">
                  <FileCheck className="w-4.5 h-4.5" strokeWidth={2.2} />
                </div>
                <div className="flex-1 min-w-0 space-y-0.5">
                  <p className="text-sm text-sigma-azul leading-snug">
                    <span className="font-semibold">Juliana Araújo</span>
                    <span className="text-sigma-textoClaro"> assinou digitalmente </span>
                    <span className="font-medium">Documento PORTARIA 037/2026</span>
                  </p>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-gray-400">há 2 horas</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-sigma-dourado transition-colors flex-shrink-0 self-center" />
              </div>
            </div>

            {/* ATIV 6 */}
            <div className="p-4 hover:bg-gray-50/70 transition-colors duration-200 group opacity-0 animate-fade-in" style={{ animationDelay: '1.2s' }}>
              <div className="flex gap-3">
                <div className="w-9 h-9 rounded-xl text-teal-500 bg-teal-500/10 flex items-center justify-center flex-shrink-0 transform group-hover:scale-110 transition-transform duration-200">
                  <UserCheck className="w-4.5 h-4.5" strokeWidth={2.2} />
                </div>
                <div className="flex-1 min-w-0 space-y-0.5">
                  <p className="text-sm text-sigma-azul leading-snug">
                    <span className="font-semibold">Marcos Lima</span>
                    <span className="text-sigma-textoClaro"> registrou presença </span>
                    <span className="font-medium">Unidade Norte - Plantão Noturno</span>
                  </p>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-gray-400">há 3 horas</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-sigma-dourado transition-colors flex-shrink-0 self-center" />
              </div>
            </div>

            {/* ATIV 7 */}
            <div className="p-4 hover:bg-gray-50/70 transition-colors duration-200 group opacity-0 animate-fade-in" style={{ animationDelay: '1.26s' }}>
              <div className="flex gap-3">
                <div className="w-9 h-9 rounded-xl text-sigma-dourado bg-sigma-dourado/10 flex items-center justify-center flex-shrink-0 transform group-hover:scale-110 transition-transform duration-200">
                  <Radio className="w-4.5 h-4.5" strokeWidth={2.2} />
                </div>
                <div className="flex-1 min-w-0 space-y-0.5">
                  <p className="text-sm text-sigma-azul leading-snug">
                    <span className="font-semibold">Canal de Informações</span>
                    <span className="text-sigma-textoClaro"> nova mensagem </span>
                    <span className="font-medium">Comunicado interno sobre RH</span>
                  </p>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-gray-400">há 4 horas</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-sigma-dourado transition-colors flex-shrink-0 self-center" />
              </div>
            </div>

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
