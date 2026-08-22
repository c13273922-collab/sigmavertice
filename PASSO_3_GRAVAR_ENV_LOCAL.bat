@echo off
chcp 65001 >nul
title =============================================================
title     SIGMA VERTICE · COLOCAR CHAVES NO .ENV.LOCAL
title =============================================================
cls

echo.
echo  ============================================================
echo     PASSO A PASSO AUTOMATICO - GRAVAR AS 3 CHAVES
echo  ============================================================
echo.
echo  Vamos pedir as 3 CHAVES que voce copiou.
echo  Basta colar (Ctrl+V) quando aparecer o prompt e apertar ENTER.
echo.
echo  Se voce fechar sem querer, é só abrir esse arquivo de novo.
echo.

set /p URL_VAR="Cole aqui a PRIMEIRA CHAVE (PROJECT URL - começa com https://...): "
echo.
echo  Project URL recebida: %URL_VAR%
echo.

set /p PUB_VAR="Cole aqui a SEGUNDA CHAVE (PUBLISHABLE KEY - sb_publishable_...): "
echo.
echo  Publishable key recebida: %PUB_VAR%
echo.

set /p SEC_VAR="Cole aqui a TERCEIRA CHAVE (SECRET KEY - sb_secret_...): "
echo.
echo  Secret key recebida: %SEC_VAR%
echo.
echo ============================================================
echo   Salvando em d:\0001\sigmavertice\.env.local
echo ============================================================
echo.

(
echo NEXT_PUBLIC_SUPABASE_URL=%URL_VAR%
echo NEXT_PUBLIC_SUPABASE_ANON_KEY=%PUB_VAR%
echo SUPABASE_URL=%URL_VAR%
echo SUPABASE_SERVICE_ROLE_KEY=%SEC_VAR%
echo SUPABASE_ANON_KEY=%PUB_VAR%
) > d:\0001\sigmavertice\.env.local

timeout /t 2 /nobreak >nul

echo.
echo ============================================================
echo   ✅  CONCLUIDO!  ARQUIVO .env.local SALVO!
echo ============================================================
echo.
echo  Conteudo salvo:
type d:\0001\sigmavertice\.env.local
echo.
echo  Proximo passo: abrir o arquivo PASSO_3_GITHUB_VERCEL.txt
echo  e seguir as instrucoes para publicar no dominio sigmavertice.org
echo.
pause
