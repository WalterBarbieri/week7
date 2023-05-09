let saveButton = document.getElementById('saveButton');
let textArea = document.getElementsByTagName('textarea')[0];
let deleteButton =  document.getElementById('deleteButton');
saveButton.addEventListener('click', function(){
    let textToSave = textArea.value;
    localStorage.setItem('textSaved', textToSave);
})
const restoreContent = function() {
    let previouslySavedText = localStorage.getItem('textSaved');
    if (previouslySavedText) {
        textArea.value = previouslySavedText;
    } 
}
window.onload = function() {
    restoreContent();
}
deleteButton.addEventListener('click', function(){
    textArea.value = '';
    localStorage.removeItem('textSaved');
})