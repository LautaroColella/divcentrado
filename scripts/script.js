console.log("works");

// Scripts para la segunda slide
let iconTooltips = [];
let tooltipTimeouts = [];

const propositoCircle = document.getElementById("circle-proposito");
const propositoCircleFront = propositoCircle.querySelector(".circle-front");
const propositoCircleBack = propositoCircle.querySelector(".circle-back");
const valoresCircle = document.getElementById("circle-valores");
const metodoCircle = document.getElementById("circle-metodo");
const metodoCircleFront = metodoCircle.querySelector(".circle-front");
const metodoCircleBack = metodoCircle.querySelector(".circle-back");

let metodoCircleFlipped = false;
let metodoCircleAnimating = false;
let propositoCircleFlipped = false;
let propositoCircleAnimating = false;
const PROPOSITO_CIRCLE_DURATION = 600;

propositoCircle.addEventListener("click", (e) => {
  if (propositoCircleAnimating) return; // Ignorar clicks durante la animacion
  propositoCircleAnimating = true;

  // Se agarra el x e y del mouse en referencia al circulo
  const rect = propositoCircle.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  // Se normaliza el axis del vector en la direccion opuesta del click
  const cx = rect.width / 2;
  const cy = rect.height / 2;

  const dx = x - cx;
  const dy = y - cy;
  const len = Math.sqrt(dx * dx + dy * dy) || 1;

  // El axis apunta a la direccion opuesta del click (Para dar efecto "peel away")
  const axisX = -dy / len;
  const axisY = dx / len;
  const axisZ = 0;

  // Se reinicia el transform para este axis sin transicion
  propositoCircleFront.style.transition = "none";
  propositoCircleBack.style.transition = "none";

  if (!propositoCircleFlipped) {
    // Front visible ---> back oculto: empieza en front=0 y back=180 (para este axis)
    propositoCircleFront.style.transform = `rotate3d(${axisX}, ${axisY}, ${axisZ}, 0deg)`;
    propositoCircleBack.style.transform = `rotate3d(${axisX}, ${axisY}, ${axisZ}, 180deg)`;
  } else {
    // Back visible ---> front oculto: empieza en front=180 y back=0 (para este axis)
    propositoCircleFront.style.transform = `rotate3d(${axisX}, ${axisY}, ${axisZ}, 180deg)`;
    propositoCircleBack.style.transform = `rotate3d(${axisX}, ${axisY}, ${axisZ}, 0deg)`;
  }

  // Es obligatorio forzar el reflow para que los browsers apliquen el estilo no-transition de inicio
  // Leer offsetHeight es la mejor opcion para triggerear el reflow en mi opinion
  void propositoCircleFront.offsetHeight;

  // Se restauran las transiciones explicitamente despues del reflow
  propositoCircleFront.style.transition = `transform ${PROPOSITO_CIRCLE_DURATION}ms ease`;
  propositoCircleBack.style.transition = `transform ${PROPOSITO_CIRCLE_DURATION}ms ease`;

  if (!propositoCircleFlipped) {
    // Animate to: front ---> 180 y back ---> 0 (muestra el back)
    propositoCircleFront.style.transform = `rotate3d(${axisX}, ${axisY}, ${axisZ}, 180deg)`;
    propositoCircleBack.style.transform = `rotate3d(${axisX}, ${axisY}, ${axisZ}, 0deg)`;
  } else {
    // Animate to: front ---> 0 y back ---> -180 (vuelve al front)
    propositoCircleFront.style.transform = `rotate3d(${axisX}, ${axisY}, ${axisZ}, 0deg)`;
    propositoCircleBack.style.transform = `rotate3d(${axisX}, ${axisY}, ${axisZ}, -180deg)`;
  }

  // Se resetea cuando termina la animacion
  setTimeout(() => {
    propositoCircleFlipped = !propositoCircleFlipped;
    propositoCircleAnimating = false;
  }, PROPOSITO_CIRCLE_DURATION);
});

// Esto es importante para que el tooltip de bootstrap funcione cuando los usuarios apretan los botones en mobile
// Por default bootstrap no se encarga de esto, me rompi la cabeza porque tenemos un caso particular:
// los botones estan ocultos hasta que se muestran con el ripple effect, y bootstrap tampoco
// contempla los tooltips de los elementos ocultos
const backIcons = valoresCircle.querySelectorAll(".circle-back i");
backIcons.forEach((icon, index) => {
  icon.addEventListener("click", (e) => {
    e.stopPropagation();

    // Se limpian los timeouts del array y se reinicia
    tooltipTimeouts.forEach(clearTimeout);
    tooltipTimeouts = [];

    // Si existe el elemento del icono (display != none) muestra el tooltip por 3 segundos
    if (iconTooltips[index]?._element) {
      iconTooltips[index].show();

      const t = setTimeout(() => {
        if (iconTooltips[index]?._element) iconTooltips[index].hide();
      }, 3000);
      tooltipTimeouts.push(t);
    }
  });
});

valoresCircle.addEventListener("click", (e) => {
  if (e.target.closest(".circle-back i")) return; // Ignorar si se clickea un boton

  // Se agarra el x e y del mouse en referencia al circulo
  const rect = valoresCircle.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  // Se setean las posiciones de inicio del ripple effect
  valoresCircle.style.setProperty("--ripple-x", `${x}px`);
  valoresCircle.style.setProperty("--ripple-y", `${y}px`);

  valoresCircle.classList.add("ripple-out");

  setTimeout(() => {
    valoresCircle.classList.remove("ripple-out");

    const front = valoresCircle.querySelector(".circle-front");

    if (!valoresCircle.classList.contains("active")) {
      // Se muestran los iconos
      valoresCircle.classList.add("active", "show-icons");
      front.style.display = "none";

      // Se reinician los tooltips guardados en el array
      backIcons.forEach((icon, index) => {
        if (iconTooltips[index]?.dispose) iconTooltips[index].dispose();

        iconTooltips[index] = new bootstrap.Tooltip(icon, { trigger: "hover" });
      });
    } else {
      // Se vacia el array de los tooltips para que no quede un tooltip flotando
      // mientras se hace la animacion de volver al front
      tooltipTimeouts.forEach(clearTimeout);
      tooltipTimeouts = [];

      iconTooltips.forEach((tooltip) => {
        if (tooltip?._element) {
          tooltip.hide();
          tooltip.dispose();
        }
      });
      iconTooltips = [];

      // Se ocultan los iconos
      valoresCircle.classList.remove("active", "show-icons");
      front.style.display = "flex";
    }

    valoresCircle.classList.add("ripple-in");
    setTimeout(() => valoresCircle.classList.remove("ripple-in"), 300);
  }, 300);
});

metodoCircle.addEventListener("click", (e) => {
  if (metodoCircleAnimating) return; // Ignorar clicks durante la animacion
  metodoCircleAnimating = true;

  // Se agarra el x e y del mouse en referencia al circulo
  const rect = metodoCircle.getBoundingClientRect();
  const clickX = e.clientX - rect.left - rect.width / 2;
  const clickY = e.clientY - rect.top - rect.height / 2;

  // Se hace pequeño hacia donde se clickeo
  metodoCircle.style.transition = "transform 0.3s ease";
  metodoCircle.style.transformOrigin = `${50 + (clickX / rect.width) * 100}% ${
    50 + (clickY / rect.height) * 100
  }%`;
  metodoCircle.style.transform = "scale(0.01)";

  setTimeout(() => {
    // Mostrar el front o back
    if (!metodoCircleFlipped) {
      metodoCircleFront.style.opacity = 0;
      metodoCircleBack.style.opacity = 1;
    } else {
      metodoCircleFront.style.opacity = 1;
      metodoCircleBack.style.opacity = 0;
    }
    metodoCircleFlipped = !metodoCircleFlipped;

    // Se expande desde donde se clickeo
    metodoCircle.style.transition = "transform 0.3s ease";
    metodoCircle.style.transform = "scale(1)";

    setTimeout(() => {
      metodoCircleAnimating = false;
    }, 300);
  }, 300);
});

// Cambiar el cursor en hover de los circulos por el circulito de color
function attachCursorDot(circle) {
  const cursorDot = document.createElement("div");
  cursorDot.classList.add("cursor-dot");
  circle.appendChild(cursorDot);

  circle.addEventListener("mousemove", (e) => {
    // Si hay iconos mostrar el cursor normal
    if (circle.id === "circle-valores" && e.target.closest(".circle-back i")) {
      cursorDot.style.opacity = 0;
      return;
    }

    // Se agarra el x e y del mouse en referencia al circulo
    const rect = circle.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    cursorDot.style.left = `${x - 5}px`;
    cursorDot.style.top = `${y - 5}px`;
    cursorDot.style.opacity = 1;
  });

  circle.addEventListener("mouseleave", () => {
    cursorDot.style.opacity = 0;
  });
}

function isTouchDevice() {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}

if (!isTouchDevice()) {
  attachCursorDot(valoresCircle);
  attachCursorDot(propositoCircle);
  attachCursorDot(metodoCircle);
}
