import { countSide, matrix } from "./index";
import { setPositionDices } from "./init_pos"
import { timerRef } from "./timer";

export function shiftDice(e) {
  let dice = e.target.closest("button");

  if (!dice) {
    return;
  }

  let diceAmount = countSide ** 2;
  const buttonNumber = +(dice.dataset.matrixId);
  const diceCoords = findCoords(buttonNumber, matrix);
  const emptyCoords = findCoords(diceAmount, matrix);
  let isRight = isValidSwap(diceCoords, emptyCoords);

  if (isRight) {
    swapDice(diceCoords, emptyCoords, matrix);
    setPositionDices(matrix);
  }
}

export function findCoords(num, matrix) {
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] == num) {
        return {x, y};
      }
    }
  }
}

export function isValidSwap(diceCoords, emptyCoords) {
  const coordX = Math.abs(diceCoords.x - emptyCoords.x);
  const coordY = Math.abs(diceCoords.y - emptyCoords.y);

  return (coordX == 1 && diceCoords.y == emptyCoords.y) || (coordY == 1 && diceCoords.x == emptyCoords.x);
}

export function swapDice(diceCoords, emptyCoords, matrix) {
  [matrix[diceCoords.y][diceCoords.x], matrix[emptyCoords.y][emptyCoords.x]] =
  [matrix[emptyCoords.y][emptyCoords.x], matrix[diceCoords.y][diceCoords.x]]

  if (isWon(matrix)) {
    showWin();
  }
}

function isWon(matrix) {
  let diceAmount = countSide ** 2;
  const winArr = new Array(diceAmount).fill(0).map((item, index) => index + 1);
  const flatMatrix = matrix.flat();
  for (let i = 0; i < winArr.length; i++) {
    if (winArr[i] !== flatMatrix[i]) {
      return false;
    }
  }
  return true;
}

function showWin() {
  setTimeout (() => {
    document.querySelector('.timerMsg').classList.remove('hide');
    clearInterval(timerRef);
  }, 200);
}