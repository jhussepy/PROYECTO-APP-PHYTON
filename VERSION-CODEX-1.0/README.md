# PySec Academy Elite v9.4.2 — Clean Market Flow

PWA móvil para estudiar Python, ciberseguridad, hacking ético, defensa cyber y lectura de datos de acciones. Incluye 11 rutas, 156 lecciones, simulador seguro, agente IA local, CTF simulado, sistema de rangos, Agent Command Center y nuevo módulo **Acciones** con mapa de calor/watchlist.

## Abrir en PC

Entra a la carpeta donde está `index.html` y ejecuta:

```powershell
python -m http.server 8000 --bind 127.0.0.1
```

Abre:

```text
http://127.0.0.1:8000/index.html
```

Si recibes `404 File not found`, estás ejecutando el servidor en la carpeta equivocada. Debes estar dentro de la carpeta que contiene `index.html`, `styles.css`, `manifest.json`, `sw.js`, `assets/` y `js/`.

## Probar en Android desde tu PC

```powershell
python -m http.server 8000 --bind 0.0.0.0
```

Luego busca la IP local de tu PC con:

```powershell
ipconfig
```

En Chrome Android abre:

```text
http://TU-IP:8000/index.html
```

PC y móvil deben estar en el mismo WiFi.

## Nuevo módulo Acciones

La barra inferior ahora tiene:

```text
Base | Rutas | Misión | Acciones | Agente
```

**Acciones** abre un panel educativo inspirado en mapas de calor de mercado:

- mapa de calor de acciones
- lista de seguimiento
- filtros por sector
- buscador por símbolo/nombre/sector
- actualización manual
- estado Live/Caché/Demo

El módulo intenta obtener datos desde un proveedor público sin API key. Si el navegador, CORS o la conexión bloquean el feed, usa caché local o datos demo para que la app siga funcionando.

> Nota: este módulo es educativo y no constituye asesoría financiera.

## PWA

La app incluye `manifest.json`, `sw.js`, iconos y screenshots. Para limpiar caché durante desarrollo:

```text
F12 → Application → Service Workers → Unregister
Application → Storage → Clear site data
Ctrl + Shift + R
```

## Estructura

```text
index.html
styles.css
manifest.json
sw.js
README.md
assets/
js/
  data.js
  curriculum-upgrade.js
  state.js
  validation.js
  runner.js
  runner-worker.js
  ui-components.js
  rank-system.js
  agent-command.js
  market.js
  ai-agent.js
  ui.js
  router.js
  app.js
```

## Ética

La app se enfoca en laboratorios seguros, datos simulados, defensa, detección, hardening, reportes y aprendizaje responsable. No está orientada a atacar sistemas reales ni a realizar abuso informático.


## Finnhub API

El módulo **Acciones** puede usar Finnhub para obtener datos live. Por seguridad, no pegues tu API key en chats ni la escribas directamente en el código del proyecto.

Uso recomendado en desarrollo local:

1. Abre la app con servidor local.
2. Entra a **Acciones**.
3. Pega tu API key en el bloque **FINNHUB API**.
4. Toca **GUARDAR API**.
5. Toca **ACTUALIZAR**.

La key se guarda únicamente en `localStorage` del navegador local. Si publicas la app para otras personas, usa un backend proxy para proteger la clave. En una app estática, cualquier key usada en frontend puede quedar visible para quien inspeccione el navegador.

Estados posibles del feed:

- **DATOS EN VIVO**: Finnhub o proveedor live respondió correctamente.
- **CACHÉ LOCAL**: se usan datos guardados previamente.
- **MODO DEMO**: entrenamiento local si no hay conexión o el proveedor falla.

## v9.8.3 Finnhub Data Configuration

- Añade una tarjeta visible en `Acciones > Alertas` para guardar, probar y borrar la API key de Finnhub.
- Guarda la credencial localmente como `pysec_finnhub_api_key`, con migración automática de la clave anterior.
- Prioriza Finnhub cuando hay credenciales y mantiene Stooq, caché y demo como fallback.
- Distingue visualmente `FINNHUB LIVE` de `MERCADO EDUCATIVO / CACHÉ`.

## v9.8.2 Market Dashboard Alignment

Esta versión sube el módulo **Acciones** a un panel más completo de inteligencia educativa de mercado:

- **Alertas locales**: crea alertas por precio o cambio porcentual. Se guardan en el navegador y se evalúan al actualizar el feed.
- **Notas de mercado**: diario local para registrar observaciones como fortaleza sectorial, líderes, debilidad o contexto.
- **Sparkline local**: cada actualización guarda puntos de precio en `localStorage` y dibuja una mini línea histórica por acción.
- **Sectores avanzados**: ranking por sector, promedio de cambio, verdes/rojas y líder por sector.

Limitación: las alertas locales solo se evalúan cuando la app está abierta y se actualizan los datos. Para alertas reales 24/7 se necesitaría backend.
