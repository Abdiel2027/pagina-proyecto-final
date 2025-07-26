#!/bin/bash

echo "========================================"
echo "   DESPLIEGUE RAPIDO - PAGINA WEB"
echo "========================================"
echo

echo "1. Verificando archivos..."
if [ ! -f "index.html" ]; then
    echo "ERROR: No se encuentra index.html"
    exit 1
fi

if [ ! -f "styles/main.css" ]; then
    echo "ERROR: No se encuentra styles/main.css"
    exit 1
fi

if [ ! -f "js/main.js" ]; then
    echo "ERROR: No se encuentra js/main.js"
    exit 1
fi

echo "✅ Archivos principales encontrados"
echo

echo "2. Verificando imágenes..."
if [ ! -f "img/img1.jpg" ]; then
    echo "⚠️  ADVERTENCIA: No se encuentra img/img1.jpg"
fi

if [ ! -f "img/img2.jpg" ]; then
    echo "⚠️  ADVERTENCIA: No se encuentra img/img2.jpg"
fi

echo "✅ Verificación de imágenes completada"
echo

echo "3. Opciones de despliegue:"
echo
echo "[1] GitHub Pages (Recomendado)"
echo "[2] Netlify (Drag & Drop)"
echo "[3] Vercel (Integración GitHub)"
echo "[4] Probar localmente"
echo "[5] Salir"
echo

read -p "Selecciona una opción (1-5): " choice

case $choice in
    1)
        echo
        echo "========================================"
        echo "    DESPLIEGUE EN GITHUB PAGES"
        echo "========================================"
        echo
        echo "Pasos a seguir:"
        echo
        echo "1. Ve a https://github.com"
        echo "2. Crea un nuevo repositorio llamado 'pagina-proyecto-final'"
        echo "3. Ejecuta estos comandos en tu terminal:"
        echo
        echo "   git init"
        echo "   git add ."
        echo "   git commit -m 'Initial commit'"
        echo "   git branch -M main"
        echo "   git remote add origin https://github.com/TU-USUARIO/pagina-proyecto-final.git"
        echo "   git push -u origin main"
        echo
        echo "4. Ve a Settings > Pages en tu repositorio"
        echo "5. Selecciona 'Deploy from a branch'"
        echo "6. Elige la rama 'main' y carpeta '/ (root)'"
        echo
        echo "Tu sitio estará en: https://TU-USUARIO.github.io/pagina-proyecto-final"
        echo
        ;;
    2)
        echo
        echo "========================================"
        echo "    DESPLIEGUE EN NETLIFY"
        echo "========================================"
        echo
        echo "Pasos a seguir:"
        echo
        echo "1. Ve a https://netlify.com"
        echo "2. Crea una cuenta gratuita"
        echo "3. Arrastra toda la carpeta del proyecto a Netlify"
        echo "4. Tu sitio se desplegará automáticamente"
        echo
        echo "Tu sitio estará en: https://tu-sitio.netlify.app"
        echo
        ;;
    3)
        echo
        echo "========================================"
        echo "    DESPLIEGUE EN VERCEL"
        echo "========================================"
        echo
        echo "Pasos a seguir:"
        echo
        echo "1. Ve a https://vercel.com"
        echo "2. Crea cuenta con GitHub"
        echo "3. Haz clic en 'New Project'"
        echo "4. Selecciona tu repositorio de GitHub"
        echo "5. Vercel detectará automáticamente la configuración"
        echo
        echo "Tu sitio estará en: https://tu-sitio.vercel.app"
        echo
        ;;
    4)
        echo
        echo "========================================"
        echo "    PRUEBA LOCAL"
        echo "========================================"
        echo
        echo "Iniciando servidor local..."
        echo
        
        if command -v python3 &> /dev/null; then
            echo "Iniciando servidor con Python 3..."
            python3 -m http.server 8000
        elif command -v python &> /dev/null; then
            echo "Iniciando servidor con Python..."
            python -m http.server 8000
        elif command -v node &> /dev/null; then
            echo "Iniciando servidor con Node.js..."
            npx serve .
        else
            echo "No se encontró Python ni Node.js instalado."
            echo "Instala uno de ellos para probar localmente."
        fi
        
        echo
        echo "Abre tu navegador y ve a: http://localhost:8000"
        echo "Presiona Ctrl+C para detener el servidor"
        echo
        ;;
    5)
        echo "Saliendo..."
        exit 0
        ;;
    *)
        echo "Opción inválida. Por favor selecciona 1-5."
        ;;
esac

echo
echo "¡Gracias por usar el script de despliegue!"
echo 