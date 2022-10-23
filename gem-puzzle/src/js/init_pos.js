import { countSide, matrix } from "./index";

export function setPositionDices() {
  let diceAmount = countSide ** 2;
  const diceNodes = document.querySelectorAll(".dice");
  const diceArray = Array.from(diceNodes);
  diceArray[diceAmount - 1].style.display = "none";

  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      setDiceStyles(diceArray[matrix[y][x] - 1], x, y)
    }
  }
}

function setDiceStyles(node, x, y) {
  node.style.transform = `translate3D(${100 * x}%, ${100 * y}%, 0)`
}