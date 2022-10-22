import { countSide, matrix } from "./index";
import { setPositionDices } from "./init_pos"
import { findCoords, isValidSwap, swapDice } from "./shift";

export function allowDrop(e) {
  e.preventDefault();
}

export function dragStart(e) {
  let dice = e.target.closest("button");
  const buttonNumber = +(dice.dataset.matrixId);

  if (!dice) {
    return;
  }

  e.dataTransfer.setData('id', buttonNumber);
}

export function dragEnd(e) {
  let diceAmount = countSide ** 2;
  let diceId = e.dataTransfer.getData('id')
  const buttonNumber = +diceId;
  const diceCoords = findCoords(buttonNumber, matrix);
  const emptyCoords = findCoords(diceAmount, matrix);
  let isRight = isValidSwap(diceCoords, emptyCoords);

  if (isRight) {
    swapDice(diceCoords, emptyCoords, matrix);
    setPositionDices(matrix);
  }
}