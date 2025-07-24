const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");

let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let isGameActive = true;

const winningCombinations = [
  [0,1,2], [3,4,5], [6,7,8],  // rows
  [0,3,6], [1,4,7], [2,5,8],  // cols
  [0,4,8], [2,4,6]            // diagonals
];

function handleClick(e) {
  const index = e.target.dataset.index;

  if (gameBoard[index] !== "" || !isGameActive) return;

  gameBoard[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWin()) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    isGameActive = false;
  } else if (gameBoard.every(cell => cell !== "")) {
    statusText.textContent = "It's a Draw!";
    isGameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWin() {
  return winningCombinations.some(combination => {
    return combination.every(index => gameBoard[index] === currentPlayer);
  });
}

function restartGame() {
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  isGameActive = true;
  statusText.textContent = `Player ${currentPlayer}'s turn`;
  cells.forEach(cell => cell.textContent = "");
}

cells.forEach(cell => cell.addEventListener("click", handleClick));
restartBtn.addEventListener("click", restartGame);
