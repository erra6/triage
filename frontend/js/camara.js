/**
 * camara.js
 * Manejo de fotos en la app (PhoneGap o navegador).
 */

// === CAPTURA CON PHONEGAP / CORDOVA ===
function onPhotoDataSuccess(imageData) {
  const smallImage = document.getElementById("smallImage");
  if (!smallImage) return;

  smallImage.style.display = "block";
  smallImage.src = "data:image/jpeg;base64," + imageData;
}

function onPhotoURISuccess(imageURI) {
  const largeImage = document.getElementById("largeImage");
  if (!largeImage) return;

  largeImage.style.display = "block";
  largeImage.src = imageURI;
}

function capturePhoto() {
  if (navigator.camera && navigator.camera.getPicture) {
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
      quality: 80,
      destinationType: Camera.DestinationType.DATA_URL,
      correctOrientation: true,
    });
  } else {
    // fallback al navegador
    initWebCamera();
  }
  window.location = "index.html#filiacion";
}

function capturePhotoEdit() {
  if (navigator.camera && navigator.camera.getPicture) {
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
      quality: 80,
      allowEdit: true,
      destinationType: Camera.DestinationType.DATA_URL,
      correctOrientation: true,
    });
  } else {
    initWebCamera();
  }
  window.location = "index.html#filiacion";
}

function getPhoto(source) {
  if (navigator.camera && navigator.camera.getPicture) {
    navigator.camera.getPicture(onPhotoURISuccess, onFail, {
      quality: 60,
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: source,
    });
    window.location = "index.html#filiacion";
  } else {
    browalert("La cámara no está disponible en este navegador.");
  }
}

function onFail(message) {
  browalert("Error al capturar foto: " + message);
}

// === CAPTURA CON NAVEGADOR (HTML5 getUserMedia) ===
function initWebCamera() {
  const video = document.getElementById("video");
  const canvas = document.getElementById("canvas");
  const snap = document.getElementById("snap");
  const save = document.getElementById("save");
  const smallImage = document.getElementById("smallImage");

  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    browalert("Tu navegador no soporta cámara HTML5.");
    return;
  }

  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then((stream) => {
      if (video) {
        video.srcObject = stream;
        video.play();
      }
    })
    .catch((err) => {
      console.error("Error al acceder a la cámara:", err);
      browalert("No se pudo acceder a la cámara.");
    });

  if (snap && canvas && video) {
    snap.onclick = () => {
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL("image/jpeg", 0.8);
      if (smallImage) {
        smallImage.style.display = "block";
        smallImage.src = imageData;
      }
    };
  }

  if (save && canvas) {
    save.onclick = () => {
      const imageData = canvas.toDataURL("image/jpeg", 0.8);
      $("#smallImage").attr("src", imageData);
      sendPhoto(); // usa la función ya definida en api.js
    };
  }
}
