@echo off
echo ========================================
echo    DESPLIEGUE RAPIDO - PAGINA WEB
echo ========================================
echo.

echo 1. Verificando archivos...
if not exist "index.html" (
    echo ERROR: No se encuentra index.html
    pause
    exit /b 1
)

if not exist "styles\main.css" (
    echo ERROR: No se encuentra styles\main.css
    pause
    exit /b 1
)

if not exist "js\main.js" (
    echo ERROR: No se encuentra js\main.js
    pause
    exit /b 1
)

echo ✅ Archivos principales encontrados
echo.

echo 2. Verificando imágenes...
if not exist "img\img1.jpg" (
    echo ⚠️  ADVERTENCIA: No se encuentra img\img1.jpg
)

if not exist "img\img2.jpg" (
    echo ⚠️  ADVERTENCIA: No se encuentra img\img2.jpg
)

echo ✅ Verificación de imágenes completada
echo.

echo 3. Opciones de despliegue:
echo.
echo [1] GitHub Pages (Recomendado)
echo [2] Netlify (Drag & Drop)
echo [3] Vercel (Integración GitHub)
echo [4] Probar localmente
echo [5] Salir
echo.

set /p choice="Selecciona una opción (1-5): "

if "%choice%"=="1" goto github
if "%choice%"=="2" goto netlify
if "%choice%"=="3" goto vercel
if "%choice%"=="4" goto local
if "%choice%"=="5" goto exit
goto invalid

:github
echo.
echo ========================================
echo    DESPLIEGUE EN GITHUB PAGES
echo ========================================
echo.
echo Pasos a seguir:
echo.
echo 1. Ve a https://github.com
echo 2. Crea un nuevo repositorio llamado "pagina-proyecto-final"
echo 3. Ejecuta estos comandos en tu terminal:
echo.
echo    git init
echo    git add .
echo    git commit -m "Initial commit"
echo    git branch -M main
echo    git remote add origin https://github.com/TU-USUARIO/pagina-proyecto-final.git
echo    git push -u origin main
echo.
echo 4. Ve a Settings > Pages en tu repositorio
echo 5. Selecciona "Deploy from a branch"
echo 6. Elige la rama "main" y carpeta "/ (root)"
echo.
echo Tu sitio estará en: https://TU-USUARIO.github.io/pagina-proyecto-final
echo.
pause
goto exit

:netlify
echo.
echo ========================================
echo    DESPLIEGUE EN NETLIFY
echo ========================================
echo.
echo Pasos a seguir:
echo.
echo 1. Ve a https://netlify.com
echo 2. Crea una cuenta gratuita
echo 3. Arrastra toda la carpeta del proyecto a Netlify
echo 4. Tu sitio se desplegará automáticamente
echo.
echo Tu sitio estará en: https://tu-sitio.netlify.app
echo.
pause
goto exit

:vercel
echo.
echo ========================================
echo    DESPLIEGUE EN VERCEL
echo ========================================
echo.
echo Pasos a seguir:
echo.
echo 1. Ve a https://vercel.com
echo 2. Crea cuenta con GitHub
echo 3. Haz clic en "New Project"
echo 4. Selecciona tu repositorio de GitHub
echo 5. Vercel detectará automáticamente la configuración
echo.
echo Tu sitio estará en: https://tu-sitio.vercel.app
echo.
pause
goto exit

:local
echo.
echo ========================================
echo    PRUEBA LOCAL
echo ========================================
echo.
echo Iniciando servidor local...
echo.
echo Si tienes Python instalado:
python -m http.server 8000
echo.
echo Si tienes Node.js instalado:
npx serve .
echo.
echo Abre tu navegador y ve a: http://localhost:8000
echo.
echo Presiona Ctrl+C para detener el servidor
echo.
pause
goto exit

:invalid
echo.
echo Opción inválida. Por favor selecciona 1-5.
echo.
pause
goto exit

:exit
echo.
echo ¡Gracias por usar el script de despliegue!
echo.
pause 