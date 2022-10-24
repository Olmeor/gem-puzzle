let started = false;
export let timerRef = undefined;
export let past = '0.0';
export let duration = (localStorage.getItem("duration")) ? loadDurationFromLS() : '0.0';

export function startTimer(started) {
  if (!started) {
    started = true;
    let start = new Date().getTime();
    let timer = document.querySelector('.seconds');
    timerRef = setInterval(function () {
      let time = new Date().getTime() - start + +duration * 1000;
      past = Math.floor(time / 100) / 10;
      if (Math.round(past) == past) {
        past += '.0';
      }
      timer.innerText = past;
    }, 100);
  }
}

export function checkWin() {
  if (timerRef !== undefined) {
    clearInterval(timerRef);
    document.querySelector('.seconds').textContent = '0';
    document.querySelector('.moves').textContent = '0';
  }

  if (!document.querySelector('.timerMsg').classList.contains('hide')) {
    document.querySelector('.timerMsg').classList.add('hide');
  }
}

function loadDurationFromLS() {
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelector('.seconds').textContent = `${localStorage.getItem("duration")}`;
  });
  return localStorage.getItem("duration");
}

export function resetDuration() {
  duration = '0.0';
}