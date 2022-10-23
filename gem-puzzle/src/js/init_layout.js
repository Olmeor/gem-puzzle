export function initLayout() {
  document.body.innerHTML =
  `
  <div class="wrapper">
    <h1>Mortal Puzzle</h1>
    <h2 class="timer"></h2>
    <div class="fifteen" id="fifteen"></div>
    <div class="size-wrapper"></div>
    <div class="button-wrapper">
      <button class="sound-button"></button>
      <button class="button" id="shuffle">New game</button>
      <button class="save-button"></button>
      <button class="score-button"></button>
    </div>
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
  <div class="timerMsg hide">Hooray! You solved the puzzle in</div>
  <span class="seconds">0</span> seconds, <span class="moves">0</span> moves
  `
}