const PYSEC_RANKS = [
  { id:'recluta', title:'Recluta', icon:'🟢', minXp:0, theme:'Core', description:'Inicio operativo. Dominas el acceso al laboratorio, primeras salidas por consola y hábitos seguros.', unlocks:['Base PySec', 'Misiones introductorias', 'Glosario táctico'] },
  { id:'operador_junior', title:'Operador Junior', icon:'🛡️', minXp:100, theme:'Python Core', description:'Ya completas prácticas básicas, entiendes salida exacta, variables y flujo inicial de trabajo.', unlocks:['Error Lab recomendado', 'Notas por misión', 'Ritmo de estudio'] },
  { id:'analista_cyber', title:'Analista Cyber', icon:'🔎', minXp:250, theme:'Logs & Defense', description:'Reconoces eventos, separas señales de ruido y empiezas a pensar como analista defensivo.', unlocks:['Lectura de logs', 'Escenarios cyber', 'Reportes simples'] },
  { id:'python_operator', title:'Python Operator', icon:'🐍', minXp:500, theme:'Automatización', description:'Usas listas, diccionarios, condicionales y funciones para automatizar tareas de laboratorio.', unlocks:['Funciones aplicadas', 'JSON/CSV', 'Módulos simulados'] },
  { id:'blue_sentinel', title:'Blue Sentinel', icon:'🔵', minXp:800, theme:'Blue Team', description:'Trabajas con alertas, IOC, triage y respuesta defensiva dentro de entornos simulados.', unlocks:['Mini SIEM educativo', 'Playbooks', 'Detección por umbral'] },
  { id:'ethical_hacker', title:'Ethical Hacker Jr.', icon:'⚖️', minXp:1200, theme:'Hacking Ético', description:'Comprendes alcance, autorización, evidencia, riesgo y reporte sin salir del laboratorio seguro.', unlocks:['OWASP conceptual', 'Hallazgos seguros', 'Re-test'] },
  { id:'threat_defender', title:'Threat Defender', icon:'🧬', minXp:1800, theme:'Threat Defense', description:'Analizas amenazas reales desde defensa: cuentas, credenciales, phishing, malware conceptual y DLP.', unlocks:['Incident Response', 'DLP básico', 'Threat Intel simulado'] },
  { id:'pysec_elite_operator', title:'PySec Elite Operator', icon:'🏆', minXp:2600, theme:'Elite', description:'Integra Python, defensa, hacking ético, reportes, exámenes, CTF y proyecto final con disciplina.', unlocks:['Ruta completa', 'Certificados avanzados', 'Perfil de operador elite'] }
];

function getRankInfo(xp = state?.xp || 0) {
  const points = Math.max(0, Number(xp || 0));
  let current = PYSEC_RANKS[0];
  for (const rank of PYSEC_RANKS) {
    if (points >= rank.minXp) current = rank;
  }
  const index = PYSEC_RANKS.findIndex(rank => rank.id === current.id);
  const next = PYSEC_RANKS[index + 1] || null;
  const span = next ? Math.max(1, next.minXp - current.minXp) : Math.max(1, current.minXp || 1);
  const gained = next ? points - current.minXp : span;
  const progress = next ? Math.max(0, Math.min(100, Math.round((gained / span) * 100))) : 100;
  return {
    current,
    next,
    index,
    level: index + 1,
    xp: points,
    progress,
    xpToNext: next ? Math.max(0, next.minXp - points) : 0,
    totalRanks: PYSEC_RANKS.length
  };
}

function syncRankState() {
  if (typeof state === 'undefined') return getRankInfo(0);
  const info = getRankInfo(state.xp);
  state.agentRank = info.current.title;
  state.rankId = info.current.id;
  state.rankLevel = info.level;
  state.nextRank = info.next ? info.next.title : 'Máximo rango';
  state.xpToNextRank = info.xpToNext;
  return info;
}

function renderRankStrip() {
  const info = syncRankState();
  const nextText = info.next ? `${info.xpToNext} XP para ${info.next.title}` : 'Rango máximo activo';
  return `<div class="rank-strip" onclick="renderView('rank')">
    <div class="rank-symbol">${info.current.icon}</div>
    <div class="rank-strip-body"><span>Rango actual</span><strong>${escapeHtml(info.current.title)}</strong><small>${escapeHtml(nextText)}</small>${progressBar(info.progress)}</div>
    <span class="rank-strip-action">VER</span>
  </div>`;
}

function renderRankMiniPanel() {
  const info = syncRankState();
  return `<section class="panel-card rank-mini-panel animated-card">
    ${sectionTitle('Sistema de rango', `Nivel ${info.level}/${info.totalRanks}`)}
    <div class="rank-mini-card" onclick="renderView('rank')">
      <div class="rank-emblem">${info.current.icon}</div>
      <div><span class="eyebrow">${escapeHtml(info.current.theme)}</span><h3>${escapeHtml(info.current.title)}</h3><p>${escapeHtml(info.current.description)}</p></div>
    </div>
    <div class="progress-block compact-progress"><div class="progress-label"><span>${info.xp} XP</span><span>${info.next ? `${info.xpToNext} XP faltantes` : 'Completo'}</span></div>${progressBar(info.progress)}</div>
    ${actionButton('VER RANGOS', `renderView('rank')`, 'btn-outline', 'full')}
  </section>`;
}

function renderRankTimeline() {
  const info = syncRankState();
  return `<div class="rank-timeline">${PYSEC_RANKS.map((rank, index) => {
    const unlocked = info.xp >= rank.minXp;
    const active = rank.id === info.current.id;
    const next = info.next && rank.id === info.next.id;
    return `<article class="rank-tier ${unlocked ? 'unlocked' : ''} ${active ? 'active' : ''} ${next ? 'next' : ''}">
      <div class="rank-tier-marker"><span>${String(index + 1).padStart(2, '0')}</span></div>
      <div class="rank-tier-body">
        <div class="card-topline"><span class="level-badge">${escapeHtml(rank.theme)}</span><span class="pill ${unlocked ? 'green' : ''}">${unlocked ? 'DESBLOQUEADO' : `${rank.minXp} XP`}</span></div>
        <h3>${rank.icon} ${escapeHtml(rank.title)}</h3>
        <p>${escapeHtml(rank.description)}</p>
        <div class="chip-row">${rank.unlocks.map(item => chip(item, unlocked ? 'green' : '')).join('')}</div>
      </div>
    </article>`;
  }).join('')}</div>`;
}

function renderRankSystem() {
  const info = syncRankState();
  const nextTitle = info.next ? info.next.title : 'Rango máximo';
  mainContainer.innerHTML = `
    <button class="btn btn-outline back-btn" onclick="renderView('profile')">← AGENTE</button>
    <section class="hero-card rank-hero animated-card">
      <span class="eyebrow">RANK SYSTEM · OPERADOR PYSEC</span>
      <h1>${info.current.icon} ${escapeHtml(info.current.title)}</h1>
      <p class="hero-subtitle">Tu rango se calcula con XP acumulado, misiones completadas, quizzes, CTF, exámenes y laboratorios. Es tu identidad operativa dentro de PySec Elite.</p>
      <div class="metric-grid">
        ${metricCard(info.xp, 'XP total', 'glow-green')}
        ${metricCard(info.level, 'Nivel de rango', 'glow-blue')}
        ${metricCard(info.xpToNext, 'XP faltante', 'glow-purple')}
      </div>
      <div class="progress-block"><div class="progress-label"><span>${escapeHtml(info.current.title)}</span><span>${escapeHtml(nextTitle)}</span></div>${progressBar(info.progress)}</div>
    </section>
    <section class="panel-card rank-how animated-card">
      ${sectionTitle('Cómo subir de rango', 'XP')}
      <div class="check-list">
        <span>⚡ Completa misiones de práctica para sumar XP de laboratorio.</span>
        <span>🧠 Aprueba quizzes y exámenes para consolidar teoría.</span>
        <span>🧪 Completa labs guiados y CTF simulados para demostrar aplicación.</span>
        <span>🔥 Mantén racha diaria para reforzar disciplina de estudio.</span>
      </div>
    </section>
    <section class="panel-card animated-card">
      ${sectionTitle('Escalera de rangos', `${PYSEC_RANKS.length} rangos`)}
      ${renderRankTimeline()}
    </section>
    <div class="bottom-spacer"></div>`;
}
