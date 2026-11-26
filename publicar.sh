#!/usr/bin/env bash
# Arma index.html a partir de fuente/ y lo publica en GitHub Pages.
# Uso:
#   bash ~/Downloads/claude/cuentas-claras/publicar.sh               arma, hace commit y sube
#   bash ~/Downloads/claude/cuentas-claras/publicar.sh --solo-armar  solo arma index.html
#   MENSAJE="Texto del commit" bash …/publicar.sh                     con mensaje propio
set -euo pipefail

DIR="$(cd "$(dirname "$0")" && pwd)"
REPO="cuentas-claras"
cd "$DIR"
for f in estilos.css cuerpo.html base.js contenido1.js contenido2.js teoria.js contenido3.js app.js; do
  [ -f "fuente/$f" ] || { echo "No encuentro fuente/$f"; exit 1; }
done

{
  printf '<!doctype html>\n<html lang="es">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'
  printf '<title>Cuentas Claras</title>\n'
  printf '<meta name="description" content="Curso paso a paso de funciones y combinatoria para Lógica y Estructuras Discretas: lecciones, quizzes, los 61 problemas de la hoja con revisión automática y simulacro de examen.">\n'
  printf '<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n'
  printf '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400&family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=JetBrains+Mono:wght@400;600&display=swap">\n'
  printf '<style>\n'; cat fuente/estilos.css; printf '</style>\n</head>\n<body>\n'
  cat fuente/cuerpo.html
  printf '<script>\n(function(){\n'
  cat fuente/base.js fuente/contenido1.js fuente/contenido2.js fuente/teoria.js fuente/contenido3.js fuente/app.js
  printf '\n})();\n</script>\n</body>\n</html>\n'
} > index.html

if [ "${1:-}" = "--solo-armar" ]; then echo "index.html armado."; exit 0; fi

OWNER="$(gh api user -q .login)"
if [ ! -d .git ]; then git init -q -b main; fi
git add index.html fuente README.md publicar.sh
if ! git diff --cached --quiet; then
  git commit -q -m "${MENSAJE:-Actualiza Cuentas Claras}" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
fi

if gh repo view "$OWNER/$REPO" >/dev/null 2>&1; then
  git remote get-url origin >/dev/null 2>&1 || git remote add origin "https://github.com/$OWNER/$REPO.git"
  git push -u origin main
else
  gh repo create "$OWNER/$REPO" --public --source . --remote origin --push \
    --description "Curso paso a paso de funciones y combinatoria con ejercicios que se corrigen solos"
fi

gh api -X POST "repos/$OWNER/$REPO/pages" -f "source[branch]=main" -f "source[path]=/" >/dev/null 2>&1 || true

echo ""
echo "Listo. En uno o dos minutos queda en: https://$OWNER.github.io/$REPO/"
