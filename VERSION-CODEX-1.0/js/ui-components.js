function progressBar(percent) {
  const safe = Math.max(0, Math.min(100, Number(percent) || 0));
  return `<div class="progress-bar-bg"><div class="progress-bar-fill" style="width:${safe}%"></div></div>`;
}
function metricCard(value, label, glow = '') {
  return `<div class="metric ${glow}"><strong>${escapeHtml(value)}</strong><span>${escapeHtml(label)}</span></div>`;
}
function sectionTitle(title, pill = '') {
  return `<div class="section-title"><h2>${escapeHtml(title)}</h2>${pill ? `<span class="pill">${escapeHtml(pill)}</span>` : ''}</div>`;
}
function chip(text, variant = '') {
  return `<span class="pill ${variant}">${escapeHtml(text)}</span>`;
}
function actionButton(label, onclick, variant = 'btn-primary', extra = '') {
  return `<button class="btn ${variant} ${extra}" onclick="${onclick}">${escapeHtml(label)}</button>`;
}
// Delegated variant: emits a declarative data-action button instead of an inline onclick code
// string. dataAttrs keys become data-<key> attributes (use kebab-case, e.g. 'course-id' →
// el.dataset.courseId). Values are escaped for defense in depth. Dispatched by the motor in
// js/event-delegation.js. Prefer this over actionButton for any handler that carries user data.
function actionButtonDelegated(label, action, dataAttrs = {}, variant = 'btn-primary', extra = '') {
  const attrs = Object.entries(dataAttrs)
    .map(([key, value]) => ` data-${key}="${escapeHtml(value)}"`)
    .join('');
  return `<button class="btn ${variant} ${extra}" data-action="${escapeHtml(action)}"${attrs}>${escapeHtml(label)}</button>`;
}
function statusPill(text, variant = '') { return `<span class="pill ${variant}">${escapeHtml(text)}</span>`; }
function emptyState(text) { return `<section class="empty-state">${escapeHtml(text)}</section>`; }
function safeAttr(value='') { return escapeHtml(String(value)); }

// Métrica HUD: número + label + icono en mini-marco hexagonal (kit .hud-*).
// variant se restringe a la paleta del kit para no inyectar clases arbitrarias.
function hudMetric(value, label, icon, variant = 'green') {
  const tone = ['green', 'blue', 'red'].includes(variant) ? variant : 'green';
  return `<div class="hud-metric hud-frame hud-frame--${tone}"><div class="hud-metric-data"><strong>${escapeHtml(value)}</strong><span>${escapeHtml(label)}</span></div><span class="hud-metric-icon">${escapeHtml(String(icon))}</span></div>`;
}

function buildAvatar3D(icon, colorClass = 'green') {
  const safe = escapeHtml(String(icon));
  return `<div class="avatar3d color-${colorClass}"><div class="avatar3d-scene"><div class="avatar3d-plate"></div><div class="avatar3d-aura"></div><div class="avatar3d-ring"></div><div class="avatar3d-hero">${safe}</div><div class="avatar3d-gloss"></div></div></div>`;
}
