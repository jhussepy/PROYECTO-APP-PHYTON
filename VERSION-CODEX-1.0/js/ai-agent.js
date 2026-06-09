const AI_AGENT_RULES = {
  identity: 'PySec Agent Local',
  mode: 'offline · defensivo · rule-based',
  safeReminder: 'Entrena solo en laboratorio, localhost, CTF o datos simulados. No ataques sistemas reales sin autorización.',
  version: '8.7.2'
};

const AGENT_CONCEPT_MAP = [
  { key: 'phishing', skill: 'Threat Defense / Phishing Awareness', tags: ['phishing', 'correo', 'dominio', 'urgente'] },
  { key: 'malware', skill: 'Threat Defense / Malware Analysis', tags: ['malware', 'ioc', 'hash', 'proceso', 'sospechoso'] },
  { key: 'incident', skill: 'Blue Team / Incident Response', tags: ['log', 'incidente', 'alerta', 'contención', 'recuperación', 'triage'] },
  { key: 'web', skill: 'Web Security', tags: ['web', 'http', 'api', 'headers', 'cookie', 'owasp', 'ruta'] },
  { key: 'network', skill: 'Network Security', tags: ['red', 'puerto', 'socket', 'host', '127.0.0.1', 'dns'] },
  { key: 'python-advanced', skill: 'Python Avanzado', tags: ['clase', 'función', 'funciones', 'archivo', 'json', 'try', 'except', 'f-string'] },
  { key: 'python-core', skill: 'Python Core', tags: ['print', 'variable', 'lista', 'diccionario', 'if', 'for', 'while', 'string'] }
];

function getLessonCorpus(lesson = {}, course = {}) {
  return `${course.title || ''} ${course.description || ''} ${lesson.title || ''} ${lesson.objective || ''} ${lesson.theory || ''} ${lesson.exercise?.instruction || ''}`.toLowerCase();
}

function detectLessonSkill(lesson = {}, course = {}) {
  const text = getLessonCorpus(lesson, course);
  const match = AGENT_CONCEPT_MAP.find(item => item.tags.some(tag => text.includes(tag)));
  return match?.skill || 'Python Core';
}

function detectConceptTags(lesson = {}, course = {}) {
  const text = getLessonCorpus(lesson, course);
  const tags = [];
  AGENT_CONCEPT_MAP.forEach(item => item.tags.forEach(tag => { if (text.includes(tag) && !tags.includes(tag)) tags.push(tag); }));
  return tags.slice(0, 5);
}

function getMissionDifficulty(lesson = {}) {
  const xp = Number(lesson.xp || 10);
  if (xp >= 45) return 'Avanzada';
  if (xp >= 30) return 'Intermedia';
  return 'Inicial';
}

function getMissionBriefing(course, lesson) {
  return {
    code: String(lesson.id || 'mission').toUpperCase(),
    title: lesson.title,
    objective: lesson.objective,
    skill: detectLessonSkill(lesson, course),
    tags: detectConceptTags(lesson, course),
    difficulty: getMissionDifficulty(lesson),
    risk: course?.ethical ? 'Ético / laboratorio' : 'Bajo / educativo',
    environment: 'Secure local sandbox',
    agentHint: getAgentHint('', lesson, 'briefing')
  };
}

function normalizeCodeForAgent(code = '') {
  return String(code || '')
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/\r\n/g, '\n')
    .trim();
}

function getBalanceStatus(src, open, close, label) {
  const a = (src.match(new RegExp(`\\${open}`, 'g')) || []).length;
  const b = (src.match(new RegExp(`\\${close}`, 'g')) || []).length;
  if (a === b) return null;
  return `Revisa ${label}: hay ${a} apertura(s) y ${b} cierre(s).`;
}

function detectCodeIssues(code = '', lesson = {}) {
  const src = normalizeCodeForAgent(code);
  const issues = [];
  if (!src) issues.push('El editor está vacío. Escribe una solución antes de ejecutar.');
  [
    getBalanceStatus(src, '(', ')', 'paréntesis'),
    getBalanceStatus(src, '[', ']', 'corchetes'),
    getBalanceStatus(src, '{', '}', 'llaves')
  ].filter(Boolean).forEach(item => issues.push(item));
  const singleQuotes = (src.match(/'/g) || []).length;
  const doubleQuotes = (src.match(/"/g) || []).length;
  if (singleQuotes % 2 !== 0 || doubleQuotes % 2 !== 0) issues.push('Revisa comillas: una cadena de texto parece estar sin cerrar.');
  if (/while\s+True\s*:/i.test(src) && !/\bbreak\b/.test(src)) issues.push('Posible bucle infinito: while True necesita break o condición de salida.');
  if (/while\s+[^:]+:/i.test(src) && !/(\+=|-=|=\s*[^=]|break)/.test(src.split(/while\s+[^:]+:/i).pop() || '')) issues.push('El while puede no avanzar. Verifica que cambie la variable de control.');
  const controlLine = src.match(/^\s*(if|for|while|def|class|try|except|else|elif)\b[^\n]*$/m)?.[0] || '';
  if (controlLine && !/:\s*$/.test(controlLine)) issues.push('Una línea de control parece no terminar con dos puntos (:).');
  if (/\n\S/.test(src) && /:\s*\n\S/.test(src)) issues.push('Hay un bloque después de “:” sin indentación. Python necesita espacios al inicio del bloque.');
  const expected = String(lesson.exercise?.expected_output || '').trim();
  const validation = lesson.exercise?.validation_type || '';
  if (expected && validation !== 'code_not_empty' && !/\bprint\s*\(/.test(src)) issues.push('La misión espera salida visible. Probablemente falta print().');
  if (/input\s*\(/.test(src)) issues.push('input() está permitido. Si no escribes nada, el simulador usará un valor seguro por defecto.');
  if (/import\s+(os|requests|hashlib|json|re|math|random|base64|datetime|statistics)/.test(src)) issues.push('Módulo simulado detectado. Recuerda que corre en sandbox educativo, no en Python real completo.');
  return [...new Set(issues)].slice(0, 6);
}

function analyzeExpectedOutput(output = '', expected = '') {
  const got = String(output || '').trim();
  const exp = String(expected || '').trim();
  if (!exp) return { status: 'sin_salida_esperada', summary: 'Esta misión no compara una salida exacta.', tips: [] };
  if (got === exp) return { status: 'exacto', summary: 'La salida coincide exactamente con lo esperado.', tips: [] };
  const tips = [];
  if (got.toLowerCase() === exp.toLowerCase()) tips.push('La diferencia parece ser de mayúsculas/minúsculas.');
  if (got.replace(/\s+/g, ' ') === exp.replace(/\s+/g, ' ')) tips.push('La diferencia parece ser de espacios o saltos de línea.');
  if (got.normalize('NFD').replace(/[\u0300-\u036f]/g, '') === exp.normalize('NFD').replace(/[\u0300-\u036f]/g, '')) tips.push('La diferencia parece estar en tildes o acentos.');
  const gotLines = got.split('\n').filter(Boolean).length;
  const expLines = exp.split('\n').filter(Boolean).length;
  if (gotLines !== expLines) tips.push(`La cantidad de líneas no coincide: obtuviste ${gotLines}, se esperaban ${expLines}.`);
  if (!got) tips.push('Tu código no generó salida. Usa print() si el ejercicio pide mostrar algo.');
  return { status: 'diferente', summary: 'La salida todavía no coincide con lo esperado.', tips: tips.length ? tips : ['Compara carácter por carácter con la salida esperada.'] };
}

function getBriefingHint(lesson = {}) {
  const title = String(lesson.title || '').toLowerCase();
  const instruction = String(lesson.exercise?.instruction || '').toLowerCase();
  if (instruction.includes('exactamente')) return 'Misión de precisión: cuida mayúsculas, espacios y salida exacta.';
  if (title.includes('input')) return 'Entrada controlada: cuando aparezca input(), escribe el valor solicitado. Si está vacío, usaré un valor seguro.';
  if (title.includes('try') || title.includes('except')) return 'Piensa en el fallo esperado y en el mensaje que debería ver el usuario.';
  if (title.includes('log') || title.includes('incidente')) return 'Mentalidad Blue Team: detectar, clasificar, documentar y recomendar.';
  if (title.includes('phishing') || title.includes('malware')) return 'Analiza señales simuladas. El objetivo es defensa, no ejecución ofensiva.';
  return 'Lee el objetivo, identifica la salida esperada y ejecuta una solución mínima primero.';
}

function getHintLevels(code = '', lesson = {}, output = '', expected = '') {
  const src = normalizeCodeForAgent(code);
  const ex = lesson.exercise || {};
  const exp = String(expected || ex.expected_output || '').trim();
  const issues = detectCodeIssues(src, lesson);
  const comparison = analyzeExpectedOutput(output, exp);
  const levels = [];
  levels.push(`Nivel 1 · Orientación: lee el objetivo “${lesson.objective || lesson.title || 'misión actual'}” y predice la salida antes de ejecutar.`);
  if (!src) {
    levels.push('Nivel 2 · Guía: escribe una solución mínima. Si la misión pide mostrar texto o valores, empieza con print().');
    levels.push(`Nivel 3 · Casi solución: la salida esperada es “${exp || 'la indicada por la instrucción'}”. Construye una línea que produzca exactamente eso.`);
    return levels;
  }
  if (issues.length) {
    levels.push(`Nivel 2 · Diagnóstico: ${issues[0]}`);
    levels.push('Nivel 3 · Acción: corrige ese detalle primero, ejecuta otra vez y no cambies varias cosas al mismo tiempo.');
    return levels;
  }
  if (comparison.status === 'exacto') {
    levels.push('Nivel 2 · Confirmación: la salida coincide. Explica con tus palabras por qué funcionó antes de avanzar.');
    levels.push('Nivel 3 · Profundización: guarda una nota breve con el concepto aplicado y un error que evitarás después.');
    return levels;
  }
  if (comparison.tips && comparison.tips.length) {
    levels.push(`Nivel 2 · Comparación: ${comparison.tips[0]}`);
    levels.push(`Nivel 3 · Corrección: compara tu salida con “${exp}” carácter por carácter. Revisa mayúsculas, espacios y saltos de línea.`);
    return levels;
  }
  levels.push('Nivel 2 · Guía: tu código parece razonable, pero la salida no cumple el criterio exacto. Revisa qué imprime realmente.');
  levels.push('Nivel 3 · Acción: ejecuta, copia mentalmente la consola y ajústala hasta igualar la salida esperada.');
  return levels;
}

function getAgentHint(code = '', lesson = {}, phase = 'practice', output = '') {
  if (phase === 'briefing') return getBriefingHint(lesson);
  return getHintLevels(code, lesson, output, lesson.exercise?.expected_output || '').join('\n');
}

function getAgentReview(code = '', lesson = {}, output = '', expected = '') {
  const src = normalizeCodeForAgent(code);
  const issues = detectCodeIssues(src, lesson);
  const comparison = analyzeExpectedOutput(output, expected || lesson.exercise?.expected_output || '');
  const lines = src ? src.split('\n').length : 0;
  const usesPrint = /\bprint\s*\(/.test(src);
  const usesControl = /\b(if|for|while|try|except|def|class)\b/.test(src);
  const concepts = detectConceptTags(lesson, getCourse(lesson.courseId || ''));
  let confidence = 80;
  if (!src) confidence = 10;
  else if (issues.length) confidence = 45;
  else if (comparison.status === 'exacto') confidence = 98;
  else if (comparison.status === 'diferente') confidence = 65;
  const checklist = [
    usesPrint ? 'print() detectado' : 'print() no detectado',
    `${lines} línea(s) de código`,
    usesControl ? 'estructura de control detectada' : 'solución directa',
    issues.length ? `${issues.length} alerta(s) del agente` : 'sin alertas críticas de sintaxis',
    comparison.summary
  ];
  const suggestions = issues.length ? issues : comparison.tips;
  return {
    confidence,
    summary: confidence >= 90 ? 'Solución muy sólida.' : confidence >= 65 ? 'Solución cercana, revisa detalles.' : 'Necesita corrección antes de validar.',
    checklist,
    suggestions,
    concepts: concepts.length ? concepts : ['python'],
    nextAction: suggestions[0] || 'Ejecuta de nuevo y avanza a la siguiente misión.'
  };
}

function getPedagogicalReview(code = '', lesson = {}, output = '', expected = '') {
  const src = normalizeCodeForAgent(code);
  const review = getAgentReview(code, lesson, output, expected);
  const ex = lesson.exercise || {};
  const expectedText = String(ex.expected_output || expected || '').trim();
  const producedText = String(output || '').trim();
  const why = [];
  if (!src) why.push('Todavía no hay código que analizar. Empieza con una solución mínima.');
  if (expectedText && !producedText) why.push('El programa no produjo salida visible. Cuando una misión pide mostrar algo, normalmente necesitas print().');
  if (producedText && expectedText && softNormalize(producedText) !== softNormalize(expectedText)) why.push('La salida no coincide con el criterio de éxito. En programación defensiva, exactitud y reproducibilidad importan.');
  if (/\bprint\s*\(/.test(src)) why.push('Detecté print(): estás comunicando un resultado a la consola, objetivo de muchas misiones iniciales.');
  if (/\b(if|for|while)\b/.test(src)) why.push('Detecté control de flujo: tu código toma decisiones o repite acciones, base de detectores defensivos.');
  if (/\btry\b|\bexcept\b/.test(src)) why.push('Detecté manejo de errores: buen hábito para herramientas robustas y seguras.');
  if (/\bimport\b/.test(src)) why.push('Detecté módulos: aquí son simulados o controlados para proteger el entorno de aprendizaje.');
  const hintLevels = getHintLevels(code, lesson, output, expectedText);
  return {
    ...review,
    hintLevels,
    teaching: {
      concept: lesson.title || 'concepto de la misión',
      why: why.slice(0, 4),
      objective: lesson.objective || 'Resolver la misión de forma segura.',
      nextMicroStep: review.suggestions?.[0] || ex.hint || 'Ejecuta de nuevo y compara la salida esperada.',
      relatedStudy: lesson.deep_theory?.study_tip || 'Lee teoría, ejecuta, analiza error y guarda una nota si aprendiste algo nuevo.',
      hintLevels
    }
  };
}

function formatAgentReview(review) {
  const teaching = review.teaching || {};
  const levels = review.hintLevels || teaching.hintLevels || [];
  return [
    `Confianza del agente: ${review.confidence}%`,
    `Resumen: ${review.summary}`,
    '',
    'Checklist:',
    ...review.checklist.map(item => `- ${item}`),
    '',
    'Explicación pedagógica:',
    `- Concepto trabajado: ${teaching.concept || 'misión actual'}`,
    `- Objetivo: ${teaching.objective || 'resolver el reto con salida correcta'}`,
    ...(teaching.why || []).map(item => `- ${item}`),
    '',
    'Recomendaciones:',
    ...review.suggestions.map(item => `- ${item}`),
    '',
    `Conceptos detectados: ${review.concepts.join(', ')}`,
    `Siguiente micro-paso: ${teaching.nextMicroStep || review.nextAction}`,
    `Método de estudio: ${teaching.relatedStudy || 'practica, compara y documenta'}`,
    '',
    'Pistas por niveles:',
    ...levels.map(item => `- ${item}`)
  ].join('\n');
}

function getDebriefPayload(lesson, courseId) {
  const all = getAllLessons();
  const idx = all.findIndex(l => l.id === lesson.id);
  const next = idx >= 0 && idx < all.length - 1 ? all[idx + 1] : null;
  return {
    completed: lesson.title,
    xp: lesson.xp,
    skill: detectLessonSkill(lesson, getCourse(courseId)),
    nextTitle: next?.title || 'Ruta completada',
    nextCourseId: next?.courseId || courseId,
    nextLessonId: next?.id || lesson.id
  };
}

function buildAgentDiagnosis(code, output, expected, lesson) {
  const review = getPedagogicalReview(code, lesson, output, expected);
  const details = typeof getValidationDetails === 'function' ? getValidationDetails(output, expected) : 'La salida no coincide con lo esperado.';
  return `${details}\n\n${formatAgentReview(review)}\n\nRecordatorio: ${AI_AGENT_RULES.safeReminder}`;
}
