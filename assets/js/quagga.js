Quagga.init(
  {
    inputStream: {
      name: "Live",
      type: "LiveStream",
      target: document.querySelector("#AddCamera"),
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
  console.log(code);
  AddText.value = code;
  // Vérifier si le code est déjà présent dans TabList
  fetch("https://api-list-iy8c.vercel.app/afficher")
    .then((response) => response.json())
    .then((data) => {
      const TabList = data.TabList;
      if (TabList.includes(code)) {
        console.log("Le code existe déjà dans TabList.");
      } else {
        // Ajouter le code détecté dans TabList
        addCodeToTabList(code);
        console.log("Updated TabList:", TabList);
      }
    })
    .catch((error) =>
      console.error("Erreur lors du chargement du fichier JSON :", error)
    );
});

function addCodeToTabList(code) {
  // Envoyer le code détecté à l'API pour l'ajouter à la liste
  fetch("https://api-list-iy8c.vercel.app/ajouter", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ element: code }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout du code à TabList.");
      }
      console.log("Code ajouté avec succès à TabList.");
    })
    .catch((error) => {
      console.error("Erreur lors de l'ajout du code à TabList :", error);
    });
}
