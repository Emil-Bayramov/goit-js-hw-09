'use strict';

import Notiflix from 'notiflix';

const formRef = document.querySelector('form');
const dataFromInputs = {};

formRef.addEventListener('input', event => {

  dataFromInputs[event.target.name] = event.target.value;
  
});

formRef.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  let position = 1;
  let delay = Number(dataFromInputs.delay);
  for (let i = 1; i <= dataFromInputs.amount; i += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    position += 1;
    delay += Number(dataFromInputs.step);
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay }); 
      }
      reject({ position, delay }); 
    }, delay);
  });
  return promise;
}