@echo off
chcp 65001 >nul
cls
echo.
echo =================================================================
echo   SIGMA VERTICE - PASSO RAPIDO 1/3: PREPARAR PARA O GITHUB
echo =================================================================
echo.
echo Este script:
echo   1. Verifica se o GIT esta instalado no seu PC
echo   2. Inicializa o repositorio local (se ainda nao existir)
echo   3. Adiciona TODOS os arquivos do projeto
echo   4. Cria o primeiro commit
echo   5. Renomeia a branch para "main" (padrao GitHub)
echo.
echo IMPORTANTE:
echo   ANTES de rodar este script, CRIE um repositorio VAZIO chamado
echo   "sigmavertice" no GitHub em: https://github.com/new
echo   (Marque apenas Public ou Private, NAO marque LICENSE, README
echo    nem .gitignore - o nosso ja existe)
echo.
pause

where git >nul 2>nul
if %errorlevel% neq 0 (
    echo.
    echo [ERRO] GIT NAO ENCONTRADO no seu computador.
    echo Baixe e instale o Git para Windows:
    echo https://git-scm.com/download/win
    echo Depois reinicie o PC e rode este .BAT novamente.
    echo.
    pause
    exit /b 1
)

cd /d "%~dp0"

if exist .git (
    echo [OK] Repositorio Git ja existe nesta pasta. Pulando init.
) else (
    echo [1/5] Inicializando Git localmente...
    call git init
    if %errorlevel% neq 0 goto :erro
)

echo [2/5] Adicionando todos os arquivos (exceto os do .gitignore)...
call git add .
if %errorlevel% neq 0 goto :erro

echo [3/5] Criando commit inicial...
call git commit -m "deploy sigmavertice portal funcionarios versao 1.0 - 22.08.2026"
if %errorlevel% neq 0 goto :erro

echo [4/5] Garantindo branch principal = main...
call git branch -M main
if %errorlevel% neq 0 goto :erro

echo.
echo =================================================================
echo   QUASE LA!
echo =================================================================
echo.
echo Agora, abra o seu repositorio VAZIO no GitHub e copie o comando
echo que parece com ISSO (trocando SEU_USUARIO pelo seu usuario):
echo.
echo   git remote add origin https://github.com/SEU_USUARIO/sigmavertice.git
echo   git push -u origin main
echo.
echo Copie e cole os DOIS comandos abaixo no PowerShell / CMD dentro
echo desta mesma pasta, ou rode manualmente no GitHub Desktop se preferir.
echo.
echo Depois de terminar o PUSH, volte aqui e feche esta janela,
echo e abra o ARQUIVO: PASSO_RAPIDO_2_VERCEL_DEPLOY.bat
echo.
pause
exit /b 0

:erro
echo.
echo [ERRO] Ocorreu um problema durante a preparacao do Git.
echo Leia as mensagens ACIMA para entender o que deu errado.
echo Se nao souber resolver, tire um print e mostre.
echo.
pause
exit /b 1
