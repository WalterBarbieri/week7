class Prodotto {
  constructor(id, nome, descrizione, prezzo, quantita) {
    this.id = id;
    this.nome = nome;
    this.descrizione = descrizione;
    this.prezzo = prezzo;
    this.quantita = quantita;
  }
}

class Catalogo {
  constructor() {
    this.prodotti = [];
  }

  aggiungiProdotto(prodotto) {
    this.prodotti.push(prodotto);
  }

  eliminaProdotto(id) {
    this.prodotti = this.prodotti.filter((prodotto) => prodotto.id != id);
  }
  cercaProdotto(id) {
    for (const prodotto of this.prodotti) {
      console.log("prod", prodotto);
      if (prodotto.id == id) {
        return prodotto;
      }
    }
    return null;
  }
}

const inputRicerca = document.getElementById('inputRicerca');
const bottoneRicerca = document.getElementById('bottoneRicerca');

bottoneRicerca.addEventListener("click", () =>{
    const id = inputRicerca.value;
    const prodottoTrovato = catalogo.cercaProdotto(id);
    if (prodottoTrovato) {
        alert(`Prodotto trovato:\nID: ${prodottoTrovato.id}\nNome: ${prodottoTrovato.nome}\nDescrizione: ${prodottoTrovato.descrizione}\nPrezzo: €${prodottoTrovato.prezzo.toFixed(2)}\nQuantità: ${prodottoTrovato.quantita}`);
      } else {
        alert('Nessun prodotto trovato con l\'ID specificato.');
      }
});


const aggiungiForm = document.getElementById('aggiungiForm');
const listaProdotti = document.getElementById('listaProdotti');
const catalogo = new Catalogo();
aggiungiForm.addEventListener('submit', (event) =>{
    event.preventDefault();

    const id = document.getElementById("ID").value;
    const nome = document.getElementById("nome").value;
    const descrizione = document.getElementById("description").value;
    const prezzo = parseInt(document.getElementById("price").value);
    const quantita = parseInt(document.getElementById("quantity").value);
    const prodotto = new Prodotto(id, nome, descrizione, prezzo, quantita);
    catalogo.aggiungiProdotto(prodotto);
    aggiornaListaProdotti();
    aggiungiForm.reset();
})

function aggiornaListaProdotti() { 
    listaProdotti.innerHTML = "";
    for (const prodotto of catalogo.prodotti) {
        const prodottoDiv = document.createElement('div');
        prodottoDiv.innerHTML = `
        <strong>ID:</strong> ${prodotto.id}<br>
        <strong>Nome:</strong> ${prodotto.nome}<br>
        <strong>Descrizione:</strong> ${prodotto.descrizione}<br>
        <strong>Prezzo:</strong> €${prodotto.prezzo.toFixed(2)}<br>
        <strong>Quantità:</strong> ${prodotto.quantita}<br>
      `;
    

    const rimuoviButton = document.createElement('button');
    rimuoviButton.textContent = 'Rimuovi';
    rimuoviButton.addEventListener('click', () => {
      catalogo.eliminaProdotto(prodotto.id);
      aggiornaListaProdotti();
    });

    prodottoDiv.appendChild(rimuoviButton);
    listaProdotti.appendChild(prodottoDiv);
}
}


