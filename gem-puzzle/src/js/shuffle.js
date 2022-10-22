import { countSide, matrix } from "./index";
import { setPositionDices } from "./init_pos"
import { findCoords, isValidSwap, swapDice } from "./shift";

let falseCoords;

export function shuffleDice() {
  const maxShuffleCount = 2000;
  let shuffleCount = 0;
  while (shuffleCount < maxShuffleCount) {
    randomSwap(matrix);
    setPositionDices(matrix);
    shuffleCount++;
  }
};

function randomSwap(matrix) {
  let diceAmount = countSide ** 2;
  const emptyCoords = findCoords(diceAmount, matrix);
  const rightCoords = findRightCoords(emptyCoords, matrix, falseCoords);
  const swapCoords = rightCoords[Math.floor(Math.random() * rightCoords.length)];
  swapDice(emptyCoords, swapCoords, matrix);
  falseCoords = emptyCoords;
}

function findRightCoords(emptyCoords, matrix, falseCoords) {
  const rightCoords = [];
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (isValidSwap({x, y}, emptyCoords)) {
        if (!falseCoords || !(falseCoords.x == x && falseCoords.y == y)) {
          rightCoords.push({x, y})
        }
      }
    }
  }
  return rightCoords;
}