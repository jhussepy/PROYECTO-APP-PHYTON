/* avatar3d — tilt interactivo, ~20 líneas funcionales, sin librerías */
function initAvatar3DTilt() {
  const container = document.getElementById('main-container');
  if (!container) return;

  let activeScene = null;
  let targetRx = 0, targetRy = 0;
  let currentRx = 0, currentRy = 0;
  let rafId = null;

  function loop() {
    currentRx += (targetRx - currentRx) * 0.13;
    currentRy += (targetRy - currentRy) * 0.13;
    if (activeScene) {
      activeScene.style.transform = `rotateX(${currentRx.toFixed(2)}deg) rotateY(${currentRy.toFixed(2)}deg)`;
    }
    rafId = requestAnimationFrame(loop);
  }

  function applyTilt(el, clientX, clientY) {
    const scene = el.querySelector('.avatar3d-scene');
    if (!scene) return;
    if (scene !== activeScene) {
      if (activeScene) releaseScene(activeScene);
      activeScene = scene;
      scene.classList.add('is-tilting');
      rafId = requestAnimationFrame(loop);
    }
    const r = el.getBoundingClientRect();
    targetRy =  ((clientX - (r.left + r.width  / 2)) / (r.width  / 2)) * 18;
    targetRx = -((clientY - (r.top  + r.height / 2)) / (r.height / 2)) * 18;
  }

  function releaseScene(scene) {
    if (!scene) return;
    scene.classList.remove('is-tilting');
    scene.style.transform = '';
    targetRx = 0; targetRy = 0; currentRx = 0; currentRy = 0;
    cancelAnimationFrame(rafId); rafId = null;
    activeScene = null;
  }

  container.addEventListener('mousemove', function(e) {
    const av = e.target.closest('.avatar3d');
    if (av) { applyTilt(av, e.clientX, e.clientY); return; }
    if (activeScene) releaseScene(activeScene);
  });

  container.addEventListener('mouseleave', function() {
    if (activeScene) releaseScene(activeScene);
  });

  container.addEventListener('touchmove', function(e) {
    const t = e.touches[0];
    const av = document.elementFromPoint(t.clientX, t.clientY);
    const el = av && av.closest('.avatar3d');
    if (el) { e.preventDefault(); applyTilt(el, t.clientX, t.clientY); }
  }, { passive: false });

  container.addEventListener('touchend', function() {
    if (activeScene) releaseScene(activeScene);
  });
}
