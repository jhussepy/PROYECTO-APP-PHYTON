function escapeHtml(s='') { return String(s).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[ch])); }
function codeHtml(code='') { return escapeHtml(code); }
function normalizeQuotes(value='') { return String(value).replace(/[‘’‚‛`´]/g, "'").replace(/[“”„‟]/g, '"'); }
function normalizeOutput(value='') { return normalizeQuotes(value).replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n').map(line => line.trimEnd()).join('\n').trim(); }
function softNormalize(value='') { return normalizeOutput(value).replace(/\s+/g, ' ').trim().toLowerCase(); }
function validateExercise(code, output, ex) {
  const actual = normalizeOutput(output);
  const expected = normalizeOutput(ex.expected_output || '');
  const actualSoft = softNormalize(output);
  const expectedSoft = softNormalize(ex.expected_output || '');
  if (ex.validation_type === 'output_equals') return actual === expected || actualSoft === expectedSoft;
  if (ex.validation_type === 'output_contains') return actual.includes(expected) || actualSoft.includes(expectedSoft);
  if (ex.validation_type === 'code_not_empty') return normalizeQuotes(code).trim().length > 0;
  if (ex.validation_type === 'code_contains') return (ex.required_keywords || []).every(k => normalizeQuotes(code).includes(k));
  return actual === expected || actualSoft === expectedSoft;
}
function getValidationDetails(output, expected) {
  const actual = normalizeOutput(output);
  const exp = normalizeOutput(expected || '');
  if (actual === exp) return 'La salida coincide exactamente.';
  if (softNormalize(actual) === softNormalize(exp)) return 'La salida coincide de forma flexible. Se aceptaron diferencias menores de mayúsculas, espacios o comillas.';
  const aLines = actual.split('\n');
  const eLines = exp.split('\n');
  const max = Math.max(aLines.length, eLines.length);
  const diffs = [];
  for (let i = 0; i < max; i++) {
    if ((aLines[i] || '') !== (eLines[i] || '')) diffs.push(`Línea ${i + 1}: esperado "${eLines[i] || '(vacío)'}" / recibido "${aLines[i] || '(vacío)'}"`);
    if (diffs.length >= 3) break;
  }
  if (!actual && exp) return 'Tu programa no produjo salida. Revisa si falta print().';
  return diffs.join('\n') || 'La salida no coincide con lo esperado.';
}
function canOpenCourseContent(courseId) { const course = getCourse(courseId); return !!course && (!course.ethical || state.acceptedEthics.includes(courseId)); }
function getAllLessons() { return COURSES.flatMap(c => c.modules.flatMap(m => m.lessons.map(l => ({...l, courseId: c.id})))); }
function getCourse(courseId) { return COURSES.find(c => c.id === courseId); }
function getLesson(courseId, lessonId) { const c = getCourse(courseId); return c?.modules.flatMap(m => m.lessons).find(l => l.id === lessonId); }
function getTotalLessons() { return getAllLessons().length; }
function getCourseStats(course) {
  const lessons = course.modules.flatMap(m => m.lessons);
  const completed = lessons.filter(l => state.completedLessons.includes(l.id)).length;
  return { total: lessons.length, completed, percent: lessons.length ? Math.round((completed / lessons.length) * 100) : 0 };
}
function getCurrentChallenge() { const all = getAllLessons(); const next = all.find(l => !state.completedLessons.includes(l.id)) || all[0]; return next ? { lesson: next, course: getCourse(next.courseId) } : null; }
function getCourseExam(course) { return course.modules.flatMap(m => m.lessons).filter(l => l.quiz).slice(0, 5); }
function getCourseProject(course) {
  const last = course.modules.flatMap(m => m.lessons).slice(-1)[0];
  return { title: `Proyecto corto: ${course.title}`, objective: last?.objective || 'Integrar lo aprendido', steps: ['Revisa la teoría clave del curso.', 'Completa el último laboratorio disponible.', 'Documenta salida, error corregido y aprendizaje.', 'Aprueba el examen del curso.'] };
}
