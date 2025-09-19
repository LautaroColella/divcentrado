// --- card giratoria ---
document.querySelectorAll(".flip-card").forEach(card => {
  card.addEventListener("click", () => {
    card.classList.toggle("flipped");
  });
});


const frases = [
  "Lo importante es aprender cosas nuevas",
  "Trabajar en equipo siempre suma"  
];

let index = 0;
function cambiarFrase() {
  document.getElementById("frase").textContent = frases[index];
  index = (index + 1) % frases.length;
}
setInterval(cambiarFrase, 3000);
cambiarFrase();
