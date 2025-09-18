// sexoEdad.js
// Gestiona el canvas de selección de Sexo y Edad

const SexoEdad = (() => {
  let ctx = null;
  let escala = 1;
  let zonas = []; // {id, tipo, x1, y1, x2, y2, valor}

  /**
   * Inicializar el canvas sexo/edad
   */
  function inicializar(canvasId, esc) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
      console.error(`Canvas ${canvasId} no encontrado`);
      return;
    }

    ctx = canvas.getContext("2d");
    escala = esc;

    const img = new Image();
    img.src = "img/sexo.png";

    img.onload = () => {
      canvas.width = Math.round(img.width / escala);
      canvas.height = Math.round(img.height / escala);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      console.log("Canvas SexoEdad inicializado");
    };
  }

  /**
   * Agregar zona clicable
   */
  function agregarZona(id, tipo, x1, y1, x2, y2, valor) {
    zonas.push({ id, tipo, x1, y1, x2, y2, valor });
  }

  /**
   * Detectar click
   */
  function detectarClick(x, y) {
    for (const zona of zonas) {
      if (x >= zona.x1 && x <= zona.x2 && y >= zona.y1 && y <= zona.y2) {
        return zona;
      }
    }
    return null;
  }

  /**
   * Resaltar zona seleccionada
   */
  function resaltarZona(zona) {
    if (!ctx || !zona) return;
    ctx.fillStyle = "rgba(0, 128, 255, 0.3)";
    ctx.fillRect(zona.x1, zona.y1, zona.x2 - zona.x1, zona.y2 - zona.y1);
  }

  /**
   * Cargar zonas predefinidas de sexo y edad
   */
  function cargarZonasPredefinidas(canvasId) {
    zonas = [];
    const canvas = document.getElementById(canvasId);

    if (!canvas) return;

    const ancho = canvas.width;
    const alto = canvas.height / 8;

    // Sexo
    agregarZona("hombre", "sexo", 0, 0, ancho / 2, alto * 3, "H");
    agregarZona("mujer", "sexo", ancho / 2, 0, ancho, alto * 3, "M");

    // Edad
    agregarZona("8", "edad", 0, alto * 3, ancho, alto * 4, 8);
    agregarZona("18", "edad", 0, alto * 4, ancho, alto * 5, 18);
    agregarZona("40", "edad", 0, alto * 5, ancho, alto * 6, 40);
    agregarZona("75", "edad", 0, alto * 6, ancho, alto * 7, 75);
    agregarZona("75+", "edad", 0, alto * 7, ancho, alto * 8, "75+");
  }

  return {
    inicializar,
    agregarZona,
    detectarClick,
    resaltarZona,
    cargarZonasPredefinidas,
  };
})();
