import './normalize.css'
import './style.css'

let countItems = 16;
const values = new Array(countItems).fill(0).map((item, index) => index + 1);
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

// fifteen.innerHTML +=
// `
// <div>
//   <button class="button" id="shuffle">Перемешать</button>
// </div>
// `


const containerNode = document.getElementById("fifteen");
const itemNodes = document.querySelectorAll(".item");
// const itemNodes = Array.from(containerNode.querySelectorAll(".item"));
const itemArray = Array.from(itemNodes);
console.log(itemArray);
itemArray[countItems - 1].style.display = "none";

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

console.log(matrix);
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

document.getElementById("shuffle").addEventListener("click", () => {
  const shuffledArray = shuffleArray(matrix.flat());
  matrix = getMatrix(shuffledArray);
  setPositionItems(matrix);
  // let e, t = 0;
  // clearInterval(e), gameNode.classList.add(shuffleClass), e = setInterval(() => {
  //   randomSwap(matrix), setPositionItems(matrix), t += 1, t >= maxShuffles && (t = 0, clearInterval(e), gameNode.classList.remove(shuffleClass))
  // }, 70)
});


function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
	return array;
}

// Shift

containerNode.addEventListener("click", e => {
  const blankNumber = 16;
  let buttonNode = e.target.closest("button");
  if (!buttonNode) {
    return;
  }

  const buttonNumber = +(buttonNode.dataset.matrixId);
  console.log(buttonNumber)

  const buttonCoords = findCoordinatesByNumber(buttonNumber, matrix);
  const blankCoords = findCoordinatesByNumber(blankNumber, matrix);

  console.log(buttonCoords, blankCoords);

  let isValid = isValidForSwap(buttonCoords, blankCoords);

  if (isValid) {
    swapButtons(buttonCoords, blankCoords, matrix);
    setPositionItems(matrix);
  }

  console.log(isValid)
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