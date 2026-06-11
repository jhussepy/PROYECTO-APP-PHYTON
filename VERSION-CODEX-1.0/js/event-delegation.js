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
