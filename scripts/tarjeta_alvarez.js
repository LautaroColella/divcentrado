
// ========= Fondo de la tarjeta =========
const btnColor = document.getElementById("btn-color");
const card = document.querySelector(".card");

const IMAGES = [
  "img/fondoTarjetaAlvarez1.jpg",
  "img/fondoTarjetaAlvarez2.jpg",
  "img/fondoTarjetaAlvarez3.jpg",
  "img/fondoTarjetaAlvarez4.jpg",
  "img/fondoTarjetaAlvarez5.jpg",
  "img/fondoTarjetaAlvarez6.jpg"
];

let bgIndex = 0;

// pinta la primera al cargar
if (card && IMAGES.length){
  card.style.background = `url("${IMAGES[bgIndex]}") center / cover no-repeat`;
}

btnColor?.addEventListener("click", () => {
  if (!card) return;
  bgIndex = (bgIndex + 1) % IMAGES.length;
  card.style.background = `url("${IMAGES[bgIndex]}") center / cover no-repeat`;
});

// ========= Cambiar foto del perfil =========
const btnAvatar = document.getElementById("btn-avatar");
const avatarImg = document.getElementById("avatar");

const AVATERS = [
  "img/imgAlvarezPerfil.png",
  "img/imgAlvarezPerfil1.png",
  "img/imgAlvarezPerfil2.jpeg"
];

let avatarIndex = 0;

function changeAvatar() {
  if (!avatarImg) return;
  avatarImg.classList.add("fade-out");
  setTimeout(() => {
    avatarIndex = (avatarIndex + 1) % AVATERS.length;
    avatarImg.src = AVATERS[avatarIndex];
    avatarImg.classList.remove("fade-out");
  }, 400);
}

btnAvatar?.addEventListener("click", changeAvatar);

// ========= Inicializar íconos de Lucide (si están en el HTML) =========
if (window.lucide?.createIcons) {
  window.lucide.createIcons();
}

const seleccionActual = document.getElementById("seleccion-actual");

// ===== Fondos por Artistas =====
const ARTISTS = [
  { name: "Miranda", bg: "img/fondoMiranda.jpg" },
  { name: "Katy Perry", bg: "img/fondoKaty.jpg" },
  { name: "Dua Lipa", bg: "img/fondoDua.jpg" },
  { name: "Coldplay", bg: "img/fondoColdplay.jpg" }
];
let artistIndex = 0;

document.getElementById("btn-artistas").addEventListener("click", () => {
  artistIndex = (artistIndex + 1) % ARTISTS.length;
  card.style.background = `url("${ARTISTS[artistIndex].bg}") center / cover no-repeat`;
  seleccionActual.textContent = `Artista: ${ARTISTS[artistIndex].name}`;
});

// ===== Fondos por Películas =====
const MOVIES = [
  { name: "El diablo viste a la moda", bg: "img/fondoPrada.jpg" },
  { name: "Orgullo y prejuicio", bg: "img/fondoPride.jpg" },
  { name: "El conjuro", bg: "img/fondoConjuro.jpg" },
  { name: "Avengers", bg: "img/fondoAvengers.jpg" }
];
let movieIndex = 0;

document.getElementById("btn-peliculas").addEventListener("click", () => {
  movieIndex = (movieIndex + 1) % MOVIES.length;
  card.style.background = `url("${MOVIES[movieIndex].bg}") center / cover no-repeat`;
  seleccionActual.textContent = `Película: ${MOVIES[movieIndex].name}`;
});

