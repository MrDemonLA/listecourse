Quagga.init(
  {
    inputStream: {
      name: "Live",
      type: "LiveStream",
      target: document.querySelector("#camera"),
    },
    decoder: {
      readers: ["code_128_reader"],
    },
  },
  function (err) {
    if (err) {
      console.log(err);
      return;
    }
    console.log("Initialization finished. Ready to start");
    Quagga.start();
  }
);

Quagga.onDetected(function (data) {
  const code = data.codeResult.code;
  console.log("Code detected:", code);
  // Vérifier si le code est déjà présent dans TabList
  if (TabList.includes(code)) {
    console.log("Code already exists in TabList.");
  } else {
    // Ajouter le code détecté dans TabList
    TabList.push(code);
    console.log("Updated TabList:", TabList);
  }
});
