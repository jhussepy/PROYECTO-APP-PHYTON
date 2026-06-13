/* chess-game.js — Ultimate design + 7 visual improvements.
   Chess engine: chess.js 0.13.4 (js/lib/chess.js, BSD-2-Clause, Jeff Hlywa).
   RULE: chess.js and move logic are NOT modified. Only the visual layer. */

const _CHESS_LIB = 'js/lib/chess.js';

const _PIECES = {
  wk:'♔', wq:'♕', wr:'♖', wb:'♗', wn:'♘', wp:'♙',
  bk:'♚', bq:'♛', br:'♜', bb:'♝', bn:'♞', bp:'♟'
};

const _FILES = ['a','b','c','d','e','f','g','h'];
const _RANKS = [8,7,6,5,4,3,2,1];

let _chess     = null;
let _selSq     = null;
let _legalSqs  = [];
let _history   = [];   // SAN strings of each move
let _fens      = [];   // FEN after each half-move; [0] = initial
let _reviewIdx = -1;   // -1 = live; ≥0 = review position index
let _lastFrom  = null;
let _lastTo    = null;

// ── 1. WEB AUDIO ─────────────────────────────────────────────────────────────

let _audioCtx = null;

function _ac() {
  if (!_audioCtx) {
    try { _audioCtx = new (window.AudioContext || window.webkitAudioContext)(); }
    catch (_) { return null; }
  }
  return _audioCtx;
}

function _beep(freq, type, dur, vol) {
  const ctx = _ac();
  if (!ctx) return;
  try {
    const osc  = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(vol || 0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + dur);
  } catch (_) {}
}

function sndMove()     { _beep(520, 'triangle', 0.09, 0.12); }
function sndCapture()  { _beep(180, 'sawtooth', 0.18, 0.20); setTimeout(() => _beep(320, 'square', 0.10, 0.10), 30); }
function sndCheck()    { _beep(880, 'sine', 0.07, 0.18); setTimeout(() => _beep(1100, 'sine', 0.08, 0.15), 80); }
function sndGameOver() { [440, 330, 220, 110].forEach((f, i) => setTimeout(() => _beep(f, 'triangle', 0.28, 0.18), i * 120)); }

// ── CHESS LIB LOADER ─────────────────────────────────────────────────────────

function _loadChessJs() {
  if (typeof Chess !== 'undefined') return Promise.resolve();
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = _CHESS_LIB;
    s.onload  = () => (typeof Chess !== 'undefined'
      ? resolve()
      : reject(new Error('chess.js cargado pero no expuso Chess.')));
    s.onerror = () => reject(new Error('No se pudo cargar js/lib/chess.js.'));
    document.head.appendChild(s);
  });
}

// ── STATUS ────────────────────────────────────────────────────────────────────

function _statusInfo(chessInst) {
  const c = chessInst || _chess;
  if (c.in_checkmate()) return { msg: `Jaque mate — ganan ${c.turn() === 'w' ? '♛ Negras' : '♕ Blancas'}`, over: true,  check: false };
  if (c.in_stalemate()) return { msg: 'Tablas por ahogado',                                                   over: true,  check: false };
  if (c.in_draw())      return { msg: 'Tablas',                                                               over: true,  check: false };
  if (c.in_check())     return { msg: c.turn() === 'w' ? '¡Jaque a Blancas!' : '¡Jaque a Negras!',           over: false, check: true  };
  return                       { msg: c.turn() === 'w' ? '⬜ Turno: Blancas' : '⬛ Turno: Negras',           over: false, check: false };
}

// ── 4. BOARD HTML ─────────────────────────────────────────────────────────────

function _buildCells(chessInst, selSq, legalSqs, lastFrom, lastTo, spawnCls) {
  let html = '';
  for (const rank of _RANKS) {
    for (let fi = 0; fi < 8; fi++) {
      const sq    = _FILES[fi] + rank;
      const piece = chessInst.get(sq);
      const dark  = (fi + rank) % 2 !== 0;
      const sel   = selSq === sq;
      const tgt   = legalSqs.includes(sq);
      const cap   = tgt && !!piece;
      const lFrom = lastFrom === sq;
      const lTo   = lastTo   === sq;
      const glyph = piece ? _PIECES[piece.color + piece.type] : '';

      let cls = `cell ${dark ? 'd' : 'l'}`;
      if (sel)   cls += ' sel';
      if (tgt)   cls += ' tgt';
      if (cap)   cls += ' cap';
      if (lFrom) cls += ' last-from';
      if (lTo)   cls += ' last-to';

      let pieceHtml = '';
      if (glyph) {
        const pc    = piece.color === 'w' ? 'w' : 'b';
        const delay = spawnCls ? ` style="animation-delay:${(Math.random() * 350) | 0}ms"` : '';
        pieceHtml   = `<span class="piece ${pc}${spawnCls ? ' ' + spawnCls : ''}" aria-hidden="true"${delay}>${glyph}</span>`;
      }

      html += `<div class="${cls}" data-action="chess-click" data-sq="${sq}" aria-label="${sq}${glyph ? ' ' + glyph : ''}">${pieceHtml}</div>`;
    }
  }
  return html;
}

function _buildHistory(reviewing) {
  if (!_history.length) return '';
  let html = '';
  _history.forEach((san, i) => {
    const isWhite = i % 2 === 0;
    const moveNum = Math.floor(i / 2) + 1;
    const active  = reviewing && _reviewIdx === i ? ' active' : '';
    if (isWhite) html += `<span class="ch-num">${moveNum}.</span>`;
    html += `<span class="ch-move${active}" data-action="chess-review" data-idx="${i}">${escapeHtml(san)}</span>`;
    if (isWhite && i === _history.length - 1) html += '<span></span>';
  });
  return `<div class="chess-history" id="chess-history">${html}</div>`;
}

function _buildReviewBar(status, reviewing) {
  if (!_history.length) return '';
  if (!status.over && !reviewing) return '';
  const prevIdx = reviewing ? _reviewIdx - 1 : _history.length - 1;
  const nextIdx = reviewing ? _reviewIdx + 1 : -1;
  const label   = reviewing ? `Mov. ${_reviewIdx + 1} / ${_history.length}` : '↩ En vivo';
  return `<div class="chess-review-bar">
    <button class="crb" data-action="chess-review" data-idx="-2" title="Inicio">⏮</button>
    <button class="crb" data-action="chess-review" data-idx="${prevIdx}" title="Anterior">◀</button>
    <span class="crb-label">${label}</span>
    <button class="crb" data-action="chess-review" data-idx="${nextIdx}" title="Siguiente">▶</button>
    <button class="crb" data-action="chess-review" data-idx="-3" title="Final">⏭</button>
  </div>`;
}

function _buildShell(cells, status, reviewing) {
  const turnLabel   = escapeHtml(status.msg);
  const checkBadge  = status.check ? `<span class="chess-check">${escapeHtml(status.msg)}</span>` : '';
  const overBadge   = status.over  ? `<span class="chess-gameover">${escapeHtml(status.msg)}</span>` : '';
  const reviewBadge = reviewing    ? `<span class="chess-reviewing-badge">👁 Revisando</span>` : '';

  return `
    <div class="chess-shell">
      <div class="chess-bar">
        <button class="btn btn-outline chess-back-btn" data-action="render-view" data-view="game">← Game</button>
        <div class="chess-info">
          <span class="chess-turn${status.over ? ' chess-turn--over' : ''}">${turnLabel}</span>
          ${checkBadge}${overBadge}${reviewBadge}
        </div>
        <button class="btn btn-outline chess-new-btn" data-action="chess-new-game">Nueva partida</button>
      </div>
      <div class="bframe" id="chess-bframe">
        <div class="c tl"></div><div class="c tr"></div>
        <div class="c bl"></div><div class="c br"></div>
        <div class="check-overlay" id="chess-check-overlay"></div>
        <div class="chess-board" role="grid" aria-label="Tablero de ajedrez">${cells}</div>
      </div>
      ${_buildHistory(reviewing)}
      ${_buildReviewBar(status, reviewing)}
      <p class="chess-hint">Toca pieza → resalta movimientos → toca destino · ♕ auto-coronación</p>
    </div>
    <div class="bottom-spacer"></div>`;
}

// ── 5. DRAW (live) ────────────────────────────────────────────────────────────

function _drawChess() {
  const status = _statusInfo();
  const cells  = _buildCells(_chess, _selSq, _legalSqs, _lastFrom, _lastTo, '');
  mainContainer.innerHTML = _buildShell(cells, status, false);
  _scrollHistoryEnd();
}

function _scrollHistoryEnd() {
  const el = document.getElementById('chess-history');
  if (el) el.scrollTop = el.scrollHeight;
}

// ── RENDER ENTRY POINT ────────────────────────────────────────────────────────

function renderChess() {
  mainContainer.innerHTML = `<div style="display:grid;place-items:center;min-height:240px;gap:16px"><div class="loader"></div><p style="font-family:var(--f-mono);font-size:.8rem;color:var(--c-green)">Cargando ajedrez…</p></div>`;
  _loadChessJs()
    .then(() => {
      if (!_chess) {
        _chess     = new Chess();
        _history   = [];
        _fens      = [_chess.fen()];
        _reviewIdx = -1;
        _lastFrom  = null;
        _lastTo    = null;
      }
      _selSq    = null;
      _legalSqs = [];
      _drawChess();
    })
    .catch(err => {
      mainContainer.innerHTML = `<section class="panel-card" style="text-align:center;padding:24px"><p style="color:var(--c-red);font-family:var(--f-mono);font-size:.82rem">${escapeHtml(err.message)}</p><button class="btn btn-outline" style="margin-top:14px" data-action="render-view" data-view="game">← Volver a Game</button></section>`;
    });
}

// ── 6. MOVE INTERACTION ───────────────────────────────────────────────────────

function _chessClick(sq) {
  if (!_chess || _chess.game_over()) return;
  if (_reviewIdx >= 0) return;   // 7. review mode blocks input

  const piece = _chess.get(sq);

  if (_selSq && _legalSqs.includes(sq)) {
    _execMove(_selSq, sq);
    return;
  }

  if (piece && piece.color === _chess.turn()) {
    _selSq    = sq;
    _legalSqs = _chess.moves({ square: sq, verbose: true }).map(m => m.to);
    _drawChess();
    return;
  }

  _selSq    = null;
  _legalSqs = [];
  _drawChess();
}

function _execMove(from, to) {
  const captured = _chess.get(to);

  // 3. Capture explosion — target piece animates before flight lands
  if (captured) {
    const destCell = document.querySelector(`[data-sq="${to}"]`);
    if (destCell) {
      const pieceEl = destCell.querySelector('.piece');
      if (pieceEl) pieceEl.classList.add('exploding');
    }
  }

  // 4. Fly piece, then commit move + redraw
  _flyPiece(from, to, () => {
    const result = _chess.move({ from, to, promotion: 'q' });
    if (!result) { _drawChess(); return; }

    _history.push(result.san);
    _fens.push(_chess.fen());
    _lastFrom = from;
    _lastTo   = to;
    _selSq    = null;
    _legalSqs = [];

    const status = _statusInfo();
    if (status.over)       sndGameOver();
    else if (status.check) sndCheck();
    else if (captured)     sndCapture();
    else                   sndMove();

    _drawChess();

    // 2. Check flash overlay
    if (status.check && !status.over) {
      const ov = document.getElementById('chess-check-overlay');
      if (ov) { ov.classList.remove('active'); void ov.offsetWidth; ov.classList.add('active'); }
    }
  });
}

// ── 4. FLYING PIECE ──────────────────────────────────────────────────────────

function _flyPiece(from, to, onDone) {
  const fromCell = document.querySelector(`[data-sq="${from}"]`);
  const toCell   = document.querySelector(`[data-sq="${to}"]`);
  if (!fromCell || !toCell) { onDone(); return; }

  const pieceEl = fromCell.querySelector('.piece');
  if (!pieceEl) { onDone(); return; }

  const glyph   = pieceEl.textContent;
  const isWhite = pieceEl.classList.contains('w');
  const fromRect = fromCell.getBoundingClientRect();
  const toRect   = toCell.getBoundingClientRect();

  // Hide source piece during flight
  pieceEl.style.opacity = '0';

  // Build inline-styled flying clone (avoids .piece inset:0 conflict)
  const color  = isWhite ? '#f0f0e8' : '#1a2e1e';
  const filter = isWhite
    ? 'drop-shadow(0 1px 3px rgba(255,255,255,.6)) drop-shadow(0 0 8px rgba(255,255,255,.25))'
    : 'drop-shadow(0 1px 3px rgba(45,245,126,.55)) drop-shadow(0 0 10px rgba(45,245,126,.3))';

  const clone = document.createElement('span');
  clone.textContent = glyph;
  clone.style.cssText = [
    'position:fixed',
    `top:${fromRect.top}px`,
    'right:auto',
    'bottom:auto',
    `left:${fromRect.left}px`,
    `width:${fromRect.width}px`,
    `height:${fromRect.height}px`,
    'display:flex',
    'align-items:center',
    'justify-content:center',
    'pointer-events:none',
    'z-index:9999',
    'font-size:clamp(1.15rem,5.5vw,2.05rem)',
    `color:${color}`,
    `filter:${filter}`,
    'transition:top .18s cubic-bezier(.2,0,.4,1),left .18s cubic-bezier(.2,0,.4,1)',
  ].join(';');

  document.body.appendChild(clone);

  // Trigger CSS transition on next paint
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      clone.style.top  = `${toRect.top}px`;
      clone.style.left = `${toRect.left}px`;
    });
  });

  setTimeout(() => {
    clone.remove();
    onDone();
  }, 200);
}

// ── 5. NEW GAME (materialize spawn on all pieces) ─────────────────────────────

function _chessNewGame() {
  _chess     = new Chess();
  _history   = [];
  _fens      = [_chess.fen()];
  _reviewIdx = -1;
  _selSq     = null;
  _legalSqs  = [];
  _lastFrom  = null;
  _lastTo    = null;

  const status = _statusInfo();
  const cells  = _buildCells(_chess, null, [], null, null, 'spawn');
  mainContainer.innerHTML = _buildShell(cells, status, false);
}

// ── 7. REVIEW MODE ────────────────────────────────────────────────────────────

function _chessReview(rawIdx) {
  if (!_fens.length) return;
  let idx = parseInt(rawIdx, 10);

  if (idx === -2) idx = 0;                    // ⏮ jump to first move
  if (idx === -3) idx = _history.length - 1;  // ⏭ jump to last move
  if (idx < 0 || idx >= _history.length) {    // ◀ past start or ▶ past end → live
    _reviewIdx = -1;
    _drawChess();
    return;
  }

  _reviewIdx = idx;
  const chessInst = new Chess();
  chessInst.load(_fens[Math.min(idx + 1, _fens.length - 1)]);

  const status = _statusInfo(chessInst);
  const cells  = _buildCells(chessInst, null, [], null, null, '');
  mainContainer.innerHTML = _buildShell(cells, status, true);
  _scrollHistoryEnd();
}
