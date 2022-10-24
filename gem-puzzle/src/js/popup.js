import { counter } from "./shift"
import soundScore from "../sounds/excellent.mp3"

export let _soundScore = new Audio(soundScore);

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
  tabClose.onclick = closeScore;

  setOrder();
}

function closeScore() {
  const tabScore = document.querySelector('.tab-score');
  const bodyShadow = document.querySelector('.body__shadow');
  const tabClose = document.querySelector('.close');
  const scoreButton = document.querySelector('.score-button');
  tabScore.classList.add('hidden-block');
  bodyShadow.classList.remove('_active');
  scoreButton.onclick = openScore;
  tabClose.onclick = null;
}

function setOrder() {
  const scoreNumber = document.querySelectorAll(".score-number")
  for (let i = 0; i < 10; i++) {
    scoreNumber[i].textContent = i + 1;
  }
}

function makeWinner() {
  let winTime = document.querySelector('.seconds').textContent;
  let winMove = counter;
  return {
    winTime,
    winMove,
  };
}