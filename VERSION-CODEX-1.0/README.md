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
```

Genera una copia estática en `dist/`.

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
- `CHANGELOG.md`

## Seguridad

Las funciones de ciberseguridad son educativas y defensivas. Solo se permite practicar en sistemas propios, localhost, laboratorios, CTF o con autorización explícita. Consulta `ETHICAL_USE.md`.
