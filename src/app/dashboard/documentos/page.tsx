import { FileCheck, Upload, Search, Filter, Shield, Download, Eye, Clock, Hash, CheckCircle2 } from 'lucide-react'

export default function DocumentosPage() {
  const docs = [
    { protocolo: 'DOC-0412', nome: 'Política de Sigilo e Segurança da Informação', tipo: 'Política', versao: 'v3.2', autor: 'Diretoria Geral', data: '19/08/2026', tamanho: '1.2 MB', hash: 'sha512:…a831df', status: 'publicado' },
    { protocolo: 'DOC-0411', nome: 'Manual de Procedimentos — Unidade Tefé', tipo: 'Manual', versao: 'v1.0', autor: 'Coordenação', data: '18/08/2026', tamanho: '4.7 MB', hash: 'sha512:…2f9ab1', status: 'revisao' },
    { protocolo: 'DOC-0410', nome: 'Termo de Aditivo de Contrato', tipo: 'Contrato', versao: 'v2.1', autor: 'Jurídico', data: '17/08/2026', tamanho: '890 KB', hash: 'sha512:…c401e7', status: 'publicado' },
    { protocolo: 'DOC-0409', nome: 'Relatório de Operação TAB-MA-001 (versão em análise)', tipo: 'Relatório', versao: 'v0.9', autor: 'Rafael Costa', data: '16/08/2026', tamanho: '6.4 MB', hash: 'sha512:…1b8d2e', status: 'analise' },
  ]

  function badgeInfo(s: string) {
    if (s === 'publicado') return { t: 'Publicado', c: 'bg-emerald-500/15 text-emerald-700' }
    if (s === 'revisao') return { t: 'Em revisão', c: 'bg-amber-500/15 text-amber-700' }
    return { t: 'Em análise', c: 'bg-blue-500/15 text-blue-700' }
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-sigma-dourado to-sigma-douradoEscuro flex items-center justify-center shadow-gold">
              <FileCheck className="w-6 h-6 text-sigma-azul" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-sigma-azul">Documentos</h1>
              <p className="text-sm text-sigma-azul/60">Biblioteca oficial com protocolos, versões e hash de integridade</p>
            </div>
          </div>
        </div>
        <button className="px-4 py-2.5 rounded-lg bg-sigma-dourado text-sigma-azul text-sm font-bold hover:bg-sigma-douradoEscuro hover:text-white transition-colors flex items-center gap-2 self-start sm:self-auto shadow-gold">
          <Upload className="w-4 h-4" /> Enviar Documento
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { l: 'Total cadastrados', v: 412, c: 'text-sigma-azul' },
          { l: 'Publicados', v: 298, c: 'text-emerald-700' },
          { l: 'Em análise/revisão', v: 23, c: 'text-amber-700' },
          { l: 'Armazenamento (atual)', v: '2.4 GB', c: 'text-sigma-douradoEscuro' },
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
            <input placeholder="Buscar DOC-, título, hash..." className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-sigma-azul/15 text-sm focus:outline-none focus:ring-2 focus:ring-sigma-dourado/40" />
          </div>
          <button className="px-3.5 py-2.5 rounded-lg border border-sigma-azul/15 text-sigma-azul/70 hover:bg-sigma-azul-50 transition-colors flex items-center gap-2">
            <Filter className="w-4 h-4" /> Filtros
          </button>
        </div>

        <div className="space-y-3">
          {docs.map((d, i) => {
            const b = badgeInfo(d.status)
            return (
              <div key={d.protocolo} className="rounded-xl border border-sigma-azul/10 p-4 hover:border-sigma-dourado/30 hover:shadow-md transition-all animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
                <div className="flex items-start gap-4 flex-col md:flex-row">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sigma-azul/10 to-sigma-dourado/20 flex items-center justify-center flex-shrink-0">
                    <FileCheck className="w-6 h-6 text-sigma-douradoEscuro" />
                  </div>
                  <div className="min-w-0 flex-1 w-full">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="font-mono text-xs font-bold text-sigma-douradoEscuro bg-sigma-dourado/10 px-2 py-0.5 rounded">{d.protocolo}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${b.c} inline-flex items-center gap-1`}>
                        {d.status === 'publicado' && <CheckCircle2 className="w-3 h-3" />}
                        {d.status === 'revisao' && <Clock className="w-3 h-3" />}
                        {d.status === 'analise' && <Eye className="w-3 h-3" />}
                        {b.t}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-sigma-azul/10 text-sigma-azulEscuro">{d.tipo}</span>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-sigma-azul-50 text-sigma-azul/70">{d.versao}</span>
                    </div>
                    <h3 className="font-semibold text-sigma-azul truncate">{d.nome}</h3>
                    <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-sigma-azul/55 items-center">
                      <span className="flex items-center gap-1"><Hash className="w-3.5 h-3.5" /> {d.autor}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {d.data}</span>
                      <span>{d.tamanho}</span>
                      <span className="font-mono text-[10px] truncate max-w-[200px] bg-sigma-azul-50 px-1.5 py-0.5 rounded">
                        <Shield className="w-3 h-3 inline mr-1 align-middle text-emerald-600" />
                        {d.hash}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 w-full md:w-auto justify-end">
                    <button className="px-3 py-2 rounded-lg border border-sigma-azul/15 text-sigma-azul text-xs font-semibold hover:bg-sigma-azul-50 transition-colors inline-flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5" /> Visualizar
                    </button>
                    <button className="px-3 py-2 rounded-lg bg-sigma-dourado/15 text-sigma-douradoEscuro text-xs font-bold hover:bg-sigma-dourado hover:text-white transition-all inline-flex items-center gap-1.5">
                      <Download className="w-3.5 h-3.5" /> Baixar
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
