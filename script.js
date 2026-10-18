const music = document.getElementById('ourSong');
const musicToggle = document.getElementById('musicToggle');
const musicLabel = document.getElementById('musicLabel');
const sparkleButton = document.getElementById('sparkleButton');
const loveButton = document.getElementById('loveButton');
const hiddenNote = document.getElementById('hiddenNote');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const closeLightbox = document.getElementById('closeLightbox');

function setMusicUI(isPlaying) {
  musicToggle.classList.toggle('playing', isPlaying);
  musicToggle.setAttribute('aria-pressed', String(isPlaying));
  musicLabel.textContent = isPlaying ? 'Pause our song' : 'Play our song';
}

// Browsers usually block audio autoplay until the visitor interacts with the page.
// This attempts autoplay, then the music button can always start it manually.
window.addEventListener('load', async () => {
  try {
    await music.play();
    setMusicUI(true);
  } catch {
    setMusicUI(false);
    musicLabel.textContent = 'Play our song';
  }
});

musicToggle.addEventListener('click', async () => {
  if (music.paused) {
    try {
      await music.play();
      setMusicUI(true);
    } catch {
      musicLabel.textContent = 'Add music.mp3';
      alert('Put your chosen song in this folder and name it music.mp3, then refresh the page.');
    }
  } else {
    music.pause();
    setMusicUI(false);
  }
});

function floatHearts(count = 14) {
  const symbols = ['♡', '♥', '✦', '✧'];
  for (let i = 0; i < count; i++) {
    const heart = document.createElement('span');
    heart.className = 'heart-float';
    heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    heart.style.left = `${8 + Math.random() * 84}%`;
    heart.style.top = `${55 + Math.random() * 35}%`;
    heart.style.fontSize = `${14 + Math.random() * 22}px`;
    heart.style.animationDelay = `${Math.random() * 0.7}s`;
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 3300);
  }
}

sparkleButton.addEventListener('click', () => {
  floatHearts(24);
  sparkleButton.textContent = 'A little magic, just for you ♡';
  setTimeout(() => sparkleButton.textContent = 'Send you a little magic ✦', 2200);
});

loveButton.addEventListener('click', () => {
  hiddenNote.classList.toggle('show');
  loveButton.textContent = hiddenNote.classList.contains('show') ? 'Hide my reminder ♡' : 'Tap for a reminder ♡';
  if (hiddenNote.classList.contains('show')) floatHearts(18);
});

document.querySelectorAll('.photo-card').forEach(card => {
  card.addEventListener('click', () => {
    const img = card.querySelector('img');
    if (!img || img.style.display === 'none' || !img.complete || img.naturalWidth === 0) {
      alert('Add your photo to the images folder using the filename shown on this card, then refresh.');
      return;
    }
    lightboxImage.src = img.src;
    lightbox.classList.add('open');
  });
});

function closePhoto() {
  lightbox.classList.remove('open');
  lightboxImage.src = '';
}
closeLightbox.addEventListener('click', closePhoto);
lightbox.addEventListener('click', event => {
  if (event.target === lightbox) closePhoto();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closePhoto();
});
