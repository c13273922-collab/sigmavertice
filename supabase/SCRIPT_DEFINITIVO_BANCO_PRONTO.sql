-- ============================================================================
--  SCRIPT DEFINITIVO — DIAGNÓSTICO + RESOLVE TUDO EM 1 CLIQUE
--  Sigma Vertice · Portal dos Funcionarios
--
--  COMO USAR:
--  1) Abra o SQL Editor do seu Supabase (aba NOVA):
--     https://supabase.com/dashboard/project/swpoqlgsyfecpdwyjffv/sql/new
--  2) Apague TUDO o que estiver escrito lá (Ctrl+A + Delete)
--  3) Abra ESTE ARQUIVO no Bloco de Notas → Ctrl+A → Ctrl+C
--  4) Cole no SQL Editor → Ctrl+V
--  5) Clique em [Run] / [Executar] (botão azul)
--  6) Aguarde. No final, em "Messages / Notices", procure a linha:
--     "🎉 SCRIPT DEFINITIVO EXECUTADO! BANCO PRONTO! 🎉"
-- ============================================================================

-- ============= PASSO 0: DIAGNÓSTICO (para sabermos exatamente o que tem) =============
DO $$
DECLARE
  v_tem_cargo_dg     int;
  v_tem_unid_hq      int;
  v_tem_mun_manaus   int;
  v_tem_dg           int;
  v_cargo_id         uuid;
  v_unidade_id       uuid;
  v_municipio_id     uuid;
BEGIN
  SELECT count(*) INTO v_tem_cargo_dg   FROM public.cargos     WHERE nome='Diretor Geral';
  SELECT count(*) INTO v_tem_unid_hq    FROM public.unidades   WHERE codigo='UNI-HQ-001';
  SELECT count(*) INTO v_tem_mun_manaus FROM public.municipios WHERE codigo_ibge='1302505';
  SELECT count(*) INTO v_tem_dg         FROM public.funcionarios WHERE id = '3a9eb272-e1f1-4024-ad7e-365248b3d628'::uuid;

  SELECT id INTO v_cargo_id     FROM public.cargos     WHERE nome='Diretor Geral' LIMIT 1;
  SELECT id INTO v_unidade_id   FROM public.unidades   WHERE codigo='UNI-HQ-001' LIMIT 1;
  SELECT id INTO v_municipio_id FROM public.municipios WHERE codigo_ibge='1302505' LIMIT 1;

  RAISE NOTICE E'\n\n================= DIAGNÓSTICO =================\n'
               'Cargo Diretor Geral existente?  % (id=%)\n'
               'Unidade HQ existente?           % (id=%)\n'
               'Município Manaus existente?     % (id=%)\n'
               'Funcionario DG já cadastrado?   %\n'
               '================================================',
               v_tem_cargo_dg, v_cargo_id,
               v_tem_unid_hq,  v_unidade_id,
               v_tem_mun_manaus, v_municipio_id,
               v_tem_dg;
END $$;

-- ============= PASSO 1: GARANTE O CARGO DIRETOR GERAL (se faltar) =============
INSERT INTO public.cargos (nome, nivel_hierarquico, departamento, descricao, salario_base, ativo)
VALUES ('Diretor Geral', 1, 'Diretoria', 'Controle administrativo máximo', 25000.00, true)
ON CONFLICT (nome) DO NOTHING;

-- ============= PASSO 2: GARANTE UNIDADE HQ + MUNICÍPIO MANAUS (se faltar) =============
DO $$
DECLARE v_mun uuid;
BEGIN
  SELECT id INTO v_mun FROM public.municipios WHERE codigo_ibge='1302505' LIMIT 1;
  IF v_mun IS NULL THEN
    INSERT INTO public.municipios (codigo_ibge, nome, uf, regiao, populacao, latitude, longitude, capital, ativo)
    VALUES ('1302505','Manaus','AM','Centro','2255903',-3.1019,-60.0250,true,true)
    ON CONFLICT (codigo_ibge) DO NOTHING;
    SELECT id INTO v_mun FROM public.municipios WHERE codigo_ibge='1302505' LIMIT 1;
  END IF;
  INSERT INTO public.unidades (codigo, nome, tipo, municipio_id, capacidade, ativo)
  VALUES ('UNI-HQ-001','Sede Principal Manaus (Diretoria Geral)','Sede',v_mun,2000,true)
  ON CONFLICT (codigo) DO NOTHING;
END $$;

-- ============= PASSO 3: INSERE O DG E RETORNA (sem on conflict do nothing que oculta erro) =============
DO $$
DECLARE
  v_cargo      uuid;
  v_unidade    uuid;
  v_municipio  uuid;
BEGIN
  SELECT id INTO v_cargo     FROM public.cargos     WHERE nome='Diretor Geral' LIMIT 1;
  SELECT id INTO v_unidade   FROM public.unidades   WHERE codigo='UNI-HQ-001' LIMIT 1;
  SELECT id INTO v_municipio FROM public.municipios WHERE codigo_ibge='1302505' LIMIT 1;

  IF v_cargo IS NULL THEN RAISE EXCEPTION 'FALTOU CARGO Diretor Geral após passo 1'; END IF;
  IF v_unidade IS NULL THEN RAISE EXCEPTION 'FALTOU UNIDADE UNI-HQ-001 após passo 2'; END IF;
  IF v_municipio IS NULL THEN RAISE EXCEPTION 'FALTOU MUNICIPIO Manaus'; END IF;

  RAISE NOTICE 'IDs válidos confirmados: cargo=%, unidade=%, municipio=%', v_cargo, v_unidade, v_municipio;

  -- Testa se já existe
  PERFORM 1 FROM public.funcionarios WHERE id = '3a9eb272-e1f1-4024-ad7e-365248b3d628'::uuid;
  IF FOUND THEN
    RAISE NOTICE '✅ Funcionário DG JÁ EXISTE — pulando insert.';
  ELSE
    INSERT INTO public.funcionarios (
      id, matricula, nome_completo, email_institucional, email_pessoal,
      municipio_id, unidade_id, cargo_id, role_sistema,
      data_admissao, status_registro
    ) VALUES (
      '3a9eb272-e1f1-4024-ad7e-365248b3d628'::uuid,
      'SV-DG-0001',
      'Diretor Geral',
      'c13273822@gmail.com',
      'c13273822@gmail.com',
      v_municipio,
      v_unidade,
      v_cargo,
      'diretor_geral',
      current_date,
      'ativo'
    );
    RAISE NOTICE '✅ Funcionário DG INSERIDO com SUCESSO!';
  END IF;
END $$;

-- ============= PASSO 4: QUEBRA O GARGALLO — publicado_por passa a aceitar NULL =============
DO $$ BEGIN
  ALTER TABLE public.comunicados ALTER COLUMN publicado_por DROP NOT NULL;
EXCEPTION WHEN others THEN NULL; END $$;

-- ============= PASSO 5: AGORA INSERE COMUNICADOS (publicado_por = NULL se não tiver DG) =============
INSERT INTO public.comunicados
  (titulo, categoria, conteudo, publicado_por, fixo, ativo, classificacao)
VALUES
  ('Bem-vindo(a) à Central de Inteligência SIGMA VÉRTICE',
   'institucional',
   '<p>Prezado(a) colaborador(a),</p>
    <p>É com grande satisfação que apresentamos a nova Central Integrada de Inteligência,
    Monitoramento e Gestão da SIGMA VÉRTICE.</p>
    <p>A partir de hoje, todas as comunicações, processos, viagens, documentos e serviços
    serão realizados exclusivamente por meio desta plataforma.</p>
    <p>O WhatsApp e demais aplicativos externos estão extintos para assuntos de trabalho.</p>
    <p>Atenciosamente,<br/><b>Diretoria-Geral</b></p>',
   (SELECT id FROM public.funcionarios ORDER BY created_at ASC LIMIT 1),
   true, true, 'publico'),

  ('Orientações de Sigilo e Segurança da Informação',
   'seguranca',
   '<p><b>É VEDADO:</b></p>
    <ul>
      <li>Compartilhar qualquer dado institucional por meio não oficial;</li>
      <li>Fazer comentários sobre atividades da agência em redes sociais;</li>
      <li>Acessar sistemas utilizando credenciais de outro colaborador;</li>
      <li>Divulgar qualquer conteúdo sem autorização da Diretoria.</li>
    </ul>',
   (SELECT id FROM public.funcionarios ORDER BY created_at ASC LIMIT 1),
   true, true, 'confidencial'),

  ('Nova Infraestrutura de Servidores',
   'ti',
   '<p>Todos os colaboradores receberão, em seus e-mails cadastrados,
    link oficial, código de ativação pessoal, token e manual de instalação.</p>',
   (SELECT id FROM public.funcionarios ORDER BY created_at ASC LIMIT 1),
   true, true, 'publico')
ON CONFLICT DO NOTHING;

-- ============= PASSO 6: Notícias exemplo (feed Monitoramento) =============
INSERT INTO public.noticias (titulo, resumo, fonte, url_origem, data_publicacao, categoria, local, uf, relevancia)
VALUES
('Operação conjunta apreende carga em Porto de Manaus','Agentes de fiscalização apreenderam mercadorias irregulares nesta semana.','Fonte Oficial','https://exemplo.com/noticia1',now() - interval '3 hours','seguranca_publica','Manaus','AM',90),
('Polícia deflagra operação contra crimes cibernéticos no AM','Ação atinge nove municípios do interior.','Portal de Segurança','https://exemplo.com/noticia2',now() - interval '8 hours','policia','Amazonas','AM',85),
('Justiça determina medidas cautelares em investigação','Decisão saiu nesta manhã.','Diário da Justiça','https://exemplo.com/noticia3',now() - interval '1 day','justica','Manaus','AM',78),
('Monitoramento indica aumento de ocorrências na região Sul','Painel de ocorrências aponta crescimento.','Monitoramento Brasil','https://exemplo.com/noticia4',now() - interval '12 hours','ocorrencias','Sul do AM','AM',72),
('Campanha nacional reforça ações de desaparecidos','Novos cartazes e mobilização nacional.','Movimento Nacional','https://exemplo.com/noticia5',now() - interval '2 days','desaparecimentos','Brasil','BR',65)
ON CONFLICT DO NOTHING;

-- ============= PASSO 7: RELATÓRIO FINAL =============
DO $$
DECLARE
  v_dg_exists int;
  v_dg_role   text;
  v_count_com int;
  v_count_not int;
BEGIN
  SELECT count(*) INTO v_dg_exists FROM public.funcionarios WHERE id = '3a9eb272-e1f1-4024-ad7e-365248b3d628'::uuid;
  SELECT role_sistema::text INTO v_dg_role FROM public.funcionarios WHERE id = '3a9eb272-e1f1-4024-ad7e-365248b3d628'::uuid;
  SELECT count(*) INTO v_count_com FROM public.comunicados;
  SELECT count(*) INTO v_count_not FROM public.noticias;

  RAISE NOTICE E'\n\n====================================================\n'
               '  🎉  SCRIPT DEFINITIVO EXECUTADO! BANCO PRONTO!  🎉\n'
               '====================================================\n\n'
               '✅ Funcionário DG cadastrado? % (role=%)\n'
               '   UUID: 3a9eb272-e1f1-4024-ad7e-365248b3d628\n'
               '   Email login: c13273822@gmail.com\n\n'
               '✅ Comunicados carregados:  %\n'
               '✅ Notícias exemplo:        %\n\n'
               '>>> Próximos passos FORA do SQL:\n'
               '    1) Copiar 3 chaves em Settings → API (Supabase)\n'
               '    2) Colar na Vercel → Deploy → Publicar\n'
               '    3) DNS SuperDomínios → Vercel\n'
               '====================================================\n',
               CASE WHEN v_dg_exists>0 THEN 'SIM' ELSE 'NAO' END,
               coalesce(v_dg_role, '?'),
               v_count_com,
               v_count_not;
END $$;

-- =========================================== FIM
