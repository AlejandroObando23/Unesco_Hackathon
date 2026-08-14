# 📋 Guía de Placeholders de Imágenes - TruthScroll Frontend

## 🎯 Resumen
Este documento lista todos los lugares donde se han dejado comentarios `// TODO:` indicando dónde insertar imágenes reales. Los botones actualmente usan emojis como placeholders temporales.

---

## 🖼️ Ubicaciones de Placeholders

### 1. **Login Art (Landing Page)**
**Archivo:** [frontend/src/pages/LandingPage.jsx](frontend/src/pages/LandingPage.jsx)
**Línea aprox:** ~70-130

**Descripción:** Arte conceptual de bienvenida en el lado derecho del login (columna derecha).

**Ubicación exacta del TODO:**
```jsx
<div className="landing-art-placeholder">
  {/* TODO: Replace with actual image asset 
      Location: frontend/src/assets/login-welcome-art.svg (or .png)
      Add: <img src={loginArt} alt="Bienvenida a TruthScroll" /> */}
  <svg ... />
</div>
```

**Instrucciones para reemplazar:**
1. Crea o descarga una imagen de bienvenida (SVG, PNG o similar)
2. Guarda en: `frontend/src/assets/login-welcome-art.svg` (o `.png`)
3. En el JSX, reemplaza el `<svg>...</svg>` con:
   ```jsx
   import loginArt from '../assets/login-welcome-art.svg'
   // ...
   <img src={loginArt} alt="Bienvenida a TruthScroll" className="landing-art-svg" />
   ```

---

### 2. **Menu Icon (Tres Puntos - PostCard)**
**Archivo:** [frontend/src/components/PostCard.jsx](frontend/src/components/PostCard.jsx)
**Línea aprox:** ~60-65

**Descripción:** Botón de menú (tres puntos) en la esquina superior derecha de cada post.

**Ubicación exacta del TODO:**
```jsx
{/* TODO: Replace with actual menu icon image when available
    Location: frontend/src/assets/icons/menu-dots.svg or .png
    Currently showing as three dots emoji */}
<button className="post-menu-btn" title="Más opciones">
  ⋯
</button>
```

**Instrucciones para reemplazar:**
1. Crea o descarga un ícono de menú (tres puntos)
2. Guarda en: `frontend/src/assets/icons/menu-dots.svg` (o `.png`)
3. En el JSX, reemplaza el emoji `⋯` con:
   ```jsx
   import menuIcon from '../assets/icons/menu-dots.svg'
   // ...
   <img src={menuIcon} alt="Menú" className="post-menu-icon" />
   ```

---

### 3. **Like Button Icons**
**Archivo:** [frontend/src/components/PostCard.jsx](frontend/src/components/PostCard.jsx)
**Línea aprox:** ~115-125

**Descripción:** Ícono de "Me gusta" (Like). Dos estados: corazón vacío 🤍 y corazón relleno ❤️

**Ubicación exacta del TODO:**
```jsx
{/* TODO: Replace with actual like icon images when available
    Location: frontend/src/assets/icons/like-empty.svg (for unlike state)
              frontend/src/assets/icons/like-filled.svg (for liked state)
    Current state: Using emoji ❤️ / 🤍 as placeholder */}
<span className="icon">{isLiked ? '❤️' : '🤍'}</span>
```

**Instrucciones para reemplazar:**
1. Descarga o crea dos versiones del ícono de like:
   - `frontend/src/assets/icons/like-empty.svg` (corazón vacío)
   - `frontend/src/assets/icons/like-filled.svg` (corazón relleno)
2. En el JSX, reemplaza:
   ```jsx
   import likeEmpty from '../assets/icons/like-empty.svg'
   import likeFilled from '../assets/icons/like-filled.svg'
   // ...
   <img 
     src={isLiked ? likeFilled : likeEmpty} 
     alt={isLiked ? "No me gusta" : "Me gusta"}
     className="icon"
   />
   ```

---

### 4. **Comment Button Icon**
**Archivo:** [frontend/src/components/PostCard.jsx](frontend/src/components/PostCard.jsx)
**Línea aprox:** ~135-145

**Descripción:** Ícono de comentario (burbuja de chat). Botón deshabilitado.

**Ubicación exacta del TODO:**
```jsx
{/* TODO: Replace with actual comment icon image when available
    Location: frontend/src/assets/icons/comment.svg or .png
    Current state: Using emoji 💬 as placeholder */}
<span className="icon">💬</span>
```

**Instrucciones para reemplazar:**
1. Descarga o crea ícono de comentario
2. Guarda en: `frontend/src/assets/icons/comment.svg` (o `.png`)
3. En el JSX, reemplaza:
   ```jsx
   import commentIcon from '../assets/icons/comment.svg'
   // ...
   <img src={commentIcon} alt="Comentar" className="icon" />
   ```

---

### 5. **Share Button Icon**
**Archivo:** [frontend/src/components/PostCard.jsx](frontend/src/components/PostCard.jsx)
**Línea aprox:** ~155-165

**Descripción:** Ícono de compartir. Botón deshabilitado.

**Ubicación exacta del TODO:**
```jsx
{/* TODO: Replace with actual share icon image when available
    Location: frontend/src/assets/icons/share.svg or .png
    Current state: Using emoji 📤 as placeholder */}
<span className="icon">📤</span>
```

**Instrucciones para reemplazar:**
1. Descarga o crea ícono de compartir
2. Guarda en: `frontend/src/assets/icons/share.svg` (o `.png`)
3. En el JSX, reemplaza:
   ```jsx
   import shareIcon from '../assets/icons/share.svg'
   // ...
   <img src={shareIcon} alt="Compartir" className="icon" />
   ```

---

### 6. **Send/Report Button Icon**
**Archivo:** [frontend/src/components/PostCard.jsx](frontend/src/components/PostCard.jsx)
**Línea aprox:** ~175-195

**Descripción:** Ícono de envío/reporte (correspondencia). Botón activo.

**Ubicación exacta del TODO:**
```jsx
{/* TODO: Replace with actual send icon image when available
    Location: frontend/src/assets/icons/send.svg or .png
    Current state: Using emoji 📬 as placeholder */}
<span className="icon">📬</span>
```

**Instrucciones para reemplazar:**
1. Descarga o crea ícono de envío
2. Guarda en: `frontend/src/assets/icons/send.svg` (o `.png`)
3. En el JSX, reemplaza:
   ```jsx
   import sendIcon from '../assets/icons/send.svg'
   // ...
   <img src={sendIcon} alt="Reportar publicación" className="icon" />
   ```

---

### 7. **Save/Bookmark Button Icon**
**Archivo:** [frontend/src/components/PostCard.jsx](frontend/src/components/PostCard.jsx)
**Línea aprox:** ~205-215

**Descripción:** Ícono de guardar/marcador. Botón deshabilitado.

**Ubicación exacta del TODO:**
```jsx
{/* TODO: Replace with actual bookmark icon image when available
    Location: frontend/src/assets/icons/bookmark.svg or .png
    Current state: Using emoji 🔖 as placeholder */}
<span className="icon">🔖</span>
```

**Instrucciones para reemplazar:**
1. Descarga o crea ícono de marcador
2. Guarda en: `frontend/src/assets/icons/bookmark.svg` (o `.png`)
3. En el JSX, reemplaza:
   ```jsx
   import bookmarkIcon from '../assets/icons/bookmark.svg'
   // ...
   <img src={bookmarkIcon} alt="Guardar" className="icon" />
   ```

---

## 📁 Estructura de directorios recomendada

```
frontend/
└── src/
    └── assets/
        ├── login-welcome-art.svg          (Arte de login)
        └── icons/
            ├── menu-dots.svg              (Menú)
            ├── like-empty.svg             (Corazón vacío)
            ├── like-filled.svg            (Corazón relleno)
            ├── comment.svg                (Comentario)
            ├── share.svg                  (Compartir)
            ├── send.svg                   (Envío/Reporte)
            └── bookmark.svg               (Guardar)
```

---

## 🎨 Especificaciones técnicas

### Dimensiones recomendadas:
- **Login art:** 300-350px ancho, mantener aspecto
- **Icons (botones):** 24px × 24px (SVG vectorial es ideal)

### Formatos aceptados:
- **SVG** (recomendado - escalable, ligero)
- **PNG** (con fondo transparente)
- **WebP** (moderno y eficiente)

### Accesibilidad:
- Todos los `<img>` tienen atributo `alt` descriptivo
- Los emojis se reemplazarán por iconos profesionales
- Mantener contraste adecuado (WCAG AA)

---

## ✅ Checklist de implementación

Cuando tengas las imágenes listas, sigue este orden:

- [ ] Crear directorio `frontend/src/assets/icons/`
- [ ] Descargar/crear todos los SVG necesarios
- [ ] Guardar en las ubicaciones especificadas arriba
- [ ] Actualizar imports en `PostCard.jsx`
- [ ] Reemplazar emojis con `<img>` tags
- [ ] Probar responsive en móvil (480px)
- [ ] Validar contraste y accesibilidad
- [ ] Eliminar comentarios `// TODO:` una vez completado

---

## 📚 Referencias

- [SVG en React best practices](https://css-tricks.com/using-svgs-in-react/)
- [Iconos open-source: Heroicons, Feather Icons, Material Icons](https://heroicons.com/)
- [Directrices WCAG de accesibilidad](https://www.w3.org/WAI/WCAG21/quickref/)

---

**Última actualización:** 2026-08-12
**Estado:** ✅ Comentarios insertados, listos para imágenes
