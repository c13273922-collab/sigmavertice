-- ============================================================================
-- SIGMA VÉRTICE - Migration 001 - Esquema Principal
-- Central Integrada de Inteligência, Monitoramento e Gestão
-- ============================================================================

-- ======================== EXTENSÕES OBRIGATÓRIAS ============================
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";
create extension if not exists "pg_trgm";

-- =========================== DOMÍNIOS E TIPOS ===============================
do $$ begin
  create type role_sistema as enum (
    'diretor_geral',
    'diretor_central',
    'coordenador',
    'funcionario'
  );
exception when duplicate_object then null; end $$;

do $$ begin
  create type status_generico as enum (
    'novo',
    'disponivel',
    'solicitacao_pendente',
    'em_analise',
    'assumido',
    'em_andamento',
    'aguardando_aprovacao',
    'aprovado',
    'recusado',
    'solicitar_correcao',
    'concluido',
    'arquivado',
    'cancelado',
    'pendente',
    'justificado',
    'nao_justificado',
    'desligado',
    'bloqueado',
    'ativo',
    'inativo',
    'online',
    'ausente',
    'offline'
  );
exception when duplicate_object then null; end $$;

do $$ begin
  create type nivel_alerta as enum ('baixo','medio','alto','critico');
exception when duplicate_object then null; end $$;

do $$ begin
  create type categoria_advertencia as enum ('adv_1','adv_2','adv_3','suspensao','desligamento');
exception when duplicate_object then null; end $$;

do $$ begin
  create type categoria_noticia as enum (
    'seguranca_publica','justica','crimes','policia',
    'amazonas','manaus','brasil','desaparecimentos','ocorrencias','geral'
  );
exception when duplicate_object then null; end $$;

do $$ begin
  create type tipo_auditoria as enum (
    'login','logout','tentativa_login','falha_autenticacao',
    'alteracao_permissao','criacao_funcionario','alteracao_funcionario',
    'criacao_processo','alteracao_processo','aprovacao_processo','recusa_processo',
    'criacao_caso','alteracao_caso','aprovacao_caso','recusa_caso',
    'criacao_viagem','alteracao_viagem','aprovacao_viagem','recusa_viagem',
    'upload_arquivo','download_arquivo','envio_mensagem',
    'criacao_transacao','alteracao_transacao','aprovacao_transacao',
    'criacao_advertencia','alteracao_advertencia',
    'criacao_desligamento','alteracao_desligamento',
    'alteracao_configuracao','outro'
  );
exception when duplicate_object then null; end $$;

-- ============================ TABELAS PRINCIPAIS ============================

-- 1. MUNICÍPIOS (62 municípios do Amazonas + demais)
create table if not exists public.municipios (
  id uuid primary key default uuid_generate_v4(),
  codigo_ibge varchar(20) unique,
  nome varchar(120) not null,
  uf char(2) not null default 'AM',
  regiao varchar(60),
  populacao int,
  latitude numeric(10,7),
  longitude numeric(10,7),
  capital boolean default false,
  ativo boolean default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 2. UNIDADES
create table if not exists public.unidades (
  id uuid primary key default uuid_generate_v4(),
  codigo varchar(30) unique,
  nome varchar(180) not null,
  tipo varchar(60),
  endereco text,
  municipio_id uuid references public.municipios(id) on delete set null,
  telefone varchar(40),
  email varchar(160),
  responsavel_id uuid references public.funcionarios(id) on delete set null,
  capacidade int default 0,
  ativo boolean default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 3. CARGOS (19 cargos da especificação)
create table if not exists public.cargos (
  id uuid primary key default uuid_generate_v4(),
  nome varchar(80) not null unique,
  nivel_hierarquico int not null default 10,
  departamento varchar(80),
  descricao text,
  salario_base numeric(12,2),
  ativo boolean default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 4. PERMISSÕES (controle fino)
create table if not exists public.permissoes (
  id uuid primary key default uuid_generate_v4(),
  chave varchar(120) not null unique,
  modulo varchar(80) not null,
  descricao text,
  nivel_requerido role_sistema not null default 'funcionario',
  created_at timestamptz not null default now()
);

-- 5. ROLE_PERMISSAO (liga roles às permissões)
create table if not exists public.role_permissoes (
  id uuid primary key default uuid_generate_v4(),
  role_sistema role_sistema not null,
  permissao_id uuid not null references public.permissoes(id) on delete cascade,
  unique(role_sistema, permissao_id)
);

-- 6. FUNCIONÁRIOS (vinculados ao auth.users via Supabase Auth)
create table if not exists public.funcionarios (
  id uuid primary key references auth.users(id) on delete cascade,
  matricula varchar(30) unique,
  nome_completo varchar(200) not null,
  nome_social varchar(120),
  cpf varchar(14),
  rg varchar(30),
  data_nascimento date,
  sexo char(1),
  email_institucional varchar(160) unique,
  email_pessoal varchar(160),
  telefone_celular varchar(20),
  telefone_residencial varchar(20),
  endereco text,
  municipio_id uuid references public.municipios(id) on delete set null,
  unidade_id uuid references public.unidades(id) on delete set null,
  cargo_id uuid references public.cargos(id) on delete set null,
  role_sistema role_sistema not null default 'funcionario',
  data_admissao date,
  data_desligamento date,
  motivo_desligamento text,
  periodo_impedimento date,
  foto_url text,
  status_registro status_generico not null default 'ativo',
  mfa_ativado boolean default false,
  ultimo_login timestamptz,
  ultimo_ip inet,
  dispositivo varchar(240),
  observacoes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 7. FUNCIONARIO_PERMISSOES (permissões individuais sobrepostas)
create table if not exists public.funcionario_permissoes (
  id uuid primary key default uuid_generate_v4(),
  funcionario_id uuid not null references public.funcionarios(id) on delete cascade,
  permissao_id uuid not null references public.permissoes(id) on delete cascade,
  concedido_por uuid references public.funcionarios(id) on delete set null,
  concedido_em timestamptz not null default now(),
  expira_em timestamptz,
  unique(funcionario_id, permissao_id)
);

-- 8. SESSÕES
create table if not exists public.sessoes (
  id uuid primary key default uuid_generate_v4(),
  funcionario_id uuid not null references public.funcionarios(id) on delete cascade,
  auth_session_id text,
  token_hash varchar(128) not null,
  ip inet,
  user_agent text,
  dispositivo varchar(180),
  navegador varchar(80),
  so varchar(80),
  localizacao varchar(160),
  entrada timestamptz not null default now(),
  saida timestamptz,
  expira_em timestamptz not null,
  status status_generico not null default 'online',
  revogada boolean default false,
  motivo_revogacao text,
  created_at timestamptz not null default now()
);

-- 10. PROCESSOS
create table if not exists public.processos (
  id uuid primary key default uuid_generate_v4(),
  protocolo varchar(40) unique not null,
  titulo varchar(240) not null,
  descricao text,
  municipio_id uuid references public.municipios(id) on delete set null,
  unidade_id uuid references public.unidades(id) on delete set null,
  prioridade nivel_alerta default 'medio',
  responsavel_id uuid references public.funcionarios(id) on delete set null,
  criado_por uuid not null references public.funcionarios(id),
  prazo date,
  status status_generico not null default 'novo',
  anexos jsonb default '[]'::jsonb,
  tags text[] default '{}',
  historico jsonb default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 11. CASOS
create table if not exists public.casos (
  id uuid primary key default uuid_generate_v4(),
  protocolo varchar(40) unique not null,
  processo_id uuid references public.processos(id) on delete set null,
  titulo varchar(240) not null,
  descricao text,
  tipo varchar(80),
  municipio_id uuid references public.municipios(id) on delete set null,
  unidade_id uuid references public.unidades(id) on delete set null,
  prioridade nivel_alerta default 'medio',
  criado_por uuid not null references public.funcionarios(id),
  responsavel_id uuid references public.funcionarios(id) on delete set null,
  prazo date,
  status status_generico not null default 'disponivel',
  anexos jsonb default '[]'::jsonb,
  historico jsonb default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 12. VIAGENS
create table if not exists public.viagens (
  id uuid primary key default uuid_generate_v4(),
  protocolo varchar(40) unique not null,
  funcionario_id uuid references public.funcionarios(id) on delete set null,
  equipe_uuids uuid[] default '{}',
  origem_municipio_id uuid references public.municipios(id) on delete set null,
  destino_municipio_id uuid references public.municipios(id) on delete set null,
  municipio_id uuid references public.municipios(id) on delete set null,
  data_saida date not null,
  data_retorno date not null,
  qtd_dias int generated always as ( (data_retorno - data_saida) + 1 ) stored,
  motivo varchar(240),
  objetivo text,
  roteiro text,
  valor_estimado numeric(12,2) default 0,
  valor_transporte numeric(12,2) default 0,
  valor_hospedagem numeric(12,2) default 0,
  valor_alimentacao numeric(12,2) default 0,
  valor_outros numeric(12,2) default 0,
  transporte varchar(120),
  hospedagem varchar(240),
  observacoes text,
  criado_por uuid not null references public.funcionarios(id),
  status status_generico not null default 'aguardando_aprovacao',
  anexos jsonb default '[]'::jsonb,
  historico jsonb default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 13. SOLICITAÇÕES (para assumir processo/caso/viagem)
create table if not exists public.solicitacoes (
  id uuid primary key default uuid_generate_v4(),
  protocolo varchar(40) unique not null,
  tipo varchar(30) not null check (tipo in ('processo','caso','viagem')),
  referencia_id uuid not null,
  solicitante_id uuid not null references public.funcionarios(id) on delete cascade,
  justificativa text,
  compatibilidade_pct int,
  status status_generico not null default 'solicitacao_pendente',
  analisado_por uuid references public.funcionarios(id) on delete set null,
  analisado_em timestamptz,
  parecer text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 14. APROVAÇÕES
create table if not exists public.aprovacoes (
  id uuid primary key default uuid_generate_v4(),
  tipo varchar(30) not null check (tipo in ('processo','caso','viagem','documento','transacao','outro')),
  referencia_id uuid not null,
  solicitado_por uuid references public.funcionarios(id) on delete set null,
  aprovador_id uuid references public.funcionarios(id) on delete set null,
  decisao status_generico check (decisao in ('aprovado','recusado','solicitar_correcao')),
  observacao text,
  data_decisao timestamptz,
  created_at timestamptz not null default now()
);

-- 15. CONVERSAS (chat individual)
create table if not exists public.conversas (
  id uuid primary key default uuid_generate_v4(),
  participante_a uuid not null references public.funcionarios(id) on delete cascade,
  participante_b uuid not null references public.funcionarios(id) on delete cascade,
  ultima_mensagem text,
  ultima_atividade timestamptz,
  bloqueada boolean default false,
  check (participante_a < participante_b),
  unique(participante_a, participante_b),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 16. MENSAGENS
create table if not exists public.mensagens (
  id uuid primary key default uuid_generate_v4(),
  conversa_id uuid not null references public.conversas(id) on delete cascade,
  remetente_id uuid not null references public.funcionarios(id) on delete cascade,
  destinatario_id uuid not null references public.funcionarios(id) on delete cascade,
  conteudo text,
  lida boolean default false,
  lida_em timestamptz,
  editada boolean default false,
  removida boolean default false,
  created_at timestamptz not null default now()
);

-- 17. ARQUIVOS (mensagens e documentos)
create table if not exists public.arquivos (
  id uuid primary key default uuid_generate_v4(),
  protocolo varchar(50) unique not null,
  mensagem_id uuid references public.mensagens(id) on delete set null,
  processo_id uuid references public.processos(id) on delete set null,
  caso_id uuid references public.casos(id) on delete set null,
  viagem_id uuid references public.viagens(id) on delete set null,
  dono_id uuid not null references public.funcionarios(id),
  nome_original varchar(240) not null,
  tipo varchar(80),
  extensao varchar(20),
  tamanho_bytes bigint not null,
  storage_path text,
  url_publica text,
  url_temporaria text,
  url_expira timestamptz,
  hash_sha512 varchar(128),
  mime_type varchar(120),
  antimalware_status varchar(40) default 'pendente',
  antimalware_result text,
  classificacao varchar(60) default 'confidencial',
  status status_generico default 'ativo',
  created_at timestamptz not null default now()
);

-- 18. DOCUMENTOS
create table if not exists public.documentos (
  id uuid primary key default uuid_generate_v4(),
  protocolo varchar(50) unique not null,
  tipo varchar(60),
  categoria varchar(60),
  titulo varchar(240) not null,
  descricao text,
  arquivo_id uuid references public.arquivos(id) on delete set null,
  processo_id uuid references public.processos(id) on delete set null,
  caso_id uuid references public.casos(id) on delete set null,
  viagem_id uuid references public.viagens(id) on delete set null,
  criado_por uuid not null references public.funcionarios(id),
  municipio_id uuid references public.municipios(id) on delete set null,
  classificacao varchar(60) default 'confidencial',
  status status_generico not null default 'novo',
  tags text[] default '{}',
  versao int default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 19. TRANSAÇÕES
create table if not exists public.transacoes (
  id uuid primary key default uuid_generate_v4(),
  protocolo varchar(50) unique not null,
  valor numeric(14,2) not null,
  data date not null,
  municipio_id uuid references public.municipios(id) on delete set null,
  categoria varchar(80),
  subcategoria varchar(80),
  responsavel_id uuid references public.funcionarios(id) on delete set null,
  criado_por uuid not null references public.funcionarios(id),
  descricao text,
  documento_id uuid references public.documentos(id) on delete set null,
  status status_generico not null default 'aguardando_aprovacao',
  comprovante_id uuid references public.arquivos(id) on delete set null,
  historico jsonb default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 20. NOTÍCIAS / MONITORAMENTO BRASIL
create table if not exists public.noticias (
  id uuid primary key default uuid_generate_v4(),
  titulo varchar(300) not null,
  resumo text,
  fonte varchar(160),
  url_origem text,
  data_publicacao timestamptz not null,
  data_coleta timestamptz not null default now(),
  categoria categoria_noticia default 'geral',
  local varchar(160),
  municipio_id uuid references public.municipios(id) on delete set null,
  uf char(2),
  relevancia int default 50,
  tags text[] default '{}',
  imagem_url text,
  processado boolean default false,
  created_at timestamptz not null default now()
);

-- 21. FALTAS
create table if not exists public.faltas (
  id uuid primary key default uuid_generate_v4(),
  protocolo varchar(50) unique not null,
  funcionario_id uuid not null references public.funcionarios(id) on delete cascade,
  data date not null,
  periodo varchar(20) default 'integral' check (periodo in ('manha','tarde','noite','integral','meio_periodo')),
  horas numeric(4,2),
  justificativa text,
  documento_id uuid references public.documentos(id) on delete set null,
  analisado_por uuid references public.funcionarios(id) on delete set null,
  analisado_em timestamptz,
  status status_generico not null default 'pendente',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 22. ADVERTÊNCIAS / GESTÃO DISCIPLINAR
create table if not exists public.advertencias (
  id uuid primary key default uuid_generate_v4(),
  protocolo varchar(50) unique not null,
  funcionario_id uuid not null references public.funcionarios(id) on delete cascade,
  categoria categoria_advertencia not null,
  valor_referencia numeric(12,2),
  descricao text not null,
  fundamentacao text,
  ocorrido_em date not null,
  aplicado_por uuid not null references public.funcionarios(id),
  documento_id uuid references public.documentos(id) on delete set null,
  status status_generico not null default 'aguardando_aprovacao',
  tem_recurso boolean default false,
  parecer_recurso text,
  criado_em timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 23. DESLIGAMENTOS
create table if not exists public.desligamentos (
  id uuid primary key default uuid_generate_v4(),
  protocolo varchar(50) unique not null,
  funcionario_id uuid not null unique references public.funcionarios(id) on delete cascade,
  motivo text not null,
  categoria varchar(60),
  data date not null,
  periodo_impedimento date,
  documento_id uuid references public.documentos(id) on delete set null,
  aplicado_por uuid not null references public.funcionarios(id),
  status status_generico not null default 'desligado',
  observacoes text,
  created_at timestamptz not null default now()
);

-- 24. COMUNICADOS / CANAL DE INFORMAÇÕES
create table if not exists public.comunicados (
  id uuid primary key default uuid_generate_v4(),
  titulo varchar(240) not null,
  categoria varchar(60) default 'geral',
  conteudo text not null,
  resumo text,
  publicado_por uuid not null references public.funcionarios(id),
  destinatarios_roles role_sistema[] default null,
  destinatarios_municipios uuid[] default null,
  destinatarios_unidades uuid[] default null,
  data_publicacao timestamptz not null default now(),
  data_expira timestamptz,
  fixo boolean default false,
  classificacao varchar(40) default 'publico',
  anexos jsonb default '[]'::jsonb,
  ativo boolean default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 25. ALERTAS
create table if not exists public.alertas (
  id uuid primary key default uuid_generate_v4(),
  titulo varchar(240) not null,
  descricao text,
  nivel nivel_alerta not null default 'medio',
  categoria varchar(60),
  modulo varchar(60),
  referencia_id uuid,
  municipio_id uuid references public.municipios(id) on delete set null,
  unidade_id uuid references public.unidades(id) on delete set null,
  gerado_por uuid references public.funcionarios(id) on delete set null,
  destinatario_id uuid references public.funcionarios(id) on delete cascade,
  visto boolean default false,
  visto_em timestamptz,
  expira_em timestamptz,
  created_at timestamptz not null default now()
);

-- 26. INDICADORES
create table if not exists public.indicadores (
  id uuid primary key default uuid_generate_v4(),
  chave varchar(80) not null unique,
  nome varchar(180) not null,
  modulo varchar(60),
  tipo varchar(40) default 'numero' check (tipo in ('numero','porcentagem','moeda','tempo','razao')),
  valor_numerico numeric(18,4) default 0,
  valor_texto varchar(120),
  referencia date,
  municipio_id uuid references public.municipios(id) on delete set null,
  unidade_id uuid references public.unidades(id) on delete set null,
  created_at timestamptz not null default now(),
  unique(chave, referencia, municipio_id, unidade_id)
);

-- 27. BENEFÍCIOS
create table if not exists public.beneficios (
  id uuid primary key default uuid_generate_v4(),
  funcionario_id uuid not null references public.funcionarios(id) on delete cascade,
  tipo varchar(60) not null,
  descricao text,
  valor numeric(12,2) default 0,
  inicio date,
  fim date,
  status status_generico default 'ativo',
  documento_id uuid references public.documentos(id) on delete set null,
  criado_por uuid references public.funcionarios(id) on delete set null,
  created_at timestamptz not null default now()
);

-- 28. RELATÓRIOS
create table if not exists public.relatorios (
  id uuid primary key default uuid_generate_v4(),
  protocolo varchar(50) unique not null,
  titulo varchar(240) not null,
  tipo varchar(60),
  filtros jsonb,
  arquivo_id uuid references public.arquivos(id) on delete set null,
  gerado_por uuid not null references public.funcionarios(id),
  created_at timestamptz not null default now()
);

-- 29. CONFIGURAÇÕES DO SISTEMA
create table if not exists public.configuracoes (
  id uuid primary key default uuid_generate_v4(),
  chave varchar(80) not null unique,
  valor text,
  tipo varchar(30) default 'string',
  descricao text,
  modulo varchar(60),
  updated_at timestamptz not null default now()
);

-- 30. AUDITORIA (logs)
create table if not exists public.auditoria (
  id bigserial primary key,
  tipo tipo_auditoria not null,
  modulo varchar(80),
  entidade varchar(80),
  entidade_id uuid,
  acao varchar(160),
  funcionario_id uuid references public.funcionarios(id) on delete set null,
  antes jsonb,
  depois jsonb,
  ip inet,
  sessao_id uuid references public.sessoes(id) on delete set null,
  user_agent text,
  mensagem text,
  created_at timestamptz not null default now()
);

-- 31. DISTRIBUIÇÃO INTELIGENTE / BOT
create table if not exists public.distribuicoes (
  id uuid primary key default uuid_generate_v4(),
  referencia_tipo varchar(30) not null check (referencia_tipo in ('processo','caso','viagem')),
  referencia_id uuid not null,
  candidato_id uuid not null references public.funcionarios(id) on delete cascade,
  compatibilidade_pct int not null default 0,
  motivos_score jsonb,
  recomendado boolean default false,
  criado_em timestamptz not null default now(),
  unique(referencia_tipo, referencia_id, candidato_id)
);

-- 32. MUNICIPIOS_METRICAS (view materializada simulada em tabela)
create table if not exists public.municipios_metricas (
  municipio_id uuid primary key references public.municipios(id) on delete cascade,
  funcionarios_total int default 0,
  funcionarios_online int default 0,
  unidades int default 0,
  processos int default 0,
  casos int default 0,
  viagens int default 0,
  alertas int default 0,
  atualizado_em timestamptz not null default now()
);

-- ============================================================================
-- TRIGGERS: atualizar updated_at automaticamente
-- ============================================================================
create or replace function public.trg_atualiza_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at := now();
  return new;
end; $$;

do $$
declare t record;
begin
  for t in select table_name from information_schema.tables
           where table_schema='public'
             and table_name in (
               'municipios','unidades','cargos','funcionarios','sessoes',
               'processos','casos','viagens','solicitacoes','conversas',
               'mensagens','documentos','transacoes','faltas','advertencias',
               'comunicados','alertas','configuracoes','municipios_metricas'
             ) loop
    execute format('drop trigger if exists trg_%s_upd on public.%I', t.table_name, t.table_name);
    execute format('create trigger trg_%s_upd before update on public.%I
                    for each row execute function public.trg_atualiza_updated_at()', t.table_name, t.table_name);
  end loop;
end $$;

-- ============================================================================
-- TRIGGER DE AUDITORIA GENÉRICA
-- ============================================================================
create or replace function public.trg_audita()
returns trigger language plpgsql security definer as $$
declare
  v_tipo public.tipo_auditoria := 'outro';
  v_antes jsonb;
  v_depois jsonb;
  v_func uuid;
begin
  begin
    v_func := current_setting('app.uid', true)::uuid;
  exception when others then v_func := null; end;

  if (tg_op = 'INSERT') then
    v_depois := to_jsonb(new);
    v_antes  := null;
    v_tipo   := case tg_table_name
      when 'funcionarios'  then 'criacao_funcionario'::tipo_auditoria
      when 'processos'     then 'criacao_processo'::tipo_auditoria
      when 'casos'         then 'criacao_caso'::tipo_auditoria
      when 'viagens'       then 'criacao_viagem'::tipo_auditoria
      when 'transacoes'    then 'criacao_transacao'::tipo_auditoria
      when 'advertencias'  then 'criacao_advertencia'::tipo_auditoria
      when 'desligamentos' then 'criacao_desligamento'::tipo_auditoria
      else 'outro'::tipo_auditoria
    end;
  elsif (tg_op = 'UPDATE') then
    v_depois := to_jsonb(new);
    v_antes  := to_jsonb(old);
    v_tipo   := case tg_table_name
      when 'funcionarios'  then 'alteracao_funcionario'::tipo_auditoria
      when 'processos'     then 'alteracao_processo'::tipo_auditoria
      when 'casos'         then 'alteracao_caso'::tipo_auditoria
      when 'viagens'       then 'alteracao_viagem'::tipo_auditoria
      when 'transacoes'    then 'alteracao_transacao'::tipo_auditoria
      when 'advertencias'  then 'alteracao_advertencia'::tipo_auditoria
      when 'desligamentos' then 'alteracao_desligamento'::tipo_auditoria
      else 'outro'::tipo_auditoria
    end;
  else
    return null;
  end if;

  insert into public.auditoria
    (tipo, entidade, entidade_id, acao, funcionario_id, antes, depois, ip, mensagem)
  values
    (v_tipo,
     tg_table_name,
     coalesce(new.id, old.id),
     tg_op,
     v_func,
     v_antes,
     v_depois,
     coalesce(inet_client_addr()::text::inet, null),
     'Trigger automatico ' || tg_table_name || ' / ' || tg_op);

  return null;
end; $$;

do $$
declare t record;
begin
  for t in select table_name from information_schema.tables
           where table_schema='public'
             and table_name in (
               'funcionarios','processos','casos','viagens','solicitacoes',
               'documentos','transacoes','faltas','advertencias','desligamentos',
               'comunicados','alertas','configuracoes','beneficios','role_permissoes'
             ) loop
    execute format('drop trigger if exists trg_%s_aud on public.%I', t.table_name, t.table_name);
    execute format('create trigger trg_%s_aud after insert or update on public.%I
                    for each row execute function public.trg_audita()', t.table_name, t.table_name);
  end loop;
end $$;

-- ============================================================================
-- ÍNDICES
-- ============================================================================
create index if not exists idx_funcionarios_municipio on public.funcionarios(municipio_id);
create index if not exists idx_funcionarios_unidade   on public.funcionarios(unidade_id);
create index if not exists idx_funcionarios_cargo     on public.funcionarios(cargo_id);
create index if not exists idx_funcionarios_status    on public.funcionarios(status_registro);
create index if not exists idx_funcionarios_role      on public.funcionarios(role_sistema);

create index if not exists idx_processos_municipio on public.processos(municipio_id);
create index if not exists idx_processos_status    on public.processos(status);
create index if not exists idx_processos_responsavel on public.processos(responsavel_id);
create index if not exists idx_casos_processo on public.casos(processo_id);
create index if not exists idx_casos_municipio on public.casos(municipio_id);
create index if not exists idx_casos_status    on public.casos(status);
create index if not exists idx_casos_responsavel on public.casos(responsavel_id);

create index if not exists idx_viagens_municipio on public.viagens(municipio_id);
create index if not exists idx_viagens_status    on public.viagens(status);
create index if not exists idx_viagens_funcionario on public.viagens(funcionario_id);
create index if not exists idx_viagens_periodo on public.viagens(data_saida, data_retorno);

create index if not exists idx_conversas_a on public.conversas(participante_a);
create index if not exists idx_conversas_b on public.conversas(participante_b);
create index if not exists idx_mensagens_conv on public.mensagens(conversa_id);
create index if not exists idx_mensagens_data on public.mensagens(created_at);

create index if not exists idx_auditoria_tipo on public.auditoria(tipo);
create index if not exists idx_auditoria_func on public.auditoria(funcionario_id);
create index if not exists idx_auditoria_data on public.auditoria(created_at desc);

create index if not exists idx_sessoes_func on public.sessoes(funcionario_id);
create index if not exists idx_sessoes_status on public.sessoes(status);

create index if not exists idx_alertas_nivel on public.alertas(nivel);
create index if not exists idx_alertas_func  on public.alertas(destinatario_id);
create index if not exists idx_alertas_data  on public.alertas(created_at desc);

create index if not exists idx_noticias_data on public.noticias(data_publicacao desc);
create index if not exists idx_noticias_categoria on public.noticias(categoria);
create index if not exists idx_noticias_municipio on public.noticias(municipio_id);

create index if not exists idx_advertencias_func on public.advertencias(funcionario_id);
create index if not exists idx_faltas_func on public.faltas(funcionario_id);

create index if not exists idx_municipios_uf on public.municipios(uf);

-- ============================================================================
-- RLS (Row Level Security) - POLÍTICAS DE ACESSO NO SERVIDOR
-- ============================================================================
alter table public.municipios enable row level security;
alter table public.unidades enable row level security;
alter table public.cargos enable row level security;
alter table public.permissoes enable row level security;
alter table public.role_permissoes enable row level security;
alter table public.funcionarios enable row level security;
alter table public.funcionario_permissoes enable row level security;
alter table public.sessoes enable row level security;
alter table public.processos enable row level security;
alter table public.casos enable row level security;
alter table public.viagens enable row level security;
alter table public.solicitacoes enable row level security;
alter table public.aprovacoes enable row level security;
alter table public.conversas enable row level security;
alter table public.mensagens enable row level security;
alter table public.arquivos enable row level security;
alter table public.documentos enable row level security;
alter table public.transacoes enable row level security;
alter table public.noticias enable row level security;
alter table public.faltas enable row level security;
alter table public.advertencias enable row level security;
alter table public.desligamentos enable row level security;
alter table public.comunicados enable row level security;
alter table public.alertas enable row level security;
alter table public.indicadores enable row level security;
alter table public.beneficios enable row level security;
alter table public.relatorios enable row level security;
alter table public.configuracoes enable row level security;
alter table public.auditoria enable row level security;
alter table public.distribuicoes enable row level security;
alter table public.municipios_metricas enable row level security;

-- ======= Helper: retorna o role_sistema do usuário autenticado =======
create or replace function public.fn_meu_role()
returns role_sistema language sql stable security definer as $$
  select coalesce(
    (select role_sistema from public.funcionarios where id = auth.uid()),
    'funcionario'::role_sistema
  );
$$;

-- ======= Helper: funcionário é DG =======
create or replace function public.fn_e_dg()
returns boolean language sql stable security definer as $$
  select (public.fn_meu_role() = 'diretor_geral');
$$;

-- ======= Helper: funcionário é DG ou Diretor Central =======
create or replace function public.fn_e_diretoria()
returns boolean language sql stable security definer as $$
  select (public.fn_meu_role() in ('diretor_geral','diretor_central'));
$$;

-- ========== POLÍTICAS: LEITURA ==========
-- Municípios, Cargos, Unidades: todos autenticados leem
drop policy if exists mun_r on public.municipios;
create policy mun_r on public.municipios for select using (auth.role() = 'authenticated');

drop policy if exists cargos_r on public.cargos;
create policy cargos_r on public.cargos for select using (auth.role() = 'authenticated');

drop policy if exists unidades_r on public.unidades;
create policy unidades_r on public.unidades for select using (auth.role() = 'authenticated');

drop policy if exists permissoes_r on public.permissoes;
create policy permissoes_r on public.permissoes for select using (auth.role() = 'authenticated');

drop policy if exists roleperm_r on public.role_permissoes;
create policy roleperm_r on public.role_permissoes for select using (auth.role() = 'authenticated');

drop policy if exists noticias_r on public.noticias;
create policy noticias_r on public.noticias for select using (auth.role() = 'authenticated');

drop policy if exists indicadores_r on public.indicadores;
create policy indicadores_r on public.indicadores for select using (auth.role() = 'authenticated');

drop policy if exists metricas_r on public.municipios_metricas;
create policy metricas_r on public.municipios_metricas for select using (auth.role() = 'authenticated');

-- Funcionários: todos veem, mas só diretoria vê dados sensíveis completos
drop policy if exists func_r on public.funcionarios;
create policy func_r on public.funcionarios for select using (
  auth.role() = 'authenticated'
);
drop policy if exists func_w on public.funcionarios;
create policy func_w on public.funcionarios for all using (public.fn_e_diretoria()) with check (public.fn_e_diretoria());

-- Funcionario_permissoes
drop policy if exists fp_all on public.funcionario_permissoes;
create policy fp_all on public.funcionario_permissoes for all
  using (public.fn_e_diretoria() or funcionario_id = auth.uid())
  with check (public.fn_e_diretoria());

-- Sessões: DG + próprio usuário
drop policy if exists sessao_r on public.sessoes;
create policy sessao_r on public.sessoes for select using (
  public.fn_e_diretoria() or funcionario_id = auth.uid()
);
drop policy if exists sessao_w on public.sessoes;
create policy sessao_w on public.sessoes for all
  using (public.fn_e_diretoria() or funcionario_id = auth.uid())
  with check (public.fn_e_diretoria() or funcionario_id = auth.uid());

-- Processos: todos leem. Escrita: DG + criador + responsável
drop policy if exists proc_r on public.processos;
create policy proc_r on public.processos for select using (auth.role() = 'authenticated');
drop policy if exists proc_w on public.processos;
create policy proc_w on public.processos for all
  using (public.fn_e_dg() or criado_por = auth.uid() or responsavel_id = auth.uid())
  with check (public.fn_e_dg());

-- Casos
drop policy if exists caso_r on public.casos;
create policy caso_r on public.casos for select using (auth.role() = 'authenticated');
drop policy if exists caso_w on public.casos;
create policy caso_w on public.casos for all
  using (public.fn_e_diretoria() or criado_por = auth.uid() or responsavel_id = auth.uid())
  with check (public.fn_e_diretoria());

-- Viagens
drop policy if exists via_r on public.viagens;
create policy via_r on public.viagens for select using (auth.role() = 'authenticated');
drop policy if exists via_w on public.viagens;
create policy via_w on public.viagens for all
  using (public.fn_e_dg() or criado_por = auth.uid() or funcionario_id = auth.uid())
  with check (public.fn_e_dg());

-- Solicitações
drop policy if exists sol_r on public.solicitacoes;
create policy sol_r on public.solicitacoes for select using (auth.role() = 'authenticated');
drop policy if exists sol_w on public.solicitacoes;
create policy sol_w on public.solicitacoes for all
  using (public.fn_e_diretoria() or solicitante_id = auth.uid())
  with check (public.fn_e_diretoria() or solicitante_id = auth.uid());

-- Aprovações: só Diretoria
drop policy if exists apr_all on public.aprovacoes;
create policy apr_all on public.aprovacoes for all
  using (public.fn_e_diretoria()) with check (public.fn_e_diretoria());

-- Conversas e mensagens: só participantes
drop policy if exists conv_r on public.conversas;
create policy conv_r on public.conversas for select using (
  participante_a = auth.uid() or participante_b = auth.uid() or public.fn_e_diretoria()
);
drop policy if exists conv_w on public.conversas;
create policy conv_w on public.conversas for all
  using (participante_a = auth.uid() or participante_b = auth.uid() or public.fn_e_diretoria())
  with check (participante_a = auth.uid() or participante_b = auth.uid() or public.fn_e_diretoria());

drop policy if exists msg_r on public.mensagens;
create policy msg_r on public.mensagens for select using (
  remetente_id = auth.uid() or destinatario_id = auth.uid() or public.fn_e_diretoria()
);
drop policy if exists msg_w on public.mensagens;
create policy msg_w on public.mensagens for all
  using (remetente_id = auth.uid() or public.fn_e_diretoria())
  with check (remetente_id = auth.uid() or public.fn_e_diretoria());

-- Arquivos
drop policy if exists arq_r on public.arquivos;
create policy arq_r on public.arquivos for select using (auth.role() = 'authenticated');
drop policy if exists arq_w on public.arquivos;
create policy arq_w on public.arquivos for all
  using (dono_id = auth.uid() or public.fn_e_diretoria())
  with check (dono_id = auth.uid() or public.fn_e_diretoria());

-- Documentos
drop policy if exists doc_r on public.documentos;
create policy doc_r on public.documentos for select using (auth.role() = 'authenticated');
drop policy if exists doc_w on public.documentos;
create policy doc_w on public.documentos for all
  using (criado_por = auth.uid() or public.fn_e_diretoria())
  with check (criado_por = auth.uid() or public.fn_e_diretoria());

-- Transações: DG/Coord leem, DG escreve
drop policy if exists trx_r on public.transacoes;
create policy trx_r on public.transacoes for select using (
  public.fn_e_diretoria() or (public.fn_meu_role() in ('coordenador'))
  or responsavel_id = auth.uid() or criado_por = auth.uid()
);
drop policy if exists trx_w on public.transacoes;
create policy trx_w on public.transacoes for all
  using (public.fn_e_dg()) with check (public.fn_e_dg());

-- Faltas
drop policy if exists fal_r on public.faltas;
create policy fal_r on public.faltas for select using (
  public.fn_e_diretoria() or funcionario_id = auth.uid()
);
drop policy if exists fal_w on public.faltas;
create policy fal_w on public.faltas for all
  using (public.fn_e_diretoria() or funcionario_id = auth.uid())
  with check (public.fn_e_diretoria());

-- Advertências
drop policy if exists adv_r on public.advertencias;
create policy adv_r on public.advertencias for select using (
  public.fn_e_diretoria() or funcionario_id = auth.uid()
);
drop policy if exists adv_w on public.advertencias;
create policy adv_w on public.advertencias for all
  using (public.fn_e_diretoria()) with check (public.fn_e_diretoria());

-- Desligamentos
drop policy if exists desl_r on public.desligamentos;
create policy desl_r on public.desligamentos for select using (
  public.fn_e_diretoria() or funcionario_id = auth.uid()
);
drop policy if exists desl_w on public.desligamentos;
create policy desl_w on public.desligamentos for all
  using (public.fn_e_dg()) with check (public.fn_e_dg());

-- Comunicados
drop policy if exists com_r on public.comunicados;
create policy com_r on public.comunicados for select using (ativo and auth.role() = 'authenticated');
drop policy if exists com_w on public.comunicados;
create policy com_w on public.comunicados for all
  using (public.fn_e_diretoria()) with check (public.fn_e_diretoria());

-- Alertas
drop policy if exists ale_r on public.alertas;
create policy ale_r on public.alertas for select using (
  destinatario_id = auth.uid() or public.fn_e_diretoria() or destinatario_id is null
);
drop policy if exists ale_w on public.alertas;
create policy ale_w on public.alertas for all
  using (public.fn_e_diretoria() or destinatario_id = auth.uid())
  with check (public.fn_e_diretoria());

-- Benefícios
drop policy if exists ben_r on public.beneficios;
create policy ben_r on public.beneficios for select using (
  funcionario_id = auth.uid() or public.fn_e_diretoria()
);
drop policy if exists ben_w on public.beneficios;
create policy ben_w on public.beneficios for all
  using (public.fn_e_diretoria()) with check (public.fn_e_diretoria());

-- Relatórios
drop policy if exists rel_r on public.relatorios;
create policy rel_r on public.relatorios for select using (
  gerado_por = auth.uid() or public.fn_e_diretoria()
);
drop policy if exists rel_w on public.relatorios;
create policy rel_w on public.relatorios for all
  using (public.fn_e_diretoria() or gerado_por = auth.uid())
  with check (public.fn_e_diretoria() or gerado_por = auth.uid());

-- Configurações
drop policy if exists conf_r on public.configuracoes;
create policy conf_r on public.configuracoes for select using (public.fn_e_diretoria());
drop policy if exists conf_w on public.configuracoes;
create policy conf_w on public.configuracoes for all
  using (public.fn_e_dg()) with check (public.fn_e_dg());

-- Auditoria
drop policy if exists aud_r on public.auditoria;
create policy aud_r on public.auditoria for select using (public.fn_e_diretoria());

-- Distribuições (bot)
drop policy if exists dist_r on public.distribuicoes;
create policy dist_r on public.distribuicoes for select using (auth.role() = 'authenticated');
drop policy if exists dist_w on public.distribuicoes;
create policy dist_w on public.distribuicoes for all
  using (public.fn_e_diretoria()) with check (public.fn_e_diretoria());

-- ============================================================================
-- FIM DA MIGRATION 001
-- ============================================================================
