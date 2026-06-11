const CAREER_STAGES = [
  { id:'python_desde_cero', title:'Python Junior', icon:'🐍' },
  { id:'python_ciberseguridad', title:'Python Cyber', icon:'🛡️' },
  { id:'python_redes', title:'Redes Locales', icon:'🌐' },
  { id:'python_web', title:'Web/API Auditor', icon:'🕸️' },
  { id:'python_blue_team', title:'Blue Team Jr.', icon:'🔵' },
  { id:'python_avanzado', title:'Python Avanzado', icon:'🚀' },
  { id:'hacking_etico_python', title:'Ethical Hacker Jr.', icon:'🧑‍💻' },
  { id:'labs_hacking_etico', title:'Laboratorio Ético', icon:'🧪' },
  { id:'red_team_autorizado', title:'Purple Team Básico', icon:'🎯' },
  { id:'threat_defense_lab', title:'Threat Defender', icon:'🧬' },
  { id:'proyecto_final', title:'Proyecto Final', icon:'🏁' }
];

function shortTitle(title) {
  return title
    .replace('Python práctico para ciberseguridad','Python Cyber')
    .replace('Python para web y APIs','Web & APIs')
    .replace('Laboratorios de Hacking Ético','Laboratorios')
    .replace('Red Team básico autorizado','Red/Purple Team')
    .replace('Proyecto final PySec','Proyecto Final');
}


function compactDescription(text='') {
  return String(text)
    .replace('Fundamentos de Python con prácticas guiadas para empezar desde cero.', 'Fundamentos y práctica guiada desde cero.')
    .replace('Automatiza análisis de logs, reportes y tareas defensivas con datos simulados.', 'Logs, reportes y defensa con datos simulados.')
    .replace('IP, puertos, sockets y comprobaciones solo en localhost o laboratorios.', 'Redes, puertos y localhost en laboratorio.')
    .replace('HTTP, headers, JSON y APIs con respuestas simuladas y laboratorios locales.', 'HTTP, headers, JSON y APIs simuladas.')
    .replace('Análisis de logs, IOC, alertas y respuesta desde enfoque defensivo.', 'Logs, IOC, alertas y respuesta defensiva.')
    .replace('Funciones, errores, clases, archivos, módulos y automatización profesional.', 'Funciones, clases, archivos y automatización.')
    .replace('Metodología profesional, reconocimiento autorizado, OWASP conceptual, evidencias y reportes con prácticas seguras.', 'Recon autorizado, OWASP, evidencias y reportes.')
    .replace('Prácticas guiadas en laboratorio con reglas, evidencias, re-test y cierre seguro.', 'Labs guiados, evidencias y re-test seguro.')
    .replace('Simulaciones autorizadas, MITRE conceptual, matriz de detección y reportes Purple Team.', 'MITRE conceptual, detección y Purple Team.')
    .replace('Integra Python, ciberseguridad, hacking ético, defensa y documentación profesional.', 'Integra Python, cyber, defensa y reportes.')
    .replace('Amenazas reales entendidas desde defensa: cuentas, credenciales, phishing, malware, persistencia, fuga de datos e incidentes.', 'Amenazas reales vistas desde defensa y respuesta.');
}

function runtimePill() {
  return `<span class="pill green">Secure Worker</span><span class="pill">Sandbox local</span><span class="pill orange">Timeout 3.5s</span>`;
}

function getNextLessonForCourse(course) {
  const lessons = course.modules.flatMap(m => m.lessons);
  return lessons.find(l => !state.completedLessons.includes(l.id)) || lessons[0];
}

function renderHome() {
  const total = getTotalLessons();
  const completed = state.completedLessons.length;
  const percent = total ? Math.round((completed / total) * 100) : 0;
  const challenge = getCurrentChallenge();
  const rankInfo = typeof getRankInfo === 'function' ? getRankInfo(state.xp) : { current: { title: state.agentRank || 'Recluta' } };
  mainContainer.innerHTML = `
    <section class="hero-card premium-hero mission-os-hero">
      <span class="eyebrow">ETHICAL CYBER LEARNING OS · ${rankInfo.current.title.toUpperCase()}</span>
      <h1 class="hero-title">PySec Elite</h1>
      <span class="hero-kicker">Secure Cyber Lab</span>
      <span class="version-chip">v${typeof APP_VERSION !== 'undefined' ? APP_VERSION : '11.3.0'} · Learning OS</span>
      <p class="hero-subtitle">Entrena Python, defensa y hacking ético con misiones tácticas, agente IA local, CTF simulado y Threat Defense Lab.</p>
      <div class="hero-status-grid">
        ${chip(`${total} LABS`)}
        ${chip('AGENTE IA LOCAL', 'green')}
        ${chip('CTF SIMULADO')}
        ${chip('ACCIONES LIVE', 'green')}
        ${chip('MODO ÉTICO', 'green')}
      </div>
      <div class="progress-block"><div class="progress-label"><span>PROGRESO TOTAL</span><span>${percent}%</span></div>${progressBar(percent)}</div>
      <div class="metric-grid">${metricCard(`${completed}/${total}`, 'Labs', 'glow-blue')}${metricCard(state.xp, 'XP', 'glow-green')}${metricCard(state.certificates.length, 'Certificados', 'glow-purple')}</div>
      ${typeof renderRankStrip === 'function' ? renderRankStrip() : ''}
      <div class="btn-row compact-actions">${challenge ? actionButton('CONTINUAR ▶', `openLessonGuarded('${challenge.lesson.courseId}', '${challenge.lesson.id}')`, 'btn-primary') : ''}${actionButton('VER RUTA', `renderView('courses')`, 'btn-outline')}</div>
    </section>
    ${challenge ? renderChallengeCard(challenge) : ''}
    ${renderAgentHomePanel(challenge)}
    ${renderMarketPreview()}
    ${renderCTFPreview()}
    ${renderCareerPreview()}
  `;
}


function renderMarketPreview() {
  return `<section class="panel-card animated-card compact-panel">${sectionTitle('Finnhub Live Market', 'Nuevo')}<p class="hero-subtitle">Mapa de calor, watchlist y lectura de sectores con datos live/caché para practicar análisis de mercado.</p>${actionButton('ABRIR ACCIONES', `renderView('market')`, 'btn-outline', 'full')}</section>`;
}

function renderChallengeCard(challenge) {
  return `<section class="panel-card challenge-card animated-card">${sectionTitle('Reto recomendado', 'Siguiente')}<div class="challenge-body"><div class="challenge-icon">${challenge.course.icon}</div><div class="challenge-text"><h3>${escapeHtml(challenge.lesson.title)}</h3><p>${escapeHtml(challenge.lesson.objective)}</p><div class="chip-row">${chip(challenge.course.title)}${chip(`⚡ ${challenge.lesson.xp} XP`, 'orange')}${chip(`⏱ ${challenge.lesson.estimated_minutes} min`)}</div></div></div>${actionButton('ABRIR MISIÓN', `openLessonGuarded('${challenge.lesson.courseId}', '${challenge.lesson.id}')`, 'btn-success', 'full')}</section>`;
}

function renderCareerPreview() {
  return `<section class="panel-card animated-card">${sectionTitle('Modo Carrera', 'Ruta PySec')}<div class="career-track">${CAREER_STAGES.map(careerStageItem).join('')}</div></section>`;
}

function careerStageItem(stage, index) {
  const course = getCourse(stage.id);
  const stats = course ? getCourseStats(course) : { percent:0 };
  const status = stats.percent === 100 ? 'Completado' : stats.percent > 0 ? 'En progreso' : 'Disponible';
  return `<div class="career-stage ${stats.percent === 100 ? 'done' : stats.percent > 0 ? 'active' : ''}" onclick="renderView('course-detail',{courseId:'${stage.id}'})"><div class="career-index">${String(index + 1).padStart(2, '0')}</div><div class="career-icon">${stage.icon}</div><div class="career-body"><div class="career-top"><strong>${escapeHtml(stage.title)}</strong><span class="career-status-label">STATUS ${escapeHtml(status.toUpperCase())}</span></div><span class="career-progress-text">${stats.percent}% operativo</span>${progressBar(stats.percent)}</div></div>`;
}

function renderCourses() {
  mainContainer.innerHTML = `
    <section class="panel-card course-directory animated-card">
      <span class="eyebrow">Ruta académica móvil</span>
      ${sectionTitle('Cursos', `${COURSES.length} rutas`)}
      <p class="hero-subtitle">Avanza en orden, completa labs, aprueba exámenes y desbloquea certificados locales.</p>
      <input id="course-search" class="search-input" placeholder="Buscar curso o área..." autocomplete="off">
      <div class="filter-row"><button class="filter-chip active" data-filter="all">Todos</button><button class="filter-chip" data-filter="core">Core</button><button class="filter-chip" data-filter="ethical">Éticos</button></div>
      <div class="course-grid" id="course-list"></div>
    </section>`;
  setupCourseSearch();
}

function setupCourseSearch() {
  const search = document.getElementById('course-search');
  const list = document.getElementById('course-list');
  const filters = [...document.querySelectorAll('.filter-chip')];
  let active = 'all';
  const draw = () => {
    const q = (search.value || '').toLowerCase().trim();
    const filtered = COURSES.filter(course => {
      const matchesQuery = `${course.title} ${course.description} ${course.level}`.toLowerCase().includes(q);
      const matchesFilter = active === 'all' || (active === 'ethical' ? course.ethical : !course.ethical);
      return matchesQuery && matchesFilter;
    });
    list.innerHTML = filtered.map(createCourseCard).join('') || emptyState('No encontré cursos con ese filtro.');
  };
  filters.forEach(btn => btn.addEventListener('click', () => { active = btn.dataset.filter; filters.forEach(x => x.classList.toggle('active', x === btn)); draw(); }));
  search.addEventListener('input', draw);
  draw();
}

function createCourseCard(course) {
  const stats = getCourseStats(course);
  const exam = state.passedExams[course.id];
  return `<article class="course-card premium-course" onclick="renderView('course-detail', {courseId:'${course.id}'})"><div class="course-icon">${course.icon}</div><div class="course-info"><div class="card-topline"><span class="level-badge">${escapeHtml(course.level)}</span>${exam?.passed ? statusPill('Certificado','green') : course.ethical ? statusPill('Ético','orange') : statusPill('Core','green')}</div><h3>${escapeHtml(course.title)}</h3><p>${escapeHtml(compactDescription(course.description))}</p><div class="progress-inline">${progressBar(stats.percent)}<span>${stats.percent}%</span></div><div class="chip-row">${chip(`${stats.completed}/${stats.total} completadas`)}${chip(`Examen ${exam?.passed ? 'OK' : 'pendiente'}`)}</div></div></article>`;
}

function renderCourseDetail(courseId) {
  const course = getCourse(courseId); if (!course) return renderHome();
  const lessons = course.modules.flatMap(m => m.lessons);
  const stats = getCourseStats(course);
  const totalXp = lessons.reduce((sum, lesson) => sum + (lesson.xp || 0), 0);
  const locked = course.ethical && !state.acceptedEthics.includes(course.id);
  const next = getNextLessonForCourse(course);
  const exam = state.passedExams[course.id];
  const project = course.guidedLab || getCourseProject(course);
  mainContainer.innerHTML = `
    <button class="btn btn-outline back-btn" onclick="renderView('courses')">← VOLVER</button>
    <section class="welcome-card course-banner animated-card"><div class="course-head"><div class="course-icon big">${course.icon}</div><div><span class="eyebrow">${escapeHtml(course.level)}</span><h1>${escapeHtml(course.title)}</h1><p>${escapeHtml(course.description)}</p></div></div><div class="mini-grid"><div class="mini-card"><span>Progreso</span><strong>${stats.percent}%</strong></div><div class="mini-card"><span>Lecciones</span><strong>${stats.completed}/${stats.total}</strong></div><div class="mini-card"><span>XP total</span><strong>${totalXp}</strong></div><div class="mini-card"><span>Examen</span><strong>${exam?.passed ? 'OK' : 'Pendiente'}</strong></div></div>${progressBar(stats.percent)}<div class="chip-row runtime-row">${runtimePill()}</div>${locked ? '' : actionButton('CONTINUAR ESTE CURSO ▶', `openLessonGuarded('${course.id}', '${next.id}')`, 'btn-success', 'full continue-course-btn')}</section>
    ${course.ethical ? ethicalBox(course.id, locked) : ''}
    <section class="panel-card academic-card animated-card">${sectionTitle('Plan académico', 'Pro')}<div class="check-list"><span>🎯 Objetivo: completar laboratorios y quiz</span><span>📌 Prerrequisito: avanzar en orden recomendado</span><span>🧪 Proyecto: ${escapeHtml(project.title)}</span><span>🏅 Examen: aprobación mínima 70%</span></div><div class="btn-row">${actionButton('LAB GUIADO', `renderView('lab',{courseId:'${course.id}'})`, 'btn-outline')}${actionButton('EXAMEN', `renderView('exam',{courseId:'${course.id}'})`, 'btn-primary')}</div></section>
    ${renderCourseModules(course, locked)}
  `;
  setupModuleTabs(course, locked);
}

function ethicalBox(courseId, locked) {
  return `<section class="ethic-box"><strong>⚖️ Modo ético</strong><p>Practica únicamente en laboratorios propios, 127.0.0.1, entornos simulados o sistemas con autorización.</p>${locked ? actionButton('ACEPTO Y DESBLOQUEO', `acceptEthics('${courseId}')`, 'btn-outline', 'full') : statusPill('Aceptado','green')}</section>`;
}

function renderCourseModules(course, locked) {
  return `<section class="panel-card module-shell animated-card">${sectionTitle('Módulos', course.modules.length)}<input id="lesson-search" class="search-input" placeholder="Buscar lección dentro del curso..." autocomplete="off"><div class="module-tabs">${course.modules.map((m,i)=>`<button class="module-tab ${i===0?'active':''}" data-module="${m.id}">${i+1}</button>`).join('')}</div><div id="module-content"></div></section>`;
}

function setupModuleTabs(course, locked) {
  const tabs = [...document.querySelectorAll('.module-tab')];
  const search = document.getElementById('lesson-search');
  let activeId = course.modules[0]?.id;
  const draw = () => {
    const query = (search?.value || '').trim().toLowerCase();
    const activeModule = course.modules.find(m => m.id === activeId) || course.modules[0];
    const lessons = query ? course.modules.flatMap(m => m.lessons).filter(l => `${l.title} ${l.objective} ${l.exercise?.instruction || ''}`.toLowerCase().includes(query)) : activeModule.lessons;
    document.getElementById('module-content').innerHTML = `<div class="module-summary">${query ? `Resultados para: ${escapeHtml(query)}` : `Objetivo del módulo: dominar ${escapeHtml(activeModule.title.toLowerCase())} con teoría, práctica y quiz.`}</div><div class="lesson-list">${lessons.map(lesson => createLessonRow(course, lesson, locked)).join('') || emptyState('Sin resultados.')}</div>`;
  };
  tabs.forEach(btn => btn.addEventListener('click', () => { activeId = btn.dataset.module; tabs.forEach(b => b.classList.toggle('active', b === btn)); if (search) search.value = ''; draw(); }));
  if (search) search.addEventListener('input', draw);
  draw();
}

function createLessonRow(course, lesson, locked) {
  const done = state.completedLessons.includes(lesson.id);
  return `<article class="lesson-card premium-lesson" onclick="${locked ? `alert('Primero acepta el modo ético del curso.')` : `openLessonGuarded('${course.id}', '${lesson.id}')`}"><div class="lesson-status ${done ? 'done' : ''}">${done ? '✓' : '•'}</div><div class="course-info"><h3>${escapeHtml(lesson.title)}</h3><p>${escapeHtml(lesson.objective)}</p><div class="chip-row">${chip(`⏱ ${lesson.estimated_minutes} min`)}${chip(`⚡ ${lesson.xp} XP`, 'orange')}${state.completedQuizzes.includes(lesson.id) ? chip('Quiz OK','green') : chip('Quiz pendiente')}</div></div></article>`;
}

function renderLesson(courseId, lessonId) {
  const course = getCourse(courseId); const lesson = getLesson(courseId, lessonId); if (!course || !lesson) return renderHome();
  awardReadXP(lessonId);
  const lessons = course.modules.flatMap(m => m.lessons);
  const index = lessons.findIndex(l => l.id === lesson.id) + 1;
  const briefing = getMissionBriefing(course, lesson);
  mainContainer.innerHTML = `
    <button class="btn btn-outline back-btn" onclick="renderView('course-detail', {courseId:'${courseId}'})">← SALIR</button>
    <section class="panel-card mission-briefing animated-card">
      <span class="eyebrow">MISSION BRIEFING · ${escapeHtml(briefing.code)}</span>
      <h1>${escapeHtml(lesson.title)}</h1>
      <p class="hero-subtitle">${escapeHtml(lesson.objective)}</p>
      <div class="briefing-grid">
        <div><b>Skill</b><span>${escapeHtml(briefing.skill)}</span></div>
        <div><b>Riesgo</b><span>${escapeHtml(briefing.risk)}</span></div>
        <div><b>Entorno</b><span>${escapeHtml(briefing.environment)}</span></div>
        <div><b>XP</b><span>${lesson.xp} lab + 5 teoría</span></div>
      </div>
      <div class="ai-agent-card"><span>🤖 AGENTE IA LOCAL</span><p>${escapeHtml(briefing.agentHint)}</p></div>
      <div class="chip-row">${chip(`Lección ${index}/${lessons.length}`)}${chip('+5 XP teoría','green')}${chip(`Lab ${lesson.xp} XP`,'orange')}${chip(`⏱ ${lesson.estimated_minutes} min`)}</div>
      ${actionButton('INICIAR OPERACIÓN 💻', `openPracticeGuarded('${courseId}', '${lessonId}')`, 'btn-success', 'full top-practice')}
    </section>
    <section class="panel-card animated-card">
      <h3 class="section-subtitle">Teoría táctica</h3>
      <p class="theory-text">${escapeHtml(lesson.theory)}</p>${renderDeepTheory(lesson)}
      <div class="editor-wrapper"><div class="editor-header"><span>EJEMPLO.py</span><span>Referencia</span></div><pre class="code-view">${codeHtml(lesson.example_code)}</pre></div>
      <div class="explanation-list">${lesson.example_explanation.map(text => `<div class="explain-item"><span>▸</span><p>${escapeHtml(text)}</p></div>`).join('')}</div>
    </section><div class="bottom-spacer"></div>`;
}


function renderPractice(courseId, lessonId) {
  const course = getCourse(courseId); const lesson = getLesson(courseId, lessonId); if (!course || !lesson) return renderHome();
  const briefing = getMissionBriefing(course, lesson);
  mainContainer.innerHTML = `
    <button class="btn btn-outline back-btn" onclick="renderView('lesson', {courseId:'${courseId}', lessonId:'${lessonId}'})">← BRIEFING</button>
    <section class="panel-card practice-shell animated-card">
      ${sectionTitle(lesson.title, `⚡ ${lesson.xp} XP`)}
      <div class="chip-row">${chip(course.title)}${runtimePill()}</div>
      <div class="instruction-box"><strong>Instrucción:</strong><br>${escapeHtml(lesson.exercise.instruction)}</div>${renderGuidedChallenge(lesson)}
      <div class="ai-agent-card compact-agent"><span>🤖 AGENTE IA</span><p id="agent-hint">${escapeHtml(briefing.agentHint)}</p></div>
    </section>
    <section class="editor-wrapper premium-editor"><div class="editor-header"><span>main.py // secure lab</span><span>local simulation · safe execution</span></div><textarea id="code-editor" class="code-editor" spellcheck="false" autocapitalize="off" autocomplete="off">${escapeHtml(lesson.exercise.starter_code)}</textarea>${renderSymbolBars()}</section>
    <div class="btn-row practice-actions"><button class="btn btn-success" id="run-btn">▶ EJECUTAR</button><button class="btn btn-outline" id="hint-btn">💡 IA PISTA</button><button class="btn btn-outline" id="analyze-btn">🧠 IA ANALIZAR</button><button class="btn btn-outline" id="solution-btn">👁 SOLUCIÓN</button><button class="btn btn-outline" id="reset-btn">↺ REINICIAR</button></div>
    <div class="console-output" id="console">[local simulation] safe execution ready...</div>
    <div class="lesson-note-box"><strong>Notas de esta misión</strong><textarea id="lesson-note" class="note-input small" placeholder="Guarda una idea o error aprendido..."></textarea><button class="btn btn-outline full" id="save-lesson-note">GUARDAR NOTA</button></div>
    <div id="feedback-area" class="hidden"></div><section id="quiz-area" class="panel-card hidden"></section><button id="next-lesson-btn" class="btn btn-primary hidden full next-btn">SIGUIENTE MISIÓN →</button><div class="bottom-spacer"></div>`;
  document.getElementById('run-btn').addEventListener('click', () => runPythonSimulation(document.getElementById('code-editor').value, lesson, courseId));
  document.getElementById('hint-btn').addEventListener('click', () => {
    const code = document.getElementById('code-editor').value;
    const hint = getAgentHint(code, lesson, 'practice');
    document.getElementById('agent-hint').textContent = hint;
    showFeedback('warn','🤖 Agente IA local',hint);
  });

  document.getElementById('analyze-btn').addEventListener('click', () => {
    const code = document.getElementById('code-editor').value;
    const consoleText = document.getElementById('console')?.textContent || '';
    const review = getPedagogicalReview(code, lesson, consoleText, lesson.exercise.expected_output);
    const text = formatAgentReview(review);
    document.getElementById('agent-hint').textContent = review.nextAction;
    showFeedback('warn','🧠 Análisis IA táctico', text);
  });
  document.getElementById('solution-btn').addEventListener('click', () => { document.getElementById('code-editor').value = lesson.exercise.solution; showFeedback('warn','👁 Solución cargada','Ejecuta la solución para estudiar el resultado.'); });
  document.getElementById('reset-btn').addEventListener('click', () => { document.getElementById('code-editor').value = lesson.exercise.starter_code || ''; showFeedback('warn','↺ Editor reiniciado','Se restauró el código inicial.'); });
  document.getElementById('next-lesson-btn').addEventListener('click', () => goNextLesson(courseId, lessonId));
  document.getElementById('save-lesson-note').addEventListener('click', () => {
    const text = document.getElementById('lesson-note').value;
    if (addAgentNote(text, `lesson:${lesson.id}`)) { showToast('📝 Nota de misión guardada','Disponible en Agente > Notas'); document.getElementById('lesson-note').value = ''; }
  });
}



function renderDeepTheory(lesson) {
  if (!lesson.deep_theory) return '';
  const d = lesson.deep_theory;
  const items = [
    ['Concepto', d.concept],
    ['Uso cyber', d.cyber_use],
    ['Error común', d.common_mistake],
    ['Método de estudio', d.study_tip]
  ].filter(([,v]) => v);
  return `<div class="deep-theory-grid">${items.map(([label,text]) => `<article class="deep-theory-card"><span>${escapeHtml(label)}</span><p>${escapeHtml(text)}</p></article>`).join('')}</div>${lesson.learning_path ? `<div class="learning-path-mini"><strong>Ruta mental:</strong>${lesson.learning_path.map(step => `<em>${escapeHtml(step)}</em>`).join('')}</div>` : ''}`;
}

function renderGuidedChallenge(lesson) {
  const ex = lesson.exercise || {};
  const steps = ex.guided_steps || [];
  const criteria = ex.success_criteria || [];
  if (!steps.length && !criteria.length && !ex.scenario) return '';
  return `<section class="guided-challenge"><div class="guided-head"><span>🎯 ${escapeHtml(ex.challenge_level || 'Reto guiado')}</span><small>aprendizaje paso a paso</small></div>${ex.scenario ? `<p class="guided-scenario">${escapeHtml(ex.scenario)}</p>` : ''}${steps.length ? `<div class="guided-list"><strong>Pasos</strong>${steps.map(step => `<p>${escapeHtml(step)}</p>`).join('')}</div>` : ''}${criteria.length ? `<div class="criteria-list"><strong>Criterios de éxito</strong>${criteria.map(item => `<p>✓ ${escapeHtml(item)}</p>`).join('')}</div>` : ''}</section>`;
}

function renderGlossaryMode() {
  const groups = (GLOSSARY || []).reduce((acc, item) => { (acc[item.category] = acc[item.category] || []).push(item); return acc; }, {});
  mainContainer.innerHTML = `<button class="btn btn-outline back-btn" onclick="renderView('profile')">← AGENTE</button><section class="panel-card animated-card"><span class="eyebrow">Glosario táctico</span><h1>Conceptos Cyber</h1><p class="hero-subtitle">Consulta definiciones clave para Python, hacking ético, Blue Team, Threat Defense y laboratorios seguros.</p><input id="glossary-search" class="search-input" placeholder="Buscar IOC, MFA, OWASP, phishing..." autocomplete="off"></section><div id="glossary-content"></div><div class="bottom-spacer"></div>`;
  const input = document.getElementById('glossary-search');
  const content = document.getElementById('glossary-content');
  const draw = () => {
    const q = (input.value || '').toLowerCase().trim();
    const filtered = (GLOSSARY || []).filter(item => `${item.term} ${item.category} ${item.definition} ${item.example}`.toLowerCase().includes(q));
    const grouped = filtered.reduce((acc, item) => { (acc[item.category] = acc[item.category] || []).push(item); return acc; }, {});
    content.innerHTML = Object.entries(grouped).map(([category, items]) => `<section class="panel-card glossary-section"><div class="section-title"><h2>${escapeHtml(category)}</h2><span class="pill">${items.length}</span></div>${items.map(item => `<article class="glossary-card"><strong>${escapeHtml(item.term)}</strong><p>${escapeHtml(item.definition)}</p><small>Ejemplo: ${escapeHtml(item.example)}</small></article>`).join('')}</section>`).join('') || `<section class="panel-card">${emptyState('No encontré ese concepto en el glosario.')}</section>`;
  };
  input.addEventListener('input', draw);
  draw();
}

function renderSymbolBars() {
  const symbols = ['TAB',':','(',')','[',']','{','}','"','\'','=','_','.'];
  const snippets = ['print()','input()','if ','else:','for ','while ','def ','import '];
  return `<div class="symbol-bar">${symbols.map(s => `<button class="symbol-btn" onclick="insertEncoded('${encodeURIComponent(s === 'TAB' ? '    ' : s)}')">${escapeHtml(s)}</button>`).join('')}</div><div class="symbol-bar">${snippets.map(s => `<button class="symbol-btn hotkey-btn" onclick="insertEncoded('${encodeURIComponent(s)}')">${escapeHtml(s)}</button>`).join('')}</div>`;
}
function insertEncoded(text) { insertCode(decodeURIComponent(text)); }
function insertCode(text) { const editor = document.getElementById('code-editor'); const start = editor.selectionStart; const end = editor.selectionEnd; editor.value = editor.value.slice(0,start) + text + editor.value.slice(end); editor.focus(); const pos = start + (text.endsWith('()') ? text.length - 1 : text.length); editor.selectionStart = editor.selectionEnd = pos; }

async function runPythonSimulation(code, lesson, courseId) {
  const consoleEl = document.getElementById('console');
  const feedbackEl = document.getElementById('feedback-area');
  const runBtn = document.getElementById('run-btn');
  const agentHint = document.getElementById('agent-hint');
  consoleEl.textContent = '[local simulation] Ejecutando en safe execution...\n';
  feedbackEl.classList.add('hidden');
  if (agentHint) agentHint.textContent = getAgentHint(code, lesson, 'practice');
  runBtn.disabled = true; runBtn.textContent = '⏳ EJECUTANDO...';
  try {
    const result = await runPythonSafe(code);
    const output = String(result?.output ?? '');
    if (!result || !result.ok) {
      const advice = result?.friendly || getAgentHint(code, lesson, 'practice', output);
      consoleEl.textContent += `\n${result?.error || 'Error desconocido del simulador'}`;
      if (agentHint) agentHint.textContent = advice;
      showFeedback('error','🤖 Agente IA · error explicado',advice);
      return;
    }
    consoleEl.textContent = output || '> Script ejecutado correctamente sin salida.';
    const passed = validateExercise(code, output, lesson.exercise);
    if (passed) completeLesson(lesson, courseId);
    else {
      const details = buildAgentDiagnosis(code, output, lesson.exercise.expected_output, lesson);
      recordMistake({ courseId, lessonId: lesson.id, title: lesson.title, code, reason: details });
      if (agentHint) agentHint.textContent = getAgentHint(code, lesson, 'practice', output);
      showFeedback('warn','🤖 Agente IA · salida incorrecta',details);
    }
  } catch (error) {
    consoleEl.textContent += `\n${error?.message || error}`;
    showFeedback('error','Error explicado','Ocurrió un error interno del simulador. Recarga e intenta de nuevo.');
  } finally { runBtn.disabled = false; runBtn.textContent = '▶ EJECUTAR'; }
}


function completeLesson(lesson, courseId) {
  const isNew = !state.completedLessons.includes(lesson.id);
  if (isNew) { state.completedLessons.push(lesson.id); addXP(lesson.xp); checkBadges(lesson.id); showToast('✅ Misión completada', `+${lesson.xp} XP`); }
  const debrief = getDebriefPayload(lesson, courseId);
  showMissionDebrief(debrief, isNew);
  renderQuiz(lesson);
  document.getElementById('next-lesson-btn').classList.remove('hidden');
}


function renderQuiz(lesson) {
  if (!lesson.quiz) return;
  const area = document.getElementById('quiz-area');
  area.classList.remove('hidden');
  area.innerHTML = `<span class="eyebrow">Quiz de escenario</span>${lesson.quiz.scenario ? `<div class="scenario-box"><strong>Escenario:</strong><p>${escapeHtml(lesson.quiz.scenario)}</p></div>` : ''}<h3>${escapeHtml(lesson.quiz.question)}</h3><div class="quiz-options">${lesson.quiz.options.map(opt => `<button class="btn btn-outline quiz-option" data-option="${escapeHtml(opt)}">${escapeHtml(opt)}</button>`).join('')}</div><p id="quiz-feedback"></p>`;
  area.querySelectorAll('.quiz-option').forEach(btn => btn.addEventListener('click', () => answerQuiz(lesson.id, btn.dataset.option, lesson.quiz.answer)));
}
function answerQuiz(lessonId, selected, answer) {
  document.querySelectorAll('.quiz-option').forEach(btn => { btn.disabled = true; if (btn.dataset.option === answer) btn.classList.add('correct'); if (btn.dataset.option === selected && selected !== answer) btn.classList.add('wrong'); });
  const feedback = document.getElementById('quiz-feedback');
  if (selected === answer) { if (!state.completedQuizzes.includes(lessonId)) { state.completedQuizzes.push(lessonId); addXP(15); showToast('🧠 Quiz correcto', '+15 XP'); } feedback.textContent = 'Correcto. +15 XP de quiz.'; feedback.style.color = 'var(--success)'; }
  else { feedback.textContent = `Respuesta correcta: ${answer}.`; feedback.style.color = 'var(--warning)'; }
}
function showFeedback(type, title, message) { const el = document.getElementById('feedback-area'); el.className = `feedback ${type}`; el.innerHTML = `<strong>${escapeHtml(title)}</strong><p style="white-space:pre-wrap">${escapeHtml(message)}</p>`; el.classList.remove('hidden'); }
function showToast(title, message='') { const old = document.querySelector('.toast'); if (old) old.remove(); const el = document.createElement('div'); el.className = 'toast'; el.innerHTML = `<strong>${escapeHtml(title)}</strong><span>${escapeHtml(message)}</span>`; document.body.appendChild(el); setTimeout(()=>el.classList.add('show'), 20); setTimeout(()=>{ el.classList.remove('show'); setTimeout(()=>el.remove(), 250); }, 2600); }


function renderAgentHomePanel(challenge) {
  const info = typeof getRankInfo === 'function' ? getRankInfo(state.xp) : { current: { title: state.agentRank || 'Recluta' }, next: null, xpToNext: 0 };
  const next = challenge?.lesson?.title || 'Ruta completada';
  return `<section class="panel-card ai-command-center animated-card">${sectionTitle('Agente IA Local', 'offline')}<div class="ai-agent-card"><span>🤖 PYSEC AGENT</span><p>Rango actual: ${escapeHtml(info.current.title)}. Próximo objetivo recomendado: ${escapeHtml(next)}. Analizo tus errores, sugiero pistas y guardo repaso sin enviar datos fuera del dispositivo.</p></div>${typeof renderRankStrip === 'function' ? renderRankStrip() : ''}</section>`;
}

function showMissionDebrief(payload, isNew) {
  const el = document.getElementById('feedback-area');
  el.className = 'feedback success mission-debrief';
  el.innerHTML = `
    <strong>✅ MISIÓN COMPLETADA</strong>
    <div class="debrief-grid">
      <span><b>XP</b>+${isNew ? payload.xp : 0}</span>
      <span><b>Skill</b>${escapeHtml(payload.skill)}</span>
      <span><b>Siguiente</b>${escapeHtml(payload.nextTitle)}</span>
    </div>
    <p>Agente IA: buen trabajo. La salida fue validada y la misión queda registrada en tu ruta.</p>
    <div class="btn-row"><button class="btn btn-primary" onclick="renderView('lesson',{courseId:'${payload.nextCourseId}',lessonId:'${payload.nextLessonId}'})">SIGUIENTE OBJETIVO</button><button class="btn btn-outline" onclick="renderView('courses')">VER RUTAS</button></div>`;
  el.classList.remove('hidden');
}

const CTF_CHALLENGES = [
  { id:'ctf_login', title:'CTF 01 · Login sospechoso', skill:'Account Takeover Defense', prompt:'Detecta múltiples fallos de login en eventos simulados.', answer:'Posible riesgo de cuenta', code:"eventos = ['login failed admin','login failed admin','login success admin']\nfallos = 0\nfor e in eventos:\n    if 'failed' in e:\n        fallos += 1\nif fallos >= 2:\n    print('Posible riesgo de cuenta')" },
  { id:'ctf_route', title:'CTF 02 · Ruta sensible', skill:'Web Security', prompt:'Encuentra una ruta administrativa en una lista simulada.', answer:'Ruta sensible detectada', code:"rutas = ['/home','/login','/admin']\nif '/admin' in rutas:\n    print('Ruta sensible detectada')" },
  { id:'ctf_ioc', title:'CTF 03 · IOC simulado', skill:'Threat Defense', prompt:'Cuenta dos indicadores ficticios de compromiso.', answer:'2', code:"iocs = ['hash_demo','dominio.test']\nprint(len(iocs))" },
  { id:'ctf_report', title:'CTF 04 · Reporte ejecutivo', skill:'Incident Response', prompt:'Genera una línea de cierre defensivo.', answer:'Incidente simulado | impacto medio | acción: MFA', code:"print('Incidente simulado | impacto medio | acción: MFA')" }
];

function renderCTFPreview() {
  const done = (state.completedCTF || []).length;
  return `<section class="panel-card ctf-card animated-card">${sectionTitle('CTF Simulado', `${done}/${CTF_CHALLENGES.length}`)}<p class="hero-subtitle">Retos seguros de laboratorio con flags conceptuales, defensa y reporte.</p>${actionButton('ABRIR CTF LAB', `renderView('ctf')`, 'btn-success', 'full')}</section>`;
}

function renderCTFMode() {
  mainContainer.innerHTML = `<button class="btn btn-outline back-btn" onclick="renderView('home')">← BASE</button><section class="panel-card animated-card"><span class="eyebrow">CTF SIMULADO · DEFENSE FIRST</span><h1>Cyber Mini Challenges</h1><p class="hero-subtitle">No hay ataques reales. Son escenarios ficticios para practicar detección, análisis y reporte.</p></section>${CTF_CHALLENGES.map(c => renderCTFChallenge(c)).join('')}<div class="bottom-spacer"></div>`;
}

function renderCTFChallenge(challenge) {
  const done = (state.completedCTF || []).includes(challenge.id);
  const inputId = `ctf-input-${challenge.id}`;
  return `<section class="panel-card ctf-challenge ${done ? 'done' : ''}"><div class="card-topline"><span class="level-badge">${escapeHtml(challenge.skill)}</span>${done ? statusPill('Flag OK','green') : statusPill('Pendiente','orange')}</div><h3>${escapeHtml(challenge.title)}</h3><p class="hero-subtitle">${escapeHtml(challenge.prompt)}</p><pre class="code-view">${codeHtml(challenge.code)}</pre><label class="field-label" for="${inputId}">Flag / salida esperada</label><input id="${inputId}" class="ctf-input" placeholder="Escribe la salida exacta del reto" value="${done ? escapeHtml(challenge.answer) : ''}" ${done ? 'disabled' : ''}><button class="btn ${done ? 'btn-outline' : 'btn-success'} full" onclick="completeCTF('${challenge.id}')">${done ? 'COMPLETADO' : 'VALIDAR FLAG'}</button><small class="microcopy">Pista: ejecuta mentalmente el código y escribe la salida que produciría.</small></section>`;
}

function completeCTF(id) {
  const challenge = CTF_CHALLENGES.find(item => item.id === id);
  if (!challenge) return;
  if ((state.completedCTF || []).includes(id)) return renderCTFMode();
  const input = document.getElementById(`ctf-input-${id}`);
  const answer = String(input?.value || '').trim();
  const expected = String(challenge.answer || '').trim();
  const normalize = typeof softNormalize === 'function' ? softNormalize : value => String(value || '').trim().toLowerCase();
  if (!answer || normalize(answer) !== normalize(expected)) {
    if (input) input.classList.add('input-error');
    showToast('⚠️ Flag incorrecta', 'Ejecuta mentalmente el código y compara la salida exacta');
    return;
  }
  state.completedCTF.push(id);
  addXP(25);
  unlockBadge('ctf_operator');
  showToast('🏁 CTF completado', '+25 XP');
  renderCTFMode();
}

function normalizeCloudQuizQuestions(items = []) {
  return (Array.isArray(items) ? items : []).filter(q => q && Array.isArray(q.options) && q.options.length === 4 && Number.isInteger(q.correct) && q.correct >= 0 && q.correct <= 3).slice(0, 5).map((q, index) => ({
    id: `cloud_${Date.now()}_${index}`,
    quiz: {
      question: String(q.question || '').slice(0, 240),
      options: q.options.map(opt => String(opt || '').slice(0, 160)),
      answer: String(q.options[q.correct] || ''),
      explanation: String(q.explanation || 'Revisa la teoría del curso y compara la opción correcta con el objetivo de la pregunta.').slice(0, 500),
      cloudCorrectIndex: q.correct
    }
  })).filter(item => item.quiz.question && item.quiz.answer);
}

function renderCourseExam(courseId, mode = 'local') {
  const course = getCourse(courseId); if (!course) return renderCourses();
  const localQuestions = getCourseExam(course);
  const exam = state.passedExams[courseId];
  const storedKey = `pysec_cloud_exam_${courseId}`;
  let questions = localQuestions;
  let sourceLabel = 'Banco local';
  if (mode === 'cloud') {
    try {
      const parsed = JSON.parse(sessionStorage.getItem(storedKey) || '[]');
      const normalized = normalizeCloudQuizQuestions(parsed);
      if (normalized.length) {
        questions = normalized;
        sourceLabel = 'Local Pro';
      }
    } catch (_) {}
  }
  mainContainer.innerHTML = `<button class="btn btn-outline back-btn" onclick="renderView('course-detail',{courseId:'${courseId}'})">← VOLVER</button>
    <section class="panel-card animated-card exam-command-card">
      <span class="eyebrow">Examen del curso · ${escapeHtml(sourceLabel)}</span>
      <h1>${escapeHtml(course.title)}</h1>
      <p class="hero-subtitle">Responde ${questions.length} preguntas. Necesitas 70% para aprobar y obtener certificado local.</p>
      ${exam ? `<div class="result-card ${exam.passed ? 'success' : 'warn'}"><strong>Último resultado: ${exam.percent}%</strong><span>${exam.passed ? 'Aprobado' : 'No aprobado'}</span></div>` : ''}
      <div class="btn-row exam-ai-row">
        <button class="btn btn-primary" type="button" onclick="generateAiCourseExam('${courseId}')">GENERAR EXAMEN LOCAL PRO</button>
        <button class="btn btn-outline" type="button" onclick="renderCourseExam('${courseId}','local')">USAR EXAMEN LOCAL</button>
      </div>
      <p class="os-security-note">El examen se genera con plantillas inteligentes locales. No usa API, no consume créditos y funciona sin backend.</p>
    </section>
    <form id="exam-form" data-exam-source="${escapeHtml(sourceLabel)}">
      ${questions.map((lesson, i) => `<section class="panel-card exam-question"><h3>${i + 1}. ${escapeHtml(lesson.quiz.question)}</h3>${lesson.quiz.options.map(opt => `<label class="exam-option"><input type="radio" name="q${i}" value="${escapeHtml(opt)}"> ${escapeHtml(opt)}</label>`).join('')}<p class="exam-explanation hidden" id="exam-exp-${i}">${escapeHtml(lesson.quiz.explanation || '')}</p></section>`).join('')}
      <button class="btn btn-primary full" type="submit">ENTREGAR EXAMEN</button><div class="bottom-spacer"></div>
    </form>`;
  document.getElementById('exam-form').addEventListener('submit', event => {
    event.preventDefault();
    let score = 0;
    questions.forEach((lesson, i) => {
      const selected = document.querySelector(`input[name="q${i}"]:checked`)?.value;
      const correct = selected === lesson.quiz.answer;
      if (correct) score++;
      const exp = document.getElementById(`exam-exp-${i}`);
      if (exp) {
        exp.classList.remove('hidden');
        exp.innerHTML = `<strong>${correct ? 'Correcto' : 'Revisar'}:</strong> ${escapeHtml(lesson.quiz.explanation || `Respuesta correcta: ${lesson.quiz.answer}`)}`;
      }
    });
    const result = passExam(courseId, score, questions.length);
    showToast(result.passed ? '🏅 Examen aprobado' : '📘 Sigue repasando', `${result.percent}%`);
    const form = document.getElementById('exam-form');
    form.querySelectorAll('input, button[type="submit"]').forEach(el => { el.disabled = true; });
    const summary = document.createElement('section');
    summary.className = `panel-card result-card ${result.passed ? 'success' : 'warn'}`;
    summary.innerHTML = `<strong>Resultado: ${result.percent}%</strong><span>${score}/${questions.length} correctas · ${result.passed ? 'Certificado desbloqueado' : 'Repite la teoría y vuelve a intentar'}</span><button class="btn btn-outline full" onclick="renderCourseExam('${courseId}')">REINTENTAR</button>`;
    form.appendChild(summary);
  });
}

async function generateAiCourseExam(courseId) {
  const course = getCourse(courseId); if (!course) return;
  const buttonText = 'Generando examen personalizado...';
  if (typeof showToast === 'function') showToast('Local Mentor Pro', buttonText);
  const lessons = (course.modules || []).flatMap(module => module.lessons || []).filter(lesson => state.completedLessons.includes(lesson.id) || state.readLessons.includes(lesson.id)).slice(-12);
  const sourceLessons = lessons.length ? lessons : (course.modules || []).flatMap(module => module.lessons || []).slice(0, 8);
  try {
    const rankInfo = typeof getRankInfo === 'function' ? getRankInfo(state.xp) : null;
    const difficulty = rankInfo?.current?.title || course.level || 'intermedio';
    const quiz = typeof generateQuizCloud === 'function' ? await generateQuizCloud(course.title, sourceLessons, difficulty) : [];
    const normalized = normalizeCloudQuizQuestions(quiz);
    if (!normalized.length) throw new Error('Sin preguntas IA válidas');
    sessionStorage.setItem(`pysec_cloud_exam_${courseId}`, JSON.stringify(quiz));
    if (typeof showToast === 'function') showToast('Examen local listo', `${normalized.length} preguntas personalizadas`);
    renderCourseExam(courseId, 'cloud');
  } catch (_) {
    if (typeof showToast === 'function') showToast('Generador local activo', 'Usando examen local seguro');
    renderCourseExam(courseId, 'local');
  }
}

function renderCertificate(courseId) {
  const course = getCourse(courseId);
  const cert = state.certificates.find(c => c.courseId === courseId);
  const data = cert ? normalizeCertificate(cert) : {
    id: 'Pendiente',
    courseId,
    courseTitle: course?.title || 'Curso',
    score: 0,
    total: getCourseExam(course || { modules: [] }).length,
    percent: 0,
    level: course?.level || 'Sin nivel',
    status: 'Pendiente',
    approved: false,
    date: null,
    issuer: 'PySec Academy Elite'
  };
  const dateLabel = data.date ? new Date(data.date).toLocaleDateString() : 'Pendiente';
  mainContainer.innerHTML = `
    <button class="btn btn-outline back-btn no-print" onclick="renderView('profile')">← PERFIL</button>
    <section class="certificate-card printable-certificate">
      <span class="eyebrow">Certificado local</span>
      <h1>${escapeHtml(data.courseTitle)}</h1>
      <p>Emitido por ${escapeHtml(data.issuer)}</p>
      <strong>${data.percent}%</strong>
      <div class="certificate-status ${data.approved ? 'approved' : 'pending'}">${escapeHtml(data.status)}</div>
      <div class="certificate-meta">
        <span><b>ID local</b>${escapeHtml(data.id)}</span>
        <span><b>Fecha</b>${escapeHtml(dateLabel)}</span>
        <span><b>Curso</b>${escapeHtml(data.courseTitle)}</span>
        <span><b>Puntaje</b>${escapeHtml(`${data.score}/${data.total}`)}</span>
        <span><b>Nivel</b>${escapeHtml(data.level)}</span>
      </div>
      <button class="btn btn-primary certificate-print no-print" onclick="window.print()">IMPRIMIR CERTIFICADO</button>
    </section>`;
}

function renderGuidedLab(courseId) {
  const course = getCourse(courseId); if (!course) return renderCourses();
  const project = course.guidedLab || getCourseProject(course);
  const done = state.completedLabs.includes(courseId);
  mainContainer.innerHTML = `<button class="btn btn-outline back-btn" onclick="renderView('course-detail',{courseId:'${courseId}'})">← VOLVER</button><section class="panel-card animated-card"><span class="eyebrow">Lab por pasos</span><h1>${escapeHtml(project.title)}</h1><p class="hero-subtitle">Completa el flujo profesional del curso: teoría, práctica, evidencia y cierre.</p></section><section class="panel-card lab-steps">${project.steps.map((step,i)=>`<div class="lab-step"><strong>${i+1}</strong><p>${escapeHtml(step)}</p></div>`).join('')}</section><button class="btn btn-success full" onclick="completeGuidedLab('${courseId}'); showToast('🧪 Lab guiado completado','+60 XP'); renderView('course-detail',{courseId:'${courseId}'})">${done ? 'LAB YA COMPLETADO' : 'MARCAR LAB COMPLETADO'}</button><div class="bottom-spacer"></div>`;
}

function renderReviewMode() {
  const items = state.mistakes || [];
  mainContainer.innerHTML = `<button class="btn btn-outline back-btn" onclick="renderView('profile')">← PERFIL</button><section class="panel-card animated-card"><span class="eyebrow">Modo repaso</span><h1>Errores y prácticas fallidas</h1><p class="hero-subtitle">Aquí aparecen tus últimos errores para que puedas corregirlos y repetir la lección.</p></section>${items.length ? items.map(m => `<section class="panel-card review-card"><h3>${escapeHtml(m.title)}</h3><p>${escapeHtml(m.reason || '')}</p><pre class="code-view">${codeHtml(m.code || '')}</pre><div class="btn-row"><button class="btn btn-primary" onclick="openPracticeGuarded('${escapeHtml(m.courseId)}','${escapeHtml(m.lessonId)}')">REINTENTAR</button><button class="btn btn-outline" onclick="removeMistake('${escapeHtml(m.id)}'); renderReviewMode()">RESUELTO</button></div></section>`).join('') : '<section class="panel-card"><p class="hero-subtitle">No tienes errores registrados todavía. Excelente ritmo.</p></section>'}<div class="bottom-spacer"></div>`;
}



function renderProfile() {
  const total = getTotalLessons();
  const progress = total ? Math.round((state.completedLessons.length / total) * 100) : 0;
  const rows = COURSES.map(course => {
    const stats = getCourseStats(course);
    const exam = state.passedExams[course.id];
    return `<div class="profile-course-row compact" onclick="renderView('course-detail',{courseId:'${course.id}'})"><span>${course.icon} ${shortTitle(course.title)}</span><strong>${stats.completed}/${stats.total} <small>${exam?.passed ? '🏅' : stats.percent + '%'}</small></strong></div>`;
  }).join('');
  const rankInfo = typeof getRankInfo === 'function' ? getRankInfo(state.xp) : { current: { title: state.agentRank || 'Recluta', icon:'🟢' }, progress: 0, xpToNext: 0 };
  const certificateContent = state.certificates.length
    ? state.certificates.map(cert => `<div class="profile-course-row compact" onclick="renderView('certificate',{courseId:'${escapeHtml(cert.courseId)}'})"><span>🏅 ${escapeHtml(shortTitle(cert.title))}</span><strong>${Number(cert.percent) || 0}%</strong></div>`).join('')
    : `<div class="empty-certificate"><div class="empty-icon">🏆</div><strong>Sin certificados aún</strong><p>Aprueba tu primer examen para desbloquear un certificado local imprimible.</p></div>`;
  mainContainer.innerHTML = `
    <section class="welcome-card profile-hero animated-card">
      <span class="eyebrow">Perfil profesional</span>
      <h1>${rankInfo.current.icon} ${escapeHtml(rankInfo.current.title)}</h1>
      <p>Nivel ${state.level}. XP, racha, rangos, exámenes y respaldo seguro.</p>
      ${progressBar(progress)}
      <div class="metric-grid">${metricCard(state.xp,'XP','glow-blue')}${metricCard(state.completedLessons.length,'Labs','glow-green')}${metricCard(state.streak,'Racha','glow-purple')}</div>
      ${typeof renderRankStrip === 'function' ? renderRankStrip() : ''}
    </section>
    ${typeof renderAgentCommandCenter === 'function' ? renderAgentCommandCenter() : ''}
    <section class="panel-card compact-panel operator-cosmetics-panel" id="operator-cosmetics-panel"></section>
    <section class="panel-card compact-panel tools-panel">
      ${sectionTitle('Herramientas Pro','')}
      <div class="btn-row tool-actions">${actionButton('RANGOS', `renderView('rank')`, 'btn-primary')}${actionButton('ERROR LAB', `renderView('review')`, 'btn-outline')}${actionButton('NOTAS', `renderView('notes')`, 'btn-outline')}${actionButton('GLOSARIO', `renderView('glossary')`, 'btn-outline')}${actionButton('CTF', `renderView('ctf')`, 'btn-outline')}${actionButton('TEMA', `toggleTheme()`, 'btn-outline')}</div>
    </section>
    <section class="panel-card compact-panel backup-panel">
      ${sectionTitle('Respaldo JSON','')}
      <div class="check-list compact-check"><span>${state.privacyMode ? '🔐 Protección activa: notas excluidas' : '📝 Exportación completa: incluye notas'}</span></div>
      <div class="btn-row tool-actions">${actionButton('EXPORTAR', `exportProgressJSON()`, 'btn-primary')}${actionButton('IMPORTAR', `document.getElementById('import-progress-file').click()`, 'btn-outline')}${actionButton(state.privacyMode ? 'INCLUIR NOTAS' : 'PROTEGER NOTAS', `togglePrivacyMode()`, 'btn-outline')}</div>
    </section>
    <section class="panel-card compact-panel">${sectionTitle('Certificados', state.certificates.length)}${certificateContent}</section>
    <section class="panel-card">${sectionTitle('Rutas completadas', `${COURSES.length} rutas`)}<div class="profile-course-list">${rows}</div></section>
    <section class="panel-card">${sectionTitle('Insignias', `${state.badges.length}/${BADGES.length}`)}<div class="badge-grid">${BADGES.map(b => `<div class="badge-item ${state.badges.includes(b.id)?'unlocked':''}"><div class="badge-icon">${b.icon}</div><div class="badge-name">${escapeHtml(b.title)}</div><p>${escapeHtml(b.description)}</p></div>`).join('')}</div></section>
    <button class="btn btn-danger full" onclick="resetProgress()">ELIMINAR PERFIL Y DATOS</button><div class="bottom-spacer"></div>`;
  if (typeof renderOperatorCosmetics === 'function') renderOperatorCosmetics();
}
