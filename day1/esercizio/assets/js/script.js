/** ESERCIZIO 1*/

class User {
  constructor(firstName, lastName, age, location) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.location = location;
  }

  static compareAge(user1, user2) {
    if (user1.age > user2.age) {
      return `${user1.firstName} ${user1.lastName} is older than ${user2.firstName} ${user2.lastName}. This imply that people from ${user1.location} are older than people from ${user2.location}`;
    } else if (user1.age < user2.age) {
      return `${user1.firstName} ${user1.lastName} is younger than ${user2.firstName} ${user2.lastName}. This imply that people from ${user1.location} are younger than people from ${user2.location}`;
    } else {
      return `${user1.firstName} ${user1.lastName} and ${user2.firstName} ${user2.lastName} are the same age. This imply that people from ${user1.location} are as old as people from ${user2.location}`;
    }
  }
}

const utente1 = new User("Gianni", "Pallino", 27, "Forlì");
const utente2 = new User("Nino", "Boccino", 19, "Cologno al Serio");
const utente3 = new User("Salta", "Lacorda", 41, "Tripalle");
const utente4 = new User("Gino", "Bevilacqua", 61, "Troina");

const lista = document.getElementById("listaUser");
const comparation1 = document.createElement("li");
comparation1.textContent = User.compareAge(utente2, utente3);
lista.appendChild(comparation1);

const comparation2 = document.createElement("li");
comparation2.textContent = User.compareAge(utente4, utente4);
lista.appendChild(comparation2);

const comparation3 = document.createElement("li");
comparation3.textContent = User.compareAge(utente3, utente1);
lista.appendChild(comparation3);

console.log(User.compareAge(utente1, utente2));
console.log(User.compareAge(utente3, utente4));
console.log(User.compareAge(utente4, utente1));

/**ESERCIZIO 2 */

/*
class Pet {
  constructor(petName, ownerName, species, breed) {
    this.petName = petName;
    this.ownerName = ownerName;
    this.species = species;
    this.breed = breed;
  }
  static compareOwner(pet1, pet2) {
    if (pet1.ownerName === pet2.ownerName) {
      return true;
    } else {
      return false;
    }
  }
}

const pet1 = new Pet("Fischietto", "Gianni", "Gatto", "Bastardo");
const pet2 = new Pet('Atman', 'Rasta', 'Cane', 'Bastardo');
const pet3 = new Pet("Signorina", "Gianni", "Gatto", "Bastardo");
console.log(Pet.compareOwner(pet1, pet2));
console.log(Pet.compareOwner(pet1, pet3));
*/

class Pet {
    constructor(petName, ownerName, species, breed) {
      this.petName = petName;
      this.ownerName = ownerName;
      this.species = species;
      this.breed = breed;
    }
}
class Petlist {
    constructor() {
        this.pets = [];
    }
    aggiungiPet(pet) {
        this.pets.push(pet);
    }

}

const aggiungiForm = document.getElementById('aggiungiForm');
const listaAnimali = document.getElementById('listaAnimali');
const petList = new Petlist();
aggiungiForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const petName = document.getElementById('petName').value;
    const ownerName = document.getElementById('ownerName').value;
    const species = document.getElementById('species').value;
    const breed = document.getElementById('breed').value;
    const pet = new Pet(petName, ownerName, species, breed);
    petList.aggiungiPet(pet);
    aggiornaListaAnimali();
    checkSameOwner()
    aggiungiForm.reset();
})

function aggiornaListaAnimali() {
    listaAnimali.innerHTML = '';
    for (const pet of petList.pets) {
        const petDiv = document.createElement('div');
        petDiv.innerHTML = `
        <strong>Nome Animale:</strong> ${pet.petName}<br>
        <strong>Nome Proprietario:</strong> ${pet.ownerName}<br>
        <strong>Specie:</strong> ${pet.species}<br>
        <strong>Razza:</strong> ${pet.breed}<br>`;

        listaAnimali.appendChild(petDiv);
    }
    
}

function checkSameOwner() {
    let sameOwner = false;
    const owners = {};
    for (const pet of petList.pets) {
      if (!owners[pet.ownerName]) {
        owners[pet.ownerName] = [pet.petName];
      } else {
        owners[pet.ownerName].push(pet.petName);
        sameOwner = true;
      }
    }
  
    const sameOwnerDiv = document.createElement('div');
    sameOwnerDiv.innerHTML = `
      <strong>Any pets with the same owner?</strong> ${sameOwner ? 'Yes' : 'No'}`;
  
    if (sameOwner) {
      const ownerList = document.createElement('ul');
      for (const ownerName in owners) {
        if (owners[ownerName].length > 1) {
          const ownerItem = document.createElement('li');
          ownerItem.innerHTML = `${ownerName}: ${owners[ownerName].join(', ')}`;
          ownerList.appendChild(ownerItem);
        }
      }
      sameOwnerDiv.appendChild(ownerList);
    }
  
    listaAnimali.appendChild(sameOwnerDiv);
  }

