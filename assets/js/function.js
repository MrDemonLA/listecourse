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
    div.className = "DisplayOff";
    console.log("jai cliquer");
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
    // Mettez votre logique de suppression de liste ici
    div.className = "DisplayOff";
    // Masquer la boîte de dialogue
    confirmationModal.style.display = "none";
  });
});
