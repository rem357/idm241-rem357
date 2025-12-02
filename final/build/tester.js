/* =========================================
   CONTROL CENTER
========================================= */
const ccContainer = document.querySelector('.cc-simple');
const ccTrigger = document.getElementById('cc-trigger');

if (ccContainer && ccTrigger) {
  const ccPanel = ccContainer.querySelector('.cc-panel');
  let isOpen = false;

  function openControlCenter() {
    isOpen = true;
    ccContainer.classList.add('trigger-open');
    ccTrigger.setAttribute('aria-expanded', 'true');

    setTimeout(() => {
      if (!isOpen || !ccPanel) return;
      ccContainer.classList.add('is-open');
      ccPanel.setAttribute('aria-hidden', 'false');
    }, 120);
  }

  function closeControlCenter() {
    if (!ccPanel) return;

    ccContainer.classList.remove('is-open');
    ccPanel.setAttribute('aria-hidden', 'true');

    const onTransitionEnd = () => {
      ccPanel.removeEventListener('transitionend', onTransitionEnd);
      if (!isOpen) {
        ccContainer.classList.remove('trigger-open');
        ccTrigger.setAttribute('aria-expanded', 'false');
      }
    };

    ccPanel.addEventListener('transitionend', onTransitionEnd);
    isOpen = false;
  }

  function toggleControlCenter() {
    if (!isOpen) {
      openControlCenter();
    } else {
      closeControlCenter();
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


/* =========================================
   APPEARANCE (LIGHT / DARK)
========================================= */
const appearanceBtn = document.getElementById('appearance');

if (appearanceBtn) {
  let isDark = false;

  function renderAppearance() {
    appearanceBtn.classList.toggle('dark', isDark);
    appearanceBtn.setAttribute('aria-pressed', String(isDark));
  }

  function toggleAppearance() {
    isDark = !isDark;
    renderAppearance();
  }

  renderAppearance();

  appearanceBtn.addEventListener('click', toggleAppearance);
  appearanceBtn.addEventListener('keydown', (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      toggleAppearance();
    }
  });
}


/* =========================================
   LOW POWER MODE
========================================= */
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


/* =========================================
   RINGER
========================================= */
const ringerBtn = document.getElementById('ringer');

if (ringerBtn) {
  const bell = ringerBtn.querySelector('.bell');
  let isOff = false;

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

  renderRinger();

  ringerBtn.addEventListener('click', toggleRinger);
  ringerBtn.addEventListener('keydown', (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      toggleRinger();
    }
  });
}


/* =========================================
   SCREEN ORIENTATION LOCK
========================================= */
const orientationBtn = document.getElementById('orientation');

if (orientationBtn) {
  let locked = false;

  function renderOrientation() {
    orientationBtn.classList.toggle('locked', locked);
    orientationBtn.setAttribute('aria-pressed', String(locked));
  }

  function toggleOrientation() {
    orientationBtn.classList.remove('anim-lock', 'anim-unlock');

    locked = !locked;
    const justLocked = locked;
    renderOrientation();

    void orientationBtn.offsetWidth;

    if (justLocked) {
      orientationBtn.classList.add('anim-lock');
    } else {
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
