import { counter } from "./shift"
import { shuffleDice } from "./shuffle"
import soundScore from "../sounds/excellent.mp3"

export let _soundScore = new Audio(soundScore);

let arrScore = (localStorage.getItem("score")) ? loadScore() : [];

export function initTabScore() {
  if (localStorage.getItem("score")) {
    loadScore();
  } else {
    initArrScore();
  }
  setTabScore();
}

export function initArrScore() {
  for (let i = 0; i < 10; i++) {
    arrScore.push({num: i + 1, time: '---', move: '---'});
  }
}

export function setTabScore() {
  const scoreNumber = document.querySelectorAll(".score-number");
  const arrTime = document.querySelectorAll(".score-time");
  const arrMove = document.querySelectorAll(".score-move");

  for (let i = 0; i < 10; i++) {
    scoreNumber[i].textContent = arrScore[i].num;
    arrTime[i].textContent = arrScore[i].time;
    arrMove[i].textContent = arrScore[i].move;
  }
}

export function addTabScore() {
  const scoreNumber = document.querySelectorAll(".score-number");
  const arrTime = document.querySelectorAll(".score-time");
  const arrMove = document.querySelectorAll(".score-move");
  let winSecond = document.querySelector('.seconds').textContent;
  let winMove = document.querySelector('.moves').textContent;
  let winPos = undefined;

  for (let i = 0; i < 10; i++) {
    if (arrScore[i].time == '---') {
      winPos = i;
      break;
    }
  }

  if (winPos || winPos === 0) {
    arrScore[winPos].time = +winSecond;
    arrScore[winPos].move = +winMove;
    sortByTime();
    setTabScore();
  } else if (arrScore[9].time <= +winSecond) {
    return;
  } else {
    winPos = findWinPos();
    addWinPos(winPos);
    sortByTime();
    setTabScore();
  }
  saveScore();
}

function addWinPos(winPos) {
  let winSecond = document.querySelector('.seconds').textContent;
  let winMove = document.querySelector('.moves').textContent;
  let arrFirst = arrScore.slice(0, winPos);
  arrFirst.push({num: winPos + 1, time: +winSecond, move: +winMove});
  let arrSecond = arrScore.slice(winPos, 9);
  let arrResult = arrFirst.concat(arrSecond);
  arrScore = arrResult;
}

function findWinPos() {
  let pos;
  let winSecond = document.querySelector('.seconds').textContent;
  let winMove = document.querySelector('.moves').textContent;

  for (let i = 9; i > 0; i--) {
    if (arrScore[i].time > +winSecond && +winSecond >= arrScore[i - 1].time ) {
      pos = i;
    }
  }
  return pos;
}

function sortByTime() {
  for (let i = 0; i < 10; i++) {
    if (arrScore[i].time == '---') {
      arrScore[i].time = 1000000;
      arrScore[i].move = 1000000;
    }
  }
  arrScore.sort((a, b) => a.time > b.time ? 1 : -1);
  for (let i = 0; i < 10; i++) {
    arrScore[i].num = i + 1;
  }
  for (let i = 0; i < 10; i++) {
    if (arrScore[i].time == 1000000) {
      arrScore[i].time = '---';
      arrScore[i].move = '---';
    }
  }
}

export function openScore(e) {
  const tabScore = document.querySelector('.tab-score');
  const bodyShadow = document.querySelector('.body__shadow');
  const scoreButton = document.querySelector('.score-button');
  _soundScore.play();
  e.stopPropagation();
  tabScore.classList.remove('hidden-block');
  bodyShadow.classList.add('_active');
  const tabClose = document.querySelector('.close');
  scoreButton.onclick = null;
  document.getElementById("shuffle").onclick = null;
  tabClose.onclick = closeScore;

}

function closeScore() {
  const tabScore = document.querySelector('.tab-score');
  const bodyShadow = document.querySelector('.body__shadow');
  const tabClose = document.querySelector('.close');
  const scoreButton = document.querySelector('.score-button');
  tabScore.classList.add('hidden-block');
  bodyShadow.classList.remove('_active');
  scoreButton.onclick = openScore;
  document.getElementById("shuffle").onclick = shuffleDice;
  tabClose.onclick = null;
}

function saveScore() {
  // localStorage.removeItem("score");
  localStorage.setItem("score", JSON.stringify(arrScore));
}

export function loadScore() {
  return JSON.parse(localStorage.getItem("score"));
}