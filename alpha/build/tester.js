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
