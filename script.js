// ============================================================
//  SCRIPT.JS — Do You Love Me?
// ============================================================

/* ── Floating hearts background ── */
(function spawnHearts() {
  const HEARTS = ['❤️','💕','💖','💗','💓','🌸','✨'];
  const wrap   = document.querySelector('.hearts-bg');
  if (!wrap) return;

  for (let i = 0; i < 18; i++) {
    const el = document.createElement('span');
    el.className = 'heart-particle';
    el.textContent = HEARTS[Math.floor(Math.random() * HEARTS.length)];
    el.style.left            = Math.random() * 100 + 'vw';
    el.style.fontSize        = (1 + Math.random() * 1.4) + 'rem';
    el.style.animationDelay  = (Math.random() * 8) + 's';
    el.style.animationDuration = (6 + Math.random() * 8) + 's';
    wrap.appendChild(el);
  }
})();


/* ── NO button — runs away from the cursor ── */
(function setupNoButton() {
  const btn    = document.getElementById('btn-no');
  if (!btn) return;

  const MARGIN = 20; // px from viewport edges

  /** Place the button at a random position within the viewport */
  function moveRandom() {
    const vw = window.innerWidth  - btn.offsetWidth  - MARGIN * 2;
    const vh = window.innerHeight - btn.offsetHeight - MARGIN * 2;
    btn.style.left = (MARGIN + Math.random() * vw) + 'px';
    btn.style.top  = (MARGIN + Math.random() * vh) + 'px';
    btn.style.right  = 'auto';
    btn.style.bottom = 'auto';
    btn.style.transition = 'left .25s ease, top .25s ease';
  }

  // Initial position — near bottom-centre (friendly looking start)
  function setInitial() {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    btn.style.left = (vw / 2 + 60) + 'px';
    btn.style.top  = (vh * 0.72) + 'px';
  }
  setInitial();

  /** How close (px) the cursor can get before the button flees */
  const FLEE_DISTANCE = 90;

  document.addEventListener('mousemove', function(e) {
    const rect     = btn.getBoundingClientRect();
    const cx       = rect.left + rect.width  / 2;
    const cy       = rect.top  + rect.height / 2;
    const dx       = e.clientX - cx;
    const dy       = e.clientY - cy;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < FLEE_DISTANCE) {
      moveRandom();
    }
  });

  // Fallback: also move on click / touchstart so mobile users can't trap it
  btn.addEventListener('click',      moveRandom);
  btn.addEventListener('touchstart', moveRandom, { passive: true });

  window.addEventListener('resize', setInitial);
})();


/* ── Switch to YES page ── */
function showYesPage() {
  document.getElementById('page-main').classList.remove('active');
  const yesPage = document.getElementById('page-yes');
  yesPage.classList.add('active');
  launchConfetti();
}

/* ── Go back ── */
function goBack() {
  document.getElementById('page-yes').classList.remove('active');
  document.getElementById('page-main').classList.add('active');
  // Clear confetti pieces
  document.getElementById('confetti-wrap').innerHTML = '';
}


/* ── Confetti burst ── */
function launchConfetti() {
  const wrap   = document.getElementById('confetti-wrap');
  const COLORS = ['#E8587A','#F7A8BB','#FFD700','#FF69B4','#B0E0E6','#98FB98','#FFA07A'];
  const COUNT  = 80;

  for (let i = 0; i < COUNT; i++) {
    const el = document.createElement('div');
    el.className = 'confetti-piece';
    el.style.left            = (Math.random() * 100) + 'vw';
    el.style.background      = COLORS[Math.floor(Math.random() * COLORS.length)];
    el.style.width           = (6 + Math.random() * 10) + 'px';
    el.style.height          = (10 + Math.random() * 16) + 'px';
    el.style.borderRadius    = Math.random() > .5 ? '50%' : '3px';
    el.style.animationDelay  = (Math.random() * 1.5) + 's';
    el.style.animationDuration = (2 + Math.random() * 3) + 's';
    wrap.appendChild(el);
  }

  // Clean up after animation
  setTimeout(() => { wrap.innerHTML = ''; }, 5500);
}
