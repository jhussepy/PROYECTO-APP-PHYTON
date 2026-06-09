/* PySec Academy Elite v9.3.1 · Heatmap Polish
   Panel local/offline para convertir Agente en centro de mando táctico.
   No usa red, no envía datos y solo deriva recomendaciones desde el progreso local. */

function ensureOperatorId() {
  if (!state.operatorId) {
    const seed = `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`.toUpperCase();
    state.operatorId = `PYSEC-LOCAL-${seed}`;
    saveState();
  }
  return state.operatorId;
}

function getCourseCompletion(courseId) {
  const course = getCourse(courseId);
  if (!course) return { total: 0, done: 0, percent: 0 };
  const lessons = (course.modules || []).flatMap(module => module.lessons || []);
  const total = lessons.length;
  const done = lessons.filter(lesson => state.completedLessons.includes(lesson.id)).length;
  return { total, done, percent: total ? Math.round((done / total) * 100) : 0 };
}

function getSkillDiagnostics() {
  const groups = [
    { id: 'python', title: 'Python Core', courses: ['python_core', 'python_advanced'] },
    { id: 'cyber', title: 'Cyber Defense', courses: ['python_cyber', 'blue_team', 'threat_defense'] },
    { id: 'network', title: 'Redes', courses: ['python_networks'] },
    { id: 'web', title: 'Web/API', courses: ['python_web'] },
    { id: 'offensive', title: 'Hacking Ético', courses: ['ethical_hacking', 'ethical_labs', 'red_team'] },
    { id: 'final', title: 'Proyecto Final', courses: ['final_project'] }
  ];
  return groups.map(group => {
    let total = 0;
    let done = 0;
    group.courses.forEach(courseId => {
      const stat = getCourseCompletion(courseId);
      total += stat.total;
      done += stat.done;
    });
    return { ...group, total, done, percent: total ? Math.round((done / total) * 100) : 0 };
  });
}

function getAgentRecommendation() {
  const challenge = typeof getCurrentChallenge === 'function' ? getCurrentChallenge() : null;
  if (!challenge || !challenge.lesson) {
    return {
      title: 'Explorar rutas disponibles',
      reason: 'No encontré una misión pendiente directa. Revisa la ruta académica y elige el siguiente bloque.',
      action: `renderView('courses')`,
      cta: 'VER RUTAS'
    };
  }
  const lesson = challenge.lesson;
  const course = getCourse(lesson.courseId);
  const courseStats = getCourseCompletion(lesson.courseId);
  let reason = 'Estás en una fase ideal para avanzar de forma ordenada.';
  if (lesson.courseId === 'python_core') reason = 'Primero debes consolidar salida, variables, tipos y flujo antes de automatizar tareas cyber.';
  else if (lesson.courseId === 'python_cyber') reason = 'Ya puedes empezar a transformar Python en herramienta defensiva para logs, reportes y datos simulados.';
  else if (lesson.courseId === 'threat_defense') reason = 'Esta misión fortalece tu lectura defensiva de amenazas reales desde un entorno seguro.';
  else if (courseStats.percent < 40) reason = 'El curso aún está en etapa inicial; completar esta misión desbloquea mejor base para el siguiente bloque.';
  return {
    title: lesson.title,
    course: course?.title || 'Ruta PySec',
    reason,
    action: `renderView('lesson',{courseId:'${lesson.courseId}',lessonId:'${lesson.id}'})`,
    cta: 'INICIAR MISIÓN'
  };
}

function getUpcomingUnlocks() {
  const rank = typeof getRankInfo === 'function' ? getRankInfo(state.xp) : null;
  const items = [];
  if (rank?.next) items.push({ icon: '⚡', title: `${rank.xpToNext} XP para ${rank.next.title}`, text: 'Completa misiones, quizzes o CTF para avanzar de rango.' });
  if (!state.badges.includes('apprentice')) items.push({ icon: '🏅', title: 'Insignia Aprendiz Python', text: 'Completa fundamentos de variables, strings y tipos de datos.' });
  if (!state.certificates.length) items.push({ icon: '📜', title: 'Primer certificado local', text: 'Aprueba un examen de curso con 70% o más.' });
  if (!state.completedCTF?.length) items.push({ icon: '🎯', title: 'Primer CTF simulado', text: 'Resuelve un reto defensivo y valida la flag local.' });
  return items.slice(0, 4);
}

function getWeeklyPlan() {
  const completed = state.completedLessons.length;
  if (completed < 10) {
    return [
      'Día 1: completar 3 misiones de Python Core.',
      'Día 2: repasar errores y guardar 1 nota de aprendizaje.',
      'Día 3: completar 2 quizzes y revisar el glosario básico.',
      'Día 4: completar 1 lab guiado del curso actual.',
      'Día 5: repetir misión fallida o avanzar al siguiente bloque.'
    ];
  }
  if ((state.mistakes || []).length >= 3) {
    return [
      'Día 1: abrir Error Lab y resolver 3 fallos frecuentes.',
      'Día 2: completar 2 misiones nuevas sin usar solución.',
      'Día 3: aprobar quiz del bloque actual.',
      'Día 4: guardar evidencia del lab guiado.',
      'Día 5: intentar CTF defensivo simulado.'
    ];
  }
  return [
    'Día 1: avanzar 2 misiones de la ruta recomendada.',
    'Día 2: completar un lab guiado o CTF simulado.',
    'Día 3: aprobar examen pendiente de curso.',
    'Día 4: repasar glosario y notas de misión.',
    'Día 5: documentar aprendizaje en formato reporte corto.'
  ];
}

function getActivityLog() {
  const logs = [];
  if (state.completedLessons.length) {
    const lastId = state.completedLessons[state.completedLessons.length - 1];
    const lesson = getAllLessons().find(item => item.id === lastId);
    logs.push(`[OK] Misión completada: ${lesson?.title || lastId}`);
  }
  if (state.completedQuizzes.length) logs.push(`[QUIZ] ${state.completedQuizzes.length} quizzes correctos registrados`);
  if (state.completedCTF.length) logs.push(`[CTF] ${state.completedCTF.length} retos simulados completados`);
  if (state.certificates.length) logs.push(`[CERT] ${state.certificates.length} certificados locales desbloqueados`);
  if (state.mistakes.length) logs.push(`[IA] ${state.mistakes.length} errores disponibles para repaso`);
  if (state.notes.length) logs.push(`[NOTE] ${state.notes.length} notas guardadas offline`);
  if (!logs.length) logs.push('[BOOT] Perfil iniciado. Completa tu primera misión para generar actividad.');
  return logs.slice(0, 6);
}

function getEthicsScore() {
  const ethicalCourses = COURSES.filter(course => course.ethical || ['ethical_hacking','ethical_labs','red_team','threat_defense'].includes(course.id));
  const accepted = ethicalCourses.filter(course => state.acceptedEthics.includes(course.id)).length;
  const base = 85;
  const bonus = ethicalCourses.length ? Math.round((accepted / ethicalCourses.length) * 15) : 15;
  return Math.min(100, base + bonus);
}

function renderOperatorIdCard(rankInfo) {
  const id = ensureOperatorId();
  return `<section class="panel-card operator-id-card command-card">
    ${sectionTitle('Operator ID', 'local')}
    <div class="operator-id-layout">
      <div class="operator-avatar">${rankInfo.current.icon}</div>
      <div><h3>${escapeHtml(rankInfo.current.title)}</h3><p>${escapeHtml(id)}</p><span class="pill green">MODO ÉTICO ACTIVO</span></div>
    </div>
  </section>`;
}

function renderAgentRecommendationCard() {
  const rec = getAgentRecommendation();
  return `<section class="panel-card command-card agent-rec-card">
    ${sectionTitle('Recomendación IA local', 'siguiente')}
    <h3>${escapeHtml(rec.title)}</h3>
    ${rec.course ? `<span class="pill">${escapeHtml(rec.course)}</span>` : ''}
    <p>${escapeHtml(rec.reason)}</p>
    ${actionButton(rec.cta, rec.action, 'btn-success', 'full')}
  </section>`;
}

function renderSkillDiagnosticCard() {
  return `<section class="panel-card command-card skill-diagnostic-card">
    ${sectionTitle('Skill Diagnostic', 'mapa vivo')}
    ${getSkillDiagnostics().map(skill => `<div class="skill-line">
      <div><strong>${escapeHtml(skill.title)}</strong><span>${skill.done}/${skill.total}</span></div>
      ${progressBar(skill.percent)}<b>${skill.percent}%</b>
    </div>`).join('')}
  </section>`;
}

function renderUpcomingUnlocksCard() {
  return `<section class="panel-card command-card unlocks-card">
    ${sectionTitle('Próximos desbloqueos', 'motivación')}
    <div class="command-list">${getUpcomingUnlocks().map(item => `<div class="command-row"><span>${item.icon}</span><div><strong>${escapeHtml(item.title)}</strong><p>${escapeHtml(item.text)}</p></div></div>`).join('')}</div>
  </section>`;
}

function renderErrorLabSnapshotCard() {
  const count = state.mistakes.length;
  const last = count ? state.mistakes[0] : null;
  return `<section class="panel-card command-card error-snapshot-card">
    ${sectionTitle('Error Lab', `${count} errores`)}
    ${last ? `<p>Último diagnóstico: ${escapeHtml(last.reason || 'revisar salida esperada y código escrito')}</p>` : '<p>No hay errores activos. Cuando una práctica falle, el Agente guardará el diagnóstico aquí.</p>'}
    ${actionButton('REPASAR ERRORES', `renderView('review')`, count ? 'btn-primary' : 'btn-outline', 'full')}
  </section>`;
}

function renderWeeklyPlanCard() {
  return `<section class="panel-card command-card weekly-plan-card">
    ${sectionTitle('Plan semanal PySec', '5 días')}
    <div class="check-list">${getWeeklyPlan().map(step => `<span>▸ ${escapeHtml(step)}</span>`).join('')}</div>
  </section>`;
}

function renderActivityLogCard() {
  return `<section class="panel-card command-card activity-log-card">
    ${sectionTitle('Activity Log', 'local')}
    <pre class="activity-terminal">${getActivityLog().map(line => escapeHtml(line)).join('\n')}</pre>
  </section>`;
}

function renderEthicsScoreCard() {
  const score = getEthicsScore();
  return `<section class="panel-card command-card ethics-score-card">
    ${sectionTitle('Ética operativa', `${score}%`)}
    <p>Tu perfil mantiene enfoque de laboratorio, datos simulados, autorización y defensa responsable.</p>
    ${progressBar(score)}
  </section>`;
}

function showMentorResponse(type='next') {
  const box = document.getElementById('mentor-output');
  if (!box) return;
  const rec = getAgentRecommendation();
  const messages = {
    next: `Recomiendo iniciar: ${rec.title}. Motivo: ${rec.reason}`,
    errors: state.mistakes.length ? `Tienes ${state.mistakes.length} error(es) para repasar. Abre Error Lab y corrige primero el más reciente.` : 'No tienes errores registrados. Mantén el ritmo completando la siguiente misión sin mirar solución.',
    progress: `Tienes ${state.xp} XP, ${state.completedLessons.length}/${getTotalLessons()} labs y racha de ${state.streak} día(s).`,
    plan: getWeeklyPlan().join(' ')
  };
  box.textContent = messages[type] || messages.next;
}

function renderMentorModeCard() {
  return `<section class="panel-card command-card mentor-mode-card">
    ${sectionTitle('Modo mentor', 'IA local')}
    <div class="btn-row tool-actions">
      ${actionButton('¿QUÉ HAGO?', `showMentorResponse('next')`, 'btn-primary')}
      ${actionButton('ERRORES', `showMentorResponse('errors')`, 'btn-outline')}
      ${actionButton('PROGRESO', `showMentorResponse('progress')`, 'btn-outline')}
      ${actionButton('PLAN', `showMentorResponse('plan')`, 'btn-outline')}
    </div>
    <div id="mentor-output" class="mentor-output">Selecciona una opción para que el Agente IA local explique tu siguiente paso.</div>
  </section>`;
}

function renderAgentCommandCenter() {
  const rankInfo = typeof getRankInfo === 'function' ? getRankInfo(state.xp) : { current: { icon: '🟢', title: 'Recluta' } };
  const total = getTotalLessons();
  const precision = state.completedQuizzes.length + state.completedLessons.length ? Math.round((state.completedQuizzes.length / Math.max(1, state.completedLessons.length)) * 100) : 0;
  return `<section class="panel-card command-overview animated-card">
    ${sectionTitle('Estado del operador', 'command center')}
    <div class="operator-stats-grid">
      ${metricCard(rankInfo.current.title, 'Rango', 'glow-green')}
      ${metricCard(`${state.completedLessons.length}/${total}`, 'Misiones', 'glow-blue')}
      ${metricCard(`${precision}%`, 'Precisión quiz', 'glow-purple')}
    </div>
  </section>
  ${renderOperatorIdCard(rankInfo)}
  ${renderAgentRecommendationCard()}
  ${renderSkillDiagnosticCard()}
  ${renderUpcomingUnlocksCard()}
  ${renderErrorLabSnapshotCard()}
  ${renderWeeklyPlanCard()}
  ${renderMentorModeCard()}
  ${renderActivityLogCard()}
  ${renderEthicsScoreCard()}`;
}
