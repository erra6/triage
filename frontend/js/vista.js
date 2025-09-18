/**
 * vista.js
 * Maneja la parte visual de la app (listado, paneles, colores, etc.)
 */

/**
 * Dibuja el listado de TARTEM.
 */
function renderTartemList(tartemes) {
  let contenido = "";

  tartemes.forEach((item) => {
    let tartem = item.IDIncidencia;
    let color = num_color(item.IDColor);
    let trackingLabel = getTrackingLabel(item.IDTracking);
    let arrows = getTrackingArrows(item, tartem);
    let ambuHtml = renderAmbulancia(item);
    let hospitalHtml = renderHospital(item);

    contenido += `
            <div class="left margin5">
                <ul class="tartem_${color}">
                    <li style="text-align:center">
                        <a class="text_tartem" href="#sintomas" onclick="cargartartem(${tartem}, ${
      item.IDColor
    })" style="color:#fff">
                            <div class="text_${color}">${tartem}</div>
                        </a>
                    </li>
                    <div class="estado">
                        ${arrows.left}
                        <a class="text_tartem" href="#sintomas" onclick="cargartartem(${tartem}, ${
      item.IDColor
    })" style="color:#fff">
                            <b>${trackingLabel}</b>
                        </a>
                        ${arrows.right}
                    </div>
                    ${ambuHtml}
                    ${renderImagenTartem(tartem, item.IDColor, item.IDTracking)}
                    ${hospitalHtml}
                </ul>
            </div>
        `;
  });

  $("#contenido_listado").html(contenido);
}

/**
 * Convierte IDColor en nombre de color.
 */
function num_color(num) {
  switch (String(num)) {
    case "0":
      return "negro";
    case "1":
      return "rojo_negro";
    case "2":
      return "rojo";
    case "3":
      return "amarillo";
    case "4":
      return "verde";
    default:
      return "gris";
  }
}

/**
 * Devuelve etiqueta de tracking.
 */
function getTrackingLabel(trackingId) {
  const labels = {
    1: "SOLICITADA",
    2: "ASIGNADA",
    3: "P.ENTERADO",
    4: "EN PUESTO",
    5: "EVACUADA",
    6: "C.SANITARIO",
  };
  return labels[trackingId] || "DESCONOCIDO";
}

/**
 * Devuelve flechas de navegación de tracking.
 */
function getTrackingArrows(item, tartem) {
  let left = "",
    right = "";
  if (item.IDTracking > 1) {
    left = `<img src="img/iz.png" title="Retroceder" alt="Retroceder" 
                 onclick="changeTracking(${tartem}, ${
      item.IDTracking - 1
    }).done(()=>listado_tartem(true));">`;
  }
  if (item.IDTracking < 5) {
    right = `<img src="img/de.png" title="Avanzar" alt="Avanzar" 
                  onclick="changeTracking(${tartem}, ${
      item.IDTracking + 1
    }).done(()=>listado_tartem(true));">`;
  }
  return { left, right };
}

/**
 * Renderiza la imagen de ambulancia si aplica.
 */
function renderAmbulancia(item) {
  if (!item.IDOrganizacion) return "";
  const img = `img/ambus/${item.IDOrganizacion}.png`; // imágenes renombradas 1.png, 2.png...
  return `
        <div class="ambulancia">
            <a href="#sintomas" onclick="cargartartem(${item.IDIncidencia}, ${
    item.IDColor
  })">
                <div class="ambu"><img src="${img}" width="56" height="30" /></div>
                ${item.Ambulancia || ""}
            </a>
        </div>
    `;
}

/**
 * Renderiza hospital.
 */
function renderHospital(item) {
  if (!item.Hospital) return "";
  let name = item.Hospital.includes("-")
    ? item.Hospital.split("-")[1]
    : item.Hospital;
  return `
        <div class="hospital">
            <a href="#sintomas" onclick="cargartartem(${item.IDIncidencia}, ${item.IDColor})">
                <img src="img/hospital.gif" width="20" height="20"> ${name}
            </a>
        </div>
    `;
}

/**
 * Renderiza la imagen del TARTEM (gif animado si ASIGNADA).
 */
function renderImagenTartem(tartem, idColor, idTracking) {
  const color = num_color(idColor);
  const imgExt = idTracking === 2 ? "gif" : "png";
  return `
        <a class="text_tartem" href="#sintomas" onclick="cargartartem(${tartem}, ${idColor})">
            <div id="imagen_tartem">
                <img id="${color}" src="img/${color}.${imgExt}" width="180" height="102">
            </div>
        </a>
    `;
}

/**
 * Carga un TARTEM en la UI.
 */
function cargartartem(tartem, color) {
  const colores = {
    0: { bg: "#000000", fg: "#ffffff" },
    1: { bg: "#E70000", fg: "#ffffff" },
    2: { bg: "#E70000", fg: "#ffffff" },
    3: { bg: "#FFDE2A", fg: "#000000" },
    4: { bg: "#0A825A", fg: "#ffffff" },
  };
  const c = colores[color] || { bg: "#666", fg: "#fff" };

  $("#color11")
    .css({ backgroundColor: c.bg, color: c.fg })
    .text("id tartem: " + tartem);
  $("#tartem").text(tartem);
  $("#fotonumtartem").text("id tartem: " + tartem);

  // repinta síntomas
  recibir_sintomas(tartem).done((sintomas) => {
    repintar(sintomas);
  });
}
