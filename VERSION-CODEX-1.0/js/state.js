const APP_VERSION = '11.3.0';
const STORAGE_KEY = 'pysec_elite_v10_state';
const LEGACY_KEYS = [
  'pysec_elite_v92_state',
  'pysec_elite_v89_state',
  'pysec_elite_v88_state',
  'pysec_elite_v872_state',
  'pysec_elite_v871_state',
  'pysec_elite_v87_state',
  'pysec_elite_v86_state',
  'pysec_elite_v85_state',
  'pysec_elite_v844_state',
  'pysec_elite_v843_state',
  'pysec_elite_v842_state',
  'pysec_elite_v841_state',
  'pysec_elite_v84_state',
  'pysec_elite_v83_state',
  'pysec_elite_v822_state',
  'pysec_elite_v821_state',
  'pysec_elite_v82_state',
  'pysec_elite_v81_state',
  'pysec_elite_v8_state',
  'pysec_elite_v52_state',
  'pysec_academy_v4_state',
  'pysec_academy_v32_state',
  'pysec_pro_state'
];
const RANKS = ['Recluta', 'Operador Junior', 'Analista Cyber', 'Python Operator', 'Blue Sentinel', 'Ethical Hacker Jr.', 'Threat Defender', 'PySec Elite Operator'];

let state = {
  view: 'home', xp: 0, streak: 0,
  completedLessons: [], readLessons: [], completedQuizzes: [], acceptedEthics: [], badges: [], completedCTF: [],
  passedExams: {}, certificates: [], mistakes: [], notes: [], favoriteLessons: [], completedLabs: [],
  lastActive: null, level: 1, agentRank: 'Recluta', rankId: 'recluta', rankLevel: 1, nextRank: 'Operador Junior', xpToNextRank: 100, theme: 'dark', privacyMode: true, operatorId: null,
  resolvedMistakes: 0
};

function buildCertificateId(courseId) {
  const cleanCourse = String(courseId || 'course').replace(/[^a-z0-9]+/gi, '-').replace(/^-+|-+$/g, '').toUpperCase();
  const stamp = Date.now().toString(36).toUpperCase();
  const local = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `PYSEC-${APP_VERSION.replace(/\./g, '')}-${cleanCourse}-${stamp}-${local}`;
}

function normalizeCertificate(cert = {}, examMap = state.passedExams) {
  const courseId = String(cert.courseId || '');
  const course = getCourse(courseId);
  const exam = (examMap && examMap[courseId]) || {};
  const score = Number(cert.score ?? exam.score ?? 0);
  const total = Number(cert.total ?? exam.total ?? 0);
  const percent = Number(cert.percent ?? exam.percent ?? (total ? Math.round((score / total) * 100) : 0));
  const approved = cert.approved !== undefined ? !!cert.approved : percent >= 70;
  const courseTitle = cert.courseTitle || cert.course || cert.title || course?.title || courseId || 'Curso';
  return {
    id: cert.id || buildCertificateId(courseId),
    courseId,
    title: courseTitle,
    courseTitle,
    score,
    total,
    percent,
    level: cert.level || course?.level || 'Sin nivel',
    status: cert.status || (approved ? 'Aprobado' : 'Pendiente'),
    approved,
    date: cert.date || cert.issuedAt || exam.date || new Date().toISOString(),
    issuer: cert.issuer || 'PySec Academy Elite',
    version: cert.version || APP_VERSION
  };
}

function createCertificate(courseId, exam) {
  const course = getCourse(courseId);
  return normalizeCertificate({
    id: buildCertificateId(courseId),
    courseId,
    title: course?.title || courseId,
    courseTitle: course?.title || courseId,
    score: exam.score,
    total: exam.total,
    percent: exam.percent,
    level: course?.level || 'Sin nivel',
    status: 'Aprobado',
    approved: true,
    date: exam.date,
    version: APP_VERSION
  }, { [courseId]: exam });
}

function ensureArrays() {
  ['completedLessons','readLessons','completedQuizzes','acceptedEthics','badges','completedCTF','certificates','mistakes','notes','favoriteLessons','completedLabs'].forEach(key => {
    if (!Array.isArray(state[key])) state[key] = [];
  });
  if (!state.passedExams || typeof state.passedExams !== 'object' || Array.isArray(state.passedExams)) state.passedExams = {};
  state.certificates = state.certificates
    .map(cert => normalizeCertificate(cert))
    .filter(cert => cert.courseId && getCourse(cert.courseId));
}

function getStorage() {
  try { return typeof localStorage !== 'undefined' ? localStorage : null; } catch (_) { return null; }
}

function loadState() {
  const storage = getStorage();
  if (storage) {
    for (const key of [STORAGE_KEY, ...LEGACY_KEYS]) {
      const saved = storage.getItem(key);
      if (!saved) continue;
      try { state = { ...state, ...JSON.parse(saved) }; break; } catch (_) {}
    }
  }
  ensureArrays();
  updateGlobalStats();
}

function saveState() {
  ensureArrays();
  const storage = getStorage();
  if (storage) storage.setItem(STORAGE_KEY, JSON.stringify(state));
  updateGlobalStats();
}

function updateGlobalStats() {
  state.level = Math.floor(Number(state.xp || 0) / 150) + 1;
  if (typeof syncRankState === 'function') syncRankState();
  else state.agentRank = RANKS[Math.min(state.level - 1, RANKS.length - 1)];
  const xpEl = document.getElementById('total-xp');
  const streakEl = document.getElementById('streak-days');
  if (xpEl) xpEl.textContent = state.xp;
  if (streakEl) streakEl.textContent = state.streak;
}

function checkStreak() {
  const todayKey = new Date().toDateString();
  if (!state.lastActive) { state.lastActive = todayKey; state.streak = 1; saveState(); return; }
  const last = new Date(state.lastActive);
  const diff = Math.floor((new Date(todayKey) - new Date(last.toDateString())) / 86400000);
  if (diff === 1) state.streak += 1;
  else if (diff > 1) state.streak = 1;
  state.lastActive = todayKey;
  saveState();
}

function addXP(amount) { state.xp += Number(amount || 0); saveState(); }
function awardReadXP(lessonId) {
  if (!state.readLessons.includes(lessonId)) { state.readLessons.push(lessonId); addXP(5); }
}

function recordMistake(payload) {
  const item = { id: `mistake_${Date.now()}`, date: new Date().toISOString(), ...payload };
  state.mistakes.unshift(item);
  state.mistakes = state.mistakes.slice(0, 40);
  saveState();
}
function removeMistake(id) {
  const existed = state.mistakes.some(m => m.id === id);
  state.mistakes = state.mistakes.filter(m => m.id !== id);
  if (existed) state.resolvedMistakes = Number(state.resolvedMistakes || 0) + 1;
  saveState();
}

function addAgentNote(text, context='general') {
  const cleaned = String(text || '').trim();
  if (!cleaned) return false;
  state.notes.unshift({ id: `note_${Date.now()}`, text: cleaned, context, date: new Date().toISOString() });
  state.notes = state.notes.slice(0, 60);
  saveState();
  return true;
}
function deleteAgentNote(id) { state.notes = state.notes.filter(n => n.id !== id); saveState(); }

function passExam(courseId, score, total) {
  const percent = total ? Math.round((score / total) * 100) : 0;
  const passed = percent >= 70;
  state.passedExams[courseId] = { score, total, percent, passed, date: new Date().toISOString() };
  if (passed) {
    const existingIndex = state.certificates.findIndex(cert => cert.courseId === courseId);
    const certificate = createCertificate(courseId, state.passedExams[courseId]);
    if (existingIndex >= 0) {
      state.certificates[existingIndex] = { ...certificate, id: state.certificates[existingIndex].id || certificate.id };
      saveState();
    } else {
      state.certificates.push(certificate);
      addXP(80);
      unlockBadge('certified_agent');
    }
  } else {
    saveState();
  }
  return state.passedExams[courseId];
}

function completeGuidedLab(courseId) {
  if (!state.completedLabs.includes(courseId)) {
    state.completedLabs.push(courseId);
    addXP(60);
    unlockBadge('lab_operator');
  }
}

function resetProgress() {
  if (!confirm('¿Eliminar progreso local, XP, quizzes, exámenes, certificados, notas e insignias?')) return;
  const storage = getStorage();
  const currentAndLegacyKeys = [
    STORAGE_KEY,
    ...LEGACY_KEYS,
    'pysec_learning_os_v10',
    'pysec_virtual_files_v92',
    'pysec_virtual_files_v89',
    'pysec_virtual_files_v88',
    'pysec_virtual_files_v872',
    'pysec_virtual_files_v871',
    'pysec_virtual_files_v87',
    'pysec_virtual_files_v86',
    'pysec_virtual_files_v85',
    'pysec_virtual_files_v844',
    'pysec_virtual_files_v843',
    'pysec_virtual_files_v842',
    'pysec_virtual_files_v841',
    'pysec_virtual_files_v84',
    'pysec_virtual_files_v83'
  ];
  if (storage) currentAndLegacyKeys.forEach(key => storage.removeItem(key));
  try { if (typeof sessionStorage !== 'undefined') sessionStorage.clear(); } catch (_) {}
  location.reload();
}

function unlockBadge(id) {
  if (state.badges.includes(id)) return;
  state.badges.push(id);
  saveState();
  if (typeof showToast === 'function') showToast('🏆 Insignia desbloqueada', (BADGES.find(b => b.id === id)?.title || id));
}

function checkBadges(lessonId) {
  if (state.completedLessons.length === 1) unlockBadge('first_script');
  if (state.completedLessons.length >= 25) unlockBadge('challenge_master');
  if (state.completedLessons.length >= 50) unlockBadge('dark_operator');
  if (['py_003','py_004','py_005','py_011'].includes(lessonId)) unlockBadge('apprentice');
  if (['py_007','py_008','py_010','py_013'].includes(lessonId)) unlockBadge('loop_runner');
  if (lessonId.startsWith('sec_')) unlockBadge('log_analyst');
  if (lessonId.startsWith('net_')) unlockBadge('net_explorer');
  if (lessonId.startsWith('web_')) unlockBadge('web_auditor');
  if (lessonId.startsWith('blue_')) unlockBadge('blue_defender');
  if (lessonId.startsWith('adv_')) unlockBadge('python_pro');
  if (lessonId.startsWith('eth_')) unlockBadge('ethical_hacker');
  if (lessonId.startsWith('lab_')) unlockBadge('lab_operator');
  if (lessonId.startsWith('red_')) unlockBadge('purple_operator');
  if (lessonId.startsWith('final_')) unlockBadge('certified_agent');
  if (lessonId.startsWith('threat_')) unlockBadge('threat_defender');
  if (lessonId.startsWith('ai_')) unlockBadge('local_ai_operator');
  if (lessonId.startsWith('super_')) unlockBadge('super_dotado_builder');
  if (lessonId.startsWith('project_')) unlockBadge('portfolio_builder');
}

function sanitizeStateForExport() {
  ensureArrays();
  return {
    schema: 'pysec-progress-v1',
    app: 'PySec Academy Elite',
    version: APP_VERSION,
    exportedAt: new Date().toISOString(),
    data: {
      xp: Number(state.xp || 0),
      streak: Number(state.streak || 0),
      completedLessons: [...new Set(state.completedLessons)],
      readLessons: [...new Set(state.readLessons)],
      completedQuizzes: [...new Set(state.completedQuizzes)],
      completedCTF: [...new Set(state.completedCTF)],
      acceptedEthics: [...new Set(state.acceptedEthics)],
      badges: [...new Set(state.badges)],
      passedExams: state.passedExams || {},
      certificates: state.certificates || [],
      mistakes: state.mistakes || [],
      notes: state.privacyMode ? [] : (state.notes || []),
      favoriteLessons: state.favoriteLessons || [],
      completedLabs: state.completedLabs || [],
      lastActive: state.lastActive,
      theme: state.theme || 'dark',
      privacyMode: !!state.privacyMode,
      rankId: state.rankId || 'recluta',
      rankLevel: state.rankLevel || 1,
      agentRank: state.agentRank || 'Recluta',
      operatorId: state.operatorId || null
      ,
      resolvedMistakes: Number(state.resolvedMistakes || 0)
    }
  };
}

function exportProgressJSON() {
  const payload = sanitizeStateForExport();
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `pysec-progress-v92-${new Date().toISOString().slice(0,10)}.json`;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  if (typeof showToast === 'function') showToast('🔐 Progreso exportado', state.privacyMode ? 'Notas privadas omitidas' : 'Incluye notas locales');
}

function validateImportedProgress(payload) {
  if (!payload || payload.schema !== 'pysec-progress-v1' || !payload.data) throw new Error('Archivo de progreso no válido.');
  const data = payload.data;
  const allowedLessonIds = new Set(getAllLessons().map(l => l.id));
  const allowedCourseIds = new Set(COURSES.map(c => c.id));
  const allowedBadges = new Set(BADGES.map(b => b.id));
  const safeArray = (arr, allowed=null) => Array.isArray(arr) ? [...new Set(arr.map(String).filter(x => !allowed || allowed.has(x)))] : [];
  return {
    xp: Math.max(0, Number(data.xp || 0)),
    streak: Math.max(0, Number(data.streak || 0)),
    completedLessons: safeArray(data.completedLessons, allowedLessonIds),
    readLessons: safeArray(data.readLessons, allowedLessonIds),
    completedQuizzes: safeArray(data.completedQuizzes, allowedLessonIds),
    completedCTF: safeArray(data.completedCTF),
    acceptedEthics: safeArray(data.acceptedEthics, allowedCourseIds),
    badges: safeArray(data.badges, allowedBadges),
    passedExams: (data.passedExams && typeof data.passedExams === 'object' && !Array.isArray(data.passedExams)) ? data.passedExams : {},
    certificates: Array.isArray(data.certificates) ? data.certificates.slice(0, 30).map(cert => normalizeCertificate(cert, data.passedExams)).filter(cert => allowedCourseIds.has(cert.courseId)) : [],
    mistakes: Array.isArray(data.mistakes) ? data.mistakes.slice(0, 40) : [],
    notes: Array.isArray(data.notes) ? data.notes.slice(0, 60) : [],
    favoriteLessons: safeArray(data.favoriteLessons, allowedLessonIds),
    completedLabs: safeArray(data.completedLabs, allowedCourseIds),
    lastActive: data.lastActive || null,
    theme: ['dark','light'].includes(data.theme) ? data.theme : 'dark',
    privacyMode: data.privacyMode !== false,
    operatorId: typeof data.operatorId === 'string' ? data.operatorId : null
    ,
    resolvedMistakes: Math.max(0, Number(data.resolvedMistakes || 0))
  };
}

function importProgressJSON(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const imported = validateImportedProgress(JSON.parse(reader.result));
      state = { ...state, ...imported };
      saveState();
      applyTheme();
      if (typeof showToast === 'function') showToast('✅ Progreso importado', 'Datos validados y aplicados');
      renderView('profile');
    } catch (e) { alert(e.message || 'No se pudo importar el progreso.'); }
  };
  reader.readAsText(file);
}

function togglePrivacyMode() {
  state.privacyMode = !state.privacyMode;
  saveState();
  if (typeof showToast === 'function') showToast(state.privacyMode ? '🔐 Protección activada' : '📝 Exportación completa', state.privacyMode ? 'Tus notas no se exportarán' : 'Tus notas se incluirán en exportaciones');
  renderView('profile');
}

function applyTheme() {
  const theme = state.theme || 'dark';
  document.documentElement.dataset.theme = theme;
  const btn = document.getElementById('theme-toggle');
  if (btn) btn.textContent = theme === 'dark' ? '🌙' : '☀️';
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', theme === 'dark' ? '#060b18' : '#f5f7fb');
}
function toggleTheme() { state.theme = (state.theme || 'dark') === 'dark' ? 'light' : 'dark'; saveState(); applyTheme(); }
