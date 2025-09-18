// index.js – lógica principal de la app triage
// Encapsulado para no contaminar globales
(function (window, document, $) {
  "use strict";

  var escala,
    margen,
    tamanos = { ana: [] };
  var contextcuerpo, contextabcde, contextcolor, contextsexo;
  var imagenegro = new Image();
  imagenegro.src = "img/negro.png";

  // ------------------------- Inicialización -------------------------
  $(document).ready(function () {
    var originalx = 3100;
    var originalmargen = 150;
    var myscreen = window.innerWidth;
    escala = originalx / myscreen;
    margen = originalmargen / escala;

    inicializarCuerpo();
    inicializarAbcde();
    inicializarColores();
    inicializarSexo();
    inicializarEventos();
    inicializarPaginas();
  });

  // ------------------------- Funciones de inicialización -------------------------
  function inicializarCuerpo() {
    var canvas = document.getElementById("cuerpo");
    if (!canvas) return;
    contextcuerpo = canvas.getContext("2d");
    canvas.style.marginRight = margen / 1.4 + "px";

    var imagecuerpo = new Image();
    imagecuerpo.onload = function () {
      canvas.width = Math.round(imagecuerpo.width / escala);
      canvas.height = Math.round(imagecuerpo.height / escala);
      contextcuerpo.drawImage(
        imagecuerpo,
        0,
        0,
        Math.round(imagecuerpo.width / escala),
        Math.round(imagecuerpo.height / escala)
      );
      tamanos[101] = [
        "cuerpo",
        imagecuerpo,
        0,
        0,
        Math.round(imagecuerpo.width / escala),
        Math.round(imagecuerpo.height / escala),
      ];
    };
    imagecuerpo.src = "img/cuerpo.png";
  }

  function inicializarAbcde() {
    var canvas = document.getElementById("contenedor_abcde");
    if (!canvas) return;
    contextabcde = canvas.getContext("2d");
    canvas.style.marginRight = margen + "px";

    var imageabcde = new Image();
    imageabcde.onload = function () {
      canvas.width = Math.round(imageabcde.width / escala);
      canvas.height = Math.round(imageabcde.height / escala);
      contextabcde.drawImage(
        imageabcde,
        0,
        0,
        Math.round(imageabcde.width / escala),
        Math.round(imageabcde.height / escala)
      );
      tamanos[102] = [
        "contenedor_abcde",
        imageabcde,
        0,
        0,
        Math.round(imageabcde.width / escala),
        Math.round(imageabcde.height / escala),
      ];
    };
    imageabcde.src = "img/abcde.png";
  }

  function inicializarColores() {
    var canvas = document.getElementById("centro_derecha");
    if (!canvas) return;
    contextcolor = canvas.getContext("2d");
    canvas.style.marginRight = margen + "px";

    var imagecolor = new Image();
    imagecolor.onload = function () {
      canvas.width = Math.round(imagecolor.width / escala);
      canvas.height = Math.round(imagecolor.height / escala);
      contextcolor.drawImage(
        imagecolor,
        0,
        0,
        Math.round(imagecolor.width / escala),
        Math.round(imagecolor.height / escala)
      );
      tamanos[103] = [
        "centro_derecha",
        imagecolor,
        0,
        0,
        Math.round(imagecolor.width / escala),
        Math.round(imagecolor.height / escala),
      ];
    };
    imagecolor.src = "img/colores.png";
  }

  function inicializarSexo() {
    var canvas = document.getElementById("sexo");
    if (!canvas) return;
    contextsexo = canvas.getContext("2d");
    canvas.style.marginRight = margen + "px";

    var sexo = new Image();
    sexo.onload = function () {
      canvas.width = Math.round(sexo.width / escala);
      canvas.height = Math.round(sexo.height / escala);
      contextsexo.drawImage(
        sexo,
        0,
        0,
        Math.round(sexo.width / escala),
        Math.round(sexo.height / escala)
      );
      tamanos[104] = [
        "sexo",
        sexo,
        0,
        0,
        Math.round(sexo.width / escala),
        Math.round(sexo.height / escala),
      ];
    };
    sexo.src = "img/sexo.png";
  }

  // ------------------------- Eventos -------------------------
  function inicializarEventos() {
    var cuerpoCanvas = document.getElementById("cuerpo");
    if (cuerpoCanvas) {
      cuerpoCanvas.addEventListener("click", onCuerpoClick, false);
    }

    var abcdeCanvas = document.getElementById("contenedor_abcde");
    if (abcdeCanvas) {
      abcdeCanvas.addEventListener("click", onAbcdeClick, false);
    }

    var sexoCanvas = document.getElementById("sexo");
    if (sexoCanvas) {
      sexoCanvas.addEventListener("click", onSexoClick, false);
    }

    var coloresCanvas = document.getElementById("centro_derecha");
    if (coloresCanvas) {
      coloresCanvas.addEventListener("click", onColorClick, false);
    }
  }

  function inicializarPaginas() {
    $("#listado_tartem").on("pageshow", function () {
      listado_tartem(true);
      var refreshIntervalId = setInterval(function () {
        listado_tartem(false);
      }, 5000);
      $("#tartemes_interval").html(refreshIntervalId);
    });

    $("#home").on("pageshow", function () {
      clearInterval($("#tartemes_interval").html());
    });

    $("#sintomas").on("pageshow", function () {
      clearInterval($("#tartemes_interval").html());
    });

    $("#sintomas_panel").on("panelclose", function () {
      repintar(recibir_sintomas());
    });
  }

  // ------------------------- Handlers de click -------------------------
  function onCuerpoClick(e) {
    var x = e.pageX - $("#cuerpo").offset().left;
    var y = e.pageY - $("#cuerpo").offset().top;
    var pixelData = contextcuerpo.getImageData(x, y, 1, 1).data;

    for (var i = 1; i < 19; i++) {
      var coor = tamanos[i];
      if (!coor) continue;
      if (
        pixelData[3] > 0 &&
        coor[1] < x &&
        x < coor[2] &&
        coor[3] < y &&
        y < coor[4]
      ) {
        imagenroja(coor[0], coor[1], coor[3], coor[5], tamanos[0]);
        panel(coor[6], coor[7]);
      }
    }
  }

  function onAbcdeClick(e) {
    var x = e.pageX - $("#contenedor_abcde").offset().left;
    var y = e.pageY - $("#contenedor_abcde").offset().top;
    var pixelData = contextabcde.getImageData(x, y, 1, 1).data;

    for (var i = 19; i < 24; i++) {
      var coor = tamanos[i];
      if (!coor) continue;
      if (
        pixelData[3] > 0 &&
        coor[1] < x &&
        x < coor[2] &&
        coor[3] < y &&
        y < coor[4]
      ) {
        imagenroja(coor[0], coor[1], coor[3], coor[5], tamanos[0]);
        if (coor[6] === "E") {
          cuadrorojo("#color44");
        } else {
          cuadrorojo("#color33");
          panel(coor[6], coor[7]);
        }
      }
    }
  }

  function onSexoClick(e) {
    var x = e.pageX - $("#sexo").offset().left;
    var y = e.pageY - $("#sexo").offset().top;
    var pixelData = contextsexo.getImageData(x, y, 1, 1).data;
    if (pixelData[3] > 0) {
      cuadrorojo("#color22");
      // Aquí puedes añadir guardarsexo(), enviar_sexoedad(), etc.
    }
  }

  function onColorClick(e) {
    var x = e.pageX - $("#centro_derecha").offset().left;
    var y = e.pageY - $("#centro_derecha").offset().top;
    var pixelData = contextcolor.getImageData(x, y, 1, 1).data;

    if (pixelData[3] <= 0) return;

    // cada bloque corresponde a un color
    var alto = Math.round(imagenegro.height / escala);
    if (y < alto) {
      pintarColor("#000000", "#ffffff", "negro.png");
    } else if (y < alto * 2) {
      pintarColor("#E70000", "#ffffff", "rojo_negro.png");
    } else if (y < alto * 3) {
      pintarColor("#E70000", "#ffffff", "rojo.png");
    } else if (y < alto * 4) {
      pintarColor("#FFDE2A", "#000000", "amarillo.png");
    } else if (y < alto * 5) {
      pintarColor("#0A825A", "#ffffff", "verde.png");
    }
  }

  function pintarColor(bg, fg, img) {
    $("#tartem").css("background-color", bg);
    $("#tartem").css("color", fg);
    $("#imagen_tartem").html(
      '<img src="img/' + img + '" width="159" height="70">'
    );
    $("#tartem_panel").panel("open");
  }
})(window, document, jQuery);
