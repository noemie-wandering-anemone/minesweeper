document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
var board = {
  cells: [{row: 0, col: 0, isMine: false, hidden: true}, {row: 0, col: 1, isMine: true, hidden: true}, {row: 0, col: 2, isMine: false, hidden: true},
          {row: 1, col: 0, isMine: true, hidden: true}, {row: 1, col: 1, isMine: false, hidden: true}, {row: 1, col: 2, isMine: false, hidden: true},
          {row: 2, col: 0, isMine: false, hidden: true}, {row: 2, col: 1, isMine: false, hidden: true}, {row: 2, col: 2, isMine: true, hidden: true}],
};

function startGame () {
  // Don't remove this function call: it makes the game work!
  lib.initBoard()
  //loop over each cell.
  //Call for countSurroundingMines function.
  //add a new surroundingMines property to each cell with the value retrieved above.
  for (var i = 0; i < board.cells.length; i++) {
    board["cells"][i].surroundingMines = countSurroundingMines(board["cells"][i]);
  }
  document.addEventListener("click", checkForWin);
  document.addEventListener("contextmenu", checkForWin);
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {
  //
  
  for (var i = 0; i < board.cells.length; i++) {
    if ([i].isMine === true && [i].isMarked === true) {
      if ([i].isMine === false && [i].hidden === false) {
        return true;
      }
    }
    return;
  }

  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  //   lib.displayMessage('You win!')
}

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines (cell) {
  //For one cell, find surrounding cells, return the list of them in an array (getSurroundingCells)
  //On surrounding cells array, filter to only keep cell.isMine: true.
  //return array length to get the number of mines.
  var surrounding = lib.getSurroundingCells(cell.row, cell.col);
  var mines = 0;
  for (var i= 0; i < surrounding.length; i++) {
    if (surrounding[i].isMine === true) {
      mines++;
    }
  }
  return mines;
}