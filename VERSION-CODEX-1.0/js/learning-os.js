/* PySec Learning OS v10 - capa de producto y vistas modulares. */

const LEARNING_OS_LEVELS = [
  { name: 'Recluta', min: 0 },
  { name: 'Aprendiz', min: 8 },
  { name: 'Operador', min: 22 },
  { name: 'Analista', min: 42 },
  { name: 'Builder', min: 68 },
  { name: 'Elite', min: 90 }
];

const LEARNING_OS_MOTTO = [
  'Entrena tu mente técnica.',
  'Convierte errores en progreso.',
  'Aprende, construye, automatiza y defiende.',
  'La evidencia vale más que la intuición.',
  'Privacidad local. Práctica verificable.'
];

let activeNotesFilter = 'all';
let editingNoteId = null;
let focusTimerId = null;
let focusRemainingSeconds = 25 * 60;
let focusRunning = false;

function getLearningOsMetrics() {
  const lessons = getAllLessons();
  const completedSet = new Set(state.completedLessons || []);
  const completedLessons = lessons.filter(item => completedSet.has(item.id));
  const totalMinutes = completedLessons.reduce((sum, item) => sum + Number(item.estimated_minutes || 0), 0);
  const total = lessons.length;
  const completed = completedLessons.length;
  const percent = total ? Math.round((completed / total) * 100) : 0;
  const level = [...LEARNING_OS_LEVELS].reverse().find(item => percent >= item.min) || LEARNING_OS_LEVELS[0];
  const projects = (state.completedLabs || []).length;
  const challenges = completed + (state.completedCTF || []).length;
  return {
    total,
    completed,
    percent,
    hours: Math.round((totalMinutes / 60) * 10) / 10,
    labs: (state.completedLabs || []).length,
    projects,
    challenges,
    errorsFixed: Number(state.resolvedMistakes || 0),
    level
  };
}

function getDailyLearningMission() {
  const challenge = getCurrentChallenge();
  const dayIndex = Math.floor(Date.now() / 86400000);
  return {
    challenge,
    motto: LEARNING_OS_MOTTO[dayIndex % LEARNING_OS_MOTTO.length],
    target: challenge?.lesson?.estimated_minutes || 15
  };
}

function getLearningPathProgress(group) {
  const courses = group.courseIds.map(getCourse).filter(Boolean);
  const lessons = courses.flatMap(course => course.modules.flatMap(module => module.lessons));
  const completed = lessons.filter(item => state.completedLessons.includes(item.id)).length;
  const percent = lessons.length ? Math.round((completed / lessons.length) * 100) : 0;
  return { courses, lessons, completed, percent };
}

function getLearningPathStatus(percent) {
  if (percent >= 100) return { label: 'Completada', tone: 'success' };
  if (percent > 0) return { label: 'En progreso', tone: 'info' };
  return { label: 'Disponible', tone: 'muted' };
}

function learningOsPill(label, tone = 'muted') {
  return `<span class="os-status-pill ${tone}">${escapeHtml(label)}</span>`;
}

function renderSystemStatusCards() {
  const platform = readPlatformState();
  const google = getGoogleOAuthStatus();
  const pwa = getPwaStatus();
  const aiOnline = platform.localAI.status === 'online';
  return `
    <div class="os-system-grid">
      <button class="os-system-card" onclick="renderView('mentor')">
        <span>LOCAL AI</span><strong>${aiOnline ? 'ONLINE' : 'OFFLINE'}</strong>
        <small>${escapeHtml(platform.localAI.model)}</small>
      </button>
      <button class="os-system-card" onclick="renderView('settings')">
        <span>GOOGLE</span><strong>${escapeHtml(google.label.toUpperCase())}</strong>
        <small>OAuth · scopes mínimos</small>
      </button>
      <button class="os-system-card" onclick="installPySecApp()">
        <span>PWA</span><strong>${escapeHtml(pwa.label.toUpperCase())}</strong>
        <small>${navigator.onLine ? 'Online + offline cache' : 'Modo offline activo'}</small>
      </button>
    </div>`;
}

function renderCommandTools() {
  const tools = [
    ['Mentor IA', 'Dudas y explicación local', 'mentor', 'AI'],
    ['Generador', 'Retos por nivel', 'challenges', 'GX'],
    ['Analizador', 'Revisión básica de código', 'analyzer', '</>'],
    ['Safe Labs', 'Laboratorios autorizados', 'ethical-labs', 'LAB'],
    ['Focus', 'Sesiones sin distracciones', 'focus', '25'],
    ['Roadmap', 'Prioridades personales', 'roadmap', 'MAP'],
    ['Tienda Elite', 'Avatares, temas y PyCoins', 'store', '🪙'],
    ['Configuración', 'Perfil e integraciones', 'settings', 'CFG']
  ];
  return `<div class="os-tool-grid">${tools.map(([title, copy, view, icon]) => `
    <button class="os-tool-card" data-action="render-view" data-view="${escapeHtml(view)}">
      <span>${escapeHtml(icon)}</span><strong>${escapeHtml(title)}</strong><small>${escapeHtml(copy)}</small>
    </button>`).join('')}</div>`;
}

function renderPathOverview(limit = LEARNING_PATH_GROUPS.length) {
  return `<div class="os-path-grid">${LEARNING_PATH_GROUPS.slice(0, limit).map(group => {
    const stats = getLearningPathProgress(group);
    const status = getLearningPathStatus(stats.percent);
    const firstCourse = stats.courses[0];
    return `<button class="os-path-card" ${firstCourse ? `data-action="render-view" data-view="course-detail" data-course-id="${escapeHtml(firstCourse.id)}"` : `data-action="render-view" data-view="courses"`}>
      <div class="os-path-top"><span>${escapeHtml(group.title)}</span>${learningOsPill(status.label, status.tone)}</div>
      <p>${escapeHtml(group.summary)}</p>
      <div class="os-progress"><i style="width:${stats.percent}%"></i></div>
      <small>${stats.completed}/${stats.lessons.length} misiones · ${stats.percent}%</small>
    </button>`;
  }).join('')}</div>`;
}

window.renderHome = function renderLearningOsHome() {
  const metrics = getLearningOsMetrics();
  const daily = getDailyLearningMission();
  const platform = readPlatformState();
  const recentMistakes = (state.mistakes || []).slice(0, 2);
  mainContainer.innerHTML = `
    <section class="os-command-hero">
      <div class="os-hero-copy">
        <span class="os-eyebrow">PYSEC LEARNING OS · V${PYSEC_PLATFORM_VERSION}</span>
        <h1>Tu sistema de aprendizaje técnico.</h1>
        <p>Domina Python con práctica real, estudia con IA local y entrena ciberseguridad defensiva dentro de entornos autorizados.</p>
        <div class="os-hero-actions">
          <button class="os-primary-action" onclick="renderView('mission')">ABRIR MISIÓN DEL DÍA</button>
          <button class="os-secondary-action" onclick="renderView('courses')">EXPLORAR RUTAS</button>
        </div>
      </div>
      <div class="os-readiness-panel">
        <span>READINESS</span>
        <strong>${metrics.percent}<small>%</small></strong>
        <p>${escapeHtml(metrics.level.name)} · ${metrics.completed}/${metrics.total} misiones</p>
        <div class="os-progress"><i style="width:${metrics.percent}%"></i></div>
      </div>
    </section>

    <section class="os-metric-strip">
      <article><span>HORAS</span><strong>${metrics.hours}</strong><small>práctica estimada</small></article>
      <article><span>RETOS</span><strong>${metrics.challenges}</strong><small>completados</small></article>
      <article><span>LABS</span><strong>${metrics.labs}</strong><small>superados</small></article>
      <article><span>PROYECTOS</span><strong>${metrics.projects}</strong><small>entregados</small></article>
      <article><span>ERRORES</span><strong>${metrics.errorsFixed}</strong><small>corregidos</small></article>
    </section>

    <section class="os-grid os-grid-main">
      <article class="os-panel os-daily-mission">
        <div class="os-panel-heading"><div><span>MISIÓN DEL DÍA</span><h2>${escapeHtml(daily.challenge?.lesson?.title || 'Ruta completada')}</h2></div>${learningOsPill(`${daily.target} MIN`, 'danger')}</div>
        <p>${escapeHtml(daily.challenge?.lesson?.objective || 'Revisa tu roadmap y construye un nuevo proyecto.')}</p>
        <blockquote>${escapeHtml(daily.motto)}</blockquote>
        <div class="os-panel-actions">
          ${daily.challenge ? `<button class="os-primary-action" onclick="openCurrentMission()">CONTINUAR MISIÓN</button>` : ''}
          <button class="os-secondary-action" onclick="renderView('focus')">INICIAR FOCUS</button>
        </div>
      </article>
      <article class="os-panel">
        <div class="os-panel-heading"><div><span>PRÓXIMO PASO</span><h2>${escapeHtml(platform.profile.goal)}</h2></div>${learningOsPill(platform.profile.level, 'info')}</div>
        <div class="os-check-list">
          <span>1. Completa una misión verificable.</span>
          <span>2. Corrige o documenta un error.</span>
          <span>3. Cierra con una nota o mini entrega.</span>
        </div>
        <button class="os-text-action" onclick="renderView('roadmap')">VER ROADMAP PERSONAL →</button>
      </article>
    </section>

    ${renderSystemStatusCards()}

    <section class="os-panel">
      <div class="os-panel-heading"><div><span>LEARNING PATHS</span><h2>Rutas activas</h2></div><button class="os-text-action" onclick="renderView('courses')">VER TODAS</button></div>
      ${renderPathOverview(4)}
    </section>

    <section class="os-panel">
      <div class="os-panel-heading"><div><span>TOOLS</span><h2>Módulos inteligentes</h2></div>${learningOsPill('LOCAL FIRST', 'success')}</div>
      ${renderCommandTools()}
    </section>

    <section class="os-grid">
      <article class="os-panel">
        <div class="os-panel-heading"><div><span>ÚLTIMOS RETOS</span><h2>Actividad reciente</h2></div></div>
        ${(state.completedLessons || []).slice(-3).reverse().map(id => {
          const item = getAllLessons().find(lesson => lesson.id === id);
          return item ? `<div class="os-activity-row"><span>COMPLETADO</span><strong>${escapeHtml(item.title)}</strong></div>` : '';
        }).join('') || '<p class="os-empty">Completa tu primera misión para iniciar el registro.</p>'}
      </article>
      <article class="os-panel">
        <div class="os-panel-heading"><div><span>ERROR LAB</span><h2>Convierte fallos en criterio</h2></div>${learningOsPill(`${recentMistakes.length} PENDIENTES`, recentMistakes.length ? 'danger' : 'success')}</div>
        ${recentMistakes.map(item => `<div class="os-activity-row"><span>REVISAR</span><strong>${escapeHtml(item.title || 'Error registrado')}</strong></div>`).join('') || '<p class="os-empty">No hay errores pendientes. Mantén el hábito de validar.</p>'}
        <button class="os-text-action" onclick="renderView('review')">ABRIR ERROR LAB →</button>
      </article>
    </section>
    <div class="bottom-spacer"></div>`;
  updatePlatformIndicators();
};

function renderMissionCapabilityCards() {
  const cards = [
    ['APRENDER', 'Comprende fundamentos y modelos mentales.', 'courses'],
    ['PRACTICAR', 'Ejecuta ejercicios con salida verificable.', 'mission'],
    ['CONSTRUIR', 'Convierte habilidades en entregables.', 'course-detail'],
    ['DEFENDER', 'Analiza riesgos y aplica hardening.', 'ethical-labs'],
    ['AUTOMATIZAR', 'Reduce tareas repetitivas con Python.', 'challenges'],
    ['ANALIZAR', 'Diagnostica código, datos y sistemas.', 'analyzer']
  ];
  return `<div class="os-capability-grid">${cards.map(([title, copy, view]) => {
    const dataAttrs = view === 'course-detail'
      ? `data-action="render-view" data-view="course-detail" data-course-id="proyectos_reales"`
      : `data-action="render-view" data-view="${escapeHtml(view)}"`;
    return `<button ${dataAttrs}><span>${title.slice(0, 2)}</span><strong>${title}</strong><small>${copy}</small></button>`;
  }).join('')}</div>`;
}

function renderMissionTimeline(metrics) {
  return `<div class="os-level-track">${LEARNING_OS_LEVELS.map(level => {
    const reached = metrics.percent >= level.min;
    const active = level.name === metrics.level.name;
    return `<div class="${reached ? 'reached' : ''} ${active ? 'active' : ''}"><i></i><span>${escapeHtml(level.name)}</span><small>${level.min}%</small></div>`;
  }).join('')}</div>`;
}

function renderMissionOS() {
  const metrics = getLearningOsMetrics();
  const daily = getDailyLearningMission();
  mainContainer.innerHTML = `
    <section class="os-mission-hero">
      <span class="os-eyebrow">MISSION OS · FORMACIÓN TÉCNICA</span>
      <h1>Entrena una mente técnica, disciplinada y ética.</h1>
      <p>La app no solo enseña código. Te prepara para dominar Python, IA local, automatización, análisis de sistemas y ciberseguridad defensiva.</p>
      <div class="os-hero-actions">
        <button class="os-primary-action" onclick="openCurrentMission()">CONTINUAR OPERACIÓN</button>
        <button class="os-secondary-action" onclick="renderView('roadmap')">RUTA RECOMENDADA</button>
      </div>
    </section>
    ${renderMissionCapabilityCards()}
    <section class="os-panel">
      <div class="os-panel-heading"><div><span>PROGRESIÓN</span><h2>De Recluta a Elite</h2></div>${learningOsPill(metrics.level.name, 'success')}</div>
      ${renderMissionTimeline(metrics)}
    </section>
    <section class="os-metric-strip">
      <article><span>HORAS</span><strong>${metrics.hours}</strong><small>estudiadas</small></article>
      <article><span>RETOS</span><strong>${metrics.challenges}</strong><small>completados</small></article>
      <article><span>LABS</span><strong>${metrics.labs}</strong><small>superados</small></article>
      <article><span>PROYECTOS</span><strong>${metrics.projects}</strong><small>creados</small></article>
      <article><span>ERRORES</span><strong>${metrics.errorsFixed}</strong><small>corregidos</small></article>
    </section>
    <section class="os-grid os-grid-main">
      <article class="os-panel os-daily-mission">
        <div class="os-panel-heading"><div><span>HOY</span><h2>${escapeHtml(daily.challenge?.lesson?.title || 'Explora una ruta')}</h2></div>${learningOsPill(`${daily.target} MIN`, 'danger')}</div>
        <p>${escapeHtml(daily.challenge?.lesson?.objective || 'Selecciona una nueva ruta y define un objetivo.')}</p>
        <button class="os-primary-action full" onclick="openCurrentMission()">INICIAR MISIÓN DEL DÍA</button>
      </article>
      <article class="os-panel">
        <div class="os-panel-heading"><div><span>RUTA RECOMENDADA</span><h2>Aprender → practicar → construir</h2></div></div>
        <div class="os-check-list"><span>Base conceptual clara</span><span>Ejercicio con validación</span><span>Mini proyecto documentado</span><span>Repaso de errores</span></div>
        <button class="os-secondary-action full" onclick="renderView('courses')">VER LEARNING PATHS</button>
      </article>
    </section>
    <section class="os-quote-panel"><span>PROTOCOLO DE TRABAJO</span><blockquote>${escapeHtml(daily.motto)}</blockquote><p>Predice. Ejecuta. Compara. Corrige. Documenta.</p></section>
    <div class="bottom-spacer"></div>`;
}

window.openCurrentMission = function openLearningMission() {
  const challenge = getCurrentChallenge();
  if (!challenge?.lesson) return renderView('courses');
  renderView('lesson', { courseId: challenge.lesson.courseId, lessonId: challenge.lesson.id });
};

function renderLearningPathDirectory() {
  return LEARNING_PATH_GROUPS.map(group => {
    const stats = getLearningPathProgress(group);
    const status = getLearningPathStatus(stats.percent);
    return `<section class="os-path-section" data-path-group="${group.id}">
      <div class="os-panel-heading"><div><span>LEARNING PATH</span><h2>${escapeHtml(group.title)}</h2><p>${escapeHtml(group.summary)}</p></div>${learningOsPill(status.label, status.tone)}</div>
      <div class="course-grid">${stats.courses.map(createCourseCard).join('')}</div>
    </section>`;
  }).join('');
}

window.renderCourses = function renderLearningPaths() {
  mainContainer.innerHTML = `
    <section class="os-directory-hero">
      <span class="os-eyebrow">LEARNING PATHS · ${COURSES.length} RUTAS · ${getTotalLessons()} MISIONES</span>
      <h1>Construye una carrera técnica por capas.</h1>
      <p>Empieza simple, profundiza con práctica y termina cada ruta con evidencia, lab o proyecto.</p>
      <input id="learning-path-search" class="os-search" placeholder="Buscar Python, IA local, OWASP, APIs, proyectos..." autocomplete="off">
      <div class="os-filter-row">
        <button class="active" data-path-filter="all">TODAS</button>
        ${LEARNING_PATH_GROUPS.map(group => `<button data-path-filter="${group.id}">${escapeHtml(group.title)}</button>`).join('')}
      </div>
    </section>
    <div id="learning-path-directory">${renderLearningPathDirectory()}</div>
    <div class="bottom-spacer"></div>`;
  setupLearningPathDirectory();
};

function setupLearningPathDirectory() {
  const search = document.getElementById('learning-path-search');
  const filters = [...document.querySelectorAll('[data-path-filter]')];
  let active = 'all';
  const apply = () => {
    const query = String(search?.value || '').trim().toLowerCase();
    document.querySelectorAll('[data-path-group]').forEach(section => {
      const groupMatches = active === 'all' || section.dataset.pathGroup === active;
      const textMatches = !query || section.textContent.toLowerCase().includes(query);
      section.hidden = !(groupMatches && textMatches);
    });
  };
  filters.forEach(button => button.addEventListener('click', () => {
    active = button.dataset.pathFilter;
    filters.forEach(item => item.classList.toggle('active', item === button));
    apply();
  }));
  search?.addEventListener('input', apply);
}

function getMentorCloudLabel() {
  const status = window.CLOUD_AI_STATUS || 'offline';
  if (status === 'local-pro') return learningOsPill('LOCAL PRO', 'success');
  if (status === 'online') return learningOsPill('CLOUD OPCIONAL', 'success');
  if (status === 'loading') return learningOsPill('IA PENSANDO', 'info');
  const platformState = readPlatformState();
  return learningOsPill(platformState.localAI.status === 'online' ? 'OLLAMA LOCAL' : 'MENTOR LOCAL', platformState.localAI.status === 'online' ? 'success' : 'warning');
}

function getMentorHistory() {
  const platformState = readPlatformState();
  const stored = Array.isArray(platformState.mentorHistory) ? platformState.mentorHistory : [];
  return stored.slice(0, 5);
}

function renderMentor() {
  const history = getMentorHistory();
  mainContainer.innerHTML = `
    <button class="os-back" onclick="renderView('home')">← COMMAND CENTER</button>
    <section class="os-feature-hero mentor-hero-v11">
      <div><span class="os-eyebrow">LOCAL MENTOR PRO</span><h1>Mentor IA sin API</h1><p>Chat educativo 100% local, gratis y offline-first. No necesita Anthropic, OpenAI ni claves API.</p></div>
      ${getMentorCloudLabel()}
    </section>
    <section class="os-panel mentor-chat-panel">
      <div class="mentor-status-line"><span id="mentor-cloud-status">Estado: ${escapeHtml(window.CLOUD_AI_STATUS || 'local-pro')}</span><small>Motor local + memoria de sesión</small></div>
      <div id="mentor-chat-log" class="mentor-chat-log">
        ${history.length ? history.reverse().map(item => `
          <div class="mentor-bubble user"><span>Tú</span><p>${escapeHtml(item.question || '')}</p></div>
          <div class="mentor-bubble ai"><span>${escapeHtml(item.source || 'Mentor')}</span><p>${escapeHtml(item.answer || '')}</p></div>
        `).join('') : '<div class="mentor-empty">Haz una pregunta, pide una pista o solicita un plan de estudio. El mentor usa Local Mentor Pro sin API. Funciona gratis y no depende de Vercel Functions.</div>'}
      </div>
      <div id="mentor-typing" class="mentor-typing hidden"><i></i><i></i><i></i><span>IA escribiendo...</span></div>
      <div class="mentor-quick-actions">
        <button onclick="mentorQuickPrompt('Explícame la lección actual con un ejemplo simple.')">Explícame la lección</button>
        <button onclick="mentorQuickPrompt('Revisa mi enfoque y dime qué error debo buscar primero.')">Revisar mi código</button>
        <button onclick="mentorQuickPrompt('Dame un reto nuevo acorde a mi rango actual.')">Dame un reto nuevo</button>
        <button onclick="mentorQuickPrompt('¿Cómo subo de rango en PySec?')">¿Cómo subo de rango?</button>
      </div>
      <label class="os-field-label" for="mentor-question">Mensaje al mentor</label>
      <textarea id="mentor-question" class="os-textarea mentor-input" placeholder="Ejemplo: no entiendo los bucles for, dame una pista sin resolverme el ejercicio..."></textarea>
      <div class="os-panel-actions">
        <button class="os-primary-action" onclick="submitMentorQuestion()">ENVIAR</button>
        <button class="os-secondary-action" onclick="renderView('settings')">CONFIGURAR LOCAL</button>
      </div>
      <p class="os-security-note">Modo actual: Local Mentor Pro. Gratis, sin API key, sin pagos y compatible con PWA/offline. Ollama queda como opción local avanzada.</p>
    </section>
    <div class="bottom-spacer"></div>`;
  const log = document.getElementById('mentor-chat-log');
  if (log) log.scrollTop = log.scrollHeight;
}

function mentorContext(extra = {}) {
  const platformState = readPlatformState();
  const rankInfo = typeof getRankInfo === 'function' ? getRankInfo(state.xp) : null;
  return {
    rango: rankInfo?.current?.title || state.agentRank || 'Recluta',
    xp: state.xp || 0,
    nivel: state.level || 1,
    racha: state.streak || 0,
    perfil: platformState.profile || {},
    errores: Array.isArray(state.mistakes) ? state.mistakes.slice(0, 3) : [],
    completadas: Array.isArray(state.completedLessons) ? state.completedLessons.length : 0,
    quizzes: Array.isArray(state.completedQuizzes) ? state.completedQuizzes.length : 0,
    ...extra
  };
}

function appendMentorBubble(role, label, text) {
  const log = document.getElementById('mentor-chat-log');
  if (!log) return;
  const empty = log.querySelector('.mentor-empty');
  if (empty) empty.remove();
  const div = document.createElement('div');
  div.className = `mentor-bubble ${role}`;
  div.innerHTML = `<span>${escapeHtml(label)}</span><p>${escapeHtml(text)}</p>`;
  log.appendChild(div);
  log.scrollTop = log.scrollHeight;
}

function mentorQuickPrompt(text) {
  const input = document.getElementById('mentor-question');
  if (input) input.value = text;
  submitMentorQuestion();
}

async function submitMentorQuestion() {
  const input = document.getElementById('mentor-question');
  const typing = document.getElementById('mentor-typing');
  const status = document.getElementById('mentor-cloud-status');
  const question = String(input?.value || '').trim();
  if (!question) {
    if (typeof showToast === 'function') showToast('Pregunta vacía', 'Describe tu duda o pega un error sin datos sensibles');
    return;
  }
  input.value = '';
  appendMentorBubble('user', 'Tú', question);
  typing?.classList.remove('hidden');
  if (status) status.textContent = 'Estado: loading';
  let answer = '';
  let source = 'Mentor local';
  const platformState = readPlatformState();
  try {
    if (typeof askMentorCloud === 'function') {
      answer = await askMentorCloud(question, mentorContext());
      source = window.CLOUD_AI_STATUS === 'online' ? 'Cloud opcional' : 'Local Mentor Pro';
    } else if (platformState.localAI.status === 'online') {
      answer = await sendLocalAiPrompt(question);
      source = `Ollama · ${platformState.localAI.model}`;
    } else {
      answer = localMentorFallback(question);
    }
  } catch (_) {
    try {
      if (platformState.localAI.status === 'online') {
        answer = await sendLocalAiPrompt(question);
        source = `Ollama · ${platformState.localAI.model}`;
      } else {
        answer = localMentorFallback(question);
      }
    } catch (error) {
      answer = localMentorFallback(question);
      source = 'Fallback local';
    }
  }
  typing?.classList.add('hidden');
  if (status) status.textContent = `Estado: ${window.CLOUD_AI_STATUS || 'local-pro'}`;
  appendMentorBubble('ai', source, answer);
  updatePlatformState(current => ({
    ...current,
    mentorHistory: [{ question: question.slice(0, 160), answer: answer.slice(0, 700), source, date: new Date().toISOString() }, ...current.mentorHistory].slice(0, 20)
  }));
}

const LEARNING_CHALLENGE_LIBRARY = {
  python: [
    ['Normalizador de eventos', 'Recibe una lista de eventos y muestra cuántos contienen “error” sin distinguir mayúsculas.', 'Salida: número entero y una frase de resumen.'],
    ['Validador de configuración', 'Crea una función que confirme si un diccionario contiene host, puerto y modo seguro.', 'Incluye al menos tres casos de prueba.']
  ],
  local_ai: [
    ['Prompt verificable', 'Diseña un prompt que pida explicar una función Python en entrada, proceso, salida y riesgos.', 'No incluyas datos sensibles.'],
    ['Fallback local', 'Modela una función que use una respuesta mock cuando Ollama no está disponible.', 'La app nunca debe romperse.']
  ],
  ethical: [
    ['Triage defensivo', 'Clasifica cinco logs ficticios en informativo, revisión o crítico.', 'Solo datos simulados; termina con recomendación.'],
    ['Reporte de laboratorio', 'Redacta alcance, evidencia, impacto, mitigación y re-test para un header ausente.', 'Objetivo: localhost o lab autorizado.']
  ],
  project: [
    ['Dashboard de estudio', 'Construye tarjetas para progreso, errores y próximo paso usando datos locales.', 'Incluye estados vacío, loading y error.'],
    ['Gestor de notas', 'Implementa crear, editar, borrar y filtrar notas con localStorage.', 'Valida texto vacío y longitud.']
  ]
};

function renderChallengeGenerator() {
  mainContainer.innerHTML = `
    <button class="os-back" onclick="renderView('home')">← COMMAND CENTER</button>
    <section class="os-feature-hero"><div><span class="os-eyebrow">CHALLENGE FACTORY</span><h1>Generador de retos</h1><p>Crea una práctica breve con objetivo, restricciones y criterio de éxito.</p></div>${learningOsPill('LOCAL', 'success')}</section>
    <section class="os-panel">
      <div class="os-form-grid">
        <label><span>Área</span><select id="challenge-area" class="os-select"><option value="python">Python</option><option value="local_ai">IA local</option><option value="ethical">Hacking ético / lab</option><option value="project">Proyecto</option></select></label>
        <label><span>Nivel</span><select id="challenge-level" class="os-select"><option value="Básico">Básico</option><option value="Intermedio">Intermedio</option><option value="Avanzado">Avanzado</option></select></label>
      </div>
      <button class="os-primary-action full" onclick="generateLearningChallenge()">GENERAR RETO</button>
    </section>
    <section class="os-panel" id="challenge-output"><p class="os-empty">Selecciona un área y genera tu siguiente práctica.</p></section>
    <div class="bottom-spacer"></div>`;
}

function generateLearningChallenge() {
  const area = document.getElementById('challenge-area')?.value || 'python';
  const level = document.getElementById('challenge-level')?.value || 'Básico';
  const options = LEARNING_CHALLENGE_LIBRARY[area] || LEARNING_CHALLENGE_LIBRARY.python;
  const index = (readPlatformState().challengeHistory.length + new Date().getDate()) % options.length;
  const [title, brief, criteria] = options[index];
  const challenge = { title, brief, criteria, level, area, date: new Date().toISOString() };
  document.getElementById('challenge-output').innerHTML = `
    <div class="os-panel-heading"><div><span>${escapeHtml(level.toUpperCase())}</span><h2>${escapeHtml(title)}</h2></div>${learningOsPill(area.replace('_', ' '), 'info')}</div>
    <p>${escapeHtml(brief)}</p>
    <div class="os-check-list"><span>Define entrada y salida.</span><span>Construye el caso mínimo.</span><span>${escapeHtml(criteria)}</span><span>Documenta un error corregido.</span></div>
    <button class="os-secondary-action" onclick="renderView('focus')">RESOLVER EN FOCUS</button>`;
  updatePlatformState(current => ({ ...current, challengeHistory: [challenge, ...current.challengeHistory].slice(0, 20) }));
}

function renderCodeAnalyzer() {
  mainContainer.innerHTML = `
    <button class="os-back" onclick="renderView('home')">← COMMAND CENTER</button>
    <section class="os-feature-hero"><div><span class="os-eyebrow">STATIC LEARNING REVIEW</span><h1>Analizador de código</h1><p>Detecta señales básicas y recibe recomendaciones locales. No ejecuta el código pegado.</p></div>${learningOsPill('NO EXECUTION', 'success')}</section>
    <section class="os-panel">
      <label class="os-field-label" for="code-analyzer-input">Código Python</label>
      <textarea id="code-analyzer-input" class="os-code-input" spellcheck="false" placeholder="def procesar(eventos):&#10;    ..."></textarea>
      <button class="os-primary-action full" onclick="analyzeStudentCode()">ANALIZAR LOCALMENTE</button>
      <p class="os-security-note">El análisis es heurístico y educativo. No reemplaza tests, linters ni revisión profesional.</p>
    </section>
    <section class="os-panel" id="code-analysis-output"><p class="os-empty">Pega un fragmento sin secretos y ejecuta el análisis.</p></section>
    <div class="bottom-spacer"></div>`;
}

function analyzeStudentCode() {
  const code = String(document.getElementById('code-analyzer-input')?.value || '');
  const output = document.getElementById('code-analysis-output');
  if (!code.trim()) {
    output.innerHTML = '<p class="os-empty">No hay código para analizar.</p>';
    return;
  }
  const findings = [];
  if (/\t/.test(code)) findings.push(['Formato', 'Usa espacios de forma consistente para evitar errores de indentación.']);
  if (/\bexcept\s*:/.test(code)) findings.push(['Errores', 'Evita except vacío; captura excepciones concretas y registra contexto.']);
  if (/\b(eval|exec)\s*\(/.test(code)) findings.push(['Seguridad', 'eval/exec aumenta riesgo. Prefiere parsers y estructuras explícitas.']);
  if (/(api[_-]?key|token|password)\s*=\s*['"][^'"]+/i.test(code)) findings.push(['Secretos', 'Parece haber una credencial en código. Muévela a configuración segura y rótala si es real.']);
  if (!/\bdef\s+\w+\s*\(/.test(code) && code.split('\n').length > 8) findings.push(['Arquitectura', 'Divide el flujo en funciones pequeñas con una responsabilidad.']);
  if (!/try\s*:/.test(code) && /(open\(|requests\.|json\.loads)/.test(code)) findings.push(['Resiliencia', 'Añade manejo explícito de errores para I/O o datos externos.']);
  if (!/#/.test(code)) findings.push(['Documentación', 'Agrega comentarios solo para decisiones no obvias o restricciones.']);
  if (!findings.length) findings.push(['Base sólida', 'No se detectaron señales básicas. Añade tests y valida casos límite.']);
  output.innerHTML = `
    <div class="os-panel-heading"><div><span>REVISIÓN LOCAL</span><h2>${findings.length} observaciones</h2></div>${learningOsPill('HEURÍSTICO', 'info')}</div>
    <div class="os-finding-list">${findings.map(([title, copy]) => `<article><span>${escapeHtml(title)}</span><p>${escapeHtml(copy)}</p></article>`).join('')}</div>`;
}

const ETHICAL_LABS = [
  ['Terminal Linux básico', 'Navegación, archivos, permisos y logs en entorno propio.'],
  ['Redes y HTTP', 'Puertos, DNS y peticiones desde localhost.'],
  ['OWASP conceptual', 'Riesgos, evidencia y mitigación sin payloads peligrosos.'],
  ['Juice Shop local', 'Laboratorio web deliberadamente vulnerable en 127.0.0.1.'],
  ['WebGoat local', 'Lecciones autorizadas dentro de un entorno controlado.'],
  ['Análisis de logs', 'Triage, patrones, severidad y reporte defensivo.'],
  ['Hardening', 'MFA, mínimos privilegios, parches, backups y visibilidad.']
];

function renderEthicalLabs() {
  const permissions = readPlatformState().labPermissions;
  mainContainer.innerHTML = `
    <button class="os-back" onclick="renderView('home')">← COMMAND CENTER</button>
    <section class="os-ethical-hero">
      <span class="os-eyebrow">ETHICAL HACKING LABS</span><h1>Aprender defensa sin cruzar límites.</h1>
      <p>Solo sistemas propios, localhost, CTF o entornos con autorización explícita. No se incluyen payloads, evasión, robo de credenciales ni automatización ofensiva.</p>
    </section>
    <section class="os-panel">
      <div class="os-panel-heading"><div><span>PERMISSION GATE</span><h2>Confirma el contexto</h2></div>${learningOsPill('OBLIGATORIO', 'danger')}</div>
      <div class="os-permission-list">
        ${[
          ['ownSystem', 'Es mi sistema o dispositivo.'],
          ['localhost', 'El objetivo es localhost / 127.0.0.1.'],
          ['ctf', 'Es un CTF o laboratorio diseñado para practicar.'],
          ['authorized', 'Tengo autorización explícita y alcance definido.']
        ].map(([key, label]) => `<label><input type="checkbox" data-lab-permission="${key}" ${permissions[key] ? 'checked' : ''}><span>${escapeHtml(label)}</span></label>`).join('')}
      </div>
      <p class="os-security-note">Marca únicamente condiciones verdaderas. Las herramientas de esta sección siguen limitadas a aprendizaje y destinos loopback.</p>
    </section>
    <section class="os-panel">
      <div class="os-panel-heading"><div><span>SAFE LABS</span><h2>Módulos defensivos</h2></div></div>
      <div class="os-lab-grid">${ETHICAL_LABS.map(([title, copy]) => `<article><span>LAB</span><strong>${escapeHtml(title)}</strong><p>${escapeHtml(copy)}</p></article>`).join('')}</div>
      <div class="os-panel-actions">
        <button class="os-secondary-action" onclick="openAuthorizedLocalLab('http://127.0.0.1:3000')">JUICE SHOP LOCAL</button>
        <button class="os-secondary-action" onclick="openAuthorizedLocalLab('http://127.0.0.1:8080/WebGoat')">WEBGOAT LOCAL</button>
      </div>
    </section>
    <section class="os-panel">
      <div class="os-panel-heading"><div><span>DEFENSIVE REPORT</span><h2>Plantilla de hallazgo</h2></div></div>
      <textarea id="defensive-report" class="os-textarea" readonly>Alcance: localhost / laboratorio autorizado
Activo:
Evidencia observada:
Impacto:
Severidad:
Mitigación:
Plan de re-test:
Limitaciones:</textarea>
      <button class="os-primary-action full" onclick="selectDefensiveReport()">SELECCIONAR PLANTILLA</button>
    </section>
    <div class="bottom-spacer"></div>`;
  document.querySelectorAll('[data-lab-permission]').forEach(input => input.addEventListener('change', saveLabPermissions));
}

function saveLabPermissions() {
  const permissions = {};
  document.querySelectorAll('[data-lab-permission]').forEach(input => {
    permissions[input.dataset.labPermission] = input.checked;
  });
  updatePlatformState(current => ({ ...current, labPermissions: permissions }));
}

function openAuthorizedLocalLab(target) {
  const permissions = readPlatformState().labPermissions;
  const allowedContext = Object.values(permissions).some(Boolean);
  if (!allowedContext) {
    if (typeof showToast === 'function') showToast('Confirma el contexto', 'Marca una condición válida antes de abrir un laboratorio');
    return;
  }
  try {
    const url = new URL(target);
    if (!['127.0.0.1', 'localhost', '::1'].includes(url.hostname)) throw new Error('Destino no permitido');
    window.open(url.href, '_blank', 'noopener,noreferrer');
  } catch (_) {
    if (typeof showToast === 'function') showToast('Destino bloqueado', 'Los accesos rápidos solo permiten localhost');
  }
}

function selectDefensiveReport() {
  const field = document.getElementById('defensive-report');
  field?.focus();
  field?.select();
  if (typeof showToast === 'function') showToast('Plantilla preparada', 'Completa solo con evidencia autorizada y sin datos sensibles');
}

function renderRoadmap() {
  const metrics = getLearningOsMetrics();
  const next = getCurrentChallenge();
  const platform = readPlatformState();
  const pendingMistake = (state.mistakes || [])[0];
  mainContainer.innerHTML = `
    <button class="os-back" onclick="renderView('home')">← COMMAND CENTER</button>
    <section class="os-feature-hero"><div><span class="os-eyebrow">PERSONAL ROADMAP</span><h1>Qué hacer ahora.</h1><p>Una prioridad por vez, basada en tu progreso local y objetivo declarado.</p></div>${learningOsPill(metrics.level.name, 'success')}</section>
    <section class="os-roadmap-stack">
      <article><span>01 · ESTUDIAR HOY</span><h2>${escapeHtml(next?.lesson?.title || 'Explorar una nueva ruta')}</h2><p>${escapeHtml(next?.lesson?.objective || platform.profile.goal)}</p><button onclick="openCurrentMission()">ABRIR MISIÓN</button></article>
      <article><span>02 · REPETIR</span><h2>${escapeHtml(pendingMistake?.title || 'Un concepto ya completado')}</h2><p>${escapeHtml(pendingMistake?.reason || 'Elige una misión completada y explica la solución sin mirar.')}</p><button onclick="renderView('review')">ABRIR ERROR LAB</button></article>
      <article><span>03 · CONSTRUIR</span><h2>Mini entrega verificable</h2><p>Convierte la habilidad de hoy en una función, script o tarjeta de dashboard con entrada y salida claras.</p><button onclick="renderView('challenges')">GENERAR PROYECTO</button></article>
      <article><span>04 · CORREGIR</span><h2>Documentar un error</h2><p>Registra causa, hipótesis, cambio aplicado y cómo comprobaste la solución.</p><button onclick="renderView('notes',{context:'errors'})">ABRIR NOTAS</button></article>
    </section>
    <div class="bottom-spacer"></div>`;
}

function formatFocusTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(rest).padStart(2, '0')}`;
}

function renderFocusMode() {
  const focus = readPlatformState().focus;
  if (!focusRunning) focusRemainingSeconds = Number(focus.duration || 25) * 60;
  mainContainer.innerHTML = `
    <button class="os-back" onclick="renderView('home')">← SALIR DE FOCUS</button>
    <section class="os-focus-shell">
      <span class="os-eyebrow">FOCUS MODE</span>
      <h1 id="focus-clock">${formatFocusTime(focusRemainingSeconds)}</h1>
      <input id="focus-goal" class="os-focus-goal" value="${escapeHtml(focus.goal)}" maxlength="100" aria-label="Objetivo de sesión">
      <div class="os-focus-presets">
        <button onclick="setFocusDuration(15)">15 MIN</button>
        <button onclick="setFocusDuration(25)">25 MIN</button>
        <button onclick="setFocusDuration(45)">45 MIN</button>
      </div>
      <div class="os-hero-actions">
        <button class="os-primary-action" onclick="startFocusTimer()">${focusRunning ? 'EN CURSO' : 'INICIAR'}</button>
        <button class="os-secondary-action" onclick="pauseFocusTimer()">PAUSAR</button>
        <button class="os-secondary-action" onclick="finishFocusSession()">CERRAR SESIÓN</button>
      </div>
      <p>Una tarea. Sin notificaciones. Cierra con evidencia y próximo paso.</p>
      <small>${focus.sessions} sesiones · ${focus.totalMinutes} minutos acumulados</small>
    </section>`;
}

function setFocusDuration(minutes) {
  if (focusRunning) return;
  focusRemainingSeconds = Number(minutes) * 60;
  updatePlatformState(current => ({ ...current, focus: { ...current.focus, duration: Number(minutes) } }));
  document.getElementById('focus-clock').textContent = formatFocusTime(focusRemainingSeconds);
}

function startFocusTimer() {
  if (focusRunning) return;
  const goal = String(document.getElementById('focus-goal')?.value || '').trim().slice(0, 100) || 'Completar una misión';
  updatePlatformState(current => ({ ...current, focus: { ...current.focus, goal } }));
  focusRunning = true;
  focusTimerId = setInterval(() => {
    focusRemainingSeconds = Math.max(0, focusRemainingSeconds - 1);
    const clock = document.getElementById('focus-clock');
    if (clock) clock.textContent = formatFocusTime(focusRemainingSeconds);
    if (focusRemainingSeconds === 0) finishFocusSession();
  }, 1000);
}

function pauseFocusTimer() {
  clearInterval(focusTimerId);
  focusTimerId = null;
  focusRunning = false;
}

function finishFocusSession() {
  const platform = readPlatformState();
  const planned = Number(platform.focus.duration || 25);
  const elapsed = Math.max(1, Math.round((planned * 60 - focusRemainingSeconds) / 60));
  pauseFocusTimer();
  updatePlatformState(current => ({
    ...current,
    focus: {
      ...current.focus,
      sessions: Number(current.focus.sessions || 0) + 1,
      totalMinutes: Number(current.focus.totalMinutes || 0) + elapsed
    }
  }));
  focusRemainingSeconds = planned * 60;
  if (typeof showToast === 'function') showToast('Sesión cerrada', `${elapsed} minutos registrados localmente`);
  renderFocusMode();
}

function renderSettings() {
  const platform = readPlatformState();
  const google = getGoogleOAuthStatus();
  const pwa = getPwaStatus();
  const ai = platform.localAI;
  mainContainer.innerHTML = `
    <button class="os-back" onclick="renderView('profile')">← PERFIL</button>
    <section class="os-feature-hero"><div><span class="os-eyebrow">SYSTEM SETTINGS</span><h1>Configuración</h1><p>Perfil, privacidad, cuenta, IA local y PWA desde un solo panel.</p></div>${learningOsPill(`V${PYSEC_PLATFORM_VERSION}`, 'success')}</section>
    <section class="os-grid os-grid-main">
      <article class="os-panel">
        <div class="os-panel-heading"><div><span>PERFIL</span><h2>Objetivo de aprendizaje</h2></div></div>
        <label class="os-field-label">Nombre visible<input id="settings-display-name" class="os-input" value="${escapeHtml(platform.profile.displayName)}" maxlength="50"></label>
        <label class="os-field-label">Nivel<select id="settings-level" class="os-select">
          <option value="beginner" ${platform.profile.level === 'beginner' ? 'selected' : ''}>Principiante</option>
          <option value="intermediate" ${platform.profile.level === 'intermediate' ? 'selected' : ''}>Intermedio</option>
          <option value="advanced" ${platform.profile.level === 'advanced' ? 'selected' : ''}>Avanzado</option>
        </select></label>
        <label class="os-field-label">Meta<input id="settings-goal" class="os-input" value="${escapeHtml(platform.profile.goal)}" maxlength="140"></label>
        <button class="os-primary-action full" onclick="saveLearningProfile()">GUARDAR PERFIL</button>
      </article>
      <article class="os-panel">
        <div class="os-panel-heading"><div><span>APARIENCIA</span><h2>Dark operational</h2></div></div>
        <p>La identidad principal usa negro profundo, verde para operación y rojo para alertas. Los temas avanzados se equipan desde la Tienda Elite.</p>
        <div class="os-panel-actions"><button class="os-primary-action" onclick="renderView('store')">ABRIR TIENDA ELITE</button><button class="os-secondary-action" onclick="toggleTheme()">MODO BASE</button><button class="os-secondary-action" onclick="renderView('rank')">VER NIVEL</button></div>
      </article>
    </section>
    <section class="os-panel">
      <div class="os-panel-heading"><div><span>LOCAL AI CORE</span><h2>Ollama</h2></div>${learningOsPill(ai.status === 'online' ? 'ONLINE' : ai.status.replace('_', ' '), ai.status === 'online' ? 'success' : 'warning')}</div>
      <div class="os-form-grid">
        <label><span>URL loopback</span><input id="local-ai-url" class="os-input" value="${escapeHtml(ai.url)}"></label>
        <label><span>Modelo</span><input id="local-ai-model" class="os-input" value="${escapeHtml(ai.model)}"></label>
      </div>
      <div class="os-panel-actions"><button class="os-primary-action" onclick="saveLocalAiSettings()">GUARDAR</button><button class="os-secondary-action" onclick="testLocalAiConnection().then(()=>renderSettings())">PROBAR CONEXIÓN</button></div>
      <p class="os-security-note">Solo se aceptan localhost, 127.0.0.1 o ::1. Los prompts no se envían a terceros por defecto.</p>
    </section>
    <section class="os-panel">
      <div class="os-panel-heading"><div><span>GOOGLE ACCOUNT</span><h2>${escapeHtml(google.label)}</h2></div>${learningOsPill(google.code, google.tone)}</div>
      <p>OAuth usa scopes mínimos: openid, email y profile. Esta versión no solicita ni almacena contraseñas.</p>
      ${platform.google.profile ? `<div class="os-account-card"><strong>${escapeHtml(platform.google.profile.name || '')}</strong><span>${escapeHtml(platform.google.profile.email || '')}</span></div>` : '<p class="os-empty">Sin cuenta vinculada. La sincronización cloud requiere backend seguro.</p>'}
      <div class="os-panel-actions"><button class="os-primary-action" onclick="beginGoogleConnect()">CONECTAR CON GOOGLE</button>${platform.google.profile ? '<button class="os-secondary-action" onclick="disconnectGoogleAccount()">DESCONECTAR</button>' : ''}</div>
    </section>
    <section class="os-panel">
      <div class="os-panel-heading"><div><span>PWA</span><h2>${escapeHtml(pwa.label)}</h2></div>${learningOsPill(navigator.onLine ? 'ONLINE' : 'OFFLINE', navigator.onLine ? 'success' : 'danger')}</div>
      <p>Instalable, con caché offline y preparada para empaquetado futuro con Capacitor.</p>
      <button class="os-primary-action" onclick="installPySecApp()">INSTALAR APP</button>
    </section>
    <section class="os-panel os-danger-zone">
      <div class="os-panel-heading"><div><span>PRIVACIDAD Y DATOS</span><h2>Control local</h2></div></div>
      <p>Exporta progreso antes de borrar. La eliminación limpia datos académicos locales; las claves de proveedores se administran en sus módulos.</p>
      <div class="os-panel-actions"><button class="os-secondary-action" onclick="exportProgressJSON()">EXPORTAR JSON</button><button class="os-danger-action" onclick="resetProgress()">BORRAR DATOS LOCALES</button></div>
    </section>
    <div class="bottom-spacer"></div>`;
}

const legacyRenderProfileV10 = window.renderProfile;
window.renderProfile = function renderLearningOsProfile() {
  legacyRenderProfileV10();
  const platform = readPlatformState();
  const google = getGoogleOAuthStatus();
  const insertion = `
    <section class="os-panel os-profile-operations">
      <div class="os-panel-heading"><div><span>OPERATIONS</span><h2>${escapeHtml(platform.profile.displayName)}</h2><p>${escapeHtml(platform.profile.goal)}</p></div>${learningOsPill(platform.profile.level, 'success')}</div>
      <div class="os-account-status-grid">
        <button onclick="renderView('mentor')"><span>LOCAL AI</span><strong>${platform.localAI.status === 'online' ? 'ONLINE' : 'OFFLINE'}</strong></button>
        <button onclick="renderView('settings')"><span>GOOGLE</span><strong>${escapeHtml(google.label)}</strong></button>
        <button onclick="renderView('focus')"><span>FOCUS</span><strong>${platform.focus.sessions} SESIONES</strong></button>
      </div>
      <div class="os-panel-actions"><button class="os-primary-action" onclick="renderView('store')">TIENDA ELITE</button><button class="os-secondary-action" onclick="renderView('settings')">CONFIGURACIÓN</button><button class="os-secondary-action" onclick="renderView('roadmap')">ROADMAP</button><button class="os-secondary-action" onclick="renderView('ethical-labs')">SAFE LABS</button></div>
    </section>`;
  document.querySelector('.profile-hero')?.insertAdjacentHTML('afterend', insertion);
};

window.renderNotesMode = function renderStudentNotes(context = 'general') {
  const notes = state.notes || [];
  const contexts = ['all', ...new Set(notes.map(note => note.context || 'general')), context].filter((item, index, array) => array.indexOf(item) === index);
  if (context !== 'general') activeNotesFilter = context;
  const visible = activeNotesFilter === 'all' ? notes : notes.filter(note => (note.context || 'general') === activeNotesFilter);
  mainContainer.innerHTML = `
    <button class="os-back" onclick="renderView('profile')">← PERFIL</button>
    <section class="os-feature-hero"><div><span class="os-eyebrow">STUDENT NOTES</span><h1>Cuaderno local</h1><p>Crea, edita, borra y filtra notas por módulo. Todo permanece en este navegador.</p></div>${learningOsPill(`${notes.length} NOTAS`, 'success')}</section>
    <section class="os-panel">
      <label class="os-field-label" for="note-context">Módulo<select id="note-context" class="os-select">${contexts.filter(item => item !== 'all').map(item => `<option value="${escapeHtml(item)}" ${item === context ? 'selected' : ''}>${escapeHtml(item)}</option>`).join('')}<option value="general" ${context === 'general' ? 'selected' : ''}>general</option></select></label>
      <textarea id="note-input" class="os-textarea" placeholder="Idea, error corregido, comando o próximo paso..."></textarea>
      <button class="os-primary-action full" onclick="saveStudentNote()">GUARDAR NOTA</button>
      <div class="os-filter-row">${contexts.map(item => `<button class="${activeNotesFilter === item ? 'active' : ''}" data-action="set-notes-filter" data-filter="${escapeHtml(item)}">${escapeHtml(item.toUpperCase())}</button>`).join('')}</div>
    </section>
    <section class="os-note-grid">
      ${visible.map(note => {
        const editing = editingNoteId === note.id;
        return `<article class="os-note-card">
          <div><span>${escapeHtml(note.context || 'general')}</span><small>${new Date(note.date).toLocaleString()}</small></div>
          ${editing ? `<textarea id="edit-note-${note.id}" class="os-textarea">${escapeHtml(note.text)}</textarea>` : `<p>${escapeHtml(note.text)}</p>`}
          <div class="os-panel-actions">${editing ? `<button class="os-primary-action" data-action="save-note-edit" data-id="${escapeHtml(note.id)}">GUARDAR</button>` : `<button class="os-secondary-action" data-action="edit-note" data-id="${escapeHtml(note.id)}">EDITAR</button>`}<button class="os-danger-action" data-action="delete-note" data-id="${escapeHtml(note.id)}" data-context="${escapeHtml(context)}">BORRAR</button></div>
        </article>`;
      }).join('') || '<article class="os-panel"><p class="os-empty">No hay notas para este filtro.</p></article>'}
    </section>
    <div class="bottom-spacer"></div>`;
};

function saveStudentNote() {
  const text = document.getElementById('note-input')?.value;
  const context = document.getElementById('note-context')?.value || 'general';
  if (addAgentNote(text, context)) {
    activeNotesFilter = context;
    if (typeof showToast === 'function') showToast('Nota guardada', 'Disponible offline');
    renderNotesMode(context);
  }
}

function setNotesFilter(filter) {
  activeNotesFilter = filter;
  editingNoteId = null;
  renderNotesMode('general');
}

function editStudentNote(id) {
  editingNoteId = id;
  renderNotesMode('general');
}

function saveStudentNoteEdit(id) {
  const text = String(document.getElementById(`edit-note-${id}`)?.value || '').trim();
  if (!text) return;
  const note = state.notes.find(item => item.id === id);
  if (note) {
    note.text = text.slice(0, 4000);
    note.updatedAt = new Date().toISOString();
    saveState();
  }
  editingNoteId = null;
  renderNotesMode('general');
}

document.addEventListener('DOMContentLoaded', () => {
  updatePlatformIndicators();
  setTimeout(() => testLocalAiConnection({ silent: true }), 1200);
});
