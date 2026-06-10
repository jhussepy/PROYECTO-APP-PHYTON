document.addEventListener('DOMContentLoaded', initApp);

function initApp() {
  loadState();
  if (typeof applyTheme === 'function') applyTheme();
  checkStreak();
  setupNavigation();
  setupAppControls();
  const initialView = getInitialViewFromHash();
  renderView(initialView.view, initialView.params);
  window.addEventListener('hashchange', () => {
    const next = getInitialViewFromHash();
    renderView(next.view, next.params);
  });
  registerServiceWorker();
}


function getInitialViewFromHash() {
  const raw = String(location.hash || '').replace('#', '').trim();
  if (!raw) return { view: 'home', params: {} };
  const [view, a, b] = raw.split('/').map(decodeURIComponent);
  const allowed = ['home','courses','profile','mission','market','review','notes','ctf','glossary','rank','mentor','challenges','analyzer','ethical-labs','focus','roadmap','settings'];
  if (view === 'course-detail' && a) return { view, params: { courseId: a } };
  if ((view === 'lesson' || view === 'practice') && a && b) return { view, params: { courseId: a, lessonId: b } };
  if ((view === 'exam' || view === 'lab' || view === 'certificate') && a) return { view, params: { courseId: a } };
  if (view === 'notes' && a) return { view, params: { context: a } };
  if (allowed.includes(view)) return { view, params: {} };
  return { view: 'home', params: {} };
}

function setupAppControls() {
  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) themeBtn.addEventListener('click', toggleTheme);
  const importInput = document.getElementById('import-progress-file');
  if (importInput) importInput.addEventListener('change', e => importProgressJSON(e.target.files[0]));
  const rankBtn = document.getElementById('btn-rank-xp');
  if (rankBtn) rankBtn.addEventListener('click', () => renderView('rank'));
}

function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return;
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('./sw.js')
      .then(registration => registration.update())
      .catch(err => console.log('SW error', err));
  });
}
