/* ========== SIMPLE CONTROL CENTER (circle → pill + dropdown panel) ========== */
const ccContainer = document.querySelector('.cc-simple');
const ccTrigger   = document.getElementById('cc-trigger');

if (ccContainer && ccTrigger) {
  const ccPanel = ccContainer.querySelector('.cc-panel');

  function toggleControlCenter() {
    const isOpen = ccContainer.classList.toggle('is-open');
    ccTrigger.setAttribute('aria-expanded', String(isOpen));
    if (ccPanel) {
      ccPanel.setAttribute('aria-hidden', String(!isOpen));
    }
  }

  ccTrigger.addEventListener('click', toggleControlCenter);

  ccTrigger.addEventListener('keydown', (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      toggleControlCenter();
    }
  });
}



/* ========== APPEARANCE (sun ↔ crescent) ========== */
const appearanceBtn = document.getElementById('appearance');
let isDark = false;

function renderAppearance() {
  appearanceBtn.classList.toggle('dark', isDark);
  appearanceBtn.setAttribute('aria-pressed', String(isDark));
}

function toggleAppearance() {
  isDark = !isDark;
  renderAppearance();
}

if (appearanceBtn) {
  renderAppearance();
  appearanceBtn.addEventListener('click', toggleAppearance);
  appearanceBtn.addEventListener('keydown', (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      toggleAppearance();
    }
  });
}

/* ========== LOW POWER MODE ========== */
const lpBtn = document.getElementById('low-power');

if (lpBtn) {
  let lpOn = false; 

  function renderLP() {
    lpBtn.classList.toggle('on', lpOn);
    lpBtn.setAttribute('aria-pressed', String(lpOn));
  }

  function toggleLP() {
    lpBtn.classList.remove('anim-on', 'anim-off', 'burst');

    lpOn = !lpOn;
    renderLP();

    if (lpOn) {

      lpBtn.classList.add('anim-on', 'burst');

      setTimeout(() => {
        lpBtn.classList.remove('burst');
      }, 650);
    } else {

      lpBtn.classList.add('anim-off');
    }

    setTimeout(() => {
      lpBtn.classList.remove('anim-on', 'anim-off');
    }, 420);
  }

  renderLP();

  lpBtn.addEventListener('click', toggleLP);
  lpBtn.addEventListener('keydown', (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      toggleLP();
    }
  });
}



// RINGER BUTTON
const ringerBtn = document.getElementById('ringer');

if (ringerBtn) {
  const bell = ringerBtn.querySelector('.bell');
  let isOff = false;

  // restart shake animation on SVG
  function shakeBell(delayMs = 0) {
    const run = () => {
      if (!bell) return;
      bell.classList.remove('shake');
      bell.getBoundingClientRect();
      bell.classList.add('shake');
    };
    delayMs ? setTimeout(run, delayMs) : run();
  }

  function renderRinger() {
    ringerBtn.classList.toggle('off', isOff);
    ringerBtn.setAttribute('aria-pressed', String(isOff));
  }

  function toggleRinger() {
    isOff = !isOff;
    renderRinger();
    shakeBell(50);
  }

  // initial
  renderRinger();

  ringerBtn.addEventListener('click', toggleRinger);
  ringerBtn.addEventListener('keydown', (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      toggleRinger();
    }
  });
}

/* ========== SCREEN ORIENTATION LOCK ========== */
const orientationBtn = document.getElementById('orientation');

if (orientationBtn) {
  // false = UNLOCKED (green/grey + white icons)
  // true  = LOCKED   (white + red icons)
  let locked = false; // start UNLOCKED if you want; change to true to start LOCKED

  function renderOrientation() {
    orientationBtn.classList.toggle('locked', locked);
    orientationBtn.setAttribute('aria-pressed', String(locked));
  }

  function toggleOrientation() {
    orientationBtn.classList.remove('anim-lock', 'anim-unlock');

    locked = !locked;
    const justLocked = locked; // true if we *ended* in locked state
    renderOrientation();

    void orientationBtn.offsetWidth; // restart animations

    if (justLocked) {
      // UNLOCKED → LOCKED (tilt + bounce)
      orientationBtn.classList.add('anim-lock');
    } else {
      // LOCKED → UNLOCKED (full spin)
      orientationBtn.classList.add('anim-unlock');
    }

    setTimeout(() => {
      orientationBtn.classList.remove('anim-lock', 'anim-unlock');
    }, 650);
  }

  renderOrientation();

  orientationBtn.addEventListener('click', toggleOrientation);
  orientationBtn.addEventListener('keydown', (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      toggleOrientation();
    }
  });
}
