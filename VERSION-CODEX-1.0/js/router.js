let mainContainer;
let navBtns;
let btnHomeLogo;

function setupNavigation() {
  mainContainer = document.getElementById('main-container');
  navBtns = document.querySelectorAll('.nav-btn');
  btnHomeLogo = document.getElementById('btn-home-logo');
  navBtns.forEach(btn => btn.addEventListener('click', () => renderView(btn.dataset.view)));
  btnHomeLogo.addEventListener('click', () => renderView('home'));
}
function setActiveNav(view) {
  const root = ['lesson','practice','course-detail','exam','lab','review','notes','certificate'].includes(view) ? (['review','notes','certificate'].includes(view) ? 'profile' : 'courses') : view;
  navBtns.forEach(btn => btn.classList.toggle('active', btn.dataset.view === root));
}
function renderView(view, params = {}) {
  state.view = view;
  mainContainer.innerHTML = '';
  mainContainer.focus();
  window.scrollTo(0, 0);
  setActiveNav(view);
  if (view === 'home') return renderHome();
  if (view === 'courses') return renderCourses();
  if (view === 'profile') return renderProfile();
  if (view === 'course-detail') return renderCourseDetail(params.courseId);
  if (view === 'exam') return renderCourseExam(params.courseId);
  if (view === 'lab') return renderGuidedLab(params.courseId);
  if (view === 'review') return renderReviewMode();
  if (view === 'notes') return renderNotesMode(params.context || 'general');
  if (view === 'certificate') return renderCertificate(params.courseId);
  if (view === 'lesson') { if (!canOpenCourseContent(params.courseId)) return redirectToEthics(params.courseId); return renderLesson(params.courseId, params.lessonId); }
  if (view === 'practice') { if (!canOpenCourseContent(params.courseId)) return redirectToEthics(params.courseId); return renderPractice(params.courseId, params.lessonId); }
  return renderHome();
}
function redirectToEthics(courseId) { renderCourseDetail(courseId); setTimeout(() => alert('Primero acepta el modo ético del curso para desbloquear estas prácticas.'), 60); }
function openLessonGuarded(courseId, lessonId) { renderView('lesson', {courseId, lessonId}); }
function openPracticeGuarded(courseId, lessonId) { renderView('practice', {courseId, lessonId}); }
function acceptEthics(courseId) { if (!state.acceptedEthics.includes(courseId)) { state.acceptedEthics.push(courseId); unlockBadge('ethical'); saveState(); } renderCourseDetail(courseId); }
function goNextLesson(courseId, lessonId) {
  const all = getAllLessons();
  const idx = all.findIndex(l => l.id === lessonId);
  if (idx >= 0 && idx < all.length - 1) { const next = all[idx + 1]; return renderView('lesson', {courseId: next.courseId, lessonId: next.id}); }
  renderView('profile');
}
