const Quagga = require("quagga");

// Configurez les paramètres du lecteur
const config = {
  inputStream: {
    name: "Live",
    type: "LiveStream",
    target: document.querySelector("#barcode-scanner"), // Div où le flux vidéo sera affiché
    constraints: {
      width: 480,
      height: 320,
      facingMode: "environment", // Utilisez la caméra arrière (si disponible)
    },
  },
  decoder: {
    readers: ["code_128_reader", "ean_reader"], // Types de codes-barres pris en charge
  },
};

// Initialisez le lecteur avec les paramètres configurés
Quagga.init(config, function (err) {
  if (err) {
    console.error(err);
    return;
  }
  // Démarrez le lecteur
  Quagga.start();
});

// Gérez l'événement de détection d'un code-barres
Quagga.onDetected(function (result) {
  // Accédez aux données du code-barres détecté
  const code = result.codeResult.code;
  console.log("Code-barres détecté : " + code);

  // Arrêtez le lecteur après avoir trouvé un code-barres (à ajuster selon vos besoins)
  Quagga.stop();
});

// Reste du code Quagga...
