import '../styles/normalize.css'
import '../styles/style.css'

import { initLayout } from "./init_layout"
import { initDices } from "./init_dices"
import { initFont } from "./init_font"
import { getMatrix } from "./init_matrix"
import { setPositionDices } from "./init_pos"
import { shuffleDice } from "./shuffle"
import { resize } from "./resize"
import { shiftDice, isWon, resetCounter, resetGame, counter } from "./shift"
import { allowDrop, dragStart, dragEnd } from "./dragover"
import { checkWin } from "./timer"
import { muteAudio } from "./sounds"
import { openPopup } from "./popup"
import { save } from "./save"

// Init field

// export let countSide = 4;
export let countSide = (localStorage.getItem("countSide")) ? localStorage.getItem("countSide") : 4;

initLayout();
initDices();
initFont();

export let matrix = (localStorage.getItem("matrix")) ? loadMatrixFromLS() : getMatrix();

export function setMatrix() {
  matrix = getMatrix();
}

// Init position

setPositionDices(matrix);

// Shuffle

document.getElementById("shuffle").onclick = shuffleDice;

// Shift

fifteen.onclick = shiftDice;

// Drag-n-Drop

fifteen.ondragover = allowDrop;
fifteen.ondragstart = dragStart;
fifteen.ondrop = dragEnd;

// Resize

let checkedInput = (localStorage.getItem("checkedInput")) ? +localStorage.getItem("checkedInput") : +1;
export const inputArr = document.querySelectorAll('.size');
inputArr[checkedInput].checked = true;

export function changeCountSide(check) {
  countSide = +inputArr[check].value;
}

export function setCheckedInput(inputNum) {
  checkedInput = inputNum;
}

inputArr.forEach(e => e.oninput = resize);
window.onresize = initFont;

// Timer

// Sound

const soundButton = document.querySelector('.sound-button');
soundButton.onclick = muteAudio;


// PopUp

const scoreButton = document.querySelector('.score-button');
scoreButton.onclick = openPopup;

// Save

const saveButton = document.querySelector('.save-button');
saveButton.onclick = () => {
  save();
  saveToLS();
};

function saveToLS() {
  localStorage.setItem("matrix", JSON.stringify(matrix));
  localStorage.setItem("countSide", countSide);
  localStorage.setItem("counter", counter);
  let duration = document.querySelector('.seconds').textContent;
  localStorage.setItem("duration", duration);
  localStorage.setItem("checkedInput", checkedInput);
}

function loadMatrixFromLS() {
  return JSON.parse(localStorage.getItem("matrix"));
}

