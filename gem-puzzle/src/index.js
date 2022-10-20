import './normalize.css'
import './style.css'

// Init field

let blankNumber = 16;

function initLayout (blankNumber) {
  document.body.innerHTML =
  `
  <div class="page">
    <h1>Gem Puzzle</h1>
    <div class="fifteen" id="fifteen"></div>
    <button class="button" id="shuffle">New game</button>
  </div>
  `;

  const values = new Array(blankNumber).fill(0).map((item, index) => index + 1);
  const fifteen = document.querySelector('.fifteen');
  let arr = [];

  for (let i = 0; i < values.length; i++) {
    let last;
    if (i == values.length - 1) {last = ''};
    arr[i] =
    `
    <button class="item" data-matrix-id="${i + 1}">
      <span class="itemVal">${i + 1}</span>
    </button>
    `
    fifteen.innerHTML += arr[i];
  }
}

initLayout (blankNumber);

const itemNodes = document.querySelectorAll(".item");
const itemArray = Array.from(itemNodes);
itemArray[blankNumber - 1].style.display = "none";

let matrix = getMatrix(itemArray.map(e => +(e.dataset.matrixId)));

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

function setPositionItems(matrix) {
  for (let y = 0; y < matrix.length; y++)
    for (let x = 0; x < matrix[y].length; x++) {
      setNodeStyles(itemArray[matrix[y][x] - 1], x, y)
    }
}

function setNodeStyles(node, x, y) {
  node.style.transform = `translate3D(${100 * x}%, ${100 * y}%, 0)`
}

setPositionItems(matrix);

// Shuffle

const maxShuffleCount = blankNumber ** 3;
// let timer;

// document.getElementById("shuffle").addEventListener("click", () => {

//   let shuffleCount = 0;
//   clearInterval(timer);

//   if (shuffleCount == 0) {
//     timer = setInterval(() => {
//       randomSwap(matrix);
//       setPositionItems(matrix);

//       shuffleCount++;
//       if (shuffleCount > maxShuffleCount) {
//         clearInterval(timer);
//       }
//     }, 1);
//   }
// });

document.getElementById("shuffle").addEventListener("click", () => {
  let shuffleCount = 0;
  while (shuffleCount < maxShuffleCount) {
    randomSwap(matrix);
    setPositionItems(matrix);
    shuffleCount++;
  }
});

let blockedCoords;
function randomSwap(matrix) {
  const blankCoords = findCoordinatesByNumber(blankNumber, matrix);
  const validCoords = findValidCoords({
    blankCoords,
    matrix,
    blockedCoords,
  });

  const swapCoords = validCoords[
    Math.floor(Math.random() * validCoords.length)
  ];

  swapButtons(blankCoords, swapCoords, matrix);
  blockedCoords = blankCoords
}

function findValidCoords({blankCoords, matrix, blockedCoords}) {
  const validCoords = [];
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if(isValidForSwap({x, y}, blankCoords)) {
        if(!blockedCoords || !(blockedCoords.x == x && blockedCoords.y == y)) {
          validCoords.push({x, y})
        }
      }
    }
  }
  return validCoords;
}

// Shift

fifteen.addEventListener("click", e => {
  let buttonNode = e.target.closest("button");
  if (!buttonNode) {
    return;
  }

  const buttonNumber = +(buttonNode.dataset.matrixId);
  const buttonCoords = findCoordinatesByNumber(buttonNumber, matrix);
  const blankCoords = findCoordinatesByNumber(blankNumber, matrix);
  let isValid = isValidForSwap(buttonCoords, blankCoords);

  if (isValid) {
    swapButtons(buttonCoords, blankCoords, matrix);
    setPositionItems(matrix);
  }
});

function findCoordinatesByNumber(num, matrix) {
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if(matrix[y][x] == num) {
        return {x, y};
      }
    }
  }
}

function isValidForSwap(buttonCoords, blankCoords) {
  const diffX = Math.abs(buttonCoords.x - blankCoords.x);
  const diffY = Math.abs(buttonCoords.y - blankCoords.y);

  return (diffX == 1 && buttonCoords.y == blankCoords.y) || (diffY == 1 && buttonCoords.x == blankCoords.x);
}

function swapButtons(buttonCoords, blankCoords, matrix) {
  let tempCoords = matrix[buttonCoords.y][buttonCoords.x];
  matrix[buttonCoords.y][buttonCoords.x] = matrix[blankCoords.y][blankCoords.x];
  matrix[blankCoords.y][blankCoords.x] = tempCoords;
}