import { MessageSquare, Send, Paperclip, Search, Phone, Video, Hash, ShieldCheck } from 'lucide-react'

export default function ChatPage() {
  const conversas = [
    { id: 1, nome: 'Ana Beatriz Souza', ultima: 'Recebi o processo PROC-0281, estou analisando.', hora: '12:47', lido: false, online: true },
    { id: 2, nome: 'Carlos Mendes', ultima: 'Temos novo alerta de monitoramento na região de Tefé.', hora: '11:32', lido: true, online: false },
    { id: 3, nome: 'Grupo — Diretoria Central', ultima: 'DG: pauta da reunião de amanhã foi anexada.', hora: '10:05', lido: true, online: true, grupo: true },
    { id: 4, nome: 'Rafael Costa (Tabatinga)', ultima: 'Chegada confirmada, em campo.', hora: '09:18', lido: false, online: true },
    { id: 5, nome: 'Juliana Ramos', ultima: 'Documento protocolado enviado.', hora: 'Ontem', lido: true, online: false },
  ]

  const mensagens = [
    { lado: 'outro', nome: 'Ana Beatriz', horario: '12:40', texto: 'Bom dia! Encaminhei o processo para sua análise. Precisamos da sua aprovação até amanhã, por favor.' },
    { lado: 'outro', nome: 'Ana Beatriz', horario: '12:41', arquivo: { nome: 'PROC-0281_Protocolo.pdf', tamanho: '2.4 MB', hash: 'sha512:…f3a91c' } },
    { lado: 'eu', horario: '12:45', texto: 'Recebi. Vou revisar agora e retorno em até 2 horas.' },
    { lado: 'outro', nome: 'Ana Beatriz', horario: '12:47', texto: 'Recebi o processo PROC-0281, estou analisando.' },
  ]

  return (
    <div className="space-y-4 animate-fade-in-up">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-sigma-dourado to-sigma-douradoEscuro flex items-center justify-center shadow-gold">
          <MessageSquare className="w-6 h-6 text-sigma-azul" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-sigma-azul">Chat</h1>
          <p className="text-sm text-sigma-azul/60">Comunicação interna segura com arquivos protocolados e hash</p>
        </div>
      </div>

      <div className="rounded-2xl border border-sigma-azul/10 bg-white shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-[320px_1fr] h-[75vh] min-h-[540px]">
        <div className="border-r border-sigma-azul/10 flex flex-col bg-sigma-azul-50/40">
          <div className="p-4 border-b border-sigma-azul/10">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sigma-azul/40" />
              <input placeholder="Buscar conversas..." className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-sigma-azul/15 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-sigma-dourado/40" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-white/60">
            {conversas.map((c, i) => (
              <button key={c.id} className={`w-full p-4 flex items-start gap-3 text-left transition-colors hover:bg-white ${i === 0 ? 'bg-white shadow-inner border-l-4 border-sigma-dourado' : ''} animate-fade-in-up`} style={{ animationDelay: `${i * 0.04}s` }}>
                <div className="relative flex-shrink-0">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-sigma-azul to-sigma-azulEscuro flex items-center justify-center text-white font-bold text-sm">
                    {c.grupo ? <Hash className="w-5 h-5" /> : c.nome.split(' ').map(n => n[0]).slice(0, 2).join('')}
                  </div>
                  {!c.grupo && c.online && (
                    <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-sigma-azul-50" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-sigma-azul truncate">{c.nome}</p>
                    <span className="text-[10px] text-sigma-azul/50 flex-shrink-0">{c.hora}</span>
                  </div>
                  <p className={`text-xs mt-0.5 truncate ${!c.lido ? 'text-sigma-azul font-medium' : 'text-sigma-azul/55'}`}>
                    {!c.lido && <span className="inline-block w-1.5 h-1.5 rounded-full bg-sigma-dourado mr-1.5 align-middle" />}
                    {c.ultima}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          <div className="p-4 border-b border-sigma-azul/10 flex items-center justify-between bg-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sigma-azul to-sigma-azulEscuro flex items-center justify-center text-white font-bold text-sm">
                AB
              </div>
              <div>
                <p className="text-sm font-bold text-sigma-azul">Ana Beatriz Souza</p>
                <p className="text-xs text-emerald-700 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-soft" /> Online · Diretora de Operações
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button className="p-2.5 rounded-lg hover:bg-sigma-azul-50 text-sigma-azul/70 transition-colors"><Phone className="w-4 h-4" /></button>
              <button className="p-2.5 rounded-lg hover:bg-sigma-azul-50 text-sigma-azul/70 transition-colors"><Video className="w-4 h-4" /></button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-3 bg-gradient-to-b from-sigma-azul-50/30 to-white">
            {mensagens.map((m, i) => (
              <div key={i} className={`flex ${m.lado === 'eu' ? 'justify-end' : 'justify-start'} animate-fade-in-up`} style={{ animationDelay: `${i * 0.05}s` }}>
                <div className={`max-w-[75%] ${m.lado === 'eu' ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                  {'nome' in m && <p className="text-[10px] font-semibold text-sigma-douradoEscuro pl-1">{m.nome}</p>}
                  <div className={`rounded-2xl px-4 py-2.5 text-sm shadow-sm ${
                    m.lado === 'eu'
                      ? 'bg-gradient-to-br from-sigma-dourado to-sigma-douradoEscuro text-white rounded-br-md shadow-gold'
                      : 'bg-white border border-sigma-azul/10 text-sigma-azul rounded-bl-md'
                  }`}>
                    {'texto' in m && <p className="leading-relaxed">{m.texto}</p>}
                    {'arquivo' in m && m.arquivo && (
                      <div className="mt-2 p-3 rounded-xl bg-black/10 backdrop-blur-sm flex items-center gap-3 min-w-[240px]">
                        <div className="w-9 h-9 rounded-lg bg-white/25 flex items-center justify-center flex-shrink-0">
                          <Paperclip className="w-4 h-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold truncate">{m.arquivo.nome}</p>
                          <p className="text-[10px] opacity-80 font-mono truncate">{m.arquivo.tamanho} · {m.arquivo.hash}</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <p className={`text-[10px] text-sigma-azul/40 ${m.lado === 'eu' ? 'pr-1' : 'pl-1'}`}>{m.horario} ✓✓</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-sigma-azul/10 bg-white">
            <div className="flex items-center gap-2">
              <button className="p-2.5 rounded-lg hover:bg-sigma-azul-50 text-sigma-azul/70 transition-colors" title="Anexar arquivo protocolado">
                <Paperclip className="w-5 h-5" />
              </button>
              <input placeholder="Digite uma mensagem segura..." className="flex-1 px-4 py-2.5 rounded-full border border-sigma-azul/15 text-sm bg-sigma-azul-50/50 focus:outline-none focus:ring-2 focus:ring-sigma-dourado/40 focus:bg-white transition-all" />
              <button className="p-2.5 rounded-full bg-gradient-to-br from-sigma-dourado to-sigma-douradoEscuro text-sigma-azul hover:text-white transition-colors shadow-gold">
                <Send className="w-5 h-5" />
              </button>
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-[10px] text-sigma-azul/50">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Arquivos permitidos: PDF/JPG/JPEG/PNG/DOC/DOCX/XLS/XLSX · Limite 50MB · Antimalware + Hash SHA-512
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
