# Project Context

## Stack

- HTML5, CSS y JavaScript vanilla.
- Aplicación estática sin framework ni dependencias runtime.
- PWA mediante `manifest.json` y `sw.js`.
- Estado académico y configuraciones en `localStorage`.
- Simulador educativo de Python ejecutado en Web Worker.

## Orden de arquitectura

1. `data.js` y `curriculum-upgrade.js`: catálogo y enriquecimiento.
2. `learning-paths.js`: rutas v10 integradas al catálogo.
3. `state.js`: progreso, XP, notas, exámenes y certificados.
4. `platform-core.js`: perfil, Google, PWA, Focus y estado de producto.
5. `local-ai-core.js`: adaptador Ollama restringido a loopback.
6. `ui.js`: experiencia académica heredada.
7. `learning-os.js`: Command Center y módulos premium.
8. `router.js` y `app.js`: navegación e inicialización.

## Auditoría v10

- El proyecto tenía 11 cursos, 50 módulos y 156 lecciones.
- No existía `package.json`, build, check o servidor Node.
- `state.js` seguía en versión 9.4 mientras la PWA indicaba 9.9.
- Múltiples archivos redefinen funciones globales del mercado; la última capa cargada es la efectiva.
- El CSS acumulaba varias generaciones de tokens y muchos breakpoints móviles.
- No existían módulos Google OAuth, Ollama, PWA install, Focus o configuración central.
- La navegación Misión abría directamente una lección y no una experiencia propia.

## Decisiones

- No migrar a framework durante esta entrega para evitar romper 156 lecciones y el motor actual.
- Añadir módulos aislados y una capa CSS final.
- Conservar Strategy Engine y todos los flujos financieros.
- Mantener Google en estado preparado, sin falso login.
- Restringir Ollama y accesos a labs a loopback.

## Deuda controlada

- Reducir globals y listeners inline en una futura migración a módulos ES.
- Consolidar las cuatro generaciones de renderizado del mercado.
- Dividir `styles.css` por dominio.
- Añadir pruebas de navegador versionadas.
