function refreshList(TabList) {
  // Supprimer tous les éléments existants de la liste HTML
  List.innerHTML = "";

  TabList.forEach((item) => {
    // Créer un élément div
    const div = document.createElement("div");
    div.classList.add("Element");

    // Créer un élément paragraphe
    const paragraph = document.createElement("p");
    paragraph.textContent = item;

    // Créer un élément bouton
    const button = document.createElement("button");
    button.type = "button";
    button.classList.add("DeleteBtn");
    button.innerHTML = "<i class='fa-solid fa-trash-can'>";
    button.style.width = "0%";

    div.addEventListener("click", function () {
      // Modifiez la largeur en fonction de l'état actuel de la largeur
      if (button.style.width === "0%") {
        button.style.width = "20%"; // Si la largeur est à 0%, définissez-la à 20%
      } else {
        button.style.width = "0%"; // Sinon, définissez la largeur à 0%
      }
    });

    document.addEventListener("click", function (event) {
      if (!div.contains(event.target)) {
        button.style.width = "0%"; // Définir la largeur à 0% lorsque le bouton est masqué
      }
    });

    // Ajouter un écouteur d'événement au bouton
    button.addEventListener("click", function () {
      // Trouver l'index de l'élément dans le tableau
      const indexToRemove = TabList.indexOf(item);

      // Supprimer l'élément du tableau sans vérification
      TabList.splice(indexToRemove, 1);

      // Envoyer la suppression au serveur
      sendDeleteRequest(item);

      // Actualiser le chargement du document JSON après suppression
      refreshList(TabList);
    });

    // Ajouter le paragraphe et le bouton à l'élément div
    div.appendChild(paragraph);
    div.appendChild(button);

    // Ajouter l'élément div à la liste
    List.appendChild(div);
    console.log(window.getComputedStyle(button).transition);

    ClearList.addEventListener("click", () => {
      confirmationModal.style.display = "block";
    });

    // Ajoutez un écouteur d'événements pour fermer la boîte de dialogue lorsque le bouton Annuler est cliqué
    cancelButton.addEventListener("click", () => {
      confirmationModal.style.display = "none";
    });

    // Ajoutez un écouteur d'événements pour confirmer la suppression de la liste et masquer la boîte de dialogue
    confirmButton.addEventListener("click", () => {
      deleteAllItemsFromAPI();
      // Masquer la boîte de dialogue
      confirmationModal.style.display = "none";

      // Actualiser le chargement du document JSON après suppression
      List.innerHTML = "";
      console.log(TabList);
    });
  });
}

// Appel initial pour charger le document JSON

const sendDeleteRequest = (TabList, item) => {
  fetch(`https://api-list-iy8c.vercel.app/supprimer/${item}`, {
    method: "DELETE", // Méthode HTTP DELETE pour supprimer l'élément
    headers: {
      "Content-Type": "application/json", // Indique que le contenu envoyé est JSON
    },
    body: JSON.stringify({ items: TabList }),
  })
    .then((response) => {
      console.log(response); // Afficher la réponse pour déboguer
      if (!response.ok) {
        throw new Error("La requête de suppression a échoué.");
      }
      console.log("Suppression réussie.");
    })
    .catch((error) => {
      console.error("Erreur lors de la suppression :", error);
    });
};

function deleteAllItemsFromAPI() {
  fetch("https://api-list-iy8c.vercel.app/supprimer-tout", {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("La requête de suppression a échoué.");
      }
      console.log("Suppression réussie.");
      // Actualiser le chargement du document JSON après suppression
    })
    .catch((error) => {
      console.error("Erreur lors de la suppression de la liste :", error);
    });
}
