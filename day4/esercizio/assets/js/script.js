/**Costanti */

const apiKey = "eWk2kk7QevGUr4V4lGaX2fuuMZBBHVc4QV2DuFKVwaRyNGbvqWhY9loA";
const url = "https://api.pexels.com/v1/search?query=dog";
const url2 = "https://api.pexels.com/v1/search?query=cat";
const url3 = "https://api.pexels.com/v1/search?query=horse";

const photoContainer = document.getElementById("photoContainer");
const loadBtn1 = document.getElementById("load1");
const loadBtn2 = document.getElementById("load2");
const input = document.getElementById("inputField");
const inputButton = document.getElementById("inputButton");

/**FUnzione onload */
window.onload = function () {
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
      displayImages(dati.photos);
      console.log(dati);
    });
};

/**Funzione display cards */
function displayImages(images) {
  images.forEach((image) => {
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("cardContainer", "col-md-4");

    const card = document.createElement("div");
    card.classList.add("card", "mb-4", "shadow-sm");

    const imgContainer = document.createElement("div");
    imgContainer.classList.add("d-flex", "justify-content-center");

    const imageAnchor = document.createElement('a');
    imageAnchor.href = "./Detail-template.html";

    const img = document.createElement("img");
    img.className = "img";
    img.src = image.src.medium;
    img.alt = image.alt;

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    const titleAnchor = document.createElement('a');
    imageAnchor.href = "./Detail-template.html";

    const title = document.createElement("h5");
    title.className = "card-title";
    title.textContent = image.photographer;

    const text = document.createElement("p");
    text.className = "card-text";
    text.textContent =
      "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer";

    const cardSection = document.createElement("div");
    cardSection.classList.add(
      "cardSection",
      "d-flex",
      "justify-content-between",
      "align-items-center"
    );

    const buttonContainer = document.createElement("div");
    buttonContainer.className = "btn-group";

    const button1 = document.createElement("button");
    button1.type = "button";
    button1.classList.add("btn", "btn-sm", "btn-outline-secondary");
    button1.textContent = "View";

    const button2 = document.createElement("button");
    button2.type = "button";
    button2.classList.add("btn", "btn-sm", "btn-outline-secondary");
    button2.textContent = "Hide";

    const small = document.createElement("small");
    small.className = "text-muted";
    small.textContent = image.id;

    cardContainer.appendChild(card);
    card.appendChild(imgContainer);
    imgContainer.appendChild(imageAnchor);
    imageAnchor.appendChild(img);
    card.appendChild(cardBody);
    cardBody.appendChild(title);
    cardBody.appendChild(text);
    cardBody.appendChild(cardSection);
    cardSection.appendChild(buttonContainer);
    buttonContainer.appendChild(button1);
    buttonContainer.appendChild(button2);
    cardSection.appendChild(small);
    photoContainer.appendChild(cardContainer);
    
    /** Funzione bottono Hide */
    button2.onclick = function () {
      cardContainer.remove();
    };

    /**Funzione anchor */

    imageAnchor.onclick = function() {
        const selectedImage = image.id;
    
        const objAsString = JSON.stringify(selectedImage);
        sessionStorage.setItem('selectedItem', objAsString);
    }
  });
}

/**Funzione button load images*/

loadBtn1.onclick = function () {
  fetch(url2, {
    method: "GET",
    headers: {
      Authorization: apiKey,
    },
  })
    .then((raw) => {
      return raw.json();
    })
    .then((gatti) => {
      photoContainer.innerHTML = "";
      displayImages(gatti.photos);
    });
}


loadBtn2.onclick = function () {
  fetch(url3, {
    method: "GET",
    headers: {
      Authorization: apiKey,
    },
  })
    .then((raw) => {
      return raw.json();
    })
    .then((cavalli) => {
      photoContainer.innerHTML = "";
      displayImages(cavalli.photos);
    });
}

/** Function input search */

inputButton.onclick = function() {
    let stringToArray = input.value.replaceAll(/ /g, '%20');    
    const url4 = "https://api.pexels.com/v1/search?query=" + stringToArray;
    fetch(url4, {
        method: "GET",
        headers: {
          Authorization: apiKey,
        },
      })
        .then((raw) => {
          return raw.json();
        })
        .then((random) => {
          photoContainer.innerHTML = "";
          displayImages(random.photos);
        });    
}