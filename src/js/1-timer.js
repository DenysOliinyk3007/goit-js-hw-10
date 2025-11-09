import flatpickr from "flatpickr";
import iziToast from "izitoast";
//////////////////
import "flatpickr/dist/flatpickr.min.css";
import "izitoast/dist/css/iziToast.min.css";
//////////////////
//////////////////



function updateTime (convertedTime){
  document.querySelector('[data-days]').textContent = convertedTime.days;
  document.querySelector('[data-hours]').textContent = convertedTime.hours;
  document.querySelector('[data-minutes]').textContent = convertedTime.minutes;
  document.querySelector('[data-seconds]').textContent = convertedTime.seconds;
}


function addLeadingZero(value){
  return String(value).padStart(2, '0');
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

  return {days: addLeadingZero(days), hours: addLeadingZero(hours), minutes: addLeadingZero(minutes), seconds: addLeadingZero(seconds)};
}


function handleTimer(selectedTime, timerStep){
  let interval = null;
  let timeDiff = selectedTime.getTime() - getCurrenttime();
  let finTime = convertMs(timeDiff);
  updateTime(finTime);
  interval = setInterval(() => {
    if (timeDiff > 0){
      timeDiff -= timerStep;
      if (timeDiff <= 0){
        updateTime(convertMs(0));
        iziToast.show({message: 'Timer finished!', position: 'center', backgroundColor: 'red'});
        clearInterval(interval);
        btnClass.removeAttribute('disabled');
        dateInput.removeAttribute('disabled');
      }
      else{
        finTime = convertMs(timeDiff);
        updateTime(finTime);
      }
    }
  }, 1000);
}

function getCurrenttime(){
  const time = new Date();
  return time.getTime();
}


const btnClass = document.querySelector('.start-btn');
btnClass.setAttribute('disabled', '');

let userSelectedDate = new Date();
const dateInput = document.querySelector('#datetime-picker');
dateInput.addEventListener('click', () => {btnClass.setAttribute('disabled', '');})
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      let currentTime = getCurrenttime();
      userSelectedDate = selectedDates[0];
      if ((userSelectedDate.getTime() - currentTime) < 0){
        iziToast.error({message: 'Please select the date in the future', position: 'topRight'});
      }
      else{
        btnClass.removeAttribute('disabled');
      }
    },
  };
flatpickr("#datetime-picker", options);


btnClass.addEventListener('click', (evt) => {
  evt.target.disabled = true;
  dateInput.setAttribute('disabled', '');
  handleTimer(userSelectedDate, 1000)});




