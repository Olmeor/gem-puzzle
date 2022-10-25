export function initLayout() {
  const wrapper = document.createElement('div');
  wrapper.classList.add('wrapper');
  const body = document.querySelector('body');
  body.prepend(wrapper);

  const h1 = document.createElement('h1');
  h1.textContent = 'Mortal Puzzle';
  wrapper.prepend(h1);

  const h2 = document.createElement('h2');
  h2.classList.add('timer');
  wrapper.append(h2);

  const _diceWrapper = document.createElement('div');
  _diceWrapper.classList.add('dice-wrapper');
  wrapper.append(_diceWrapper);

  const shadow = document.createElement('div');
  shadow.classList.add('body__shadow');
  shadow.id = 'shadow';
  _diceWrapper.prepend(shadow);

  const _tabScore = document.createElement('div');
  _tabScore.classList.add('tab-score');
  _tabScore.classList.add('hidden-block');
  _diceWrapper.append(_tabScore);

  const _fifteen = document.createElement('div');
  _fifteen.classList.add('fifteen');
  _fifteen.id = 'fifteen';
  _diceWrapper.append(_fifteen);

  const _sizeWrapper = document.createElement('div');
  _sizeWrapper.classList.add('size-wrapper');
  wrapper.append(_sizeWrapper);

  const _buttonWrapper = document.createElement('div');
  _buttonWrapper.classList.add('button-wrapper');
  wrapper.append(_buttonWrapper);

  const _soundButton = document.createElement('button');
  _soundButton.classList.add('sound-button');
  _buttonWrapper.append(_soundButton);

  const _button = document.createElement('button');
  _button.classList.add('button');
  _button.id = 'shuffle';
  _button.textContent = 'NEW GAME';
  _buttonWrapper.append(_button);

  const _saveButton = document.createElement('button');
  _saveButton.classList.add('save-button');
  _buttonWrapper.append(_saveButton);

  const _scoreButton = document.createElement('button');
  _scoreButton.classList.add('score-button');
  _buttonWrapper.append(_scoreButton);

  for (let i = 3; i <= 8; i++) {
    let div = document.createElement('div');
    _sizeWrapper.append(div);

    let _input = document.createElement('input');
    _input.classList.add('size');
    _input.type = 'radio';
    _input.id = `radio${i}`;
    _input.name = 'sizes';
    _input.value = `${i}`
    div.append(_input);

    let _label = document.createElement('label');
    _label.classList.add('label');

    _label.setAttribute('for', `radio${i}`);
    _label.textContent = `${i}x${i}`;
    div.append(_label);
  }

  const _timer = document.querySelector('.timer');
  _timer.textContent = ' seconds, ';
  let _second = document.createElement('span');
  _second.classList.add('seconds');
  _second.textContent = '0';
  _timer.prepend(_second);

  let _moves = document.createElement('span');
  _moves.classList.add('moves');
  _moves.textContent = '0';
  _timer.append(_moves);
  _timer.insertAdjacentHTML("beforeend", ' moves')

  const _timerMsg = document.createElement('div');
  _timerMsg.classList.add('timerMsg');
  _timerMsg.classList.add('hide');
  _timerMsg.textContent = 'Hooray! You solved the puzzle in';
  _timer.prepend(_timerMsg);

  const h3 = document.createElement('h3');
  h3.textContent = 'Score board';
  _tabScore.prepend(h3);

  const _scoreWrapper = document.createElement('div');
  _scoreWrapper.classList.add('score-wrapper');
  _tabScore.append(_scoreWrapper);

  for (let i = 0; i < 10; i++) {
    const _scoreWinner = document.createElement('div');
    _scoreWinner.classList.add('score-winner');
    _scoreWrapper.append(_scoreWinner);

    const _scoreNumber = document.createElement('div');
    _scoreNumber.classList.add('score-number');
    _scoreWinner.append(_scoreNumber);

    const _scoreTime = document.createElement('div');
    _scoreTime.classList.add('score-time');
    _scoreWinner.append(_scoreTime);

    const _scoreMove = document.createElement('div');
    _scoreMove.classList.add('score-move');
    _scoreWinner.append(_scoreMove);
  }

  const _closeButton = document.createElement('button');
  _closeButton.classList.add('button');
  _closeButton.classList.add('close');
  _closeButton.textContent = 'CLOSE';
  _scoreWrapper.append(_closeButton);
}

//export function initLayout() {
//  document.body.innerHTML =
//  `
//  <div class="wrapper">
//    <h1>Mortal Puzzle</h1>
//    <h2 class="timer"></h2>
//    <div class="dice-wrapper">
//    <div class="body__shadow" id="shadow"></div>
//      <div class="tab-score hidden-block"></div>
//      <div class="fifteen" id="fifteen"></div>
//    </div>
//    <div class="size-wrapper"></div>
//    <div class="button-wrapper">
//      <button class="sound-button"></button>
//      <button class="button" id="shuffle">New game</button>
//      <button class="save-button"></button>
//      <button class="score-button"></button>
//    </div>
//  </div>
//  `;
//
//  const size = document.querySelector('.size-wrapper');
//
//  for (let i = 3; i <= 8; i++) {
//    size.innerHTML +=
//    `
//    <div>
//      <input type="radio" class="size" id="radio${i}" name="sizes" value="${i}"/>
//      <label for="radio${i}" class="label" for="${i}x${i}">${i}x${i}</label>
//    </div>
//    `
//  }
//
//  const timer = document.querySelector('.timer');
//  timer.innerHTML =
//  `
//  <div class="timerMsg hide">Hooray! You solved the puzzle in</div>
//  <span class="seconds">0</span> seconds, <span class="moves">0</span> moves
//  `
//
//  const score = document.querySelector('.tab-score');
//  score.innerHTML +=
//  `
//  <h3>Score board</h3>
//  <div class="score-wrapper"></div>
//  `
//
//  const scoreWrapper = document.querySelector('.score-wrapper');
//
//  for (let i = 0; i < 10; i++) {
//    scoreWrapper.innerHTML +=
//    `
//    <div class="score-winner">
//      <div class="score-number"></div>
//      <div class="score-time"></div>
//      <div class="score-move"></div>
//    </div>
//    `
//  }
//
//  scoreWrapper.innerHTML +=
//  `
//    <button class="button close">Close</button>
//  `
//}
