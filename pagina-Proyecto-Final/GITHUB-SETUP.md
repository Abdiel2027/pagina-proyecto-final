# 🚀 Guía Visual: Configurar GitHub Pages con deploy.yml

## 📋 Pasos Detallados

### **Paso 1: Crear Repositorio en GitHub**

1. **Ve a GitHub:**
   - Abre [github.com](https://github.com)
   - Inicia sesión con tu cuenta

2. **Crear nuevo repositorio:**
   - Haz clic en el botón verde "New" o "+" → "New repository"
   - **Repository name:** `pagina-proyecto-final`
   - **Description:** `Página web interactiva con tema oscuro y animaciones 3D`
   - **Visibility:** ✅ Public
   - **❌ NO marques** "Add a README file"
   - **❌ NO marques** "Add .gitignore"
   - **❌ NO marques** "Choose a license"

3. **Crear repositorio:**
   - Haz clic en "Create repository"

### **Paso 2: Subir Código (Opción A - Con Git)**

Si tienes Git instalado:

```bash
# En tu carpeta del proyecto
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/Abdiel2027/pagina-proyecto-final.git
git push -u origin main
```

### **Paso 2: Subir Código (Opción B - Sin Git)**

1. **En tu repositorio de GitHub:**
   - Haz clic en "uploading an existing file"
   - O "Add file" → "Upload files"

2. **Subir archivos:**
   - Arrastra toda la carpeta del proyecto
   - O selecciona todos los archivos individualmente

3. **Commit:**
   - **Commit message:** `Initial commit`
   - Haz clic en "Commit changes"

### **Paso 3: Activar GitHub Pages**

1. **Ir a Settings:**
   - En tu repositorio, haz clic en "Settings" (pestaña)

2. **Configurar Pages:**
   - En el menú lateral, haz clic en "Pages"
   - **Source:** Selecciona "Deploy from a branch"
   - **Branch:** Selecciona `main`
   - **Folder:** Selecciona `/ (root)`
   - Haz clic en "Save"

3. **Esperar despliegue:**
   - Verás un mensaje: "Your site is published at..."
   - La URL será: `https://abdiel2027.github.io/pagina-proyecto-final`

### **Paso 4: Verificar deploy.yml**

El archivo `.github/workflows/deploy.yml` ya está configurado y hará:

- ✅ **Despliegue automático** en cada push
- ✅ **Usar GitHub Actions** para el proceso
- ✅ **Publicar en rama gh-pages**
- ✅ **HTTPS automático**

## 🔄 Cómo Funciona el deploy.yml

### **Trigger (Activación):**
```yaml
on:
  push:
    branches: [ main ]  # Se activa en cada push a main
```

### **Proceso Automático:**
1. **Checkout:** Descarga tu código
2. **Setup Node.js:** Prepara el entorno
3. **Install dependencies:** Instala dependencias (si las hay)
4. **Build:** Construye el proyecto (si es necesario)
5. **Deploy:** Publica en GitHub Pages

### **Resultado:**
- Tu sitio se actualiza automáticamente
- No necesitas hacer nada más
- Solo haz push y se despliega solo

## 📱 Verificación

### **1. Verificar GitHub Actions:**
- Ve a tu repositorio
- Pestaña "Actions"
- Verás el workflow ejecutándose

### **2. Verificar Pages:**
- Settings → Pages
- Debería mostrar "Your site is published at..."

### **3. Probar el sitio:**
- Visita tu URL
- Abre `check-site.html` para verificar todo

## 🛠️ Solución de Problemas

### **❌ Error: "Page build failed"**
**Solución:**
- Verifica que todos los archivos estén subidos
- Revisa la pestaña "Actions" para errores
- Asegúrate de que el repositorio sea público

### **❌ Error: "404 Not Found"**
**Solución:**
- Espera 5-10 minutos para el primer despliegue
- Verifica que GitHub Pages esté activado
- Revisa que la rama sea `main`

### **❌ Error: "Workflow failed"**
**Solución:**
- Ve a Actions → Ver el workflow fallido
- Revisa los logs para el error específico
- Asegúrate de que `index.html` esté en la raíz

## 🔄 Actualizaciones Futuras

### **Para hacer cambios:**
1. Edita los archivos localmente
2. Haz commit y push:
   ```bash
   git add .
   git commit -m "Actualización de contenido"
   git push
   ```
3. El sitio se actualiza automáticamente

### **Sin Git (subida manual):**
1. Edita los archivos
2. Sube los archivos modificados a GitHub
3. El sitio se actualiza automáticamente

## 📊 Monitoreo

### **GitHub Actions:**
- Ve a Actions para ver el historial de despliegues
- Cada push genera un nuevo despliegue
- Puedes ver logs detallados

### **GitHub Pages:**
- Settings → Pages muestra el estado
- Puedes ver el historial de despliegues
- Opción de dominio personalizado

## 🎯 Ventajas del deploy.yml

- ✅ **Automático:** No necesitas hacer nada manual
- ✅ **Confiable:** GitHub maneja todo el proceso
- ✅ **Rápido:** Despliegue en 2-5 minutos
- ✅ **Gratis:** Sin costos adicionales
- ✅ **HTTPS:** Certificado SSL automático
- ✅ **CDN:** Distribución global rápida

---

**¡Con esto tu página web se desplegará automáticamente cada vez que hagas cambios!** 🚀 