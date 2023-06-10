import Notiflix from 'notiflix';

const form = document.querySelector('.form')
const delayInput = document.querySelector('[name="delay"]') 
const stepInput = document.querySelector('[name="step"]') 
const amountInput = document.querySelector('[name="amount"]') 

  
form.addEventListener('submit', onSubmit)

function onSubmit(event) {
  event.preventDefault()
  console.log(delayInput.value, amountInput.value, stepInput.value)
  for (let i = 0; i < amountInput.value; i++) {
    let currentDelay = +delayInput.value + +stepInput.value * i;
    makePromises((i+1), currentDelay)
  }
}

function makePromises(position, delay) {
  createPromise(position, delay).then(({ position, delay }) => {
   Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    // console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    // console.log(`❌ Rejected promise ${position} in ${delay}ms`);
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)
  });
}
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

// createPromise(1, 1000)
//   .then(({ position, delay }) => {
//     console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
//   })
//   .catch(({ position, delay }) => {
//     console.log(`❌ Rejected promise ${position} in ${delay}ms`);
//   });

