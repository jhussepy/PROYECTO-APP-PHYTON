document.addEventListener('DOMContentLoaded', initApp);

function initApp() {
  loadState();
  if (typeof applyTheme === 'function') applyTheme();
  checkStreak();
  setupNavigation();
  setupAppControls();
  renderView('home');
  registerServiceWorker();
}

function setupAppControls() {
  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) themeBtn.addEventListener('click', toggleTheme);
  const importInput = document.getElementById('import-progress-file');
  if (importInput) importInput.addEventListener('change', e => importProgressJSON(e.target.files[0]));
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
