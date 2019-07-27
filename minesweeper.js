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
        isMine: Math.random() > 0.65, // get it random and proportional to nb of cells
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
}

function startGame(size) {
  const boardNode = document.getElementsByClassName("board")[0];
  boardNode.innerHTML = "";
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

//Tentative 1
//var easy = document.getElementById("easy");
//easy.addEventListener("click", createBoard(3));

//document.getElementById("medium").addEventListener("click", createBoard(5));
//document.getElementById("hard").addEventListener("click", createBoard(6));
//Add custom option with input field

//Tentative 2

//add custom option for player to decide the size of the board.

// Define this function to look for a win condition:
//
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
  return lib.displayMessage("You win!");
  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  //   lib.displayMessage('You win!')
}

function resetBoard() {
  //console.log("test");
  //var sideSize = Math.sqrt(board["cells"].length);
  //console.log(sideSize);
  //createBoard(sideSize);
  //or reset hidden and isMarked to origin and randomize isMine
}

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`:
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines(cell) {
  //For one cell, find surrounding cells, return the list of them in an array (getSurroundingCells)
  //On surrounding cells array, filter to only keep cell.isMine: true.
  //return array length to get the number of mines.
  var surrounding = lib.getSurroundingCells(cell.row, cell.col);
  var mines = 0;
  for (var i = 0; i < surrounding.length; i++) {
    if (surrounding[i].isMine === true) {
      mines++;
    }
  }
  return mines;

  //is it possible to map the surrounding array, reduce it to an array with only
}

//add remaining mine counter?
//Cap max number of mines?
