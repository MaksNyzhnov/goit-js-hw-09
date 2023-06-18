
const body = document.querySelector('body')
const startBtn = document.querySelector('[data-start]')
const stopBtn = document.querySelector('[data-stop]')


startBtn.addEventListener('click', bodyColorSwitcher)
stopBtn.addEventListener('click', stopColorSwitcher)

let intervalId = null

stopBtn.disabled = true

function bodyColorSwitcher() {
    intervalId = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor()
    }, 500);
    startBtn.disabled = true
    stopBtn.disabled = false
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

function stopColorSwitcher() {
    clearInterval(intervalId)
    startBtn.disabled = false
    stopBtn.disabled = true
}

