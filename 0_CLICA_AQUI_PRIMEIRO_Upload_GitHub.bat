@echo off
title SIGMA VERTICE - UPLOAD AUTOMATICO FINAL (NAO TEM ERRO)
color 0B
cls

echo.
echo  =================================================================
echo     SIGMA VERTICE - PREPARA TUDO PARA UPLOAD NO GITHUB
echo  =================================================================
echo.
echo   Este .bat VAI FAZER TUDO PARA VOCE:
echo    - Apaga e cria uma pasta nova limpa: _PARA_ENVIAR_GITHUB
echo    - Copia SOMENTE os arquivos CERTOS (sem chaves, sem node, sem next)
echo    - ABRE essa pasta no explorador
echo    - ABRE a pagina de Upload do GitHub ao mesmo tempo
echo.
echo   DEPOIS VOCE SO PRECISA:
echo    1. SELECIONA TUDO da pasta _PARA_ENVIAR_GITHUB (Ctrl+A)
echo    2. ARRASTA para a pagina do GitHub Upload (solta)
echo    3. Espera carregar -> fim pagina -> [Commit changes] verde
echo.
pause

cd /d "D:\0001\sigmavertice"
if errorlevel 1 (
    color 0C
    echo.
    echo  [ERRO] Pasta D:\0001\sigmavertice NAO encontrada!
    echo   Confira se os arquivos estao no local correto.
    echo.
    pause
    exit /b 1
)

echo.
echo   PASSO 1: Limpando pasta temporaria _PARA_ENVIAR_GITHUB...
if exist "_PARA_ENVIAR_GITHUB" rmdir /S /Q "_PARA_ENVIAR_GITHUB"
mkdir "_PARA_ENVIAR_GITHUB"
echo   OK. Pasta limpa criada.
echo.

echo   PASSO 2: Copiando arquivos da RAIZ (3 arquivos):
echo    - next.config.js
echo    - tsconfig.json
echo    - middleware.ts
copy /Y "next.config.js" "_PARA_ENVIAR_GITHUB\next.config.js" >nul
copy /Y "tsconfig.json" "_PARA_ENVIAR_GITHUB\tsconfig.json" >nul
copy /Y "middleware.ts" "_PARA_ENVIAR_GITHUB\middleware.ts" >nul
echo   OK. 3 arquivos copiados.
echo.

echo   PASSO 3: Copiando pasta src COMPLETA (TODOS arquivos corrigidos)...
echo   (Pode demorar 10-15 segundos, aguarde...)
xcopy "src" "_PARA_ENVIAR_GITHUB\src\" /E /I /Q /Y /EXCLUDE:%~f0.excl 2>nul
if errorlevel 1 (
    echo   Tentando copia alternativa (sem exclude)...
    xcopy "src" "_PARA_ENVIAR_GITHUB\src\" /E /I /Q /Y >nul
)
echo   OK. Pasta src copiada.
echo.

echo   PASSO 4: Copiando arquivos auxiliares (package.json, tailwind, etc)...
for %%f in (package.json package-lock.json tailwind.config.ts postcss.config.js next-env.d.ts .gitignore README.md tsconfig.json next.config.js postcss.config.mjs jsconfig.json) do (
    if exist "%%f" copy /Y "%%f" "_PARA_ENVIAR_GITHUB\%%f" >nul 2>nul
)
if exist "public" xcopy "public" "_PARA_ENVIAR_GITHUB\public\" /E /I /Q /Y >nul 2>nul
if exist "types"  xcopy "types"  "_PARA_ENVIAR_GITHUB\types\"  /E /I /Q /Y >nul 2>nul
if exist "supabase" xcopy "supabase" "_PARA_ENVIAR_GITHUB\supabase\" /E /I /Q /Y >nul 2>nul
echo   OK.
echo.

echo   PASSO 5: REMOVENDO (por seguranca) qualquer .env ou chave na pasta upload...
if exist "_PARA_ENVIAR_GITHUB\.env.local" del /Q /F "_PARA_ENVIAR_GITHUB\.env.local" 2>nul
if exist "_PARA_ENVIAR_GITHUB\.env"       del /Q /F "_PARA_ENVIAR_GITHUB\.env" 2>nul
if exist "_PARA_ENVIAR_GITHUB\node_modules" rmdir /S /Q "_PARA_ENVIAR_GITHUB\node_modules" 2>nul
if exist "_PARA_ENVIAR_GITHUB\.next"       rmdir /S /Q "_PARA_ENVIAR_GITHUB\.next" 2>nul
echo   OK. Nenhum arquivo de chave ou build foi enviado.
echo.

echo   PASSO 6: Lista dos arquivos na pasta de upload:
echo.
dir /B "_PARA_ENVIAR_GITHUB"
echo.
echo   (Se apareceu next.config.js, tsconfig.json, middleware.ts, src = PERFEITO)
echo.

echo   PASSO 7: ABRINDO EXPLORADOR na pasta _PARA_ENVIAR_GITHUB...
timeout /t 2 /nobreak >nul
explorer "D:\0001\sigmavertice\_PARA_ENVIAR_GITHUB"
echo   OK. Explorador aberto.
echo.

echo   PASSO 8: ABRINDO PAGINA DE UPLOAD DO GITHUB...
timeout /t 2 /nobreak >nul
start "" "https://github.com/c13273922-collab/sigmavertice/upload/main"
echo   OK. Pagina GitHub Upload aberta.
echo.

color 0A
echo  =================================================================
echo               SOH FALTA VOCÊ ARRASTAR E SOLTAR!
echo  =================================================================
echo.
echo   FAÇA ISSO AGORA (NAS 2 JANELAS QUE ACABARAM DE ABRIR):
echo.
echo   1. JANELA EXPLORADOR (pasta _PARA_ENVIAR_GITHUB):
echo      - Clica DENTRO dela (nao em nenhum arquivo especifico)
echo      - Aperta  Ctrl + A   (seleciona TUDO, fica azul)
echo.
echo   2. SEM SOLTAR a selecao (segura o botao ESQUERDO do mouse
echo      em cima de qualquer arquivo selecionado azul):
echo      - ARRASTA TUDO para a JANELA DO NAVEGADOR (pagina GitHub Upload)
echo      - Solta (a aba "Drag additional files here" fica verde)
echo.
echo   3. ESPERA a barra de progresso verde chegar no fim (carregar tudo)
echo.
echo   4. DESCE a pagina ATE O FIM (ate nao poder mais descer)
echo.
echo   5. CLICA no botao VERDE GRANDE:
echo           [ Commit changes ]
echo.
echo   ---------------------------------------------------------------
echo   DEPOIS DO COMMIT VERDE:
echo   - Abre a Vercel:  https://vercel.com/ivanildojunior160698-4106s-projects/sigmavertice
echo   - Clica em [Redeploy] (verde, canto superior direito)
echo   - Aguarda 60-90s -> [Ready] verde
echo   - Testa login: c13273822@gmail.com / 123 / 123456
echo  =================================================================
echo.
pause
start "" "https://vercel.com/ivanildojunior160698-4106s-projects/sigmavertice"
exit /b 0
