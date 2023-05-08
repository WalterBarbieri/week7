/* Primo esempio*/

const Person = function() {
    this.firstName = '';
    this.lastName = '';
    this.greet = () => {
        return 'my name is ' + this.firstName;
    }
}

const p1 = new Person();
p1.firstName = 'Luca';
p1.lastName = 'Rossi';
console.log(p1.greet());

const p2 = new Person();
p2.firstName = 'Mario';
p2.lastName = 'Verdi';
console.log(p2.greet());

/*Secondo esempio*/

const Book = function() {
    this.title = '';
    this.author = '';
    this.numPages = '';
    this.info = () =>{
        return 'Title: ' + this.title + ', Author: ' + this.author + ', This book has ' + this.numPages + ' pages';
    }
}

const b1 = new Book();
b1.title = 'The lord of the rings';
b1.author = 'Tolkien';
b1.numPages = 347;
console.log(b1.info());

const b2 = new Book();
b2.title = 'For whom the bell tolls';
b2.author = 'Hemingway';
b2.numPages = 219;
console.log(b2.info());

const b3 = new Book();
b3.title = 'Kafka on the shore';
b3.author = 'Murakami';
b3.numPages = 403;
console.log(b3.info());

const b4 = new Book();
b4.title = 'Do electric sheep dream of androids';
b4.author = 'K. Dick';
b4.numPages = 194;
console.log(b4.info());

console.log(b4);

/**Terzo esempio */

const namedPerson = function(_firstName, _lastName) {
    this.firstName = _firstName;
    this.lastName = _lastName;
    this.greet = () => {
            return 'Hello '+ this.firstName + ' ' + this.lastName;
        }
}
const c1 = new namedPerson('Gianni', 'Pallino', 27);
const c2 = new namedPerson('Nino', 'Boccino', 19);
const c3 = new namedPerson('Salta', 'Lacorda', 31);
const c4 = new namedPerson('Gino', 'Bevilacqua', 49)
console.log(c2);
console.log(c1.greet());
console.log(c4.greet());

/**Quarto esempio */

class Automobile {
    constructor(brand, model, year) {
        this.brand = brand;
        this.model = model;
        this.year = year;
    }
    descrizione() {
        return `Questa automobile è una ${this.brand} ${this.model} dell'anno ${this.year}`
    }
    tipologiaModello(){
        return 'Il modello è ' + this.model;
    }
}
const miaAuto = new Automobile('Toyota', 'Corolla', 2020);
console.log(miaAuto.descrizione());
console.log(miaAuto.tipologiaModello());

/**Quinto esempio */

class Animali {
    constructor(specie, nome, eta) {
        this.specie = specie;
        this.nome = nome;
        this.eta = eta;
    }
    visualizzaInfo(){
        return 'Specie: ' + this.specie + '. Nome: ' + this.nome + '. Età: ' + this.eta;
    }
}
const animale1 = new Animali('Cane', 'Fido', 3);
const animale2 = new Animali('Gatto', 'Micio', 5);
const animale3 = new Animali('Gallina', 'Nina', 1);

const listaAnimali = document.getElementById('listaAnimali');

/** usando il metodo innerHtml sovrascrive ciò che viene prima*/
listaAnimali.innerHTML = animale2.visualizzaInfo();

/**Usando il metodo appendChild invece stampiamo una lista */
const animale1Info = document.createElement('p');
animale1Info.textContent = animale1.visualizzaInfo();
listaAnimali.appendChild(animale1Info);

const animale3Info = document.createElement('p');
animale3Info.textContent = animale3.visualizzaInfo();
listaAnimali.appendChild(animale3Info);
