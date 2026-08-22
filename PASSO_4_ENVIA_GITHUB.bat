@echo off
chcp 65001 >nul
title =============================================================
title     SIGMA VERTICE · PASSO 4: ENVIAR CODIGO PARA O GITHUB
title =============================================================
cls

echo.
echo  ========================================================================
echo    PASSO 4: Enviar todo o codigo do seu PC para o GitHub
echo  ========================================================================
echo.
echo  ANTES DE CONTINUAR, VOCE JA DEVE TER CRIADO o repositorio VAZIO
echo  no link https://github.com/new
echo  (Nome: sigmavertice  -  sem README, sem .gitignore, sem licenca)
echo.
echo  Se NAO criou ainda, feche esta janela (botao X), crie e depois volte.
echo.
pause

cls
set /p GIT_USER=Digite seu USERNAME do GitHub (ex: ivanildojunior160698 ou o que voce usa): 
set /p GIT_REPO=Digite o NOME DO REPOSITORIO que voce criou (normalmente = sigmavertice): 

echo.
echo ============================================================
echo   Configurando repositorio local Git...
echo ============================================================
cd /d d:\0001\sigmavertice

git init 2>nul
git add .
git commit -m "Initial commit - Sistema Sigma Vertice, Next14 + Supabase, 32 tabelas, RLS, MFA, 20 modulos" 2>nul || (
   echo.
   echo   Nenhuma alteracao nova para commitar. Prosseguindo...
   echo.
)

echo.
echo ============================================================
echo   Vinculando repositorio com seu GitHub...
echo ============================================================
git remote remove origin 2>nul
git remote add origin https://github.com/%GIT_USER%/%GIT_REPO%.git

echo.
echo   Agora vamos enviar para a branch main.
echo.
echo   Se for a PRIMEIRA VEZ, vai aparecer uma janela pedindo para AUTORIZAR
echo   "Git Credential Manager" com a sua conta GitHub.
echo   → Autorize normalmente (logue, autorize, feche a janela de login).
echo.
echo   Se aparecer erros de autorizacao, faca o seguinte:
echo   va no GitHub → Settings → Developer settings → Personal access tokens →
echo   Tokens (classic) → Generate new token (classic) → marco repo, user →
echo   copie o token. Quando pedir senha aqui, COLE O TOKEN.
echo.
pause

git branch -M main
git push -u origin main

echo.
echo ========================================================================
echo ✅   FINALIZADO!  Agora volte no GitHub e atualize a pagina (F5).
echo      Voce deve ver as pastas src/, supabase/, arquivos .bat etc.
echo ========================================================================
echo.
echo  Proximo passo: abrir PASSO_4_GITHUB_VERCEL_SUPERDOMINIOS.txt
echo  e seguir a parte da VERCEL (importar projeto, colar 3 env vars, deploy,
echo  depois configurar DNS SuperDominios).
echo.
pause
