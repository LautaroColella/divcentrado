document.addEventListener("DOMContentLoaded", () => {
  const avatar = document.getElementById("avatar-toggle");
  const avatarImg = document.getElementById("avatar-img");
  const fraseTitulo = document.querySelector(".frase-titulo");
  const body = document.body;

  const habilidades = document.getElementById("lista-habilidades");
  const peliculas = document.getElementById("lista-peliculas");
  const musica = document.getElementById("lista-musica");
  const presentacionTexto = document.querySelector(".presentacion-texto");

  let modoActual = "suave";

  avatar.addEventListener("mouseenter", () => {
    if (modoActual === "suave") {
      body.classList.remove("modo-suave");
      body.classList.add("modo-audaz");
      avatarImg.src = "./img/silvanaAudas.jpg";
      fraseTitulo.textContent = "Romper el equilibrio también es arte.";
      modoActual = "audaz";

      // Presentación audaz
      presentacionTexto.textContent =
        "Me muevo donde otros dudan. Organizo, comunico y empujo los límites para que las ideas se conviertan en acción. No me detengo en lo esperado: voy más allá, transformo, abro caminos.";

      // Contenido audaz
      habilidades.innerHTML = `
        <li>Liderazgo disruptivo</li>
        <li>Resolución creativa</li>
        <li>Experimentación visual</li>
      `;
      peliculas.innerHTML = `
        <li>Black Swan</li>
        <li>Matrix</li>
        <li>Perfect Blue</li>
      `;
      musica.innerHTML = `
        <li>Nine Inch Nails</li>
        <li>FKA Twigs</li>
        <li>Rosalía</li>
      `;
    } else {
      body.classList.remove("modo-audaz");
      body.classList.add("modo-suave");
      avatarImg.src = "./img/silvanaSuave.jpg";
      fraseTitulo.textContent = "La belleza está en el equilibrio.";
      modoActual = "suave";

      // Presentación suave
      presentacionTexto.textContent =
        "Me especializo en organizar procesos, facilitar la comunicación y crear entornos donde las personas pueden crecer y colaborar con confianza. Creo en lo simple, en lo que se entiende, en lo que conecta. Mi forma de trabajar busca equilibrio entre lo humano y lo profesional, entre lo estético y lo funcional.";

      // Contenido suave
      habilidades.innerHTML = `
        <li>Organización metódica</li>
        <li>Comunicación empática</li>
        <li>Diseño simbólico</li>
      `;
      peliculas.innerHTML = `
        <li>Amélie</li>
        <li>La vida secreta de las palabras</li>
        <li>El viaje de Chihiro</li>
      `;
      musica.innerHTML = `
        <li>Ludovico Einaudi</li>
        <li>Sufjan Stevens</li>
        <li>Carla Morrison</li>
      `;
    }
  });
});