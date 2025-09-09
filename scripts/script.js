console.log("works");

// Script para la segunda slide
const propositoCircle = document.getElementById("circle-proposito");
const valoresCircle = document.getElementById("circle-valores");

propositoCircle.addEventListener("click", () => {
  propositoCircle.classList.toggle("active");
});
valoresCircle.addEventListener("click", (e) => {
  const rect = valoresCircle.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  valoresCircle.style.setProperty("--ripple-x", `${x}px`);
  valoresCircle.style.setProperty("--ripple-y", `${y}px`);

  valoresCircle.classList.add("ripple");

  if (!valoresCircle.classList.contains("active")) {
    valoresCircle.classList.add("hide-front");
    setTimeout(() => {
      valoresCircle.classList.add("active", "show-icons");
    }, 550);
  } else {
    valoresCircle.classList.remove("show-icons");
    setTimeout(() => {
      valoresCircle.classList.remove("active");
      valoresCircle.classList.remove("hide-front");
    }, 850);
  }

  setTimeout(() => {
    valoresCircle.classList.remove("ripple");
  }, 1000);
});
