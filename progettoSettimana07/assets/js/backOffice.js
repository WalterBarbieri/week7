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
const url = "https://striveschool-api.herokuapp.com/api/product/";
const apiKey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDVkOGIyZjg4Zjc0MDAwMTQyODc0MTAiLCJpYXQiOjE2ODM4NTIwNzksImV4cCI6MTY4NTA2MTY3OX0.jxr2SpjKDwYilHZUG0JnZh5qIm_u-JJT1fxbaoO36aM";

/**Funzione per creare oggetti */

inputButton.onclick = function (event) {
  event.preventDefault();
  const data = {
    name: prodName.value,
    description: prodDescription.value,
    brand: prodBrand.value,
    imageUrl: prodImageUrl.value,
    price: prodPrice.value,
  };

  fetch(url, {
    method: "POST",
    headers: {
      Authorization: apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(
    (response) => response.json(),
    (objContainer.innerHTML = ""),
    fetchAndDisplay(),
    (prodName.value = ""),
    (prodDescription.value = ""),
    (prodBrand.value = ""),
    (prodImageUrl.value = ""),
    (prodPrice.value = "")
  );
};

/**Funzione display oggetti */
window.onload = function () {
  fetchAndDisplay();
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
      console.log(dati);
      displayObj(dati);
    });
};

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
    idAnchor.href = "#idInput";
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

    /**Funzione per inserire ID oggetto nel form IdInput */

    idAnchor.onclick = function () {
      idSearch.value = object._id;
    };
  });
}

/**Funzione Search By Id */
searchButton.onclick = function (event) {
  event.preventDefault();
  inputButton.disabled = true;
  modifyButton.disabled = false;
  modifyButton.hidden = false;
  backButton.disabled = false;
  backButton.hidden = false;

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
          throw new Error(
            "Attenzione! Nessun prodotto corrisponde all'ID inserita."
          );
        }
        return raw.json();
      })
      .then((dato) => {
        console.log(dato);
        objContainer.innerHTML = "";
        displayIdObj(dato);
      })
      .catch((error) => {
        alert(error.message);
      });
  } else {
    alert("Inserire un ID");
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

  /**Funzione Delete Button */
  objDeleteButton.onclick = function () {
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
          throw new Error("Errore durante la rimozione dell'oggetto.");
        }
        console.log("Oggetto rimosso con successo."),
          (objContainer.innerHTML = ""),
          fetchAndDisplay();
        idSearch.value = "";
        inputButton.disabled = false;
        modifyButton.disabled = true;
        modifyButton.hidden = true;
        backButton.disabled = true;
        backButton.hidden = true;
        return;
      })
      .catch((error) => {
        console.error(error);
      });
  };
}

/**Funzione Modify Button */
modifyButton.onclick = function (event) {
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
    fetchAndDisplay(),
    (prodName.value = ""),
    (prodDescription.value = ""),
    (prodBrand.value = ""),
    (prodImageUrl.value = ""),
    (prodPrice.value = ""),
    (inputButton.disabled = false),
    (modifyButton.disabled = true),
    (modifyButton.hidden = true),
    (backButton.disabled = true),
    (backButton.hidden = true)
  );
};

/**Funzione Back Buttone */

backButton.onclick = function (event) {
  event.preventDefault();
  objContainer.innerHTML = "";
  idSearch.value = "";
  inputButton.disabled = false;
  modifyButton.disabled = true;
  modifyButton.hidden = true;
  backButton.disabled = true;
  backButton.hidden = true;
  fetchAndDisplay();
};
