'use strict';

const startBtnRef = document.querySelector('[data-start]');
const stopBtnRef = document.querySelector('[data-stop]');
const bodyRef = document.querySelector('body');
let bodyColorChangerId = null;

startBtnRef.setAttribute(
  'style',
  'border-radius:10%; font-size: 62px; background-color: red;'
);
stopBtnRef.setAttribute(
  'style',
  'border-radius:10%; font-size: 62px; background-color: green;'
);

startBtnRef.addEventListener('click', onStartBtnClick);
function onStartBtnClick(event) {
  bodyColorChangerId = setInterval(() => {
    bodyRef.setAttribute('style', `background-color: ${getRandomHexColor()}`);
  }, 1000);
  startBtnRef.setAttribute('disabled', 'true');
}

stopBtnRef.addEventListener('click', onStopBtnClick);
function onStopBtnClick(event) {
  clearInterval(bodyColorChangerId);
  startBtnRef.removeAttribute('disabled', 'true');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}