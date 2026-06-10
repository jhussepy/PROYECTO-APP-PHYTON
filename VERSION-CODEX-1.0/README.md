# PySec Academy Elite v10.0.0

Learning OS PWA para estudiar Python, IA local, productividad, proyectos y ciberseguridad ética. Funciona con JavaScript vanilla, almacenamiento local y un diseño mobile-first.

## Capacidades

- Command Center con progreso, misión diaria, roadmap y estados PWA/Google/Ollama.
- Mission OS con niveles Recluta, Aprendiz, Operador, Analista, Builder y Elite.
- 14 cursos integrados en siete Learning Paths.
- Mentor IA con Ollama local y fallback educativo sin backend.
- Generador de retos, analizador básico de código y Focus Mode.
- Notas locales con crear, editar, borrar y filtrar.
- Ethical Hacking Labs limitados a localhost, CTF y entornos autorizados.
- Trading Command Center con Finnhub opcional, Strategy Engine, caché y demo.
- PWA instalable, navegación offline, exportación/importación de progreso.

## Requisitos

- Node.js 18 o posterior para scripts de desarrollo.
- Un navegador moderno.
- Ollama es opcional.

## Desarrollo

```powershell
npm install
npm run check
npm run dev
```

Abre `http://127.0.0.1:8000`.

El proyecto no necesita dependencias npm; `npm install` solo valida el manifiesto y genera el lockfile.

## Build

```powershell
npm run build
npm run preview
```

Genera una copia estática en `dist/`.
La vista previa de `dist` queda disponible en `http://127.0.0.1:8001/index.html#store`.

## QA

```powershell
npm test
git diff --check
```

Prueba manualmente:

1. `390x844`: Command Center, Misión, Rutas, Acciones y Perfil.
2. Desktop: sidebar, topbar y grids.
3. DevTools > Application: manifest, service worker y modo offline.
4. Configuración > Local AI: URL loopback y prueba de conexión.
5. Configuración > Google: debe indicar pendiente si no hay Client ID.

## Configuración pública

Edita `js/config.js` solo con valores públicos:

- Google OAuth Client ID.
- Redirect URI.
- URL y modelo local de Ollama.

Nunca incluyas client secrets, contraseñas ni API keys privadas en el repositorio.

## Documentación

- `PROJECT_CONTEXT.md`
- `SECURITY.md`
- `ETHICAL_USE.md`
- `LOCAL_AI_SETUP.md`
- `GOOGLE_OAUTH_SETUP.md`
- `APK_PLAYSTORE_ROADMAP.md`
- `ROADMAP.md`
- `ELITE_STORE_PLAN.md`
- `CHANGELOG.md`

## Seguridad

Las funciones de ciberseguridad son educativas y defensivas. Solo se permite practicar en sistemas propios, localhost, laboratorios, CTF o con autorización explícita. Consulta `ETHICAL_USE.md`.

## v11.0.0 — Cloud Mentor OS

Nueva fase incorporada:

- Proxy seguro `api/chat.js` para IA Cloud en Vercel.
- Nuevo módulo `js/ai-mentor-cloud.js` sin API keys en frontend.
- Chat interactivo del Mentor IA con memoria de sesión, burbujas, botones rápidos y fallback local.
- Exámenes dinámicos con IA opcionales y fallback automático al banco local.
- Service Worker actualizado a cache `v11.0.0-cloud-mentor-os` y exclusión de `/api/chat`.
- Configuración `vercel.json` para Serverless Function.

### Variables de entorno en Vercel

Configura en Vercel → Project Settings → Environment Variables:

```text
ANTHROPIC_API_KEY=tu_api_key_privada
ANTHROPIC_MODEL=modelo_configurado
```

No coloques claves reales en el código, en GitHub ni en localStorage. Si no configuras la variable, el Mentor IA usará fallback local y la app seguirá funcionando.

### Deploy recomendado en Vercel

```text
Build Command: npm run build
Output Directory: dist
```

### Prueba local

```bash
npm run build
npm run dev
```

Luego abre la app, entra a Mentor y prueba una pregunta. Sin variables de entorno cloud, debe responder con Mentor local.

## v11.1.0 — Local Mentor Pro

Esta versión elimina la dependencia obligatoria de Anthropic/API Cloud para el mentor educativo.

### Qué cambia

- Mentor IA funciona en modo **Local Mentor Pro** por defecto.
- No requiere API key.
- No requiere pagar créditos.
- No depende de `/api/chat` ni de variables de entorno para funcionar.
- Mantiene compatibilidad con el chat de v11.
- Genera retos por plantillas inteligentes locales.
- Revisa código Python por patrones comunes de error.
- Genera exámenes dinámicos locales con fallback seguro.
- Ollama queda como opción avanzada si el usuario lo tiene instalado en su PC.

### Importante

Local Mentor Pro no es un LLM cloud como Claude/ChatGPT. Es un motor educativo local por reglas, contexto, plantillas y patrones. Su ventaja es que funciona gratis, offline-first y sin exponer credenciales.

## v11.2.0 — Elite Store & Themes

Nueva fase gamificada local para PySec Academy Elite.

### Incluye

- PyCoins internos sin valor real.
- Tienda Elite offline.
- Avatares desbloqueables y equipables.
- Temas visuales desbloqueables y aplicables a toda la app.
- Avatar + PyCoins visibles en el header.
- Recompensas automáticas de PyCoins al ganar XP.
- Compras directas con precio y contenido visibles.
- Niveles de colección vinculados al progreso, sin etiquetas de rareza.
- Roadmap para packs completos, marcos, badges, fondos, mascotas, widgets y certificados internos.

### Seguridad / economía

PyCoins en v11.2.0 son puntos internos de aprendizaje guardados en localStorage. No son criptomoneda, no tienen valor monetario y no se pueden transferir, retirar ni comprar.

Elite Store no usa ni usará ruletas, gacha, spins, loot boxes, premios aleatorios, sorteos o apuestas. Los PyCoins proceden de progreso académico verificable y todas las compras son directas.

Consulta `ELITE_STORE_PLAN.md` para la planificación completa.
