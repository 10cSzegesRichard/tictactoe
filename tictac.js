let currentPlayer = 'X';
let gameBoard = Array(9).fill(null);
let gameOver = false;
let gameMode = '';

function startGame(mode = 'player-vs-player') {
  gameMode = mode;
  gameBoard = Array(9).fill(null);
  currentPlayer = 'X';
  gameOver = false;
  document.getElementById('board').innerHTML = '';
  document.getElementById('result').innerText = '';
  document.getElementById('reset').style.display = 'none';
  createBoard();
}

function createBoard() {
  const boardElement = document.getElementById('board');
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.addEventListener('click', () => handleCellClick(i));
    boardElement.appendChild(cell);
  }
  document.querySelector('.game-container').style.display = 'block';
}

function handleCellClick(index) {
  if (gameBoard[index] || gameOver) return;

  gameBoard[index] = currentPlayer;
  document.getElementById('board').children[index].innerText = currentPlayer;

  if (checkWinner()) {
    document.getElementById('result').innerText = `${currentPlayer} játékos nyert!`;
    gameOver = true;
    document.getElementById('reset').style.display = 'inline-block';
    return;
  }

  if (gameBoard.every(cell => cell)) {
    document.getElementById('result').innerText = 'A játék döntetlen.';
    gameOver = true;
    document.getElementById('reset').style.display = 'inline-block';
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

  if (gameMode === 'player-vs-computer' && currentPlayer === 'O' && !gameOver) {
    computerMove();
  }
}

function checkWinner() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
  });
}

function computerMove() {
  let availableMoves = gameBoard.map((value, index) => value === null ? index : null).filter(val => val !== null);
  let randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
  gameBoard[randomMove] = 'O';
  document.getElementById('board').children[randomMove].innerText = 'O';
  if (checkWinner()) {
    document.getElementById('result').innerText = 'O játékos nyert!';
    gameOver = true;
    document.getElementById('reset').style.display = 'inline-block';
  } else {
    currentPlayer = 'X';
  }
}
