# APK and Play Store Roadmap

## Preparación

La PWA ya tiene manifest, iconos 192/512, service worker, offline fallback y diseño responsive.

## Capacitor

1. Crear build estático:

```powershell
npm run build
```

2. Instalar Capacitor en una rama dedicada.
3. Definir `webDir` como `dist`.
4. Crear proyecto Android.
5. Probar navegación, archivos, permisos y teclado.

## Entregables Android

- APK para pruebas internas.
- AAB firmado para Play Console.
- keystore protegido fuera del repositorio.
- versionCode y versionName.
- icono adaptativo y splash.

## Play Console

- ficha pública
- screenshots móvil/tablet
- política de privacidad
- formulario de seguridad de datos
- clasificación de contenido
- correo de soporte
- pruebas internas y cerradas

## Riesgos pendientes

- OAuth necesita deep links y backend.
- Ollama local no estará disponible normalmente dentro del dispositivo Android.
- Finnhub debe usar proxy backend.
- Revisar almacenamiento local y exportación bajo políticas de datos.
