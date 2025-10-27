const btn  = document.getElementById('ringer');
const bell = btn.querySelector('.bell');

let isOff = false; // start ON (no slash, white bell)

// reliably restart the shake animation on the SVG path
function shakeBell(delayMs = 0){
  const run = () => {
    bell.classList.remove('shake');
    // force reflow so the next add() restarts the CSS animation on SVG
    bell.getBoundingClientRect();
    bell.classList.add('shake');
  };
  delayMs ? setTimeout(run, delayMs) : run();
}

function render(){
  btn.classList.toggle('off', isOff);
  btn.setAttribute('aria-pressed', String(isOff));
}

function toggle(){
  isOff = !isOff;
  render();
  // one shake per click; slight delay makes it feel synced with the slash
  shakeBell(50);
}

// initial paint (no shake)
render();

btn.addEventListener('click', toggle);
btn.addEventListener('keydown', (e)=>{
  if (e.key === ' ' || e.key === 'Enter'){
    e.preventDefault();
    toggle();
  }
});
