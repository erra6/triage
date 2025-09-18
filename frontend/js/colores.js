// colores.js
// Gestiona el canvas de selección de colores de triage

const Colores = (() => {
  let ctx = null;
  let escala = 1;
  let zonas = []; // {id, color, x1, y1, x2, y2}

  /**
   * Inicializar el canvas de colores
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
    img.src = "img/colores.png";

    img.onload = () => {
      canvas.width = Math.round(img.width / escala);
      canvas.height = Math.round(img.height / escala);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      console.log("Canvas Colores inicializado");
    };
  }

  /**
   * Definir zonas de colores (basado en la altura del canvas)
   */
  function cargarZonas(canvasId) {
    zonas = [];
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ancho = canvas.width;
    const alto = canvas.height / 5; // 5 franjas verticales

    zonas.push({
      id: "negro",
      color: "negro",
      x1: 0,
      y1: 0,
      x2: ancho,
      y2: alto,
    });
    zonas.push({
      id: "rojo_negro",
      color: "rojo_negro",
      x1: 0,
      y1: alto,
      x2: ancho,
      y2: alto * 2,
    });
    zonas.push({
      id: "rojo",
      color: "rojo",
      x1: 0,
      y1: alto * 2,
      x2: ancho,
      y2: alto * 3,
    });
    zonas.push({
      id: "amarillo",
      color: "amarillo",
      x1: 0,
      y1: alto * 3,
      x2: ancho,
      y2: alto * 4,
    });
    zonas.push({
      id: "verde",
      color: "verde",
      x1: 0,
      y1: alto * 4,
      x2: ancho,
      y2: alto * 5,
    });
  }

  /**
   * Detectar qué zona se ha clicado
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
   * Actualizar la UI con el color seleccionado
   */
  function aplicarColor(zona, tartemId) {
    if (!zona) return;

    let bg = "";
    let textColor = "#ffffff";
    switch (zona.color) {
      case "negro":
        bg = "#000000";
        break;
      case "rojo_negro":
        bg = "#E70000"; // podemos luego usar un gif si se quiere
        break;
      case "rojo":
        bg = "#E70000";
        break;
      case "amarillo":
        bg = "#FFDE2A";
        textColor = "#000000";
        break;
      case "verde":
        bg = "#0A825A";
        break;
    }

    $("#tartem").css("background-color", bg).css("color", textColor);
    $("#imagen_tartem").html(
      `<img src="img/${zona.color}.png" width="159" height="70">`
    );
    $("#color11").css("background-color", bg).css("color", textColor);

    if (tartemId) {
      $("#color11").text(`id tartem: ${tartemId}`);
    }

    $("#tartem_panel").panel("open");
  }

  return {
    inicializar,
    cargarZonas,
    detectarClick,
    aplicarColor,
  };
})();
