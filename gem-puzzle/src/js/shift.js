import { countSide, matrix } from "./index";
import { setPositionDices } from "./init_pos"
import { timerRef } from "./timer";
import soundShift from "../sounds/shift.mp3"
import soundWin from "../sounds/victory.mp3"

export let counter = (localStorage.getItem("counter")) ? +loadCounterFromLS() :0;
let game = false;
export let _soundShift = new Audio(soundShift);
export let _soundWin = new Audio(soundWin);

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
    _soundShift.play();
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

  if (timerRef) {
    counter++;
    document.querySelector('.moves').textContent = `${counter}`;
  }
  if (isWon(matrix) && counter && game) {
    showWin();
    resetCounter();
    game = false;
    _soundWin.play();
  }
}

function isWon(matrix) {
  // if (!counter && timerRef) {
  //   return false;
  // }
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

export function resetCounter() {
  counter = 0;
}

export function startGame() {
  game = true;
}

export function resetGame() {
  game = false;
}

function loadCounterFromLS() {
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelector('.moves').textContent = `${localStorage.getItem("counter")}`;
    return localStorage.getItem("counter");
  });
}