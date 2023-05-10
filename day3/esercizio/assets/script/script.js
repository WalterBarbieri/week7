const url = "https://striveschool-api.herokuapp.com/books";
window.onload = function () {
  fetch(url)
    .then((raw) => {
      return raw.json();
    })
    .then((dati) => displayBooks(dati));
  if (localStorage.getItem("cartArray")) {
    let arrayAsString = localStorage.getItem("cartArray");
    let newProduct = JSON.parse(arrayAsString);
    myCartList = newProduct;
  }
};
const bookContainer = document.getElementById("bookContainer");
const myCart = document.getElementById('myCart');
let cartArray = [];
let myCartArray = [];

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
    price.textContent = `Prezzo: ${book.price}`;

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
    cardBodyDiv.appendChild(title);
    cardBodyDiv.appendChild(price);
    cardBodyDiv.appendChild(buttonDiv);
    buttonDiv.appendChild(removeButton);
    buttonDiv.appendChild(saveButton);

    bookContainer.appendChild(bookDiv);

    /**Funzione remove Button */
    removeButton.onclick = function () {
      bookDiv.remove();
    };

    /**Funzione save Button */
    saveButton.onclick = function () {
      cartArray.push(book);
      
      const cartBook = document.createElement('div');
      cartBook.className = 'cartBook';
      
      const cartTitle = document.createElement('li');
      cartTitle.textContent = book.title;

      const cartPrice = document.createElement('li');
      cartPrice.textContent = book.price;

      cartBook.appendChild(cartTitle);
      cartBook.appendChild(cartPrice);
      myCart.appendChild(cartBook);  

      alert("Prodotto aggiunto a carrello");
      saveCart();
    };
  });
}

function saveCart() {
  const arrayAsString = JSON.stringify(cartArray);
  localStorage.setItem("cartArray", arrayAsString);
}
