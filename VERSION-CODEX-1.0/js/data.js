const COURSES = [
  {
    id: "python_desde_cero",
    title: "Python desde cero",
    level: "Principiante",
    description: "Fundamentos de Python con prácticas guiadas para empezar desde cero.",
    icon: "🐍",
    ethical: false,
    modules: [
      { id: "fundamentos", title: "Bloque 1: Fundamentos", lessons: [
        lesson("py_001", "Tu primer programa con print()", "Aprender a mostrar información en pantalla.", "print() es una función integrada de Python que muestra texto o valores en la consola.", "print('Hola PySec')", ["print es la instrucción principal.", "El texto va entre comillas.", "La salida aparece en la consola."], "Muestra exactamente: Hola PySec", "# Escribe tu código aquí\n", "Hola PySec", "output_equals", "Usa print('Hola PySec')", "print('Hola PySec')", 10, 5, quiz("¿Qué hace print()?", ["Muestra información", "Borra archivos", "Abre puertos", "Instala Python"], "Muestra información")),
        lesson("py_002", "Comentarios y notas", "Usar comentarios para documentar el código.", "Los comentarios empiezan con # y ayudan a explicar el código sin ejecutarse.", "# Esto es un comentario\nprint('Documento mi código')", ["# inicia un comentario.", "Python ignora esa línea al ejecutar.", "Sirve para explicar decisiones."], "Escribe un comentario y muestra: Código documentado", "# Escribe un comentario\n", "Código documentado", "output_equals", "El comentario empieza con # y luego usa print().", "# Mi primer comentario\nprint('Código documentado')", 10, 5, quiz("¿Qué símbolo inicia un comentario en Python?", ["#", "//", "<!--", "**"], "#")),
        lesson("py_003", "Variables", "Guardar datos usando nombres descriptivos.", "Una variable guarda un valor para reutilizarlo. En ciberseguridad puedes guardar una IP, un puerto o un nivel de riesgo.", "ip = '127.0.0.1'\nprint(ip)", ["ip es el nombre.", "'127.0.0.1' es el valor.", "print(ip) muestra el valor."], "Crea una variable llamada usuario con tu nombre y muéstrala.", "usuario = ''\n", "Peter", "output_contains", "Asigna un texto a usuario y usa print(usuario).", "usuario = 'Peter'\nprint(usuario)", 15, 6, quiz("¿Qué guarda una variable?", ["Un valor", "Solo imágenes", "Solo errores", "Nada"], "Un valor")),
        lesson("py_004", "Tipos de datos", "Reconocer strings, números y booleanos.", "Python tiene tipos como str, int, float y bool. Elegir bien el tipo evita errores.", "puerto = 443\nservicio = 'HTTPS'\nactivo = True\nprint(servicio)", ["443 es int.", "'HTTPS' es str.", "True es bool."], "Crea puerto = 80 y muestra el valor.", "", "80", "output_equals", "No uses comillas para números si quieres un int.", "puerto = 80\nprint(puerto)", 15, 6, quiz("¿Cuál es un booleano válido?", ["True", "Verdadero", "'80'", "texto"], "True")),
        lesson("py_005", "Strings", "Trabajar con texto.", "Los strings guardan texto. Puedes unirlos, convertirlos a minúsculas y buscarlos dentro de logs.", "servicio = 'SSH'\nprint(servicio.lower())", ["lower() convierte a minúsculas.", "Es útil para comparar texto sin importar mayúsculas."], "Guarda 'HTTP' en servicio y muestra http en minúsculas.", "servicio = 'HTTP'\n", "http", "output_equals", "Usa servicio.lower().", "servicio = 'HTTP'\nprint(servicio.lower())", 15, 6, quiz("¿Qué método convierte texto a minúsculas?", ["lower()", "upper()", "append()", "splitlines()"], "lower()"))
      ]},
      { id: "logica", title: "Bloque 2: Lógica y estructuras", lessons: [
        lesson("py_006", "Condicionales if/else", "Tomar decisiones según una condición.", "if/else permite que un script reaccione. Por ejemplo, clasificar un código HTTP.", "status = 200\nif status == 200:\n    print('OK')\nelse:\n    print('Error')", ["== compara valores.", "La indentación es obligatoria.", "else se ejecuta si la condición falla."], "Si status es 200, imprime OK.", "status = 200\n", "OK", "output_equals", "Usa if status == 200:", "status = 200\nif status == 200:\n    print('OK')\nelse:\n    print('Error')", 20, 7, quiz("¿Qué operador compara igualdad?", ["==", "=", ">=", "!"], "==")),
        lesson("py_007", "Bucles for", "Repetir acciones sobre una colección.", "for permite recorrer listas de puertos, IPs o eventos.", "puertos = [22, 80, 443]\nfor p in puertos:\n    print(p)", ["p toma cada valor de la lista.", "El bloque indentado se repite."], "Recorre la lista puertos e imprime cada puerto.", "puertos = [22, 80, 443]\n", "22\n80\n443", "output_equals", "for p in puertos: y luego print(p).", "puertos = [22, 80, 443]\nfor p in puertos:\n    print(p)", 20, 8, quiz("¿Para qué sirve for?", ["Para repetir", "Para borrar", "Para cifrar", "Para cerrar la app"], "Para repetir")),
        lesson("py_008", "Listas", "Agrupar varios datos en una variable.", "Una lista permite almacenar varios elementos, como puertos o rutas de una app.", "puertos = [22, 80]\npuertos.append(443)\nprint(puertos)", ["[] crea la lista.", "append() agrega un elemento.", "print muestra la lista completa."], "Crea lista puertos con 22 y 80, agrega 443 y muéstrala.", "puertos = [22, 80]\n", "[22, 80, 443]", "output_equals", "Usa puertos.append(443).", "puertos = [22, 80]\npuertos.append(443)\nprint(puertos)", 20, 8, quiz("¿Qué método agrega un elemento a una lista?", ["append()", "lower()", "strip()", "open()"], "append()")),
        lesson("py_009", "Diccionarios", "Guardar datos con clave y valor.", "Los diccionarios son útiles para representar hallazgos, usuarios, servicios o alertas.", "hallazgo = {'titulo': 'Header ausente', 'riesgo': 'Medio'}\nprint(hallazgo['riesgo'])", ["Cada dato tiene clave y valor.", "Se accede con corchetes y la clave."], "Crea un diccionario servicio con nombre HTTP e imprime el nombre.", "", "HTTP", "output_equals", "Usa {'nombre': 'HTTP'} y print(servicio['nombre']).", "servicio = {'nombre': 'HTTP'}\nprint(servicio['nombre'])", 25, 9, quiz("¿Qué estructura usa clave:valor?", ["Diccionario", "String", "Bucle", "Comentario"], "Diccionario")),
        lesson("py_010", "Funciones", "Reutilizar lógica en bloques ordenados.", "Una función agrupa instrucciones. Sirve para crear herramientas limpias y reutilizables.", "def saludar():\n    print('Hola')\n\nsaludar()", ["def crea la función.", "El cuerpo va indentado.", "La función se ejecuta al llamarla."], "Crea una función alerta() que imprima Alerta generada y llámala.", "", "Alerta generada", "output_equals", "def alerta(): luego print y finalmente alerta().", "def alerta():\n    print('Alerta generada')\n\nalerta()", 25, 10, quiz("¿Qué palabra crea una función?", ["def", "func", "class", "returner"], "def"))
      ]},
      { id: "archivos_errores", title: "Bloque 3: Archivos y errores", lessons: [
        lesson("py_011", "try/except: capturar errores", "Capturar errores para que el script no se rompa.", "try/except evita que el script se detenga ante datos inesperados. En ciberseguridad, un script de análisis no debe caerse si encuentra un valor de log con formato roto.", "dato = 'abc'\ntry:\n    numero = int(dato)\nexcept ValueError:\n    print('Dato inválido capturado')", ["try envuelve el código que puede fallar.", "except captura el error específico.", "Sin except, el script lanza un traceback y se detiene."], "Convierte 'ip_invalida' a entero. Si hay error, imprime exactamente: Error capturado", "dato = 'ip_invalida'\n", "Error capturado", "output_equals", "Usa try: int(dato) y except ValueError: print('Error capturado').", "dato = 'ip_invalida'\ntry:\n    numero = int(dato)\nexcept ValueError:\n    print('Error capturado')", 20, 7, quiz("¿Qué hace el bloque except?", ["Captura y maneja el error", "Lanza un nuevo error", "Borra el archivo de log", "Reinicia el script"], "Captura y maneja el error")),
        lesson("py_012", "finally y errores específicos", "Usar finally para garantizar código de cierre y capturar errores concretos.", "finally siempre se ejecuta, haya error o no. Es ideal para registrar en el log que el análisis terminó, igual que un analista SOC firma el cierre de un ticket.", "try:\n    valor = int('formato_roto')\nexcept ValueError:\n    print('ValueError capturado')\nfinally:\n    print('Análisis completado')", ["except ValueError solo captura errores de conversión.", "finally ejecuta siempre — ideal para cerrar recursos.", "Un analista siempre documenta que el proceso terminó."], "Captura el ValueError al convertir 'dato_roto' a int. Muestra primero 'Error registrado' y luego 'Análisis completado'.", "try:\n    valor = int('dato_roto')\n", "Error registrado\nAnálisis completado", "output_equals", "Usa except ValueError: print('Error registrado') y finally: print('Análisis completado').", "try:\n    valor = int('dato_roto')\nexcept ValueError:\n    print('Error registrado')\nfinally:\n    print('Análisis completado')", 25, 8, quiz("¿Cuándo se ejecuta finally?", ["Siempre, haya error o no", "Solo si hay error", "Solo si no hay error", "Solo al importar módulos"], "Siempre, haya error o no")),
        lesson("py_013", "Leer archivos con open() y with", "Abrir y leer un archivo de texto desde el laboratorio virtual.", "with open('ruta', 'r') as f abre y cierra el archivo de forma segura y automática. En seguridad lees logs de red, listas de IPs sospechosas o configuraciones de sistemas.", "with open('accesos.txt', 'w') as f:\n    f.write('10.0.0.1 - login OK')\nwith open('accesos.txt', 'r') as f:\n    contenido = f.read()\nprint(contenido)", ["with cierra el archivo automáticamente al salir del bloque.", "mode 'r' es solo lectura — no puede modificar el archivo.", "Los logs son la primera fuente de evidencia en un análisis forense."], "Lee el archivo 'red.txt' del lab virtual y muestra su contenido. El archivo ya se crea en el starter — añade solo la lectura.", "# Creamos el log de red en el lab virtual\nwith open('red.txt', 'w') as f:\n    f.write('192.168.1.1 - Acceso autorizado')\n# Ahora lee red.txt y muestra su contenido\n", "192.168.1.1 - Acceso autorizado", "output_contains", "Usa with open('red.txt', 'r') as f: contenido = f.read() y luego print(contenido).", "# Creamos el log de red en el lab virtual\nwith open('red.txt', 'w') as f:\n    f.write('192.168.1.1 - Acceso autorizado')\n# Ahora lee red.txt y muestra su contenido\nwith open('red.txt', 'r') as f:\n    contenido = f.read()\nprint(contenido)", 25, 9, quiz("¿Qué modo 'r' indica al abrir un archivo?", ["Solo lectura", "Solo escritura", "Borrar el archivo", "Cifrar el contenido"], "Solo lectura")),
        lesson("py_014", "Escribir archivos y registrar alertas", "Guardar eventos de seguridad en un archivo de log.", "open() con modo 'a' (append) agrega al final sin borrar lo existente. Es el modo estándar para logs: cada alerta nueva se suma sin perder el historial.", "alerta = 'ALERTA: puerto 22 abierto'\nwith open('alertas.log', 'a') as f:\n    f.write(alerta + '\\n')\nprint('Alerta registrada')", ["mode 'a' agrega sin borrar el contenido previo.", "'w' sobrescribe, 'a' acumula — los logs de seguridad usan 'a'.", "Termina cada entrada con \\n para separar líneas en el log."], "Registra 'ALERTA: IP 10.0.0.9 sospechosa' en 'incidentes.log' con modo append. Muestra: Incidente registrado", "alerta = 'ALERTA: IP 10.0.0.9 sospechosa'\n", "Incidente registrado", "output_equals", "Usa with open('incidentes.log', 'a') as f: f.write(alerta + '\\n') y luego print exacto.", "alerta = 'ALERTA: IP 10.0.0.9 sospechosa'\nwith open('incidentes.log', 'a') as f:\n    f.write(alerta + '\\n')\nprint('Incidente registrado')", 25, 8, quiz("¿Qué modo de apertura agrega al final sin borrar?", ["'a' (append)", "'w' (write)", "'r' (read)", "'x' (exclusive)"], "'a' (append)")),
        lesson("py_015", "Rutas y carpetas con os", "Obtener el directorio de trabajo y listar archivos del laboratorio.", "os.getcwd() devuelve el directorio actual. os.listdir() lista archivos disponibles. Son el punto de partida de cualquier script de auditoría forense o inventario de sistema.", "import os\nruta = os.getcwd()\nprint('Directorio:', ruta)", ["os es el módulo estándar para rutas y sistema de archivos.", "getcwd() devuelve dónde está corriendo el script.", "listdir() lista los archivos — útil para auditar el contenido de una carpeta."], "Importa os, guarda os.getcwd() en ruta e imprime exactamente: Auditoría desde: /pysec-lab", "import os\n", "Auditoría desde: /pysec-lab", "output_equals", "ruta = os.getcwd() y luego print('Auditoría desde: ' + ruta).", "import os\nruta = os.getcwd()\nprint('Auditoría desde: ' + ruta)", 25, 8, quiz("¿Qué hace os.getcwd()?", ["Devuelve el directorio de trabajo actual", "Lista los archivos de red", "Crea una nueva carpeta", "Borra el directorio"], "Devuelve el directorio de trabajo actual"))
      ]}
    ]
  },
  {
    id: "python_ciberseguridad",
    title: "Python práctico para ciberseguridad",
    level: "Intermedio",
    description: "Automatiza análisis de logs, reportes y tareas defensivas con datos simulados.",
    icon: "🛡️",
    ethical: true,
    modules: [{ id: "logs_reportes", title: "Logs, patrones y reportes", lessons: [
      lesson("sec_101", "Ética y autorización", "Entender los límites del hacking ético.", "Solo se practica en laboratorios propios, 127.0.0.1, entornos simulados o sistemas con autorización explícita.", "objetivo = '127.0.0.1'\nprint('Objetivo autorizado')", ["Nunca pruebes en terceros sin permiso.", "Documenta el alcance.", "Prioriza defensa y aprendizaje."], "Imprime: Practico solo con autorización", "", "Practico solo con autorización", "output_equals", "Usa print con el texto exacto.", "print('Practico solo con autorización')", 20, 6, quiz("¿Dónde debes practicar?", ["En entornos autorizados", "En cualquier web", "En redes ajenas", "En cuentas de otros"], "En entornos autorizados")),
      lesson("sec_102", "Búsqueda de patrones", "Detectar palabras clave en eventos.", "El operador in permite detectar texto dentro de logs, como failed, error o critical.", "log = 'login failed user admin'\nif 'failed' in log:\n    print('Intento fallido')", ["'failed' in log devuelve True si aparece.", "Es rápido para detección simple."], "Si log contiene failed, imprime Intento fallido.", "log = 'login failed user admin'\n", "Intento fallido", "output_equals", "Usa if 'failed' in log:", "log = 'login failed user admin'\nif 'failed' in log:\n    print('Intento fallido')", 25, 8, quiz("¿Qué operador busca texto dentro de otro texto?", ["in", "inside", "has", "findall"], "in")),
      lesson("sec_103", "Contar eventos sospechosos", "Contar coincidencias en una lista de logs.", "Puedes recorrer una lista y aumentar un contador cuando aparece una señal.", "logs = ['failed', 'success', 'failed']\nfallos = 0\nfor log in logs:\n    if 'failed' in log:\n        fallos += 1\nprint(fallos)", ["fallos empieza en 0.", "+= 1 suma una coincidencia.", "El resultado ayuda a crear alertas."], "Cuenta cuántos logs contienen failed.", "logs = ['login failed', 'login success', 'login failed']\nfallos = 0\n", "2", "output_equals", "Recorre logs con for y suma si aparece failed.", "logs = ['login failed', 'login success', 'login failed']\nfallos = 0\nfor log in logs:\n    if 'failed' in log:\n        fallos += 1\nprint(fallos)", 30, 10, quiz("¿Qué hace += 1?", ["Suma uno", "Resta uno", "Borra una lista", "Crea una IP"], "Suma uno")),
      lesson("sec_104", "Regex básico", "Extraer patrones como IPs de texto.", "Las expresiones regulares permiten buscar patrones. En esta versión se simula el flujo para aprender la idea.", "import re\nprint('Módulo cargado')", ["re es la librería estándar para regex.", "Regex se usa mucho en forense y logs."], "Importa re y muestra Módulo cargado.", "", "Módulo cargado", "output_equals", "Escribe import re y luego print('Módulo cargado').", "import re\nprint('Módulo cargado')", 25, 8, quiz("¿Qué módulo estándar usa regex?", ["re", "osint", "scan", "httpx"], "re")),
      lesson("sec_105", "Reportes de hallazgos", "Crear una salida clara para documentar resultados.", "Un hallazgo debe tener título, severidad y recomendación. Python ayuda a generar reportes repetibles.", "titulo = 'Header ausente'\nseveridad = 'Media'\nprint(titulo + ' - ' + severidad)", ["El reporte convierte datos en evidencia clara.", "La documentación importa tanto como el código."], "Imprime: Header ausente - Media", "titulo = 'Header ausente'\nseveridad = 'Media'\n", "Header ausente - Media", "output_equals", "Concatena titulo + ' - ' + severidad.", "titulo = 'Header ausente'\nseveridad = 'Media'\nprint(titulo + ' - ' + severidad)", 30, 10, quiz("¿Qué debe incluir un hallazgo profesional?", ["Impacto y recomendación", "Solo colores", "Contraseñas reales", "Ataques a terceros"], "Impacto y recomendación"))
    ]}]
  },
  {
    id: "python_redes",
    title: "Python para redes",
    level: "Intermedio",
    description: "IP, puertos, sockets y comprobaciones solo en localhost o laboratorios.",
    icon: "🌐",
    ethical: true,
    modules: [{ id: "redes_base", title: "Redes seguras en laboratorio", lessons: [
      lesson("net_201", "IP y localhost", "Comprender el uso seguro de 127.0.0.1.", "127.0.0.1 representa tu propia máquina. Es ideal para prácticas seguras locales.", "ip = '127.0.0.1'\nprint(ip)", ["localhost evita tocar sistemas externos.", "Sirve para laboratorios como Juice Shop local."], "Guarda 127.0.0.1 en ip y muéstrala.", "", "127.0.0.1", "output_equals", "ip = '127.0.0.1' y print(ip).", "ip = '127.0.0.1'\nprint(ip)", 20, 6, quiz("¿Qué IP representa tu propia máquina?", ["127.0.0.1", "8.8.8.8", "0.0.0.0", "255.255.255.255"], "127.0.0.1")),
      lesson("net_202", "Puertos comunes", "Identificar servicios por puerto.", "Un puerto identifica un servicio. Ejemplo: 80 HTTP, 443 HTTPS, 22 SSH.", "puerto = 443\nif puerto == 443:\n    print('HTTPS')", ["Los puertos ayudan a entender servicios.", "La validación debe hacerse en objetivos autorizados."], "Si puerto es 443, imprime HTTPS.", "puerto = 443\n", "HTTPS", "output_equals", "Usa if puerto == 443:", "puerto = 443\nif puerto == 443:\n    print('HTTPS')", 25, 7, quiz("¿Qué servicio suele usar 443?", ["HTTPS", "FTP", "SMTP", "DNS"], "HTTPS")),
      lesson("net_203", "Sockets concepto", "Entender qué representa un socket.", "Un socket es un extremo de comunicación. En esta app se simula para evitar acciones de red reales.", "print('Socket creado')", ["socket.AF_INET representa IPv4.", "SOCK_STREAM representa TCP."], "Muestra: Socket creado", "", "Socket creado", "output_equals", "Usa print().", "print('Socket creado')", 20, 6, quiz("¿Qué representa AF_INET?", ["IPv4", "Base de datos", "Archivo", "Contraseña"], "IPv4")),
      lesson("net_204", "Reporte de servicios", "Crear un resumen de puertos observados.", "Un reporte de red debe ordenar puerto, servicio y estado sin asumir impacto sin evidencia.", "servicio = 'HTTP'\nestado = 'abierto'\nprint(servicio + ': ' + estado)", ["Separa datos de conclusiones.", "Reporta solo lo autorizado."], "Imprime: HTTP: abierto", "servicio = 'HTTP'\nestado = 'abierto'\n", "HTTP: abierto", "output_equals", "Concatena servicio + ': ' + estado.", "servicio = 'HTTP'\nestado = 'abierto'\nprint(servicio + ': ' + estado)", 25, 8, quiz("¿Qué debe tener un reporte de servicio?", ["Puerto, servicio y estado", "Contraseñas", "Datos ajenos", "Ataques reales"], "Puerto, servicio y estado"))
    ]}]
  },
  {
    id: "python_web",
    title: "Python para web y APIs",
    level: "Intermedio",
    description: "HTTP, headers, JSON y APIs con respuestas simuladas y laboratorios locales.",
    icon: "🕸️",
    ethical: true,
    modules: [{ id: "http_api", title: "HTTP defensivo", lessons: [
      lesson("web_301", "Códigos HTTP", "Interpretar respuestas de una aplicación web.", "Los códigos HTTP indican el resultado de una petición: 200 OK, 403 prohibido, 404 no encontrado.", "status = 200\nif status == 200:\n    print('OK')", ["200 significa respuesta exitosa.", "403 indica acceso prohibido.", "404 indica recurso no encontrado."], "Si status es 404, imprime No encontrado.", "status = 404\n", "No encontrado", "output_equals", "Usa if status == 404:", "status = 404\nif status == 404:\n    print('No encontrado')", 25, 7, quiz("¿Qué significa 404?", ["No encontrado", "Correcto", "Servidor apagado siempre", "Login exitoso"], "No encontrado")),
      lesson("web_302", "Headers de seguridad", "Reconocer cabeceras importantes.", "Headers como Content-Security-Policy, X-Frame-Options y X-Content-Type-Options reducen riesgos web.", "header = 'X-Frame-Options'\nprint(header)", ["Los headers son metadatos HTTP.", "No sustituyen correcciones de código, pero ayudan."], "Muestra: X-Frame-Options", "", "X-Frame-Options", "output_equals", "Usa print('X-Frame-Options').", "print('X-Frame-Options')", 25, 8, quiz("¿Qué protege X-Frame-Options?", ["Clickjacking", "Contraseñas débiles", "DNS", "Backups"], "Clickjacking")),
      lesson("web_303", "JSON en APIs", "Leer datos estructurados.", "Muchas APIs responden JSON. Python lo representa como diccionarios y listas.", "respuesta = {'ok': True, 'items': 3}\nprint(respuesta['items'])", ["JSON se parece a diccionarios.", "Las APIs suelen devolver campos clave/valor."], "Crea respuesta con status OK e imprime OK.", "", "OK", "output_equals", "respuesta = {'status': 'OK'}", "respuesta = {'status': 'OK'}\nprint(respuesta['status'])", 30, 9, quiz("¿Qué estructura de Python se parece a JSON object?", ["Diccionario", "Comentario", "Bucle", "Puerto"], "Diccionario")),
      lesson("web_304", "Exposición de datos", "Detectar campos sensibles en respuestas simuladas.", "Una API no debe devolver datos innecesarios como passwordHash o internalNotes al cliente.", "campos = ['name', 'email', 'passwordHash']\nif 'passwordHash' in campos:\n    print('Campo sensible')", ["No todo dato visible en JSON debe estar ahí.", "El backend debe filtrar la respuesta."], "Si campos contiene passwordHash, imprime Campo sensible.", "campos = ['name', 'passwordHash']\n", "Campo sensible", "output_equals", "Usa if 'passwordHash' in campos:", "campos = ['name', 'passwordHash']\nif 'passwordHash' in campos:\n    print('Campo sensible')", 30, 10, quiz("¿Qué es Excessive Data Exposure?", ["Enviar más datos de los necesarios", "Cifrar bien", "Usar HTTPS", "Crear variables"], "Enviar más datos de los necesarios"))
    ]}]
  },
  {
    id: "python_blue_team",
    title: "Python para Blue Team",
    level: "Avanzado",
    description: "Detección, IOCs, hashes y mini SIEM educativo.",
    icon: "🔵",
    ethical: true,
    modules: [{ id: "deteccion", title: "Detección defensiva", lessons: [
      lesson("blue_401", "Hashes de archivos", "Entender integridad mediante huellas digitales.", "Un hash cambia si el archivo cambia. Sirve para monitorear integridad.", "hash_archivo = 'abc123'\nprint('Hash generado')", ["hashlib es la librería estándar.", "La idea es detectar cambios no autorizados."], "Muestra: Hash generado", "", "Hash generado", "output_equals", "Usa print().", "print('Hash generado')", 25, 7, quiz("¿Para qué sirve un hash en defensa?", ["Verificar integridad", "Abrir puertos", "Borrar logs", "Evitar reportes"], "Verificar integridad")),
      lesson("blue_402", "IOCs", "Comprender indicadores de compromiso.", "Un IOC puede ser una IP, dominio, hash, ruta o evento sospechoso observado.", "ioc = 'malware.example'\nprint(ioc)", ["Los IOCs ayudan a buscar señales.", "Deben validarse para evitar falsos positivos."], "Guarda IOC-TEST en ioc y muéstralo.", "", "IOC-TEST", "output_equals", "ioc = 'IOC-TEST' y print(ioc).", "ioc = 'IOC-TEST'\nprint(ioc)", 25, 8, quiz("¿Cuál puede ser un IOC?", ["Hash sospechoso", "Una clase CSS", "Un color", "Un botón"], "Hash sospechoso")),
      lesson("blue_403", "Alerta por umbral", "Crear una alerta si hay demasiados eventos.", "Los umbrales ayudan a detectar abuso: por ejemplo, 5 fallos de login en poco tiempo.", "fallos = 5\nif fallos >= 5:\n    print('Alerta')", ["Un umbral simple no es perfecto.", "Sirve como primera detección educativa."], "Si fallos es 5 o más, imprime Alerta.", "fallos = 5\n", "Alerta", "output_equals", "Usa if fallos >= 5:", "fallos = 5\nif fallos >= 5:\n    print('Alerta')", 30, 9, quiz("¿Qué es un umbral?", ["Un límite para activar una alerta", "Un puerto", "Un archivo CSS", "Una contraseña"], "Un límite para activar una alerta")),
      lesson("blue_404", "Mapeo MITRE básico", "Clasificar una señal dentro de una táctica.", "MITRE ATT&CK ayuda a organizar comportamientos adversarios. Aquí lo usamos de forma defensiva y conceptual.", "tactica = 'Credential Access'\nprint(tactica)", ["Las tácticas explican el objetivo del adversario.", "Sirve para reportes y detección."], "Muestra: Credential Access", "", "Credential Access", "output_equals", "Usa print('Credential Access').", "print('Credential Access')", 30, 9, quiz("¿MITRE ATT&CK ayuda a organizar qué?", ["Tácticas y técnicas", "Colores", "Fuentes", "Iconos"], "Tácticas y técnicas"))
    ]}]
  },
  {
    id: "python_avanzado",
    title: "Python avanzado",
    level: "Experto",
    description: "POO, typing, logging, testing, APIs y arquitectura de herramientas.",
    icon: "🚀",
    ethical: false,
    modules: [{ id: "profesional", title: "Python profesional", lessons: [
      lesson("adv_501", "Clases y objetos", "Modelar herramientas de forma ordenada.", "Una clase es una plantilla para crear objetos. Sirve para organizar scanners, reportes o alertas.", "class Alerta:\n    pass\nprint('Clase lista')", ["class crea una plantilla.", "pass permite dejar un bloque vacío temporalmente."], "Crea una clase Agente y muestra Agente listo.", "", "Agente listo", "output_equals", "class Agente: pass y luego print().", "class Agente:\n    pass\nprint('Agente listo')", 35, 10, quiz("¿Qué crea class?", ["Una plantilla de objetos", "Un comentario", "Un número", "Un puerto"], "Una plantilla de objetos")),
      lesson("adv_502", "Type hints", "Anotar tipos para código mantenible.", "Los type hints documentan qué tipos espera una función. Ayudan a reducir errores en proyectos grandes.", "def sumar(a: int, b: int) -> int:\n    return a + b\nprint('Tipos claros')", ["a: int indica que a debería ser entero.", "-> int indica retorno entero."], "Muestra: Tipos claros", "", "Tipos claros", "output_equals", "Usa print().", "print('Tipos claros')", 25, 7, quiz("¿Para qué sirven los type hints?", ["Documentar tipos", "Ejecutar ataques", "Borrar datos", "Cerrar navegador"], "Documentar tipos")),
      lesson("adv_503", "Logging profesional", "Registrar eventos de una herramienta.", "logging permite guardar eventos con niveles: info, warning, error. Es mejor que prints sueltos en proyectos serios.", "print('INFO: análisis iniciado')", ["INFO es informativo.", "WARNING advierte riesgo.", "ERROR indica fallo."], "Muestra: INFO: análisis iniciado", "", "INFO: análisis iniciado", "output_equals", "Usa print con el texto exacto.", "print('INFO: análisis iniciado')", 25, 7, quiz("¿Qué registra logging?", ["Eventos de la app", "Solo imágenes", "Solo colores", "Nada"], "Eventos de la app")),
      lesson("adv_504", "Testing", "Validar que el código funciona.", "Las pruebas reducen errores. Un test compara resultado esperado contra resultado real.", "resultado = 2 + 2\nif resultado == 4:\n    print('Test OK')", ["assert es común en pytest.", "Aquí simulamos la idea con if."], "Si 2 + 2 es 4, imprime Test OK.", "resultado = 2 + 2\n", "Test OK", "output_equals", "if resultado == 4:", "resultado = 2 + 2\nif resultado == 4:\n    print('Test OK')", 30, 9, quiz("¿Qué busca un test?", ["Verificar comportamiento", "Romper sistemas", "Ocultar errores", "Subir archivos"], "Verificar comportamiento")),
      lesson("adv_505", "FastAPI concepto", "Entender una API backend con Python.", "FastAPI permite construir APIs modernas. Para esta PWA sería el backend futuro del ejecutor Python seguro.", "print('API lista')", ["Una API conecta frontend y backend.", "El backend futuro debe ejecutar código en sandbox."], "Muestra: API lista", "", "API lista", "output_equals", "Usa print().", "print('API lista')", 30, 8, quiz("¿Qué construirías con FastAPI?", ["Un backend API", "Un icono", "Un cable", "Una contraseña"], "Un backend API"))
    ]}]
  },
  {
    id: "hacking_etico_python",
    title: "Hacking Ético con Python",
    level: "Intermedio",
    description: "Metodología profesional, reconocimiento autorizado, OWASP conceptual, evidencias y reportes con prácticas seguras.",
    icon: "🧑‍💻",
    ethical: true,
    modules: [
      { id: "etica_metodologia", title: "Ética, alcance y metodología", lessons: [
        lesson("eth_701", "Qué es hacking ético", "Diferenciar hacking ético de actividad no autorizada.", "El hacking ético busca encontrar riesgos con permiso, documentarlos y ayudar a corregirlos. La autorización escrita, el alcance y la evidencia son obligatorios.", "permiso = True\nif permiso == True:\n    print('Práctica autorizada')", ["El permiso define si una prueba es ética.", "El objetivo es proteger, no dañar.", "Todo debe quedar documentado."], "Si permiso es True, imprime Práctica autorizada.", "permiso = True\n", "Práctica autorizada", "output_equals", "Usa if permiso == True:", "permiso = True\nif permiso == True:\n    print('Práctica autorizada')", 35, 10, quiz("¿Qué hace ética una prueba de seguridad?", ["Autorización y alcance", "Atacar rápido", "Ocultar evidencia", "Probar cualquier web"], "Autorización y alcance")),
        lesson("eth_702", "Alcance autorizado", "Crear una lista simple de objetivos permitidos.", "El alcance indica qué sistemas, fechas, métodos y límites están permitidos. Si algo no está en el alcance, no se prueba.", "objetivos = ['127.0.0.1', 'lab.local']\nprint(objetivos)", ["127.0.0.1 representa tu propio equipo.", "lab.local representa un laboratorio controlado.", "Nunca agregues terceros sin permiso."], "Crea objetivos con 127.0.0.1 y lab.local, luego muéstralos.", "", "[127.0.0.1, lab.local]", "output_equals", "Usa una lista y print(objetivos).", "objetivos = ['127.0.0.1', 'lab.local']\nprint(objetivos)", 35, 10, quiz("¿Qué debes hacer si un sistema no aparece en el alcance?", ["No probarlo", "Escanearlo igual", "Ignorar el contrato", "Publicarlo"], "No probarlo")),
        lesson("eth_703", "Fases del pentesting", "Entender el flujo profesional de una auditoría.", "Una auditoría ética sigue fases: preparación, reconocimiento, enumeración, validación controlada, reporte y re-test. La explotación destructiva no pertenece a una práctica educativa.", "fases = ['Preparación', 'Reconocimiento', 'Reporte']\nfor fase in fases:\n    print(fase)", ["Preparación define reglas.", "Reconocimiento recopila información autorizada.", "Reporte convierte hallazgos en acciones."], "Recorre fases e imprime cada una.", "fases = ['Preparación', 'Reconocimiento', 'Reporte']\n", "Preparación\nReconocimiento\nReporte", "output_equals", "Usa for fase in fases:", "fases = ['Preparación', 'Reconocimiento', 'Reporte']\nfor fase in fases:\n    print(fase)", 35, 11, quiz("¿Qué fase convierte el trabajo técnico en recomendaciones?", ["Reporte", "Improvisación", "Ocultamiento", "Ataque a terceros"], "Reporte"))
      ]},
      { id: "recon_web_owasp", title: "Reconocimiento web seguro y OWASP", lessons: [
        lesson("eth_704", "Reconocimiento pasivo autorizado", "Registrar información pública de un laboratorio sin tocar terceros.", "El reconocimiento pasivo recopila información sin enviar pruebas agresivas. En esta app se trabaja con datos simulados o laboratorios propios.", "dominio = 'lab.local'\nprint('Analizando ' + dominio)", ["dominio guarda el objetivo autorizado.", "El texto se concatena con +.", "La práctica es simulada."], "Muestra: Analizando lab.local", "dominio = 'lab.local'\n", "Analizando lab.local", "output_equals", "Usa print('Analizando ' + dominio).", "dominio = 'lab.local'\nprint('Analizando ' + dominio)", 35, 10, quiz("¿Qué objetivo es válido para practicar en esta app?", ["lab.local simulado", "Una web pública sin permiso", "La red de un vecino", "Cuentas ajenas"], "lab.local simulado")),
        lesson("eth_705", "Enumeración controlada", "Identificar servicios simulados sin atacar sistemas reales.", "Enumerar es listar recursos disponibles dentro del alcance. Aquí solo usamos listas simuladas para aprender el patrón mental.", "servicios = ['HTTP', 'SSH', 'DNS']\nfor s in servicios:\n    print(s)", ["La lista simula servicios.", "for recorre cada servicio.", "No hay tráfico real."], "Recorre servicios e imprime HTTP, SSH y DNS.", "servicios = ['HTTP', 'SSH', 'DNS']\n", "HTTP\nSSH\nDNS", "output_equals", "Usa for s in servicios:", "servicios = ['HTTP', 'SSH', 'DNS']\nfor s in servicios:\n    print(s)", 35, 10, quiz("¿Qué significa enumerar en un laboratorio?", ["Listar recursos dentro del alcance", "Romper el sistema", "Ocultar rastros", "Robar datos"], "Listar recursos dentro del alcance")),
        lesson("eth_706", "OWASP Top 10 conceptual", "Reconocer categorías de riesgo web sin explotar terceros.", "OWASP Top 10 agrupa riesgos comunes como control de acceso roto, inyección, fallos criptográficos y mala configuración. Se usa para priorizar revisiones defensivas.", "riesgo = 'Broken Access Control'\nprint(riesgo)", ["OWASP ayuda a ordenar riesgos.", "No es una lista de ataques para terceros.", "Se usa para aprender y corregir."], "Muestra: Broken Access Control", "", "Broken Access Control", "output_equals", "Usa print con el texto exacto.", "print('Broken Access Control')", 35, 9, quiz("¿Para qué sirve OWASP Top 10?", ["Priorizar riesgos web", "Atacar sin permiso", "Reemplazar reportes", "Ocultar fallos"], "Priorizar riesgos web")),
        lesson("eth_707", "Rutas sensibles simuladas", "Detectar rutas de interés en una lista local.", "En auditorías autorizadas se revisan rutas del alcance. En esta práctica usamos datos simulados para no tocar sistemas reales.", "rutas = ['/home', '/admin', '/login']\nif '/admin' in rutas:\n    print('Ruta sensible simulada')", ["/admin es una ruta de interés.", "La lista es local y simulada.", "El resultado se reporta como hallazgo potencial."], "Si rutas contiene /admin, imprime Ruta sensible simulada.", "rutas = ['/home', '/admin', '/login']\n", "Ruta sensible simulada", "output_equals", "Usa if '/admin' in rutas:", "rutas = ['/home', '/admin', '/login']\nif '/admin' in rutas:\n    print('Ruta sensible simulada')", 40, 12, quiz("¿Qué debes hacer con una ruta sensible encontrada?", ["Documentarla y validar autorización", "Publicarla", "Borrarla sin permiso", "Usarla contra terceros"], "Documentarla y validar autorización")),
        lesson("eth_708", "Control de acceso conceptual", "Entender IDOR/BOLA desde defensa.", "Un fallo de control de acceso ocurre cuando un usuario accede a recursos que no le pertenecen. En la práctica profesional se valida de forma controlada y se reporta sin exponer datos.", "usuario = 'normal'\nrecurso = 'propio'\nif recurso == 'propio':\n    print('Acceso permitido')", ["La autorización se valida en backend.", "No basta ocultar botones en frontend.", "La evidencia debe usar datos de prueba."], "Si recurso es propio, imprime Acceso permitido.", "usuario = 'normal'\nrecurso = 'propio'\n", "Acceso permitido", "output_equals", "Usa if recurso == 'propio':", "usuario = 'normal'\nrecurso = 'propio'\nif recurso == 'propio':\n    print('Acceso permitido')", 40, 12, quiz("¿Dónde debe validarse la autorización?", ["En el backend", "Solo en colores", "Solo en el logo", "Nunca"], "En el backend"))
      ]},
      { id: "evidencia_reporte", title: "Evidencias y reporte profesional", lessons: [
        lesson("eth_709", "Severidad e impacto", "Clasificar un hallazgo según su riesgo.", "La severidad combina impacto y probabilidad. Un reporte profesional explica qué puede pasar y cómo corregirlo.", "impacto = 5\nprobabilidad = 4\nriesgo = impacto + probabilidad\nif riesgo >= 9:\n    print('Riesgo alto')", ["impacto mide daño potencial.", "probabilidad mide posibilidad.", "La clasificación ayuda a priorizar."], "Si riesgo es 9 o más, imprime Riesgo alto.", "impacto = 5\nprobabilidad = 4\nriesgo = impacto + probabilidad\n", "Riesgo alto", "output_equals", "Usa if riesgo >= 9:", "impacto = 5\nprobabilidad = 4\nriesgo = impacto + probabilidad\nif riesgo >= 9:\n    print('Riesgo alto')", 40, 12, quiz("¿Qué debe explicar una severidad?", ["Impacto y prioridad", "Solo opinión", "Solo color", "Nada"], "Impacto y prioridad")),
        lesson("eth_710", "Plantilla de hallazgo", "Crear una salida simple de reporte ético.", "Un hallazgo útil contiene título, evidencia, impacto y recomendación. La claridad es tan importante como la técnica.", "hallazgo = {'titulo': 'Header ausente', 'severidad': 'Media'}\nprint(hallazgo['titulo'])", ["El diccionario guarda campos del reporte.", "El título debe ser claro.", "La severidad orienta prioridad."], "Crea hallazgo con titulo Alcance validado y muéstralo.", "", "Alcance validado", "output_equals", "Usa {'titulo': 'Alcance validado'}.", "hallazgo = {'titulo': 'Alcance validado'}\nprint(hallazgo['titulo'])", 45, 13, quiz("¿Qué debe incluir un reporte profesional?", ["Evidencia e impacto", "Solo capturas sin contexto", "Promesas falsas", "Datos robados"], "Evidencia e impacto"))
      ]}
    ]
  },
  {
    id: "labs_hacking_etico",
    title: "Laboratorios de Hacking Ético",
    level: "Intermedio",
    description: "Preparación de laboratorios locales, Juice Shop/WebGoat conceptual, checklist, evidencias y re-test.",
    icon: "🧪",
    ethical: true,
    modules: [{ id: "laboratorio_seguro", title: "Laboratorio seguro", lessons: [
      lesson("lab_801", "Reglas del laboratorio", "Definir límites claros antes de practicar.", "Un laboratorio seguro usa 127.0.0.1, máquinas propias, contenedores o plataformas autorizadas. Todo dato de práctica debe ser simulado.", "objetivo = '127.0.0.1'\nprint(objetivo)", ["127.0.0.1 apunta a tu equipo.", "No uses IPs públicas sin permiso.", "El laboratorio evita daño a terceros."], "Muestra 127.0.0.1", "", "127.0.0.1", "output_equals", "Usa print('127.0.0.1').", "print('127.0.0.1')", 30, 8, quiz("¿Cuál es el objetivo más seguro para iniciar?", ["127.0.0.1", "Cualquier servidor", "La cuenta de otro", "Una red ajena"], "127.0.0.1")),
      lesson("lab_802", "Checklist de preparación", "Crear una lista de controles antes de una práctica.", "Antes de practicar verifica alcance, backups, entorno aislado, logs y autorización. El checklist evita errores y abuso accidental.", "checklist = ['alcance', 'logs', 'backup']\nfor item in checklist:\n    print(item)", ["alcance define límites.", "logs permiten revisar actividad.", "backup ayuda a recuperar."], "Recorre checklist e imprime alcance, logs y backup.", "checklist = ['alcance', 'logs', 'backup']\n", "alcance\nlogs\nbackup", "output_equals", "Usa for item in checklist:", "checklist = ['alcance', 'logs', 'backup']\nfor item in checklist:\n    print(item)", 35, 10, quiz("¿Por qué usar checklist?", ["Para practicar con control", "Para saltar autorización", "Para borrar evidencia", "Para acelerar ataques reales"], "Para practicar con control")),
      lesson("lab_803", "Juice Shop y WebGoat conceptual", "Entender el rol de los laboratorios vulnerables.", "Juice Shop y WebGoat son entornos educativos diseñados para aprender vulnerabilidades web de forma controlada. Deben ejecutarse localmente o en plataformas autorizadas.", "lab = 'Juice Shop local'\nprint(lab)", ["Son laboratorios, no objetivos reales.", "Ayudan a practicar OWASP.", "La evidencia debe quedarse en el entorno de estudio."], "Muestra: Juice Shop local", "", "Juice Shop local", "output_equals", "Usa print con el texto exacto.", "print('Juice Shop local')", 30, 8, quiz("¿Para qué sirven Juice Shop y WebGoat?", ["Practicar en laboratorio", "Atacar empresas", "Robar sesiones", "Evitar reportes"], "Practicar en laboratorio")),
      lesson("lab_804", "Registro de evidencias", "Crear una evidencia simulada de laboratorio.", "La evidencia debe ser reproducible, clara y sin datos sensibles reales. Incluye fecha, objetivo de prueba y resultado observado.", "evidencia = {'objetivo': 'lab.local', 'resultado': 'header ausente'}\nprint(evidencia['resultado'])", ["objetivo identifica el entorno.", "resultado resume lo observado.", "No se guardan datos sensibles reales."], "Crea evidencia con resultado prueba segura y muéstralo.", "", "prueba segura", "output_equals", "Usa un diccionario con resultado.", "evidencia = {'resultado': 'prueba segura'}\nprint(evidencia['resultado'])", 40, 11, quiz("¿Cómo debe ser la evidencia?", ["Clara y sin datos sensibles reales", "Secreta y confusa", "Sin contexto", "Con datos robados"], "Clara y sin datos sensibles reales")),
      lesson("lab_805", "Re-test", "Validar que una corrección funcionó.", "Después de corregir una vulnerabilidad se hace re-test para comprobar que el riesgo fue mitigado. Es una fase clave del ciclo profesional.", "estado = 'corregido'\nif estado == 'corregido':\n    print('Re-test OK')", ["Re-test verifica la corrección.", "No se debe asumir que algo quedó arreglado.", "El resultado se documenta."], "Si estado es corregido, imprime Re-test OK.", "estado = 'corregido'\n", "Re-test OK", "output_equals", "Usa if estado == 'corregido':", "estado = 'corregido'\nif estado == 'corregido':\n    print('Re-test OK')", 40, 10, quiz("¿Qué confirma un re-test?", ["Que la corrección funciona", "Que no hay reporte", "Que se puede atacar más", "Que no hacen falta logs"], "Que la corrección funciona")),
      lesson("lab_806", "Proyecto de laboratorio seguro", "Integrar checklist, evidencia y reporte corto.", "Un buen laboratorio termina con resumen: alcance, resultado y recomendación. Esto entrena hábitos profesionales.", "print('Alcance: local | Resultado: seguro | Recomendación: documentar')", ["El alcance evita confusión.", "El resultado resume la práctica.", "La recomendación orienta el siguiente paso."], "Muestra: Alcance: local | Resultado: seguro | Recomendación: documentar", "", "Alcance: local | Resultado: seguro | Recomendación: documentar", "output_equals", "Copia el texto exacto dentro de print().", "print('Alcance: local | Resultado: seguro | Recomendación: documentar')", 50, 15, quiz("¿Qué debe cerrar un laboratorio?", ["Reporte y aprendizaje", "Ataques a terceros", "Borrar todo", "Ocultar errores"], "Reporte y aprendizaje"))
    ]}]
  },
  {
    id: "red_team_autorizado",
    title: "Red Team básico autorizado",
    level: "Avanzado conceptual",
    description: "Tácticas MITRE, simulaciones seguras, Purple Team y detección sin técnicas dañinas.",
    icon: "🎯",
    ethical: true,
    modules: [{ id: "red_purple", title: "Red Team y Purple Team", lessons: [
      lesson("red_901", "Red Team vs Pentest", "Diferenciar simulación adversaria y auditoría puntual.", "Un pentest busca vulnerabilidades en un alcance definido. Red Team simula objetivos adversarios de forma autorizada y controlada para evaluar detección y respuesta.", "actividad = 'simulación autorizada'\nprint(actividad)", ["Ambos requieren permiso.", "Red Team mide defensa integral.", "La práctica aquí es conceptual."], "Muestra: simulación autorizada", "", "simulación autorizada", "output_equals", "Usa print('simulación autorizada').", "print('simulación autorizada')", 35, 10, quiz("¿Qué evalúa Red Team además de vulnerabilidades?", ["Detección y respuesta", "Colores de la app", "Solo contraseñas", "Nada"], "Detección y respuesta")),
      lesson("red_902", "Tácticas MITRE", "Mapear eventos a objetivos adversarios de forma defensiva.", "MITRE ATT&CK organiza tácticas como Reconnaissance, Initial Access, Credential Access, Lateral Movement e Impact. En esta app se usa para análisis y detección.", "tacticas = ['Reconnaissance', 'Credential Access']\nfor t in tacticas:\n    print(t)", ["Las tácticas describen objetivos.", "Las técnicas describen cómo se intentan lograr.", "Aquí solo se estudia para defender."], "Recorre tacticas e imprime Reconnaissance y Credential Access.", "tacticas = ['Reconnaissance', 'Credential Access']\n", "Reconnaissance\nCredential Access", "output_equals", "Usa for t in tacticas:", "tacticas = ['Reconnaissance', 'Credential Access']\nfor t in tacticas:\n    print(t)", 40, 12, quiz("¿Para qué usamos MITRE en la app?", ["Para detectar y clasificar", "Para atacar terceros", "Para ocultar logs", "Para saltar permisos"], "Para detectar y clasificar")),
      lesson("red_903", "Simulación de alerta", "Crear una alerta defensiva ante un patrón simulado.", "Purple Team une visión ofensiva autorizada y defensa. Se simulan señales para mejorar detecciones sin dañar sistemas.", "evento = 'login failed'\nif 'failed' in evento:\n    print('Alerta simulada')", ["El evento es ficticio.", "La alerta entrena detección.", "No hay ataque real."], "Si evento contiene failed, imprime Alerta simulada.", "evento = 'login failed'\n", "Alerta simulada", "output_equals", "Usa if 'failed' in evento:", "evento = 'login failed'\nif 'failed' in evento:\n    print('Alerta simulada')", 40, 10, quiz("¿Qué hace Purple Team?", ["Mejora detección con simulaciones autorizadas", "Evita reportes", "Ataca sin permiso", "Desactiva defensa"], "Mejora detección con simulaciones autorizadas")),
      lesson("red_904", "Cadena de ataque conceptual", "Entender una secuencia de alto nivel sin ejecución ofensiva.", "Una cadena conceptual ayuda a pensar en defensa: reconocimiento, acceso inicial simulado, detección, contención y mejora. No se enseña explotación real.", "cadena = ['reconocimiento', 'detección', 'contención']\nfor paso in cadena:\n    print(paso)", ["La cadena es didáctica.", "Incluye pasos defensivos.", "No ejecuta acciones ofensivas."], "Imprime los pasos de cadena en orden.", "cadena = ['reconocimiento', 'detección', 'contención']\n", "reconocimiento\ndetección\ncontención", "output_equals", "Usa for paso in cadena:", "cadena = ['reconocimiento', 'detección', 'contención']\nfor paso in cadena:\n    print(paso)", 40, 12, quiz("¿Qué NO se enseña aquí?", ["Explotación real contra terceros", "Clasificación defensiva", "Reportes", "Detección"], "Explotación real contra terceros")),
      lesson("red_905", "Matriz de detección", "Relacionar táctica, señal y defensa.", "Una matriz de detección conecta táctica MITRE, señal observable y control defensivo. Sirve para reportes Purple Team.", "deteccion = {'tactica': 'Credential Access', 'control': 'MFA'}\nprint(deteccion['control'])", ["tactica resume objetivo adversario.", "control indica defensa.", "MFA reduce riesgo de cuentas."], "Crea deteccion con control MFA y muéstralo.", "", "MFA", "output_equals", "Usa {'control': 'MFA'}.", "deteccion = {'control': 'MFA'}\nprint(deteccion['control'])", 40, 11, quiz("¿Qué conecta una matriz de detección?", ["Señal y control defensivo", "Colores y fuentes", "Ataques reales y ocultamiento", "Nada"], "Señal y control defensivo")),
      lesson("red_906", "Reporte Purple Team", "Cerrar una simulación con aprendizaje defensivo.", "El cierre de una simulación debe incluir objetivo, señal detectada, control recomendado y mejora priorizada.", "print('Señal: login failed | Control: MFA | Mejora: alertas')", ["Señal describe lo observado.", "Control reduce el riesgo.", "Mejora define el siguiente paso."], "Muestra: Señal: login failed | Control: MFA | Mejora: alertas", "", "Señal: login failed | Control: MFA | Mejora: alertas", "output_equals", "Copia el texto exacto en print().", "print('Señal: login failed | Control: MFA | Mejora: alertas')", 50, 15, quiz("¿Qué busca un reporte Purple Team?", ["Aprendizaje defensivo", "Ocultar hallazgos", "Atacar más", "Evitar mejoras"], "Aprendizaje defensivo"))
    ]}]
  },
  {
    id: "proyecto_final",
    title: "Proyecto final PySec",
    level: "Proyecto",
    description: "Integra Python, logs, web y reportes en herramientas educativas.",
    icon: "🏁",
    ethical: true,
    modules: [{ id: "final", title: "Capstone", lessons: [
      lesson("final_601", "Analizador de logs web", "Diseñar un mini detector de eventos sospechosos.", "Un analizador defensivo lee eventos, cuenta patrones y entrega un resumen útil.", "logs = ['404 /admin', '200 /home', '404 /login']\nprint('404 detectados: 2')", ["El objetivo es detectar patrones, no atacar.", "El reporte debe ser claro y reproducible."], "Muestra exactamente: 404 detectados: 2", "", "404 detectados: 2", "output_equals", "Usa print con el texto exacto.", "print('404 detectados: 2')", 50, 15, quiz("¿Cuál es el objetivo del proyecto?", ["Detectar y reportar patrones", "Atacar terceros", "Robar credenciales", "Ocultar evidencia"], "Detectar y reportar patrones")),
      lesson("final_602", "Generador de reportes", "Crear una salida final de hallazgo.", "El reporte final debe incluir hallazgo, severidad y recomendación.", "print('Hallazgo: Headers incompletos | Severidad: Media')", ["El reporte traduce datos técnicos en acción.", "La recomendación ayuda a corregir."], "Muestra: Hallazgo: Headers incompletos | Severidad: Media", "", "Hallazgo: Headers incompletos | Severidad: Media", "output_equals", "Copia el texto exacto dentro de print().", "print('Hallazgo: Headers incompletos | Severidad: Media')", 50, 12, quiz("¿Qué convierte un reporte en profesional?", ["Impacto y recomendación", "Mucho texto sin evidencia", "Sin severidad", "Sin contexto"], "Impacto y recomendación"))
    ]}]
  }
];

const BADGES = [
  { id: "first_script", title: "Primer Script", description: "Completaste tu primera práctica.", icon: "🐍" },
  { id: "apprentice", title: "Aprendiz Python", description: "Dominaste variables y fundamentos.", icon: "📘" },
  { id: "loop_runner", title: "Control de Flujo", description: "Completaste lógica, listas y funciones.", icon: "🔁" },
  { id: "ethical", title: "Ética Primero", description: "Aceptaste el modo responsable.", icon: "⚖️" },
  { id: "log_analyst", title: "Analista de Logs", description: "Detectas patrones en eventos simulados.", icon: "📄" },
  { id: "net_explorer", title: "Explorador Local", description: "Aprendiste redes con localhost.", icon: "🌐" },
  { id: "web_auditor", title: "Auditor Web", description: "Comprendes HTTP, headers y APIs.", icon: "🕸️" },
  { id: "blue_defender", title: "Defensor Blue Team", description: "Creaste alertas defensivas.", icon: "🔵" },
  { id: "python_pro", title: "Python Pro", description: "Entraste al nivel avanzado.", icon: "🚀" },
  { id: "ethical_hacker", title: "Hacker Ético Junior", description: "Completaste prácticas de hacking ético responsable.", icon: "🧑‍💻" },
  { id: "lab_operator", title: "Operador de Laboratorio", description: "Dominaste prácticas en entornos locales y simulados.", icon: "🧪" },
  { id: "purple_operator", title: "Operador Purple Team", description: "Comprendes simulaciones autorizadas y detección defensiva.", icon: "🎯" },
  { id: "certified_agent", title: "Agente PySec", description: "Completaste el proyecto final.", icon: "🏁" }
];

function lesson(id, title, objective, theory, example_code, example_explanation, instruction, starter_code, expected_output, validation_type, hint, solution, xp, estimated_minutes, quizData) {
  return {
    id, title, objective, theory, example_code, example_explanation,
    exercise: { instruction, starter_code, expected_output, validation_type, hint, solution },
    quiz: quizData,
    xp, estimated_minutes
  };
}

function quiz(question, options, answer) {
  return { question, options, answer, explanation: `Respuesta correcta: ${answer}.` };
}

/* ===== PySec Academy Elite content expansion ===== */
(function extendPySecContent(){
  const courseById = id => COURSES.find(c => c.id === id);
  const addModule = (courseId, module) => { const c = courseById(courseId); if (c) c.modules.push(module); };

  addModule('python_desde_cero', {
    id: 'control_avanzado', title: 'Bloque 3: Control avanzado', lessons: [
      lesson('py_011', 'Bucles while', 'Repetir mientras una condición sea verdadera.', 'while repite instrucciones hasta que una condición deje de cumplirse. Es útil para contadores, reintentos o menús simples.', 'i = 0\nwhile i < 3:\n    print(i)\n    i += 1', ['while evalúa una condición.', 'Debes actualizar la variable para evitar un bucle infinito.', 'i += 1 avanza el contador.'], 'Imprime 0, 1 y 2 usando while.', 'i = 0\n', '0\n1\n2', 'output_equals', 'Usa while i < 3: y luego i += 1.', 'i = 0\nwhile i < 3:\n    print(i)\n    i += 1', 25, 10, quiz('¿Qué evita que un while quede infinito?', ['Actualizar la condición o variable', 'Quitar print', 'Usar solo strings', 'Cerrar la app'], 'Actualizar la condición o variable')),
      lesson('py_012', 'input() y datos del usuario', 'Recibir información desde el usuario.', 'input() permite pedir un dato y guardarlo en una variable. Luego puedes mostrarlo o procesarlo.', "nombre = input('Nombre: ')\nprint('Hola ' + nombre)", ['input solicita un dato.', 'El valor llega como texto.', 'Puedes combinarlo con print para responder.'], 'Pide cualquier nombre con input() y muestra un saludo que contenga Hola', '', 'Hola', 'output_contains', 'Usa nombre = input(...) y print("Hola " + nombre). Si aparece el cuadro, escribe Peter o cualquier nombre.', "nombre = input('Nombre: ')\nprint('Hola ' + nombre)", 25, 10, quiz('¿Qué devuelve input()?', ['Texto', 'Un archivo', 'Un booleano siempre', 'Nada'], 'Texto')),
      lesson('py_013', 'try / except básico', 'Controlar errores sin detener el programa.', 'try/except sirve para manejar fallos. Permite mostrar un mensaje amigable cuando algo sale mal.', "try:\n    print(no_existe)\nexcept:\n    print('controlado')", ['try intenta ejecutar.', 'except reacciona si hay error.', 'Es útil para evitar cierres bruscos.'], "Usa try/except para mostrar controlado.", '', 'controlado', 'output_equals', 'Dentro de try intenta usar una variable inexistente y en except imprime controlado.', "try:\n    print(no_existe)\nexcept:\n    print('controlado')", 30, 11, quiz('¿Para qué sirve except?', ['Para manejar errores', 'Para crear listas', 'Para instalar módulos', 'Para comentar código'], 'Para manejar errores'))
    ]
  });

  addModule('python_ciberseguridad', {
    id: 'automatizacion_segura', title: 'Bloque extra: Automatización segura', lessons: [
      lesson('sec_106', 'Leer JSON defensivo', 'Interpretar datos estructurados de seguridad.', 'JSON es común en APIs y herramientas de seguridad. Python permite cargarlo para revisar eventos o configuraciones.', "import json\ndato = json.loads('{\"evento\":\"alerta\"}')\nprint(dato['evento'])", ['json.loads convierte texto JSON a estructura.', 'Luego accedes con claves.', 'Es útil para alertas y APIs.'], 'Carga un JSON con evento alerta y muéstralo.', '', 'alerta', 'output_equals', 'Usa import json y luego loads.', "import json\ndato = json.loads('{\"evento\":\"alerta\"}')\nprint(dato['evento'])", 30, 11, quiz('¿Qué hace json.loads?', ['Convierte texto JSON a estructura', 'Cifra un archivo', 'Borra un log', 'Escanea una red'], 'Convierte texto JSON a estructura')),
      lesson('sec_107', 'Clasificación de severidad', 'Asignar prioridad básica a un evento.', 'Puedes combinar condicionales para clasificar hallazgos en bajo, medio o alto y así priorizar respuesta.', "severidad = 8\nif severidad >= 8:\n    print('Alta')", ['La condición define la categoría.', 'Los rangos ayudan a responder mejor.', 'Es útil en automatización de reportes.'], 'Si severidad vale 8, imprime Alta.', 'severidad = 8\n', 'Alta', 'output_equals', 'Usa if severidad >= 8:', "severidad = 8\nif severidad >= 8:\n    print('Alta')", 30, 9, quiz('¿Por qué clasificar severidad?', ['Para priorizar', 'Para ocultar', 'Para evitar reportar', 'Para romper sistemas'], 'Para priorizar'))
    ]
  });

  addModule('python_redes', {
    id: 'redes_extra', title: 'Bloque extra: Redes esenciales', lessons: [
      lesson('net_206', 'Puertos comunes', 'Identificar servicios por puerto.', 'Reconocer puertos comunes te ayuda a interpretar inventarios y resultados de laboratorios locales.', "puertos = {80: 'HTTP', 443: 'HTTPS'}\nprint(puertos[443])", ['Los diccionarios relacionan puerto y servicio.', '443 suele asociarse a HTTPS.', 'Todo en esta app es educativo y local.'], 'Muestra HTTPS desde un diccionario de puertos.', '', 'HTTPS', 'output_equals', 'Usa un diccionario y print(puertos[443]).', "puertos = {80: 'HTTP', 443: 'HTTPS'}\nprint(puertos[443])", 30, 9, quiz('¿Qué servicio suele ir en 443?', ['HTTPS', 'FTP', 'SMTP', 'DNS'], 'HTTPS')),
      lesson('net_207', 'Recorrer objetivos locales', 'Preparar una pequeña lista de objetivos de laboratorio.', 'Puedes recorrer una lista de objetivos autorizados para construir reportes o validar inventarios.', "objetivos = ['127.0.0.1', 'lab.local']\nfor host in objetivos:\n    print(host)", ['La lista contiene objetivos permitidos.', 'for recorre cada elemento.', 'Es útil para inventario y preparación.'], 'Imprime 127.0.0.1 y lab.local', "objetivos = ['127.0.0.1', 'lab.local']\n", '127.0.0.1\nlab.local', 'output_equals', 'Usa for host in objetivos:', "objetivos = ['127.0.0.1', 'lab.local']\nfor host in objetivos:\n    print(host)", 30, 9, quiz('¿Qué objetivo es válido aquí?', ['127.0.0.1', 'Una IP ajena sin permiso', 'Un banco real', 'Una cuenta ajena'], '127.0.0.1'))
    ]
  });

  /* Removed dead legacy Web/API extension block: course id was obsolete. */

  addModule('python_blue_team', {
    id: 'blue_extra', title: 'Bloque extra: Blue Team operativo', lessons: [
      lesson('blue_506', 'Listas IOC', 'Preparar indicadores de compromiso simples.', 'Un IOC puede ser una IP, hash o dominio sospechoso. Guardarlos en listas facilita comparaciones y reportes.', "iocs = ['hash1', 'hash2']\nprint(len(iocs))", ['La lista agrupa indicadores.', 'len cuenta cuántos hay.', 'Luego puedes recorrerlos o compararlos.'], 'Crea una lista con 2 IOCs y muestra 2.', '', '2', 'output_equals', 'Usa len(iocs).', "iocs = ['hash1', 'hash2']\nprint(len(iocs))", 30, 9, quiz('¿Qué es un IOC?', ['Un indicador de compromiso', 'Un color de interfaz', 'Una base de datos siempre', 'Un comentario'], 'Un indicador de compromiso')),
      lesson('blue_507', 'Conteo por origen', 'Resumir cuántos eventos vienen de una misma fuente.', 'El resumen por origen ayuda a detectar comportamiento repetitivo y priorizar investigación.', "eventos = ['10.0.0.5', '10.0.0.5', '10.0.0.8']\nconteo = 0\nfor ip in eventos:\n    if ip == '10.0.0.5':\n        conteo += 1\nprint(conteo)", ['Puedes filtrar por IP.', 'El conteo simple ya da contexto.', 'Es un patrón muy usado en triage.'], 'Cuenta cuántas veces aparece 10.0.0.5', "eventos = ['10.0.0.5', '10.0.0.5', '10.0.0.8']\nconteo = 0\n", '2', 'output_equals', 'Recorre eventos y suma cuando la IP coincida.', "eventos = ['10.0.0.5', '10.0.0.5', '10.0.0.8']\nconteo = 0\nfor ip in eventos:\n    if ip == '10.0.0.5':\n        conteo += 1\nprint(conteo)", 30, 10, quiz('¿Para qué sirve resumir por origen?', ['Para detectar repetición', 'Para ocultar logs', 'Para borrar pruebas', 'Para desactivar seguridad'], 'Para detectar repetición'))
    ]
  });

  addModule('python_avanzado', {
    id: 'avanzado_extra', title: 'Bloque extra: Objetos y formato', lessons: [
      lesson('adv_506', 'Clases con atributos', 'Crear una clase básica y usar atributos.', 'Las clases ayudan a modelar objetos, como activos, hallazgos o usuarios. __init__ configura datos al crear el objeto.', "class Activo:\n    def __init__(self, nombre):\n        self.nombre = nombre\n\na = Activo('Servidor')\nprint(a.nombre)", ['class define el molde.', '__init__ recibe valores iniciales.', 'self.nombre guarda el atributo.'], 'Crea una clase Activo y muestra Servidor.', '', 'Servidor', 'output_equals', 'Usa __init__ y luego print(a.nombre).', "class Activo:\n    def __init__(self, nombre):\n        self.nombre = nombre\n\na = Activo('Servidor')\nprint(a.nombre)", 35, 12, quiz('¿Para qué sirve __init__?', ['Para inicializar el objeto', 'Para borrar el objeto', 'Para comentar código', 'Para abrir archivos'], 'Para inicializar el objeto')),
      lesson('adv_507', 'f-strings avanzados', 'Formatear salidas claras y profesionales.', 'Las f-strings hacen más legible la salida y son ideales para reportes y mensajes.', "nombre = 'Peter'\nnivel = 4\nprint(f'Agente {nombre} nivel {nivel}')", ['La f-string empieza con f.', 'Las llaves insertan variables.', 'Se usa mucho en reportes y logs.'], 'Muestra: Agente Peter nivel 4', '', 'Agente Peter nivel 4', 'output_equals', 'Usa print(f\'Agente {nombre} nivel {nivel}\').', "nombre = 'Peter'\nnivel = 4\nprint(f'Agente {nombre} nivel {nivel}')", 35, 10, quiz('¿Qué ventaja tiene una f-string?', ['Inserta variables con claridad', 'Solo sirve para listas', 'Evita Python', 'No admite texto'], 'Inserta variables con claridad'))
    ]
  });

  addModule('hacking_etico_python', {
    id: 'hacking_extra', title: 'Bloque extra: Hallazgos y recomendación', lessons: [
      lesson('eth_711', 'Evidencia reproducible', 'Redactar una evidencia breve y clara.', 'Una evidencia reproducible explica qué se hizo, dónde y qué se observó. Debe ser clara y ética.', "print('Evidencia: lab.local | Resultado: reproducible')", ['La evidencia debe ser breve.', 'Debe señalar el entorno de prueba.', 'Debe ser repetible por otro analista.'], 'Muestra exactamente: Evidencia: lab.local | Resultado: reproducible', '', 'Evidencia: lab.local | Resultado: reproducible', 'output_equals', 'Usa print con el texto exacto.', "print('Evidencia: lab.local | Resultado: reproducible')", 35, 10, quiz('¿Qué debe tener una evidencia?', ['Claridad y repetibilidad', 'Datos robados', 'Confusión', 'Ataques a terceros'], 'Claridad y repetibilidad')),
      lesson('eth_712', 'Recomendación útil', 'Cerrar un hallazgo con una acción concreta.', 'Una recomendación profesional debe ser accionable, medible y conectada con el riesgo encontrado.', "recomendacion = 'Agregar cabeceras de seguridad'\nprint(recomendacion)", ['La recomendación orienta corrección.', 'Debe ser específica.', 'Ayuda a priorizar acciones.'], 'Muestra: Agregar cabeceras de seguridad', '', 'Agregar cabeceras de seguridad', 'output_equals', 'Guarda el texto en una variable y muéstralo.', "recomendacion = 'Agregar cabeceras de seguridad'\nprint(recomendacion)", 35, 10, quiz('¿Cómo debe ser una recomendación?', ['Accionable', 'Ambigua', 'Irrelevante', 'Oculta'], 'Accionable'))
    ]
  });

  addModule('labs_hacking_etico', {
    id: 'labs_extra', title: 'Bloque extra: Operación de laboratorio', lessons: [
      lesson('lab_807', 'Servicios del laboratorio', 'Enumerar componentes de tu entorno local.', 'Un laboratorio suele tener app vulnerable, navegador, notas y registro de evidencias. Identificar componentes ordena tu práctica.', "componentes = ['Juice Shop', 'Notas', 'Evidencias']\nfor c in componentes:\n    print(c)", ['Cada componente cumple una función.', 'La organización mejora el estudio.', 'Todo permanece en tu entorno local.'], 'Imprime Juice Shop, Notas y Evidencias', "componentes = ['Juice Shop', 'Notas', 'Evidencias']\n", 'Juice Shop\nNotas\nEvidencias', 'output_equals', 'Usa for c in componentes:', "componentes = ['Juice Shop', 'Notas', 'Evidencias']\nfor c in componentes:\n    print(c)", 35, 10, quiz('¿Qué mejora un laboratorio bien organizado?', ['El aprendizaje y control', 'Los ataques a terceros', 'La confusión', 'El desorden'], 'El aprendizaje y control')),
      lesson('lab_808', 'Diario de laboratorio', 'Registrar un cierre corto de sesión.', 'Llevar un diario ayuda a recordar objetivos, resultados y próximos pasos.', "print('Sesión cerrada | Resultado: práctica segura')", ['Un diario resume la sesión.', 'Permite continuidad.', 'Mejora disciplina profesional.'], 'Muestra: Sesión cerrada | Resultado: práctica segura', '', 'Sesión cerrada | Resultado: práctica segura', 'output_equals', 'Usa print con el texto exacto.', "print('Sesión cerrada | Resultado: práctica segura')", 35, 10, quiz('¿Para qué sirve un diario de laboratorio?', ['Para documentar progreso', 'Para ocultar errores', 'Para olvidar pasos', 'Para atacar mejor'], 'Para documentar progreso'))
    ]
  });

  addModule('red_team_autorizado', {
    id: 'red_extra', title: 'Bloque extra: Purple Team avanzado', lessons: [
      lesson('red_907', 'Hipótesis de detección', 'Formular una hipótesis simple para defensa.', 'Una hipótesis de detección conecta un comportamiento observado con la señal que debería aparecer en los logs.', "hipotesis = 'Si hay intentos fallidos, se genera alerta'\nprint(hipotesis)", ['La hipótesis guía la prueba.', 'Debe ser verificable.', 'Se usa para mejorar detecciones.'], 'Muestra la hipótesis exacta.', '', 'Si hay intentos fallidos, se genera alerta', 'output_equals', 'Usa print con el texto exacto.', "hipotesis = 'Si hay intentos fallidos, se genera alerta'\nprint(hipotesis)", 35, 10, quiz('¿Qué debe ser una hipótesis?', ['Verificable', 'Secreta', 'Ilegal', 'Desordenada'], 'Verificable')),
      lesson('red_908', 'Gap defensivo', 'Representar una mejora pendiente.', 'Un gap defensivo es una capacidad que falta o puede mejorarse: alertas, MFA, segmentación o registros.', "gap = 'Falta MFA'\nprint(gap)", ['Identificar gaps ayuda a priorizar mejoras.', 'MFA reduce riesgo de acceso indebido.', 'El objetivo es cerrar debilidades.'], 'Muestra: Falta MFA', '', 'Falta MFA', 'output_equals', 'Usa una variable gap y print(gap).', "gap = 'Falta MFA'\nprint(gap)", 35, 9, quiz('¿Qué es un gap defensivo?', ['Una mejora pendiente', 'Una explotación real', 'Una contraseña', 'Un editor'], 'Una mejora pendiente'))
    ]
  });

  addModule('proyecto_final', {
    id: 'capstone_extra', title: 'Capstone extra', lessons: [
      lesson('final_603', 'Resumen ejecutivo', 'Redactar una salida final para stakeholders.', 'Un resumen ejecutivo sintetiza hallazgo, impacto y acción. Debe ser claro incluso para perfiles no técnicos.', "print('Resumen: riesgo medio | acción: corregir headers')", ['El resumen ejecutivo simplifica.', 'Debe mantener contexto.', 'Ayuda a tomar decisiones.'], 'Muestra: Resumen: riesgo medio | acción: corregir headers', '', 'Resumen: riesgo medio | acción: corregir headers', 'output_equals', 'Usa print con el texto exacto.', "print('Resumen: riesgo medio | acción: corregir headers')", 50, 12, quiz('¿A quién ayuda un resumen ejecutivo?', ['A perfiles técnicos y no técnicos', 'Solo a atacantes', 'A nadie', 'Solo al navegador'], 'A perfiles técnicos y no técnicos')),
      lesson('final_604', 'Checklist de cierre', 'Cerrar un proyecto con tareas verificables.', 'El cierre profesional incluye entrega, re-test, documentación y próximos pasos.', "check = ['entrega', 're-test']\nfor paso in check:\n    print(paso)", ['El checklist reduce omisiones.', 'Ordena el cierre del proyecto.', 'Facilita seguimiento.'], 'Imprime entrega y re-test', "check = ['entrega', 're-test']\n", 'entrega\nre-test', 'output_equals', 'Usa for paso in check:', "check = ['entrega', 're-test']\nfor paso in check:\n    print(paso)", 50, 12, quiz('¿Qué logra un checklist de cierre?', ['Orden y control', 'Desorden', 'Ataques reales', 'Pérdida de evidencia'], 'Orden y control'))
    ]
  });

  BADGES.push(
    { id: 'challenge_master', title: 'Challenge Master', description: 'Completaste 25 ejercicios y consolidaste tu ritmo.', icon: '🏆' },
    { id: 'dark_operator', title: 'Dark Operator', description: 'Superaste 50 ejercicios y dominaste la ruta premium.', icon: '🌑' }
  );
})();

/* ===== Content expansion: core routes ===== */
(function extendPySecV5(){
  const courseById = id => COURSES.find(c => c.id === id);
  const addModule = (courseId, module) => { const c = courseById(courseId); if (c) c.modules.push(module); };
  addModule('python_desde_cero', { id:'core_mastery', title:'Bloque 4: Python Mastery', lessons:[
    lesson('py_014','Operadores matemáticos','Practicar operaciones con precedencia.','Python respeta prioridad matemática: primero multiplicación y división, luego suma y resta.',"resultado = 2 + 3 * 4\nprint(resultado)",['3 * 4 se resuelve primero.','Luego se suma 2.','El resultado es 14.'],'Muestra el resultado de 2 + 3 * 4.','', '14','output_equals','Usa resultado = 2 + 3 * 4.',"resultado = 2 + 3 * 4\nprint(resultado)",25,8,quiz('¿Qué se resuelve primero?',['Multiplicación','Suma','Comentario','print'], 'Multiplicación')),
    lesson('py_015','Conversión int()','Convertir texto numérico a entero.','input() devuelve texto. int() permite convertirlo a número para hacer cálculos.',"numero = int('5')\nprint(numero + 1)",['int convierte texto numérico.','Luego puedes sumar.','Es clave para formularios.'],'Convierte "5" a entero y muestra 6.','', '6','output_equals','Usa int(\'5\').',"numero = int('5')\nprint(numero + 1)",25,8,quiz('¿Qué hace int("5")?',['Convierte a entero','Crea un archivo','Borra texto','Abre red'], 'Convierte a entero')),
    lesson('py_016','Método split()','Separar texto en partes.','split() divide un string usando espacios o un separador. Sirve para procesar logs y comandos.',"evento = 'login failed admin'\npartes = evento.split(' ')\nprint(partes[1])",['split genera una lista.','partes[1] toma el segundo elemento.','failed queda separado.'],'Separa el texto login failed admin y muestra failed.','', 'failed','output_equals','Usa split y partes[1].',"evento = 'login failed admin'\npartes = evento.split(' ')\nprint(partes[1])",25,9,quiz('¿Qué devuelve split()?',['Una lista','Un puerto','Un booleano siempre','Nada'], 'Una lista'))
  ]});
  addModule('python_ciberseguridad', { id:'cyber_mastery', title:'Bloque élite: Automatización defensiva', lessons:[
    lesson('sec_108','Normalizar eventos','Unificar mayúsculas y minúsculas en logs.','Normalizar datos evita que Login Failed y login failed sean tratados como cosas distintas.',"evento = 'LOGIN FAILED'\nprint(evento.lower())",['lower() transforma a minúsculas.','Facilita comparar patrones.','Es una práctica común en detección.'],'Convierte LOGIN FAILED a minúsculas.','', 'login failed','output_equals','Usa evento.lower().',"evento = 'LOGIN FAILED'\nprint(evento.lower())",30,8,quiz('¿Por qué normalizar eventos?',['Para comparar mejor','Para ocultarlos','Para borrarlos','Para cambiar el sistema'], 'Para comparar mejor')),
    lesson('sec_109','Triage simple','Clasificar si un evento requiere revisión.','Triage es priorizar qué revisar primero. Un evento crítico debe pasar a revisión.',"evento = 'critical error'\nif 'critical' in evento:\n    print('Revisar')",['critical es la señal.','if detecta el patrón.','La salida orienta acción.'],'Si evento contiene critical, imprime Revisar.','evento = \'critical error\'\n', 'Revisar','output_equals','Usa if \'critical\' in evento:',"evento = 'critical error'\nif 'critical' in evento:\n    print('Revisar')",35,10,quiz('¿Qué es triage?',['Priorización','Ataque real','Cifrado siempre','Diseño visual'], 'Priorización')),
    lesson('sec_110','Reporte CSV conceptual','Crear una línea tipo CSV.','CSV permite guardar datos tabulares. Puedes generar líneas simples para reportes.',"linea = 'hallazgo,media,corregir'\nprint(linea)",['Los valores se separan con coma.','Es útil para exportar resultados.','Luego puede abrirse en hojas de cálculo.'],'Muestra hallazgo,media,corregir','', 'hallazgo,media,corregir','output_equals','Usa print con el texto exacto.',"print('hallazgo,media,corregir')",30,8,quiz('¿Qué separador usa CSV comúnmente?',['Coma','Llave','Paréntesis','Tablero'], 'Coma'))
  ]});
  addModule('python_redes', { id:'network_mastery', title:'Bloque élite: Inventario local', lessons:[
    lesson('net_208','Inventario de servicios','Representar servicios autorizados.','Un inventario local ordena servicios, puertos y estado para fines defensivos.',"servicio = {'puerto': 443, 'nombre': 'HTTPS'}\nprint(servicio['nombre'])",['Diccionario representa un servicio.','nombre describe el protocolo.','puerto ayuda al inventario.'],'Crea servicio HTTPS y muéstralo.','', 'HTTPS','output_equals','Usa un diccionario con nombre HTTPS.',"servicio = {'puerto': 443, 'nombre': 'HTTPS'}\nprint(servicio['nombre'])",30,9,quiz('¿Para qué sirve inventariar servicios?',['Para defender y ordenar','Para atacar terceros','Para borrar logs','Para ocultar accesos'], 'Para defender y ordenar')),
    lesson('net_209','Estado de puerto simulado','Clasificar un puerto como abierto o cerrado.','En esta app no se escanean terceros. Simulamos el estado para aprender lógica defensiva.',"estado = 'abierto'\nif estado == 'abierto':\n    print('Revisar servicio')",['estado es dato simulado.','if decide acción.','Revisar no significa atacar.'],'Si estado es abierto, imprime Revisar servicio.','estado = \'abierto\'\n', 'Revisar servicio','output_equals','Usa if estado == \'abierto\':',"estado = 'abierto'\nif estado == 'abierto':\n    print('Revisar servicio')",30,9,quiz('¿Qué representa este ejercicio?',['Simulación local','Escaneo real a terceros','Robo de datos','Malware'], 'Simulación local'))
  ]});
  /* Removed dead legacy API mastery block: course id was obsolete. */
  addModule('python_blue_team', { id:'blue_mastery', title:'Bloque élite: Detección y respuesta', lessons:[
    lesson('blue_508','Regla de alerta simple','Crear una regla basada en conteo.','Una regla simple puede alertar si el número de fallos supera un umbral.',"fallos = 5\nif fallos >= 5:\n    print('Alerta')",['El umbral es 5.','>= compara mayor o igual.','La alerta indica revisión.'],'Si fallos es 5 o más, imprime Alerta.','fallos = 5\n', 'Alerta','output_equals','Usa if fallos >= 5:',"fallos = 5\nif fallos >= 5:\n    print('Alerta')",35,10,quiz('¿Qué es un umbral?', ['Límite para disparar acción','Un archivo siempre','Un puerto fijo','Un ataque'], 'Límite para disparar acción')),
    lesson('blue_509','Playbook básico','Representar pasos de respuesta.','Un playbook define pasos repetibles para responder: detectar, contener y documentar.',"pasos = ['detectar', 'contener', 'documentar']\nfor p in pasos:\n    print(p)",['Detectar confirma señal.','Contener limita impacto.','Documentar deja evidencia.'],'Imprime detectar, contener y documentar.','pasos = [\'detectar\', \'contener\', \'documentar\']\n', 'detectar\ncontener\ndocumentar','output_equals','Usa for p in pasos:',"pasos = ['detectar', 'contener', 'documentar']\nfor p in pasos:\n    print(p)",35,10,quiz('¿Para qué sirve un playbook?', ['Respuesta repetible','Atacar terceros','Borrar evidencia','Desactivar todo'], 'Respuesta repetible')),
    lesson('blue_510','Post-incidente','Registrar una lección aprendida.','Después de un incidente se documenta qué ocurrió, qué funcionó y qué mejorar.',"leccion = 'Mejorar alertas'\nprint(leccion)",['El post-incidente mejora madurez.','La lección debe ser accionable.','Ayuda a prevenir repetición.'],'Muestra Mejorar alertas.','', 'Mejorar alertas','output_equals','Usa una variable leccion.',"leccion = 'Mejorar alertas'\nprint(leccion)",35,9,quiz('¿Qué busca una lección aprendida?', ['Mejora continua','Ocultar fallas','Culpar usuarios','Borrar registros'], 'Mejora continua'))
  ]});
  addModule('python_avanzado', { id:'advanced_mastery', title:'Bloque élite: Código profesional', lessons:[
    lesson('adv_508','Type hints conceptuales','Documentar tipos esperados.','Los type hints ayudan a leer y mantener código profesional. En este simulador se estudian conceptualmente.',"def sumar(a, b):\n    return a + b\n\nprint(sumar(2, 3))",['La función recibe dos valores.','return devuelve resultado.','Los hints se agregan en proyectos reales.'],'Crea sumar y muestra 5.','', '5','output_equals','Define sumar y retorna a + b.',"def sumar(a, b):\n    return a + b\n\nprint(sumar(2, 3))",35,11,quiz('¿Qué mejoran los type hints?', ['Lectura y mantenimiento','Ataques reales','Diseño de iconos','Contraseñas'], 'Lectura y mantenimiento')),
    lesson('adv_509','Logging conceptual','Crear un mensaje de log.','Logging registra eventos del programa. En seguridad es clave para auditoría y diagnóstico.',"nivel = 'INFO'\nmensaje = 'inicio'\nprint(nivel + ': ' + mensaje)",['nivel clasifica evento.','mensaje describe acción.','El log ayuda a depurar y auditar.'],'Muestra INFO: inicio','', 'INFO: inicio','output_equals','Concatena nivel, dos puntos y mensaje.',"nivel = 'INFO'\nmensaje = 'inicio'\nprint(nivel + ': ' + mensaje)",35,9,quiz('¿Para qué sirve logging?', ['Registrar eventos','Eliminar código','Cambiar colores','Abrir puertos'], 'Registrar eventos'))
  ]});
  addModule('hacking_etico_python', { id:'ethical_mastery', title:'Bloque élite: Pentesting responsable', lessons:[
    lesson('eth_713','Declaración de alcance','Crear una salida de alcance permitido.','Un alcance claro evita abusos y errores. Debe decir qué se puede probar y qué queda fuera.',"print('Alcance: laboratorio local')",['Alcance define límites.','Local evita terceros.','Debe estar documentado.'],'Muestra Alcance: laboratorio local','', 'Alcance: laboratorio local','output_equals','Usa print exacto.',"print('Alcance: laboratorio local')",35,9,quiz('¿Qué evita el alcance?', ['Probar fuera de permiso','Documentar','Practicar legalmente','Aprender'], 'Probar fuera de permiso')),
    lesson('eth_714','No impacto','Definir una regla de no daño.','Una práctica ética evita afectar disponibilidad, datos o cuentas reales.',"regla = 'no impacto'\nprint(regla)",['No impacto protege sistemas.','Se prioriza aprendizaje.','Se reporta sin dañar.'],'Muestra no impacto.','', 'no impacto','output_equals','Usa regla = \'no impacto\'.',"regla = 'no impacto'\nprint(regla)",35,8,quiz('¿Qué prioriza el hacking ético?', ['No dañar','Ocultar evidencia','Atacar sin permiso','Borrar logs'], 'No dañar')),
    lesson('eth_715','Re-test ético','Cerrar una corrección con validación.','Después de corregir un hallazgo, se valida de nuevo dentro del alcance para confirmar mitigación.',"estado = 'mitigado'\nif estado == 'mitigado':\n    print('Cierre aprobado')",['Mitigado indica corrección.','Re-test valida cierre.','Se documenta el resultado.'],'Si estado es mitigado, imprime Cierre aprobado.','estado = \'mitigado\'\n', 'Cierre aprobado','output_equals','Usa if estado == \'mitigado\':',"estado = 'mitigado'\nif estado == 'mitigado':\n    print('Cierre aprobado')",40,10,quiz('¿Qué confirma el re-test?', ['Mitigación','Ataque real','Exfiltración','Ocultamiento'], 'Mitigación'))
  ]});
  addModule('labs_hacking_etico', { id:'labs_mastery', title:'Bloque élite: Laboratorio profesional', lessons:[
    lesson('lab_809','Snapshot conceptual','Registrar punto de restauración.','En laboratorios reales se recomienda guardar snapshot antes de cambios grandes para poder restaurar.',"snapshot = 'antes-practica'\nprint(snapshot)",['Snapshot permite volver atrás.','Evita pérdida de entorno.','Es buena práctica en labs.'],'Muestra antes-practica.','', 'antes-practica','output_equals','Usa variable snapshot.',"snapshot = 'antes-practica'\nprint(snapshot)",35,9,quiz('¿Para qué sirve un snapshot?', ['Restaurar el entorno','Atacar mejor','Ocultar datos','Romper la app'], 'Restaurar el entorno')),
    lesson('lab_810','Bitácora final','Cerrar un laboratorio con aprendizaje.','La bitácora resume objetivo, resultado y siguiente paso. Ayuda a estudiar con disciplina.',"print('Objetivo OK | Aprendizaje registrado')",['La bitácora cierra la práctica.','El aprendizaje queda documentado.','Facilita mejorar.'],'Muestra Objetivo OK | Aprendizaje registrado','', 'Objetivo OK | Aprendizaje registrado','output_equals','Usa print exacto.',"print('Objetivo OK | Aprendizaje registrado')",40,10,quiz('¿Qué registra una bitácora?', ['Aprendizaje y resultado','Datos robados','Ataques ocultos','Contraseñas ajenas'], 'Aprendizaje y resultado'))
  ]});
  addModule('red_team_autorizado', { id:'red_mastery', title:'Bloque élite: Purple Team profesional', lessons:[
    lesson('red_909','Cobertura de detección','Medir si una señal está cubierta.','Cobertura indica si existe una regla, alerta o proceso para detectar cierto comportamiento.',"cobertura = True\nif cobertura == True:\n    print('Cubierto')",['True indica cobertura.','Si falta, se documenta gap.','Purple Team mejora cobertura.'],'Si cobertura es True, imprime Cubierto.','cobertura = True\n', 'Cubierto','output_equals','Usa if cobertura == True:',"cobertura = True\nif cobertura == True:\n    print('Cubierto')",40,10,quiz('¿Qué mide cobertura?', ['Si hay detección o control','Color del botón','Tamaño del archivo','Velocidad de internet'], 'Si hay detección o control')),
    lesson('red_910','Prioridad de mejora','Clasificar una mejora como alta.','No todas las mejoras tienen la misma prioridad. Se prioriza por riesgo, impacto y facilidad de implementación.',"prioridad = 'alta'\nprint(prioridad)",['alta indica urgencia.','Se usa para roadmap defensivo.','Debe justificarse con evidencia.'],'Muestra alta.','', 'alta','output_equals','Usa prioridad = \'alta\'.',"prioridad = 'alta'\nprint(prioridad)",35,8,quiz('¿Por qué priorizar mejoras?', ['Para enfocar recursos','Para ocultar fallos','Para borrar logs','Para atacar sistemas'], 'Para enfocar recursos'))
  ]});
  addModule('proyecto_final', { id:'final_mastery', title:'Bloque élite: Entrega final', lessons:[
    lesson('final_605','Matriz final','Representar hallazgo, riesgo y acción.','Una matriz final ayuda a presentar resultados de forma resumida y accionable.',"matriz = {'riesgo': 'medio', 'accion': 'corregir'}\nprint(matriz['accion'])",['El diccionario resume campos.','acción indica qué hacer.','Es útil en entregables.'],'Muestra corregir desde matriz.','', 'corregir','output_equals','Usa matriz[\'accion\'].',"matriz = {'riesgo': 'medio', 'accion': 'corregir'}\nprint(matriz['accion'])",50,12,quiz('¿Qué debe tener una matriz final?', ['Riesgo y acción','Solo colores','Nada técnico','Datos robados'], 'Riesgo y acción')),
    lesson('final_606','Certificación interna','Generar mensaje de cierre de ruta.','Al finalizar, un mensaje de cierre refuerza logro, ética y continuidad de estudio.',"print('Ruta PySec completada con ética')",['El cierre reconoce avance.','La ética sigue siendo central.','La práctica continúa con proyectos.'],'Muestra Ruta PySec completada con ética','', 'Ruta PySec completada con ética','output_equals','Usa print exacto.',"print('Ruta PySec completada con ética')",60,12,quiz('¿Qué debe permanecer al final?', ['Ética y mejora continua','Ataques ilegales','Ocultamiento','Desorden'], 'Ética y mejora continua'))
  ]});
})();

/* ===== Content expansion: final lab pack ===== */
(function extendPySecV5Final(){
  const courseById = id => COURSES.find(c => c.id === id);
  const addModule = (courseId, module) => { const c = courseById(courseId); if (c) c.modules.push(module); };
  addModule('python_desde_cero', { id:'final_core', title:'Bloque 5: Cierre Python Core', lessons:[
    lesson('py_017','Booleanos en decisiones','Usar True y False para controlar una condición.','Los booleanos representan verdadero o falso. Son esenciales para permisos, estados y validaciones.',"activo = True\nif activo == True:\n    print('Activo')",['True representa verdadero.','if evalúa la condición.','Se usa mucho en validaciones.'],'Si activo es True, imprime Activo.','activo = True\n','Activo','output_equals','Usa if activo == True:',"activo = True\nif activo == True:\n    print('Activo')",25,8,quiz('¿Qué representa True?',['Verdadero','Texto vacío','Un archivo','Un puerto'], 'Verdadero'))
  ]});
  addModule('python_ciberseguridad', { id:'final_cyber', title:'Bloque 100: Cierre Cyber', lessons:[
    lesson('sec_111','Control final de reporte','Verificar que un reporte tenga recomendación.','Antes de cerrar un reporte, confirma que incluya una recomendación accionable.',"reporte = {'recomendacion': 'activar MFA'}\nprint(reporte['recomendacion'])",['El diccionario representa el reporte.','La recomendación indica acción.','Esto mejora calidad del entregable.'],'Muestra activar MFA desde el reporte.','','activar MFA','output_equals','Usa reporte[\'recomendacion\'].',"reporte = {'recomendacion': 'activar MFA'}\nprint(reporte['recomendacion'])",35,9,quiz('¿Qué hace una recomendación?', ['Guía la corrección','Oculta fallos','Borra registros','Rompe sistemas'], 'Guía la corrección'))
  ]});
  addModule('proyecto_final', { id:'final_certificate', title:'Bloque 100: Certificación PySec', lessons:[
    lesson('final_607','Entrega certificable','Crear el mensaje final de certificación.','Una entrega certificable resume que completaste la ruta con enfoque ético, práctico y defensivo.',"print('Certificación PySec Elite completada')",['El mensaje final cierra la ruta.','Refuerza logro y disciplina.','Mantiene enfoque ético.'],'Muestra Certificación PySec Elite completada.','','Certificación PySec Elite completada','output_equals','Usa print exacto.',"print('Certificación PySec Elite completada')",70,12,quiz('¿Qué enfoque mantiene PySec?', ['Ético y defensivo','Ilegal','Sin práctica','Sin reportes'], 'Ético y defensivo'))
  ]});
})();


/* ===== Content expansion: balanced course pack ===== */
(function extendPySecV51(){
  const courseById = id => COURSES.find(c => c.id === id);
  const addModule = (courseId, module) => { const c = courseById(courseId); if (c) c.modules.push(module); };
  const L = (id, title, objective, theory, output, xp=30, min=8) => lesson(
    id, title, objective, theory,
    `print('${output}')`,
    ['Concepto explicado en formato corto.', 'Práctica segura y controlada.', 'Salida validada automáticamente.'],
    `Muestra exactamente: ${output}`,
    '', output, 'output_equals', 'Usa print con el texto exacto.', `print('${output}')`, xp, min,
    quiz('¿Cuál es el objetivo de esta práctica?', ['Aprendizaje seguro', 'Atacar terceros', 'Ocultar evidencia', 'Romper sistemas'], 'Aprendizaje seguro')
  );
  addModule('python_desde_cero', { id:'core_balance', title:'Bloque 5: Fundamentos sólidos', lessons:[
    L('py_018','Operadores de comparación','Comparar valores para tomar decisiones.','Los operadores como ==, !=, > y < permiten que un programa decida según datos reales.','Comparación lista',25,8),
    L('py_019','Método split()','Dividir texto en partes.','split() separa texto usando espacios o un separador. Es útil para logs, comandos y líneas CSV simples.','Split aplicado',25,9),
    L('py_020','Proyecto Core: resumen simple','Integrar variables, condicionales y salida.','Un proyecto pequeño ayuda a unir conceptos: guardar un dato, evaluarlo y mostrar un resultado claro.','Core completado',35,12)
  ]});
  addModule('python_ciberseguridad', { id:'cyber_balance', title:'Bloque 10/10: Automatización cyber', lessons:[
    L('sec_112','Normalizar eventos','Convertir texto a formato consistente.','Normalizar eventos permite comparar logs sin errores por mayúsculas o formatos diferentes.','Evento normalizado',30,9),
    L('sec_113','Filtro de severidad','Filtrar eventos importantes.','Un filtro permite quedarte con eventos de severidad alta para priorizar investigación.','Severidad alta',30,10),
    L('sec_114','Resumen de incidentes','Crear un resumen simple para reporte.','Un resumen debe ser corto, claro y orientado a acción.','Incidente resumido',35,11),
    L('sec_115','Checklist defensivo','Recorrer controles básicos.','Los controles como MFA, logs y backups reducen riesgo y ordenan el trabajo defensivo.','Checklist defensivo',35,10)
  ]});
  addModule('python_redes', { id:'network_balance', title:'Bloque 10/10: Redes de laboratorio', lessons:[
    L('net_212','DNS conceptual','Relacionar dominio e IP en laboratorio.','DNS traduce nombres a direcciones. En esta práctica usamos datos simulados para entender el concepto.','DNS local',30,9),
    L('net_210','Timeout conceptual','Entender límites de espera.','Un timeout evita que una herramienta espere para siempre. Es esencial en scripts autorizados.','Timeout seguro',30,8),
    L('net_211','Inventario de servicios','Crear un inventario local ordenado.','Un inventario documenta servicios dentro del alcance.','Inventario local',35,10),
    L('net_213','Reporte de red local','Crear una línea de reporte de laboratorio.','Un reporte de red resume host, puerto y estado observado.','Reporte local',35,10)
  ]});
  addModule('python_web', { id:'web_balance', title:'Bloque 10/10: Web y APIs completas', lessons:[
    L('web_408','Método POST conceptual','Diferenciar GET y POST.','GET suele pedir datos; POST suele enviar datos.','POST entendido',30,8),
    L('web_409','Códigos 401 y 403','Entender respuestas de autorización.','401 indica no autenticado; 403 indica sin permiso suficiente.','403 denegado',30,9),
    L('web_410','Header CSP conceptual','Reconocer Content-Security-Policy.','CSP ayuda a reducir riesgos de ejecución de scripts no deseados.','CSP revisado',30,8),
    L('web_411','Validación de campos','Revisar si un campo esperado existe.','Las APIs deben devolver solo los campos necesarios.','Campo validado',35,10),
    L('web_412','Tamaño de respuesta','Evaluar una respuesta simulada.','El tamaño de una respuesta ayuda a comparar cambios o salidas inesperadas.','Respuesta medida',30,8),
    L('web_413','API token conceptual','Representar un token de laboratorio.','Un token identifica una sesión o acceso y debe protegerse.','Token protegido',30,9),
    L('web_414','Respuesta JSON simulada','Leer un campo JSON de API.','Las APIs suelen responder en JSON. Entender claves y valores es básico.','JSON validado',35,9),
    L('web_415','Checklist OWASP corto','Imprimir tres controles web.','Un checklist ayuda a revisar acceso, entradas y configuración.','OWASP checklist',40,11)
  ]});
  addModule('python_blue_team', { id:'blue_balance', title:'Bloque 10/10: Respuesta defensiva', lessons:[
    L('blue_512','Regla de alerta simple','Crear una condición de alerta.','Una regla de alerta convierte una señal en acción cuando supera un umbral.','Alerta creada',35,10),
    L('blue_511','Playbook básico','Representar pasos de respuesta.','Un playbook lista acciones de respuesta: validar, contener, erradicar y recuperar.','Playbook listo',35,10),
    L('blue_513','Lección aprendida','Cerrar un incidente con mejora.','Después de un evento, documentar la mejora ayuda a reducir repetición.','Mejora registrada',35,9)
  ]});
  addModule('python_avanzado', { id:'advanced_balance', title:'Bloque 10/10: Ingeniería Python', lessons:[
    L('adv_510','Type hints prácticos','Anotar tipos para código más claro.','Los type hints documentan qué espera una función y ayudan a mantener herramientas.','Type hints listos',35,11),
    L('adv_511','Logging conceptual','Crear un mensaje de log simple.','logging ayuda a registrar eventos en herramientas reales.','Logging listo',35,10),
    L('adv_512','Arquitectura por módulos','Representar partes de una herramienta.','Dividir una herramienta en módulos facilita mantenerla.','Arquitectura lista',40,12)
  ]});
  addModule('proyecto_final', { id:'final_balance', title:'Bloque 10/10: Publicación final', lessons:[
    L('final_608','Demo final móvil','Crear mensaje de demo lista.','La última fase es preparar una demo clara: objetivo, resultado y siguiente mejora.','Demo lista para Android',60,12)
  ]});
})();

/* ===== PySec Academy Elite v8.4 Threat Defense Lab =====
   Ruta defensiva para amenazas reales: explica cómo operan a nivel conceptual
   y entrena detección, prevención, respuesta y reporte con datos simulados.
*/
(function extendThreatDefenseLabV84(){
  COURSES.push({
    id: 'threat_defense_lab',
    title: 'Threat Defense Lab',
    level: 'Intermedio / Avanzado defensivo',
    description: 'Amenazas reales explicadas desde defensa: cuentas, credenciales, phishing, malware, persistencia, evasión, DLP e incident response con labs simulados.',
    icon: '🧬',
    ethical: true,
    modules: [
      { id: 'threat_foundations', title: 'Fundamentos de amenazas reales', lessons: [
        lesson('threat_001','Qué son amenazas reales','Entender amenazas reales desde una perspectiva defensiva.','Una amenaza real es una actividad que puede afectar cuentas, sistemas o datos. En PySec se estudia para prevenir, detectar y responder, no para abusar de terceros.',"enfoque = 'defensa'\nprint(enfoque)",['Amenaza no significa práctica ofensiva real.','El objetivo es reducir riesgo.','Trabajamos con datos simulados y laboratorios.'],'Muestra defensa.','', 'defensa','output_equals','Usa print o una variable con defensa.',"enfoque = 'defensa'\nprint(enfoque)",35,8,quiz('¿Cuál es el enfoque de esta ruta?', ['Defensa y respuesta','Abuso real','Ocultamiento','Robo de datos'], 'Defensa y respuesta')),
        lesson('threat_002','Línea ética y legal','Diferenciar aprendizaje defensivo de abuso.','Conocer una amenaza no autoriza ejecutarla. La práctica profesional se basa en permiso, simulación, análisis de logs y mitigación.',"permiso = False\nif permiso == False:\n    print('No ejecutar')",['Sin permiso no se prueba.','La simulación protege a terceros.','La ética es parte del método.'],'Si permiso es False, imprime No ejecutar.','permiso = False\n', 'No ejecutar','output_equals','Usa if permiso == False:',"permiso = False\nif permiso == False:\n    print('No ejecutar')",35,8,quiz('¿Qué debes hacer sin autorización?', ['No ejecutar pruebas','Probar igual','Ocultar acciones','Publicar datos'], 'No ejecutar pruebas')),
        lesson('threat_003','Modelo amenaza → señal → defensa','Construir una matriz defensiva simple.','Una buena defensa conecta amenaza, señal observable y control. Así se transforma riesgo en acciones concretas.',"modelo = {'amenaza':'phishing','defensa':'MFA'}\nprint(modelo['defensa'])",['amenaza describe el riesgo.','señal describe lo observable.','defensa describe el control.'],'Crea modelo con defensa MFA y muéstralo.','', 'MFA','output_equals','Usa un diccionario con clave defensa.',"modelo = {'amenaza':'phishing','defensa':'MFA'}\nprint(modelo['defensa'])",35,9,quiz('¿Qué conecta una matriz defensiva?', ['Amenaza, señal y defensa','Contraseñas reales','Ataques ocultos','Datos ajenos'], 'Amenaza, señal y defensa'))
      ]},
      { id: 'account_takeover_defense', title: 'Account Takeover Defense', lessons: [
        lesson('threat_004','Account Takeover conceptual','Entender toma de cuenta desde defensa.','Una toma de cuenta ocurre cuando alguien no autorizado accede a una cuenta. La defensa usa MFA, alertas, recuperación segura y revisión de sesiones.',"evento = 'login success desconocido'\nif 'desconocido' in evento:\n    print('Riesgo de cuenta')",['No se enseña a tomar cuentas.','Se analizan señales simuladas.','MFA y alertas reducen riesgo.'],'Si evento contiene desconocido, imprime Riesgo de cuenta.','evento = \'login success desconocido\'\n', 'Riesgo de cuenta','output_equals','Usa if \'desconocido\' in evento:',"evento = 'login success desconocido'\nif 'desconocido' in evento:\n    print('Riesgo de cuenta')",40,10,quiz('¿Qué reduce riesgo de toma de cuenta?', ['MFA y alertas','Reutilizar claves','Compartir sesiones','Ignorar logs'], 'MFA y alertas')),
        lesson('threat_005','Detección de login sospechoso','Contar fallos antes de un éxito.','Varios fallos seguidos y luego un login exitoso pueden ser una señal que merece revisión en un entorno autorizado.',"eventos = ['failed','failed','success']\nfallos = 0\nfor e in eventos:\n    if e == 'failed':\n        fallos += 1\nif fallos >= 2:\n    print('Revisar cuenta')",['Se cuenta la señal.','El umbral evita ruido.','La respuesta debe ser proporcional.'],'Cuenta fallos y si son 2 o más imprime Revisar cuenta.','eventos = [\'failed\',\'failed\',\'success\']\nfallos = 0\n', 'Revisar cuenta','output_equals','Recorre eventos y suma failed.',"eventos = ['failed','failed','success']\nfallos = 0\nfor e in eventos:\n    if e == 'failed':\n        fallos += 1\nif fallos >= 2:\n    print('Revisar cuenta')",45,12,quiz('¿Qué representa el umbral?', ['Cuándo alertar','Una contraseña','Un ataque real','Un archivo'], 'Cuándo alertar')),
        lesson('threat_006','MFA y recuperación segura','Crear checklist defensivo de cuenta.','Un checklist de cuenta revisa MFA, correo de recuperación, sesiones activas y alertas de acceso.',"controles = ['MFA','alertas','recuperación']\nfor c in controles:\n    print(c)",['MFA agrega segunda capa.','Alertas notifican actividad rara.','Recuperación segura evita abuso.'],'Imprime MFA, alertas y recuperación.','controles = [\'MFA\',\'alertas\',\'recuperación\']\n', 'MFA\nalertas\nrecuperación','output_equals','Usa for c in controles:',"controles = ['MFA','alertas','recuperación']\nfor c in controles:\n    print(c)",40,10,quiz('¿Qué pertenece a un checklist de cuenta?', ['MFA','Compartir contraseña','Desactivar alertas','Usar claves débiles'], 'MFA'))
      ]},
      { id: 'credential_security', title: 'Credential Security', lessons: [
        lesson('threat_007','Protección de contraseñas','Clasificar una contraseña débil simulada.','Las contraseñas cortas o comunes elevan riesgo. Se recomienda longitud, unicidad, gestor de contraseñas y MFA.',"password = 'admin123'\nif len(password) < 10:\n    print('Contraseña débil')",['La longitud es una señal básica.','No usamos contraseñas reales.','MFA no reemplaza buenas contraseñas.'],'Si password tiene menos de 10 caracteres, imprime Contraseña débil.','password = \'admin123\'\n', 'Contraseña débil','output_equals','Usa len(password) < 10.',"password = 'admin123'\nif len(password) < 10:\n    print('Contraseña débil')",35,9,quiz('¿Qué mejora la seguridad de una cuenta?', ['Contraseña única y MFA','Reutilizar clave','Guardar claves públicas','Compartir acceso'], 'Contraseña única y MFA')),
        lesson('threat_008','Secretos en código simulado','Detectar una clave falsa en texto de laboratorio.','Los secretos no deben estar en código. En esta práctica se usa una clave ficticia para aprender detección y reporte.',"codigo = 'API_KEY=demo123'\nif 'API_KEY' in codigo:\n    print('Secreto simulado detectado')",['La clave es ficticia.','No se buscan secretos reales.','El reporte recomienda gestor de secretos.'],'Si codigo contiene API_KEY, imprime Secreto simulado detectado.','codigo = \'API_KEY=demo123\'\n', 'Secreto simulado detectado','output_equals','Usa if \'API_KEY\' in codigo:',"codigo = 'API_KEY=demo123'\nif 'API_KEY' in codigo:\n    print('Secreto simulado detectado')",40,10,quiz('¿Qué hacer con secretos en código?', ['Moverlos a gestor de secretos','Publicarlos','Ignorarlos','Compartirlos'], 'Moverlos a gestor de secretos')),
        lesson('threat_009','Hashes e integridad','Usar hash como verificación defensiva.', 'Un hash ayuda a verificar integridad de archivos o evidencias. No debe confundirse con recuperar contraseñas.',"import hashlib\nprint('hash calculado')",['hashlib es módulo estándar.','El hash verifica cambios.','No se enseña cracking de contraseñas.'],'Importa hashlib y muestra hash calculado.','', 'hash calculado','output_equals','Usa import hashlib y print exacto.',"import hashlib\nprint('hash calculado')",35,9,quiz('¿Para qué sirve un hash defensivo?', ['Verificar integridad','Robar cuentas','Ocultar malware','Borrar logs'], 'Verificar integridad'))
      ]},
      { id: 'phishing_defense_lab', title: 'Phishing Defense Lab', lessons: [
        lesson('threat_010','Señales de phishing','Detectar urgencia en un mensaje simulado.', 'El phishing usa urgencia, autoridad falsa y enlaces engañosos. La defensa revisa remitente, dominio, contexto y MFA.',"correo = 'Urgente: verifica tu cuenta ahora'\nif 'Urgente' in correo:\n    print('Posible phishing')",['El mensaje es simulado.','Urgencia no prueba phishing, pero es señal.','Se debe verificar antes de actuar.'],'Si correo contiene Urgente, imprime Posible phishing.','correo = \'Urgente: verifica tu cuenta ahora\'\n', 'Posible phishing','output_equals','Usa if \'Urgente\' in correo:',"correo = 'Urgente: verifica tu cuenta ahora'\nif 'Urgente' in correo:\n    print('Posible phishing')",40,10,quiz('¿Qué señal es común en phishing?', ['Urgencia falsa','Código limpio','Permiso escrito','Backup'], 'Urgencia falsa')),
        lesson('threat_011','Dominios parecidos ficticios','Identificar un dominio simulado sospechoso.', 'Los dominios parecidos pueden engañar. En laboratorio se usan dominios ficticios para entrenar detección sin afectar marcas reales.',"dominio = 'paypa1-ejemplo.test'\nif '1' in dominio:\n    print('Dominio sospechoso simulado')",['El dominio es ficticio.','Caracteres parecidos son señal.','La acción correcta es reportar y verificar.'],'Si dominio contiene 1, imprime Dominio sospechoso simulado.','dominio = \'paypa1-ejemplo.test\'\n', 'Dominio sospechoso simulado','output_equals','Usa if \'1\' in dominio:',"dominio = 'paypa1-ejemplo.test'\nif '1' in dominio:\n    print('Dominio sospechoso simulado')",40,10,quiz('¿Qué debes hacer con un dominio sospechoso?', ['Verificar y reportar','Entrar y probar credenciales','Compartirlo sin contexto','Ignorarlo siempre'], 'Verificar y reportar')),
        lesson('threat_012','Reporte de phishing simulado','Crear un resumen de correo sospechoso.', 'Un reporte anti-phishing debe resumir señal, riesgo y acción recomendada. No se crean campañas reales.',"reporte = {'señal':'urgencia','accion':'reportar'}\nprint(reporte['accion'])",['El diccionario resume el caso.','La acción orienta respuesta.','No se interactúa con enlaces reales.'],'Crea reporte con accion reportar y muéstrala.','', 'reportar','output_equals','Usa reporte[\'accion\'].',"reporte = {'señal':'urgencia','accion':'reportar'}\nprint(reporte['accion'])",40,10,quiz('¿Qué debe incluir un reporte de phishing?', ['Señal y acción','Contraseñas','Malware real','Datos ajenos'], 'Señal y acción'))
      ]},
      { id: 'malware_analysis_defense', title: 'Malware Analysis Defense', lessons: [
        lesson('threat_013','Malware: conceptos defensivos','Entender malware sin crear código dañino.', 'Malware es software diseñado para causar daño o acceso no autorizado. En PySec se estudian indicadores y señales, no creación ofensiva.',"categoria = 'análisis defensivo'\nprint(categoria)",['No se crea malware.','Se analizan indicadores.','El objetivo es detección y respuesta.'],'Muestra análisis defensivo.','', 'análisis defensivo','output_equals','Usa print exacto.',"categoria = 'análisis defensivo'\nprint(categoria)",35,8,quiz('¿Qué enfoque usamos con malware?', ['Análisis defensivo','Creación ofensiva','Evasión real','Daño a terceros'], 'Análisis defensivo')),
        lesson('threat_014','IOC simulados','Crear indicadores de compromiso ficticios.', 'Un IOC puede ser hash, dominio, IP o ruta sospechosa. Usamos indicadores ficticios para practicar.',"iocs = ['hash_demo','dominio.test']\nprint(len(iocs))",['IOC significa indicador de compromiso.','Los datos son ficticios.','Se usan para detección y triage.'],'Crea dos IOC y muestra 2.','', '2','output_equals','Usa len(iocs).',"iocs = ['hash_demo','dominio.test']\nprint(len(iocs))",35,9,quiz('¿Qué es un IOC?', ['Indicador de compromiso','Un ataque real','Un puerto siempre abierto','Un certificado'], 'Indicador de compromiso')),
        lesson('threat_015','Procesos sospechosos simulados','Detectar nombre raro en una lista local.', 'Un proceso desconocido no prueba malware, pero puede requerir revisión. En laboratorio usamos nombres simulados.',"procesos = ['chrome.exe','unknown_payload.exe']\nfor p in procesos:\n    if 'unknown' in p:\n        print('Proceso sospechoso')",['La detección es conceptual.','No se analiza malware real.','Se recomienda triage y aislamiento si aplica.'],'Si un proceso contiene unknown, imprime Proceso sospechoso.','procesos = [\'chrome.exe\',\'unknown_payload.exe\']\n', 'Proceso sospechoso','output_equals','Recorre procesos y busca unknown.',"procesos = ['chrome.exe','unknown_payload.exe']\nfor p in procesos:\n    if 'unknown' in p:\n        print('Proceso sospechoso')",40,10,quiz('¿Qué indica un proceso sospechoso?', ['Debe investigarse','Siempre es seguro','Debe ejecutarse','Debe compartirse'], 'Debe investigarse'))
      ]},
      { id: 'persistence_detection', title: 'Persistence Detection', lessons: [
        lesson('threat_016','Persistencia conceptual','Entender persistencia desde detección.', 'Persistencia es cualquier mecanismo que intenta mantener acceso. Se estudia para detectar servicios, tareas o inicios automáticos sospechosos.',"concepto = 'persistencia defensiva'\nprint(concepto)",['No se enseña persistencia maliciosa.','Se identifican señales.','Se recomiendan controles.'],'Muestra persistencia defensiva.','', 'persistencia defensiva','output_equals','Usa print exacto.',"print('persistencia defensiva')",35,8,quiz('¿Para qué estudiamos persistencia?', ['Para detectarla y mitigarla','Para instalarla en terceros','Para ocultar acceso','Para borrar logs'], 'Para detectarla y mitigarla')),
        lesson('threat_017','Tareas programadas simuladas','Detectar tarea desconocida en lista.', 'Las tareas programadas deben tener dueño y propósito claro. Una tarea desconocida se revisa y documenta.',"tareas = ['backup_diario','unknown_startup']\nfor t in tareas:\n    if 'unknown' in t:\n        print('Tarea sospechosa')",['La lista es simulada.','La señal se documenta.','No se modifica un sistema real.'],'Si tarea contiene unknown, imprime Tarea sospechosa.','tareas = [\'backup_diario\',\'unknown_startup\']\n', 'Tarea sospechosa','output_equals','Usa for t in tareas y if.',"tareas = ['backup_diario','unknown_startup']\nfor t in tareas:\n    if 'unknown' in t:\n        print('Tarea sospechosa')",40,10,quiz('¿Qué debe hacerse con una tarea desconocida?', ['Revisarla y documentarla','Ejecutarla sin revisar','Ignorarla siempre','Publicarla'], 'Revisarla y documentarla')),
        lesson('threat_018','Servicio sospechoso simulado','Crear alerta de servicio no autorizado.', 'Servicios sin dueño o descripción pueden requerir revisión. La respuesta profesional es validar y reportar.',"servicio = 'unknown_service'\nif 'unknown' in servicio:\n    print('Servicio a revisar')",['unknown representa señal ficticia.','Validar evita falsos positivos.','La acción es revisar, no destruir.'],'Si servicio contiene unknown, imprime Servicio a revisar.','servicio = \'unknown_service\'\n', 'Servicio a revisar','output_equals','Usa if \'unknown\' in servicio:',"servicio = 'unknown_service'\nif 'unknown' in servicio:\n    print('Servicio a revisar')",40,9,quiz('¿Qué evita validar antes de actuar?', ['Falsos positivos','Buenas prácticas','MFA','Reportes'], 'Falsos positivos'))
      ]},
      { id: 'defense_evasion_awareness', title: 'Defense Evasion Awareness', lessons: [
        lesson('threat_019','Evasión defensiva conceptual','Entender señales de ocultamiento sin enseñar evasión.', 'Los adversarios pueden intentar ocultar actividad. Desde defensa se revisan logs desactivados, procesos raros y alertas silenciadas.',"senal = 'logs desactivados'\nprint(senal)",['No se enseña a evadir defensas.','Se aprende a detectar ausencia de visibilidad.','La visibilidad es control crítico.'],'Muestra logs desactivados.','', 'logs desactivados','output_equals','Usa print exacto.',"print('logs desactivados')",35,8,quiz('¿Qué indica logs desactivados?', ['Pérdida de visibilidad','Mayor seguridad siempre','Certificado válido','Nada importante'], 'Pérdida de visibilidad')),
        lesson('threat_020','Logs desactivados','Detectar configuración riesgosa simulada.', 'Si los logs están desactivados, el equipo pierde capacidad de investigar. Debe corregirse y monitorearse.',"config = {'logs_activos': False}\nif config['logs_activos'] == False:\n    print('Riesgo: logs desactivados')",['False indica que el control falta.','La recomendación es activar registros.','La práctica es simulada.'],'Si logs_activos es False, imprime Riesgo: logs desactivados.','config = {\'logs_activos\': False}\n', 'Riesgo: logs desactivados','output_equals','Usa if config[\'logs_activos\'] == False:',"config = {'logs_activos': False}\nif config['logs_activos'] == False:\n    print('Riesgo: logs desactivados')",40,10,quiz('¿Qué debes hacer con logs desactivados?', ['Activarlos y monitorear','Celebrarlo','Borrarlos','Ignorarlos'], 'Activarlos y monitorear')),
        lesson('threat_021','Checklist de hardening','Recorrer controles de endurecimiento.', 'Hardening reduce superficie de ataque: MFA, parches, logs, mínimo privilegio y backups.',"controles = ['MFA','parches','logs']\nfor c in controles:\n    print(c)",['MFA protege cuentas.','Parches reducen vulnerabilidades conocidas.','Logs dan visibilidad.'],'Imprime MFA, parches y logs.','controles = [\'MFA\',\'parches\',\'logs\']\n', 'MFA\nparches\nlogs','output_equals','Usa for c in controles:',"controles = ['MFA','parches','logs']\nfor c in controles:\n    print(c)",40,10,quiz('¿Qué hace hardening?', ['Reduce superficie de ataque','Crea malware','Roba datos','Desactiva defensa'], 'Reduce superficie de ataque'))
      ]},
      { id: 'data_loss_prevention', title: 'Data Loss Prevention', lessons: [
        lesson('threat_022','Fuga de datos conceptual','Entender riesgo de exposición de información.', 'Una fuga de datos puede ocurrir por permisos, errores, descargas anómalas o exposición pública. DLP busca prevenir y detectar.',"riesgo = 'fuga de datos'\nprint(riesgo)",['No se trabaja con datos reales.','Se usan escenarios ficticios.','La defensa combina controles y monitoreo.'],'Muestra fuga de datos.','', 'fuga de datos','output_equals','Usa print exacto.',"print('fuga de datos')",35,8,quiz('¿Qué busca DLP?', ['Prevenir fuga de datos','Crear ataques','Ocultar logs','Robar archivos'], 'Prevenir fuga de datos')),
        lesson('threat_023','Descarga masiva simulada','Detectar volumen inusual.', 'Un volumen alto de descargas puede ser señal de abuso o error. Se valida con contexto antes de actuar.',"descargas = 1200\nif descargas > 1000:\n    print('Posible fuga simulada')",['El umbral es de laboratorio.','El contexto evita falsos positivos.','La respuesta requiere investigación.'],'Si descargas es mayor que 1000, imprime Posible fuga simulada.','descargas = 1200\n', 'Posible fuga simulada','output_equals','Usa if descargas > 1000:',"descargas = 1200\nif descargas > 1000:\n    print('Posible fuga simulada')",40,10,quiz('¿Qué indica descarga masiva?', ['Señal a investigar','Siempre normal','Contraseña segura','MFA activo'], 'Señal a investigar')),
        lesson('threat_024','Clasificación de datos','Identificar dato sensible ficticio.', 'Clasificar datos ayuda a protegerlos. Ejemplos ficticios pueden representar email, DNI simulado o tokens de prueba.',"dato = 'email_simulado'\nif 'email' in dato:\n    print('Dato sensible simulado')",['La clasificación define protección.','El dato es ficticio.','No se manipulan datos reales.'],'Si dato contiene email, imprime Dato sensible simulado.','dato = \'email_simulado\'\n', 'Dato sensible simulado','output_equals','Usa if \'email\' in dato:',"dato = 'email_simulado'\nif 'email' in dato:\n    print('Dato sensible simulado')",40,10,quiz('¿Por qué clasificar datos?', ['Para protegerlos mejor','Para publicarlos','Para ignorarlos','Para romper sistemas'], 'Para protegerlos mejor')),
        lesson('threat_025','Alerta DLP básica','Crear una alerta de laboratorio.', 'Una alerta DLP debe resumir señal, volumen y acción recomendada. La acción puede ser revisar, contener o escalar.',"alerta = 'DLP: revisar descarga'\nprint(alerta)",['DLP significa prevención de pérdida de datos.','La alerta debe ser clara.','La acción debe ser proporcional.'],'Muestra DLP: revisar descarga.','', 'DLP: revisar descarga','output_equals','Usa print exacto.',"print('DLP: revisar descarga')",40,9,quiz('¿Qué debe tener una alerta DLP?', ['Señal y acción','Malware real','Datos robados','Nada'], 'Señal y acción'))
      ]},
      { id: 'incident_response', title: 'Incident Response', lessons: [
        lesson('threat_026','Respuesta a incidentes','Entender las fases de respuesta.', 'La respuesta a incidentes incluye preparación, identificación, contención, erradicación, recuperación y lecciones aprendidas.',"fases = ['identificación','contención','recuperación']\nfor f in fases:\n    print(f)",['Identificación confirma evento.','Contención limita impacto.','Recuperación vuelve a operación.'],'Imprime identificación, contención y recuperación.','fases = [\'identificación\',\'contención\',\'recuperación\']\n', 'identificación\ncontención\nrecuperación','output_equals','Usa for f in fases:',"fases = ['identificación','contención','recuperación']\nfor f in fases:\n    print(f)",45,12,quiz('¿Qué busca la contención?', ['Limitar impacto','Publicar datos','Ocultar señales','Eliminar reportes'], 'Limitar impacto')),
        lesson('threat_027','Contención simulada','Representar una acción segura de contención.', 'Contener no significa destruir evidencia. Puede ser aislar, bloquear credenciales o limitar acceso según procedimiento.',"accion = 'aislar equipo simulado'\nprint(accion)",['La acción es simulada.','Se conserva evidencia.','Se sigue procedimiento.'],'Muestra aislar equipo simulado.','', 'aislar equipo simulado','output_equals','Usa print exacto.',"print('aislar equipo simulado')",40,9,quiz('¿Qué debe cuidar la contención?', ['Evidencia y alcance','Ataques reales','Exfiltración','Evasión'], 'Evidencia y alcance')),
        lesson('threat_028','Erradicación y recuperación','Diferenciar eliminar causa y restaurar servicio.', 'Erradicación elimina causa raíz; recuperación restaura operación segura. Ambas deben documentarse.',"pasos = ['erradicar','recuperar']\nfor p in pasos:\n    print(p)",['erradicar corrige causa.','recuperar valida retorno seguro.','Documentar evita repetición.'],'Imprime erradicar y recuperar.','pasos = [\'erradicar\',\'recuperar\']\n', 'erradicar\nrecuperar','output_equals','Usa for p in pasos:',"pasos = ['erradicar','recuperar']\nfor p in pasos:\n    print(p)",40,10,quiz('¿Qué hace recuperación?', ['Restaurar operación segura','Robar datos','Ocultar logs','Crear persistencia'], 'Restaurar operación segura')),
        lesson('threat_029','Lecciones aprendidas','Crear una mejora después del incidente.', 'Después de un incidente se documentan mejoras: alertas, MFA, backups, capacitación o hardening.',"mejora = 'activar alerta de login'\nprint(mejora)",['La mejora reduce repetición.','Debe ser accionable.','Se prioriza por impacto.'],'Muestra activar alerta de login.','', 'activar alerta de login','output_equals','Usa print exacto.',"print('activar alerta de login')",40,9,quiz('¿Para qué sirven lecciones aprendidas?', ['Reducir repetición','Ocultar errores','Evitar mejora','Ignorar controles'], 'Reducir repetición')),
        lesson('threat_030','Proyecto: informe de incidente simulado','Construir cierre ejecutivo defensivo.', 'El proyecto final resume evento, impacto y acción. Usa solo datos ficticios y enfoque de respuesta profesional.',"print('Incidente simulado | impacto medio | acción: MFA')",['Resumen ejecutivo claro.','Datos ficticios.','Acción concreta y defensiva.'],'Muestra Incidente simulado | impacto medio | acción: MFA.','', 'Incidente simulado | impacto medio | acción: MFA','output_equals','Usa print exacto.',"print('Incidente simulado | impacto medio | acción: MFA')",60,15,quiz('¿Qué debe incluir un informe de incidente?', ['Evento, impacto y acción','Contraseñas reales','Malware funcional','Datos exfiltrados'], 'Evento, impacto y acción'))
      ]}
    ]
  });
  BADGES.push({ id:'threat_defender', title:'Threat Defender', description:'Completaste prácticas defensivas sobre amenazas reales con enfoque ético.', icon:'🧬' });
})();

BADGES.push({ id:'ctf_operator', title:'CTF Operator', description:'Completaste retos CTF simulados con enfoque defensivo y ético.', icon:'🏁' });

/* ── PoC Pyodide: lección de prueba con engine:'pyodide' ──────────
   Marcada con engine:'pyodide' → bifurcación en ui.js usa runPythonReal()
   en vez de runPythonSafe(). Demuestra list comprehension + f-strings. */
(function pyodidePoc(){
  const courseById = id => COURSES.find(c => c.id === id);
  const addModule = (courseId, module) => { const c = courseById(courseId); if (c) c.modules.push(module); };
  addModule('python_desde_cero', {
  id: 'pyodide_lab',
  title: '🧪 Lab Python Real (PoC Pyodide)',
  lessons: [
    Object.assign(
      lesson(
        'py_poc_001',
        'Python real: list comprehension + f-strings',
        'Filtrar IPs con list comprehension y formatear con f-strings usando CPython real.',
        'Pyodide ejecuta CPython real en el navegador mediante WebAssembly. List comprehensions y f-strings funcionan exactamente igual que en tu terminal — sin simulación.',
        "ips = ['10.0.0.1', '192.168.1.5', '10.0.0.9']\ninternas = [ip for ip in ips if ip.startswith('192')]\nfor ip in internas:\n    print(f'Red interna: {ip}')",
        ['List comprehension filtra en una sola línea.', 'f-strings insertan valores en el string sin concatenar.', 'Pyodide ejecuta esto con el mismo intérprete que tendrías en tu terminal.'],
        "Filtra ips para quedarte con las que empiezan con '10.' e imprime cada una como: Privada: 10.0.0.1",
        "ips = ['10.0.0.1', '192.168.1.5', '10.0.0.9']\n",
        "Privada: 10.0.0.1\nPrivada: 10.0.0.9",
        'output_equals',
        "Usa [ip for ip in ips if ip.startswith('10.')] y luego f'Privada: {ip}'.",
        "ips = ['10.0.0.1', '192.168.1.5', '10.0.0.9']\nprivadas = [ip for ip in ips if ip.startswith('10.')]\nfor ip in privadas:\n    print(f'Privada: {ip}')",
        30, 10,
        quiz('¿Qué devuelve una list comprehension?', ['Una lista nueva', 'Un diccionario', 'Un string vacío', 'Un error'], 'Una lista nueva')
      ),
      { engine: 'pyodide' }
    )
  ]
});
})();

/* ── Análisis de Datos P3-c: curso nuevo + 5 lecciones pandas (Pyodide) ──
   Nuevo curso 'analisis_datos' con módulo pandas_seguridad.
   Cada lección lleva engine:'pyodide' + packages:['pandas']. */
(function pandasP3c(){
  COURSES.push({
    id: 'analisis_datos',
    title: 'Análisis de Datos para Seguridad',
    level: 'Intermedio',
    description: 'pandas real para logs de seguridad: crea tablas, filtra eventos, agrupa por IP y detecta anomalías con Python real (Pyodide).',
    icon: '📊',
    ethical: true,
    modules: [{
      id: 'pandas_seguridad',
      title: '🐼 pandas: logs y anomalías con datos reales',
      lessons: [
        Object.assign(
          lesson(
            'ad_001',
            'Tu primer DataFrame de eventos',
            'Crear una tabla estructurada de eventos de seguridad con pd.DataFrame.',
            'pandas organiza datos en DataFrames: tablas con filas y columnas. Crear un DataFrame a partir de un diccionario es el primer paso de cualquier pipeline de análisis de logs. Cada clave del dict se convierte en columna, cada lista en sus valores.',
            "import pandas as pd\ndata = {'ip': ['10.0.0.1', '10.0.0.2'], 'evento': ['OK', 'ERROR']}\ndf = pd.DataFrame(data)\nprint(df)",
            ['pd.DataFrame(dict) convierte un diccionario en tabla.', 'Cada clave se convierte en columna; cada lista, en sus filas.', 'print(df) muestra la tabla con índice, columnas y valores alineados.'],
            "Crea el DataFrame con pd.DataFrame(data) y muéstralo con print(df). Los datos ya están definidos en el starter.",
            "import pandas as pd\ndata = {\n    'ip': ['192.168.1.5', '10.0.0.9', '192.168.1.5'],\n    'evento': ['LOGIN', 'ERROR', 'LOGIN'],\n    'intentos': [1, 5, 1]\n}\n# Crea df = pd.DataFrame(data) y haz print(df)\n",
            'ERROR',
            'output_contains',
            "Usa df = pd.DataFrame(data) y luego print(df).",
            "import pandas as pd\ndata = {\n    'ip': ['192.168.1.5', '10.0.0.9', '192.168.1.5'],\n    'evento': ['LOGIN', 'ERROR', 'LOGIN'],\n    'intentos': [1, 5, 1]\n}\ndf = pd.DataFrame(data)\nprint(df)",
            30, 12,
            quiz('¿Qué convierte pd.DataFrame(dict)?', ['Un dict en tabla de filas y columnas', 'Un dict en lista plana', 'Una lista en diccionario', 'Un CSV en JSON'], 'Un dict en tabla de filas y columnas')
          ),
          { engine: 'pyodide', packages: ['pandas'] }
        ),
        Object.assign(
          lesson(
            'ad_002',
            'Filtrar eventos sospechosos',
            'Seleccionar solo las filas que cumplen una condición con df[df[col]==valor].',
            'El filtrado booleano es la operación más frecuente en análisis de logs. df[df["evento"] == "ERROR"] devuelve solo las filas donde el evento es ERROR. Es equivalente a un WHERE en SQL — fundamental para aislar eventos de interés en millones de registros.',
            "import pandas as pd\ndata = {'ip': ['10.0.0.1', '10.0.0.2'], 'evento': ['OK', 'ERROR']}\ndf = pd.DataFrame(data)\nerrores = df[df['evento'] == 'ERROR']\nprint(len(errores))",
            ["df[condición] devuelve solo las filas donde la condición es True.", "df['evento'] == 'ERROR' produce una Serie booleana.", 'len() cuenta cuántas filas pasaron el filtro.'],
            "Filtra el DataFrame para quedarte solo con los eventos ERROR y muestra cuántos hay con print(len(errores)).",
            "import pandas as pd\ndata = {\n    'ip': ['192.168.1.5', '10.0.0.9', '192.168.1.5', '10.0.0.9'],\n    'evento': ['LOGIN', 'ERROR', 'LOGIN', 'ERROR']\n}\ndf = pd.DataFrame(data)\n# Filtra: errores = df[df['evento'] == 'ERROR']\n",
            '2',
            'output_equals',
            "Usa errores = df[df['evento'] == 'ERROR'] y luego print(len(errores)).",
            "import pandas as pd\ndata = {\n    'ip': ['192.168.1.5', '10.0.0.9', '192.168.1.5', '10.0.0.9'],\n    'evento': ['LOGIN', 'ERROR', 'LOGIN', 'ERROR']\n}\ndf = pd.DataFrame(data)\nerrores = df[df['evento'] == 'ERROR']\nprint(len(errores))",
            30, 13,
            quiz('¿Qué devuelve df[df["col"] == valor]?', ['Las filas donde la condición es True', 'Todas las columnas del DataFrame', 'Un número entero', 'El índice del DataFrame'], 'Las filas donde la condición es True')
          ),
          { engine: 'pyodide', packages: ['pandas'] }
        ),
        Object.assign(
          lesson(
            'ad_003',
            'Contar por IP: detectar la fuente más ruidosa',
            'Usar value_counts() para contar eventos por IP y encontrar la fuente más activa.',
            'value_counts() agrupa y cuenta las ocurrencias de cada valor en una columna. En análisis de amenazas, contar eventos por IP de origen detecta automáticamente la fuente más ruidosa — un indicador clave de brute force, scanning o comportamiento anómalo.',
            "import pandas as pd\ndata = {'ip': ['10.0.0.1', '10.0.0.2', '10.0.0.1']}\ndf = pd.DataFrame(data)\nprint(df['ip'].value_counts())",
            ["value_counts() devuelve los valores ordenados por frecuencia descendente.", ".index[0] obtiene el valor más frecuente (el primero de la lista ordenada).", 'Este patrón detecta la IP más activa en cualquier log de accesos.'],
            "Encuentra la IP que aparece más veces en el log y muéstrala con print(ip_top).",
            "import pandas as pd\ndata = {\n    'ip': ['192.168.1.5', '10.0.0.9', '192.168.1.5', '192.168.1.5'],\n    'evento': ['LOGIN', 'ERROR', 'ERROR', 'LOGIN']\n}\ndf = pd.DataFrame(data)\n# ip_top = df['ip'].value_counts().index[0]\n",
            '192.168.1.5',
            'output_equals',
            "Usa ip_top = df['ip'].value_counts().index[0] y luego print(ip_top).",
            "import pandas as pd\ndata = {\n    'ip': ['192.168.1.5', '10.0.0.9', '192.168.1.5', '192.168.1.5'],\n    'evento': ['LOGIN', 'ERROR', 'ERROR', 'LOGIN']\n}\ndf = pd.DataFrame(data)\nip_top = df['ip'].value_counts().index[0]\nprint(ip_top)",
            35, 14,
            quiz('¿Qué devuelve value_counts()?', ['Valores ordenados por frecuencia descendente', 'Solo el valor máximo', 'La media de los valores', 'Una lista de índices'], 'Valores ordenados por frecuencia descendente')
          ),
          { engine: 'pyodide', packages: ['pandas'] }
        ),
        Object.assign(
          lesson(
            'ad_004',
            'Estadísticas básicas: máximo y media de intentos',
            'Calcular estadísticas de una columna numérica con .max() y .mean().',
            'pandas calcula estadísticas sobre columnas numéricas en una línea. .max() devuelve el mayor valor (útil para detectar el pico de intentos de login), .mean() la media (útil para establecer una línea base). En análisis de anomalías, compara cada evento con la media para detectar comportamientos fuera del rango normal.',
            "import pandas as pd\ndata = {'ip': ['a', 'b'], 'intentos': [2, 8]}\ndf = pd.DataFrame(data)\nprint(df['intentos'].max())\nprint(df['intentos'].mean())",
            ['.max() devuelve el valor máximo de la columna.', '.mean() calcula el promedio como float.', 'Compara el máximo con la media para detectar outliers.'],
            "Imprime primero el máximo de intentos y luego la media. El resultado exacto debe ser 7 y 4.0.",
            "import pandas as pd\ndata = {\n    'ip': ['192.168.1.5', '10.0.0.9', '192.168.1.5'],\n    'intentos': [3, 7, 2]\n}\ndf = pd.DataFrame(data)\n# print(df['intentos'].max()) y print(df['intentos'].mean())\n",
            '7\n4.0',
            'output_equals',
            "Usa print(df['intentos'].max()) y luego print(df['intentos'].mean()).",
            "import pandas as pd\ndata = {\n    'ip': ['192.168.1.5', '10.0.0.9', '192.168.1.5'],\n    'intentos': [3, 7, 2]\n}\ndf = pd.DataFrame(data)\nprint(df['intentos'].max())\nprint(df['intentos'].mean())",
            35, 14,
            quiz('¿Para qué sirve comparar max() con mean() en logs?', ['Detectar outliers (valores fuera del rango normal)', 'Cifrar la columna', 'Ordenar el DataFrame', 'Filtrar por IP'], 'Detectar outliers (valores fuera del rango normal)')
          ),
          { engine: 'pyodide', packages: ['pandas'] }
        ),
        Object.assign(
          lesson(
            'ad_005',
            'Capstone: análisis completo de un log de accesos',
            'Filtrar alertas críticas y detectar la IP más activa en un dataset real.',
            'Un analista SOC procesa el log, filtra los eventos de alta severidad, identifica la fuente más ruidosa y genera un resumen accionable. Este ejercicio integra filtrado compuesto (& para AND), value_counts y f-strings para producir un mini informe automático — el mismo flujo de triage que usarías en Python real.',
            "import pandas as pd\ndata = {'ip': ['10.0.0.1', '10.0.0.2'], 'evento': ['ERROR', 'LOGIN'], 'intentos': [9, 1]}\ndf = pd.DataFrame(data)\nalertas = df[(df['evento'] == 'ERROR') & (df['intentos'] > 3)]\nprint(f'Alertas: {len(alertas)}')",
            ['& combina condiciones booleanas (equivale a AND).', 'Cada condición debe ir entre paréntesis al usar &.', 'f-strings generan el reporte en una línea.'],
            "Analiza el log: filtra alertas críticas (evento ERROR Y intentos > 3), encuentra la IP más activa. Imprime 'Alertas críticas: N' y luego 'IP más activa: IP'.",
            "import pandas as pd\ndata = {\n    'ip': ['192.168.1.5', '10.0.0.9', '192.168.1.5', '10.0.0.9', '10.0.0.9'],\n    'evento': ['LOGIN', 'ERROR', 'ERROR', 'ERROR', 'LOGIN'],\n    'intentos': [1, 5, 3, 8, 1]\n}\ndf = pd.DataFrame(data)\n# alertas = df[(df['evento'] == 'ERROR') & (df['intentos'] > 3)]\n# ip_top = df['ip'].value_counts().index[0]\n",
            'Alertas críticas: 2\nIP más activa: 10.0.0.9',
            'output_equals',
            "Usa df[(df['evento']=='ERROR') & (df['intentos']>3)] para las alertas y value_counts().index[0] para la IP top. Luego print(f'Alertas críticas: {len(alertas)}') y print(f'IP más activa: {ip_top}').",
            "import pandas as pd\ndata = {\n    'ip': ['192.168.1.5', '10.0.0.9', '192.168.1.5', '10.0.0.9', '10.0.0.9'],\n    'evento': ['LOGIN', 'ERROR', 'ERROR', 'ERROR', 'LOGIN'],\n    'intentos': [1, 5, 3, 8, 1]\n}\ndf = pd.DataFrame(data)\nalertas = df[(df['evento'] == 'ERROR') & (df['intentos'] > 3)]\nip_top = df['ip'].value_counts().index[0]\nprint(f'Alertas críticas: {len(alertas)}')\nprint(f'IP más activa: {ip_top}')",
            45, 16,
            quiz('¿Qué operador combina dos condiciones booleanas en pandas?', ['& (and)', '| (or)', '+ (suma)', '== (igual)'], '& (and)')
          ),
          { engine: 'pyodide', packages: ['pandas'] }
        )
      ]
    }]
  });
  BADGES.push({ id: 'data_analyst', title: 'Data Analyst', description: 'Analizaste logs reales con pandas y detectaste anomalías.', icon: '📊' });
})();

// P3-d: Machine Learning para Seguridad — 6 lecciones (3 numpy + 3 sklearn), curso ml_seguridad
(function mlSeguridad(){
  COURSES.push({
    id: 'ml_seguridad',
    title: 'Machine Learning para Seguridad',
    level: 'Avanzado',
    description: 'ML clásico aplicado a ciberseguridad: detección de anomalías, clasificación de amenazas y clustering con numpy y scikit-learn en Python real.',
    icon: '🤖',
    ethical: true,
    modules: [
      {
        id: 'numpy_deteccion',
        title: '🔢 numpy: detección de anomalías sin modelos',
        lessons: [
          Object.assign(
            lesson(
              'ad_ml_001',
              'Z-score para detectar tiempos de respuesta anómalos',
              'Calcular el z-score de una serie de tiempos y detectar valores estadísticamente atípicos.',
              'El z-score mide cuántas desviaciones estándar se aleja un punto de la media. En seguridad, un servidor que tarda 750ms cuando lo normal son 100ms tiene un z-score alto (≈2.65) y merece investigación. Fórmula: z = (x - media) / std. Un umbral clásico es |z| > 2.0.',
              "import numpy as np\ntiempos = np.array([100, 102, 98, 750])\nmedia = np.mean(tiempos)\nstd = np.std(tiempos)\nz = (tiempos - media) / std\nprint(tiempos[np.abs(z) > 2.0])",
              ['np.abs(z) devuelve el valor absoluto de cada z-score.', 'El umbral 2.0 captura ~5% de valores extremos en una distribución normal.', 'tiempos[condición] es indexación booleana — devuelve solo los elementos donde la condición es True.'],
              "Tienes los tiempos de respuesta de un servidor (en ms). Calcula el z-score de cada tiempo. Imprime el número de tiempos anómalos (|z| > 2.0) usando print(len(...)).",
              "import numpy as np\ntiempos = np.array([100, 102, 98, 101, 750, 99, 103, 97])\nmedia = np.mean(tiempos)\nstd = np.std(tiempos)\nz = (tiempos - media) / std\n# anomalos = tiempos[np.abs(z) > 2.0]\n",
              '1',
              'output_equals',
              'Usa anomalos = tiempos[np.abs(z) > 2.0] y luego print(len(anomalos)). El array tiene 8 elementos — solo uno (750) tiene z > 2.0.',
              "import numpy as np\ntiempos = np.array([100, 102, 98, 101, 750, 99, 103, 97])\nmedia = np.mean(tiempos)\nstd = np.std(tiempos)\nz = (tiempos - media) / std\nanomalos = tiempos[np.abs(z) > 2.0]\nprint(len(anomalos))",
              35, 12,
              quiz('¿Qué mide el z-score?', ['Cuántas desviaciones estándar se aleja un valor de la media', 'El valor máximo del array', 'La distancia euclidiana entre dos puntos', 'La varianza del conjunto'], 'Cuántas desviaciones estándar se aleja un valor de la media')
            ),
            { engine: 'pyodide', packages: ['numpy'] }
          ),
          Object.assign(
            lesson(
              'ad_ml_002',
              'Umbral estadístico: media + 2·std para alertas',
              'Detectar eventos sospechosos usando como umbral la media más dos desviaciones estándar.',
              'Una heurística robusta para umbrales dinámicos: umbral = media + 2·std. Cualquier valor que supere este umbral es estadísticamente inusual. Esta técnica se usa en SIEM para baselining: aprendes el comportamiento normal y alertas sobre lo que se sale del rango.',
              "import numpy as np\neventos = np.array([10, 12, 9, 11, 50])\numbral = np.mean(eventos) + 2 * np.std(eventos)\nprint(eventos[eventos > umbral])",
              ['umbral = media + 2*std cubre el 97.5% de una distribución normal.', 'eventos > umbral produce un array booleano.', 'Se puede ajustar el multiplicador (1.5, 2, 3) según la sensibilidad deseada.'],
              "Tienes eventos por minuto de un servidor. Calcula el umbral (media + 2·std). Imprime el número de eventos que superan ese umbral usando print(len(...)).",
              "import numpy as np\neventos = np.array([10, 12, 9, 11, 13, 10, 45, 11, 10, 9])\numbral = np.mean(eventos) + 2 * np.std(eventos)\n# sospechosos = eventos[eventos > umbral]\n",
              '1',
              'output_equals',
              'Usa sospechosos = eventos[eventos > umbral] y luego print(len(sospechosos)). El array tiene 10 elementos — solo 45 supera el umbral (~34.8).',
              "import numpy as np\neventos = np.array([10, 12, 9, 11, 13, 10, 45, 11, 10, 9])\numbral = np.mean(eventos) + 2 * np.std(eventos)\nsospechosos = eventos[eventos > umbral]\nprint(len(sospechosos))",
              35, 12,
              quiz('¿Por qué usar media+2·std como umbral en vez de un valor fijo?', ['Se adapta automáticamente al comportamiento normal del sistema', 'Es más fácil de calcular', 'Solo funciona con enteros', 'Requiere menos datos'], 'Se adapta automáticamente al comportamiento normal del sistema')
            ),
            { engine: 'pyodide', packages: ['numpy'] }
          ),
          Object.assign(
            lesson(
              'ad_ml_003',
              'Normalización min-max para comparar métricas dispares',
              'Escalar features heterogéneas al rango [0, 1] para que sean comparables.',
              'Un log de seguridad puede combinar bytes transferidos (0–10MB), intentos de login (0–100) y puertos abiertos (0–65535). Mezclar estas escalas en un modelo distorsiona los resultados. La normalización min-max resuelve esto: x_norm = (x - min) / (max - min). El mínimo queda en 0.0 y el máximo en 1.0.',
              "import numpy as np\ndatos = np.array([0.0, 100.0, 200.0])\nnorm = (datos - datos.min()) / (datos.max() - datos.min())\nprint(norm)",
              ['datos.min() y datos.max() calculan el rango en una línea.', 'El resultado siempre está en [0.0, 1.0].', 'Si max == min (todos iguales), la división da NaN — en la práctica se añade un pequeño epsilon.'],
              "Normaliza el array de datos al rango [0, 1]. Imprime el primer valor normalizado y el último valor normalizado, cada uno en su propia línea.",
              "import numpy as np\ndatos = np.array([10.0, 50.0, 30.0, 90.0, 20.0])\n# norm = (datos - datos.min()) / (datos.max() - datos.min())\n",
              '0.0\n0.125',
              'output_equals',
              "Calcula norm = (datos - datos.min()) / (datos.max() - datos.min()). Luego print(norm[0]) y print(norm[-1]). Con datos=[10,50,30,90,20]: min=10, max=90 → norm[0]=(10-10)/80=0.0, norm[-1]=(20-10)/80=0.125.",
              "import numpy as np\ndatos = np.array([10.0, 50.0, 30.0, 90.0, 20.0])\nnorm = (datos - datos.min()) / (datos.max() - datos.min())\nprint(norm[0])\nprint(norm[-1])",
              35, 13,
              quiz('¿Qué valor produce la normalización min-max para el valor mínimo del array?', ['0.0', '1.0', '-1.0', 'El valor original'], '0.0')
            ),
            { engine: 'pyodide', packages: ['numpy'] }
          )
        ]
      },
      {
        id: 'sklearn_avanzado',
        title: '🧠 scikit-learn: clasificación y clustering',
        lessons: [
          Object.assign(
            lesson(
              'ad_ml_004',
              'Árbol de decisión para clasificar conexiones',
              'Entrenar un clasificador binario que distingue conexiones normales de sospechosas.',
              'Un árbol de decisión aprende reglas tipo "si bytes > 80 Y puertos > 10 → sospechoso". Es interpretable: puedes ver exactamente qué feature disparó la alerta. En threat hunting esto es clave — necesitas poder explicar al equipo de respuesta por qué un evento se marcó como amenaza.',
              "from sklearn.tree import DecisionTreeClassifier\nX = [[10, 1], [90, 20]]\ny = [0, 1]\nclf = DecisionTreeClassifier(random_state=42)\nclf.fit(X, y)\nprint(clf.predict([[100, 25]])[0])",
              ['X son los features (bytes, puertos); y las etiquetas (0=normal, 1=sospechoso).', 'random_state=42 garantiza resultados reproducibles.', 'predict() devuelve un array — [0] toma el primer (único) resultado.'],
              "Tienes conexiones etiquetadas como normales (0) o sospechosas (1). Entrena un DecisionTreeClassifier con random_state=42. Predice la conexión [100, 25] e imprime 'Normal' si la predicción es 0, o 'Sospechoso' si es 1.",
              "from sklearn.tree import DecisionTreeClassifier\nX = [\n    [10, 1], [12, 2], [11, 1], [10, 2],\n    [75, 15], [80, 18], [90, 20], [85, 17]\n]\ny = [0, 0, 0, 0, 1, 1, 1, 1]\nclf = DecisionTreeClassifier(random_state=42)\n# clf.fit(X, y)\n# pred = clf.predict([[100, 25]])[0]\n",
              'Sospechoso',
              'output_equals',
              "Llama a clf.fit(X, y) y luego pred = clf.predict([[100, 25]])[0]. Si pred == 1 imprime 'Sospechoso', si pred == 0 imprime 'Normal'. Con los datos dados, [100,25] cae claramente en la zona sospechosa.",
              "from sklearn.tree import DecisionTreeClassifier\nX = [\n    [10, 1], [12, 2], [11, 1], [10, 2],\n    [75, 15], [80, 18], [90, 20], [85, 17]\n]\ny = [0, 0, 0, 0, 1, 1, 1, 1]\nclf = DecisionTreeClassifier(random_state=42)\nclf.fit(X, y)\npred = clf.predict([[100, 25]])[0]\nprint('Sospechoso' if pred == 1 else 'Normal')",
              45, 15,
              quiz('¿Por qué un árbol de decisión es útil en threat hunting?', ['Sus reglas son interpretables y explicables al equipo', 'Es el modelo más preciso disponible', 'No necesita datos de entrenamiento', 'Solo funciona con datos categóricos'], 'Sus reglas son interpretables y explicables al equipo')
            ),
            { engine: 'pyodide', packages: ['scikit-learn'] }
          ),
          Object.assign(
            lesson(
              'ad_ml_005',
              'K-Means para agrupar IPs por comportamiento',
              'Usar clustering para separar automáticamente grupos de comportamiento sin etiquetas previas.',
              'K-Means agrupa puntos en k clusters minimizando la distancia intra-cluster. En seguridad se usa para segmentar hosts: un grupo con tráfico alto y muchos puertos abiertos puede indicar un escáner o máquina comprometida, sin necesidad de etiquetas previas. Es aprendizaje no supervisado — el modelo descubre los patrones por sí solo.',
              "from sklearn.cluster import KMeans\nX = [[5, 100], [6, 98], [80, 800], [82, 810]]\nkm = KMeans(n_clusters=2, random_state=42, n_init=10)\nkm.fit(X)\nprint(len(set(km.labels_)))",
              ['n_clusters=2 le dice al modelo que busque 2 grupos.', 'n_init=10 repite el algoritmo 10 veces con distintas semillas para mayor estabilidad.', 'km.labels_ es un array con el ID del cluster asignado a cada punto.'],
              "Tienes conexiones descritas por [bytes_enviados, puertos_escaneados]. Agrupa con KMeans en 2 clusters (n_clusters=2, random_state=42, n_init=10). Imprime el número de clusters distintos encontrados.",
              "from sklearn.cluster import KMeans\nX = [\n    [5, 95], [6, 100], [7, 98], [5, 102],\n    [75, 780], [80, 800], [82, 820], [78, 790]\n]\nkm = KMeans(n_clusters=2, random_state=42, n_init=10)\n# km.fit(X)\n# print(len(set(km.labels_)))\n",
              '2',
              'output_equals',
              'Llama a km.fit(X) y luego print(len(set(km.labels_))). Los 8 puntos forman 2 grupos claramente separados — KMeans los distingue perfectamente.',
              "from sklearn.cluster import KMeans\nX = [\n    [5, 95], [6, 100], [7, 98], [5, 102],\n    [75, 780], [80, 800], [82, 820], [78, 790]\n]\nkm = KMeans(n_clusters=2, random_state=42, n_init=10)\nkm.fit(X)\nprint(len(set(km.labels_)))",
              45, 15,
              quiz('¿Qué ventaja tiene K-Means frente a un clasificador supervisado?', ['No necesita datos etiquetados para encontrar patrones', 'Siempre produce mejores resultados', 'Requiere menos datos', 'Solo funciona con 2 clusters'], 'No necesita datos etiquetados para encontrar patrones')
            ),
            { engine: 'pyodide', packages: ['scikit-learn'] }
          ),
          Object.assign(
            lesson(
              'ad_ml_006',
              'Capstone: IsolationForest para detección de intrusiones',
              'Aplicar un modelo de detección de anomalías para identificar conexiones sospechosas en tráfico de red.',
              'IsolationForest es el algoritmo de facto para detección de anomalías: aísla puntos raros con menos pasos que los normales. Devuelve 1 para puntos normales y -1 para anomalías. En defensa de redes, se entrena con tráfico normal y alerta cuando llega algo que "no encaja". Es robusto, rápido y no requiere etiquetas — ideal para entornos donde las amenazas son raras y desconocidas.',
              "from sklearn.ensemble import IsolationForest\nX = [[50], [52], [200]]\nif_model = IsolationForest(contamination=0.33, random_state=42)\nif_model.fit(X)\npred = if_model.predict(X)\nprint((pred == -1).sum())",
              ['contamination indica la fracción esperada de anomalías en los datos.', 'predict() devuelve 1 (normal) o -1 (anomalía).', '(pred == -1).sum() cuenta las anomalías eficientemente con numpy.'],
              "Tienes conexiones de red: 6 normales (bytes ~50) y 3 sospechosas (bytes ~200). Usa IsolationForest(contamination=1/3, random_state=42) para detectarlas. Imprime 'Conexiones sospechosas: N' donde N es el número de anomalías (pred == -1).",
              "from sklearn.ensemble import IsolationForest\nX = [[50],[52],[48],[51],[53],[49],[200],[220],[190]]\nif_model = IsolationForest(contamination=1/3, random_state=42)\nif_model.fit(X)\npred = if_model.predict(X)\n# anomalias = (pred == -1).sum()\n",
              'Conexiones sospechosas: 3',
              'output_equals',
              "Calcula anomalias = (pred == -1).sum() y luego print(f'Conexiones sospechosas: {anomalias}'). Con contamination=1/3 sobre 9 puntos, IsolationForest marcará exactamente 3 como anomalías.",
              "from sklearn.ensemble import IsolationForest\nX = [[50],[52],[48],[51],[53],[49],[200],[220],[190]]\nif_model = IsolationForest(contamination=1/3, random_state=42)\nif_model.fit(X)\npred = if_model.predict(X)\nanomalias = (pred == -1).sum()\nprint(f'Conexiones sospechosas: {anomalias}')",
              50, 18,
              quiz('¿Qué devuelve IsolationForest para un punto anómalo?', ['-1', '1', '0', 'True'], '-1')
            ),
            { engine: 'pyodide', packages: ['scikit-learn'] }
          )
        ]
      }
    ]
  });
  BADGES.push({ id: 'ml_defender', title: 'ML Defender', description: 'Aplicaste machine learning clásico para detectar amenazas y anomalías en datos de red.', icon: '🤖' });
})();
