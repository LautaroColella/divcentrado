// ======================
// Fondo de la tarjeta
// ======================
const btn = document.getElementById("btn-color");
const card = document.querySelector(".card");

const IMAGES = [
  "img/fondoTarjetaAlvarez1.jpg",
  "img/fondoTarjetaAlvarez2.jpg",
  "img/fondoTarjetaAlvarez3.jpg",
  "img/fondoTarjetaAlvarez4.jpg",
  "img/fondoTarjetaAlvarez5.jpg",
  "img/fondoTarjetaAlvarez6.jpg",
  "img/fondoTarjetaAlvarez7.jpg",
  "img/fondoTarjetaAlvarez8.jpg",
  "img/fondoTarjetaAlvarez9.jpg"
];

let index = 0;

// pinta la primera imagen al cargar (opcional)
if (card && IMAGES.length) {
  card.style.background = `url("${IMAGES[index]}") center / cover no-repeat`;
}

btn?.addEventListener("click", () => {
  if (!card) return;
  index = (index + 1) % IMAGES.length;
  // shorthand asegura cover/center/no-repeat en una sola línea
  card.style.background = `url("${IMAGES[index]}") center / cover no-repeat`;
});

// ======================
// Foto de Perfil
// ======================
const btnAvatar = document.getElementById("btn-avatar");
const avatarImg = document.getElementById("avatar");

// Lista de fotos disponibles
const AVATARS = [
  "img/imgAlvarezPerfil2.jpeg",
  "img/imgAlvarezPerfil1.jpeg",
  "img/imgAlvarezPerfil.jpeg"
];

let avatarIndex = 0;

// Función para cambiar la foto
function changeAvatar() {
  avatarImg.classList.add("fade-out");
  setTimeout(() => {
    avatarIndex = (avatarIndex + 1) % AVATARS.length;
    avatarImg.src = AVATARS[avatarIndex];
    avatarImg.classList.remove("fade-out");
  }, 400); // el mismo tiempo que la transición en CSS
}

// Evento al hacer click
btnAvatar.addEventListener("click", changeAvatar);


// ======================
// Audio + artistas
// ======================
const btnMusic      = document.getElementById('btn-music');
const btnPlayPause  = document.getElementById("btn-playpause");
const labelPlayPause = btnPlayPause ? btnPlayPause.querySelector("span") : null;

const player = document.getElementById('player');
const list   = document.getElementById('artist-list');
const items  = list ? Array.from(list.querySelectorAll('li')) : [];

const TRACKS = [
  { name: 'Miranda',    src: 'audio/music1.mp3' },
  { name: 'Katy Perry', src: 'audio/music2.mp3' },
  { name: 'Dua Lipa',   src: 'audio/music3.mp3' },
  { name: 'Queen',   src: 'audio/music4.mp3' },
  { name: 'Coldplay',      src: 'audio/music5.mp3' },
];

let idx = 0;
let isPlaying = false;

function highlight(i){
  if (!items.length) return; // por si no existe la lista en el HTML
  items.forEach(li => li.classList.remove('is-current'));
  const current = items.find(li => Number(li.dataset.idx) === i);
  if (current) current.classList.add('is-current');
}

function loadAndPlay(i){
  const track = TRACKS[i];
  if (!track || !player) return;

  player.src = track.src;
  player.currentTime = 0;
  player.play().then(() => {
    isPlaying = true;
    if (labelPlayPause) labelPlayPause.textContent = "Pausa"; // ⬅️ cambia SOLO el span
  }).catch(()=>{ /* el navegador puede bloquear hasta que haya interacción */ });

  highlight(i);
}

function nextTrack(){
  idx = (idx + 1) % TRACKS.length;
  loadAndPlay(idx);
}

// Botón "Cambiar música"
btnMusic?.addEventListener('click', () => {
  nextTrack();
});

// Botón "Pausa / Reanudar"
btnPlayPause?.addEventListener("click", () => {
  if (!player) return;

  if (isPlaying) {
    player.pause();
    isPlaying = false;
    if (labelPlayPause) labelPlayPause.textContent = "Reanudar";
  } else {
    player.play().then(() => {
      isPlaying = true;
      if (labelPlayPause) labelPlayPause.textContent = "Pausa";
    }).catch(()=>{});
  }
});

// Al terminar pasa al siguiente
player?.addEventListener('ended', nextTrack);

// Estado inicial
highlight(idx);



