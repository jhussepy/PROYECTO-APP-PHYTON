/* Rutas v10. Se integran al catálogo existente para conservar progreso y exámenes. */

const LEARNING_PATH_GROUPS = [
  {
    id: 'base-python',
    title: 'Base Python',
    summary: 'Fundamentos, estructuras, funciones, archivos, errores y POO.',
    courseIds: ['python_desde_cero']
  },
  {
    id: 'python-intermediate',
    title: 'Python Intermedio',
    summary: 'APIs, JSON, redes, automatización local y herramientas CLI.',
    courseIds: ['python_ciberseguridad', 'python_redes', 'python_web']
  },
  {
    id: 'python-advanced',
    title: 'Python Avanzado',
    summary: 'Arquitectura, typing, testing, logging y patrones mantenibles.',
    courseIds: ['python_avanzado']
  },
  {
    id: 'local-ai',
    title: 'IA Local',
    summary: 'Ollama, prompts, privacidad, embeddings, RAG y agentes.',
    courseIds: ['local_ai_core']
  },
  {
    id: 'super-dotado',
    title: 'Base + IA Local: Super Dotado',
    summary: 'Copiloto offline, retos, evaluación y mini proyectos.',
    courseIds: ['super_dotado']
  },
  {
    id: 'ethical-security',
    title: 'Hacking Ético',
    summary: 'Redes, OWASP, labs locales, hardening y reporte responsable.',
    courseIds: ['python_blue_team', 'hacking_etico_python', 'labs_hacking_etico', 'threat_defense_lab', 'red_team_autorizado']
  },
  {
    id: 'datos-ia',
    title: 'Datos e IA',
    summary: 'Análisis de logs con pandas, detección de anomalías y ML clásico para ciberseguridad.',
    courseIds: ['analisis_datos', 'ml_seguridad']
  },
  {
    id: 'real-projects',
    title: 'Proyectos Reales',
    summary: 'Dashboards, analizadores, APIs, IA local y portfolio técnico.',
    courseIds: ['proyectos_reales', 'proyecto_final']
  }
];

function learningOsLesson(id, title, objective, theory, example, expected, xp = 40, minutes = 10) {
  return lesson(
    id,
    title,
    objective,
    theory,
    example,
    [
      'Identifica la entrada y la salida antes de escribir más código.',
      'Ejecuta una versión mínima y explica por qué funciona.',
      'No uses datos sensibles reales en ejercicios o prompts.'
    ],
    `Escribe una solución mínima que muestre exactamente: ${expected}`,
    '',
    expected,
    'output_equals',
    `Empieza con print(${JSON.stringify(expected)}). Después mejora la estructura.`,
    `print(${JSON.stringify(expected)})`,
    xp,
    minutes,
    quiz(
      `¿Qué hábito mejora más el trabajo en “${title}”?`,
      ['Validar una salida observable', 'Copiar sin ejecutar', 'Usar datos secretos', 'Omitir errores'],
      'Validar una salida observable'
    )
  );
}

function addLearningOsCourse(course) {
  if (!COURSES.some(item => item.id === course.id)) COURSES.push(course);
}

addLearningOsCourse({
  id: 'local_ai_core',
  title: 'IA Local con Ollama',
  level: 'Intermedio',
  description: 'Modelos locales, prompts, agentes, embeddings, RAG y privacidad aplicada al aprendizaje.',
  icon: 'AI',
  ethical: false,
  guidedLab: {
    title: 'Mentor local privado',
    steps: [
      'Instala Ollama y verifica que responda en 127.0.0.1:11434.',
      'Selecciona un modelo acorde con la memoria disponible.',
      'Diseña un prompt con rol, contexto, tarea y formato de salida.',
      'Prueba una pregunta sin datos sensibles.',
      'Documenta latencia, calidad y limitaciones.'
    ]
  },
  modules: [
    {
      id: 'local_ai_foundations',
      title: 'Fundamentos de IA local',
      lessons: [
        learningOsLesson('ai_001', 'Qué es IA local', 'Diferenciar inferencia local y servicios cloud.', 'Un modelo local procesa prompts en tu equipo. Mejora privacidad y control, pero depende de RAM, CPU/GPU y del modelo elegido.', "modo = 'local'\nprint(modo)", 'local'),
        learningOsLesson('ai_002', 'Ollama y modelos', 'Comprender servidor, modelo y endpoint.', 'Ollama expone una API local. El servidor y el modelo son componentes distintos: primero se inicia Ollama y luego se descarga un modelo.', "servidor = '127.0.0.1:11434'\nprint(servidor)", '127.0.0.1:11434'),
        learningOsLesson('ai_003', 'Hardware y límites', 'Elegir modelos según los recursos disponibles.', 'Modelos pequeños consumen menos memoria y responden más rápido. La calidad, el contexto y la velocidad siempre tienen compromisos.', "perfil = 'modelo ligero'\nprint(perfil)", 'modelo ligero')
      ]
    },
    {
      id: 'prompt_engineering',
      title: 'Prompts y evaluación',
      lessons: [
        learningOsLesson('ai_004', 'Prompt estructurado', 'Crear instrucciones claras y verificables.', 'Un prompt útil define rol, contexto, tarea, restricciones y formato esperado. La salida debe poder revisarse.', "estructura = 'rol + tarea + formato'\nprint(estructura)", 'rol + tarea + formato'),
        learningOsLesson('ai_005', 'Privacidad por defecto', 'Evitar compartir secretos y datos personales.', 'Local no significa automáticamente seguro. Los prompts pueden quedar en memoria, logs o historial. Usa datos mínimos y ficticios.', "regla = 'sin secretos'\nprint(regla)", 'sin secretos'),
        learningOsLesson('ai_006', 'Evaluar respuestas', 'Comprobar precisión y límites del modelo.', 'Una respuesta de IA es una hipótesis. Contrasta código, documentación y resultados antes de aceptarla.', "criterio = 'verificar'\nprint(criterio)", 'verificar')
      ]
    },
    {
      id: 'rag_agents',
      title: 'RAG y agentes básicos',
      lessons: [
        learningOsLesson('ai_007', 'Embeddings y búsqueda', 'Entender recuperación semántica a alto nivel.', 'Los embeddings representan significado numéricamente y permiten recuperar fragmentos relacionados con una consulta.', "flujo = 'buscar contexto'\nprint(flujo)", 'buscar contexto'),
        learningOsLesson('ai_008', 'RAG básico', 'Combinar contexto recuperado con una pregunta.', 'RAG recupera información propia y la incorpora al prompt. Debe citar fuentes y limitar el contexto.', "rag = 'recuperar + responder'\nprint(rag)", 'recuperar + responder'),
        learningOsLesson('ai_009', 'Agente educativo', 'Diseñar un ciclo de observar, decidir y revisar.', 'Un agente simple recibe un objetivo, elige una herramienta permitida y evalúa el resultado. Debe tener límites claros.', "agente = 'objetivo + límite'\nprint(agente)", 'objetivo + límite'),
        learningOsLesson('ai_010', 'Integración con PySec', 'Conectar el mentor local de forma segura.', 'PySec restringe Ollama a loopback y usa fallback local para que la app siga funcionando sin servidor.', "estado = 'fallback seguro'\nprint(estado)", 'fallback seguro', 50, 12)
      ]
    }
  ]
});

addLearningOsCourse({
  id: 'super_dotado',
  title: 'Base + IA Local: Super Dotado',
  level: 'Intermedio / Avanzado',
  description: 'Python, automatización y mentor IA local para convertir errores en proyectos verificables.',
  icon: 'SD',
  ethical: false,
  guidedLab: {
    title: 'Mini copiloto de aprendizaje offline',
    steps: [
      'Define una tarea concreta y un formato de respuesta.',
      'Crea una función local que analice una entrada.',
      'Añade un fallback sin IA.',
      'Prueba tres errores frecuentes.',
      'Entrega checklist, limitaciones y mejora siguiente.'
    ]
  },
  modules: [
    {
      id: 'super_mentor',
      title: 'Mentor y diagnóstico',
      lessons: [
        learningOsLesson('super_001', 'Explicar código', 'Convertir código en pasos comprensibles.', 'Explicar código exige identificar datos, control de flujo, resultado y posibles fallos.', "salida = 'entrada -> proceso -> salida'\nprint(salida)", 'entrada -> proceso -> salida'),
        learningOsLesson('super_002', 'Detectar errores', 'Clasificar errores de sintaxis, ejecución y lógica.', 'No todos los errores son iguales. Clasificarlos reduce el espacio de búsqueda y mejora el diagnóstico.', "tipos = 'sintaxis, ejecución, lógica'\nprint(tipos)", 'sintaxis, ejecución, lógica'),
        learningOsLesson('super_003', 'Proponer mejoras', 'Priorizar claridad, validación y pruebas.', 'Una mejora útil explica el riesgo, el cambio mínimo y cómo verificarlo.', "mejora = 'cambio + prueba'\nprint(mejora)", 'cambio + prueba')
      ]
    },
    {
      id: 'super_automation',
      title: 'Automatización y archivos',
      lessons: [
        learningOsLesson('super_004', 'Analizar archivos locales', 'Diseñar lectura segura y controlada.', 'Valida extensión, tamaño y errores antes de procesar archivos. Nunca ejecutes contenido recibido como datos.', "regla = 'leer, no ejecutar'\nprint(regla)", 'leer, no ejecutar'),
        learningOsLesson('super_005', 'Generar retos', 'Crear ejercicios con nivel y criterio de éxito.', 'Un reto debe tener objetivo, restricciones, ejemplo y salida comprobable.', "reto = 'objetivo + criterio'\nprint(reto)", 'objetivo + criterio'),
        learningOsLesson('super_006', 'Evaluar respuestas', 'Dar feedback específico sin revelar todo.', 'El feedback progresivo señala el tipo de error, ofrece una pista y permite reintentar.', "feedback = 'pista gradual'\nprint(feedback)", 'pista gradual')
      ]
    },
    {
      id: 'super_builder',
      title: 'Builder local',
      lessons: [
        learningOsLesson('super_007', 'Mini proyectos', 'Convertir una habilidad en un producto pequeño.', 'Un mini proyecto necesita usuario, problema, alcance, datos, interfaz y prueba final.', "proyecto = 'problema + entrega'\nprint(proyecto)", 'problema + entrega'),
        learningOsLesson('super_008', 'Checklist de aprendizaje', 'Cerrar sesiones con evidencia.', 'Un checklist registra qué entendiste, qué falló, qué corregiste y qué sigue.', "check = 'aprender, probar, documentar'\nprint(check)", 'aprender, probar, documentar'),
        learningOsLesson('super_009', 'Agente con límites', 'Definir herramientas permitidas y salida segura.', 'Un agente educativo no debe ejecutar acciones peligrosas ni operar fuera del alcance definido.', "limite = 'solo herramientas permitidas'\nprint(limite)", 'solo herramientas permitidas'),
        learningOsLesson('super_010', 'Capstone Super Dotado', 'Integrar mentor, reto y analizador local.', 'El capstone une generación, diagnóstico, feedback y privacidad en una experiencia offline.', "capstone = 'mentor local operativo'\nprint(capstone)", 'mentor local operativo', 60, 15)
      ]
    }
  ]
});

addLearningOsCourse({
  id: 'proyectos_reales',
  title: 'Proyectos Reales',
  level: 'Portfolio',
  description: 'Entregables completos para practicar producto, arquitectura, datos, IA local y defensa.',
  icon: 'PR',
  ethical: false,
  guidedLab: {
    title: 'Portfolio técnico verificable',
    steps: [
      'Elige un problema pequeño con usuario definido.',
      'Escribe requisitos y límites.',
      'Construye una versión mínima funcional.',
      'Añade validación, estados vacíos y documentación.',
      'Publica una demo sin secretos y registra aprendizajes.'
    ]
  },
  modules: [
    {
      id: 'productivity_projects',
      title: 'Productividad',
      lessons: [
        learningOsLesson('project_001', 'Calculadora avanzada', 'Diseñar operaciones, validación e historial.', 'Separa entrada, cálculo, errores y presentación. Prueba división por cero y datos inválidos.', "entrega = 'calculadora validada'\nprint(entrega)", 'calculadora validada'),
        learningOsLesson('project_002', 'Gestor de notas', 'Crear CRUD local con filtros.', 'Un gestor de notas necesita crear, editar, borrar, persistir y filtrar sin perder datos.', "entrega = 'notas persistentes'\nprint(entrega)", 'notas persistentes'),
        learningOsLesson('project_003', 'Dashboard inteligente', 'Representar métricas y próximos pasos.', 'Un dashboard prioriza decisiones; no debe ser una colección de números sin jerarquía.', "entrega = 'dashboard accionable'\nprint(entrega)", 'dashboard accionable')
      ]
    },
    {
      id: 'defensive_projects',
      title: 'Datos y defensa',
      lessons: [
        learningOsLesson('project_004', 'Analizador de logs', 'Clasificar eventos y generar resumen.', 'Trabaja con logs ficticios, conserva evidencia y explica criterios de clasificación.', "entrega = 'reporte de logs'\nprint(entrega)", 'reporte de logs'),
        learningOsLesson('project_005', 'Monitor de sistema', 'Modelar CPU, memoria y alertas locales.', 'El monitor debe diferenciar lectura, umbral, estado y recomendación.', "entrega = 'monitor local'\nprint(entrega)", 'monitor local'),
        learningOsLesson('project_006', 'Laboratorio CTF local', 'Diseñar un reto seguro y reproducible.', 'Un CTF educativo usa datos ficticios, alcance local y una flag verificable.', "entrega = 'ctf seguro'\nprint(entrega)", 'ctf seguro')
      ]
    },
    {
      id: 'builder_projects',
      title: 'Builder',
      lessons: [
        learningOsLesson('project_007', 'Mini API', 'Definir recursos, validación y errores.', 'Una API profesional documenta rutas, entradas, códigos de estado y límites.', "entrega = 'api documentada'\nprint(entrega)", 'api documentada'),
        learningOsLesson('project_008', 'Asistente IA local', 'Crear un flujo con Ollama y fallback.', 'El asistente debe indicar estado, modelo, privacidad y respuesta alternativa si Ollama falla.', "entrega = 'asistente offline'\nprint(entrega)", 'asistente offline'),
        learningOsLesson('project_009', 'Portfolio técnico', 'Presentar proyectos con evidencia y decisiones.', 'Describe problema, alcance, stack, pruebas, limitaciones y aprendizaje sin exponer secretos.', "entrega = 'portfolio publicado'\nprint(entrega)", 'portfolio publicado', 60, 15)
      ]
    }
  ]
});

BADGES.push(
  { id: 'local_ai_operator', title: 'Local AI Operator', description: 'Configuraste aprendizaje asistido con privacidad local.', icon: 'AI' },
  { id: 'super_dotado_builder', title: 'Super Dotado Builder', description: 'Integraste Python, automatización y mentor local.', icon: 'SD' },
  { id: 'portfolio_builder', title: 'Portfolio Builder', description: 'Convertiste habilidades en proyectos verificables.', icon: 'PR' }
);
