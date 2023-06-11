import Notiflix from "notiflix";
import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";


let capturedTime = null;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        const currentDate = new Date();
        let timeDifference = selectedDates[0].getTime() - currentDate.getTime();
        
        if (timeDifference < 0) {
            Notiflix.Notify.warning("Please choose a date in the future!", {
                width: '1020px',
                fontSize: '72px',
                svgSize: '240px',
  })
            // window.alert("Please choose a date in the future")
           return 
        }
        capturedTime = timeDifference;
        startBtn.disabled = false
    console.log(selectedDates[0]);
  },
};
flatpickr("#datetime-picker", options);

const dateInput = document.querySelector("#datetime-picker")
const startBtn = document.querySelector('[data-start]')
const daysCounter = document.querySelector("[data-days]")
const hoursCounter = document.querySelector("[data-hours]")
const minutesCounter = document.querySelector("[data-minutes]")
const secondsCounter = document.querySelector("[data-seconds]")

let intervalID = null;
let isActive = false
startBtn.disabled = true;

startBtn.addEventListener('click', onTimeStart)


function onTimeStart() {

    if (isActive) {
            startBtn.disabled = true
            return
    }
    isActive = true
    intervalID = setInterval(() => {
    
        updateTimerComponents(getFormedTime())

        if (capturedTime < 1000) {
            clearInterval(intervalID)
        }
    }, 1000)

}

function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
}

function convertMs(ms) {
  
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  
  const days = Math.floor(ms / day);
  
  const hours = Math.floor((ms % day) / hour);
  
  const minutes = Math.floor(((ms % day) % hour) / minute);
  
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function getFormedTime() {
    capturedTime -= 1000;
    const time = convertMs(capturedTime)
    return time
}

function updateTimerComponents({ days, hours, minutes, seconds }) {
    daysCounter.textContent = addLeadingZero(days);
    hoursCounter.textContent = addLeadingZero(hours);
    minutesCounter.textContent = addLeadingZero(minutes);
    secondsCounter.textContent = addLeadingZero(seconds);
}
