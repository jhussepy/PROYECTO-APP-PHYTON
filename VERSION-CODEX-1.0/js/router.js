let mainContainer;
let navBtns;
let btnHomeLogo;

function setupNavigation() {
  mainContainer = document.getElementById('main-container');
  navBtns = document.querySelectorAll('.nav-btn');
  btnHomeLogo = document.getElementById('btn-home-logo');
  navBtns.forEach(btn => btn.addEventListener('click', () => {
    renderView(btn.dataset.view);
  }));
  btnHomeLogo.addEventListener('click', () => renderView('home'));
}
function setActiveNav(view) {
  const root = ['lesson','practice'].includes(view)
    ? 'mission'
    : ['course-detail','exam','lab'].includes(view)
      ? 'courses'
      : ['review','notes','certificate','ctf','glossary','rank','mentor','challenges','analyzer','ethical-labs','focus','roadmap','settings','store'].includes(view)
        ? 'profile'
        : view === 'chess'
          ? 'game'
          : view;
  navBtns.forEach(btn => btn.classList.toggle('active', btn.dataset.view === root));
}
function makeHashForView(view, params = {}) {
  const enc = value => encodeURIComponent(String(value || ''));
  if (view === 'course-detail' && params.courseId) return `#course-detail/${enc(params.courseId)}`;
  if ((view === 'lesson' || view === 'practice') && params.courseId && params.lessonId) return `#${view}/${enc(params.courseId)}/${enc(params.lessonId)}`;
  if ((view === 'exam' || view === 'lab' || view === 'certificate') && params.courseId) return `#${view}/${enc(params.courseId)}`;
  if (view === 'notes' && params.context && params.context !== 'general') return `#notes/${enc(params.context)}`;
  const simple = ['home','courses','profile','mission','market','game','chess','review','notes','ctf','glossary','rank','mentor','challenges','analyzer','ethical-labs','focus','roadmap','settings','store'];
  return simple.includes(view) ? `#${view}` : '#home';
}

function syncHash(view, params = {}) {
  const target = makeHashForView(view, params);
  if (location.hash !== target) history.replaceState(null, '', target);
}

function renderView(view, params = {}) {
  syncHash(view, params);
  if (view !== 'focus' && typeof pauseFocusTimer === 'function') pauseFocusTimer();
  state.view = view;
  mainContainer.innerHTML = '';
  mainContainer.focus();
  window.scrollTo(0, 0);
  setActiveNav(view);
  if (view === 'home') return renderHome();
  if (view === 'courses') return renderCourses();
  if (view === 'profile') return renderProfile();
  if (view === 'rank') return renderRankSystem();
  if (view === 'mission') return renderMissionOS();
  if (view === 'market') return renderMarket();
  if (view === 'mentor') return renderMentor();
  if (view === 'challenges') return renderChallengeGenerator();
  if (view === 'analyzer') return renderCodeAnalyzer();
  if (view === 'ethical-labs') return renderEthicalLabs();
  if (view === 'focus') return renderFocusMode();
  if (view === 'roadmap') return renderRoadmap();
  if (view === 'settings') return renderSettings();
  if (view === 'store') return renderEliteStore();
  if (view === 'game') return renderGameHub();
  if (view === 'chess') return renderChess();
  if (view === 'course-detail') return renderCourseDetail(params.courseId);
  if (view === 'exam') return renderCourseExam(params.courseId);
  if (view === 'lab') return renderGuidedLab(params.courseId);
  if (view === 'review') return renderReviewMode();
  if (view === 'notes') return renderNotesMode(params.context || 'general');
  if (view === 'certificate') return renderCertificate(params.courseId);
  if (view === 'ctf') return renderCTFMode();
  if (view === 'glossary') return renderGlossaryMode();
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

function openCurrentMission() {
  const challenge = typeof getCurrentChallenge === 'function' ? getCurrentChallenge() : null;
  if (!challenge || !challenge.lesson) return renderView('courses');
  return renderView('lesson', { courseId: challenge.lesson.courseId, lessonId: challenge.lesson.id });
}
