import '../styles/normalize.css'
import '../styles/style.css'

import { initLayout } from "./init_layout"
import { initDices } from "./init_dices"
import { initFont } from "./init_font"
import { getMatrix } from "./init_matrix"
import { setPositionDices } from "./init_pos"
import { shuffleDice } from "./shuffle"
import { shiftDice, isWon } from "./shift"
import { allowDrop, dragStart, dragEnd } from "./dragover"

// Init field

export let countSide = 4;

initLayout();
initDices();
initFont();

export let matrix = getMatrix();

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
    let diceAmount = countSide ** 2;
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

// Timer


