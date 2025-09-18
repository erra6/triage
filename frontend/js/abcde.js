// abcde.js
// Gestiona el canvas de la escala ABCDE

const ABCDE = (() => {
  let ctx = null;
  let escala = 1;
  let zonas = []; // {id, letra, x1, y1, x2, y2, anatomiaId}

  /**
   * Inicializa el canvas ABCDE
   * @param {string} canvasId - ID del canvas en el HTML
   * @param {number} esc - factor de escala
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
    img.src = "img/abcde.png";

    img.onload = () => {
      canvas.width = Math.round(img.width / escala);
      canvas.height = Math.round(img.height / escala);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      console.log("Canvas ABCDE inicializado");
    };
  }

  /**
   * Añadir zona ABCDE
   */
  function agregarZona(id, letra, x1, y1, x2, y2, anatomiaId) {
    zonas.push({ id, letra, x1, y1, x2, y2, anatomiaId });
  }

  /**
   * Detectar clic en alguna letra
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
   * Resaltar letra seleccionada
   */
  function resaltarZona(zona) {
    if (!ctx || !zona) return;
    ctx.fillStyle = "rgba(255,0,0,0.4)";
    ctx.fillRect(zona.x1, zona.y1, zona.x2 - zona.x1, zona.y2 - zona.y1);
  }

  /**
   * Cargar zonas predefinidas (A, B, C, D, E)
   * Coordenadas relativas a `abcde.png`
   */
  function cargarZonasPredefinidas() {
    zonas = [];

    const ancho = 80; // ancho aproximado de cada letra
    const alto = 80; // alto aproximado
    let offsetY = 0;

    agregarZona("A", "A", 0, offsetY, ancho, alto, -1);
    offsetY += alto;
    agregarZona("B", "B", 0, offsetY, ancho, offsetY + alto, -2);
    offsetY += alto;
    agregarZona("C", "C", 0, offsetY, ancho, offsetY + alto, -3);
    offsetY += alto;
    agregarZona("D", "D", 0, offsetY, ancho, offsetY + alto, -4);
    offsetY += alto;
    agregarZona("E", "E", 0, offsetY, ancho, offsetY + alto, -100);
  }

  return {
    inicializar,
    agregarZona,
    detectarClick,
    resaltarZona,
    cargarZonasPredefinidas,
  };
})();
