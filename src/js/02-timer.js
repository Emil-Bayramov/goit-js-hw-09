'use strict';

import Notiflix from 'notiflix';

const timerWrapperRef = document.querySelector('.timer');
timerWrapperRef.setAttribute(
  'style',
  'display:flex; color:black; justify-content: space-evenly; width: 500px;'
);

const timerFieldsRef = document.querySelectorAll('.field');
timerFieldsRef.forEach(field =>
  field.setAttribute(
    'style',
    'display:flex; flex-direction: column; align-items: center;'
  )
);

const timerValuesArr = document.querySelectorAll('.value');
timerValuesArr.forEach(value =>
  value.setAttribute('style', 'font-size: 36px;')
);

const timerLabelsArr = document.querySelectorAll('.label');
timerLabelsArr.forEach(label =>
  label.setAttribute('style', 'text-transform: uppercase;')
);

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const inputRef = document.querySelector('#datetime-picker');
const startBtnRef = document.querySelector('[data-start]');
let selectedDate = 0;
startBtnRef.setAttribute('disabled', 'true');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onOpen() {
    startBtnRef.setAttribute('disabled', 'true');
  },
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      startBtnRef.removeAttribute('disabled', 'true');
      selectedDate = selectedDates[0];
      return selectedDate;
    }
  },
};
flatpickr(inputRef, options);

startBtnRef.addEventListener('click', onStartBtnClick);

let timerId = null;

function onStartBtnClick() {
  startBtnRef.setAttribute('disabled', 'true');
  timerId = setInterval(timer, 1000);
}

function timer() {
  const timeLeft = selectedDate - Date.now();
  if (timeLeft <= 0) {
    clearInterval(timerId);
    return;
  }
  const timeLeftObj = convertMs(timeLeft);
  timerValuesArr.forEach(
    (value, index) =>
      (value.textContent = Object.values(timeLeftObj)
        [index].toString()
        .padStart(2, 0))
  );
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}