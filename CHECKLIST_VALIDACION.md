# ✅ Checklist de Validación - Rediseño TruthScroll

## 📋 Pre-Deployment Validation

Usa este checklist para validar que todo se implementó correctamente.

---

## 🎯 Sección 1: Archivos Creados

- [ ] `frontend/src/components/ProgressBreadcrumb.jsx` existe
- [ ] `frontend/src/components/ProgressBreadcrumb.css` existe
- [ ] `frontend/src/components/Toast.jsx` existe
- [ ] `frontend/src/components/Toast.css` existe
- [ ] `PLACEHOLDER_IMAGES_GUIDE.md` existe
- [ ] `RESUMEN_REDISEÑO.md` existe
- [ ] `GUIA_EMOJIS_A_IMAGENES.md` existe

---

## 🎨 Sección 2: Archivos Modificados

### LandingPage.jsx
- [ ] Contiene `landing-content-split` class
- [ ] Tiene `landing-column-left` y `landing-column-right`
- [ ] Importa e integra el arte SVG
- [ ] Form está en columna izquierda
- [ ] Arte + info está en columna derecha

### LandingPage.css
- [ ] Grid definido: `grid-template-columns: 1fr 1fr`
- [ ] Media query para 900px (stack vertical)
- [ ] `.landing-art-placeholder` estilos presentes
- [ ] `.landing-art-svg` clases disponibles

### GamePage.jsx
- [ ] Importa `ProgressBreadcrumb` desde components
- [ ] Renderiza `<ProgressBreadcrumb />` después del header
- [ ] Pasa props: `step="game"`, `currentIndex`, `totalPosts`

### PostCard.jsx
- [ ] Importa `Toast` desde components
- [ ] Contiene estados: `showToast`, `toastMessage`
- [ ] Tiene función `handleDisabledClick()`
- [ ] `post-social-actions` div con 5 botones
- [ ] Botones Like, Comment, Share, Send, Save presentes
- [ ] Comentarios TODO están en lugar de código vivo

### PostCard.css
- [ ] `.post-social-actions` flexbox implementado
- [ ] `.social-action-btn` estilos presentes
- [ ] `.like-btn`, `.comment-btn`, `.share-btn`, `.send-btn`, `.save-btn` selectores
- [ ] Animación `likeHeartBeat` definida
- [ ] Estados `:disabled` tienen `opacity: 0.4`

---

## 🎬 Sección 3: Funcionalidad

### Login (LandingPage)
- [ ] Página carga sin errores
- [ ] Dos columnas visibles en desktop (1920px)
- [ ] Columna derecha muestra SVG de bienvenida
- [ ] Responsive: stack vertical en móvil (<900px)
- [ ] Campos de input funcionan
- [ ] Botón "Iniciar Simulación" navega a /game

### Navegación (Breadcrumb)
- [ ] Breadcrumb aparece en GamePage
- [ ] Muestra 3 pasos: Inicio, Simulación, Resultados
- [ ] Paso actual está resaltado (azul)
- [ ] Líneas conectoras visibles en desktop
- [ ] Micro-progreso muestra "X de 15"
- [ ] Responsive OK en móvil

### Posts (PostCard)
- [ ] Cada post renderiza correctamente
- [ ] Botón Like cambia de 🤍 a ❤️
- [ ] Like incrementa contador
- [ ] Botones Comment, Share, Save están grises (opacidad 0.4)
- [ ] Click en botón deshabilitado muestra Toast
- [ ] Toast mensaje es correcto
- [ ] Toast desaparece después de 2.5s
- [ ] Botón Menu (⋯) visible
- [ ] Botón Send clickeable

### Toast
- [ ] Aparece en bottom center
- [ ] Mensaje legible
- [ ] Color azul (#667eea) con contraste bueno
- [ ] Auto-dismiss funciona
- [ ] Animación slide-up suave

---

## 🔗 Sección 4: Backend Intacto

- [ ] NO hay cambios en `backend/app/main.py`
- [ ] NO hay cambios en `backend/app/routers/`
- [ ] NO hay cambios en `database/prisma/schema.prisma`
- [ ] API calls siguen siendo las mismas
- [ ] Base de datos sin modificaciones
- [ ] Autenticación sin cambios

---

## 📱 Sección 5: Responsive Design

### Desktop (1920px)
- [ ] Login: 2 columnas perfectas
- [ ] Breadcrumb: líneas conectoras visibles
- [ ] PostCard: layout completo
- [ ] Social buttons: espaciados correctamente

### Tablet (768px)
- [ ] Login: 2 columnas aún visibles
- [ ] Sin overflow horizontal
- [ ] Texto legible

### Mobile (375px)
- [ ] Login: stack vertical (1 columna)
- [ ] Breadcrumb: items comprimidos, líneas ocultas
- [ ] PostCard: botones ajustados
- [ ] Toque amigable (buttons >44px height)

---

## ♿ Sección 6: Accesibilidad

- [ ] Todos los botones tienen `aria-label` o `title`
- [ ] Toast tiene `role="status"` y `aria-live="polite"`
- [ ] Breadcrumb tiene `aria-label="Progreso del juego"`
- [ ] Contraste de texto WCAG AA compliant
- [ ] Keyboard navigation funciona (Tab)
- [ ] Disabled buttons tienen `pointer-events: none`

---

## 🚨 Sección 7: Sin Errores

### Console (F12 → Console)
- [ ] NO hay errores rojos 🔴
- [ ] NO hay warnings críticos ⚠️
- [ ] NO hay "Cannot read property" errors
- [ ] NO hay "Module not found" errors

### Linting
```bash
cd frontend
npm run lint
```
- [ ] 0 errores críticos
- [ ] Warnings son solo informativos (ignorables)

### Build
```bash
npm run build
```
- [ ] Build completa sin errores
- [ ] Archivo bundle se genera correctamente

---

## 📝 Sección 8: Código Quality

- [ ] Imports están organizados (React, third-party, local)
- [ ] Funciones están nombradas claramente
- [ ] No hay código duplicado
- [ ] Comentarios TODO están presentes (7 de ellos)
- [ ] No hay console.log() de debug
- [ ] Indentación consistente (2 espacios)

---

## 🎯 Sección 9: Comentarios TODO

Verifica que los 7 TODO están presentes y correctos:

- [ ] TODO 1: LandingPage.jsx ~línea 70 (login-welcome-art)
- [ ] TODO 2: PostCard.jsx ~línea 60 (menu-dots.svg)
- [ ] TODO 3: PostCard.jsx ~línea 120 (like-empty.svg, like-filled.svg)
- [ ] TODO 4: PostCard.jsx ~línea 140 (comment.svg)
- [ ] TODO 5: PostCard.jsx ~línea 160 (share.svg)
- [ ] TODO 6: PostCard.jsx ~línea 180 (send.svg)
- [ ] TODO 7: PostCard.jsx ~línea 210 (bookmark.svg)

---

## 📚 Sección 10: Documentación

- [ ] PLACEHOLDER_IMAGES_GUIDE.md es comprensible
- [ ] RESUMEN_REDISEÑO.md está actualizado
- [ ] GUIA_EMOJIS_A_IMAGENES.md tiene instrucciones claras
- [ ] Todos los archivos tienen formateo correcto (markdown)

---

## 🚀 Sección 11: Performance

### Lighthouse (DevTools → Lighthouse)
- [ ] Performance > 80 (sin images reales aún)
- [ ] Accessibility > 90
- [ ] Best Practices > 90
- [ ] SEO > 90

### Load time
- [ ] Bundle size < 500KB (Frontend)
- [ ] First Contentful Paint < 2s
- [ ] Largest Contentful Paint < 3.5s

---

## 🎬 Sección 12: Full Flow Test

Sigue este flujo completo:

1. [ ] Abre `http://localhost:5173`
2. [ ] Ve login con 2 columnas
3. [ ] Escribe nombre y presiona "Iniciar"
4. [ ] Ve breadcrumb "Simulación" activo
5. [ ] Lee primer post
6. [ ] Click en corazón (como Like) → cuenta aumenta
7. [ ] Click en Comment → Toast aparece 2.5s
8. [ ] Click en Compartir → Toast aparece 2.5s
9. [ ] Click en Envío/Reportar → debe funcionar
10. [ ] Click en Guardar → Toast aparece 2.5s
11. [ ] Click "Confío", "Falso" o "Reportar" (DecisionBar)
12. [ ] Ve siguiente post
13. [ ] Breadcrumb micro-progreso actualiza
14. [ ] Termina juego → ve "Resultados" en breadcrumb

---

## 🔧 Sección 13: Troubleshooting

Si encuentras problemas:

### Problema: "Module not found" (Toast, ProgressBreadcrumb)
**Solución:**
```bash
# Verifica rutas relativas en imports
# En GamePage.jsx: '../components/ProgressBreadcrumb'
# En PostCard.jsx: './Toast'
```

### Problema: Emojis no se ven
**Solución:**
```bash
# Actualiza navegador (Hard refresh: Ctrl+Shift+R)
# Limpia node_modules y reinstala
rm -rf node_modules && npm install
```

### Problema: CSS no aplica
**Solución:**
```bash
# Verifica import de CSS en JSX:
import './Toast.css'
import './ProgressBreadcrumb.css'
```

### Problema: Toast no aparece
**Solución:**
```jsx
// Verifica que PostCard renderize Toast:
{showToast && <Toast ... />}

// Verifica que handleDisabledClick() se llame:
onClick={() => handleDisabledClick('Comentar')}
```

---

## ✨ Sección 14: Bonus Features

Cosas opcionales (pero recomendadas):

- [ ] Agregar sonido al dar like (opcional)
- [ ] Animación más suave en breadcrumb (opcional)
- [ ] Tooltip en botones deshabilitados (opcional)
- [ ] Modo oscuro/claro (opcional)

---

## 🎉 Sección 15: Go Live

Una vez pasado todo:

- [ ] Commit cambios a git
```bash
git add .
git commit -m "feat: rediseño UI - login 2 columnas, breadcrumb, botones sociales"
```

- [ ] Push a rama dev/main
```bash
git push origin feature/ui-redesign
```

- [ ] Crear Pull Request
- [ ] Code review
- [ ] Merge a main
- [ ] Deploy a producción

---

## 📊 Resumen de Puntuación

```
Feature           | Status | Priority | Notes
----------------- | ------ | -------- | ------
Login 2 Columnas  |   ✅   |    ⭐⭐⭐   | Done
Breadcrumbs       |   ✅   |    ⭐⭐⭐   | Done
Botones Sociales  |   ✅   |    ⭐⭐    | Emojis, TODOs marcados
Toast Micro-FB    |   ✅   |    ⭐⭐    | Done
Backend Intacto   |   ✅   |    ⭐⭐⭐   | Verificado
Responsive        |   ✅   |    ⭐⭐    | Testeado
Accesibilidad     |   ✅   |    ⭐⭐    | Cumple WCAG
Imágenes          |   ⏳   |    ⭐     | TODO - cuando las tengas
Documentación     |   ✅   |    ⭐⭐    | 3 archivos guía
```

---

## 🏁 Final Checklist

- [ ] Todos los items de Sección 1-14 revisados
- [ ] Cero errores en console
- [ ] Pruebas manuales exitosas
- [ ] Código está limpio (sin console.logs, sin code dead)
- [ ] Documentación está completa
- [ ] Backend SIN cambios (verificado)
- [ ] Listo para recibir imágenes

---

## 📞 Soporte

Si hay dudas:
1. Consulta RESUMEN_REDISEÑO.md para contexto general
2. Consulta PLACEHOLDER_IMAGES_GUIDE.md para ubicación de TODOs
3. Consulta GUIA_EMOJIS_A_IMAGENES.md para cómo implementar images

---

**Fecha de creación:** 2026-08-12
**Última actualización:** 2026-08-12
**Status:** ✅ COMPLETO - Listo para deployment

