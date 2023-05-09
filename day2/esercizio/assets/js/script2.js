var i = -1;
let timerDisplay = document.getElementById('timer');

window.onload = function() {
    let myTime = sessionStorage.getItem('time');
    if (myTime) {
        i = myTime;
    }
}

function timer() {
    i++
    timerDisplay.innerText = i;
    sessionStorage.setItem('time', i)   
    
}
setInterval(timer, 1000)