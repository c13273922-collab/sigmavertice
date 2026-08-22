'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  LayoutDashboard,
  Map,
  Users,
  MessageSquare,
  FileText,
  Plane,
  FileCheck,
  Receipt,
  Brain,
  BarChart3,
  Activity,
  Bell,
  CalendarX2,
  Scale,
  Radio,
  FileBarChart,
  Building2,
  SearchCheck,
  Settings,
  Shield,
  ChevronLeft,
  ChevronRight,
  LogOut
} from 'lucide-react'

export default function Sidebar() {
  const [colapsado, setColapsado] = useState(false)
  const pathname = usePathname() || ''

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard' || pathname === '/dashboard/'
    }
    return pathname.startsWith(href)
  }

  // SVG inline do FolderKanban (evita passar componente via array/objeto)
  const IconFolderKanban = (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 7V5a2 2 0 0 1 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H19a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z"/>
      <path d="M3 7h18"/>
    </svg>
  )

  return (
    <aside className={`${colapsado ? 'w-20' : 'w-72'} bg-sigma-azul text-white flex flex-col transition-all duration-300 ease-in-out border-r border-white/10 shrink-0`}>
      <div className={`p-5 border-b border-white/10 flex items-center ${colapsado ? 'justify-center' : 'justify-between'} min-h-[80px]`}>
        {!colapsado ? (
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-sigma-dourado to-sigma-douradoEscuro flex items-center justify-center flex-shrink-0 shadow-gold">
              <Shield className="w-6 h-6 text-sigma-azul" strokeWidth={2.5} />
            </div>
            <div className="min-w-0">
              <h1 className="text-lg font-bold tracking-tight leading-tight truncate">
                Sigma <span className="text-sigma-dourado">Vértice</span>
              </h1>
              <p className="text-[10px] text-white/50 uppercase tracking-wider truncate">
                Diretoria Geral
              </p>
            </div>
          </div>
        ) : (
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-sigma-dourado to-sigma-douradoEscuro flex items-center justify-center shadow-gold">
            <Shield className="w-6 h-6 text-sigma-azul" strokeWidth={2.5} />
          </div>
        )}
        <button onClick={() => setColapsado(!colapsado)} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors duration-200 text-white/60 hover:text-white" title={colapsado ? 'Expandir menu' : 'Recolher menu'}>
          {colapsado ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto p-3 space-y-1 scrollbar-thin">
        {!colapsado && (
          <p className="px-3 pt-2 pb-1 text-[10px] uppercase tracking-widest text-white/35 font-semibold">
            Módulos do Sistema
          </p>
        )}

        {/* ===== 20 ITENS HARDCODED, NENHUM ARRAY, NENHUMA FUNÇÃO EM DADOS ===== */}

        {/* 1 Dashboard */}
        <Link href="/dashboard" className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 relative ${isActive('/dashboard') && !pathname.startsWith('/dashboard/') ? 'bg-gradient-to-r from-sigma-dourado/25 to-sigma-dourado/10 text-sigma-dourado border border-sigma-dourado/20 shadow-gold' : 'text-white/70 hover:text-white hover:bg-white/5'} ${colapsado ? 'justify-center' : ''}`} title={colapsado ? 'Dashboard' : undefined}>
          <LayoutDashboard className={`w-5 h-5 flex-shrink-0 transition-all duration-200 ${isActive('/dashboard') && !pathname.startsWith('/dashboard/') ? 'scale-110' : 'group-hover:scale-110'}`} strokeWidth={isActive('/dashboard') && !pathname.startsWith('/dashboard/') ? 2.5 : 2} />
          {!colapsado && <span className="text-sm font-medium truncate">Dashboard</span>}
          {isActive('/dashboard') && !pathname.startsWith('/dashboard/') && !colapsado && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-sigma-dourado animate-pulse-soft" />}
        </Link>

        {/* 2 Mapa Amazonas */}
        <Link href="/dashboard/mapa-amazonas" className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 relative ${isActive('/dashboard/mapa-amazonas') ? 'bg-gradient-to-r from-sigma-dourado/25 to-sigma-dourado/10 text-sigma-dourado border border-sigma-dourado/20 shadow-gold' : 'text-white/70 hover:text-white hover:bg-white/5'} ${colapsado ? 'justify-center' : ''}`} title={colapsado ? 'Mapa Amazonas' : undefined}>
          <Map className={`w-5 h-5 flex-shrink-0 transition-all duration-200 ${isActive('/dashboard/mapa-amazonas') ? 'scale-110' : 'group-hover:scale-110'}`} strokeWidth={isActive('/dashboard/mapa-amazonas') ? 2.5 : 2} />
          {!colapsado && <span className="text-sm font-medium truncate">Mapa Amazonas</span>}
          {isActive('/dashboard/mapa-amazonas') && !colapsado && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-sigma-dourado animate-pulse-soft" />}
        </Link>

        {/* 3 Funcionários */}
        <Link href="/dashboard/funcionarios" className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 relative ${isActive('/dashboard/funcionarios') ? 'bg-gradient-to-r from-sigma-dourado/25 to-sigma-dourado/10 text-sigma-dourado border border-sigma-dourado/20 shadow-gold' : 'text-white/70 hover:text-white hover:bg-white/5'} ${colapsado ? 'justify-center' : ''}`} title={colapsado ? 'Funcionários' : undefined}>
          <Users className={`w-5 h-5 flex-shrink-0 transition-all duration-200 ${isActive('/dashboard/funcionarios') ? 'scale-110' : 'group-hover:scale-110'}`} strokeWidth={isActive('/dashboard/funcionarios') ? 2.5 : 2} />
          {!colapsado && <span className="text-sm font-medium truncate">Funcionários</span>}
          {isActive('/dashboard/funcionarios') && !colapsado && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-sigma-dourado animate-pulse-soft" />}
        </Link>

        {/* 4 Chat */}
        <Link href="/dashboard/chat" className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 relative ${isActive('/dashboard/chat') ? 'bg-gradient-to-r from-sigma-dourado/25 to-sigma-dourado/10 text-sigma-dourado border border-sigma-dourado/20 shadow-gold' : 'text-white/70 hover:text-white hover:bg-white/5'} ${colapsado ? 'justify-center' : ''}`} title={colapsado ? 'Chat' : undefined}>
          <MessageSquare className={`w-5 h-5 flex-shrink-0 transition-all duration-200 ${isActive('/dashboard/chat') ? 'scale-110' : 'group-hover:scale-110'}`} strokeWidth={isActive('/dashboard/chat') ? 2.5 : 2} />
          {!colapsado && <span className="text-sm font-medium truncate">Chat</span>}
          {isActive('/dashboard/chat') && !colapsado && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-sigma-dourado animate-pulse-soft" />}
        </Link>

        {/* 5 Processos */}
        <Link href="/dashboard/processos" className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 relative ${isActive('/dashboard/processos') ? 'bg-gradient-to-r from-sigma-dourado/25 to-sigma-dourado/10 text-sigma-dourado border border-sigma-dourado/20 shadow-gold' : 'text-white/70 hover:text-white hover:bg-white/5'} ${colapsado ? 'justify-center' : ''}`} title={colapsado ? 'Processos' : undefined}>
          <FileText className={`w-5 h-5 flex-shrink-0 transition-all duration-200 ${isActive('/dashboard/processos') ? 'scale-110' : 'group-hover:scale-110'}`} strokeWidth={isActive('/dashboard/processos') ? 2.5 : 2} />
          {!colapsado && <span className="text-sm font-medium truncate">Processos</span>}
          {isActive('/dashboard/processos') && !colapsado && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-sigma-dourado animate-pulse-soft" />}
        </Link>

        {/* 6 Casos */}
        <Link href="/dashboard/casos" className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 relative ${isActive('/dashboard/casos') ? 'bg-gradient-to-r from-sigma-dourado/25 to-sigma-dourado/10 text-sigma-dourado border border-sigma-dourado/20 shadow-gold' : 'text-white/70 hover:text-white hover:bg-white/5'} ${colapsado ? 'justify-center' : ''}`} title={colapsado ? 'Casos' : undefined}>
          <IconFolderKanban className={`w-5 h-5 flex-shrink-0 transition-all duration-200 ${isActive('/dashboard/casos') ? 'scale-110' : 'group-hover:scale-110'}`} strokeWidth={isActive('/dashboard/casos') ? 2.5 : 2} />
          {!colapsado && <span className="text-sm font-medium truncate">Casos</span>}
          {isActive('/dashboard/casos') && !colapsado && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-sigma-dourado animate-pulse-soft" />}
        </Link>

        {/* 7 Viagens */}
        <Link href="/dashboard/viagens" className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 relative ${isActive('/dashboard/viagens') ? 'bg-gradient-to-r from-sigma-dourado/25 to-sigma-dourado/10 text-sigma-dourado border border-sigma-dourado/20 shadow-gold' : 'text-white/70 hover:text-white hover:bg-white/5'} ${colapsado ? 'justify-center' : ''}`} title={colapsado ? 'Viagens' : undefined}>
          <Plane className={`w-5 h-5 flex-shrink-0 transition-all duration-200 ${isActive('/dashboard/viagens') ? 'scale-110' : 'group-hover:scale-110'}`} strokeWidth={isActive('/dashboard/viagens') ? 2.5 : 2} />
          {!colapsado && <span className="text-sm font-medium truncate">Viagens</span>}
          {isActive('/dashboard/viagens') && !colapsado && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-sigma-dourado animate-pulse-soft" />}
        </Link>

        {/* 8 Documentos */}
        <Link href="/dashboard/documentos" className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 relative ${isActive('/dashboard/documentos') ? 'bg-gradient-to-r from-sigma-dourado/25 to-sigma-dourado/10 text-sigma-dourado border border-sigma-dourado/20 shadow-gold' : 'text-white/70 hover:text-white hover:bg-white/5'} ${colapsado ? 'justify-center' : ''}`} title={colapsado ? 'Documentos' : undefined}>
          <FileCheck className={`w-5 h-5 flex-shrink-0 transition-all duration-200 ${isActive('/dashboard/documentos') ? 'scale-110' : 'group-hover:scale-110'}`} strokeWidth={isActive('/dashboard/documentos') ? 2.5 : 2} />
          {!colapsado && <span className="text-sm font-medium truncate">Documentos</span>}
          {isActive('/dashboard/documentos') && !colapsado && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-sigma-dourado animate-pulse-soft" />}
        </Link>

        {/* 9 Transações */}
        <Link href="/dashboard/transacoes" className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 relative ${isActive('/dashboard/transacoes') ? 'bg-gradient-to-r from-sigma-dourado/25 to-sigma-dourado/10 text-sigma-dourado border border-sigma-dourado/20 shadow-gold' : 'text-white/70 hover:text-white hover:bg-white/5'} ${colapsado ? 'justify-center' : ''}`} title={colapsado ? 'Transações' : undefined}>
          <Receipt className={`w-5 h-5 flex-shrink-0 transition-all duration-200 ${isActive('/dashboard/transacoes') ? 'scale-110' : 'group-hover:scale-110'}`} strokeWidth={isActive('/dashboard/transacoes') ? 2.5 : 2} />
          {!colapsado && <span className="text-sm font-medium truncate">Transações</span>}
          {isActive('/dashboard/transacoes') && !colapsado && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-sigma-dourado animate-pulse-soft" />}
        </Link>

        {/* 10 Inteligência */}
        <Link href="/dashboard/inteligencia" className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 relative ${isActive('/dashboard/inteligencia') ? 'bg-gradient-to-r from-sigma-dourado/25 to-sigma-dourado/10 text-sigma-dourado border border-sigma-dourado/20 shadow-gold' : 'text-white/70 hover:text-white hover:bg-white/5'} ${colapsado ? 'justify-center' : ''}`} title={colapsado ? 'Inteligência' : undefined}>
          <Brain className={`w-5 h-5 flex-shrink-0 transition-all duration-200 ${isActive('/dashboard/inteligencia') ? 'scale-110' : 'group-hover:scale-110'}`} strokeWidth={isActive('/dashboard/inteligencia') ? 2.5 : 2} />
          {!colapsado && <span className="text-sm font-medium truncate">Inteligência</span>}
          {isActive('/dashboard/inteligencia') && !colapsado && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-sigma-dourado animate-pulse-soft" />}
        </Link>

        {/* 11 Indicadores */}
        <Link href="/dashboard/indicadores" className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 relative ${isActive('/dashboard/indicadores') ? 'bg-gradient-to-r from-sigma-dourado/25 to-sigma-dourado/10 text-sigma-dourado border border-sigma-dourado/20 shadow-gold' : 'text-white/70 hover:text-white hover:bg-white/5'} ${colapsado ? 'justify-center' : ''}`} title={colapsado ? 'Indicadores' : undefined}>
          <BarChart3 className={`w-5 h-5 flex-shrink-0 transition-all duration-200 ${isActive('/dashboard/indicadores') ? 'scale-110' : 'group-hover:scale-110'}`} strokeWidth={isActive('/dashboard/indicadores') ? 2.5 : 2} />
          {!colapsado && <span className="text-sm font-medium truncate">Indicadores</span>}
          {isActive('/dashboard/indicadores') && !colapsado && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-sigma-dourado animate-pulse-soft" />}
        </Link>

        {/* 12 Monitoramento */}
        <Link href="/dashboard/monitoramento" className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 relative ${isActive('/dashboard/monitoramento') ? 'bg-gradient-to-r from-sigma-dourado/25 to-sigma-dourado/10 text-sigma-dourado border border-sigma-dourado/20 shadow-gold' : 'text-white/70 hover:text-white hover:bg-white/5'} ${colapsado ? 'justify-center' : ''}`} title={colapsado ? 'Monitoramento' : undefined}>
          <Activity className={`w-5 h-5 flex-shrink-0 transition-all duration-200 ${isActive('/dashboard/monitoramento') ? 'scale-110' : 'group-hover:scale-110'}`} strokeWidth={isActive('/dashboard/monitoramento') ? 2.5 : 2} />
          {!colapsado && <span className="text-sm font-medium truncate">Monitoramento</span>}
          {isActive('/dashboard/monitoramento') && !colapsado && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-sigma-dourado animate-pulse-soft" />}
        </Link>

        {/* 13 Alertas */}
        <Link href="/dashboard/alertas" className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 relative ${isActive('/dashboard/alertas') ? 'bg-gradient-to-r from-sigma-dourado/25 to-sigma-dourado/10 text-sigma-dourado border border-sigma-dourado/20 shadow-gold' : 'text-white/70 hover:text-white hover:bg-white/5'} ${colapsado ? 'justify-center' : ''}`} title={colapsado ? 'Alertas' : undefined}>
          <Bell className={`w-5 h-5 flex-shrink-0 transition-all duration-200 ${isActive('/dashboard/alertas') ? 'scale-110' : 'group-hover:scale-110'}`} strokeWidth={isActive('/dashboard/alertas') ? 2.5 : 2} />
          {!colapsado && <span className="text-sm font-medium truncate">Alertas</span>}
          {isActive('/dashboard/alertas') && !colapsado && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-sigma-dourado animate-pulse-soft" />}
        </Link>

        {/* 14 Faltas */}
        <Link href="/dashboard/faltas" className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 relative ${isActive('/dashboard/faltas') ? 'bg-gradient-to-r from-sigma-dourado/25 to-sigma-dourado/10 text-sigma-dourado border border-sigma-dourado/20 shadow-gold' : 'text-white/70 hover:text-white hover:bg-white/5'} ${colapsado ? 'justify-center' : ''}`} title={colapsado ? 'Faltas' : undefined}>
          <CalendarX2 className={`w-5 h-5 flex-shrink-0 transition-all duration-200 ${isActive('/dashboard/faltas') ? 'scale-110' : 'group-hover:scale-110'}`} strokeWidth={isActive('/dashboard/faltas') ? 2.5 : 2} />
          {!colapsado && <span className="text-sm font-medium truncate">Faltas</span>}
          {isActive('/dashboard/faltas') && !colapsado && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-sigma-dourado animate-pulse-soft" />}
        </Link>

        {/* 15 Disciplinar */}
        <Link href="/dashboard/disciplinar" className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 relative ${isActive('/dashboard/disciplinar') ? 'bg-gradient-to-r from-sigma-dourado/25 to-sigma-dourado/10 text-sigma-dourado border border-sigma-dourado/20 shadow-gold' : 'text-white/70 hover:text-white hover:bg-white/5'} ${colapsado ? 'justify-center' : ''}`} title={colapsado ? 'Disciplinar' : undefined}>
          <Scale className={`w-5 h-5 flex-shrink-0 transition-all duration-200 ${isActive('/dashboard/disciplinar') ? 'scale-110' : 'group-hover:scale-110'}`} strokeWidth={isActive('/dashboard/disciplinar') ? 2.5 : 2} />
          {!colapsado && <span className="text-sm font-medium truncate">Disciplinar</span>}
          {isActive('/dashboard/disciplinar') && !colapsado && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-sigma-dourado animate-pulse-soft" />}
        </Link>

        {/* 16 Canal Informações */}
        <Link href="/dashboard/canal-informacoes" className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 relative ${isActive('/dashboard/canal-informacoes') ? 'bg-gradient-to-r from-sigma-dourado/25 to-sigma-dourado/10 text-sigma-dourado border border-sigma-dourado/20 shadow-gold' : 'text-white/70 hover:text-white hover:bg-white/5'} ${colapsado ? 'justify-center' : ''}`} title={colapsado ? 'Canal Informações' : undefined}>
          <Radio className={`w-5 h-5 flex-shrink-0 transition-all duration-200 ${isActive('/dashboard/canal-informacoes') ? 'scale-110' : 'group-hover:scale-110'}`} strokeWidth={isActive('/dashboard/canal-informacoes') ? 2.5 : 2} />
          {!colapsado && <span className="text-sm font-medium truncate">Canal Informações</span>}
          {isActive('/dashboard/canal-informacoes') && !colapsado && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-sigma-dourado animate-pulse-soft" />}
        </Link>

        {/* 17 Relatórios */}
        <Link href="/dashboard/relatorios" className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 relative ${isActive('/dashboard/relatorios') ? 'bg-gradient-to-r from-sigma-dourado/25 to-sigma-dourado/10 text-sigma-dourado border border-sigma-dourado/20 shadow-gold' : 'text-white/70 hover:text-white hover:bg-white/5'} ${colapsado ? 'justify-center' : ''}`} title={colapsado ? 'Relatórios' : undefined}>
          <FileBarChart className={`w-5 h-5 flex-shrink-0 transition-all duration-200 ${isActive('/dashboard/relatorios') ? 'scale-110' : 'group-hover:scale-110'}`} strokeWidth={isActive('/dashboard/relatorios') ? 2.5 : 2} />
          {!colapsado && <span className="text-sm font-medium truncate">Relatórios</span>}
          {isActive('/dashboard/relatorios') && !colapsado && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-sigma-dourado animate-pulse-soft" />}
        </Link>

        {/* 18 Unidades */}
        <Link href="/dashboard/unidades" className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 relative ${isActive('/dashboard/unidades') ? 'bg-gradient-to-r from-sigma-dourado/25 to-sigma-dourado/10 text-sigma-dourado border border-sigma-dourado/20 shadow-gold' : 'text-white/70 hover:text-white hover:bg-white/5'} ${colapsado ? 'justify-center' : ''}`} title={colapsado ? 'Unidades' : undefined}>
          <Building2 className={`w-5 h-5 flex-shrink-0 transition-all duration-200 ${isActive('/dashboard/unidades') ? 'scale-110' : 'group-hover:scale-110'}`} strokeWidth={isActive('/dashboard/unidades') ? 2.5 : 2} />
          {!colapsado && <span className="text-sm font-medium truncate">Unidades</span>}
          {isActive('/dashboard/unidades') && !colapsado && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-sigma-dourado animate-pulse-soft" />}
        </Link>

        {/* 19 Auditoria */}
        <Link href="/dashboard/auditoria" className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 relative ${isActive('/dashboard/auditoria') ? 'bg-gradient-to-r from-sigma-dourado/25 to-sigma-dourado/10 text-sigma-dourado border border-sigma-dourado/20 shadow-gold' : 'text-white/70 hover:text-white hover:bg-white/5'} ${colapsado ? 'justify-center' : ''}`} title={colapsado ? 'Auditoria' : undefined}>
          <SearchCheck className={`w-5 h-5 flex-shrink-0 transition-all duration-200 ${isActive('/dashboard/auditoria') ? 'scale-110' : 'group-hover:scale-110'}`} strokeWidth={isActive('/dashboard/auditoria') ? 2.5 : 2} />
          {!colapsado && <span className="text-sm font-medium truncate">Auditoria</span>}
          {isActive('/dashboard/auditoria') && !colapsado && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-sigma-dourado animate-pulse-soft" />}
        </Link>

        {/* 20 Administração */}
        <Link href="/dashboard/administracao" className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 relative ${isActive('/dashboard/administracao') ? 'bg-gradient-to-r from-sigma-dourado/25 to-sigma-dourado/10 text-sigma-dourado border border-sigma-dourado/20 shadow-gold' : 'text-white/70 hover:text-white hover:bg-white/5'} ${colapsado ? 'justify-center' : ''}`} title={colapsado ? 'Administração' : undefined}>
          <Settings className={`w-5 h-5 flex-shrink-0 transition-all duration-200 ${isActive('/dashboard/administracao') ? 'scale-110' : 'group-hover:scale-110'}`} strokeWidth={isActive('/dashboard/administracao') ? 2.5 : 2} />
          {!colapsado && <span className="text-sm font-medium truncate">Administração</span>}
          {isActive('/dashboard/administracao') && !colapsado && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-sigma-dourado animate-pulse-soft" />}
        </Link>
      </nav>

      <div className="p-3 border-t border-white/10 space-y-1">
        {!colapsado && (
          <p className="px-3 pt-1 pb-2 text-[10px] uppercase tracking-widest text-white/35 font-semibold">
            Conta
          </p>
        )}
        <button
          onClick={async () => {
            try {
              const res = await fetch('/api/auth/logout', { method: 'POST' })
              if (res.ok) { window.location.href = '/login?logout=1' } else { window.location.href = '/login' }
            } catch { window.location.href = '/login' }
          }}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/60 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200 ${colapsado ? 'justify-center' : ''}`}
          title={colapsado ? 'Sair' : undefined}
        >
          <LogOut className="w-5 h-5" />
          {!colapsado && <span className="text-sm font-medium">Sair do sistema</span>}
        </button>
        {!colapsado && (
          <div className="mt-3 p-3 rounded-xl bg-gradient-to-br from-sigma-azulClaro/40 to-sigma-azulEscuro/60 border border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sigma-dourado to-sigma-douradoEscuro flex items-center justify-center text-sigma-azul font-bold text-sm flex-shrink-0">DG</div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white truncate">Usuário DG</p>
                <p className="text-[11px] text-sigma-dourado truncate">Diretor Geral</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}
