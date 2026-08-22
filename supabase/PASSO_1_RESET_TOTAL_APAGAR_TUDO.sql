-- ============================================================================
--  SIGMA VÉRTICE · RESET TOTAL DO BANCO (LIMPA TUDO)
--  RODE ESTE PRIMEIRO — garante banco zero, sem nenhuma "sujeira" das tentativas.
-- ============================================================================

-- Apaga TRIGGERS (para não dar erro de "dependent objects")
do $$
declare t record;
begin
  for t in select table_schema, table_name, trigger_name
           from information_schema.triggers
           where event_object_schema='public' loop
    execute format('drop trigger if exists %I on %I.%I cascade',
                   t.trigger_name, t.table_schema, t.table_name);
  end loop;
end $$;

-- Apaga TODAS as tables em ORDEM CORRETA de FK (de trás para frente, para não dar erro)
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

-- Apaga FUNCTIONS
drop function if exists public.fn_meu_role()            cascade;
drop function if exists public.fn_e_dg()                cascade;
drop function if exists public.fn_e_diretoria()         cascade;
drop function if exists public.trg_atualiza_updated_at() cascade;
drop function if exists public.trg_audita()             cascade;

-- Apaga TIPOS ENUM (precisa depois de tables que usam eles)
do $$
declare t record;
begin
  for t in select typname from pg_type
           where typnamespace='public'::regnamespace
             and typtype='e' loop
    execute format('drop type if exists public.%I cascade', t.typname);
  end loop;
end $$;

-- Mensagem final
do $$ begin
  raise notice E'\n\n====================================================\n'
               '  ✅ RESET TOTAL CONCLUÍDO COM SUCESSO!  ✅\n'
               '====================================================\n\n'
               'Agora você pode rodar o arquivo:\n'
               '  → SCRIPT_COMPLETO_1_CLIQUE_MIGRATION_SEED.sql\n\n'
               'Ele irá criar TUDO do zero, sem erros.\n'
               '====================================================\n';
end $$;
