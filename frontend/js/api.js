/**
 * api.js
 * Funciones para comunicarse con el backend (API PHP)
 * Todas usan apiRequest() de utils.js
 */

/**
 * Obtiene todos los TARTEM (primera carga o refresco).
 */
function recibir_tartemes_primera() {
  return apiRequest("/tartem_primera.php");
}

function recibir_tartemes() {
  return apiRequest("/tartem.php");
}

/**
 * Obtiene los síntomas de un TARTEM.
 */
function recibir_sintomas(tartemId) {
  return apiRequest("/sintomas.php", "POST", { tartem: tartemId });
}

/**
 * Envía los síntomas seleccionados.
 */
function enviar_sintomas(tartemId, anatomiaId, sintomas) {
  return apiRequest("/sintomas_change.php", "POST", {
    tartem: tartemId,
    anatomia: anatomiaId,
    sintomas: JSON.stringify(sintomas),
  });
}

/**
 * Envía sexo o edad.
 */
function enviar_sexoedad(tartemId, anatomiaId) {
  return apiRequest("/sexoedad_change.php", "POST", {
    tartem: tartemId,
    anatomia: anatomiaId,
  });
}

/**
 * Envía un nuevo TARTEM con su color.
 */
function enviar_tartem(tartemId, color) {
  return apiRequest("/triage.php", "POST", {
    tartem: tartemId,
    color: color,
  });
}

/**
 * Cambia el estado de tracking de un TARTEM.
 */
function changeTracking(tartemId, tracking) {
  return apiRequest("/tracking_change.php", "POST", {
    tartem: tartemId,
    tracking: tracking,
  });
}

/**
 * Sube la fotografía asociada a un TARTEM.
 */
function enviar_foto(tartemId, imageData) {
  return apiRequest("/foto.php", "POST", {
    tartem: tartemId,
    foto: imageData,
  });
}

/**
 * Login de usuario
 */
function login(usuario, contrasena) {
  return apiRequest("/login.php", "POST", {
    user: usuario,
    pass: contrasena,
  });
}
