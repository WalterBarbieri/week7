const user = document.getElementById('user');
const removeButton = document.getElementById('removeButton');
const saveButton = document.getElementById('saveButton');
const display = document.getElementsByTagName('h2')[0];

saveButton.onclick = function() {
    let userName = user.value;
    localStorage.setItem('userName', userName);
    user.value = '';
    welcome();
}

removeButton.onclick = function() {
    localStorage.removeItem('userName');
    display.innerText ='';
}
const welcome = function() {
    let userNameSaved = localStorage.getItem('userName');
    if (userNameSaved) {
        display.innerText = 'Welcome ' + userNameSaved;
    }
}

window.onload = function() {
    welcome();
}