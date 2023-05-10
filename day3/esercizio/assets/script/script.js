const url = "https://striveschool-api.herokuapp.com/books";
const bookContainer = document.getElementById("bookContainer");
const myCart = document.getElementById("myCart");
const total = document.getElementById("total");
let cartArray = [];

/**Funzione onload */
window.onload = function () {
  fetch(url)
    .then((raw) => {
      return raw.json();
    })
    .then((dati) => displayBooks(dati));
  /* funzione per mostrare a display elementi salvati nel localStorage al caricamento*/
  if (localStorage.getItem("cartArray")) {
    let arrayAsString = localStorage.getItem("cartArray");
    let oldLibrary = JSON.parse(arrayAsString);
    cartArray = oldLibrary;

    cartArray.forEach((book) => {
      const cartBook = document.createElement("div");
      cartBook.className = "cartBook";
      cartBook.classList.add("mb-1", 'p-1', 'align-items-center');

      const cartTitle = document.createElement("li");
      cartTitle.textContent = book.title;
      cartTitle.className = "col-6";

      const cartPrice = document.createElement("li");
      cartPrice.textContent = `Prezzo: $${book.price}`;
      cartPrice.className = "col-3";

      const removeCartButton = document.createElement("button");
      removeCartButton.className = "button";
      removeCartButton.textContent = "Rimuovi";
      removeCartButton.type = "button";

      cartBook.appendChild(cartTitle);
      cartBook.appendChild(cartPrice);
      cartBook.appendChild(removeCartButton);
      myCart.appendChild(cartBook);

      somma(cartArray);

      removeCartButton.onclick = function() {
        cartBook.remove();
        const index = cartArray.indexOf(book);
        if (index > -1) {
          cartArray.splice(index, 1);
          somma(cartArray);
          localStorage.setItem("cartArray", JSON.stringify(cartArray));
        }
      }
    });
  }
};

function displayBooks(books) {
  books.forEach((book) => {
    /**Funzione per display oggetti */
    const bookDiv = document.createElement("div");
    bookDiv.className = "book";
    bookDiv.classList.add("col-4", "col-lg-3");

    const cardDiv = document.createElement("div");
    cardDiv.className = "card";

    const cardImageDiv = document.createElement("div");
    cardImageDiv.className = "cardImage";

    const cardBodyDiv = document.createElement("div");
    cardBodyDiv.className = "cardBody";

    const infoDiv = document.createElement('div');
    infoDiv.className = 'infoDiv';

    const buttonDiv = document.createElement("div");
    buttonDiv.className = "buttonBody";

    const image = document.createElement("img");
    image.src = book.img;
    image.alt = book.title;
    image.className = "image";
    image.classList.add("img-fluid", "card-img-top");

    const title = document.createElement("h3");
    title.textContent = `Titolo: ${book.title}`;

    const price = document.createElement("p");
    price.textContent = `Prezzo: $${book.price}`;
    
    const removeButton = document.createElement("button");
    removeButton.className = "button";
    removeButton.textContent = "Scarta";
    removeButton.type = "button";

    const saveButton = document.createElement("button");
    saveButton.className = "button";
    saveButton.textContent = "Compra ora";
    saveButton.type = "button";

    bookDiv.appendChild(cardDiv);
    cardDiv.appendChild(cardImageDiv);
    cardImageDiv.appendChild(image);
    cardDiv.appendChild(cardBodyDiv);
    cardBodyDiv.appendChild(infoDiv);
    infoDiv.appendChild(title);
    infoDiv.appendChild(price);
    cardBodyDiv.appendChild(buttonDiv);
    buttonDiv.appendChild(removeButton);
    buttonDiv.appendChild(saveButton);

    bookContainer.appendChild(bookDiv);

    /**Funzione remove Button */
    removeButton.onclick = function () {
      bookDiv.remove();
    };

    /**Funzione save Button con display oggetti nel carrello*/
    saveButton.onclick = function () {
      cartArray.push(book);

      const cartBook = document.createElement("div");
      cartBook.className = "cartBook";
      cartBook.classList.add("mb-1", 'p-1', 'align-items-center');

      const cartTitle = document.createElement("li");
      cartTitle.textContent = book.title;
      cartTitle.className = "col-6";

      const cartPrice = document.createElement("li");
      cartPrice.textContent = `Prezzo: $${book.price}`;
      cartPrice.className = "col-3";

      const removeCartButton = document.createElement("button");
      removeCartButton.className = "button";
      removeCartButton.textContent = "Rimuovi";
      removeCartButton.type = "button";

      cartBook.appendChild(cartTitle);
      cartBook.appendChild(cartPrice);
      cartBook.appendChild(removeCartButton);
      myCart.appendChild(cartBook);

      saveCart();
      somma(cartArray);

      removeCartButton.onclick = function() {
        cartBook.remove();
        const index = cartArray.indexOf(book);
        if (index > -1) {
          cartArray.splice(index, 1);
          somma(cartArray);
          localStorage.setItem("cartArray", JSON.stringify(cartArray));
        }
      }
    };
  });
}
/**Local storage set item al save */
function saveCart() {
  const arrayAsString = JSON.stringify(cartArray);
  localStorage.setItem("cartArray", arrayAsString);
}

/**Funzione per sommare il totale */
function somma(array) {
  let sum = 0;
  for (let i = 0; i < array.length; i++) {
    sum += (array[i].price);
  }
  total.innerText = sum + " $";
}

