#!/bin/bash
set -e

BASE_DIR="/Users/erra/Sites/triage/backend"

# Lista de archivos destino y posibles fuentes
FILES=(
  "$BASE_DIR/includes/tabla.php::/Users/erra/Downloads/triage/tabla.php;/Users/erra/Downloads/triage 2/tabla.php"
  "$BASE_DIR/log/usuario_delete.php::/Users/erra/Downloads/triage/log/usuario_delete.php;/Users/erra/Downloads/triage 2/log/usuario_delete.php"
)

for ITEM in "${FILES[@]}"; do
  DEST="${ITEM%%::*}"
  SOURCES="${ITEM##*::}"

  echo "🔍 Restaurando $DEST..."
  RESTORED=false

  # Dividir las fuentes por ";"
  IFS=";" read -ra PATHS <<< "$SOURCES"
  for SRC in "${PATHS[@]}"; do
    if [[ -f "$SRC" ]]; then
      cp "$SRC" "$DEST"
      echo "✔ Copiado desde $SRC"
      RESTORED=true
      break
    fi
  done

  if [ "$RESTORED" = false ]; then
    echo "⚠️ No encontrado en Downloads. Busca en VSCode History con:"
    echo "   mdfind $(basename "$DEST")"
  fi
done
