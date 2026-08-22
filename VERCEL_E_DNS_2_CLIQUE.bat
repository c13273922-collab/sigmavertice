@echo off
title SIGMA VERTICE - VERCEL + DNS SUPERDOMINIOS - 2 CLIQUE
color 0B
cls

echo.
echo  ================================================================
echo    SIGMA VERTICE  -  FINALIZAR PUBLICACAO (VERCEL + DNS)
echo  ================================================================
echo.
echo   OBS: Antes de continuar, o deploy da Vercel tem que estar
echo        [Ready] (botao VERDE no topo da Overview).
echo        Se ainda estiver BUILDING, aguarda ele terminar.
echo.
echo   ================================================================
echo   PASSO 1: ABRIR VERCEL OVERVIEW (verifica se esta READY)
echo   ================================================================
echo   Vai abrir o painel da Vercel do projeto sigmavertice.
echo   Confere se o status esta READY (verde) no topo da pagina.
echo.
pause
start "" "https://vercel.com/ivanildojunior160698-4106s-projects/sigmavertice"
cls

echo.
echo   ================================================================
echo   PASSO 2: ABRIR TELA DE LOGIN - TESTAR SE O SITE ABRE
echo   ================================================================
echo.
echo   Agora vai abrir a URL temporaria *.vercel.app para testar.
echo   (Clicou no botao Visit na Vercel Overview?)
echo.
echo   DADOS DE TESTE DO DIRETOR GERAL (funciona SEMPRE, mesmo se
echo   Supabase der erro):
echo.
echo     E-MAIL:  c13273822@gmail.com
echo     SENHA :  123  (qualquer senha, sempre entra)
echo     MFA 6:  123456
echo.
echo   Se aparecer a tela de Login azul/dourado em 3 segundos = CERTO.
echo   Se aparecer Dashboard DG = PERFEITO.
echo.
pause
cls

echo.
echo   ================================================================
echo   PASSO 3: CONFIGURAR DOMINIO OFICIAL SIGMAVERTICE.ORG na VERCEL
echo   ================================================================
echo.
echo   Vai abrir a pagina Settings / Domains da Vercel.
echo.
echo   QUANDO ABRIR, FAZ ISSO:
echo   1. Clica em [Add] ou [Add Domain]
echo   2. Digita: sigmavertice.org   e  [Add]
echo   3. Vai aparecer "Invalid Configuration" (normal)
echo      - Anota o IP que aparece (tipo A @ XXX.XX.XX.XX)
echo      - E CNAME www cname.vercel-dns.com (ja vou deixar aberto)
echo.
echo   VALORES OFICIAIS DE DNS DA VERCEL (use esses se nao aparecer):
echo     REGISTRO A (tipo A):
echo        Nome (Host):  @   (ou sigmavertice.org)
echo        Valor (IP) :  76.76.21.21
echo        TTL       :  300 (5 minutos)
echo.
echo     REGISTRO CNAME (tipo CNAME):
echo        Nome (Host):  www
echo        Valor     :  cname.vercel-dns.com
echo        TTL       :  300
echo.
pause
start "" "https://vercel.com/ivanildojunior160698-4106s-projects/sigmavertice/settings/domains"
cls

echo.
echo   ================================================================
echo   PASSO 4: ABRIR PAINEL SUPERDOMINIOS - CONFIGURAR DNS
echo   ================================================================
echo.
echo   Vai abrir o site da SuperDominios.
echo.
echo   FAZ ISSO NO SUPERDOMINIOS:
echo   1. Faca login na sua conta
echo   2. Clica em Gerenciar Hospedagem / sigmavertice.org
echo   3. No menu esquerdo, clica em GERENCIAMENTO DE DNS
echo.
echo   4. PROCURA registros antigos TIPO A ou CNAME com @ ou www
echo      (se existir, APAGA eles - NAO apague NS, MX, TXT de email!)
echo.
echo   5. Cria 2 registros NOVOS:
echo.
echo      ========== PRIMEIRO REGISTRO ==========
echo      Tipo        : A
echo      Nome/Host   : @
echo      Valor/IP    : 76.76.21.21
echo      TTL         : 300
echo      [Salvar]
echo.
echo      ========== SEGUNDO REGISTRO ==========
echo      Tipo        : CNAME
echo      Nome/Host   : www
echo      Valor       : cname.vercel-dns.com
echo      TTL         : 300
echo      [Salvar]
echo.
echo   6. Aguarde 10 a 30 minutos (propagacao DNS Brasil)
echo.
pause
start "" "https://superdominios.com.br"
cls

color 0A
echo.
echo  ================================================================
echo   AGUARDE 10-30 MINUTOS DE PROPAGACAO, DEPOIS VOLTA NA VERCEL
echo  ================================================================
echo.
echo   VOLTE na pagina Settings / Domains da Vercel
echo   (a janela ja esta aberta):
echo.
echo   1. Clica no botao [Refresh] ao lado de sigmavertice.org
echo      (ou atualiza a pagina com F5)
echo.
echo   2. Quando aparecer:
echo         Valid Configuration [VERDE CHECK]
echo      Entao clica nos 3 pontinhos (...) ao lado de sigmavertice.org
echo      e escolhe:  Make Primary Domain
echo.
echo   3. Em 1-3 minutos a Vercel emite o CERTIFICADO HTTPS automatico.
echo.
echo.
echo   ================================================================
echo     TESTE FINAL (em aba anonima / navegador privado):
echo   ================================================================
echo.
echo   Acesse:  https://sigmavertice.org
echo.
echo   Se aparecer a tela de Login = PUBLICACAO CONCLUIDA!
echo.
echo   Login teste Diretor Geral (SEM FALHA, garantido no codigo):
echo       Email: c13273822@gmail.com
echo       Senha: 123
echo       MFA 6 digitos: 123456
echo.
echo   ================================================================
echo           FIM - SITE NO AR ATE 22!
echo   ================================================================
echo.
pause
start "" "https://sigmavertice.org"
exit /b 0
