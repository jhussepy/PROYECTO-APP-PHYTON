# Google OAuth Setup

## Estado actual

La interfaz y estados están preparados. No existe falso login ni almacenamiento de contraseñas. La sincronización real requiere backend.

## Google Cloud Console

1. Crea o selecciona un proyecto.
2. Configura la pantalla de consentimiento.
3. Crea credenciales OAuth para aplicación web.
4. Añade orígenes autorizados de desarrollo y producción.
5. Añade el redirect URI exacto.
6. Copia únicamente el Client ID público a `js/config.js`.

## Scopes

Usa solo:

```text
openid
email
profile
```

## Backend recomendado

- Authorization Code + PKCE.
- Validación de `state`, `nonce`, issuer y audience.
- Cookies `HttpOnly`, `Secure` y `SameSite`.
- Tokens fuera de `localStorage`.
- Revocación y cierre de sesión.

## Variables sugeridas

```text
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI=
SESSION_SECRET=
```

`GOOGLE_CLIENT_SECRET` y `SESSION_SECRET` pertenecen exclusivamente al backend y nunca al repositorio frontend.

## Sincronización futura

Sincroniza progreso, notas, rutas y configuración con consentimiento explícito, borrado de cuenta y política de privacidad.
