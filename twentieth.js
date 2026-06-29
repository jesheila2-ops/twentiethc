/* ============================================================
   matthew.js
   ============================================================ */

/* ---- PASSCODE ------------------------------------------------
   Change PASSCODE to your 4-character code.
   Allowed characters: 0-9, *, #
   ------------------------------------------------------------ */
const PASSCODE = '0628';
let entered = '';

document.querySelectorAll('.key').forEach(key => {
  key.addEventListener('click', () => {
    if (entered.length >= 4) return;
    entered += key.dataset.k;
    updateDots();
    if (entered.length === 4) setTimeout(checkPass, 120);
  });
});

function updateDots() {
  for (let i = 0; i < 4; i++) {
    document.getElementById('d' + i).classList.toggle('filled', i < entered.length);
  }
}

function checkPass() {
  if (entered === PASSCODE) {
    document.getElementById('err-msg').textContent = '';
    // Play background music
    const music = document.getElementById('bg-music');
    music.volume = 0.4; // 0.0 to 1.0
    music.play();
    showSection('page-hub');
  } else {
    document.getElementById('err-msg').textContent = 'Wrong passcode. Try again.';
    entered = '';
    setTimeout(updateDots, 100);
  }
}

/* ---- SECTION NAVIGATION ------------------------------------- */
function showSection(id) {
  document.querySelectorAll('.section').forEach(s => {
    s.classList.remove('active', 'fade-in');
  });
  const el = document.getElementById(id);
  el.classList.add('active', 'fade-in');
}

function goHub()      { showSection('page-hub'); }
function openLetter() { showSection('page-letter'); }

function openYT() {
  window.open('https://www.youtube.com/watch?v=2KBffqrAAc4', '_blank');
}

/* ---- ENVELOPE click → letter -------------------------------- */
document.querySelector('.env-bg').addEventListener('click', openLetter);

/* ---- YOUTUBE IFrame API ------------------------------------- */
(function loadYTApi() {
  const tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  document.head.appendChild(tag);
})();

window.onYouTubeIframeAPIReady = function () {
  try {
    const player = new YT.Player('yt-player', {
      height: '200',
      width: '360',
      /* ---- Change videoId if needed ---- */
      videoId: '2KBffqrAAc4',
      playerVars: { rel: 0, modestbranding: 1 },
      events: {
        onReady: function () {
          document.getElementById('yt-fallback').style.display = 'none';
          document.getElementById('yt-player').style.display  = 'block';
        },
        onError: function () {
          document.getElementById('yt-player').style.display  = 'none';
          document.getElementById('yt-fallback').style.display = 'flex';
        }
      }
    });
  } catch (e) {
    /* fallback button stays visible */
  }
};