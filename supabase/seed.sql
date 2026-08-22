-- ============================================================================
-- SIGMA VÉRTICE - SEEDER 001 - Dados Iniciais
-- Cargos · Permissões · Municípios AM · Configurações · Usuário DG padrão
-- ============================================================================

-- ============================ 1. CARGOS ============================
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

-- ============================ 2. PERMISSÕES ============================
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

-- ============================ 3. ROLE → PERMISSÕES ============================
insert into public.role_permissoes (role_sistema, permissao_id)
select r.rs::role_sistema, p.id
from (values
  ('diretor_geral'),
  ('diretor_central'),
  ('coordenador'),
  ('funcionario')
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

-- ============================ 4. MUNICÍPIOS DO AMAZONAS ============================
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

-- ============================ 5. UNIDADES EXEMPLO ============================
with am as (select id from public.municipios where codigo_ibge = '1302505')
insert into public.unidades (codigo, nome, tipo, municipio_id, capacidade, ativo)
values
  ('UNI-HQ-001','Sede Principal Manaus (Diretoria Geral)','Sede',(select id from am), 2000, true),
  ('UNI-AM-002','Unidade Manaus - Centro Operacional','Operacional',(select id from am), 1500, true),
  ('UNI-AM-003','Unidade Manaus - Inteligência de Dados','Inteligência',(select id from am), 500, true)
on conflict (codigo) do nothing;

with tefe as (select id from public.municipios where codigo_ibge = '1303958')
insert into public.unidades (codigo, nome, tipo, municipio_id, capacidade, ativo)
values
  ('UNI-TEF-001','Unidade Tefé - Polo Sul do Amazonas','Operacional',(select id from tefe), 600, true)
on conflict (codigo) do nothing;

with par as (select id from public.municipios where codigo_ibge = '1303008')
insert into public.unidades (codigo, nome, tipo, municipio_id, capacidade, ativo)
values
  ('UNI-PAR-001','Unidade Parintins - Polo Leste','Operacional',(select id from par), 500, true)
on conflict (codigo) do nothing;

with tab as (select id from public.municipios where codigo_ibge = '1303800')
insert into public.unidades (codigo, nome, tipo, municipio_id, capacidade, ativo)
values
  ('UNI-TAB-001','Unidade Tabatinga - Polo Fronteiriço','Fronteiriça',(select id from tab), 450, true)
on conflict (codigo) do nothing;

-- ============================ 6. CONFIGURAÇÕES DO SISTEMA ============================
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

-- ============================ 7. MUNICÍPIOS_MÉTRICAS (zerado inicial) ============================
insert into public.municipios_metricas (municipio_id)
select id from public.municipios
on conflict (municipio_id) do nothing;

-- ============================ 8. VÍNCULO DIRETOR GERAL ANTES DE COMUNICADOS (FK) ==========
-- Copie o UUID do seu usuário DG (Authentication → Users) e cole abaixo:
insert into public.funcionarios (
  id, matricula, nome_completo, email_institucional, email_pessoal,
  municipio_id, unidade_id, cargo_id, role_sistema,
  data_admissao, status_registro, created_at, updated_at
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

-- ============================ 9. COMUNICADOS INICIAIS ============================
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

-- ============================ 10. NOTÍCIAS EXEMPLO (FEED MONITORAMENTO) ============================
insert into public.noticias (titulo, resumo, fonte, url_origem, data_publicacao, categoria, local, uf, relevancia) values
('Operação conjunta apreende carga em Porto de Manaus','Agentes de fiscalização apreenderam mercadorias irregulares nesta semana.','Fonte Oficial','https://exemplo.com/noticia1',now() - interval '3 hours','seguranca_publica','Manaus','AM',90),
('Polícia deflagra operação contra crimes cibernéticos no AM','Ação atinge nove municípios do interior.','Portal de Segurança','https://exemplo.com/noticia2',now() - interval '8 hours','policia','Amazonas','AM',85),
('Justiça determina medidas cautelares em investigação','Decisão saiu nesta manhã de sábado.','Diário da Justiça','https://exemplo.com/noticia3',now() - interval '1 day','justica','Manaus','AM',78),
('Monitoramento indica aumento de ocorrências na região Sul do estado','Painel de ocorrências aponta crescimento percentual.','Monitoramento Brasil','https://exemplo.com/noticia4',now() - interval '12 hours','ocorrencias','Sul do AM','AM',72),
('Campanha nacional reforça ações de desaparecidos','Novos cartazes e mobilização nacional.','Movimento Nacional','https://exemplo.com/noticia5',now() - interval '2 days','desaparecimentos','Brasil','BR',65)
on conflict do nothing;

-- ============================================================================
-- FIM DO SEEDER 001
-- ============================================================================
