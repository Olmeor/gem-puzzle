export function initLayout() {
  document.body.innerHTML =
  `
  <div class="wrapper">
    <h1>Mortal Combat Gem Puzzle</h1>
    <h2 class="timer"></h2>
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
      <label class="label" for="${i}x${i}">${i}x${i}</label>
    </div>
    `
  }

  const timer = document.querySelector('.timer');
  timer.innerHTML =
  `
  <div class="timerMsg hide">Hooray! You solved the puzzle in</div><span>0</span> seconds
  `
}