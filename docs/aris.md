# Aris en Rhumb Labs

La ficha está en `/aris`. Utiliza el mismo catálogo, navegación y traducciones que las demás páginas de producto. Las tres páginas legales están en el Centro Legal y se generan también como HTML bilingüe con `npm run build:static-legal`.

## Publicar una versión para Mac

1. Genera el `.dmg` de Aris, fírmalo con **Developer ID Application** y completa la notarización de Apple. Adjunta el ticket y valida el archivo final con `xcrun stapler validate /ruta/Aris-VERSION.dmg`. Prueba la descarga y apertura en otro Mac con chip Apple.
2. Sube el archivo a Vercel Blob con acceso público o al alojamiento aprobado para la descarga. Usa un nombre que incluya la versión. Conserva la URL HTTPS directa cuyo nombre de archivo termine en `.dmg`.
3. Actualiza `VITE_ARIS_DOWNLOAD_URL` en el entorno de Vercel que corresponda y vuelve a desplegar para que Vite incorpore el valor. Actualiza la versión y los requisitos de la ficha cuando cambien.
4. Comprueba el enlace desde los dos botones de descarga de `/aris`. Con la variable vacía, la ficha muestra «Muy pronto» y ofrece el correo de soporte. El enlace de Windows abre una consulta al mismo correo.

Antes del lanzamiento quedan por confirmar la RAM mínima, la disponibilidad del instalador notarizado y el alojamiento final. Los documentos legales requieren revisión de un abogado.

## Regenerar las capturas

Usa Chrome, Playwright y `cwebp`, con las dependencias del frontend de Aris ya instaladas. Compila únicamente el frontend de Aris en un directorio temporal y sírvelo en el puerto 4174. Ejecuta estos comandos desde el repositorio web. Ajusta `ARIS_SOURCE` si el repositorio de Aris está en otra carpeta.

```sh
ARIS_SOURCE="/ruta/al/repositorio/Aris"
ARIS_CAPTURE_TEMP="$(mktemp -d)"
npm --prefix "$ARIS_SOURCE" run build -- --outDir "$ARIS_CAPTURE_TEMP/app"
npm install --prefix "$ARIS_CAPTURE_TEMP" --no-save playwright
python3 -m http.server 4174 --bind 127.0.0.1 --directory "$ARIS_CAPTURE_TEMP/app" &
ARIS_CAPTURE_SERVER=$!
NODE_PATH="$ARIS_CAPTURE_TEMP/node_modules" node scripts/aris-screenshots/capture.mjs
kill "$ARIS_CAPTURE_SERVER"
npm run check:assets
```

El script simula los comandos de Tauri con reuniones de demostración. Abre las vistas reales del frontend, incluida la configuración con el control de apariencia de la barra lateral y los dos estados del panel de la barra de menús.
