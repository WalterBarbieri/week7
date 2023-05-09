let contactList = [];
const nameField = document.getElementById('name');
const surnameField = document.getElementById('surname');
const phoneField = document.getElementById('phone');
const saveButton = document.getElementById('saveButton');

const renderList = function() {
    let listaContatti = document.getElementById('listaContatti');
    listaContatti.innerHTML = '';
    contactList.forEach((contact) => {
        const newLi = document.createElement('li');
        newLi.innerText = contact.name + ' ' + contact.surname + ' ' + contact.phone;
        listaContatti.appendChild(newLi);
    })
}
setTimeout(renderList, 100);
saveButton.onclick = function(event) {
    event.preventDefault();
    const newUser = {
        name: nameField.value,
        surname: surnameField.value,
        phone: phoneField.value
    }
    contactList.push(newUser);

    const contactsArrayAsString = JSON.stringify(contactList);
    localStorage.setItem('contact', contactsArrayAsString);

    nameField.value = '';
    surnameField.value = '';
    phoneField.value = '';

    renderList();
}
window.onload = function() {
    if (localStorage.getItem('contact')) {
        let arrayAsString = localStorage.getItem('contact');
        let newContactArray = JSON.parse(arrayAsString);
        contactList = newContactArray;

        renderList();
    }
}