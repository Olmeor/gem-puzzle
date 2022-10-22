import { countSide } from "./index";

export function getMatrix() {
  let diceAmount = countSide ** 2;
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