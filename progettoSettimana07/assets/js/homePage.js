const url = "https://striveschool-api.herokuapp.com/api/product/";
const apiKey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDVkOGIyZjg4Zjc0MDAwMTQyODc0MTAiLCJpYXQiOjE2ODM4NTIwNzksImV4cCI6MTY4NTA2MTY3OX0.jxr2SpjKDwYilHZUG0JnZh5qIm_u-JJT1fxbaoO36aM";
const homeObjContainer = document.getElementById("homeObjContainer");

/**Funzione Display Oggetti*/
window.onload = function () {
  showSpinner();
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
      hideSpinner();
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

    const homeModifyButton = document.createElement("button");
    homeModifyButton.type = "button";
    homeModifyButton.classList.add("button");
    homeModifyButton.textContent = "Modifica";

    const findMoreButton = document.createElement("button");
    findMoreButton.type = "button";
    findMoreButton.classList.add("button");
    findMoreButton.textContent = "Scopri di più";

    objDiv.appendChild(imageDiv);
    imageDiv.appendChild(objImage);
    objDiv.appendChild(infoDiv);
    infoDiv.appendChild(objName);
    infoDiv.appendChild(objBrand);
    infoDiv.appendChild(objDescription);
    infoDiv.appendChild(objPrice);
    infoDiv.appendChild(homeModifyButton);
    infoDiv.appendChild(findMoreButton);
    homeObjContainer.appendChild(objDiv);

    /**Funzione Modify Button */

    homeModifyButton.onclick = function () {
      const selectedProduct = object._id;

      const objAsString = JSON.stringify(selectedProduct);
      sessionStorage.setItem("selectedProduct", objAsString);

      window.location.href = "./backOffice.html";
    };

    /**Funzione Find More Button */

    findMoreButton.onclick = function () {
      const selectedProduct = object._id;

      const objAsString = JSON.stringify(selectedProduct);
      sessionStorage.setItem("selectedProduct", objAsString);

      window.location.href = "./detailPage.html";
    };
  });
}

/**Funzione Spinner */

const spinner = document.getElementById("spinner");

function showSpinner() {
  spinner.style.display = "block";
}

function hideSpinner() {
  spinner.style.display = "none";
}
