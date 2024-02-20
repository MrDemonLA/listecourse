const AddText = document.getElementById("AddText");
const List = document.getElementById("List");
const ClearList = document.querySelector(".ClearList");
const confirmationModal = document.getElementById("confirmationModal");
const cancelButton = document.getElementById("cancelButton");
const confirmButton = document.getElementById("confirmButton");

fetch("https://api-list-iy8c.vercel.app/afficher")
  .then((response) => response.json())
  .then((data) => {
    const TabList = data.TabList;
    refreshList(TabList);
    console.log(TabList); // Accéder aux données JSON
    console.log("Tableau récupéré depuis l'API :", data.TabList);
  })
  .catch((error) =>
    console.error("Erreur lors du chargement du fichier JSON :", error)
  );
