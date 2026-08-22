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
  FolderKanban,
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

const ICONES_SIDEBAR: Record<string, any> = {
  LayoutDashboard,
  Map,
  Users,
  MessageSquare,
  FileText,
  FolderKanban,
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
}

const modulos = [
  { id: 'dashboard', nome: 'Dashboard', icone: 'LayoutDashboard', href: '/dashboard' },
  { id: 'mapa-amazonas', nome: 'Mapa Amazonas', icone: 'Map', href: '/dashboard/mapa-amazonas' },
  { id: 'funcionarios', nome: 'Funcionários', icone: 'Users', href: '/dashboard/funcionarios' },
  { id: 'chat', nome: 'Chat', icone: 'MessageSquare', href: '/dashboard/chat' },
  { id: 'processos', nome: 'Processos', icone: 'FileText', href: '/dashboard/processos' },
  { id: 'casos', nome: 'Casos', icone: 'FolderKanban', href: '/dashboard/casos' },
  { id: 'viagens', nome: 'Viagens', icone: 'Plane', href: '/dashboard/viagens' },
  { id: 'documentos', nome: 'Documentos', icone: 'FileCheck', href: '/dashboard/documentos' },
  { id: 'transacoes', nome: 'Transações', icone: 'Receipt', href: '/dashboard/transacoes' },
  { id: 'inteligencia', nome: 'Inteligência', icone: 'Brain', href: '/dashboard/inteligencia' },
  { id: 'indicadores', nome: 'Indicadores', icone: 'BarChart3', href: '/dashboard/indicadores' },
  { id: 'monitoramento', nome: 'Monitoramento', icone: 'Activity', href: '/dashboard/monitoramento' },
  { id: 'alertas', nome: 'Alertas', icone: 'Bell', href: '/dashboard/alertas' },
  { id: 'faltas', nome: 'Faltas', icone: 'CalendarX2', href: '/dashboard/faltas' },
  { id: 'disciplinar', nome: 'Disciplinar', icone: 'Scale', href: '/dashboard/disciplinar' },
  { id: 'canal-informacoes', nome: 'Canal Informações', icone: 'Radio', href: '/dashboard/canal-informacoes' },
  { id: 'relatorios', nome: 'Relatórios', icone: 'FileBarChart', href: '/dashboard/relatorios' },
  { id: 'unidades', nome: 'Unidades', icone: 'Building2', href: '/dashboard/unidades' },
  { id: 'auditoria', nome: 'Auditoria', icone: 'SearchCheck', href: '/dashboard/auditoria' },
  { id: 'administracao', nome: 'Administração', icone: 'Settings', href: '/dashboard/administracao' },
]

export default function Sidebar() {
  const [colapsado, setColapsado] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard' || pathname === '/dashboard/'
    }
    return pathname?.startsWith(href)
  }

  return (
    <aside
      className={`${colapsado ? 'w-20' : 'w-72'} bg-sigma-azul text-white flex flex-col transition-all duration-300 ease-in-out border-r border-white/10 shrink-0`}
    >
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
        <button
          onClick={() => setColapsado(!colapsado)}
          className="p-1.5 rounded-lg hover:bg-white/10 transition-colors duration-200 text-white/60 hover:text-white"
          title={colapsado ? 'Expandir menu' : 'Recolher menu'}
        >
          {colapsado ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <ChevronLeft className="w-5 h-5" />
          )}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto p-3 space-y-1 scrollbar-thin">
        {!colapsado && (
          <p className="px-3 pt-2 pb-1 text-[10px] uppercase tracking-widest text-white/35 font-semibold">
            Módulos do Sistema
          </p>
        )}
        {modulos.map((modulo, index) => {
          const Icon = ICONES_SIDEBAR[modulo.icone] || LayoutDashboard
          const active = isActive(modulo.href)
          return (
            <Link
              key={modulo.id}
              href={modulo.href}
              className={`
                group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 relative
                ${active
                  ? 'bg-gradient-to-r from-sigma-dourado/25 to-sigma-dourado/10 text-sigma-dourado border border-sigma-dourado/20 shadow-gold'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
                }
                ${colapsado ? 'justify-center' : ''}
              `}
              style={{ animationDelay: `${index * 0.02}s` }}
              title={colapsado ? modulo.nome : undefined}
            >
              <Icon
                className={`w-5 h-5 flex-shrink-0 transition-all duration-200 ${active ? 'scale-110' : 'group-hover:scale-110'}`}
                strokeWidth={active ? 2.5 : 2}
              />
              {!colapsado && (
                <span className="text-sm font-medium truncate">{modulo.nome}</span>
              )}
              {active && !colapsado && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-sigma-dourado animate-pulse-soft" />
              )}
            </Link>
          )
        })}
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
              if (res.ok) {
                window.location.href = '/login?logout=1'
              } else {
                window.location.href = '/login'
              }
            } catch {
              window.location.href = '/login'
            }
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
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sigma-dourado to-sigma-douradoEscuro flex items-center justify-center text-sigma-azul font-bold text-sm flex-shrink-0">
                DG
              </div>
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
