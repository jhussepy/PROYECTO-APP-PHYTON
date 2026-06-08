# PySec Academy Elite v8.4.2 Final Release

App móvil/PWA para aprender Python, hacking ético, Blue Team, Red/Purple Team y defensa contra amenazas reales con laboratorios guiados, exámenes, certificados locales imprimibles y simulador seguro.

## Alcance de la release

- 11 cursos activos.
- 156 lecciones/labs.
- 16 insignias.
- Threat Defense Lab defensivo.
- Modo ético para cursos sensibles.
- Modo Carrera con las 11 rutas.
- Exámenes por curso y certificados locales.
- Certificados con ID local, fecha, curso, puntaje, nivel, estado aprobado y botón de impresión.
- Exportación/importación de progreso JSON con protección de notas privadas.
- Simulador Python educativo con Web Worker, timeout anti-freeze y datos locales.
- PWA Android mobile-first con manifest, iconos, screenshots y Service Worker.

## Estructura

```text
index.html
styles.css
manifest.json
sw.js
assets/
  icon-192.png
  icon-512.png
  screenshot-mobile.png
  screenshot-wide.png
js/
  app.js
  data.js
  state.js
  validation.js
  runner.js
  runner-worker.js
  ui-components.js
  ui.js
  router.js
```

## Arquitectura

- `js/data.js`: catálogo completo de cursos, módulos, lecciones, ejercicios, soluciones, quizzes e insignias.
- `js/state.js`: progreso local, racha, XP, certificados, importación/exportación, reset y tema.
- `js/validation.js`: normalización y validación de salidas del simulador.
- `js/runner.js` y `js/runner-worker.js`: simulador Python seguro con ejecución aislada.
- `js/ui-components.js`: componentes UI pequeños y reutilizables.
- `js/ui.js`: pantallas principales, cursos, práctica, exámenes, certificados, perfil y repaso.
- `js/router.js`: navegación interna.
- `js/app.js`: único punto de arranque de la app.
- `sw.js`: cache estático/runtime y soporte offline básico.
- `manifest.json`: configuración PWA instalable.

## Abrir en PC

Con Live Server en VS Code:

1. Abre la carpeta del proyecto.
2. Abre `index.html`.
3. Clic derecho y selecciona **Open with Live Server**.

Con Python:

```bash
python -m http.server 8000
```

Luego entra en:

```text
http://127.0.0.1:8000
```

## Abrir en Android

1. Copia o descomprime la carpeta del proyecto en el dispositivo.
2. Abre la carpeta con Acode u otro editor con preview local.
3. Abre `index.html`.
4. Usa Preview o sirve la carpeta con un servidor local.

Para instalar como PWA, publica la carpeta en un hosting HTTPS y desde Chrome Android usa **Instalar app** o **Agregar a pantalla principal**.

## Progreso local

La app guarda progreso en `localStorage`:

- XP, nivel y racha.
- Lecciones leídas y completadas.
- Quizzes completados.
- Exámenes aprobados.
- Certificados locales.
- Insignias.
- Notas del agente.
- Labs guiados completados.
- Preferencias de tema y privacidad.

El reset borra claves actuales y legacy del progreso, además de los archivos virtuales del simulador.

## Certificados

Cada certificado se genera localmente al aprobar un examen con 70% o más. Incluye:

- ID local.
- Fecha de emisión.
- Curso.
- Puntaje.
- Nivel.
- Estado aprobado.
- Porcentaje final.
- Botón para imprimir.

Los certificados son evidencia local de aprendizaje; no sustituyen una certificación externa.

## Simulador seguro

El simulador interpreta un subconjunto educativo de Python:

- `print`, variables, listas, diccionarios, funciones, clases básicas, condicionales y bucles.
- Módulos permitidos para prácticas defensivas y educativas.
- Archivos virtuales guardados localmente.
- Timeout para prevenir bloqueos.
- Peticiones restringidas a laboratorio local o misma app.

## Service Worker y PWA

La PWA cachea los assets esenciales, limpia cachés anteriores con prefijo `pysec-*`, no cachea respuestas fallidas y evita interceptar recursos externos. Si ves contenido viejo:

```text
F12 -> Application -> Service Workers -> Unregister
F12 -> Application -> Storage -> Clear site data
Ctrl + Shift + R
```

## QA de release

Antes de entregar, valida:

- JavaScript sin errores.
- 11 cursos.
- 156 lecciones.
- 16 insignias.
- 0 IDs duplicados.
- 156/156 soluciones pasan validación.
- Modo Carrera incluye los 11 cursos.
- Reset borra claves actuales y legacy.
- Manifest y Service Worker apuntan a la release actual.

## Ética y seguridad

Todo el contenido de hacking está enfocado en laboratorios propios, datos simulados, `127.0.0.1`, análisis defensivo, detección, prevención y respuesta. No incluye instrucciones para atacar terceros ni abuso real.
