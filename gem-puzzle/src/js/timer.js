let started = false;
export let timerRef = undefined;
let elapsed = (localStorage.getItem("elapsed")) ? loadElapsedFromLS() : '0.0';

export function startTimer(started) {
  if (!started) {
    started = true;
    let start = new Date().getTime();
    // let elapsed = (localStorage.getItem("elapsed")) ? loadElapsedFromLS() : '0.0';
    let timer = document.querySelector('.seconds');
    timerRef = setInterval(function () {
      let time = new Date().getTime() - start;
      elapsed = Math.floor(time / 100) / 10;
      if (Math.round(elapsed) == elapsed) {
        elapsed += '.0';
      }
      timer.innerText = elapsed;
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

function loadElapsedFromLS() {
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelector('.seconds').textContent = `${localStorage.getItem("elapsed")}`;
    console.log(localStorage.getItem("elapsed"));
    return localStorage.getItem("elapsed");
  });
}