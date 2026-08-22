'use client'

import { Bell, Search, User, Menu, ChevronDown } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-white/85 backdrop-blur-md border-b border-sigma-azul/10 sticky top-0 z-30 min-h-[80px]">
      <div className="h-full px-6 md:px-8 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <button className="lg:hidden p-2 rounded-lg hover:bg-sigma-azul-50 transition-colors text-sigma-azul">
            <Menu className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-lg font-bold text-sigma-azul hidden sm:block">
              Centro de Comando DG
            </h2>
            <p className="text-xs text-sigma-azul/55 hidden md:block">
              Sistema Integrado de Gestão · Atualizado em tempo real
            </p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2 flex-1 max-w-md">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-sigma-azul/40" />
            </div>
            <input
              type="text"
              placeholder="Buscar módulos, documentos, funcionários..."
              className="w-full pl-10 pr-4 py-2.5 bg-sigma-azul-50/60 border border-sigma-azul/12 rounded-xl text-sm text-sigma-azul placeholder-sigma-azul/40 focus:outline-none focus:ring-2 focus:ring-sigma-dourado/40 focus:border-sigma-dourado/40 focus:bg-white transition-all duration-200"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="relative p-2.5 rounded-xl text-sigma-azul/65 hover:text-sigma-azul hover:bg-sigma-azul-50 transition-all duration-200">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse-soft" />
          </button>

          <div className="h-8 w-px bg-sigma-azul/10 mx-1 hidden sm:block" />

          <div className="flex items-center gap-3 pl-1">
            <div className="hidden sm:flex items-center gap-2 cursor-pointer group">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sigma-azul to-sigma-azulClaro flex items-center justify-center shadow-blue">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="hidden lg:block min-w-0">
                <p className="text-sm font-semibold text-sigma-azul truncate leading-tight">
                  Diretor Geral
                </p>
                <p className="text-[11px] text-sigma-azul/55 truncate">
                  usuário.dg@sigmavertice
                </p>
              </div>
              <ChevronDown className="w-4 h-4 text-sigma-azul/50 group-hover:text-sigma-azul transition-colors hidden lg:block" />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
