import '../styles/normalize.css'
import '../styles/style.css'

import { initLayout } from "./init_layout"
import { initDices } from "./init_dices"
import { initFont } from "./init_font"
import { setPositionDices } from "./init_pos"
import { shuffleDice } from "./shuffle"
import { shiftDice } from "./shift"
import { allowDrop, dragStart, dragEnd } from "./dragover"

// Init field

export let countSide = 4;
let diceAmount = countSide ** 2;

initLayout();
initDices();
initFont();

export let matrix = getMatrix();

function getMatrix() {
  const diceNodes = document.querySelectorAll(".dice");
  const diceArray = Array.from(diceNodes);
  diceArray[diceAmount - 1].style.display = "none";
  let arr = diceArray.map(e => +(e.dataset.matrixId))

  let matrix = [];
  for (let i = 0; i < countSide; i++) {
    matrix.push([]);
  }

  let x = 0, y = 0;
  for (let i = 0; i < arr.length; i++) {
    if (x >= countSide) {
      y++;
      x = 0;
    }
    matrix[y][x] = arr[i];
    x++;
  }
  return matrix;
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

const inputArr = document.querySelectorAll('.size');
inputArr[1].checked = true;

const resize = (e) => {
  for (let i = 0; i < inputArr.length; i++) {
    if (inputArr[i].checked ) {
      inputArr[i].checked = true;
      countSide = +inputArr[i].value;
      diceAmount = countSide ** 2;
      initDices(diceAmount);
      matrix = getMatrix();
      setPositionDices(matrix);
      fifteen.onclick = shiftDice;
      initFont();
    }
  }
}

inputArr.forEach(e => e.oninput = resize);
window.onresize = initFont;



