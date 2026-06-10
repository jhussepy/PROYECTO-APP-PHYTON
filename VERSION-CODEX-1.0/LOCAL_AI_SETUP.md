# Local AI Setup

## Objetivo

Conectar el Mentor IA a Ollama sin enviar prompts a servicios externos.

## Pasos

1. Instala Ollama para tu sistema operativo.
2. Descarga un modelo:

```powershell
ollama pull qwen2.5-coder:3b
```

3. Comprueba el servicio:

```powershell
ollama list
```

4. Abre PySec > Configuración.
5. Usa `http://127.0.0.1:11434`.
6. Escribe el nombre exacto del modelo y pulsa Probar conexión.

## Modelos orientativos

- Laptop ligera: modelos coder de 1.5B a 3B.
- 16 GB RAM: modelos cuantizados de 3B a 7B.
- Equipos limitados: prioriza contexto corto y prompts concretos.

La velocidad depende de CPU, GPU, RAM, cuantización y longitud de contexto.

## Seguridad

- La app rechaza hosts que no sean loopback.
- No pegues secretos ni datos personales.
- Ollama puede requerir configuración CORS según navegador y sistema.
- Si falla la conexión, PySec usa un fallback educativo local.
