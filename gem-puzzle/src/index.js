import './normalize.css'
import './style.css'

// Init field

let countSide = 4;
let diceAmount = countSide ** 2;

function initLayout (diceAmount) {
  document.body.innerHTML =
  `
  <div class="wrapper">
    <h1>Gem Puzzle</h1>
    <div class="fifteen" id="fifteen"></div>
    <div class="size-wrapper"></div>
    <button class="button" id="shuffle">New game</button>
  </div>
  `;

  const values = new Array(diceAmount).fill(0).map((item, index) => index + 1);
  const fifteen = document.querySelector('.fifteen');
  const size = document.querySelector('.size-wrapper');
  let arr = [];

  for (let i = 0; i < values.length; i++) {
    arr[i] =
    `
    <button class="dice" data-matrix-id="${i + 1}">
      <span class="diceNumber">${i + 1}</span>
    </button>
    `
    fifteen.innerHTML += arr[i];
  }

  for (let i = 3; i <= 8; i++) {
    size.innerHTML +=
    `
    <div>
      <input type="radio" id="${i}x${i}" name="size" value="${i}"/>
      <label for="${i}x${i}">${i}x${i}</label>
    </div>
    `
  }
}

initLayout (diceAmount);

const diceNodes = document.querySelectorAll(".dice");
const diceArray = Array.from(diceNodes);
diceArray[diceAmount - 1].style.display = "none";

let matrix = getMatrix(diceArray.map(e => +(e.dataset.matrixId)));

function getMatrix(arr) {
  const matrix = [[], [], [], []];
  let x = 0, y = 0;
  for (let i = 0; i < arr.length; i++) {
    if (x >= 4) {
      y++;
      x = 0;
    }
    matrix[y][x] = arr[i];
    x++;
  }
  return matrix;
}

// Init position

function setPositionDices(matrix) {
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      setNodeStyles(diceArray[matrix[y][x] - 1], x, y)
    }
  }
}

function setNodeStyles(node, x, y) {
  node.style.transform = `translate3D(${100 * x}%, ${100 * y}%, 0)`
}

setPositionDices(matrix);

// Shuffle

const maxShuffleCount = diceAmount ** 3;
let falseCoords;

document.getElementById("shuffle").onclick = () => {
  let shuffleCount = 0;
  while (shuffleCount < maxShuffleCount) {
    randomSwap(matrix);
    setPositionDices(matrix);
    shuffleCount++;
  }
};

function randomSwap(matrix) {
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
      if(isValidSwap({x, y}, emptyCoords)) {
        if(!falseCoords || !(falseCoords.x == x && falseCoords.y == y)) {
          rightCoords.push({x, y})
        }
      }
    }
  }
  return rightCoords;
}

// Shift

fifteen.onclick = (e) => {
  let buttonNode = e.target.closest("button");
  if (!buttonNode) {
    return;
  }

  const buttonNumber = +(buttonNode.dataset.matrixId);
  const diceCoords = findCoords(buttonNumber, matrix);
  const emptyCoords = findCoords(diceAmount, matrix);
  let isRight = isValidSwap(diceCoords, emptyCoords);

  if (isRight) {
    swapDice(diceCoords, emptyCoords, matrix);
    setPositionDices(matrix);
  }
};

function findCoords(num, matrix) {
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if(matrix[y][x] == num) {
        return {x, y};
      }
    }
  }
}

function isValidSwap(diceCoords, emptyCoords) {
  const coordX = Math.abs(diceCoords.x - emptyCoords.x);
  const coordY = Math.abs(diceCoords.y - emptyCoords.y);

  return (coordX == 1 && diceCoords.y == emptyCoords.y) || (coordY == 1 && diceCoords.x == emptyCoords.x);
}

function swapDice(diceCoords, emptyCoords, matrix) {
  [matrix[diceCoords.y][diceCoords.x], matrix[emptyCoords.y][emptyCoords.x]] =
  [matrix[emptyCoords.y][emptyCoords.x], matrix[diceCoords.y][diceCoords.x]]
}