import './normalize.css'
import './style.css'

// Init field

let countSide = 4;
let diceAmount = countSide ** 2;

function initLayout(diceAmount) {
  document.body.innerHTML =
  `
  <div class="wrapper">
    <h1>Mortal Combat Gem Puzzle</h1>
    <div class="fifteen" id="fifteen"></div>
    <div class="size-wrapper"></div>
    <button class="button" id="shuffle">New game</button>
  </div>
  `;

  const size = document.querySelector('.size-wrapper');

  for (let i = 3; i <= 8; i++) {
    size.innerHTML +=
    `
    <div>
      <input type="radio" class="size" id="size" name="size" value="${i}"/>
      <label for="${i}x${i}">${i}x${i}</label>
    </div>
    `
  }
}

function initDices() {
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

function initFont () {
  const wrapper = document.querySelector('.wrapper');
  const diceNodes = document.querySelectorAll(".dice");

  if (innerWidth >= 768 && diceAmount > 36) {
    for (let i = 0; i < diceAmount; i++) {
      diceNodes[i].style.fontSize = '2rem'
    }
  } else if (innerWidth >= 768 && diceAmount < 25) {
    for (let i = 0; i < diceAmount; i++) {
      diceNodes[i].style.fontSize = '4rem'
    }
  } else if (innerWidth >= 768 && diceAmount >= 25 && diceAmount <= 36) {
    for (let i = 0; i < diceAmount; i++) {
      diceNodes[i].style.fontSize = '3rem'
    }
  } else if (innerWidth > 400 && innerWidth < 768 && diceAmount > 36) {
    wrapper.style.padding = '2rem 10vw';
    for (let i = 0; i < diceAmount; i++) {
      diceNodes[i].style.fontSize = '1rem'
    }
  } else if (innerWidth > 400 && innerWidth < 768 && diceAmount < 25) {
    wrapper.style.padding = '2rem 10vw';
    for (let i = 0; i < diceAmount; i++) {
      diceNodes[i].style.fontSize = '3rem'
    }
  } else if (innerWidth > 400 && innerWidth < 768 && diceAmount >= 25 && diceAmount <= 36) {
    wrapper.style.padding = '2rem 10vw';
    for (let i = 0; i < diceAmount; i++) {
      diceNodes[i].style.fontSize = '2rem'
    }
  } else if (innerWidth <= 400 && diceAmount > 36) {
    wrapper.style.padding = '2rem 5vw';
    for (let i = 0; i < diceAmount; i++) {
      diceNodes[i].style.fontSize = '1rem'
    }
  } else if (innerWidth <= 400 && diceAmount < 25) {
    wrapper.style.padding = '2rem 5vw';
    for (let i = 0; i < diceAmount; i++) {
      diceNodes[i].style.fontSize = '2rem'
    }
  } else if (innerWidth <= 400 && diceAmount >= 25 && diceAmount <= 36) {
    wrapper.style.padding = '2rem 5vw';
    for (let i = 0; i < diceAmount; i++) {
      diceNodes[i].style.fontSize = '1.5rem'
    }
  }
}

initLayout();
initDices(diceAmount);
initFont();

let matrix = getMatrix();

function getMatrix() {
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

// Resize

const inputArr = document.querySelectorAll('.size');
inputArr[1].checked = true;

const resize = (e) => {
  for (let i = 0; i < inputArr.length; i++) {
    if (inputArr[i].checked ) {
      inputArr[i].checked = true;
      countSide = +inputArr[i].value;
      diceAmount = countSide ** 2;
      initDices(diceAmount);
      matrix = getMatrix();
      setPositionDices(matrix);
      fifteen.onclick = shiftDice;
      initFont();
    }
  }
}

inputArr.forEach(e => e.oninput = resize);
window.onresize = initFont;

// Init position

function setPositionDices(matrix) {
  const diceNodes = document.querySelectorAll(".dice");
  const diceArray = Array.from(diceNodes);
  diceArray[diceAmount - 1].style.display = "none";

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

let falseCoords;

document.getElementById("shuffle").onclick = shuffleDice;

function shuffleDice() {
  const maxShuffleCount = 2000;
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
      if (isValidSwap({x, y}, emptyCoords)) {
        if (!falseCoords || !(falseCoords.x == x && falseCoords.y == y)) {
          rightCoords.push({x, y})
        }
      }
    }
  }
  return rightCoords;
}

// Shift

fifteen.onclick = shiftDice;

function shiftDice(e) {
  let dice = e.target.closest("button");

  if (!dice) {
    return;
  }

  const buttonNumber = +(dice.dataset.matrixId);
  const diceCoords = findCoords(buttonNumber, matrix);
  const emptyCoords = findCoords(diceAmount, matrix);
  let isRight = isValidSwap(diceCoords, emptyCoords);

  if (isRight) {
    swapDice(diceCoords, emptyCoords, matrix);
    setPositionDices(matrix);
  }
}

function findCoords(num, matrix) {
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] == num) {
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

// Drag-n-Drop

fifteen.ondragover = allowDrop;

  function allowDrop(e) {
  e.preventDefault();
}

fifteen.ondragstart = dragStart;

function dragStart(e) {
  let dice = e.target.closest("button");
  const buttonNumber = +(dice.dataset.matrixId);

  if (!dice) {
    return;
  }

  e.dataTransfer.setData('id', buttonNumber);
}

fifteen.ondrop = dragEnd;

function dragEnd(e) {
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















// const dice = document.querySelectorAll(".dice");
// const wrapper = document.querySelector('.wrapper');

// dice.addEventListener('dragstart', dragStart);
// dice.addEventListener('dragend', dragEnd);

// function dragStart(e) {
//   // let cell = e.target.id;
//   e.dataTransfer.setData('id',e.target.id)
// }

// function dragEnd(e) {
//   let btn = e.target.id;
//   let elemCellDragStart = document.getElementById(btn);
// }

// wrapper.addEventListener('dragover', (e) => {
//   e.preventDefault();
// })