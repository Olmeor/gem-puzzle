import { countSide, matrix } from "./index";

export function initDices() {
  let diceAmount = countSide ** 2;
  const values = new Array(diceAmount).fill(0).map((item, index) => index + 1);
  const fifteen = document.querySelector('.fifteen');
  let arr = [];
  fifteen.innerHTML = '';

  for (let i = 0; i < values.length; i++) {
    arr[i] =
    `
    <button class="dice" data-matrix-id="${i + 1}" draggable="true">
      <span class="diceNumber">${i + 1}</span>
    </button>
    `
    fifteen.innerHTML += arr[i];
  }

  const diceNodes = document.querySelectorAll(".dice");

  for (let i = 0; i < diceAmount; i++) {
    diceNodes[i].style.width = `${100 / countSide}%`;
    diceNodes[i].style.height = `${100 / countSide}%`;
  }
}