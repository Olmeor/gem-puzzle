// This needs refactoring but it works

var puzzle = {
  complete: false,
  linksGenerated: false,
  empty: {
    emptyPos: 0,
    emptyRow: 0,
    emptyCol: 0,
    emptyOptions: [[], [], [], []],
    emptyFindOptions: function () {
      // Top
      puzzle.empty.emptyOptions[0].push(+puzzle.empty.emptyRow - 1);
      puzzle.empty.emptyOptions[0].push(+puzzle.empty.emptyCol);
      // Bottom
      puzzle.empty.emptyOptions[1].push(+puzzle.empty.emptyRow + 1);
      puzzle.empty.emptyOptions[1].push(+puzzle.empty.emptyCol);
      // Left
      puzzle.empty.emptyOptions[2].push(+puzzle.empty.emptyRow);
      puzzle.empty.emptyOptions[2].push(+puzzle.empty.emptyCol - 1);
      // Right
      puzzle.empty.emptyOptions[3].push(+puzzle.empty.emptyRow);
      puzzle.empty.emptyOptions[3].push(+puzzle.empty.emptyCol + 1);
    },
  },
  timer: {
    started: false,
    timerRef: undefined,
    startTimer: function () {
      if (!this.started) {
        this.started = true;
        var start = new Date().getTime(),
          elapsed = '0.0',
          h1 = document.querySelector('h1.timer span');
        this.timerRef = setInterval(function () {
          var time = new Date().getTime() - start;
          elapsed = Math.floor(time / 100) / 10;
          if (Math.round(elapsed) == elapsed) {
            elapsed += '.0';
          }
          h1.innerText = elapsed;
        }, 100);
      }
    },
  },
  startPoints: [
    [12, 15, 3, 4, 10, 7, 0, 13, 5, 9, 8, 6, 11, 14, 2, 1],
    [13, 6, 8, 7, 14, 4, 12, 2, 10, 1, 3, 11, 9, 15, 5, 0],
    [14, 13, 5, 12, 2, 3, 15, 4, 8, 0, 11, 9, 10, 1, 7, 6],
    [3, 2, 1, 4, 5, 0, 11, 8, 9, 7, 10, 12, 13, 14, 6, 15],
    // [1,2,3,4,5,6,7,8,9,10,11,12,13,0,14,15]
  ],
  currentOrder: [],
  desiredOrder: [],
  checkVictory: function () {
    var tiles = document.querySelectorAll('.tile');
    this.currentOrder = [];
    for (i = 0; i < tiles.length; i++) {
      this.currentOrder.push(tiles[i].dataset.position);
    }
    var desired = this.desiredOrder.slice(0);
    var a = desired.indexOf(0);
    desired.splice(a, 1);
    var a = desired.join('');
    var b = this.currentOrder.join('');

    if (a === b) {
      return true;
    } else {
      return false;
    }
  },
  checkSingle: function (el) {
    if (el.dataset.position === el.dataset.num) {
      return true;
    } else {
      return false;
    }
  },
  checkTile: function (num, col, row) {
    for (i = 0; i < this.empty.emptyOptions.length; i++) {
      if (
        this.empty.emptyOptions[i][0] == row &&
        this.empty.emptyOptions[i][1] == col
      ) {
        return true;
      }
    }
    return false;
  },
  moveTile: function (el, col, row) {
    if (!this.complete) {
      var num = el.dataset.position;
      col = el.dataset.col;
      row = el.dataset.row;
      if (this.checkTile(+num, col, row)) {
        el.dataset.position = this.empty.emptyPos;
        el.dataset.col = this.empty.emptyCol;
        el.dataset.row = this.empty.emptyRow;
        this.empty.emptyPos = num;
        this.empty.emptyRow = row;
        this.empty.emptyCol = col;
        this.empty.emptyOptions = [[], [], [], []];
        this.empty.emptyFindOptions();

        // Start timer
        this.timer.startTimer();
      }
      // Check if match
      this.checkSingle(el)
        ? el.classList.add('match')
        : el.classList.remove('match');
      // Check if all match
      if (this.checkVictory()) {
        clearInterval(puzzle.timer.timerRef);
        document.querySelector('.winMsg').classList.remove('hide');
        this.complete = true;
        document.querySelector('.inner-container').classList.add('complete');
      }
    }
  },
  init: function (order) {
    var r,
      i,
      pos,
      tiles,
      col,
      row,
      entries,
      list,
      links,
      container = document.querySelector('.inner-container');

    // Stop and reset timer if running
    if (puzzle.timer.timerRef !== undefined) {
      clearInterval(puzzle.timer.timerRef);
      this.timer.started = false;
      document.querySelector('h1.timer span').innerText = '0';
    }

    this.empty.emptyOptions = [[], [], [], []];
    this.currentOrder = [];
    this.desiredOrder = [];

    // Create links if not already there
    if (!this.linksGenerated) {
      for (
        i = 0,
          list = document.querySelector('.puzzle-list'),
          entries = this.startPoints.length;
        i < entries;
        i++
      ) {
        list.insertAdjacentHTML(
          'beforeend',
          '<li>[<a href="/" data-puzzle="' +
            (i + 1) +
            '">Puzzle ' +
            (i + 1) +
            '</a>]</li>'
        );
      }
      this.linksGenerated = true;
      // Attach event handlers to links
      links = document.querySelectorAll('.puzzle-list li');
      for (i = 0; i < links.length; i++) {
        links[i].children[0].addEventListener('click', function (e) {
          e.preventDefault();
          puzzle.init(e.target.dataset.puzzle);
        });
      }
    }

    // Declare complete to be false
    this.complete = false;
    document.querySelector('.winMsg').classList.add('hide');
    document.querySelector('.inner-container').classList.remove('complete');

    // Get rid of any tiles if they exist
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    // Get tile order from num we pass in
    var startOrder = this.startPoints[order - 1];

    // Sort Title
    document.querySelector('h1.title span').innerText = order;

    //Populate container
    for (i = 0, pos = 1, col = 1, row = 1; i < startOrder.length; pos++, i++) {
      // If 0 found declare it as empty space and update this.empty accordingly
      if (startOrder[i] === 0) {
        this.empty.emptyPos = pos;
        this.empty.emptyRow = row;
        this.empty.emptyCol = col;
        this.empty.emptyFindOptions();
      } else {
        container.insertAdjacentHTML(
          'beforeend',
          '<div class="tile" data-row="' +
            row +
            '" data-num="' +
            startOrder[i] +
            '" data-col="' +
            col +
            '" data-position="' +
            pos +
            '"><span>' +
            startOrder[i] +
            '</span></div>'
        );
      }
      // Update row
      // Reset column every 4
      pos % 4 === 0 ? ((col = 1), row++) : col++;
      this.desiredOrder.push(startOrder[i]);
    }

    // Attach event handlers to tiles
    tiles = document.getElementsByClassName('tile');
    for (i = 0; i < tiles.length; i++) {
      this.checkSingle(tiles[i])
        ? tiles[i].classList.add('match')
        : tiles[i].classList.remove('match');
      tiles[i].addEventListener('click', function () {
        puzzle.moveTile(this);
      });
    }
  },
};

puzzle.init(1);
