console.log("works");

// Script para la segunda slide
let iconTooltips = [];
let tooltipTimeouts = [];

const propositoCircle = document.getElementById("circle-proposito");
const valoresCircle = document.getElementById("circle-valores");

propositoCircle.addEventListener("click", () => {
  propositoCircle.classList.toggle("active");
});

const backIcons = valoresCircle.querySelectorAll(".circle-back i");
backIcons.forEach((icon, index) => {
  icon.addEventListener("click", (e) => {
    e.stopPropagation();

    tooltipTimeouts.forEach(clearTimeout);
    tooltipTimeouts = [];

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
  if (e.target.closest(".circle-back i")) return;

  const rect = valoresCircle.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  valoresCircle.style.setProperty("--ripple-x", `${x}px`);
  valoresCircle.style.setProperty("--ripple-y", `${y}px`);

  valoresCircle.classList.add("ripple-out");

  setTimeout(() => {
    valoresCircle.classList.remove("ripple-out");

    const front = valoresCircle.querySelector(".circle-front");

    if (!valoresCircle.classList.contains("active")) {
      valoresCircle.classList.add("active", "show-icons");
      front.style.display = "none";

      backIcons.forEach((icon, index) => {
        if (iconTooltips[index]?.dispose) iconTooltips[index].dispose();

        iconTooltips[index] = new bootstrap.Tooltip(icon, { trigger: "hover" });
      });
    } else {
      tooltipTimeouts.forEach(clearTimeout);
      tooltipTimeouts = [];

      iconTooltips.forEach((tooltip) => {
        if (tooltip?._element) {
          tooltip.hide();
          tooltip.dispose();
        }
      });
      iconTooltips = [];

      valoresCircle.classList.remove("active", "show-icons");
      front.style.display = "flex";
    }

    valoresCircle.classList.add("ripple-in");
    setTimeout(() => valoresCircle.classList.remove("ripple-in"), 300);
  }, 300);
});

const cursorDot = document.createElement("div");
cursorDot.classList.add("cursor-dot");
valoresCircle.appendChild(cursorDot);

valoresCircle.addEventListener("mousemove", (e) => {
  if (e.target.closest(".circle-back i")) {
    cursorDot.style.opacity = 0;
    return;
  }

  const rect = valoresCircle.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  cursorDot.style.left = `${x - 5}px`;
  cursorDot.style.top = `${y - 5}px`;
  cursorDot.style.opacity = 1;
});

valoresCircle.addEventListener("mouseleave", () => {
  cursorDot.style.opacity = 0;
});
