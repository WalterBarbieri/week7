let myCartList = [];
let displayMyCart = document.getElementById("myCart");
let totalDisplay = document.getElementById("total");
window.onload = function () {
  if (localStorage.getItem("cartArray")) {
    let arrayAsString = localStorage.getItem("cartArray");
    let newProduct = JSON.parse(arrayAsString);
    myCartList = newProduct;

    myCartList.forEach((product) => {
      const productDiv = document.createElement("div");
      productDiv.className = "product";

      const mainSectionDiv = document.createElement("div");
      mainSectionDiv.className = "mainSection";

      const mainInfoDiv = document.createElement("div");
      mainInfoDiv.className = "mainInfo";

      const thumbnail = document.createElement("img");
      thumbnail.src = product.thumbnail;
      thumbnail.alt = product.title;
      thumbnail.className = "thumbnail";

      const title = document.createElement("h3");
      title.textContent = product.title;

      const price = document.createElement("p");
      price.textContent = `Price: $ ${product.price}`;

      const discount = document.createElement("p");
      discount.textContent = `Discount: ${product.discountPercentage}%`;

      const button = document.createElement("button");
      button.textContent = "Rimuovi dal carrello";
      button.type = "button";
      button.className = "button";
      button.id = product.id;

      productDiv.appendChild(mainSectionDiv);
      mainSectionDiv.appendChild(thumbnail);
      mainSectionDiv.appendChild(mainInfoDiv);
      mainInfoDiv.appendChild(title);
      mainInfoDiv.appendChild(price);
      mainInfoDiv.appendChild(discount);
      productDiv.appendChild(button);
      displayMyCart.appendChild(productDiv);

      somma(myCartList);

      button.onclick = function () {
        productDiv.remove();
        const index = myCartList.indexOf(product);
        if (index > -1) {
          myCartList.splice(index, 1);
          somma(myCartList);
          localStorage.setItem("cartArray", JSON.stringify(myCartList));
        }
      };
    });
  }
};

function somma(array) {
  let sum = 0;
  for (let i = 0; i < array.length; i++) {
    sum += array[i].price;
  }
  totalDisplay.innerText = sum + " $";
}
