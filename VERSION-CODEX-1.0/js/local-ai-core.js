/* Local AI Core: solo permite endpoints loopback y nunca envía datos a terceros. */

const LOCAL_AI_TIMEOUT_MS = 7000;

function normalizeLocalAiUrl(value = '') {
  const candidate = String(value || '').trim().replace(/\/+$/, '');
  try {
    const url = new URL(candidate);
    const allowedHosts = ['127.0.0.1', 'localhost', '::1'];
    if (!allowedHosts.includes(url.hostname)) throw new Error('Solo se permite IA en localhost.');
    if (!['http:', 'https:'].includes(url.protocol)) throw new Error('Protocolo local no válido.');
    return url.origin;
  } catch (error) {
    throw new Error(error.message || 'URL local no válida.');
  }
}

async function localAiFetch(path, options = {}) {
  const platform = readPlatformState();
  const base = normalizeLocalAiUrl(platform.localAI.url);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), LOCAL_AI_TIMEOUT_MS);
  try {
    return await fetch(`${base}${path}`, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

async function testLocalAiConnection({ silent = false } = {}) {
  try {
    const response = await localAiFetch('/api/tags');
    if (!response.ok) throw new Error(`Ollama respondió ${response.status}`);
    const payload = await response.json();
    const models = Array.isArray(payload.models) ? payload.models.map(item => item.name).filter(Boolean) : [];
    updatePlatformState(current => ({
      ...current,
      localAI: {
        ...current.localAI,
        status: 'online',
        lastChecked: new Date().toISOString(),
        models
      }
    }));
    if (!silent && typeof showToast === 'function') showToast('Local AI online', models.length ? `${models.length} modelos detectados` : 'Ollama respondió correctamente');
    return { ok: true, models };
  } catch (error) {
    updatePlatformState(current => ({
      ...current,
      localAI: {
        ...current.localAI,
        status: 'offline',
        lastChecked: new Date().toISOString(),
        models: []
      }
    }));
    if (!silent && typeof showToast === 'function') showToast('Local AI offline', 'Inicia Ollama y revisa la URL local');
    return { ok: false, error: error.name === 'AbortError' ? 'Tiempo de espera agotado.' : error.message };
  }
}

function saveLocalAiSettings() {
  const urlInput = document.getElementById('local-ai-url');
  const modelInput = document.getElementById('local-ai-model');
  try {
    const url = normalizeLocalAiUrl(urlInput?.value);
    const model = String(modelInput?.value || '').trim().slice(0, 100);
    if (!model) throw new Error('Selecciona o escribe un modelo.');
    updatePlatformState(current => ({
      ...current,
      localAI: { ...current.localAI, url, model, status: 'not_checked', lastChecked: null }
    }));
    if (typeof showToast === 'function') showToast('Local AI configurada', `${model} en ${url}`);
    if (typeof renderSettings === 'function') renderSettings();
  } catch (error) {
    if (typeof showToast === 'function') showToast('Configuración no válida', error.message);
  }
}

async function sendLocalAiPrompt(prompt, system = '') {
  const text = String(prompt || '').trim();
  if (!text) throw new Error('Escribe una pregunta primero.');
  const platform = readPlatformState();
  const response = await localAiFetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: platform.localAI.model,
      prompt: text,
      system: system || 'Eres un mentor técnico educativo. Responde en español, con seguridad, claridad y pasos verificables.',
      stream: false,
      options: { temperature: 0.35 }
    })
  });
  if (!response.ok) throw new Error(`Ollama respondió ${response.status}`);
  const payload = await response.json();
  return String(payload.response || '').trim();
}

function localMentorFallback(question = '') {
  const text = String(question || '').trim();
  const lower = text.toLowerCase();
  if (!text) return 'Escribe una duda concreta, un error o el objetivo que quieres practicar.';
  if (lower.includes('error') || lower.includes('traceback')) {
    return 'Método local: identifica la última línea del error, localiza el tipo de excepción, reduce el código al caso mínimo y valida una hipótesis por vez. Pega el código en Analizador para obtener controles básicos.';
  }
  if (lower.includes('python')) {
    return 'Ruta recomendada: define entrada, transformación y salida; escribe una versión mínima; ejecútala; compara el resultado; después agrega manejo de errores y una prueba.';
  }
  if (lower.includes('ollama') || lower.includes('ia local')) {
    return 'Ollama debe ejecutarse en 127.0.0.1:11434. Configura un modelo ligero, prueba la conexión y evita pegar secretos o datos personales en prompts.';
  }
  if (lower.includes('seguridad') || lower.includes('hacking')) {
    return 'Trabaja solo con localhost, CTF, sistemas propios o autorización explícita. Define alcance, conserva evidencia y termina con mitigación y re-test.';
  }
  return `Plan de trabajo para “${text.slice(0, 90)}”: divide el objetivo en una entrada verificable, una acción pequeña y una salida observable. Empieza por el caso mínimo y documenta el error que corrijas.`;
}
