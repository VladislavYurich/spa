let seconds = 0;
let minutes = 0;
let hours = 0;
let interval;
let timerElement
const timer = document.querySelector('#timer')
const timerNavBtn = document.querySelector('a[href="./timer"]')

timerNavBtn.addEventListener('click', function() {
    setTimeout(function() {
        timerElement = document.querySelector('#timer')
    }, 200)
})

function updateTime() {
    seconds++;
    if (seconds === 60) {
      minutes++;
      seconds = 0;
    }
    if (minutes === 60) {
      hours++;
      minutes = 0;
    }

    if (timerElement) {
        timerElement.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
}

window.addEventListener('load', () => {
    setInterval(updateTime, 1000);
  });




