/* pyodide-engine.js — motor Python REAL con carga diferida.
   Expone dos globales: initPyodide(onStatus?) y runPythonReal(code, onStatus?).
   Solo se activa en lecciones marcadas con engine:'pyodide'. El runner casero
   (runPythonSafe) sigue siendo el motor por defecto y nunca se toca. */

const PYODIDE_VERSION = '0.27.5';
const PYODIDE_INDEX   = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;

let _pyodide = null;  // instancia cacheada — se descarga solo una vez
let _pending = null;  // promesa en vuelo — evita doble descarga concurrente

/* ¿Pyodide ya está cargado y listo en esta sesión?
   La UI lo usa para decidir si muestra el panel de descarga (primera vez)
   o ejecuta directo y rápido (segunda vez en adelante). */
function isPyodideReady() {
  return !!_pyodide;
}

/* Carga (o reutiliza) la instancia de Pyodide.
   onStatus(msg) es un callback opcional para mostrar progreso en la UI. */
function initPyodide(onStatus) {
  if (_pyodide) return Promise.resolve(_pyodide);
  if (_pending) return _pending;

  const notify = (msg) => { if (typeof onStatus === 'function') onStatus(msg); };

  _pending = (async () => {
    notify('Descargando intérprete Python real (~8 MB)…');

    // Inyectar el script del CDN si loadPyodide no está disponible aún
    if (typeof loadPyodide === 'undefined') {
      await new Promise((resolve, reject) => {
        const s = document.createElement('script');
        s.src = PYODIDE_INDEX + 'pyodide.js';
        s.onload  = resolve;
        s.onerror = () => reject(new Error(
          `No se pudo cargar Pyodide v${PYODIDE_VERSION} desde CDN. ¿Hay conexión?`
        ));
        document.head.appendChild(s);
      });
    }

    notify('Iniciando intérprete Python…');
    // eslint-disable-next-line no-undef
    _pyodide = await loadPyodide({ indexURL: PYODIDE_INDEX });
    notify('Python real listo ✓');
    return _pyodide;
  })();

  // Limpiar para permitir reintento si la carga falla
  _pending.catch(() => { _pending = null; });
  return _pending;
}

/* Ejecuta código Python REAL con Pyodide.
   Devuelve {ok, output} (éxito) o {ok:false, error, friendly} (error),
   mismo shape que runPythonSafe para compatibilidad directa. */
async function runPythonReal(code, onStatus) {
  let py;
  try {
    py = await initPyodide(onStatus);
  } catch (e) {
    return {
      ok: false,
      error: `Pyodide no disponible: ${e.message}`,
      friendly: 'Verifica tu conexión a internet. Pyodide se descarga desde CDN la primera vez (~8 MB).'
    };
  }

  let output = '';
  // Redirigir stdout y stderr → captura completa de print() y errores
  py.setStdout({ write: (s) => { output += s; return s.length; } });
  py.setStderr({ write: (s) => { output += s; return s.length; } });

  try {
    await py.runPythonAsync(code);
    return { ok: true, output };
  } catch (e) {
    const msg = String(e.message || e);
    // Mostrar solo la línea más informativa del traceback
    const brief = msg.split('\n').filter(l => l.trim()).pop() || msg;
    return { ok: false, error: brief, friendly: `Error Python: ${brief}` };
  }
}
