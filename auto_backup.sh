#!/bin/bash
cd /Users/erra/Sites/triage

# Fecha y hora actual
DATE=$(date +"%Y-%m-%d %H:%M:%S")

# Añadir cambios
git add .

# Hacer commit con fecha
git commit -m "Backup automático - $DATE"

# Subir a GitHub
git push origin main
