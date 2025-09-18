// anatomia.js
// Gestiona el canvas del cuerpo y sus zonas anatómicas

const Anatomia = (() => {
  let ctx = null;
  let escala = 1;
  let zonas = []; // cada zona: {id, nombre, x1, y1, x2, y2, anatomiaId}

  /**
   * Inicializa el canvas de anatomía
   * @param {string} canvasId - ID del canvas HTML
   * @param {number} esc - factor de escala según pantalla
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
    img.src = "img/cuerpo.png";

    img.onload = () => {
      canvas.width = Math.round(img.width / escala);
      canvas.height = Math.round(img.height / escala);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      console.log("Canvas de anatomía inicializado");
    };
  }

  /**
   * Añade una zona específica del cuerpo
   */
  function agregarZona(id, nombre, x1, y1, x2, y2, anatomiaId) {
    zonas.push({ id, nombre, x1, y1, x2, y2, anatomiaId });
  }

  /**
   * Detecta si un clic corresponde a alguna zona
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
   * Pinta en rojo una zona del cuerpo
   */
  function resaltarZona(zona) {
    if (!ctx || !zona) return;
    ctx.fillStyle = "rgba(255,0,0,0.4)";
    ctx.fillRect(zona.x1, zona.y1, zona.x2 - zona.x1, zona.y2 - zona.y1);
  }

  /**
   * Carga todas las zonas anatómicas predefinidas
   * Coordenadas en píxeles relativos al `cuerpo.png` original
   */
  function cargarZonasPredefinidas() {
    zonas = []; // limpiar

    // Cabeza
    agregarZona("cabeza", "Cabeza", 60, 0, 140, 100, 0);

    // Tórax
    agregarZona("torax", "Tórax", 50, 100, 150, 200, 3);

    // Abdomen
    agregarZona("abdomen", "Abdomen", 50, 200, 150, 300, 1);

    // Pelvis
    agregarZona("pelvis", "Pelvis", 50, 300, 150, 360, 2);

    // Brazo derecho
    agregarZona("brazo_derecho", "Brazo derecho", 0, 100, 50, 300, 4);

    // Brazo izquierdo
    agregarZona("brazo_izquierdo", "Brazo izquierdo", 150, 100, 200, 300, 5);

    // Pierna derecha
    agregarZona("pierna_derecha", "Pierna derecha", 60, 360, 110, 500, 6);

    // Pierna izquierda
    agregarZona("pierna_izquierda", "Pierna izquierda", 100, 360, 150, 500, 7);
  }

  // API pública
  return {
    inicializar,
    agregarZona,
    detectarClick,
    resaltarZona,
    cargarZonasPredefinidas,
  };
})();
