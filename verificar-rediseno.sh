#!/bin/bash
# ✅ VERIFICACIÓN FINAL - Rediseño TruthScroll
# Este script verifica que todo se implementó correctamente

echo "🔍 VERIFICANDO REDISEÑO TRUTHSCROLL..."
echo "=================================================="

# Colores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Contadores
PASS=0
FAIL=0

# Función de verificación
check() {
  if [ -f "$1" ]; then
    echo -e "${GREEN}✅${NC} $2"
    ((PASS++))
  else
    echo -e "${RED}❌${NC} $2"
    ((FAIL++))
  fi
}

echo ""
echo "📁 Verificando archivos creados..."
check "./frontend/src/components/ProgressBreadcrumb.jsx" "ProgressBreadcrumb.jsx"
check "./frontend/src/components/ProgressBreadcrumb.css" "ProgressBreadcrumb.css"
check "./frontend/src/components/Toast.jsx" "Toast.jsx"
check "./frontend/src/components/Toast.css" "Toast.css"

echo ""
echo "📚 Verificando documentación..."
check "./RESUMEN_REDISEÑO.md" "RESUMEN_REDISEÑO.md"
check "./PLACEHOLDER_IMAGES_GUIDE.md" "PLACEHOLDER_IMAGES_GUIDE.md"
check "./GUIA_EMOJIS_A_IMAGENES.md" "GUIA_EMOJIS_A_IMAGENES.md"
check "./CHECKLIST_VALIDACION.md" "CHECKLIST_VALIDACION.md"
check "./README_REDISEÑO.md" "README_REDISEÑO.md"
check "./RESUMEN_VISUAL.md" "RESUMEN_VISUAL.md"
check "./INICIO_AQUI.md" "INICIO_AQUI.md"

echo ""
echo "🔧 Verificando modificaciones en código..."
echo -n "Buscando 'landing-content-split' en LandingPage..."
if grep -q "landing-content-split" ./frontend/src/pages/LandingPage.jsx; then
  echo -e " ${GREEN}✅${NC}"
  ((PASS++))
else
  echo -e " ${RED}❌${NC}"
  ((FAIL++))
fi

echo -n "Buscando 'ProgressBreadcrumb' en GamePage..."
if grep -q "ProgressBreadcrumb" ./frontend/src/pages/GamePage.jsx; then
  echo -e " ${GREEN}✅${NC}"
  ((PASS++))
else
  echo -e " ${RED}❌${NC}"
  ((FAIL++))
fi

echo -n "Buscando 'post-social-actions' en PostCard..."
if grep -q "post-social-actions" ./frontend/src/components/PostCard.jsx; then
  echo -e " ${GREEN}✅${NC}"
  ((PASS++))
else
  echo -e " ${RED}❌${NC}"
  ((FAIL++))
fi

echo -n "Buscando 'Toast' import en PostCard..."
if grep -q "import Toast from" ./frontend/src/components/PostCard.jsx; then
  echo -e " ${GREEN}✅${NC}"
  ((PASS++))
else
  echo -e " ${RED}❌${NC}"
  ((FAIL++))
fi

echo ""
echo "🎯 Verificando TODOs para imágenes..."
TODO_COUNT=$(grep -r "TODO: Replace with actual" ./frontend/src --include="*.jsx" 2>/dev/null | wc -l)
echo -e "TODOs encontrados: ${YELLOW}${TODO_COUNT}${NC} (esperado: 7)"
if [ $TODO_COUNT -eq 7 ]; then
  echo -e "${GREEN}✅${NC} Todos los TODOs están presentes"
  ((PASS++))
else
  echo -e "${YELLOW}⚠️${NC} Revisa que hay $TODO_COUNT TODOs, se esperaban 7"
  ((FAIL++))
fi

echo ""
echo "=================================================="
echo -e "RESUMEN FINAL: ${GREEN}${PASS} Pasó${NC} | ${RED}${FAIL} Falló${NC}"
echo "=================================================="

if [ $FAIL -eq 0 ]; then
  echo ""
  echo -e "${GREEN}🎉 ¡REDISEÑO COMPLETADO CON ÉXITO!${NC}"
  echo ""
  echo "📖 PRÓXIMOS PASOS:"
  echo "1. Lee: INICIO_AQUI.md"
  echo "2. Lee: README_REDISEÑO.md"
  echo "3. Ejecuta: npm run dev (en la carpeta frontend)"
  echo "4. Prueba en: http://localhost:5173"
  echo ""
  exit 0
else
  echo ""
  echo -e "${RED}⚠️  Se encontraron algunos problemas${NC}"
  echo "Revisa los archivos que faltaron arriba"
  echo ""
  exit 1
fi
