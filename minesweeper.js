document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
/*var board = {
  cells: [{row: 0, col: 0, isMine: false, hidden: true}, {row: 0, col: 1, isMine: true, hidden: true}, {row: 0, col: 2, isMine: false, hidden: true},
          {row: 1, col: 0, isMine: true, hidden: true}, {row: 1, col: 1, isMine: false, hidden: true}, {row: 1, col: 2, isMine: false, hidden: true},
          {row: 2, col: 0, isMine: false, hidden: true}, {row: 2, col: 1, isMine: false, hidden: true}, {row: 2, col: 2, isMine: true, hidden: true}],
};*/

//var board = {};
var board = {cells:[]};

function createBoard (sideSize) {
  board.cells = [];
  for (var i = 0; i < sideSize; i++) {
    for (var j = 0; j < sideSize; j++) {
      board.cells.push({
        row: i,
        col: j,
        isMine: true, // get it random and proportional to nb of cells
        isMarked:false,
        hidden: true
      });
    };
  };
  return board;
}

function startGame () {
  
  createBoard(3);

  //Tentative 1
  //document.getElementById("easy").addEventListener("click", function(){createBoard(3)});
  //document.getElementById("medium").addEventListener("click", function(){createBoard(5)}); 
  //document.getElementById("hard").addEventListener("click", function(){createBoard(7)}); 
  
  //Tentative 2
  /*var medium = document.getElementById("medium");
    medium.addEventListener("click", function(){
    console.log(createBoard(5)
  });*/


  //loop over each cell.
  //Call for countSurroundingMines function.
  //add a new surroundingMines property to each cell with the value retrieved above.
  //for (var i = 0; i < board.cells.length; i++) {
    //board["cells"][i].surroundingMines = countSurroundingMines(board["cells"][i]);
  //}
  board.cells.forEach(cell => cell.surroundingMines = countSurroundingMines(cell));

  lib.initBoard()
  // Don't remove this function call: it makes the game work!

  document.addEventListener("click", checkForWin);
  document.addEventListener("contextmenu", checkForWin);
  
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {
  for (var  i = 0; i < board.cells.length; i++) {
    if (board.cells[i].isMine && !board.cells[i].isMarked) {
      return;
    } else if (!board.cells[i].isMine && board.cells[i].hidden) {
      return;
    }  
  }
  return lib.displayMessage('You win!');
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