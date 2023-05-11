const selectedItem = JSON.parse(sessionStorage.getItem("selectedItem"));
console.log(selectedItem);
const pictureContainer = document.getElementById("pictureContainer");
const infoContainer = document.getElementById("infoContainer");
const apiKey = "eWk2kk7QevGUr4V4lGaX2fuuMZBBHVc4QV2DuFKVwaRyNGbvqWhY9loA";

const url5 = "https://api.pexels.com/v1/photos/" + selectedItem;
console.log(url5);

window.onload = function () {
  fetch(url5, {
    method: "GET",
    headers: {
      Authorization: apiKey,
    },
  })
    .then((raw) => {
      return raw.json();
    })
    .then((data) => {
      displaySelected(data);
    });
};


function displaySelected(object) {
  const picture = document.createElement("img");
  picture.src = object.src.landscape;
  picture.alt = object.alt;
  picture.classList.add('picture')

  const author = document.createElement("h3");
  author.textContent = object.photographer;

  const authorPage = document.createElement("a");
  authorPage.textContent = object.photographer_url;
  authorPage.href = object.photographer_url;
  authorPage.classList.add('text-white')


  pictureContainer.appendChild(picture);
  infoContainer.appendChild(author);
  infoContainer.appendChild(authorPage);
  
  document.body.style.backgroundColor = object.avg_color;
  
}
