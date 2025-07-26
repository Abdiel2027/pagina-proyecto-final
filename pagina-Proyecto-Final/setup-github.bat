@echo off
echo ========================================
echo    CONFIGURACION GITHUB PAGES
echo ========================================
echo.

echo 1. Verificando Git...
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Git no está instalado
    echo.
    echo Por favor instala Git desde: https://git-scm.com
    echo Después ejecuta este script nuevamente.
    echo.
    pause
    exit /b 1
)

echo ✅ Git está instalado
echo.

echo 2. Verificando archivos del proyecto...
if not exist "index.html" (
    echo ❌ No se encuentra index.html
    pause
    exit /b 1
)

if not exist ".github\workflows\deploy.yml" (
    echo ❌ No se encuentra deploy.yml
    pause
    exit /b 1
)

echo ✅ Archivos del proyecto encontrados
echo.

echo 3. Inicializando repositorio Git...
git init
git add .
git commit -m "Initial commit"
git branch -M main

echo ✅ Repositorio Git inicializado
echo.

echo 4. Configurando repositorio remoto...
echo.
echo IMPORTANTE: Primero debes crear el repositorio en GitHub:
echo.
echo 1. Ve a https://github.com
echo 2. Haz clic en "New repository"
echo 3. Nombre: pagina-proyecto-final
echo 4. Marca como "Public"
echo 5. NO inicialices con README
echo 6. Crea el repositorio
echo.
echo Después de crear el repositorio, presiona cualquier tecla...
pause

git remote add origin https://github.com/Abdiel2027/pagina-proyecto-final.git
git push -u origin main

echo.
echo ✅ Código subido a GitHub
echo.

echo 5. Activando GitHub Pages...
echo.
echo Ahora debes activar GitHub Pages manualmente:
echo.
echo 1. Ve a tu repositorio en GitHub
echo 2. Settings → Pages
echo 3. Source: "Deploy from a branch"
echo 4. Branch: main
echo 5. Folder: / (root)
echo 6. Save
echo.
echo Tu sitio estará en: https://abdiel2027.github.io/pagina-proyecto-final
echo.

echo 6. Verificando despliegue automático...
echo.
echo El archivo deploy.yml está configurado para:
echo - Desplegar automáticamente en cada push
echo - Usar GitHub Actions
echo - Publicar en la rama gh-pages
echo.

echo ✅ Configuración completada
echo.
echo Próximos pasos:
echo 1. Activa GitHub Pages en Settings
echo 2. Espera 2-5 minutos para el primer despliegue
echo 3. Visita tu sitio web
echo 4. Para futuros cambios, solo haz push a GitHub
echo.
pause 