import { countSide, matrix, inputArr, changeCountSide, setMatrix, setCheckedInput } from "./index";
import { initDices } from "./init_dices"
import { initFont } from "./init_font"
import { getMatrix } from "./init_matrix"
import { setPositionDices } from "./init_pos"
import { shiftDice, isWon, resetCounter, resetGame } from "./shift"
import { checkWin } from "./timer"

import soundInput from "../sounds/input.mp3"
export let _soundInput = new Audio(soundInput);

export const resize = (e) => {
  for (let i = 0; i < inputArr.length; i++) {
    let diceAmount = countSide ** 2;
    if (inputArr[i].checked ) {
      inputArr[i].checked = true;
      setCheckedInput(i);
      changeCountSide(i);
      diceAmount = countSide ** 2;
      initDices(diceAmount);
      setMatrix();
      setPositionDices();
      fifteen.onclick = shiftDice;
      initFont();
      checkWin();
      resetCounter();
      resetGame();
      _soundInput.play();
    }
  }
}