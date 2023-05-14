/**Costanti */
const prodName = document.getElementById("name");
const prodDescription = document.getElementById("description");
const prodBrand = document.getElementById("brand");
const prodImageUrl = document.getElementById("imageUrl");
const prodPrice = document.getElementById("price");
const inputButton = document.getElementById("inputButton");
const objContainer = document.getElementById("objContainer");
const idSearch = document.getElementById("idInput");
const searchButton = document.getElementById("searchButton");
const inputForm = document.getElementById("inputForm");
const searchForm = document.getElementById("searchForm");
const modifyButton = document.getElementById("modifyButton");
const backButton = document.getElementById("backButton");
const dinamicTitle = document.getElementById("dinamicTitle");
const span = document.getElementsByClassName("close")[(0)];
const span2 = document.getElementsByClassName("close")[(1)];
const modal = document.getElementById("infoModal");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const deleteModalBtn = document.getElementById("deleteModalBtn");
const closeDeleteModalBtn = document.getElementById("closeDeleteModalBtn");
const deleteModal = document.getElementById("deleteModal");
const deleteModalTitle = document.getElementById("deleteModalTitle");
const deleteModalText = document.getElementById("deleteModalText");
const resetButton = document.getElementById("resetButton");
const url = "https://striveschool-api.herokuapp.com/api/product/";
const apiKey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDVkOGIyZjg4Zjc0MDAwMTQyODc0MTAiLCJpYXQiOjE2ODM4NTIwNzksImV4cCI6MTY4NTA2MTY3OX0.jxr2SpjKDwYilHZUG0JnZh5qIm_u-JJT1fxbaoO36aM";

/**Funzione per creare oggetti */

inputButton.onclick = function (event) {
  event.preventDefault();
  sessionStorage.clear();
  const data = {
    name: prodName.value,
    description: prodDescription.value,
    brand: prodBrand.value,
    imageUrl: prodImageUrl.value,
    price: prodPrice.value,
  };
  if (
    data.name !== "" &&
    data.description !== "" &&
    data.brand !== "" &&
    data.imageUrl !== "" &&
    data.price !== ""
  ) {
    fetch(url, {
      method: "POST",
      headers: {
        Authorization: apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(
        (response) => response.json(),
        (objContainer.innerHTML = ""),
        (prodName.value = ""),
        (prodDescription.value = ""),
        (prodBrand.value = ""),
        (prodImageUrl.value = ""),
        (prodPrice.value = ""),
        (idSearch.value = ""),
        (modalTitle.textContent = "Complimenti!"),
        (modalText.textContent = "Oggetto caricato con successo"),
        (modal.style.display = "block")
      )
      .then(fetchAndDisplay());
  } else {
    (modalTitle.textContent = "Attenzione"),
      (modalText.textContent =
        "Inserisci tutti i valori di input per creare un oggetto"),
      (modal.style.display = "block");
  }
};

/**Funzione onload */

window.onload = function () {
  $('[data-toggle="tooltip"]').tooltip();
  if (sessionStorage.getItem("selectedProduct")) {
    searchButton.disabled = true;
    let objAsString = JSON.parse(sessionStorage.getItem("selectedProduct"));
    idSearch.value = objAsString;
    const url2 =
      "https://striveschool-api.herokuapp.com/api/product/" + objAsString;
    fetch(url2, {
      method: "GET",
      headers: {
        Authorization: apiKey,
      },
    })
      .then((raw) => {
        return raw.json();
      })
      .then((dato) => {
        console.log(dato);
        displayIdObj(dato);
        inputButton.disabled = true;
        modifyButton.disabled = false;
        modifyButton.hidden = false;
        backButton.disabled = false;
        backButton.hidden = false;
      })
      .catch((error) => {
        alert(error.message);
      });
  } else {
    fetchAndDisplay();
  }
};

const fetchAndDisplay = function () {
  fetch(url, {
    method: "GET",
    headers: {
      Authorization: apiKey,
    },
  })
    .then((raw) => {
      return raw.json();
    })
    .then((dati) => {
      displayObj(dati);
    });
};

/**Funzione display oggetti */

function displayObj(objects) {
  objects.forEach((object) => {
    const objDiv = document.createElement("div");
    objDiv.className = "objDiv";
    objDiv.classList.add("d-flex", "col-12", "col-lg-6");

    const imageDiv = document.createElement("div");
    imageDiv.className = "imageDiv";

    const objImage = document.createElement("img");
    objImage.src = object.imageUrl;
    objImage.alt = object.description + object.brand + object.name;
    objImage.className = "objImage";

    const infoDiv = document.createElement("div");
    infoDiv.className = "infoDiv";
    infoDiv.classList.add("d-flex", "flex-column", "justify-content-evenly");

    const objName = document.createElement("h3");
    objName.textContent = "Name: " + object.name;

    const objBrand = document.createElement("p");
    objBrand.textContent = "Brand: " + object.brand;

    const objDescription = document.createElement("p");
    objDescription.textContent = "Description: " + object.description;

    const objPrice = document.createElement("p");
    objPrice.textContent = "Price: " + object.price + "€";

    const objId = document.createElement("p");

    const idAnchor = document.createElement("a");
    idAnchor.text = "ID: " + object._id;
    idAnchor.href = "#inputButton";
    idAnchor.className = "anchor";

    objDiv.appendChild(imageDiv);
    imageDiv.appendChild(objImage);
    objDiv.appendChild(infoDiv);
    infoDiv.appendChild(objName);
    infoDiv.appendChild(objBrand);
    infoDiv.appendChild(objDescription);
    infoDiv.appendChild(objPrice);
    infoDiv.appendChild(objId);
    objId.append(idAnchor);
    objContainer.appendChild(objDiv);

    dinamicTitle.textContent = "Crea un Nuovo Oggetto!";

    /**Funzione per inserire ID oggetto nel form IdInput */

    idAnchor.onclick = function () {
      idSearch.value = object._id;
    };
  });
}

/**Funzione Search By Id */
searchButton.onclick = function (event) {
  event.preventDefault();

  if (searchForm.checkValidity()) {
    const url2 =
      "https://striveschool-api.herokuapp.com/api/product/" + idSearch.value;
    console.log(url2);
    fetch(url2, {
      method: "GET",
      headers: {
        Authorization: apiKey,
      },
    })
      .then((raw) => {
        if (!raw.ok) {
          throw new Error("Nessun prodotto corrisponde all'ID inserita.");
        }
        return raw.json();
      })
      .then((dato) => {
        console.log(dato);
        objContainer.innerHTML = "";
        displayIdObj(dato);
        inputButton.disabled = true;
        modifyButton.disabled = false;
        modifyButton.hidden = false;
        backButton.disabled = false;
        backButton.hidden = false;
      })
      .catch((error) => {
        (modalTitle.textContent = "Attenzione"),
          (modalText.textContent = error.message),
          (modal.style.display = "block");
      });
  } else {
    (modalTitle.textContent = "Attenzione"),
      (modalText.textContent =
        "Inserisci un ID o clicca sull'ID dell'oggetto desiderato per passare alla modalità modifica/elimina"),
      (modal.style.display = "block");
    return;
  }
};

/**Funzione Display oggetto selezionato */
function displayIdObj(object) {
  const objDiv = document.createElement("div");
  objDiv.className = "objDiv";
  objDiv.classList.add("d-flex", "col-12", "col-lg-6");

  const objImage = document.createElement("img");
  objImage.src = object.imageUrl;
  objImage.alt = object.description + object.brand + object.name;
  objImage.className = "objImage";

  const infoDiv = document.createElement("div");
  infoDiv.className = "infoDiv";
  infoDiv.classList.add("d-flex", "flex-column", "justify-content-evenly");

  const objName = document.createElement("h3");
  objName.textContent = "Name: " + object.name;

  const objBrand = document.createElement("p");
  objBrand.textContent = "Brand: " + object.brand;

  const objDescription = document.createElement("p");
  objDescription.textContent = "Description: " + object.description;

  const objPrice = document.createElement("p");
  objPrice.textContent = "Price: " + object.price + "€";

  const objId = document.createElement("p");
  objId.textContent = "ID: " + object._id;

  const objDeleteButton = document.createElement("button");
  objDeleteButton.type = "button";
  objDeleteButton.classList.add("button");
  objDeleteButton.textContent = "Rimuovi";

  objDiv.appendChild(objImage);
  objDiv.appendChild(infoDiv);
  infoDiv.appendChild(objName);
  infoDiv.appendChild(objBrand);
  infoDiv.appendChild(objDescription);
  infoDiv.appendChild(objPrice);
  infoDiv.appendChild(objId);

  infoDiv.appendChild(objDeleteButton);

  objContainer.appendChild(objDiv);

  prodName.value = object.name;
  prodDescription.value = object.description;
  prodBrand.value = object.brand;
  prodImageUrl.value = object.imageUrl;
  prodPrice.value = object.price;
  dinamicTitle.textContent = "Modifica il Tuo Oggetto!";

  /**Funzione Delete Button */
  objDeleteButton.onclick = function () {
    deleteModalTitle.textContent = "Attenzione";
    deleteModalText.textContent = "Sei sicuro di voler rimuovere l'oggetto?";
    deleteModalBtn.textContent = 'Rimuovi'
    deleteModal.style.display = "block";
    deleteModalBtn.onclick = function () {
      deleteModal.style.display = "none";
      sessionStorage.clear();
      const url2 =
        "https://striveschool-api.herokuapp.com/api/product/" + idSearch.value;
      fetch(url2, {
        method: "DELETE",
        headers: {
          Authorization: apiKey,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              "Errore durante la rimozione dell'oggetto. Controllare che l'ID sia inserita nel corrispettivo campo di input"
            );
          }
          (modalTitle.textContent = "Complimenti"),
            (modalText.textContent = "Oggetto rimosso con successo"),
            (modal.style.display = "block");
          (objContainer.innerHTML = ""), fetchAndDisplay();
          idSearch.value = "";
          idSearch.value = "";
          prodName.value = "";
          prodDescription.value = "";
          prodBrand.value = "";
          prodImageUrl.value = "";
          prodPrice.value = "";
          inputButton.disabled = false;
          modifyButton.disabled = true;
          modifyButton.hidden = true;
          backButton.disabled = true;
          backButton.hidden = true;
          searchButton.disabled = false;
          fetchAndDisplay();
          return;
        })
        .catch((error) => {
          console.error(error);
          (modalTitle.textContent = "Attenzione"),
            (modalText.textContent = error),
            (modal.style.display = "block");
        });
    };
  };
}

/**Funzione Modify Button */
modifyButton.onclick = function (event) {
  sessionStorage.clear();
  const url2 =
    "https://striveschool-api.herokuapp.com/api/product/" + idSearch.value;
  event.preventDefault();
  const data = {
    name: prodName.value,
    description: prodDescription.value,
    brand: prodBrand.value,
    imageUrl: prodImageUrl.value,
    price: prodPrice.value,
  };
  if (
    data.name !== "" &&
    data.description !== "" &&
    data.brand !== "" &&
    data.imageUrl !== "" &&
    data.price !== ""
  ) {
    fetch(url2, {
      method: "PUT",
      headers: {
        Authorization: apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(
      (response) => response.json(),
      (objContainer.innerHTML = ""),
      (prodName.value = ""),
      (prodDescription.value = ""),
      (prodBrand.value = ""),
      (prodImageUrl.value = ""),
      (prodPrice.value = ""),
      (idSearch.value = ""),
      (inputButton.disabled = false),
      (modifyButton.disabled = true),
      (modifyButton.hidden = true),
      (backButton.disabled = true),
      (backButton.hidden = true),
      (searchButton.disabled = false),
      (modalTitle.textContent = "Complimenti"),
      (modalText.textContent = "Oggetto modificato con successo"),
      (modal.style.display = "block"),
      fetchAndDisplay()
    );
  } else {
    (modalTitle.textContent = "Attenzione"),
      (modalText.textContent =
        "Inserisci tutti i valori di input per modificare un oggetto"),
      (modal.style.display = "block");
  }
};

/**Funzione Back Buttone */

backButton.onclick = function (event) {
  sessionStorage.clear();
  event.preventDefault();
  objContainer.innerHTML = "";
  idSearch.value = "";
  prodName.value = "";
  prodDescription.value = "";
  prodBrand.value = "";
  prodImageUrl.value = "";
  prodPrice.value = "";
  inputButton.disabled = false;
  modifyButton.disabled = true;
  modifyButton.hidden = true;
  backButton.disabled = true;
  backButton.hidden = true;
  searchButton.disabled = false;
  fetchAndDisplay();
};

/**Funzione chiusura modali */
span.onclick = function () {
  modal.style.display = "none";
};
span2.onclick = function () {
  deleteModal.style.display = "none";
};
closeDeleteModalBtn.onclick = function () {
  deleteModal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
  if (event.target == deleteModal) {
    deleteModal.style.display = "none";
  }
};

/**Funzione reset button */

resetButton.onclick = function () {
  deleteModalTitle.textContent = "Attenzione";
  deleteModalText.textContent = "Sei sicuro di voler resettare il form?";
  deleteModalBtn.textContent = 'Reset';
  deleteModal.style.display = "block";
  deleteModalBtn.onclick = function () {
    deleteModal.style.display = "none";
    prodName.value = "";
    prodDescription.value = "";
    prodBrand.value = "";
    prodImageUrl.value = "";
    prodPrice.value = "";
  };
};
