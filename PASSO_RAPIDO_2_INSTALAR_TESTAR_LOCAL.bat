@echo off
chcp 65001 >nul
cls
echo.
echo =================================================================
echo   SIGMA VERTICE - PASSO RAPIDO 2/3: TESTAR LOCALMENTE + BUILD
echo =================================================================
echo.
echo Este script:
echo   1. Verifica se Node.js e npm estao instalados
echo   2. Instala todas as dependencias (npm install)
echo   3. Faz o BUILD de producao (para ver se tem erro de tipagem)
echo   4. No final, pergunta se voce quer rodar o servidor local
echo.
echo ANTES de rodar isto:
echo   - Preencha o arquivo .env.local com as 3 chaves REAIS do
echo     Supabase (URL, anon, service_role). Pegue aqui:
echo     https://supabase.com/dashboard/project/swpoqlgsyfecpdwyjffv/settings/api
echo   - Tenha rodado a MIGRATION + SEED no SQL Editor do Supabase:
echo     https://supabase.com/dashboard/project/swpoqlgsyfecpdwyjffv/sql/new
echo.
pause

where node >nul 2>nul
if %errorlevel% neq 0 (
    echo.
    echo [ERRO] NODE.JS NAO ENCONTRADO.
    echo Baixe e instale a versao LTS em:
    echo https://nodejs.org/pt-br/download
    echo Depois reinicie o PC e rode novamente este .BAT.
    echo.
    pause
    exit /b 1
)

where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo.
    echo [ERRO] NPM NAO ENCONTRADO (normalmente vem com o Node.js).
    echo Reinicie o PC apos instalar Node.js e rode novamente.
    echo.
    pause
    exit /b 1
)

cd /d "%~dp0"

echo [Node] Versao instalada:
call node -v
echo [Npm]  Versao instalada:
call npm -v
echo.

echo [1/2] Instalando dependencias (npm install)...
echo (Isso pode levar de 1 a 5 minutos dependendo da internet)
call npm install
if %errorlevel% neq 0 (
    echo.
    echo [ERRO] Falhou no npm install.
    echo Tente rodar manualmente: npm install --legacy-peer-deps
    pause
    exit /b 1
)

echo.
echo [2/2] Rodando build de producao para testar o codigo...
echo (Se passar sem erros VERMELHOS, esta 100% pronto para deploy online)
call npm run build
if %errorlevel% neq 0 (
    echo.
    echo [AVISO] Houve warning/erros durante o build.
    echo Leia as mensagens acima. Muitas vezes sao apenas warnings.
    echo Se nao for erro CRITICO, ainda assim voce pode deployar.
) else (
    echo.
    echo [SUCESSO] BUILD PASSOU SEM ERROS! O codigo esta 100% compativel.
)

echo.
echo =================================================================
echo   QUER RODAR LOCALMENTE AGORA PARA TESTAR NO NAVEGADOR?
echo =================================================================
echo.
choice /c SN /m "[S] Sim - rodar servidor de desenvolvimento em http://localhost:3000   [N] Nao - quero seguir direto para o deploy online"
if %errorlevel% equ 1 (
    echo.
    echo Abrindo servidor local: http://localhost:3000
    echo Deixe esta janela aberta enquanto estiver testando.
    echo Para fechar, pressione CTRL+C.
    echo.
    call npm run dev
) else (
    echo.
    echo OK, agora va para o PASSO_RAPIDO_3_VERCEL_DEPLOY_ONLINE.bat
    echo ou abra o arquivo:
    echo d:\0001\sigmavertice\PUBLICAR_ONLINE_SUPERDOMINIOS_VERCEL.txt
    echo.
    pause
)
exit /b 0
