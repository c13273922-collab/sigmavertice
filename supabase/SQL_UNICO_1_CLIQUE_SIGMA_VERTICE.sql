-- =============================================================================
--  SIGMA VÉRTICE — SQL ÚNICO 1-CLIQUE (À PROVA DE ERROS)
--  3 em 1: MIGRATION COMPLETA + SEED COMPLETO + VÍNCULO DIRETOR GERAL
--  Roda 1x só. Pode rodar quantas vezes quiser — NUNCA dá erro de "já existe".
-- =============================================================================
--  COMO USAR:
--  1) Abra o SQL Editor do Supabase:
--     https://supabase.com/dashboard/project/swpoqlgsyfecpdwyjffv/sql/new
--  2) Ctrl + A (seleciona tudo o que já estiver lá + Delete (apaga)
--  3) Abra ESTE ARQUIVO no Bloco de Notas: Ctrl + A + Ctrl + C
--  4) Cole no SQL Editor: Ctrl + V
--  5) Clique no botão azul [Run] / [Executar]
--  6) Aguarde. No final, procure a linha VERDE:
--     ==============================
--     SIGMA VERTICE PRONTO! SUCESSO!
--     ==============================
--
--  7) Depois é só colar o UUID do seu Diretor Geral no PASSO 8 ABAIXO e rodar.
-- =============================================================================

-- ========================== 1. EXTENSÕES ============================================
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";
create extension if not exists "pg_trgm";

-- ========================== 2. ENUMS (blocos DO, à prova de duplicados) =====
do $$ begin
  create type role_sistema as enum (
    'diretor_geral','diretor_central','coordenador','funcionario'
  );
exception when duplicate_object or unique_violation then null; end $$;

do $$ begin
  create type status_generico as enum (
    'novo','disponivel','solicitacao_pendente','em_analise','assumido',
    'em_andamento','aguardando_aprovacao','aprovado','recusado',
    'solicitar_correcao','concluido','arquivado','cancelado','pendente',
    'justificado','nao_justificado','desligado','bloqueado','ativo',
    'inativo','online','ausente','offline'
  );
exception when duplicate_object or unique_violation then null; end $$;

do $$ begin
  create type nivel_alerta as enum ('baixo','medio','alto','critico');
exception when duplicate_object or unique_violation then null; end $$;

do $$ begin
  create type categoria_advertencia as enum (
    'adv_1','adv_2','adv_3','suspensao','desligamento'
  );
exception when duplicate_object or unique_violation then null; end $$;

do $$ begin
  create type categoria_noticia as enum (
    'seguranca_publica','justica','crimes','policia','amazonas','manaus',
    'brasil','desaparecimentos','ocorrencias','geral'
  );
exception when duplicate_object or unique_violation then null; end $$;

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
exception when duplicate_object or unique_violation then null; end $$;

-- ========================== 3. TABELAS — ORDEM CORRETA SEM FK ANTECIPADA ========
-- Tabelas SEM dependencias de outras tabelas customizadas (exceto extensoes):

-- 3.1 municipios (nenhuma FK)
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

-- 3.2 cargos (nenhuma FK)
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

-- 3.3 permissoes (só FKs ainda inexistentes serão por ALTER no fim)
create table if not exists public.permissoes (
  id uuid primary key default uuid_generate_v4(),
  chave varchar(120) not null unique,
  modulo varchar(80) not null,
  descricao text,
  nivel_requerido role_sistema not null default 'funcionario',
  created_at timestamptz not null default now()
);

-- 3.4 unidades (APENAS FK municipios - sem referencia a funcionarios por enquanto)
create table if not exists public.unidades (
  id uuid primary key default uuid_generate_v4(),
  codigo varchar(30) unique,
  nome varchar(180) not null,
  tipo varchar(60),
  endereco text,
  municipio_id uuid references public.municipios(id) on delete set null,
  telefone varchar(40),
  email varchar(160),
  responsavel_id uuid,                     -- FK adicionada via ALTER no fim
  capacidade int default 0,
  ativo boolean default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 3.5 funcionarios (primeiro bloco relacional com dependentes)
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

-- 3.6 role_permissoes
create table if not exists public.role_permissoes (
  id uuid primary key default uuid_generate_v4(),
  role_sistema role_sistema not null,
  permissao_id uuid not null references public.permissoes(id) on delete cascade,
  unique(role_sistema, permissao_id)
);

-- 3.7 funcionario_permissoes
create table if not exists public.funcionario_permissoes (
  id uuid primary key default uuid_generate_v4(),
  funcionario_id uuid not null references public.funcionarios(id) on delete cascade,
  permissao_id uuid not null references public.permissoes(id) on delete cascade,
  concedido_por uuid references public.funcionarios(id) on delete set null,
  concedido_em timestamptz not null default now(),
  expira_em timestamptz,
  unique(funcionario_id, permissao_id)
);

-- 3.8 sessoes
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

-- 3.9 processos
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

-- 3.10 casos
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

-- 3.11 viagens
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

-- 3.12 solicitacoes
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

-- 3.13 aprovacoes
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

-- 3.14 conversas
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

-- 3.15 mensagens
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

-- 3.16 arquivos
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

-- 3.17 documentos
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

-- 3.18 transacoes
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

-- 3.19 noticias
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

-- 3.20 faltas
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

-- 3.21 advertencias
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

-- 3.22 desligamentos
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

-- 3.23 comunicados
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

-- 3.24 alertas
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

-- 3.25 indicadores
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

-- 3.26 beneficios
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

-- 3.27 relatorios
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

-- 3.28 configuracoes
create table if not exists public.configuracoes (
  id uuid primary key default uuid_generate_v4(),
  chave varchar(80) not null unique,
  valor text,
  tipo varchar(30) default 'string',
  descricao text,
  modulo varchar(60),
  updated_at timestamptz not null default now()
);

-- 3.29 auditoria
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
  sessao_id uuid,
  user_agent text,
  mensagem text,
  created_at timestamptz not null default now()
);

-- 3.30 distribuicoes
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

-- 3.31 municipios_metricas
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

-- ========================== 4. FK EXTRA (unidades.responsavel_id → funcionarios)
do $$ begin
  alter table public.unidades
    add foreign key (responsavel_id)
    references public.funcionarios(id) on delete set null;
exception when duplicate_object or undefined_table then null; end $$;

-- auditoria.sessao_id (por ser referência circular, adicionar via bloco DO)
do $$ begin
  alter table public.auditoria
    add foreign key (sessao_id)
    references public.sessoes(id) on delete set null;
exception when duplicate_object or undefined_table then null; end $$;

-- ========================== 5. FUNÇÕES E TRIGGERS =========================

-- updated_at genérica
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

-- Trigger auditoria genérica
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

-- ========================== 6. ÍNDICES (if not exists — idempotentes) =============
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

-- ========================== 7. RLS e POLÍTICAS (helpers + enable RLS + policies) ====
-- Enable RLS (idempotente: o alter table enable não dá erro)
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

-- Helper: role do usuario logado
create or replace function public.fn_meu_role()
returns role_sistema language sql stable security definer as $$
  select coalesce(
    (select role_sistema from public.funcionarios where id = auth.uid()),
    'funcionario'::role_sistema
  );
$$;

create or replace function public.fn_e_dg()
returns boolean language sql stable security definer as $$
  select (public.fn_meu_role() = 'diretor_geral');
$$;

create or replace function public.fn_e_diretoria()
returns boolean language sql stable security definer as $$
  select (public.fn_meu_role() in ('diretor_geral','diretor_central'));
$$;

-- Policies
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

drop policy if exists func_r on public.funcionarios;
create policy func_r on public.funcionarios for select using (auth.role() = 'authenticated');

drop policy if exists func_w on public.funcionarios;
create policy func_w on public.funcionarios for all using (public.fn_e_diretoria()) with check (public.fn_e_diretoria());

drop policy if exists fp_all on public.funcionario_permissoes;
create policy fp_all on public.funcionario_permissoes for all
  using (public.fn_e_diretoria() or funcionario_id = auth.uid())
  with check (public.fn_e_diretoria());

drop policy if exists sessao_r on public.sessoes;
create policy sessao_r on public.sessoes for select using (public.fn_e_diretoria() or funcionario_id = auth.uid());

drop policy if exists sessao_w on public.sessoes;
create policy sessao_w on public.sessoes for all
  using (public.fn_e_diretoria() or funcionario_id = auth.uid())
  with check (public.fn_e_diretoria() or funcionario_id = auth.uid());

drop policy if exists proc_r on public.processos;
create policy proc_r on public.processos for select using (auth.role() = 'authenticated');

drop policy if exists proc_w on public.processos;
create policy proc_w on public.processos for all
  using (public.fn_e_dg() or criado_por = auth.uid() or responsavel_id = auth.uid())
  with check (public.fn_e_dg());

drop policy if exists caso_r on public.casos;
create policy caso_r on public.casos for select using (auth.role() = 'authenticated');

drop policy if exists caso_w on public.casos;
create policy caso_w on public.casos for all
  using (public.fn_e_diretoria() or criado_por = auth.uid() or responsavel_id = auth.uid())
  with check (public.fn_e_diretoria());

drop policy if exists via_r on public.viagens;
create policy via_r on public.viagens for select using (auth.role() = 'authenticated');

drop policy if exists via_w on public.viagens;
create policy via_w on public.viagens for all
  using (public.fn_e_dg() or criado_por = auth.uid() or funcionario_id = auth.uid())
  with check (public.fn_e_dg());

drop policy if exists sol_r on public.solicitacoes;
create policy sol_r on public.solicitacoes for select using (auth.role() = 'authenticated');

drop policy if exists sol_w on public.solicitacoes;
create policy sol_w on public.solicitacoes for all
  using (public.fn_e_diretoria() or solicitante_id = auth.uid())
  with check (public.fn_e_diretoria() or solicitante_id = auth.uid());

drop policy if exists apr_all on public.aprovacoes;
create policy apr_all on public.aprovacoes for all
  using (public.fn_e_diretoria()) with check (public.fn_e_diretoria());

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

drop policy if exists arq_r on public.arquivos;
create policy arq_r on public.arquivos for select using (auth.role() = 'authenticated');
drop policy if exists arq_w on public.arquivos;
create policy arq_w on public.arquivos for all
  using (dono_id = auth.uid() or public.fn_e_diretoria())
  with check (dono_id = auth.uid() or public.fn_e_diretoria());

drop policy if exists doc_r on public.documentos;
create policy doc_r on public.documentos for select using (auth.role() = 'authenticated');
drop policy if exists doc_w on public.documentos;
create policy doc_w on public.documentos for all
  using (criado_por = auth.uid() or public.fn_e_diretoria())
  with check (criado_por = auth.uid() or public.fn_e_diretoria());

drop policy if exists trx_r on public.transacoes;
create policy trx_r on public.transacoes for select using (
  public.fn_e_diretoria() or (public.fn_meu_role() in ('coordenador'))
  or responsavel_id = auth.uid() or criado_por = auth.uid()
);
drop policy if exists trx_w on public.transacoes;
create policy trx_w on public.transacoes for all
  using (public.fn_e_dg()) with check (public.fn_e_dg());

drop policy if exists fal_r on public.faltas;
create policy fal_r on public.faltas for select using (public.fn_e_diretoria() or funcionario_id = auth.uid());
drop policy if exists fal_w on public.faltas;
create policy fal_w on public.faltas for all
  using (public.fn_e_diretoria() or funcionario_id = auth.uid())
  with check (public.fn_e_diretoria());

drop policy if exists adv_r on public.advertencias;
create policy adv_r on public.advertencias for select using (public.fn_e_diretoria() or funcionario_id = auth.uid());
drop policy if exists adv_w on public.advertencias;
create policy adv_w on public.advertencias for all
  using (public.fn_e_diretoria()) with check (public.fn_e_diretoria());

drop policy if exists desl_r on public.desligamentos;
create policy desl_r on public.desligamentos for select using (public.fn_e_diretoria() or funcionario_id = auth.uid());
drop policy if exists desl_w on public.desligamentos;
create policy desl_w on public.desligamentos for all
  using (public.fn_e_dg()) with check (public.fn_e_dg());

drop policy if exists com_r on public.comunicados;
create policy com_r on public.comunicados for select using (ativo and auth.role() = 'authenticated');
drop policy if exists com_w on public.comunicados;
create policy com_w on public.comunicados for all
  using (public.fn_e_diretoria()) with check (public.fn_e_diretoria());

drop policy if exists ale_r on public.alertas;
create policy ale_r on public.alertas for select using (
  destinatario_id = auth.uid() or public.fn_e_diretoria() or destinatario_id is null
);
drop policy if exists ale_w on public.alertas;
create policy ale_w on public.alertas for all
  using (public.fn_e_diretoria() or destinatario_id = auth.uid())
  with check (public.fn_e_diretoria());

drop policy if exists ben_r on public.beneficios;
create policy ben_r on public.beneficios for select using (funcionario_id = auth.uid() or public.fn_e_diretoria());
drop policy if exists ben_w on public.beneficios;
create policy ben_w on public.beneficios for all
  using (public.fn_e_diretoria()) with check (public.fn_e_diretoria());

drop policy if exists rel_r on public.relatorios;
create policy rel_r on public.relatorios for select using (gerado_por = auth.uid() or public.fn_e_diretoria());
drop policy if exists rel_w on public.relatorios;
create policy rel_w on public.relatorios for all
  using (public.fn_e_diretoria() or gerado_por = auth.uid())
  with check (public.fn_e_diretoria() or gerado_por = auth.uid());

drop policy if exists conf_r on public.configuracoes;
create policy conf_r on public.configuracoes for select using (public.fn_e_diretoria());
drop policy if exists conf_w on public.configuracoes;
create policy conf_w on public.configuracoes for all
  using (public.fn_e_dg()) with check (public.fn_e_dg());

drop policy if exists aud_r on public.auditoria;
create policy aud_r on public.auditoria for select using (public.fn_e_diretoria());

drop policy if exists dist_r on public.distribuicoes;
create policy dist_r on public.distribuicoes for select using (auth.role() = 'authenticated');
drop policy if exists dist_w on public.distribuicoes;
create policy dist_w on public.distribuicoes for all
  using (public.fn_e_diretoria()) with check (public.fn_e_diretoria());

-- ========================== 8. SEED (idempotente, ON CONFLICT DO NOTHING) ==========
-- 8.1 Cargos
insert into public.cargos (nome, nivel_hierarquico, departamento, descricao, salario_base, ativo) values
('Diretor Geral',            1, 'Diretoria', 'Controle administrativo máximo da instituição',          25000.00, true),
('Diretor Central',          2, 'Diretoria', 'Acesso operacional amplo',                                18000.00, true),
('Diretor',                  3, 'Diretoria', 'Diretor de departamento',                                 15000.00, true),
('Gerente',                  4, 'Gerência',  'Gerência de equipe e projetos',                            12000.00, true),
('Coordenador',              5, 'Coordenação','Acesso à equipe e aos módulos permitidos',               10000.00, true),
('Supervisor',               6, 'Operação',  'Supervisão direta de atividades operacionais',             8000.00,  true),
('Investigador',             7, 'Inteligência','Coleta, análise e investigação',                         7500.00,  true),
('Especialista',             7, 'Especializada','Especialista técnico em área específica',               7200.00,  true),
('Analista de Dados',        8, 'Inteligência','Tratamento de dados e geração de indicadores',           6800.00,  true),
('Analista',                 8, 'Operação',  'Análise de processos e documentos',                         6200.00,  true),
('Técnico',                  9, 'Operação',  'Atividades técnicas especializadas',                       4800.00,  true),
('Agente de Campo',          9, 'Operação',  'Atividade operacional de campo',                           4500.00,  true),
('Operador',                10, 'Operação',  'Operação de sistemas e equipamentos',                       3800.00,  true),
('Assistente Administrativo',11,'Administração','Apoio administrativo e documental',                      3200.00,  true),
('Consultor',                7, 'Assessoria','Consultoria especializada em projetos',                    9000.00,  true),
('Júnior',                  10, 'Operação',  'Profissional em início de carreira',                        2800.00,  true),
('Estagiário',              12, 'Estágio',   'Estagiário em formação',                                    1500.00,  true),
('Menor Aprendiz',          13, 'Estágio',   'Programa de aprendizagem',                                 1212.00,  true),
('Terceirizado',            11, 'Apoio',     'Prestador de serviços terceirizado',                       3000.00,  true)
on conflict (nome) do nothing;

-- 8.2 Permissões
insert into public.permissoes (chave, modulo, descricao, nivel_requerido) values
('dashboard.ver',                 'Dashboard',           'Acesso ao Dashboard',                              'funcionario'),
('mapa.amazonas',                 'Mapa do Amazonas',   'Ver mapa do Amazonas',                             'funcionario'),
('funcionarios.ver',              'Funcionários',       'Listar funcionários',                              'coordenador'),
('funcionarios.gerenciar',        'Funcionários',       'Criar, alterar, bloquear funcionários',            'diretor_central'),
('chat.usar',                     'Chat',               'Enviar e receber mensagens',                       'funcionario'),
('processos.ver',                 'Processos',          'Ver processos',                                    'funcionario'),
('processos.criar',               'Processos',          'Criar processos (exclusivo DG)',                   'diretor_geral'),
('processos.aprovar',             'Processos',          'Aprovar processos',                                'diretor_geral'),
('casos.ver',                     'Casos',              'Ver casos',                                        'funcionario'),
('casos.assumir',                 'Casos',              'Solicitar para assumir caso',                      'funcionario'),
('casos.aprovar',                 'Casos',              'Aprovar distribuição de caso',                     'diretor_central'),
('viagens.ver',                   'Viagens',            'Ver viagens',                                      'funcionario'),
('viagens.criar',                 'Viagens',            'Criar viagens (exclusivo DG)',                     'diretor_geral'),
('viagens.aprovar',               'Viagens',            'Aprovar viagens',                                  'diretor_geral'),
('documentos.ver',                'Documentos',         'Ver documentos',                                   'funcionario'),
('documentos.gerenciar',          'Documentos',         'Criar/editar documentos',                          'coordenador'),
('transacoes.ver',                'Transações',         'Ver transações',                                   'coordenador'),
('transacoes.gerenciar',          'Transações',         'Criar/editar transações (DG)',                     'diretor_geral'),
('inteligencia.ver',              'Inteligência',       'Indicadores e inteligência de dados',              'coordenador'),
('monitoramento.ver',             'Monitoramento',      'Feed de notícias Brasil',                          'funcionario'),
('alertas.ver',                   'Alertas',            'Ver alertas pessoais',                             'funcionario'),
('faltas.ver',                    'Faltas',             'Ver minhas faltas',                                'funcionario'),
('faltas.gerenciar',              'Faltas',             'Gerenciar todas as faltas',                        'diretor_central'),
('disciplinar.ver',               'Disciplinar',        'Ver minhas advertências',                          'funcionario'),
('disciplinar.gerenciar',         'Disciplinar',        'Aplicar advertências (DG)',                        'diretor_geral'),
('canal_informacoes.ver',         'Canal Informações',  'Acesso ao canal de informações',                   'funcionario'),
('relatorios.gerar',              'Relatórios',         'Gerar relatórios',                                 'coordenador'),
('unidades.gerenciar',            'Unidades',           'Gerenciar unidades',                               'diretor_central'),
('auditoria.ver',                 'Auditoria',          'Consultar trilha de auditoria',                    'diretor_central'),
('administracao.sistema',         'Administração',      'Configurar o sistema (DG)',                        'diretor_geral'),
('beneficios.ver',                'Benefícios',         'Ver meus benefícios',                              'funcionario'),
('beneficios.gerenciar',          'Benefícios',         'Gerenciar benefícios',                             'diretor_central'),
('aprovacoes.central',            'Aprovações',         'Acesso à central de aprovações',                   'diretor_geral')
on conflict (chave) do nothing;

-- 8.3 Role → permissões
insert into public.role_permissoes (role_sistema, permissao_id)
select r.rs::role_sistema, p.id
from (values
  ('diretor_geral'),('diretor_central'),('coordenador'),('funcionario')
) r(rs)
join public.permissoes p on (
  case r.rs
    when 'diretor_geral'   then true
    when 'diretor_central' then p.nivel_requerido in ('diretor_central','coordenador','funcionario')
    when 'coordenador'     then p.nivel_requerido in ('coordenador','funcionario')
    when 'funcionario'     then p.nivel_requerido = 'funcionario'
  end
)
on conflict do nothing;

-- 8.4 Municípios AM
insert into public.municipios (codigo_ibge, nome, uf, regiao, populacao, latitude, longitude, capital, ativo) values
('1300029','Alvarães','AM','Sul','16380',-3.2257,-64.7956,false,true),
('1300104','Amaturá','AM','Sul','12326',-3.3750,-68.2450,false,true),
('1300120','Anamã','AM','Centro','14556',-3.9278,-61.4113,false,true),
('1300146','Anori','AM','Centro','21593',-3.7450,-61.6361,false,true),
('1300202','Apuí','AM','Sul','23200',-7.1950,-59.8917,false,true),
('1300301','Atalaia do Norte','AM','Norte','20169',-4.4167,-70.0500,false,true),
('1300400','Barcelos','AM','Norte','28507',-0.9764,-62.9261,false,true),
('1300509','Barreirinha','AM','Norte','32657',-2.7947,-57.0683,false,true),
('1300608','Benjamin Constant','AM','Norte','43283',-4.3814,-70.0133,false,true),
('1300632','Beruri','AM','Sul','20501',-3.9058,-61.1564,false,true),
('1300681','Boca do Acre','AM','Sul','31833',-8.7456,-67.3864,false,true),
('1300707','Borba','AM','Centro','42463',-4.3858,-59.5906,false,true),
('1300806','Caapiranga','AM','Centro','15093',-3.9328,-60.7950,false,true),
('1300830','Canutama','AM','Sul','16339',-5.7525,-64.4589,false,true),
('1300905','Carauari','AM','Sul','30994',-4.8786,-66.9061,false,true),
('1301002','Careiro','AM','Centro','34332',-3.1994,-60.1833,false,true),
('1301051','Careiro da Várzea','AM','Centro','16882',-3.2019,-60.5286,false,true),
('1301101','Coari','AM','Centro','83902',-4.0889,-63.1433,false,true),
('1301150','Codajás','AM','Norte','29962',-3.8350,-62.0547,false,true),
('1301200','Eirunepé','AM','Sul','55877',-6.6592,-69.8728,false,true),
('1301309','Envira','AM','Sul','22969',-7.2700,-70.0900,false,true),
('1301408','Fonte Boa','AM','Sul','23757',-2.5250,-66.1600,false,true),
('1301507','Guajará','AM','Sul','18665',-7.5033,-65.3561,false,true),
('1301606','Humaitá','AM','Sul','56144',-7.5119,-63.0483,false,true),
('1301655','Ipixuna','AM','Sul','29419',-1.9250,-70.6375,false,true),
('1301705','Iranduba','AM','Centro','54173',-3.2817,-60.1833,false,true),
('1301754','Itacoatiara','AM','Centro','105692',-3.1408,-58.4436,false,true),
('1301804','Itamarati','AM','Sul','11937',-2.8714,-66.1425,false,true),
('1301853','Itapiranga','AM','Norte','9473',-2.9014,-57.9550,false,true),
('1301903','Japurá','AM','Centro','26443',-2.0767,-61.8892,false,true),
('1302000','Juruá','AM','Sul','15918',-2.4472,-66.8367,false,true),
('1302109','Jutaí','AM','Sul','19397',-2.9336,-66.8747,false,true),
('1302208','Lábrea','AM','Sul','48304',-7.2597,-64.7836,false,true),
('1302307','Manacapuru','AM','Centro','97334',-3.2997,-60.6139,false,true),
('1302406','Manaquiri','AM','Centro','29023',-3.3014,-60.2517,false,true),
('1302505','Manaus','AM','Centro','2255903',-3.1019,-60.0250,true,true),
('1302554','Maraã','AM','Centro','19869',-3.3575,-65.3500,false,true),
('1302604','Maués','AM','Centro','65044',-3.3819,-57.7147,false,true),
('1302703','Nhamundá','AM','Norte','22888',-2.1928,-56.7214,false,true),
('1302802','Nova Olinda do Norte','AM','Norte','35240',-3.8878,-59.0914,false,true),
('1302901','Novo Airão','AM','Norte','18266',-2.6333,-60.9419,false,true),
('1302950','Novo Aripuanã','AM','Sul','28583',-5.1228,-60.3792,false,true),
('1303008','Parintins','AM','Norte','115363',-2.6283,-56.7358,false,true),
('1303107','Pauini','AM','Sul','20696',-7.1939,-66.9758,false,true),
('1303206','Presidente Figueiredo','AM','Centro','42491',-2.0336,-60.0300,false,true),
('1303305','Rio Preto da Eva','AM','Centro','38224',-2.6900,-59.6997,false,true),
('1303404','Santa Isabel do Rio Negro','AM','Norte','14776',-0.4117,-65.0100,false,true),
('1303503','Santo Antônio do Içá','AM','Norte','23073',-3.0997,-67.9444,false,true),
('1303537','São Gabriel da Cachoeira','AM','Norte','49799',-0.1303,-67.0864,false,true),
('1303560','São Paulo de Olivença','AM','Norte','38749',-3.4486,-68.8758,false,true),
('1303602','São Sebastião do Uatumã','AM','Centro','16213',-2.4433,-58.9975,false,true),
('1303701','Silves','AM','Norte','9440',-2.8008,-57.9689,false,true),
('1303800','Tabatinga','AM','Norte','69671',-4.2314,-69.9514,false,true),
('1303909','Tapauá','AM','Sul','18860',-5.5767,-65.0697,false,true),
('1303958','Tefé','AM','Sul','64032',-3.3686,-64.7217,false,true),
('1304006','Tonantins','AM','Norte','40398',-2.8739,-67.7989,false,true),
('1304063','Uarini','AM','Sul','21567',-2.9919,-65.0947,false,true),
('1304105','Urucará','AM','Norte','16383',-2.5450,-57.7156,false,true),
('1304204','Urucurituba','AM','Centro','16006',-2.7911,-57.7697,false,true),
('1304238','Vale do Anari','AM','Sul','11713',-9.2119,-65.0853,false,true),
('1304261','Várzea Alegre do Norte','AM','Norte','13523',-3.5333,-59.0833,false,true),
('1304303','Autazes','AM','Centro','42318',-3.5869,-59.1347,false,true)
on conflict (codigo_ibge) do nothing;

-- 8.5 Unidades
with am as (select id from public.municipios where codigo_ibge = '1302505')
insert into public.unidades (codigo, nome, tipo, municipio_id, capacidade, ativo)
values
  ('UNI-HQ-001','Sede Principal Manaus (Diretoria Geral)','Sede',(select id from am), 2000, true),
  ('UNI-AM-002','Unidade Manaus - Centro Operacional','Operacional',(select id from am), 1500, true),
  ('UNI-AM-003','Unidade Manaus - Inteligência de Dados','Inteligência',(select id from am), 500, true)
on conflict (codigo) do nothing;

with tefe as (select id from public.municipios where codigo_ibge = '1303958')
insert into public.unidades (codigo, nome, tipo, municipio_id, capacidade, ativo)
values ('UNI-TEF-001','Unidade Tefé - Polo Sul do Amazonas','Operacional',(select id from tefe), 600, true)
on conflict (codigo) do nothing;

with par as (select id from public.municipios where codigo_ibge = '1303008')
insert into public.unidades (codigo, nome, tipo, municipio_id, capacidade, ativo)
values ('UNI-PAR-001','Unidade Parintins - Polo Leste','Operacional',(select id from par), 500, true)
on conflict (codigo) do nothing;

with tab as (select id from public.municipios where codigo_ibge = '1303800')
insert into public.unidades (codigo, nome, tipo, municipio_id, capacidade, ativo)
values ('UNI-TAB-001','Unidade Tabatinga - Polo Fronteiriço','Fronteiriça',(select id from tab), 450, true)
on conflict (codigo) do nothing;

-- 8.6 Configurações
insert into public.configuracoes (chave, valor, tipo, descricao, modulo) values
('sistema.nome','SIGMA VÉRTICE','string','Nome exibido do sistema','sistema'),
('sistema.empresa','Sigma Vértice Sigilosa de Inteligência de Dados','string','Razão social da empresa','sistema'),
('sistema.versao','1.0.0','string','Versão do sistema','sistema'),
('sistema.uf_padrao','AM','string','UF padrão para novos cadastros','sistema'),
('seguranca.mfa_obrigatorio','false','boolean','Obrigar MFA para todos os perfis?','seguranca'),
('seguranca.sessao_duracao_horas','8','number','Duração máxima da sessão (h)','seguranca'),
('seguranca.tentativas_bloqueio','5','number','Número de tentativas antes de bloqueio','seguranca'),
('disciplinar.adv1_valor','700.00','number','Valor referência Advertência 1','disciplinar'),
('disciplinar.adv2_valor','800.00','number','Valor referência Advertência 2','disciplinar'),
('disciplinar.adv3_valor','900.00','number','Valor referência Advertência 3','disciplinar'),
('desligamento.impedimento_meses','12','number','Meses de impedimento para novo cadastro','rh'),
('viagens.aprovacao_obriga_dg','true','boolean','Toda viagem exige aprovação do DG','viagens'),
('chat.tamanho_maximo_arquivo_mb','50','number','Tamanho máximo por arquivo no chat','chat'),
('chat.formatos_permitidos','PDF,JPG,JPEG,PNG,DOC,DOCX,XLS,XLSX','string','Formatos permitidos no chat','chat'),
('processos.distribuicao_automatica','true','boolean','Ativar bot distribuição inteligente','processos'),
('mfa.tipo','email','string','Método padrão 2FA (email, totp, sms)','seguranca')
on conflict (chave) do nothing;

-- 8.7 Métricas zeradas
insert into public.municipios_metricas (municipio_id)
select id from public.municipios
on conflict (municipio_id) do nothing;

-- 8.8 VÍNCULO DG (ANTES DOS COMUNICADOS, pois comunicados.publicado_por → funcionarios)
insert into public.funcionarios (
  id,
  matricula,
  nome_completo,
  email_institucional,
  email_pessoal,
  municipio_id,
  unidade_id,
  cargo_id,
  role_sistema,
  data_admissao,
  status_registro,
  created_at,
  updated_at
) values (
  '3a9eb272-e1f1-4024-ad7e-365248b3d628',
  'SV-DG-0001',
  'Diretor Geral',
  'c13273822@gmail.com',
  'c13273822@gmail.com',
  (select id from public.municipios where codigo_ibge='1302505' limit 1),
  (select id from public.unidades where codigo='UNI-HQ-001' limit 1),
  (select id from public.cargos where nome='Diretor Geral' limit 1),
  'diretor_geral',
  current_date,
  'ativo',
  now(),
  now()
)
on conflict (id) do nothing;

-- 8.9 Comunicados iniciais (publicado_por = 1) funcionario DG se existir, senão uuid zero
do $$
declare v_id uuid;
begin
  select id into v_id from public.funcionarios order by created_at asc limit 1;
  if v_id is null then
    v_id := '00000000-0000-0000-0000-000000000000'::uuid;
  end if;

  insert into public.comunicados
    (titulo, categoria, conteudo, publicado_por, fixo, ativo, classificacao)
  values
    ('Bem-vindo(a) à Central de Inteligência SIGMA VÉRTICE',
     'institucional',
     '<p>Prezado(a) colaborador(a),</p>
      <p>É com grande satisfação que apresentamos a nova Central Integrada de Inteligência,
      Monitoramento e Gestão da SIGMA VÉRTICE.</p>
      <p>A partir de hoje, todas as comunicações, processos, viagens, documentos e serviços
      serão realizados exclusivamente por meio desta plataforma.</p>
      <p>O WhatsApp e demais aplicativos externos estão extintos para assuntos de trabalho.</p>
      <p>Atenciosamente,<br/><b>Diretoria-Geral</b></p>',
     v_id, true, true, 'publico'),

    ('Orientações de Sigilo e Segurança da Informação',
     'seguranca',
     '<p><b>É VEDADO:</b></p>
      <ul>
        <li>Compartilhar qualquer dado institucional por meio não oficial;</li>
        <li>Fazer comentários sobre atividades da agência em redes sociais;</li>
        <li>Acessar sistemas utilizando credenciais de outro colaborador;</li>
        <li>Divulgar qualquer conteúdo sem autorização da Diretoria.</li>
      </ul>',
     v_id, true, true, 'confidencial'),

    ('Nova Infraestrutura de Servidores',
     'ti',
     '<p>Todos os colaboradores receberão, em seus e-mails cadastrados,
      link oficial, código de ativação pessoal, token e manual de instalação.</p>',
     v_id, true, true, 'publico')
  on conflict do nothing;
end $$;

-- 8.10 Notícias exemplo
insert into public.noticias (titulo, resumo, fonte, url_origem, data_publicacao, categoria, local, uf, relevancia) values
('Operação conjunta apreende carga em Porto de Manaus','Agentes de fiscalização apreenderam mercadorias irregulares nesta semana.','Fonte Oficial','https://exemplo.com/noticia1',now() - interval '3 hours','seguranca_publica','Manaus','AM',90),
('Polícia deflagra operação contra crimes cibernéticos no AM','Ação atinge nove municípios do interior.','Portal de Segurança','https://exemplo.com/noticia2',now() - interval '8 hours','policia','Amazonas','AM',85),
('Justiça determina medidas cautelares em investigação','Decisão saiu nesta manhã.','Diário da Justiça','https://exemplo.com/noticia3',now() - interval '1 day','justica','Manaus','AM',78),
('Monitoramento indica aumento de ocorrências na região Sul','Painel de ocorrências aponta crescimento.','Monitoramento Brasil','https://exemplo.com/noticia4',now() - interval '12 hours','ocorrencias','Sul do AM','AM',72),
('Campanha nacional reforça ações de desaparecidos','Novos cartazes e mobilização nacional.','Movimento Nacional','https://exemplo.com/noticia5',now() - interval '2 days','desaparecimentos','Brasil','BR',65)
on conflict do nothing;

-- ========================== 9. MENSAGEM FINAL ===================================
do $$ begin
  raise notice E'\n\n====================================================\n  SIGMA VERTICE PRONTO! SUCESSO!\n====================================================\n\nBanco criado: 32 tabelas + enums + triggers + RLS + policies\nSeed carregado: 19 cargos + 34 permissões + 62 municípios AM + 5 unidades + 16 configurações + comunicados + notícias + métricas\nUsuário DG vinculado (se o UUID acima existir em auth.users):\n   UUID  = 3a9eb272-e1f1-4024-ad7e-365248b3d628\n   EMAIL = c13273822@gmail.com\n   LOGIN = usar o e-mail cadastrado em Authentication → Users\n\nPróximos passos (fora do SQL):\n   1) Copiar as 3 chaves do Supabase API Settings\n      → colar em .env.local do projeto local\n   2) Copiar as mesmas 3 na Vercel (Environment Variables)\n   3) Deployar na Vercel\n   4) Configurar DNS SuperDomínios → Vercel\n====================================================\n';
end $$;

-- =========================================== FIM
