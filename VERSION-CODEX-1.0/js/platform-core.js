/* PySec Learning OS v10 - estado de producto e integraciones públicas.
   Nunca almacena contraseñas ni client secrets. */

const PYSEC_PLATFORM_VERSION = '10.0.0';
const PYSEC_PLATFORM_STORAGE_KEY = 'pysec_learning_os_v10';
const PYSEC_ALLOWED_LEVELS = ['beginner', 'intermediate', 'advanced'];

function defaultPlatformState() {
  const config = window.PYSEC_CONFIG || {};
  return {
    schema: 1,
    profile: {
      displayName: 'Operador local',
      level: 'beginner',
      goal: 'Dominar Python con práctica real'
    },
    google: {
      status: config.googleOAuth?.clientId ? 'ready' : 'not_configured',
      profile: null,
      lastError: ''
    },
    localAI: {
      url: config.localAI?.url || 'http://127.0.0.1:11434',
      model: config.localAI?.model || 'qwen2.5-coder:3b',
      status: 'not_checked',
      lastChecked: null,
      models: []
    },
    focus: {
      duration: 25,
      goal: 'Completar una misión',
      sessions: 0,
      totalMinutes: 0
    },
    mentorHistory: [],
    challengeHistory: [],
    labPermissions: {
      ownSystem: false,
      localhost: false,
      ctf: false,
      authorized: false
    }
  };
}

function readPlatformState() {
  const defaults = defaultPlatformState();
  try {
    const parsed = JSON.parse(localStorage.getItem(PYSEC_PLATFORM_STORAGE_KEY) || '{}');
    return {
      ...defaults,
      ...parsed,
      profile: { ...defaults.profile, ...(parsed.profile || {}) },
      google: { ...defaults.google, ...(parsed.google || {}) },
      localAI: { ...defaults.localAI, ...(parsed.localAI || {}) },
      focus: { ...defaults.focus, ...(parsed.focus || {}) },
      labPermissions: { ...defaults.labPermissions, ...(parsed.labPermissions || {}) },
      mentorHistory: Array.isArray(parsed.mentorHistory) ? parsed.mentorHistory.slice(0, 20) : [],
      challengeHistory: Array.isArray(parsed.challengeHistory) ? parsed.challengeHistory.slice(0, 20) : []
    };
  } catch (_) {
    return defaults;
  }
}

function writePlatformState(nextState) {
  const safeState = { ...defaultPlatformState(), ...nextState, schema: 1 };
  localStorage.setItem(PYSEC_PLATFORM_STORAGE_KEY, JSON.stringify(safeState));
  updatePlatformIndicators();
  return safeState;
}

function updatePlatformState(patch) {
  const current = readPlatformState();
  const next = typeof patch === 'function' ? patch(current) : { ...current, ...patch };
  return writePlatformState(next);
}

function saveLearningProfile() {
  const displayName = String(document.getElementById('settings-display-name')?.value || '').trim().slice(0, 50) || 'Operador local';
  const levelValue = String(document.getElementById('settings-level')?.value || 'beginner');
  const level = PYSEC_ALLOWED_LEVELS.includes(levelValue) ? levelValue : 'beginner';
  const goal = String(document.getElementById('settings-goal')?.value || '').trim().slice(0, 140) || 'Dominar Python con práctica real';
  updatePlatformState(current => ({ ...current, profile: { displayName, level, goal } }));
  if (typeof showToast === 'function') showToast('Perfil actualizado', 'Tu roadmap usará esta configuración');
  if (typeof renderSettings === 'function') renderSettings();
}

function getGoogleOAuthStatus() {
  const state = readPlatformState();
  const configured = Boolean(window.PYSEC_CONFIG?.googleOAuth?.clientId);
  if (!configured) return { code: 'not_configured', label: 'Pendiente de configuración', tone: 'warning' };
  if (state.google.status === 'connected' && state.google.profile) return { code: 'connected', label: 'Conectado', tone: 'success' };
  if (state.google.status === 'error') return { code: 'error', label: 'Error de conexión', tone: 'danger' };
  return { code: 'ready', label: 'OAuth preparado', tone: 'info' };
}

function beginGoogleConnect() {
  const config = window.PYSEC_CONFIG?.googleOAuth || {};
  if (!config.clientId) {
    updatePlatformState(current => ({
      ...current,
      google: { ...current.google, status: 'not_configured', lastError: 'Falta GOOGLE_CLIENT_ID público.' }
    }));
    if (typeof showToast === 'function') showToast('Google OAuth pendiente', 'Configura el Client ID y un backend antes de conectar');
    if (typeof renderSettings === 'function') renderSettings();
    return;
  }
  updatePlatformState(current => ({
    ...current,
    google: { ...current.google, status: 'ready', lastError: '' }
  }));
  if (typeof showToast === 'function') showToast('OAuth preparado', 'Falta conectar el callback seguro del backend');
}

function disconnectGoogleAccount() {
  updatePlatformState(current => ({
    ...current,
    google: { status: window.PYSEC_CONFIG?.googleOAuth?.clientId ? 'ready' : 'not_configured', profile: null, lastError: '' }
  }));
  if (typeof showToast === 'function') showToast('Cuenta desconectada', 'Los datos locales permanecen en este dispositivo');
  if (typeof renderSettings === 'function') renderSettings();
}

let pysecInstallPrompt = null;
let pysecInstalled = window.matchMedia?.('(display-mode: standalone)').matches || false;

window.addEventListener('beforeinstallprompt', event => {
  event.preventDefault();
  pysecInstallPrompt = event;
  updatePlatformIndicators();
});
window.addEventListener('appinstalled', () => {
  pysecInstalled = true;
  pysecInstallPrompt = null;
  updatePlatformIndicators();
});
window.addEventListener('online', updatePlatformIndicators);
window.addEventListener('offline', updatePlatformIndicators);

async function installPySecApp() {
  if (pysecInstalled) {
    if (typeof showToast === 'function') showToast('PWA instalada', 'PySec ya funciona como aplicación');
    return;
  }
  if (!pysecInstallPrompt) {
    if (typeof showToast === 'function') showToast('Instalación disponible', 'Usa el menú del navegador y elige Instalar aplicación');
    return;
  }
  await pysecInstallPrompt.prompt();
  await pysecInstallPrompt.userChoice;
  pysecInstallPrompt = null;
  updatePlatformIndicators();
}

function getPwaStatus() {
  if (pysecInstalled) return { label: 'Instalada', tone: 'success' };
  if (pysecInstallPrompt) return { label: 'Lista para instalar', tone: 'success' };
  return { label: 'Navegador', tone: 'info' };
}

function updatePlatformIndicators() {
  const online = navigator.onLine;
  const platform = readPlatformState();
  const onlineNode = document.getElementById('system-online-status');
  const aiNode = document.getElementById('system-ai-status');
  const installButton = document.getElementById('install-app-btn');
  if (onlineNode) {
    onlineNode.textContent = online ? 'ONLINE' : 'OFFLINE';
    onlineNode.dataset.tone = online ? 'success' : 'danger';
  }
  if (aiNode) {
    aiNode.textContent = window.LOCAL_MENTOR_PRO_STATUS === 'online' ? 'LOCAL PRO' : (platform.localAI.status === 'online' ? 'OLLAMA ON' : 'LOCAL PRO');
    aiNode.dataset.tone = 'success';
  }
  if (installButton) {
    installButton.hidden = pysecInstalled;
    installButton.classList.toggle('ready', Boolean(pysecInstallPrompt));
  }
}

document.addEventListener('DOMContentLoaded', updatePlatformIndicators);
