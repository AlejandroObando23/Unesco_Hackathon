# 🖼️ Guía Práctica: De Emojis a Imágenes Reales

## Paso a Paso - Ejemplo PostCard Like Button

### ANTES (Actual - Con Emoji)
```jsx
// frontend/src/components/PostCard.jsx - Línea ~115-125

<button className="social-action-btn like-btn" onClick={handleLikeClick}>
  {/* TODO: Replace with actual like icon images when available
      Location: frontend/src/assets/icons/like-empty.svg (for unlike state)
                frontend/src/assets/icons/like-filled.svg (for liked state)
      Current state: Using emoji ❤️ / 🤍 as placeholder */}
  <span className="icon">{isLiked ? '❤️' : '🤍'}</span>
</button>
```

### DESPUÉS (Con Imágenes Reales)

#### 1️⃣ Agregar imports al inicio del archivo:
```jsx
// frontend/src/components/PostCard.jsx - Top of file
import likeEmpty from '../assets/icons/like-empty.svg'
import likeFilled from '../assets/icons/like-filled.svg'
```

#### 2️⃣ Reemplazar el span con img tag:
```jsx
<button className="social-action-btn like-btn" onClick={handleLikeClick}>
  <img 
    src={isLiked ? likeFilled : likeEmpty}
    alt={isLiked ? "No me gusta" : "Me gusta"}
    className="icon"
  />
</button>
```

#### 3️⃣ Eliminar comentario TODO (opcional, pero limpia el código):
```jsx
// ❌ BORRAR TODO este comentario:
{/* TODO: Replace with actual like icon images when available... */}
```

---

## Estructura de Archivos - Cómo Crear

### Directorio necesario:
```
frontend/
└── src/
    └── assets/
        └── icons/          ← Crear esta carpeta
            ├── like-empty.svg
            ├── like-filled.svg
            ├── comment.svg
            ├── share.svg
            ├── send.svg
            ├── bookmark.svg
            └── menu-dots.svg
```

### Crear carpeta en terminal:
```bash
cd frontend/src
mkdir -p assets/icons
```

---

## 🎨 Obtener Icons

### Opción 1: Heroicons (Recomendado - Open Source)
**URL:** https://heroicons.com/
- Descarga SVG directamente
- Tamaños disponibles: 16px, 24px, 32px
- Colores ajustables

**Cuáles descargar:**
```
like/heart (24px) → like-empty.svg, like-filled.svg
chat-bubble (24px) → comment.svg
arrow-up-tray (24px) → share.svg
paper-airplane (24px) → send.svg
bookmark (24px) → bookmark.svg
ellipsis-horizontal-circle (24px) → menu-dots.svg
```

### Opción 2: Feather Icons
**URL:** https://feathericons.com/
- Minimalistas y limpios
- Excelente contraste
- Fácil de personalizar

### Opción 3: Material Icons
**URL:** https://fonts.google.com/icons
- Amplia biblioteca
- Múltiples estilos (outlined, filled, sharp)
- Descargar como SVG

### Opción 4: Crear customizadas
- Figma, Adobe XD, Illustrator
- Asegura consistencia con branding
- Total control de colores

---

## 🎯 All TODOs - Checklist Rápido

### 📋 Lugares donde hacer cambios:

#### 1. **LandingPage.jsx** - Login Welcome Art
```jsx
// Línea ~70-130
// ANTES: <svg> ... </svg>
// DESPUÉS:
import loginArt from '../assets/login-welcome-art.svg'
// ... dentro del JSX:
<img src={loginArt} alt="Bienvenida a TruthScroll" className="landing-art-svg" />
```

#### 2. **PostCard.jsx** - Menu Icon
```jsx
// Línea ~60-65
import menuIcon from '../assets/icons/menu-dots.svg'
// ANTES: <button>⋯</button>
// DESPUÉS:
<button>
  <img src={menuIcon} alt="Menú" />
</button>
```

#### 3. **PostCard.jsx** - Like Button
```jsx
// Línea ~120
import likeEmpty from '../assets/icons/like-empty.svg'
import likeFilled from '../assets/icons/like-filled.svg'
// ANTES: <span className="icon">{isLiked ? '❤️' : '🤍'}</span>
// DESPUÉS:
<img src={isLiked ? likeFilled : likeEmpty} alt="Like" />
```

#### 4. **PostCard.jsx** - Comment Button
```jsx
// Línea ~140
import commentIcon from '../assets/icons/comment.svg'
// ANTES: <span className="icon">💬</span>
// DESPUÉS:
<img src={commentIcon} alt="Comentar" />
```

#### 5. **PostCard.jsx** - Share Button
```jsx
// Línea ~160
import shareIcon from '../assets/icons/share.svg'
// ANTES: <span className="icon">📤</span>
// DESPUÉS:
<img src={shareIcon} alt="Compartir" />
```

#### 6. **PostCard.jsx** - Send Button
```jsx
// Línea ~180
import sendIcon from '../assets/icons/send.svg'
// ANTES: <span className="icon">📬</span>
// DESPUÉS:
<img src={sendIcon} alt="Reportar" />
```

#### 7. **PostCard.jsx** - Save Button
```jsx
// Línea ~210
import bookmarkIcon from '../assets/icons/bookmark.svg'
// ANTES: <span className="icon">🔖</span>
// DESPUÉS:
<img src={bookmarkIcon} alt="Guardar" />
```

---

## 🔄 Workflow Recomendado

### Fase 1: Preparación
```bash
# 1. Crear carpetas
cd frontend/src
mkdir -p assets/icons

# 2. Descargar o crear iconos
# (Usar Heroicons, Figma, etc.)

# 3. Guardar archivos con nombres exactos:
assets/
├── login-welcome-art.svg
└── icons/
    ├── like-empty.svg
    ├── like-filled.svg
    ├── comment.svg
    ├── share.svg
    ├── send.svg
    ├── bookmark.svg
    └── menu-dots.svg
```

### Fase 2: Actualización de código
```bash
# Opción A: Editar archivos en VS Code
# Abrir frontend/src/components/PostCard.jsx
# Buscar "// TODO: Replace with actual"
# Reemplazar siguiendo el patrón de ejemplo

# Opción B: Usar buscar y reemplazar
# Ctrl+H → Buscar "❤️" → Reemplazar por <img src={...} />
```

### Fase 3: Testing
```bash
# En VS Code terminal:
cd frontend
npm run dev

# Verifica:
# ✓ Login muestra imagen de bienvenida
# ✓ PostCard muestra icons en lugar de emojis
# ✓ Like button anima correctamente
# ✓ Disabled buttons no clickeables
```

### Fase 4: Limpieza
```bash
# Eliminar comentarios TODO innecesarios
# Verificar no hay referencias rotas a assets
# Validar con npm run lint
```

---

## 🛠️ Herramientas VS Code Útiles

### Extensión recomendada:
```
"ES7+ React/Redux/React-Native snippets"
- Facilita crear imports rápidamente
```

### Comando buscar/reemplazar (Ctrl+H):
```
Find: {isLiked \? '❤️' : '🤍'}
Replace: {isLiked ? likeFilled : likeEmpty}

(Activa "Use Regular Expression" para regex)
```

---

## 📐 Dimensiones SVG Óptimas

### Para que los SVG se vean bien:

```svg
<!-- Iconos de botones (24px) -->
<svg viewBox="0 0 24 24" width="24" height="24">
  <!-- Contenido aquí -->
</svg>

<!-- Arte de login (más grande) -->
<svg viewBox="0 0 300 400" width="300" height="400">
  <!-- Contenido aquí -->
</svg>
```

### En CSS, si necesitas ajustar tamaño:
```css
.icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.landing-art-svg {
  max-width: 350px;
  height: auto;
}
```

---

## 🎨 Colores recomendados (para ref)

Si editas los SVG:
```
Like (Corazón):        #e94560 (rojo)
Comment (Burbuja):     #667eea (azul)
Share (Envío):         #4ecdc4 (cyan)
Send/Report (Envío):   #fbbf24 (amarillo)
Save (Marcador):       #a78bfa (púrpura)
Menu (Puntos):         #94a3b8 (gris)
```

---

## ✅ Validación Final

Antes de hacer commit:

```bash
# 1. Sin errores de linting
npm run lint

# 2. Se ven bien en el navegador
npm run dev  # y revisar en http://localhost:5173

# 3. Responsive OK
# Abrir DevTools → F12 → Toggle Device Toolbar
# Probar: Desktop (1920px), Tablet (768px), Mobile (375px)

# 4. Sin console errors
# DevTools → Console → Debe estar limpia (sin rojos)

# 5. Archivos no rotos
# Verificar que no haya imports con rutas incorrectas
```

---

## 💡 Tips Prácticos

### Tip 1: SVG Inline vs Import
```jsx
// ✅ RECOMENDADO (para iconos)
import myIcon from '../assets/icon.svg'
<img src={myIcon} />

// También válido:
import { ReactComponent as MyIcon } from '../assets/icon.svg'
<MyIcon className="my-class" />

// ❌ NO RECOMENDADO (para este caso)
<svg> ... </svg>  // Directamente inline (más grande)
```

### Tip 2: Optimizar SVG
- Usar [SVGO](https://jakearchibald.github.io/svgo-app/) para reducir tamaño
- Eliminar comentarios innecesarios
- Simplificar paths complejos

### Tip 3: Fallback en caso de error
```jsx
<img 
  src={isLiked ? likeFilled : likeEmpty}
  alt="Like"
  onError={(e) => e.target.textContent = '❤️'}  // Emoji de respaldo
/>
```

---

## 🚨 Errores Comunes

### ❌ Error 1: Ruta incorrecta
```jsx
// MALO:
import icon from './assets/icons/like.svg'  // Ruta relativa incorrecta

// BUENO:
import icon from '../assets/icons/like.svg'  // Desde PostCard.jsx
```

### ❌ Error 2: No crear carpeta
```bash
# Si olvidas crear assets/icons/:
# Resultado: "Module not found" error

# Solución: 
mkdir -p frontend/src/assets/icons
```

### ❌ Error 3: Nombres inconsistentes
```jsx
// MALO:
import { likeEmpty } from '../assets/icons'  // No es export default
<img src={likeEmpty} />

// BUENO:
import likeEmpty from '../assets/icons/like-empty.svg'
<img src={likeEmpty} />
```

---

## 📞 Referencia Rápida

| Elemento | Emoji | Archivo | Ruta |
|----------|-------|---------|------|
| Menú | ⋯ | menu-dots.svg | `assets/icons/` |
| Like Vacío | 🤍 | like-empty.svg | `assets/icons/` |
| Like Lleno | ❤️ | like-filled.svg | `assets/icons/` |
| Comentario | 💬 | comment.svg | `assets/icons/` |
| Compartir | 📤 | share.svg | `assets/icons/` |
| Envío | 📬 | send.svg | `assets/icons/` |
| Guardar | 🔖 | bookmark.svg | `assets/icons/` |
| Login Art | 🎨 | login-welcome-art.svg | `assets/` |

---

**¡Listo! Sigue estos pasos y tendrás tu rediseño con imágenes reales en minutos.**

