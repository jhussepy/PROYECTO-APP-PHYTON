/* chess-game.js — Ajedrez con chess.js 0.13.4 (CDN: cdn.jsdelivr.net, ya excluido del SW).
   Dos jugadores por turnos en el mismo dispositivo. Coronación auto → dama (♕). */

const _CHESS_CDN = 'https://cdn.jsdelivr.net/npm/chess.js@0.13.4/chess.min.js';

const _PIECES = {
  wk:'♔', wq:'♕', wr:'♖', wb:'♗', wn:'♘', wp:'♙',
  bk:'♚', bq:'♛', br:'♜', bb:'♝', bn:'♞', bp:'♟'
};

const _FILES = ['a','b','c','d','e','f','g','h'];
const _RANKS = [8,7,6,5,4,3,2,1]; // top-to-bottom in render (rank 8 first row)

let _chess      = null;
let _selSq      = null;
let _legalSqs   = [];

function _loadChessJs() {
  if (typeof Chess !== 'undefined') return Promise.resolve();
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = _CHESS_CDN;
    s.onload  = resolve;
    s.onerror = () => reject(new Error('No se pudo cargar chess.js desde CDN. ¿Hay conexión?'));
    document.head.appendChild(s);
  });
}

function renderChess() {
  mainContainer.innerHTML = `<div style="display:grid;place-items:center;min-height:240px;gap:16px"><div class="loader"></div><p style="font-family:var(--f-mono);font-size:.8rem;color:var(--c-green)">Cargando ajedrez…</p></div>`;
  _loadChessJs()
    .then(() => {
      if (!_chess) { _chess = new Chess(); }
      _selSq    = null;
      _legalSqs = [];
      _drawChess();
    })
    .catch(err => {
      mainContainer.innerHTML = `<section class="panel-card" style="text-align:center;padding:24px"><p style="color:var(--c-red);font-family:var(--f-mono);font-size:.82rem">${escapeHtml(err.message)}</p><button class="btn btn-outline" style="margin-top:14px" data-action="render-view" data-view="game">← Volver a Game</button></section>`;
    });
}

function _statusInfo() {
  if (_chess.in_checkmate()) return { msg: `Jaque mate — ganan ${_chess.turn() === 'w' ? '♛ Negras' : '♕ Blancas'}`, over: true,  check: false };
  if (_chess.in_stalemate()) return { msg: 'Tablas por ahogado',                                                     over: true,  check: false };
  if (_chess.in_draw())      return { msg: 'Tablas',                                                                  over: true,  check: false };
  if (_chess.in_check())     return { msg: _chess.turn() === 'w' ? '¡Jaque a Blancas!' : '¡Jaque a Negras!',         over: false, check: true  };
  return { msg: _chess.turn() === 'w' ? '⬜ Turno: Blancas' : '⬛ Turno: Negras',                                   over: false, check: false };
}

function _drawChess() {
  const status = _statusInfo();

  // Build board HTML (rank 8 → rank 1, file a→h per row = white-perspective)
  let cells = '';
  for (const rank of _RANKS) {
    for (let fi = 0; fi < 8; fi++) {
      const sq    = _FILES[fi] + rank;
      const piece = _chess.get(sq);
      const dark  = (fi + rank) % 2 !== 0;    // a1 is dark ✓
      const sel   = _selSq === sq;
      const tgt   = _legalSqs.includes(sq);
      const glyph = piece ? _PIECES[piece.color + piece.type] : '';
      const dot   = (tgt && !piece) ? '<span class="chess-dot" aria-hidden="true"></span>' : '';
      cells += `<div class="chess-cell${dark?' chess-cell--dark':' chess-cell--light'}${sel?' chess-cell--sel':''}${tgt?' chess-cell--tgt':''}" data-action="chess-click" data-sq="${sq}" aria-label="${sq}${piece?' '+glyph:''}">${glyph}${dot}</div>`;
    }
  }

  const turnLabel   = status.over  ? status.msg : (status.check ? `${_chess.turn()==='w'?'⬜ Blancas':'⬛ Negras'}` : status.msg);
  const checkBadge  = status.check ? `<span class="chess-check">${escapeHtml(status.msg)}</span>` : '';
  const overBadge   = status.over  ? `<span class="chess-gameover">${escapeHtml(status.msg)}</span>` : '';

  mainContainer.innerHTML = `
    <div class="chess-shell">
      <div class="chess-bar">
        <button class="btn btn-outline chess-back-btn" data-action="render-view" data-view="game">← Game</button>
        <div class="chess-info">
          <span class="chess-turn${status.over?' chess-turn--over':''}">${escapeHtml(turnLabel)}</span>
          ${checkBadge}${overBadge}
        </div>
        <button class="btn btn-outline chess-new-btn" data-action="chess-new-game">Nueva partida</button>
      </div>
      <div class="chess-board" role="grid" aria-label="Tablero de ajedrez">${cells}</div>
      <p class="chess-hint">Toca una pieza → resalta movimientos → toca destino · Coronación auto → ♕</p>
    </div>
    <div class="bottom-spacer"></div>`;
}

function _chessClick(sq) {
  if (!_chess || _chess.game_over()) return;
  const piece = _chess.get(sq);

  // If clicked on a legal target → move
  if (_selSq && _legalSqs.includes(sq)) {
    _chess.move({ from: _selSq, to: sq, promotion: 'q' });
    _selSq    = null;
    _legalSqs = [];
    _drawChess();
    return;
  }

  // Select own piece
  if (piece && piece.color === _chess.turn()) {
    _selSq    = sq;
    _legalSqs = _chess.moves({ square: sq, verbose: true }).map(m => m.to);
    _drawChess();
    return;
  }

  // Deselect
  _selSq    = null;
  _legalSqs = [];
  _drawChess();
}

function _chessNewGame() {
  _chess    = new Chess();
  _selSq    = null;
  _legalSqs = [];
  _drawChess();
}
