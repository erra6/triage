// ================================
// utils.js - funciones comunes
// ================================

// URL base del backend (ajústala si es distinta)
const API_BASE = "http://localhost/api";

/**
 * Realiza una petición AJAX genérica al backend
 * @param {string} endpoint - ruta del php (ej: "/tartem_primera.php")
 * @param {string} method - "GET" o "POST"
 * @param {object} data - parámetros a enviar
 * @returns {Promise} - con resolve(data) o reject(error)
 */
function apiRequest(endpoint, method = "GET", data = {}) {
  return $.ajax({
    url: API_BASE + endpoint,
    method,
    data,
    dataType: "json",
  }).fail((jqXHR, textStatus, errorThrown) => {
    console.error(`❌ API error en ${endpoint}:`, textStatus, errorThrown);
    browalert("Error de conexión con el servidor");
  });
}

/**
 * Muestra una alerta consistente en cualquier dispositivo
 * Usa navigator.notification si está en Cordova,
 * si no, recurre a alert() del navegador.
 */
function browalert(msg) {
  if (navigator.notification && navigator.notification.alert) {
    navigator.notification.alert(msg, null, "Aviso", "OK");
  } else {
    alert(msg);
  }
}

/**
 * Añade un dígito al campo tartem
 * @param {number} num - dígito a añadir
 */
function anadir(num) {
  const tartem = $("#tartem");
  tartem.text(tartem.text() + num);
}

/**
 * Devuelve el valor actual del tartem
 */
function getTartem() {
  return $("#tartem").text().trim();
}

/**
 * Borra el valor del tartem
 */
function resetTartem() {
  $("#tartem").text("");
}

/**
 * Abre un panel de jQuery Mobile de forma segura
 */
function abrirPanel(id) {
  $(`#${id}`).panel("open");
}

/**
 * Cierra un panel de jQuery Mobile de forma segura
 */
function cerrarPanel(id) {
  $(`#${id}`).panel("close");
}

/**
 * Resalta un paso de la barra inferior de navegación (colores)
 * @param {string} id - ej: "#color22"
 */
function cuadrorojo(id) {
  $(".ui-footer #menu_enviar a").removeClass("ui-btn-active");
  $(id).addClass("ui-btn-active");
}
