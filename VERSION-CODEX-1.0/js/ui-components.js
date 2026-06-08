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
function statusPill(text, variant = '') { return `<span class="pill ${variant}">${escapeHtml(text)}</span>`; }
function emptyState(text) { return `<section class="empty-state">${escapeHtml(text)}</section>`; }
function safeAttr(value='') { return escapeHtml(String(value)); }
