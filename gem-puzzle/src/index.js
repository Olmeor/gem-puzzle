import './normalize.css'
import './style.css'

const values = new Array(16).fill(0).map((item, index) => index + 1);
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

fifteen.innerHTML +=
`
<div>
  <button class="button" id="shuffle">Перемешать</button>
</div>
`
