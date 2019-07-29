document.addEventListener("DOMContentLoaded", onLoad);

// Define your `board` object here!
/*var board = {
  cells: [{row: 0, col: 0, isMine: false, hidden: true}, {row: 0, col: 1, isMine: true, hidden: true}, {row: 0, col: 2, isMine: false, hidden: true},
          {row: 1, col: 0, isMine: true, hidden: true}, {row: 1, col: 1, isMine: false, hidden: true}, {row: 1, col: 2, isMine: false, hidden: true},
          {row: 2, col: 0, isMine: false, hidden: true}, {row: 2, col: 1, isMine: false, hidden: true}, {row: 2, col: 2, isMine: true, hidden: true}],
};*/

//var board = {};
var board = { cells: [] };

function createBoard(sideSize) {
  board.cells = [];
  for (var i = 0; i < sideSize; i++) {
    for (var j = 0; j < sideSize; j++) {
      board.cells.push({
        row: i,
        col: j,
        isMine: Math.random() > 0.7, // get it random and proportional to nb of cells
        //add remaining mine counter?
        //Cap max number of mines?
        isMarked: false,
        hidden: true
      });
    }
  }
  return board;
}

function onLoad() {
  startGame(3);
  document.getElementById("easy").addEventListener("click", function() {
    startGame(3);
  });
  document.getElementById("medium").addEventListener("click", function() {
    startGame(5);
  });
  document.getElementById("hard").addEventListener("click", function() {
    startGame(6);
  });
  //Add custom option with input field
  //listen to click on ok
  //define var num = input content
  //startGame(num)
}

function startGame(size) {
  const boardNode = document.getElementsByClassName("board")[0];
  boardNode.innerHTML = ""; //Clear existing board
  createBoard(size);

  //loop over each cell.
  //Call for countSurroundingMines function.
  //add a new surroundingMines property to each cell with the value retrieved above.
  //for (var i = 0; i < board.cells.length; i++) {
  //board["cells"][i].surroundingMines = countSurroundingMines(board["cells"][i]);
  //}
  board.cells.forEach(
    cell => (cell.surroundingMines = countSurroundingMines(cell))
  );

  lib.initBoard();
  // Don't remove this function call: it makes the game work!

  document.addEventListener("click", checkForWin);
  document.addEventListener("contextmenu", checkForWin);
  document.getElementById("reset").addEventListener("click", resetBoard);
}

// Define this function to look for a win condition:
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin() {
  for (var i = 0; i < board.cells.length; i++) {
    if (board.cells[i].isMine && !board.cells[i].isMarked) {
      return;
    } else if (
      board["cells"][i].isMine === false &&
      board["cells"][i].hidden === true
    ) {
      return;
    }
  }
  playSound("won");
  return lib.displayMessage("You win!");
}

function resetBoard() {
  var sideSize = Math.sqrt(board["cells"].length);
  startGame(sideSize);
}

function countSurroundingMines(cell) {
  //For one cell, find surrounding cells, return the list of them in an array (getSurroundingCells)
  //reduce surrounding array to an array with only isMine==true and return its length
  var surrounding = lib.getSurroundingCells(cell.row, cell.col);
  var mines = 0;
  for (var i = 0; i < surrounding.length; i++) {
    if (surrounding[i].isMine === true) {
      mines++;
    }
  }
  //var mines = surrounding.reduce(function(minesCount, cell) {
  //  console.log(minesCount, cell);
  //  if (cell.isMine === true) {
  //    return ++minesCount;
  //  }
  //  return minesCount;
  //}, 0);

  return mines;
}

function playSound(sound) {
  var audio = document.getElementById(sound);
  audio.play();
}
