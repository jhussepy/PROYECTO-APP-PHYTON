/* PySec Academy Elite v11.1.0 — Local Mentor Pro
   IA educativa 100% local, gratis, sin API keys y sin depender de Vercel Functions.
   Mantiene los nombres askMentorCloud/generateQuizCloud por compatibilidad con la UI v11. */
(function () {
  const MAX_HISTORY = 10;
  let _sessionHistory = [];

  window.PYSEC_AI_MODE = 'local-pro';
  window.CLOUD_AI_STATUS = 'local-pro';
  window.LOCAL_MENTOR_PRO_STATUS = 'online';

  function safe(value, limit = 1800) {
    return String(value ?? '').trim().slice(0, limit);
  }

  function toast(title, text) {
    if (typeof showToast === 'function') showToast(title, text || '');
  }

  function getRankTitle() {
    try {
      if (typeof getRankInfo === 'function') return getRankInfo(state?.xp || 0)?.current?.title || 'Recluta';
    } catch (_) {}
    return state?.agentRank || 'Recluta';
  }

  function getStudyContext(extra = {}) {
    const completedLessons = Array.isArray(state?.completedLessons) ? state.completedLessons.length : 0;
    const mistakes = Array.isArray(state?.mistakes) ? state.mistakes.slice(0, 3) : [];
    let platformState = {};
    try { platformState = typeof readPlatformState === 'function' ? readPlatformState() : {}; } catch (_) {}
    return {
      rango: getRankTitle(),
      xp: state?.xp || 0,
      nivel: state?.level || 1,
      racha: state?.streak || 0,
      leccionesCompletadas: completedLessons,
      erroresRecientes: mistakes,
      perfil: platformState.profile || {},
      ...extra
    };
  }

  const TOPIC_RULES = [
    { key: 'bucle|for|while|iterar|repetir', topic: 'bucles', explain: 'Un bucle sirve para repetir una acción sin copiar código. Primero define qué se repite, luego cuándo termina y por último qué salida esperas ver.', hint: 'Prueba con una lista pequeña de 3 elementos y usa print() dentro del bucle para observar cada paso.' },
    { key: 'lista|array|arreglo|coleccion|colección', topic: 'listas', explain: 'Una lista guarda varios valores en orden. La clave es distinguir índice, valor y recorrido.', hint: 'Empieza imprimiendo len(lista), luego lista[0], y después recórrela con for elemento in lista.' },
    { key: 'funcion|función|def|return|parametro|parámetro', topic: 'funciones', explain: 'Una función encapsula una tarea. Debe tener una entrada clara, un proceso pequeño y una salida con return.', hint: 'Escribe primero la llamada ideal: resultado = mi_funcion(valor). Luego construye def para que esa llamada funcione.' },
    { key: 'diccionario|dict|clave|valor|json', topic: 'diccionarios', explain: 'Un diccionario relaciona claves con valores. Es útil para representar configuraciones, perfiles y registros.', hint: 'Antes de acceder a una clave, valida si existe con "clave in datos" o usa datos.get("clave").' },
    { key: 'error|traceback|exception|excepción|fallo|bug', topic: 'errores', explain: 'El error casi siempre se entiende leyendo la última línea del traceback y ubicando el tipo de excepción.', hint: 'Reduce el código al caso mínimo, reproduce el error y corrige una sola hipótesis por intento.' },
    { key: 'seguridad|hacking|ciber|ctf|vulnerabilidad|redes', topic: 'ciberseguridad ética', explain: 'En ciberseguridad ética primero se define alcance, autorización, evidencia y mitigación. La meta no es romper: es aprender, defender y reportar.', hint: 'Practica solo en localhost, CTF o laboratorios autorizados. Documenta hallazgo, impacto y corrección.' },
    { key: 'rango|xp|nivel|subo|subir|progreso', topic: 'progreso', explain: 'Subes de rango combinando constancia, lecciones completadas, retos resueltos y exámenes aprobados.', hint: 'Hoy completa una lección corta, resuelve un reto y registra una nota de aprendizaje.' },
    { key: 'mercado|acciones|portfolio|portafolio|watchlist|finnhub', topic: 'mercado educativo', explain: 'El módulo de acciones es educativo: observa tendencia, volatilidad, sector y motivo de seguimiento antes de tomar conclusiones.', hint: 'Elige 3 empresas, escribe por qué las sigues y revisa si el movimiento coincide con el sector.' },
    { key: 'recursion|recursividad|recursivo', topic: 'recursividad', explain: 'La recursividad resuelve un problema llamándose a sí misma con un caso más pequeño. Siempre necesita caso base y avance hacia ese caso.', hint: 'Escribe primero el caso base. Luego verifica que cada llamada reduzca el problema.' },
    { key: 'if|condicional|else|elif|decision|decisión', topic: 'condicionales', explain: 'Un condicional separa caminos según una condición verdadera o falsa. La calidad está en que cada caso sea claro y verificable.', hint: 'Prueba al menos tres entradas: una que cumpla, una que no cumpla y un borde.' }
  ];

  function detectTopic(message) {
    const lower = safe(message, 2000).toLowerCase();
    return TOPIC_RULES.find(rule => new RegExp(rule.key, 'i').test(lower)) || null;
  }

  function rankTone(rank) {
    const value = String(rank || '').toLowerCase();
    if (value.includes('elite') || value.includes('defender') || value.includes('hacker')) return 'Te daré una pista corta para que completes el razonamiento tú.';
    if (value.includes('recluta') || value.includes('junior')) return 'Te guiaré paso a paso, pero sin darte la solución completa.';
    return 'Trabajemos con una guía equilibrada y verificable.';
  }

  function buildStudyPlan(question, ctx) {
    const topic = detectTopic(question);
    const rank = ctx.rango || getRankTitle();
    const topicName = topic?.topic || 'tu objetivo';
    const intro = topic ? topic.explain : `Para avanzar con “${safe(question, 90)}”, convierte la duda en una prueba pequeña y observable.`;
    const hint = topic ? topic.hint : 'Define entrada, proceso y salida. Ejecuta el caso mínimo y documenta qué cambió.';
    const mistakes = Array.isArray(ctx.erroresRecientes) && ctx.erroresRecientes.length
      ? `Veo errores recientes registrados; enfócate en corregir uno por vez antes de avanzar.`
      : `No veo errores recientes fuertes, así que puedes practicar con un reto corto.`;
    return `${rankTone(rank)}\n\n${intro}\n\nPlan local para ${topicName}: 1) escribe un caso mínimo, 2) predice la salida antes de ejecutar, 3) compara resultado real contra esperado, 4) corrige una sola cosa y vuelve a probar. ${hint} ${mistakes}`;
  }

  function analyzeCode(code = '', lesson = {}, output = '', expectedOutput = '') {
    const raw = String(code || '');
    const lower = raw.toLowerCase();
    const issues = [];
    if (!raw.trim()) issues.push('No pegaste código. Empieza con 3 a 8 líneas para poder revisar el caso mínimo.');
    if (/print\s*\=/.test(raw)) issues.push('Parece que reasignaste print. Evita usar nombres de funciones internas como variables.');
    if (/for\s+\w+\s+in\s+range\([^)]*\)\s*\n(?!\s+)/m.test(raw)) issues.push('Después de for necesitas indentación en el bloque interno.');
    if (/if\s+.*:\s*\n(?!\s+)/m.test(raw)) issues.push('Después de if necesitas indentar las instrucciones que pertenecen a la condición.');
    if (lower.includes('input(') && !lower.includes('int(') && /\+|\-|\*|\//.test(raw)) issues.push('Si haces cálculos con input(), convierte el texto con int() o float().');
    if (raw.includes('= =')) issues.push('Para comparar usa == sin espacio entre los signos. Para asignar usa un solo =.');
    if (/def\s+\w+\([^)]*\):/.test(raw) && !/return\b/.test(raw) && !/print\s*\(/.test(raw)) issues.push('La función no parece devolver ni mostrar resultado. Define return o print según el objetivo.');
    if (expectedOutput && output && String(output).trim() !== String(expectedOutput).trim()) issues.push('La salida no coincide con la esperada. Compara espacios, saltos de línea y formato exacto.');
    const base = issues.length ? issues.slice(0, 3).join(' ') : 'No detecto un error obvio por patrón. Revisa entrada, proceso y salida con un caso mínimo.';
    const lessonTitle = lesson?.title ? `Lección: ${lesson.title}. ` : '';
    return `${lessonTitle}${base} Pista: agrega print() temporal para observar el valor justo antes del punto donde falla.`;
  }

  const CHALLENGE_BANK = {
    python: [
      ['Detector de intentos', 'Practicar variables, condiciones y salida formateada.', 'Crea un programa que reciba un número de intentos fallidos y muestre "bloquear" si es mayor o igual a 3; si no, muestra "vigilar".', 'Prueba con 0, 2 y 3.', 'bloquear o vigilar', 25],
      ['Resumen de lista', 'Practicar listas y bucles.', 'Dada una lista de números, muestra cuántos son mayores que 10 y cuál es la suma total.', 'Usa un contador y una variable acumuladora.', 'Total y cantidad mayor a 10', 30],
      ['Validador de perfil', 'Practicar diccionarios.', 'Crea una función que reciba un diccionario y devuelva True si contiene nombre, rango y xp.', 'Usa all() o varias condiciones con in.', 'True/False', 35]
    ],
    seguridad: [
      ['Checklist de laboratorio', 'Practicar pensamiento defensivo.', 'Escribe una función que reciba alcance, autorización y evidencia; devuelve "aprobado" solo si los tres existen.', 'No hagas acciones ofensivas; solo valida requisitos éticos.', 'aprobado o incompleto', 30],
      ['Clasificador de riesgo', 'Practicar condicionales aplicados a defensa.', 'Clasifica un evento como bajo, medio o alto según intentos fallidos y origen desconocido.', 'Define reglas simples y prueba tres escenarios.', 'bajo/medio/alto', 35]
    ],
    mercado: [
      ['Diario de watchlist', 'Practicar estructuras de datos.', 'Crea una lista de empresas con ticker y motivo. Imprime solo las que tengan prioridad alta.', 'Usa una lista de diccionarios.', 'Tickers filtrados', 25]
    ]
  };

  function pickChallenge(rank = 'Recluta', completedLessons = [], topic = 'python') {
    const lowerTopic = String(topic || '').toLowerCase();
    const group = lowerTopic.includes('seg') || lowerTopic.includes('cyber') || lowerTopic.includes('hack') ? 'seguridad' : lowerTopic.includes('merc') || lowerTopic.includes('accion') ? 'mercado' : 'python';
    const bank = CHALLENGE_BANK[group] || CHALLENGE_BANK.python;
    const index = (Number(completedLessons?.length || state?.completedLessons?.length || 0) + String(rank).length + new Date().getDate()) % bank.length;
    const [title, objective, instruction, hint, expected_output, xp] = bank[index];
    return { title: `${title} · ${rank}`, objective, instruction, hint, expected_output, xp };
  }

  const QUIZ_TEMPLATES = [
    function qInputOutput(courseTitle) { return { question: `En ${courseTitle}, ¿cuál es la mejor forma de empezar un ejercicio nuevo?`, options: ['Copiar una solución completa', 'Definir entrada, proceso y salida esperada', 'Ejecutar código al azar hasta que funcione', 'Ignorar los errores si el programa abre'], correct: 1, explanation: 'La estructura entrada → proceso → salida permite probar y corregir de forma verificable.' }; },
    function qErrors() { return { question: 'Cuando aparece un traceback en Python, ¿qué conviene revisar primero?', options: ['La última línea y el tipo de excepción', 'El color del editor', 'La velocidad de internet', 'Borrar todo el archivo'], correct: 0, explanation: 'La última línea suele mostrar el tipo de error y el mensaje más útil.' }; },
    function qEthics() { return { question: '¿Cuál es una regla obligatoria en ciberseguridad ética?', options: ['Probar sistemas sin permiso', 'Ocultar evidencias', 'Practicar solo en entornos propios, CTF o autorizados', 'Compartir credenciales'], correct: 2, explanation: 'La autorización y el alcance son la base de cualquier práctica ética.' }; },
    function qFunctions() { return { question: '¿Qué ventaja tiene usar funciones en Python?', options: ['Hacer el código más repetido', 'Encapsular una tarea reutilizable con entrada y salida', 'Evitar probar el programa', 'Eliminar variables'], correct: 1, explanation: 'Las funciones ordenan tareas y permiten reutilizar lógica con parámetros y return.' }; },
    function qLists() { return { question: '¿Qué representa len(lista)?', options: ['El primer elemento', 'La cantidad de elementos', 'El último índice siempre', 'Un error de sintaxis'], correct: 1, explanation: 'len(lista) devuelve cuántos elementos contiene la lista.' }; },
    function qLocalAi() { return { question: '¿Qué significa IA local en PySec?', options: ['Una API obligatoria de pago', 'Un sistema que funciona sin enviar la API key al navegador', 'Hackear un servidor externo', 'Un diseño visual sin lógica'], correct: 1, explanation: 'La IA local funciona por reglas, plantillas o modelos en dispositivo/PC sin depender de una API cloud.' }; }
  ];

  function generateLocalQuiz(courseTitle = 'Curso PySec', lessons = [], difficulty = 'intermedio') {
    const selected = [];
    const offset = (String(courseTitle).length + String(difficulty).length + new Date().getMinutes()) % QUIZ_TEMPLATES.length;
    for (let i = 0; i < QUIZ_TEMPLATES.length && selected.length < 5; i++) {
      const template = QUIZ_TEMPLATES[(offset + i) % QUIZ_TEMPLATES.length];
      selected.push(template(courseTitle, lessons));
    }
    return selected;
  }

  window.askLocalMentorPro = async function askLocalMentorPro(userMessage, context = {}) {
    const ctx = getStudyContext(context);
    const answer = buildStudyPlan(userMessage, ctx);
    _sessionHistory.push({ role: 'user', content: safe(userMessage, 600) });
    _sessionHistory.push({ role: 'assistant', content: safe(answer, 1200) });
    _sessionHistory = _sessionHistory.slice(-MAX_HISTORY);
    window.CLOUD_AI_STATUS = 'local-pro';
    return answer;
  };

  window.reviewCodeLocalPro = async function reviewCodeLocalPro(userCode, lesson = {}, output = '', expectedOutput = '') {
    window.CLOUD_AI_STATUS = 'local-pro';
    return analyzeCode(userCode, lesson, output, expectedOutput);
  };

  window.generateChallengeLocalPro = async function generateChallengeLocalPro(userRank, completedLessons = [], topic = 'Python') {
    window.CLOUD_AI_STATUS = 'local-pro';
    return pickChallenge(userRank, completedLessons, topic);
  };

  window.generateQuizLocalPro = async function generateQuizLocalPro(courseTitle, lessons = [], difficulty = 'intermedio') {
    window.CLOUD_AI_STATUS = 'local-pro';
    return generateLocalQuiz(courseTitle, lessons, difficulty);
  };

  // Compatibilidad con v11.0.0: la UI puede seguir llamando estos nombres.
  window.askMentorCloud = async function askMentorCloud(userMessage, context = {}) {
    return window.askLocalMentorPro(userMessage, context);
  };
  window.reviewCodeCloud = async function reviewCodeCloud(userCode, lesson = {}, output = '', expectedOutput = '') {
    return window.reviewCodeLocalPro(userCode, lesson, output, expectedOutput);
  };
  window.generateChallengeCloud = async function generateChallengeCloud(userRank, completedLessons = [], topic = 'Python') {
    return window.generateChallengeLocalPro(userRank, completedLessons, topic);
  };
  window.generateQuizCloud = async function generateQuizCloud(courseTitle, lessons = [], difficulty = 'intermedio') {
    return window.generateQuizLocalPro(courseTitle, lessons, difficulty);
  };

  window.getPySecCloudAiHistory = () => _sessionHistory.slice();
  window.clearPySecCloudAiHistory = () => { _sessionHistory = []; };
  window.localMentorProExplain = buildStudyPlan;
})();
