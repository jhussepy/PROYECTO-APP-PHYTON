/* game-hub.js — Hub de juegos PySec. Añadir un juego = añadir un objeto al array. */

const GAMES = [
  { id: 'chess',          name: 'Ajedrez',         icon: '♟',  desc: 'Partida completa: dos jugadores, reglas oficiales.',                      status: 'ready' },
  { id: 'ctf-lite',       name: 'CTF Lite',         icon: '🚩', desc: 'Captura la flag resolviendo retos de código.',                            status: 'soon'  },
  { id: 'bug-hunter',     name: 'Bug Hunter',       icon: '🐛', desc: 'Encuentra y corrige bugs en fragmentos de Python real.',                  status: 'soon'  },
  { id: 'regex-duel',     name: 'Regex Duel',       icon: '⚔️', desc: 'Construye la regex más precisa en el menor tiempo.',                      status: 'soon'  },
  { id: 'reto-diario',    name: 'Reto Diario',      icon: '📅', desc: 'Un desafío nuevo cada día, calibrado a tu nivel.',                        status: 'soon'  },
  { id: 'quiz-battle',    name: 'Quiz Battle',      icon: '⚡', desc: 'Rondas de preguntas contra el reloj.',                                    status: 'soon'  },
  { id: 'memory',         name: 'Memory',           icon: '🧠', desc: 'Empareja conceptos de Python y ciberseguridad.',                          status: 'soon'  },
  { id: 'speed-typing',   name: 'Speed Typing',     icon: '⌨️', desc: 'Teclea código real a máxima velocidad.',                                  status: 'soon'  },
  { id: 'logic-maze',     name: 'Logic Maze',       icon: '🌀', desc: 'Laberinto de lógica booleana y operadores.',                              status: 'soon'  },
  { id: 'threat-defense', name: 'Threat Defense',   icon: '🛡️', desc: 'Defiende tu servidor de oleadas de amenazas simuladas.',                 status: 'soon'  },
  { id: 'code-golf',      name: 'Code Golf',        icon: '⛳', desc: 'Resuelve problemas con el menor número de caracteres posible.',            status: 'soon'  }
];

function renderGameHub() {
  const cards = GAMES.map(g => {
    const ready = g.status === 'ready';
    const attrs = ready
      ? `data-action="render-view" data-view="${escapeHtml(g.id)}" tabindex="0" role="button"`
      : `tabindex="-1" role="article"`;
    return `<div class="game-card ${ready ? 'game-card--ready' : 'game-card--soon'}" ${attrs} aria-label="${escapeHtml(g.name)}${ready ? '' : ' — próximamente'}">
      <div class="game-card-icon" aria-hidden="true">${g.icon}</div>
      <div class="game-card-body">
        <strong class="game-card-name">${escapeHtml(g.name)}</strong>
        <p class="game-card-desc">${escapeHtml(g.desc)}</p>
      </div>
      ${ready ? '' : '<span class="game-soon-badge" aria-hidden="true">PRÓXIMAMENTE 🔒</span>'}
    </div>`;
  }).join('');

  mainContainer.innerHTML = `
    <section class="panel-card animated-card">
      <span class="eyebrow">ARCADE CYBER</span>
      <h1>Game Hub</h1>
      <p class="hero-subtitle">Entrena habilidades técnicas jugando. ${GAMES.filter(g => g.status === 'soon').length} juegos más en camino.</p>
    </section>
    <div class="game-grid">${cards}</div>
    <div class="bottom-spacer"></div>`;
}
