/* PySec Academy Elite v8.7.2 Final Curriculum Polish
   Mejora pedagógica local: teoría expandida, retos guiados, glosario, labs por pasos y quizzes con escenario.
*/
const CURRICULUM_VERSION = '8.7.2';

const GLOSSARY = [
  { term:'Sandbox', category:'Python / Seguridad', definition:'Entorno controlado donde se ejecuta código o se practica una técnica sin afectar sistemas reales.', example:'El simulador local de PySec funciona como sandbox educativo.' },
  { term:'Hacking ético', category:'Ética', definition:'Práctica de seguridad realizada con autorización, alcance definido, evidencia y objetivo defensivo.', example:'Probar solo 127.0.0.1, laboratorios propios o sistemas autorizados.' },
  { term:'Pentesting', category:'Hacking ético', definition:'Evaluación autorizada para identificar riesgos, validarlos de forma controlada y reportar recomendaciones.', example:'Auditar headers de seguridad en un laboratorio local.' },
  { term:'Blue Team', category:'Defensa', definition:'Equipo o disciplina enfocada en monitoreo, detección, respuesta, hardening y mejora continua.', example:'Analizar logs para detectar intentos fallidos repetidos.' },
  { term:'Red Team', category:'Simulación', definition:'Simulación adversaria autorizada para evaluar detección y respuesta de una organización.', example:'En PySec se estudia de forma conceptual y segura.' },
  { term:'Purple Team', category:'Colaboración', definition:'Trabajo combinado entre visión ofensiva autorizada y defensa para mejorar controles y detecciones.', example:'Mapear una señal a MITRE y crear una alerta defensiva.' },
  { term:'IOC', category:'Threat Defense', definition:'Indicador de compromiso: dato observable que puede asociarse a actividad sospechosa.', example:'Hash simulado, dominio ficticio o IP de laboratorio.' },
  { term:'DLP', category:'Datos', definition:'Data Loss Prevention: controles para prevenir, detectar y responder a posibles fugas de información.', example:'Alerta por descarga masiva simulada.' },
  { term:'MFA', category:'Cuentas', definition:'Multi-Factor Authentication: capa adicional de verificación para reducir riesgo de toma de cuentas.', example:'Activar MFA después de detectar login sospechoso.' },
  { term:'OWASP Top 10', category:'Web', definition:'Lista de riesgos web comunes usada para priorizar revisiones, aprendizaje y mitigaciones.', example:'Control de acceso roto o mala configuración de seguridad.' },
  { term:'MITRE ATT&CK', category:'Detección', definition:'Base de conocimiento que organiza tácticas y técnicas adversarias para análisis y defensa.', example:'Clasificar eventos como Credential Access o Reconnaissance.' },
  { term:'Hardening', category:'Defensa', definition:'Proceso de reducir superficie de ataque mediante configuración segura, parches, MFA, logs y mínimos privilegios.', example:'Activar logs, aplicar parches y limitar permisos.' },
  { term:'Phishing', category:'Amenazas', definition:'Engaño que intenta inducir a una persona a entregar credenciales o abrir recursos maliciosos.', example:'Correo simulado con urgencia falsa y dominio parecido.' },
  { term:'Malware', category:'Amenazas', definition:'Software malicioso. En PySec solo se estudia desde análisis defensivo e indicadores simulados.', example:'Detectar proceso ficticio unknown_payload.exe.' },
  { term:'Persistencia', category:'Amenazas', definition:'Técnicas para mantenerse activo en un sistema. En la app se estudia solo cómo detectarla y reportarla.', example:'Tarea programada simulada con nombre desconocido.' },
  { term:'Exfiltración', category:'Datos', definition:'Salida no autorizada de información. Aquí se estudia como prevención, DLP y respuesta con datos ficticios.', example:'Detectar descarga masiva simulada.' },
  { term:'Triage', category:'Blue Team', definition:'Priorización inicial de eventos para decidir qué revisar primero según severidad, evidencia e impacto.', example:'Clasificar una alerta como alta, media o baja.' },
  { term:'Falso positivo', category:'Detección', definition:'Alerta que parece sospechosa pero no representa un incidente real después de validar contexto.', example:'Muchas descargas por tarea de backup autorizada.' },
  { term:'Reporte de hallazgo', category:'Profesional', definition:'Documento breve que explica evidencia, impacto, severidad y recomendación accionable.', example:'Header ausente, severidad media, recomendación de configuración.' },
  { term:'Re-test', category:'Pentesting', definition:'Validación posterior para confirmar que una corrección resolvió el hallazgo reportado.', example:'Revisar de nuevo un header después de corregirlo.' },
  { term:'Log', category:'Observabilidad', definition:'Registro de eventos generado por sistemas, aplicaciones o usuarios, útil para investigar y detectar patrones.', example:'login failed admin.' },
  { term:'Regex', category:'Python', definition:'Expresión regular para buscar patrones en texto como IPs, errores o palabras clave.', example:'Buscar failed dentro de eventos de autenticación.' },
  { term:'API', category:'Web', definition:'Interfaz que permite que aplicaciones intercambien datos mediante endpoints, métodos y respuestas estructuradas.', example:'GET /users en un laboratorio simulado.' },
  { term:'Header HTTP', category:'Web', definition:'Metadato de una petición o respuesta web que puede incluir seguridad, sesión, tipo de contenido o caché.', example:'X-Frame-Options: DENY.' }
];

const PEDAGOGY_THEORY_PACK = {
  py_001: 'print() es el primer puente entre tu código y la consola: permite comprobar qué está ocurriendo, mostrar resultados y validar pasos pequeños antes de construir algo más grande. En ciberseguridad se usa constantemente para depurar scripts, revisar valores de variables, mostrar resúmenes de logs o confirmar que una función hizo lo esperado. El error más común al iniciar es olvidar comillas, paréntesis o escribir un texto diferente al solicitado. En esta misión el objetivo no es solo copiar una línea, sino entender que Python compara salidas de forma exacta: mayúsculas, espacios y caracteres importan. Domina print() porque será tu herramienta básica para construir reportes, alertas y pruebas controladas.',
  py_002: 'Los comentarios documentan decisiones sin afectar la ejecución. En proyectos de ciberseguridad son importantes porque un analista debe explicar por qué se tomó una decisión, qué alcance tiene una prueba y qué parte del código manipula datos simulados o reales. Un buen comentario no repite lo obvio; aclara intención, contexto o advertencia. Por ejemplo, no basta escribir “esto imprime”, es mejor explicar “este resultado resume los intentos fallidos detectados”. Los comentarios también ayudan cuando vuelves a revisar un script semanas después. En esta misión practicarás un hábito profesional: escribir código que otra persona pueda leer, auditar y mantener sin adivinar tu intención.',
  py_003: 'Una variable guarda información con un nombre. En seguridad, elegir nombres claros evita errores: no es lo mismo usuario, ip_origen, puerto_destino o severidad. Las variables permiten reutilizar datos y construir scripts más legibles. Un error común es usar nombres confusos o dejar valores vacíos esperando que Python adivine qué mostrar. Python no adivina: si guardas un string vacío, eso será lo que tendrás. En esta misión debes asignar un valor y mostrarlo, entendiendo que una variable representa una pieza de información que luego puede pasar por filtros, validaciones o reportes.',
  py_004: 'Los tipos de datos definen cómo Python interpreta un valor. Un puerto como 80 puede ser número, mientras que un servicio como HTTP debe ser texto. Un booleano como True o False sirve para decisiones: activo, autorizado, bloqueado, vulnerable o corregido. En ciberseguridad, confundir tipos puede romper validaciones: comparar el número 80 con el texto “80” no siempre produce el resultado esperado. Esta misión entrena precisión: saber cuándo usar comillas, cuándo no, y cómo mostrar un valor correctamente. Comprender tipos es base para analizar logs, procesar APIs, clasificar riesgos y automatizar reportes.',
  py_005: 'Los strings son textos y aparecen en casi todo: logs, rutas web, headers, nombres de procesos, dominios, usuarios y mensajes de error. Python permite transformar strings con métodos como lower(), upper(), strip() o split(). En seguridad esto ayuda a normalizar datos antes de compararlos; por ejemplo, SSH, ssh y Ssh pueden representar lo mismo. Un error común es comparar texto sin normalizar y perder coincidencias. En esta misión usarás lower() para convertir un servicio a minúsculas, aprendiendo un patrón clave: antes de detectar, conviene limpiar y preparar los datos.',
  py_006: 'Los condicionales permiten que un script tome decisiones según evidencia. En seguridad no basta leer datos: hay que clasificar estados, detectar señales y responder. Un if puede identificar si un status HTTP es 200, si una severidad supera un umbral o si un evento contiene failed. La indentación es parte de la sintaxis: el bloque que pertenece al if debe tener espacios al inicio. Un error típico es usar = cuando corresponde ==, o olvidar los dos puntos. Esta misión enseña decisión controlada: si se cumple la condición, mostrar una salida; si no, reaccionar diferente.',
  py_007: 'Un bucle for repite una acción sobre cada elemento de una colección. En ciberseguridad esto es esencial: recorrer puertos, revisar logs, procesar IPs, analizar rutas o generar líneas de un reporte. En vez de copiar print() tres veces, el bucle permite escalar a cien o mil elementos. El error común es olvidar la indentación o usar una variable distinta dentro del bloque. En esta misión recorres una lista de puertos y muestras cada uno, una base para futuros scripts de inventario, revisión de servicios y análisis de eventos simulados.',
  py_008: 'Una lista agrupa varios valores en orden. Puede contener puertos, usuarios, rutas, IOCs o eventos. Las listas permiten agregar, recorrer, contar y filtrar información. append() añade un elemento al final, útil cuando un script detecta nuevos hallazgos. En seguridad, una lista puede representar objetivos autorizados o eventos sospechosos recopilados durante una práctica. El error común es olvidar que append modifica la lista original y que print(lista) muestra su representación completa. Esta misión entrena construcción de colecciones, paso previo a analizar datos más reales.',
  py_009: 'Un diccionario guarda información con clave y valor. Es una estructura natural para hallazgos, alertas y reportes: título, severidad, impacto, evidencia y recomendación. A diferencia de una lista, no accedes por posición sino por nombre de campo. Esto hace el código más claro. El error común es escribir mal la clave o olvidar las comillas cuando la clave es texto. En esta misión crearás un diccionario simple de servicio y mostrarás su nombre, entendiendo el patrón que luego usarás para modelar vulnerabilidades, activos o incidentes.',
  py_010: 'Una función agrupa instrucciones reutilizables. En vez de repetir lógica, defines un bloque con nombre y lo llamas cuando lo necesitas. En herramientas defensivas, una función puede analizar un log, calcular severidad, generar un reporte o validar una entrada. Una función bien nombrada hace que el código parezca un procedimiento profesional. El error común es definirla pero no llamarla, o romper la indentación. En esta misión crearás una función alerta() y la ejecutarás, practicando el flujo completo: definir, indentar y llamar.',
  py_011: 'while repite mientras una condición sea verdadera. Es potente, pero también peligroso si no cambia la condición, porque puede crear un bucle infinito. En seguridad se usa para reintentos, lectura continua, menús y procesos que deben continuar hasta cumplir una regla. Por eso siempre necesitas una condición de salida o actualización. En esta misión imprimirás 0, 1 y 2, avanzando el contador con i += 1. El aprendizaje clave es controlar el flujo: cada repetición debe acercar el programa al final esperado.',
  py_012: 'input() permite recibir información del usuario durante la ejecución. En una app real puede servir para pedir un nombre, una ruta de archivo, una IP de laboratorio o un valor de configuración. En PySec se usa de forma controlada y segura. Recuerda que input() siempre devuelve texto; si necesitas un número, debes convertirlo con int() o float(). Un error común es esperar que input convierta datos automáticamente. En esta misión pedirás un nombre y lo combinarás con un saludo, aprendiendo cómo los datos entran al programa.',
  py_013: 'try/except permite manejar errores de forma controlada. En seguridad, un script no debería romperse sin explicar qué ocurrió: debe capturar fallos, mostrar mensajes útiles y continuar o cerrar de forma segura. try intenta ejecutar una acción; except responde si algo falla. Esto es útil al leer archivos, consultar APIs o procesar datos incompletos. El error común es usar except para ocultar todo sin entender el problema. En esta misión usarás un fallo esperado para mostrar un mensaje controlado, aprendiendo a diseñar programas más resistentes.',
  sec_101: 'La autorización es la diferencia central entre aprendizaje responsable y abuso. Una práctica de seguridad solo es válida si ocurre dentro de un alcance permitido: laboratorio propio, 127.0.0.1, datos simulados o sistema con permiso explícito. El hacking ético no se define por la herramienta usada, sino por intención, permiso, límites, evidencia y reporte. Esta lección establece la base profesional de toda la app. Antes de analizar logs, rutas o servicios, debes preguntarte: ¿tengo permiso?, ¿cuál es el alcance?, ¿cómo documento el resultado? Esta mentalidad evita riesgos legales y forma hábitos de analista.',
  sec_102: 'Buscar patrones es una tarea básica del analista defensivo. Los logs contienen texto: failed, success, error, denied, admin, token o critical. El operador in permite preguntar si una palabra aparece dentro de una cadena. Aunque es simple, sirve para crear detectores iniciales y entender cómo se construyen reglas más avanzadas. El error común es buscar texto con mayúsculas distintas o sin normalizar. En esta misión detectarás failed dentro de un evento, practicando el patrón: leer, comparar, alertar.',
  sec_103: 'Contar eventos transforma texto en una señal medible. Un intento fallido aislado puede no ser grave; varios intentos repetidos pueden indicar riesgo. Por eso los contadores son clave en Blue Team. El patrón es iniciar en cero, recorrer eventos y sumar cuando aparece una condición. En herramientas reales esto se convierte en umbrales, alertas y reportes. El error común es sumar fuera del if o no inicializar el contador. En esta misión contarás eventos failed, preparando la base para detección de fuerza bruta simulada.',
  sec_104: 'Regex permite buscar patrones más flexibles que una palabra exacta. En seguridad se usa para extraer IPs, hashes, rutas, códigos de error o correos desde logs. Aunque esta misión mantiene el flujo simple, el objetivo es reconocer que Python tiene un módulo estándar llamado re para trabajar con expresiones regulares. El error común es creer que regex es solo memorizar símbolos; en realidad se usa para describir estructuras de texto. Aquí empezarás cargando el módulo y entendiendo su rol en análisis forense y automatización.',
  sec_105: 'Un reporte convierte observaciones técnicas en información accionable. Un buen hallazgo no solo dice “algo falta”; incluye título, severidad, evidencia e impacto. Python ayuda a generar reportes repetibles, evitando que cada analista escriba formatos diferentes. En ciberseguridad, comunicar bien es tan importante como detectar. El error común es producir salidas ambiguas sin contexto. En esta misión construirás una línea de reporte simple, practicando claridad: qué se encontró y qué prioridad tiene.',
  sec_106: 'JSON es un formato común para APIs, alertas y herramientas de seguridad. Permite representar datos estructurados con claves y valores. Python puede convertir texto JSON en estructuras internas para analizarlas. En defensa, un evento JSON puede contener usuario, IP, acción, severidad y fecha. El error común es olvidar que JSON como texto debe estar bien formado con comillas y llaves correctas. En esta misión cargarás un evento simple y mostrarás su valor, preparando el camino para automatizar análisis de APIs y alertas.',
  sec_107: 'Clasificar severidad ayuda a decidir qué atender primero. No todos los eventos tienen el mismo impacto: algunos requieren revisión, otros contención inmediata. Usar condiciones con rangos permite automatizar una primera priorización. En seguridad real, la severidad combina impacto, probabilidad, exposición y contexto. En esta misión usarás un umbral simple, pero el concepto es profesional: convertir un número o señal en una categoría accionable. El error común es elegir umbrales sin documentar el criterio.',
  net_201: 'Una IP identifica un dispositivo o interfaz dentro de una red. En laboratorio, 127.0.0.1 representa tu propio equipo y es una referencia segura para practicar sin tocar terceros. Entender IPs evita confundir localhost, red local e internet pública. En seguridad, el alcance define qué IPs puedes analizar; probar IPs ajenas sin permiso no es aceptable. Esta misión refuerza el uso de objetivos locales y autorizados, base para aprender redes de forma responsable.',
  net_202: 'Un puerto representa una puerta lógica por la que un servicio puede comunicarse. Por ejemplo, 80 suele asociarse a HTTP y 443 a HTTPS. Entender puertos ayuda a interpretar inventarios, logs y configuraciones. En laboratorios, una lista de puertos puede representar servicios simulados, no un escaneo real. El error común es asumir que un puerto siempre confirma un servicio: se necesita contexto. Esta misión entrena reconocimiento básico de servicios por número.',
  net_203: 'TCP y UDP son protocolos de transporte con comportamientos diferentes. TCP prioriza conexión y confiabilidad; UDP prioriza velocidad y menor sobrecarga. En seguridad, comprender esta diferencia ayuda a interpretar servicios, logs y tráfico. No necesitas atacar redes para aprenderlo: puedes modelar protocolos como datos y clasificarlos. Esta misión trabaja el concepto de manera segura, enfocándose en reconocer nombres y usos.',
  net_204: 'Un socket permite que programas se comuniquen a través de red. En PySec, los sockets se estudian de forma conceptual y con localhost, evitando tráfico hacia terceros. Comprender sockets ayuda a entender cómo funcionan clientes, servidores y herramientas de red. El error común es saltar a escaneos sin comprender autorización. Esta misión mantiene el aprendizaje dentro de laboratorio y usa Python para representar la idea de conexión controlada.',
  net_205: 'Un timeout evita que un programa espere indefinidamente. En redes, un servicio puede no responder, estar caído o bloquear conexiones. Sin timeout, una herramienta puede quedarse congelada. En seguridad defensiva, configurar tiempos límite permite crear herramientas robustas y predecibles. Esta misión introduce la idea de controlar esperas y manejar resultados sin depender de una red real.',
  web_301: 'HTTP es el protocolo base de la web. Una respuesta incluye código de estado, headers y cuerpo. En seguridad web, entender HTTP permite analizar configuraciones, sesiones, APIs y errores. Esta app usa datos simulados o laboratorios para evitar tocar sitios reales sin permiso. El error común es mirar solo el contenido visible y olvidar metadatos como headers. Esta misión entrena lectura básica de una respuesta.',
  web_302: 'GET y POST son métodos HTTP con propósitos distintos. GET suele solicitar información; POST suele enviar datos para crear o procesar algo. En auditoría web, diferenciar métodos ayuda a entender formularios, APIs y riesgos de validación. No se necesita atacar una web real para practicar: puedes modelar una petición como texto o diccionario. Esta misión refuerza el concepto para futuras prácticas OWASP simuladas.',
  web_303: 'requests es una librería popular para hacer peticiones HTTP en Python. En esta app se trata como módulo simulado o limitado para mantener seguridad. El objetivo educativo es entender cómo un script podría consultar un recurso autorizado y leer su respuesta. En prácticas reales, solo se usa contra laboratorios o sistemas con permiso. Esta misión separa concepto de abuso: aprender HTTP no significa probar objetivos públicos sin alcance.',
  web_304: 'Los headers HTTP contienen metadatos de seguridad y funcionamiento. Headers como X-Frame-Options, Content-Security-Policy o Strict-Transport-Security ayudan a reducir riesgos. En auditorías autorizadas, revisar headers es una tarea común y segura cuando está dentro del alcance. El error común es reportar un header ausente sin explicar impacto o recomendación. Esta misión empieza con un header simple y prepara reportes más profesionales.',
  web_305: 'Las cookies pueden guardar identificadores de sesión o preferencias. Desde defensa se revisa si tienen banderas como HttpOnly, Secure y SameSite. Una cookie mal protegida puede aumentar riesgo de exposición de sesión. En PySec no se manipulan sesiones reales; se usan ejemplos simulados para aprender estructura y criterio. Esta misión enseña a reconocer una cookie como dato clave dentro de seguridad web.',
  blue_401: 'Blue Team se enfoca en defender: monitorear, detectar, investigar y responder. Un analista no solo mira alertas; debe entender contexto, priorizar y documentar. Python ayuda a automatizar tareas repetitivas como contar eventos, extraer indicadores o generar resúmenes. Esta misión introduce la mentalidad defensiva: observar señales, evitar conclusiones apresuradas y convertir datos en acciones.',
  blue_402: 'Los logs son memoria operativa de un sistema. Registran accesos, errores, acciones y cambios. Sin logs, investigar incidentes se vuelve difícil. Un buen analista sabe buscar patrones, pero también entiende limitaciones: logs incompletos, falsos positivos y ruido. En esta misión trabajarás con eventos simulados, aprendiendo una base que luego se transforma en detecciones y playbooks.',
  blue_403: 'Un IOC es una pista observable: IP, dominio, hash, nombre de archivo o patrón. No prueba por sí solo un incidente; requiere contexto. En defensa, los IOCs ayudan a buscar coincidencias y priorizar revisión. El error común es tratar cualquier IOC como verdad absoluta. Esta misión te entrena a manejar indicadores simulados de forma cuidadosa: observar, comparar y documentar.',
  blue_404: 'Una alerta es útil solo si comunica señal, severidad y acción recomendada. Blue Team no busca generar ruido, sino mejorar detección. Una regla simple puede empezar con if, pero debe evolucionar con contexto, umbral y validación. En esta misión crearás una alerta básica, entendiendo que el objetivo final no es imprimir texto sino diseñar una respuesta clara.'
};

const PEDAGOGY_SCENARIOS = {
  default: 'Escenario: trabajas en un laboratorio local de PySec. Tu tarea es resolver el objetivo sin tocar sistemas externos y documentar lo aprendido.',
  python: 'Escenario: estás construyendo una herramienta base de Python para futuros análisis defensivos. Prioriza claridad, salida exacta y código fácil de leer.',
  cyber: 'Escenario: eres analista junior revisando eventos simulados. Debes detectar la señal solicitada y generar una salida clara para un reporte.',
  network: 'Escenario: estás modelando inventario de red dentro de un laboratorio autorizado. No hay tráfico real hacia terceros.',
  web: 'Escenario: estás revisando una aplicación web de laboratorio. El objetivo es entender metadatos, respuestas y riesgos de configuración.',
  blue: 'Escenario: estás en una cola de alertas simuladas. Debes priorizar evidencia, reducir ruido y explicar tu criterio defensivo.',
  threat: 'Escenario: estás analizando una amenaza simulada. No ejecutas ataques; identificas señales, impacto y acción defensiva.'
};

function curriculumCourseKind(courseId='') {
  if (courseId.includes('redes')) return 'network';
  if (courseId.includes('web')) return 'web';
  if (courseId.includes('blue')) return 'blue';
  if (courseId.includes('threat')) return 'threat';
  if (courseId.includes('ciber') || courseId.includes('hacking') || courseId.includes('labs')) return 'cyber';
  return 'python';
}

function upgradeTheory(lesson, course, index) {
  const base = PEDAGOGY_THEORY_PACK[lesson.id];
  const kind = curriculumCourseKind(course.id);
  const concept = lesson.title;
  const objective = lesson.objective || 'aplicar el concepto de forma segura';
  const generic = `Concepto: ${concept}. ${objective} En PySec este tema se estudia con enfoque práctico, seguro y progresivo. Primero identifica qué dato se procesa, luego qué condición o estructura se necesita y finalmente qué salida debe producir el programa. En ciberseguridad, incluso los ejercicios simples entrenan precisión: una alerta, un reporte o una evidencia deben ser claros y reproducibles. Error común: resolver copiando la salida sin entender el flujo. Buen hábito: lee la instrucción, ejecuta una versión mínima, compara la salida y documenta qué aprendiste. ${PEDAGOGY_SCENARIOS[kind]}`;
  lesson.theory = base || generic;
  lesson.deep_theory = {
    concept: `Qué debes entender: ${concept} no es solo sintaxis; es una pieza del flujo analizar → decidir → mostrar → documentar.`,
    cyber_use: `Uso aplicado: ${PEDAGOGY_SCENARIOS[kind]}`,
    common_mistake: 'Error común: descuidar mayúsculas, indentación, comillas o salida exacta. El validador compara lo que tu programa produce, no lo que intentabas producir.',
    study_tip: 'Método recomendado: escribe una solución mínima, ejecútala, revisa la consola, usa IA Analizar y guarda una nota si fallas.'
  };
  lesson.learning_path = ['Leer objetivo', 'Identificar dato de entrada', 'Elegir estructura Python', 'Generar salida', 'Comparar y corregir'];
}

function upgradeExercise(lesson, course) {
  const ex = lesson.exercise || {};
  const kind = curriculumCourseKind(course.id);
  ex.scenario = PEDAGOGY_SCENARIOS[kind] || PEDAGOGY_SCENARIOS.default;
  ex.guided_steps = [
    '1. Lee la instrucción y subraya la salida esperada.',
    '2. Revisa el código inicial y detecta qué falta completar.',
    '3. Escribe una solución mínima antes de añadir complejidad.',
    '4. Ejecuta y compara consola vs salida esperada.',
    '5. Si falla, usa IA Analizar y corrige un detalle a la vez.'
  ];
  ex.success_criteria = [
    `La salida debe coincidir con: ${ex.expected_output || '(sin salida esperada)'}`,
    'El código debe ser legible y mantener el objetivo de laboratorio seguro.',
    'Debes entender por qué funciona, no solo copiar la solución.'
  ];
  if (/^print\(['"][^\n]+['"]\)$/m.test(String(ex.solution || '').trim())) {
    ex.challenge_level = 'Reto guiado de precisión';
    ex.instruction = `${ex.instruction} Antes de ejecutar, explica mentalmente qué debería aparecer en consola y verifica mayúsculas, espacios y puntuación.`;
  } else {
    ex.challenge_level = 'Reto guiado aplicado';
  }
}

function upgradeQuiz(lesson, course) {
  if (!lesson.quiz) return;
  const kind = curriculumCourseKind(course.id);
  lesson.quiz.scenario = PEDAGOGY_SCENARIOS[kind] || PEDAGOGY_SCENARIOS.default;
  const answer = lesson.quiz.answer;
  lesson.quiz.explanation = `Respuesta correcta: ${answer}. En este escenario, la opción correcta cumple el objetivo sin salir del laboratorio ni romper el marco ético. Revisa cómo se relaciona con la teoría y con la salida esperada del ejercicio.`;
  if (lesson.quiz.options && lesson.quiz.options.length < 4) {
    lesson.quiz.options = [...lesson.quiz.options, 'No aplica al laboratorio'].slice(0,4);
  }
}

function renameModules() {
  const replacements = [
    [/Bloque extra:\s*/gi, 'Práctica aplicada: '],
    [/Bloque élite:\s*/gi, 'Dominio profesional: '],
    [/Bloque 10\/10:\s*/gi, 'Especialización: '],
    [/Bloque 100:\s*/gi, 'Ruta avanzada: '],
    [/Bloque 1:\s*/gi, 'Fundamentos: '],
    [/Bloque 2:\s*/gi, 'Lógica aplicada: '],
    [/Bloque 3:\s*/gi, 'Control de flujo: ']
  ];
  COURSES.forEach(course => course.modules.forEach(module => {
    replacements.forEach(([rx, label]) => { module.title = module.title.replace(rx, label); });
    module.objective = module.objective || `Dominar ${module.title.toLowerCase()} mediante teoría, práctica guiada, quiz y aplicación segura.`;
  }));
}

function fixDuplicateLessonTitles() {
  const seen = new Map();
  COURSES.forEach(course => course.modules.forEach(module => module.lessons.forEach(lesson => {
    const key = lesson.title.trim().toLowerCase();
    const count = seen.get(key) || 0;
    if (count > 0) {
      const suffixes = ['aplicado', 'defensivo', 'profesional', 'en laboratorio', 'con reporte'];
      lesson.title = `${lesson.title} ${suffixes[Math.min(count - 1, suffixes.length - 1)]}`;
    }
    seen.set(key, count + 1);
  })));
}

function addCourseGuidedLabs() {
  COURSES.forEach(course => {
    const last = course.modules.flatMap(m => m.lessons).slice(-1)[0];
    course.guidedLab = course.guidedLab || {
      title: `Lab profesional: ${course.title}`,
      objective: `Integrar los conceptos de ${course.title} en un caso guiado y documentado.`,
      steps: [
        'Briefing: lee el objetivo, alcance y criterio de éxito del curso.',
        'Preparación: identifica datos simulados, variables y salida esperada.',
        'Ejecución: completa una práctica representativa y valida la consola.',
        'Análisis: usa IA Analizar para explicar por qué funcionó o falló.',
        'Evidencia: guarda una nota con salida, error corregido y aprendizaje.',
        'Cierre: aprueba el examen y revisa el certificado local.'
      ],
      capstoneLessonId: last?.id || null
    };
  });
}

function applyCurriculumUpgrade() {
  renameModules();
  fixDuplicateLessonTitles();
  let index = 0;
  COURSES.forEach(course => course.modules.forEach(module => module.lessons.forEach(lesson => {
    if (index < 40) upgradeTheory(lesson, course, index);
    upgradeExercise(lesson, course);
    upgradeQuiz(lesson, course);
    index += 1;
  })));
  addCourseGuidedLabs();
}




const GLOSSARY_EXTENSION = [
  { term:'HTTP', category:'Web', definition:'Protocolo base de la web que organiza peticiones y respuestas entre cliente y servidor.', example:'GET /login devuelve una respuesta con status, headers y cuerpo.' },
  { term:'HTTPS', category:'Web', definition:'HTTP protegido con cifrado TLS para reducir exposición de datos en tránsito.', example:'Una app debe preferir https:// para proteger sesiones y credenciales.' },
  { term:'DNS', category:'Redes', definition:'Sistema que traduce nombres de dominio a direcciones IP para que los clientes encuentren servicios.', example:'api.lab.local podría resolverse hacia 127.0.0.1 en un laboratorio.' },
  { term:'TCP', category:'Redes', definition:'Protocolo orientado a conexión usado por servicios que requieren entrega confiable.', example:'HTTP, SSH y muchas APIs suelen apoyarse en TCP.' },
  { term:'UDP', category:'Redes', definition:'Protocolo sin conexión usado cuando importa velocidad o simplicidad sobre confirmación de entrega.', example:'DNS suele usar UDP para consultas pequeñas.' },
  { term:'Puerto', category:'Redes', definition:'Número lógico que identifica un servicio dentro de un host.', example:'80 para HTTP, 443 para HTTPS y 22 para SSH.' },
  { term:'Localhost', category:'Laboratorio', definition:'Nombre que apunta a tu propia máquina, normalmente 127.0.0.1.', example:'Practicar contra localhost evita tocar sistemas de terceros.' },
  { term:'LAN', category:'Redes', definition:'Red local donde están equipos conectados al mismo entorno físico o WiFi.', example:'Tu PC y tu móvil pueden estar en la misma LAN para probar la PWA.' },
  { term:'Endpoint', category:'Web', definition:'Ruta específica de una API o servicio que recibe una petición.', example:'GET /api/users es un endpoint simulado.' },
  { term:'GET', category:'Web', definition:'Método HTTP usado normalmente para solicitar información sin modificar recursos.', example:'GET /status puede devolver estado de servicio.' },
  { term:'POST', category:'Web', definition:'Método HTTP usado normalmente para enviar datos y crear o procesar información.', example:'POST /login envía credenciales en un laboratorio controlado.' },
  { term:'Status code', category:'Web', definition:'Código numérico HTTP que resume el resultado de una respuesta.', example:'200 OK, 403 Forbidden, 404 Not Found y 500 Server Error.' },
  { term:'Cookie', category:'Web', definition:'Dato pequeño guardado por el navegador para sesión, preferencias u otros estados.', example:'Una cookie de sesión debe protegerse con HttpOnly, Secure y SameSite.' },
  { term:'Token', category:'Identidad', definition:'Valor usado para representar autorización, sesión o acceso temporal.', example:'Un token simulado puede aparecer en un header Authorization.' },
  { term:'Autenticación', category:'Identidad', definition:'Proceso de confirmar quién es el usuario o sistema.', example:'Usuario y MFA forman parte de autenticación.' },
  { term:'Autorización', category:'Identidad', definition:'Proceso de decidir qué puede hacer una identidad autenticada.', example:'Un usuario autenticado no siempre debe acceder a /admin.' },
  { term:'CORS', category:'Web', definition:'Mecanismo del navegador que controla qué orígenes pueden leer respuestas entre sitios.', example:'Una mala configuración CORS puede exponer datos a orígenes no confiables.' },
  { term:'SIEM', category:'Blue Team', definition:'Plataforma que centraliza eventos, correlaciona señales y ayuda a investigar alertas.', example:'Un mini SIEM educativo cuenta eventos failed y genera severidad.' },
  { term:'EDR', category:'Endpoint', definition:'Herramienta de detección y respuesta en endpoints como laptops o servidores.', example:'Un EDR podría alertar sobre un proceso sospechoso simulado.' },
  { term:'Playbook', category:'Blue Team', definition:'Procedimiento paso a paso para responder de forma consistente a un tipo de alerta.', example:'Playbook de phishing: aislar, validar, reportar y educar.' },
  { term:'Severidad', category:'Riesgo', definition:'Medida de gravedad técnica o operativa de un hallazgo o alerta.', example:'Alta, media o baja según impacto y evidencia.' },
  { term:'Impacto', category:'Riesgo', definition:'Consecuencia potencial si un riesgo se materializa.', example:'Exposición de datos, toma de cuenta o interrupción de servicio.' },
  { term:'Riesgo', category:'Riesgo', definition:'Combinación de probabilidad e impacto de un evento no deseado.', example:'Una contraseña débil aumenta riesgo de toma de cuenta.' },
  { term:'Hash', category:'Python / Seguridad', definition:'Huella calculada a partir de datos para comparar integridad o identificar muestras.', example:'Un hash simulado ayuda a practicar IOC sin manejar malware real.' },
  { term:'Encoding', category:'Datos', definition:'Forma de representar datos para transporte o almacenamiento.', example:'Base64 puede aparecer en tokens o evidencias, pero no es cifrado.' },
  { term:'JSON', category:'Datos', definition:'Formato de datos usado por APIs y configuraciones por su estructura clave-valor.', example:'{"status":"ok"} es una respuesta JSON simple.' },
  { term:'CSV', category:'Datos', definition:'Formato tabular de texto separado por comas, útil para reportes simples.', example:'usuario,evento,severidad en un inventario de alertas.' },
  { term:'Rate limit', category:'Web', definition:'Control que limita cantidad de solicitudes para reducir abuso y ruido.', example:'Un laboratorio puede simular bloqueo después de muchos intentos.' },
  { term:'Backup', category:'Resiliencia', definition:'Copia de información usada para recuperación ante error, incidente o pérdida.', example:'Exportar progreso JSON es un backup local de estudio.' },
  { term:'Contención', category:'Incident Response', definition:'Fase donde se limita el alcance de un incidente para evitar expansión.', example:'Bloquear una cuenta comprometida en escenario simulado.' },
  { term:'Erradicación', category:'Incident Response', definition:'Fase donde se elimina la causa o presencia de la amenaza.', example:'Eliminar una tarea sospechosa simulada después de validarla.' },
  { term:'Recuperación', category:'Incident Response', definition:'Fase donde se restaura operación normal y se verifica que el riesgo fue reducido.', example:'Reactivar servicio con MFA, logs y monitoreo.' },
  { term:'Lecciones aprendidas', category:'Incident Response', definition:'Revisión posterior para mejorar controles, procesos y entrenamiento.', example:'Actualizar un playbook después de un incidente simulado.' }
];

const SPECIFIC_LABS = {
  python_desde_cero: {
    title: 'Lab por pasos: Generador de reporte simple',
    objective: 'Construir una salida clara usando variables, strings, listas y condiciones básicas.',
    steps: ['Define el título del reporte y el nombre del operador.', 'Guarda tres hallazgos ficticios en una lista.', 'Recorre la lista y muestra cada hallazgo con numeración.', 'Agrega una conclusión con print() y f-string.', 'Valida la salida y guarda una nota con el aprendizaje.']
  },
  python_ciberseguridad: {
    title: 'Lab por pasos: Analizador de logs simulados',
    objective: 'Detectar eventos failed, contarlos y generar una recomendación defensiva.',
    steps: ['Carga una lista de eventos simulados.', 'Normaliza texto con lower() o strip().', 'Cuenta eventos fallidos con for e if.', 'Clasifica severidad por umbral.', 'Imprime un resumen para reporte y documenta evidencia.']
  },
  python_redes: {
    title: 'Lab por pasos: Inventario de servicios locales',
    objective: 'Modelar hosts, puertos y servicios sin escanear sistemas reales.',
    steps: ['Define hosts de laboratorio como 127.0.0.1 o nombres ficticios.', 'Relaciona puertos comunes con servicios.', 'Recorre el inventario y muestra servicio por puerto.', 'Marca servicios sensibles como SSH o admin.', 'Genera una recomendación de hardening.']
  },
  python_web: {
    title: 'Lab por pasos: Auditor de headers y API simulada',
    objective: 'Revisar respuestas HTTP ficticias y generar hallazgos seguros.',
    steps: ['Crea una respuesta simulada con status y headers.', 'Verifica headers de seguridad como X-Frame-Options.', 'Detecta cookie sin bandera segura en datos ficticios.', 'Clasifica impacto como bajo, medio o alto.', 'Redacta recomendación accionable.']
  },
  python_blue_team: {
    title: 'Lab por pasos: Mini SIEM educativo',
    objective: 'Convertir eventos simulados en alertas priorizadas.',
    steps: ['Recibe una cola de logs simulados.', 'Extrae señales como failed, admin o unknown.', 'Agrupa conteos por usuario o origen.', 'Calcula severidad con reglas simples.', 'Imprime alerta, evidencia y siguiente acción.']
  },
  python_avanzado: {
    title: 'Lab por pasos: Motor de reporte profesional',
    objective: 'Usar funciones, clases y manejo de errores para construir código mantenible.',
    steps: ['Define una función para formatear hallazgos.', 'Crea una clase simple de reporte.', 'Usa try/except para entradas inválidas.', 'Genera salida con f-strings.', 'Documenta cómo mejorarías el diseño.']
  },
  hacking_etico_python: {
    title: 'Lab por pasos: Hallazgo ético documentado',
    objective: 'Practicar metodología, evidencia, impacto y recomendación sin atacar terceros.',
    steps: ['Define alcance autorizado y objetivo de laboratorio.', 'Identifica una señal simulada de riesgo.', 'Documenta evidencia reproducible.', 'Describe impacto sin exagerar.', 'Propón recomendación y plan de re-test.']
  },
  labs_hacking_etico: {
    title: 'Lab por pasos: Operación segura en localhost',
    objective: 'Ejecutar una práctica controlada con bitácora y cierre responsable.',
    steps: ['Confirma que el entorno es local o simulado.', 'Prepara datos ficticios y resultado esperado.', 'Ejecuta la práctica sin tocar sistemas externos.', 'Guarda bitácora de comandos o decisiones.', 'Cierra con evidencia y aprendizaje.']
  },
  red_team_autorizado: {
    title: 'Lab por pasos: Purple Team defensivo',
    objective: 'Transformar una hipótesis adversaria autorizada en detección y mejora.',
    steps: ['Define una hipótesis de riesgo simulada.', 'Mapea táctica conceptual a MITRE.', 'Diseña señal defensiva observable.', 'Crea recomendación de detección.', 'Documenta gap y validación esperada.']
  },
  proyecto_final: {
    title: 'Lab por pasos: Entrega final PySec',
    objective: 'Integrar Python, defensa, reporte y ética en un caso final.',
    steps: ['Elige escenario final simulado.', 'Procesa datos con Python.', 'Genera hallazgos y severidad.', 'Prepara resumen ejecutivo.', 'Aprueba examen y emite certificado local.']
  },
  threat_defense_lab: {
    title: 'Lab por pasos: Informe de incidente simulado',
    objective: 'Aplicar account defense, phishing, malware defensivo, DLP e incident response en un caso único.',
    steps: ['Lee la alerta inicial simulada.', 'Identifica indicadores y activos afectados.', 'Clasifica fase: detección, contención, erradicación o recuperación.', 'Propón controles como MFA, hardening o DLP.', 'Redacta informe final con evidencias y lecciones aprendidas.']
  }
};

function ensureExtendedGlossary() {
  const seen = new Set(GLOSSARY.map(item => item.term.toLowerCase()));
  GLOSSARY_EXTENSION.forEach(item => {
    if (!seen.has(item.term.toLowerCase())) { GLOSSARY.push(item); seen.add(item.term.toLowerCase()); }
  });
}

function wordCount(text='') { return String(text || '').trim().split(/\s+/).filter(Boolean).length; }

function buildCourseSpecificTheory(lesson, course) {
  const kind = curriculumCourseKind(course.id);
  const concept = lesson.title || 'concepto';
  const objective = lesson.objective || 'resolver la misión de forma segura';
  const scenario = PEDAGOGY_SCENARIOS[kind] || PEDAGOGY_SCENARIOS.default;
  const map = {
    network: `Concepto: ${concept}. ${objective} En redes, el aprendizaje debe separar laboratorio de internet real: modelamos hosts, puertos, servicios y estados para entender inventario sin escanear objetivos ajenos. Este tema ayuda a reconocer qué dato representa un servicio, cómo se clasifica y qué evidencia conviene reportar. Error común: memorizar puertos sin entender el contexto del servicio o asumir riesgo sin validar. Trabaja paso a paso: identifica el host de laboratorio, interpreta el puerto, describe el servicio y redacta una recomendación clara. ${scenario}`,
    web: `Concepto: ${concept}. ${objective} En seguridad web, cada respuesta, header, cookie, status o estructura JSON aporta contexto para una revisión autorizada. No se trata de atacar páginas públicas, sino de aprender a leer señales y convertirlas en recomendaciones. Este tema entrena observación, precisión y reporte: qué se encontró, por qué importa y cómo mitigarlo. Error común: ver un dato técnico y declararlo vulnerabilidad sin explicar impacto. Primero identifica el elemento, luego su función, después el riesgo simulado y finalmente la recomendación. ${scenario}`,
    blue: `Concepto: ${concept}. ${objective} En Blue Team, la calidad del análisis depende de transformar eventos en evidencia útil. Una alerta no debe ser solo un texto llamativo; necesita señal, contexto, severidad y acción recomendada. Este tema entrena pensamiento defensivo: contar, filtrar, comparar y priorizar sin caer en falsos positivos. Error común: reaccionar ante una palabra sospechosa sin revisar frecuencia, origen o impacto. Practica con datos simulados, documenta qué viste y explica qué haría un analista antes de escalar. ${scenario}`,
    threat: `Concepto: ${concept}. ${objective} En Threat Defense estudiamos amenazas reales desde prevención, detección y respuesta, no desde abuso. El objetivo es entender señales como intentos fallidos, dominios sospechosos, procesos anómalos, fuga de datos o fases de incidente para defender mejor. Este tema debe producir criterio: qué evidencia existe, qué impacto tendría y qué acción reduce riesgo. Error común: confundir conocer una amenaza con ejecutarla. Aquí todo es simulado, documentado y orientado a protección. ${scenario}`,
    cyber: `Concepto: ${concept}. ${objective} En ciberseguridad, incluso una práctica pequeña debe dejar evidencia clara: entrada, transformación, salida y recomendación. Este tema se trabaja con datos simulados para que desarrolles criterio sin tocar sistemas reales. Error común: completar el código sin entender qué señal defensiva representa. Lee el objetivo, identifica el dato clave, valida la salida y escribe una nota breve. ${scenario}`,
    python: `Concepto: ${concept}. ${objective} En Python, dominar la base significa escribir instrucciones claras, leer salidas y corregir errores con método. Este tema entrena una pieza del flujo profesional: comprender el dato, elegir la estructura correcta y mostrar un resultado reproducible. Error común: copiar la solución sin entender por qué produce esa salida. Antes de ejecutar, predice qué debería aparecer en consola; después compara, ajusta y documenta el aprendizaje. ${scenario}`
  };
  return map[kind] || map.python;
}

function expandShortTheories() {
  COURSES.forEach(course => course.modules.forEach(module => module.lessons.forEach(lesson => {
    const wc = wordCount(lesson.theory);
    if (wc < 80 || ['python_redes','python_web','python_blue_team','threat_defense_lab'].includes(course.id)) {
      let txt = buildCourseSpecificTheory(lesson, course);
      const words = txt.split(/\s+/).filter(Boolean);
      if (words.length > 122) txt = words.slice(0, 122).join(' ') + '.';
      lesson.theory = txt;
      lesson.deep_theory = lesson.deep_theory || {};
      lesson.deep_theory.study_tip = 'Método recomendado: lee teoría, resuelve sin mirar solución, ejecuta, compara la salida, usa IA Pista por niveles y guarda una nota con el error corregido.';
    }
  })));
}

function personalizeGuidedChallenges() {
  COURSES.forEach(course => course.modules.forEach(module => module.lessons.forEach(lesson => {
    const ex = lesson.exercise || {};
    const kind = curriculumCourseKind(course.id);
    const byKind = {
      network: ['1. Identifica host, puerto o servicio del laboratorio.', '2. Relaciona el dato con su función defensiva.', '3. Escribe código mínimo para mostrar o clasificar.', '4. Valida que la salida sea exacta.', '5. Documenta recomendación de inventario o hardening.'],
      web: ['1. Lee status, header, cookie o JSON simulado.', '2. Detecta qué campo aporta evidencia.', '3. Clasifica impacto sin exagerar.', '4. Imprime hallazgo o recomendación exacta.', '5. Guarda nota con mitigación.'],
      blue: ['1. Revisa eventos simulados.', '2. Filtra señal relevante.', '3. Cuenta o clasifica evidencia.', '4. Genera alerta clara.', '5. Explica siguiente acción defensiva.'],
      threat: ['1. Lee la amenaza simulada.', '2. Identifica indicador, cuenta o dato afectado.', '3. Clasifica fase o riesgo.', '4. Propón control defensivo.', '5. Redacta salida de reporte.'],
      python: ex.guided_steps || []
    };
    if (byKind[kind]) ex.guided_steps = byKind[kind];
    ex.success_criteria = ex.success_criteria || [];
    if (!ex.success_criteria.some(x => String(x).includes('por qué'))) ex.success_criteria.push('Puedes explicar por qué la solución cumple el objetivo y qué error común evita.');
  })));
}

function improveScenarioQuizzes() {
  COURSES.forEach(course => course.modules.forEach(module => module.lessons.forEach(lesson => {
    if (!lesson.quiz) return;
    const kind = curriculumCourseKind(course.id);
    const title = lesson.title || 'misión';
    const scenarios = {
      network: `Escenario: documentas un inventario local y aparece el tema “${title}”. Debes elegir la opción que ayuda a entender servicios sin tocar redes externas.`,
      web: `Escenario: revisas una respuesta web simulada relacionada con “${title}”. Debes decidir qué opción mejora análisis, evidencia o mitigación segura.`,
      blue: `Escenario: recibes una alerta simulada sobre “${title}”. Debes elegir la opción que prioriza detección, contexto y respuesta defensiva.`,
      threat: `Escenario: investigas una amenaza ficticia asociada a “${title}”. Debes seleccionar la acción que protege cuentas, endpoints o datos sin ejecutar abuso.`,
      cyber: `Escenario: estás en un laboratorio autorizado practicando “${title}”. Debes elegir la respuesta que respeta alcance, evidencia y reporte profesional.`,
      python: `Escenario: construyes una base Python para “${title}”. Debes elegir la opción que produce código claro, verificable y fácil de mantener.`
    };
    lesson.quiz.scenario = scenarios[kind] || scenarios.python;
    lesson.quiz.explanation = `La respuesta correcta es “${lesson.quiz.answer}”. En este escenario, esa opción cumple el objetivo de aprendizaje y mantiene el trabajo dentro de laboratorio seguro. Relaciónalo con la teoría: identifica el dato, valida la salida, documenta evidencia y evita asumir riesgos sin contexto.`;
  })));
}

function applySpecificGuidedLabs() {
  COURSES.forEach(course => {
    const last = course.modules.flatMap(m => m.lessons).slice(-1)[0];
    const lab = SPECIFIC_LABS[course.id];
    if (lab) course.guidedLab = { ...lab, capstoneLessonId: last?.id || null };
  });
}

function applyCurriculumFix871() {
  ensureExtendedGlossary();
  expandShortTheories();
  personalizeGuidedChallenges();
  improveScenarioQuizzes();
  applySpecificGuidedLabs();
}

applyCurriculumUpgrade();
applyCurriculumFix871();