-- ==========================================================================
--  SIGMA VERTICE - SQL DE RESET CASO A MIGRACAO ANTERIOR TENHA FALHADO NO MEIO
--  Rode este SQL SOMENTE se:
--     (a) voce rodou a migration 001_schema_principal.sql antes e deu ERRO;
--     (b) quer garantir que tudo seja APAGADO e recriado do ZERO.
--  ESTE SQL APAGA TUDO! Nao rode se voce ja tiver dados cadastrados.
-- ==========================================================================

-- Apaga triggers criadas no DO
drop trigger if exists trg_funcionarios_aud       on public.funcionarios cascade;
drop trigger if exists trg_processos_aud          on public.processos cascade;
drop trigger if exists trg_casos_aud              on public.casos cascade;
drop trigger if exists trg_viagens_aud            on public.viagens cascade;
drop trigger if exists trg_solicitacoes_aud       on public.solicitacoes cascade;
drop trigger if exists trg_documentos_aud         on public.documentos cascade;
drop trigger if exists trg_transacoes_aud         on public.transacoes cascade;
drop trigger if exists trg_faltas_aud             on public.faltas cascade;
drop trigger if exists trg_advertencias_aud       on public.advertencias cascade;
drop trigger if exists trg_desligamentos_aud      on public.desligamentos cascade;
drop trigger if exists trg_comunicados_aud        on public.comunicados cascade;
drop trigger if exists trg_alertas_aud            on public.alertas cascade;
drop trigger if exists trg_configuracoes_aud      on public.configuracoes cascade;
drop trigger if exists trg_beneficios_aud         on public.beneficios cascade;
drop trigger if exists trg_role_permissoes_aud    on public.role_permissoes cascade;

-- Apaga todas as tabelas em ORDEM CORRETA de FK
drop table if exists public.municipios_metricas  cascade;
drop table if exists public.distribuicoes        cascade;
drop table if exists public.auditoria            cascade;
drop table if exists public.configuracoes        cascade;
drop table if exists public.relatorios           cascade;
drop table if exists public.beneficios           cascade;
drop table if exists public.indicadores          cascade;
drop table if exists public.alertas              cascade;
drop table if exists public.comunicados          cascade;
drop table if exists public.desligamentos        cascade;
drop table if exists public.advertencias         cascade;
drop table if exists public.faltas               cascade;
drop table if exists public.noticias             cascade;
drop table if exists public.transacoes           cascade;
drop table if exists public.documentos           cascade;
drop table if exists public.arquivos             cascade;
drop table if exists public.mensagens            cascade;
drop table if exists public.conversas            cascade;
drop table if exists public.aprovacoes           cascade;
drop table if exists public.solicitacoes         cascade;
drop table if exists public.viagens              cascade;
drop table if exists public.casos                cascade;
drop table if exists public.processos            cascade;
drop table if exists public.sessoes              cascade;
drop table if exists public.funcionario_permissoes cascade;
drop table if exists public.funcionarios         cascade;
drop table if exists public.role_permissoes      cascade;
drop table if exists public.permissoes           cascade;
drop table if exists public.cargos               cascade;
drop table if exists public.unidades             cascade;
drop table if exists public.municipios           cascade;

-- Apaga funcoes helper que possam ter sido criadas
drop function if exists public.fn_meu_role() cascade;
drop function if exists public.fn_e_dg() cascade;
drop function if exists public.fn_e_diretoria() cascade;
drop function if exists public.trg_audita() cascade;
drop function if exists public.trg_atualiza_updated_at() cascade;

-- Apaga enums
drop type if exists public.role_sistema      cascade;
drop type if exists public.status_funcionario cascade;
drop type if exists public.tipo_processo     cascade;
drop type if exists public.status_processo   cascade;
drop type if exists public.tipo_caso         cascade;
drop type if exists public.severidade_caso   cascade;
drop type if exists public.status_caso       cascade;
drop type if exists public.status_viagem     cascade;
drop type if exists public.status_solicitacao cascade;
drop type if exists public.tipo_transacao    cascade;
drop type if exists public.status_transacao  cascade;
drop type if exists public.tipo_falta        cascade;
drop type if exists public.nivel_alerta      cascade;
drop type if exists public.status_sessao     cascade;
drop type if exists public.tipo_auditoria    cascade;
drop type if exists public.tipo_documento    cascade;
drop type if exists public.tipo_beneficio    cascade;

-- Sucesso
do $$ begin raise notice 'Banco Sigma Vértice limpo com sucesso. Agora pode rodar a migration 001_schema_principal.sql.'; end $$;
