console.log('motori di webstorage');

//sia local sia session salvano coppie chiave/valore.
//TUTTI I DATI SALVATI DEVONO ESSERE DI TIPO STRINGA.
//Questi motori di memoria hanno uno spazio in base all'URL(Dominio, circa 5 - 10 mb per storage su vari browser).

localStorage.clear();
sessionStorage.clear();

//set item richiedere una coppia chiave valore

localStorage.setItem('name', 'Walter');
localStorage.setItem('asleep', true);
localStorage.setItem('age', 32)

let uno = document.getElementById('titolo').innerText;
localStorage.setItem('1', uno);


//get item si richiama con la chiave

localStorage.getItem('name');




