// Central click-delegation motor.
// Add entries to ACTION_REGISTRY keyed by the data-action value; data flows via dataset,
// never via string interpolation. Call initEventDelegation() once from app.js at startup.

const ACTION_REGISTRY = {
  // Two illustrative entries — registry will be populated incrementally in Phase 3.1.

  // <button data-action="render-view" data-view="notes" data-context="python">...</button>
  'render-view': function(el) {
    const view = el.dataset.view || 'home';
    const params = {};
    if (el.dataset.courseId !== undefined) params.courseId = el.dataset.courseId;
    if (el.dataset.lessonId !== undefined) params.lessonId = el.dataset.lessonId;
    if (el.dataset.context  !== undefined) params.context  = el.dataset.context;
    renderView(view, params);
  },

  // <button data-action="buy-item" data-category="themes" data-id="neon-dark">...</button>
  'buy-item': function(el) {
    buyEliteItem(el.dataset.category, el.dataset.id);
  },

  // --- Phase 3.1 (ui.js batch 1) ---

  // <article data-action="open-lesson-guarded" data-course-id="c" data-lesson-id="l">...</article>
  'open-lesson-guarded': function(el) {
    openLessonGuarded(el.dataset.courseId, el.dataset.lessonId);
  },

  // Locked lesson card: ethics not yet accepted. No data needed.
  'lesson-locked': function() {
    alert('Primero acepta el modo ético del curso.');
  },

  // Symbol/snippet bar. data-snippet holds an encodeURIComponent value;
  // insertEncoded itself decodeURIComponent's it.
  'insert-encoded': function(el) {
    insertEncoded(el.dataset.snippet);
  },

  // <button data-action="complete-ctf" data-challenge-id="id">...</button>
  'complete-ctf': function(el) {
    completeCTF(el.dataset.challengeId);
  },

  // <button data-action="generate-ai-exam" data-course-id="c">...</button>
  'generate-ai-exam': function(el) {
    generateAiCourseExam(el.dataset.courseId);
  },

  // <button data-action="render-course-exam" data-course-id="c" [data-mode="local"]>...</button>
  'render-course-exam': function(el) {
    if (el.dataset.mode !== undefined) renderCourseExam(el.dataset.courseId, el.dataset.mode);
    else renderCourseExam(el.dataset.courseId);
  },

  // Compound: mark lab complete, toast, then go back to the course detail.
  'complete-guided-lab': function(el) {
    const courseId = el.dataset.courseId;
    completeGuidedLab(courseId);
    showToast('🧪 Lab guiado completado', '+60 XP');
    renderView('course-detail', { courseId });
  },

  // <button data-action="open-practice-guarded" data-course-id="c" data-lesson-id="l">...</button>
  'open-practice-guarded': function(el) {
    openPracticeGuarded(el.dataset.courseId, el.dataset.lessonId);
  },

  // Compound: remove the mistake then re-render the review list.
  'remove-mistake': function(el) {
    removeMistake(el.dataset.mistakeId);
    renderReviewMode();
  },

  // <button data-action="accept-ethics" data-course-id="c">...</button>
  'accept-ethics': function(el) {
    acceptEthics(el.dataset.courseId);
  },

  // --- Phase 3.2 (market.js batch) ---

  // <button data-action="set-market-filter" data-sector="Tech">...</button>
  'set-market-filter': function(el) {
    setMarketFilter(el.dataset.sector);
  },

  // <button data-action="reset-market-alert" data-id="alert_x">...</button>
  'reset-market-alert': function(el) {
    resetMarketAlert(el.dataset.id);
  },

  // <button data-action="delete-market-alert" data-id="alert_x">...</button>
  'delete-market-alert': function(el) {
    deleteMarketAlert(el.dataset.id);
  },

  // <button data-action="delete-market-note" data-id="note_x">...</button>
  'delete-market-note': function(el) {
    deleteMarketNote(el.dataset.id);
  },

  // Stock tile/chip/row/mini-quote → open the detail for that symbol.
  'select-stock': function(el) {
    selectStock(el.dataset.symbol);
  },

  // --- Phase 3.1 Lote 3 (learning-os.js batch) ---

  // <button data-action="set-notes-filter" data-filter="python">...</button>
  'set-notes-filter': function(el) {
    setNotesFilter(el.dataset.filter);
  },

  // <button data-action="save-note-edit" data-id="note_123">...</button>
  'save-note-edit': function(el) {
    saveStudentNoteEdit(el.dataset.id);
  },

  // <button data-action="edit-note" data-id="note_123">...</button>
  'edit-note': function(el) {
    editStudentNote(el.dataset.id);
  },

  // Compound: delete note then re-render with the context that was active.
  // <button data-action="delete-note" data-id="note_123" data-context="python">...</button>
  'delete-note': function(el) {
    deleteAgentNote(el.dataset.id);
    renderNotesMode(el.dataset.context);
  },

  // --- Phase 3.1 Lote 4 · market-intelligence-ux.js ---

  // <button data-action="create-market-alert" data-symbol="NVDA">...</button>
  'create-market-alert': function(el) {
    createMarketAlert(el.dataset.symbol);
  },

  // <button data-action="toggle-watchlist" data-symbol="NVDA">...</button>
  'toggle-watchlist': function(el) {
    toggleWatchlist(el.dataset.symbol);
  },

  // --- Phase 3.1 Lote 4 · market-command-dashboard.js ---

  // <button data-action="quick-add-portfolio" data-symbol="NVDA">...</button>
  'quick-add-portfolio': function(el) {
    quickAddPortfolio(el.dataset.symbol);
  },

  // <button data-action="remove-portfolio-holding" data-symbol="NVDA">...</button>
  'remove-portfolio-holding': function(el) {
    removePortfolioHolding(el.dataset.symbol);
  }
};

function initEventDelegation() {
  const container = document.getElementById('main-container');
  if (!container) return;
  container.addEventListener('click', function(event) {
    const target = event.target.closest('[data-action]');
    if (!target) return;
    const action = target.dataset.action;
    const handler = ACTION_REGISTRY[action];
    if (typeof handler === 'function') handler(target);
  });
}
