export function initLayout() {
  document.body.innerHTML =
  `
  <div class="wrapper">
    <h1>Mortal Puzzle</h1>
    <h2 class="timer"></h2>
    <div class="dice-wrapper">
    <div class="body__shadow" id="shadow"></div>
      <div class="tab-score hidden-block"></div>
      <div class="fifteen" id="fifteen"></div>
    </div>
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

  for (let i = 2; i <= 8; i++) {
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

  const score = document.querySelector('.tab-score');
  score.innerHTML +=
  `
  <h3>Score board</h3>
  <div class="score-wrapper"></div>
  `

  const scoreWrapper = document.querySelector('.score-wrapper');

  for (let i = 0; i < 10; i++) {
    scoreWrapper.innerHTML +=
    `
    <div class="score-winner">
      <div class="score-number"></div>
      <div class="score-time"></div>
      <div class="score-move"></div>
    </div>
    `
  }

  scoreWrapper.innerHTML +=
  `
    <button class="button close">Close</button>
  `
}
