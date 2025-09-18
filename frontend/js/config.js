/**
 * config.js
 * Configuración global de la app
 */

// URL base de la API (ajústala según el entorno)
const API_BASE_URL = "http://localhost/triage/api";
// ejemplo: "https://triage.midominio.com/api"

// Intervalo de refresco para listado de TARTEM (ms)
const REFRESH_INTERVAL = 5000;

// Duración de alertas visuales (si usamos toasts en el futuro)
const ALERT_TIMEOUT = 3000;

// Configuración de cámara (para PhoneGap/Cordova)
const CAMERA_OPTIONS = {
  quality: 90,
  destinationType: Camera.DestinationType.DATA_URL,
  encodingType: Camera.EncodingType.JPEG,
  mediaType: Camera.MediaType.PICTURE,
  correctOrientation: true,
};

// Colores de triage
const TRIAGE_COLORS = {
  0: { name: "negro", hex: "#000000", text: "#ffffff" },
  1: { name: "rojo_negro", hex: "#E70000", text: "#ffffff" },
  2: { name: "rojo", hex: "#E70000", text: "#ffffff" },
  3: { name: "amarillo", hex: "#FFDE2A", text: "#000000" },
  4: { name: "verde", hex: "#0A825A", text: "#ffffff" },
};

// Organizaciones / ambulancias
const ORGANIZACIONES = {
  1: "1_USVA_ARAN.png",
  2: "2_USVB_ARAN.png",
  3: "3_HELICOPTERO_ARAN.png",
  4: "4_USVA_SEM.png",
  5: "5_USVB_SEM.png",
  6: "6_HELICOPTERO_SEM.png",
  7: "7_HELICOPTERO_BOMBERS.png",
  8: "8_HELICOPTERO_GC.png",
  9: "9_USVB_SAMU_FRANCIA.png",
  10: "10_HELICOPTERO_SAMU_FRANCIA.png",
};
