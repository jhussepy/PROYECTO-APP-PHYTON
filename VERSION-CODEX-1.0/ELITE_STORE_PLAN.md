# PySec Academy Elite Store

## Visión

Elite Store es una tienda educativa y meritocrática. Su propósito es convertir el progreso verificable del estudiante en opciones de personalización y reconocimiento, sin introducir presión de compra, azar ni mecánicas de apuesta.

## Principios obligatorios

- PyCoins son puntos internos sin valor monetario, transferencia, retiro o conversión.
- Los PyCoins se obtienen únicamente mediante progreso real registrado por la academia.
- Cada compra muestra contenido y precio exactos antes de confirmar.
- Los desbloqueos por logros tienen requisitos explícitos y comprobables.
- Los packs muestran todos sus componentes; nunca contienen resultados ocultos.
- La tienda no vende ventajas académicas, respuestas, notas, acceso privilegiado a exámenes ni atajos de progreso.
- No se implementarán ruletas, gacha, spins, loot boxes, sorteos, jackpots, premios aleatorios, probabilidades de obtención ni apuestas.
- No se usarán etiquetas de rareza diseñadas para simular sistemas de obtención aleatoria.

## Economía de PyCoins

Fuentes permitidas:

- Completar lecciones por primera vez.
- Aprobar exámenes.
- Completar cursos y rutas.
- Finalizar proyectos con rúbrica.
- Alcanzar hitos de constancia verificables.
- Desbloquear logros académicos definidos.

Reglas:

- No hay bonos manuales o botones de prueba en producción.
- No se premia repetir indefinidamente una actividad ya completada.
- Toda entrada o gasto queda registrado con fecha, motivo y cantidad.
- Los precios se definen por nivel de progreso y esfuerzo esperado, no por escasez artificial.
- El saldo nunca puede ser negativo.

## Catálogo previsto

- Packs completos: conjuntos visibles de artículos con precio fijo.
- Avatares: identidades visuales equipables.
- Temas: paletas y estilos de interfaz.
- Marcos: presentación del avatar y perfil.
- Badges: reconocimientos ligados a logros concretos.
- Fondos: personalización de perfil y paneles compatibles.
- Mascotas: acompañantes visuales sin impacto académico.
- Widgets: módulos visuales para progreso, rachas, notas y objetivos.
- Certificados internos: variantes visuales solo después de obtener el certificado académico correspondiente.

## Formas de acceso

1. Compra directa con PyCoins.
2. Desbloqueo automático por logro.
3. Requisito académico más compra con PyCoins.
4. Pack completo con contenido y precio visibles.

Un artículo puede usar una sola forma de acceso o combinar requisitos explícitos. Nunca se decide por probabilidad.

## Experiencia de usuario

- Navegación por categorías y colección adquirida.
- Filtros por nivel, precio, estado y requisito.
- Vista previa antes de comprar o equipar.
- Confirmación clara con saldo anterior y saldo resultante.
- Estado visible: disponible, requisito pendiente, comprado o equipado.
- Explicación de cómo ganar PyCoins desde cada artículo bloqueado.
- Historial auditable de ingresos y compras.

## Modelo de datos mínimo

Cada artículo debe definir:

- `id`, `type`, `name`, `description` y `tier`.
- `pricePyCoins` para compras directas.
- `achievementId` o requisitos académicos cuando corresponda.
- `contents` para packs completos.
- `owned`, `equipped` y metadatos de presentación.

Las transacciones deben definir:

- Identificador determinista.
- Tipo `earn` o `spend`.
- Cantidad, motivo, fuente académica y fecha.

## Fases

### Fase 1: Base meritocrática

- Consolidar wallet, historial y recompensas por progreso.
- Mantener compras directas de avatares y temas.
- Eliminar bonos manuales, lenguaje de rareza y cualquier referencia a azar.

### Fase 2: Catálogo completo

- Añadir marcos, fondos, mascotas y widgets.
- Añadir packs completos con contenido visible.
- Unificar inventario, equipamiento y filtros.

### Fase 3: Logros y reconocimiento

- Integrar badges y requisitos académicos.
- Añadir certificados internos vinculados a certificados ya obtenidos.
- Mostrar trazabilidad entre logro, desbloqueo y artículo.

### Fase 4: Calidad y control

- Añadir pruebas de saldo, duplicados, persistencia y requisitos.
- Verificar accesibilidad, responsive y funcionamiento offline.
- Auditar textos y código para impedir la reintroducción de mecánicas aleatorias.

## Criterios de aceptación

- El usuario siempre sabe qué obtiene y cuánto cuesta.
- Toda ganancia de PyCoins tiene una causa académica verificable.
- Ninguna compra depende de suerte, probabilidad o selección oculta.
- Los packs entregan exactamente los artículos anunciados.
- Los logros desbloquean exactamente los artículos definidos.
- No existe compra con dinero real ni conversión de PyCoins.
- No existen ruletas, gacha, spins, loot boxes, apuestas o premios aleatorios en interfaz, datos, lógica o roadmap.
