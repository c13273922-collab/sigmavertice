import { Activity, ExternalLink, Search, Filter, Bell, Newspaper, AlertTriangle, MapPin, Clock } from 'lucide-react'

export default function MonitoramentoPage() {
  const noticias = [
    {
      titulo: 'Governo do Amazonas anuncia novos investimentos em logística para interior',
      fonte: 'G1 AM',
      categoria: 'Logística',
      data: '19/08/2026 15:12',
      link: 'https://exemplo.com/noticia1',
      resumo: 'Edital prevê R$ 42 milhões em melhorias de acesso a municípios do alto Solimões, incluindo Tabatinga e região de fronteira...',
      importancia: 'alta',
      regiao: 'Tabatinga',
    },
    {
      titulo: 'Operação conjunta reforça segurança em rotas fluviais entre Manaus e Tefé',
      fonte: 'Portal Amazonas',
      categoria: 'Segurança',
      data: '19/08/2026 12:40',
      link: 'https://exemplo.com/noticia2',
      resumo: 'Forças de segurança aumentaram patrulhamento em trechos considerados estratégicos para o escoamento de cargas...',
      importancia: 'media',
      regiao: 'Tefé',
    },
    {
      titulo: 'Previsão climática: chuvas acima da média previstas para o AM nas próximas 2 semanas',
      fonte: 'INMET',
      categoria: 'Clima',
      data: '19/08/2026 09:05',
      link: 'https://exemplo.com/noticia3',
      resumo: 'Boletim técnico aponta risco moderado para atividades de campo em municípios do Amazonas Central...',
      importancia: 'media',
      regiao: 'Estado todo',
    },
    {
      titulo: 'Manaus: novo terminal rodoviário entra em operação em setembro',
      fonte: 'A Crítica',
      categoria: 'Infraestrutura',
      data: '18/08/2026 18:30',
      link: 'https://exemplo.com/noticia4',
      resumo: 'Mudanças no fluxo de passageiros devem impactar agendamentos de deslocamentos terrestres a partir de 05/setembro...',
      importancia: 'baixa',
      regiao: 'Manaus',
    },
  ]

  const fonteBadge = (i: string) => ({
    alta: { t: 'Alta', c: 'bg-red-500/15 text-red-700', i: AlertTriangle },
    media: { t: 'Média', c: 'bg-amber-500/15 text-amber-700', i: Bell },
    baixa: { t: 'Baixa', c: 'bg-slate-500/15 text-slate-700', i: Newspaper },
  }[i])

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-sigma-dourado to-sigma-douradoEscuro flex items-center justify-center shadow-gold">
              <Activity className="w-6 h-6 text-sigma-azul" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-sigma-azul">Monitoramento Brasil</h1>
              <p className="text-sm text-sigma-azul/60">Feed de notícias e eventos (fontes e links oficiais — sem cópia integral)</p>
            </div>
          </div>
        </div>
        <div className="inline-flex rounded-lg border border-sigma-azul/15 bg-white p-1 shadow-sm self-start sm:self-auto">
          {['Tudo', 'Alta', 'Média', 'Baixa'].map((t, i) => (
            <button key={t} className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${i === 0 ? 'bg-sigma-azul text-white shadow-sm' : 'text-sigma-azul/65 hover:text-sigma-azul'}`}>
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { l: 'Notícias hoje', v: 47, c: 'text-sigma-azul' },
          { l: 'Importância alta', v: 9, c: 'text-red-700' },
          { l: 'Regiões monitoradas', v: 62, c: 'text-sigma-douradoEscuro' },
          { l: 'Fontes ativas', v: 18, c: 'text-emerald-700' },
        ].map((k, i) => (
          <div key={k.l} className="rounded-xl border border-sigma-azul/10 bg-white p-4 shadow-sm animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
            <p className="text-xs uppercase tracking-wider font-semibold text-sigma-azul/50">{k.l}</p>
            <p className={`text-2xl font-bold mt-2 ${k.c}`}>{k.v}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-sigma-azul/10 bg-white p-5 shadow-sm">
        <div className="flex flex-col md:flex-row gap-3 mb-5">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sigma-azul/40" />
            <input placeholder="Buscar notícia, região ou palavra-chave..." className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-sigma-azul/15 text-sm focus:outline-none focus:ring-2 focus:ring-sigma-dourado/40" />
          </div>
          <button className="px-3.5 py-2.5 rounded-lg border border-sigma-azul/15 text-sigma-azul/70 hover:bg-sigma-azul-50 transition-colors flex items-center gap-2 text-sm">
            <Filter className="w-4 h-4" /> Filtros
          </button>
        </div>

        <div className="space-y-4">
          {noticias.map((n, i) => {
            const b = fonteBadge(n.importancia)
            const BIc = b.i
            return (
              <article key={i} className="rounded-xl border border-sigma-azul/10 p-5 hover:shadow-md hover:border-sigma-dourado/30 transition-all animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
                <div className="flex flex-wrap gap-2 mb-2 text-xs items-center">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-bold ${b.c}`}>
                    <BIc className="w-3.5 h-3.5" /> Importância {b.t}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-sigma-azul/10 text-sigma-azulEscuro font-bold">{n.categoria}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-sigma-dourado/15 text-sigma-douradoEscuro font-bold">Fonte: {n.fonte}</span>
                  <span className="flex items-center gap-1 text-sigma-azul/55"><MapPin className="w-3.5 h-3.5" /> {n.regiao}</span>
                  <span className="flex items-center gap-1 text-sigma-azul/55 ml-auto"><Clock className="w-3.5 h-3.5" /> {n.data}</span>
                </div>
                <h3 className="font-bold text-sigma-azul text-lg mb-2 hover:text-sigma-douradoEscuro transition-colors">
                  {n.titulo}
                </h3>
                <p className="text-sm text-sigma-azul/70 mb-3 leading-relaxed">{n.resumo}</p>
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <p className="text-[11px] text-sigma-azul/50">
                    ⚖️ Respeitando direitos autorais: apenas trecho-resumo, link para leitura completa na fonte oficial.
                  </p>
                  <a
                    href={n.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sigma-dourado/15 text-sigma-douradoEscuro text-xs font-bold hover:bg-sigma-dourado hover:text-white transition-all"
                  >
                    Ler na íntegra <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </div>
  )
}
