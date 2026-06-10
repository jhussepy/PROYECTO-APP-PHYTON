# Security

## Principios

- No guardar contraseñas.
- No incluir client secrets en frontend.
- No hardcodear API keys.
- Usar scopes OAuth mínimos.
- Mantener IA local limitada a `localhost`, `127.0.0.1` o `::1`.
- Validar importaciones de progreso antes de aplicarlas.
- Escapar contenido del usuario antes de insertarlo en HTML.

## Datos locales

El progreso, notas, configuración, Strategy Engine y claves opcionales se guardan en `localStorage`. Esto es apropiado para uso individual, pero no equivale a almacenamiento cifrado.

No guardes:

- contraseñas
- tokens de sesión
- secretos empresariales
- información personal de terceros
- evidencias sensibles reales

## Producción pública

Antes de habilitar sincronización:

1. Crear backend con HTTPS.
2. Implementar OAuth Authorization Code + PKCE.
3. Validar tokens en servidor.
4. Cifrar datos sensibles en reposo.
5. Aplicar rate limiting, logs y revocación.
6. Mover Finnhub a backend proxy.
7. Definir CSP y eliminar handlers inline gradualmente.

## Reporte

Documenta impacto, reproducción segura y mitigación. No publiques secretos ni datos personales en issues.
