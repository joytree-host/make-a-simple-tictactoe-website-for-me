// Tic-Tac-Toe Game Logic

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let scores = {
    X: 0,
    O: 0,
    draw: 0
};

// Winning combinations
const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// DOM Elements
const gameBoard = document.getElementById('gameBoard');
const turnIndicator = document.getElementById('turnIndicator');
const currentPlayerSpan = document.getElementById('currentPlayer');
const scoreX = document.getElementById('scoreX');
const scoreO = document.getElementById('scoreO');
const scoreDraw = document.getElementById('scoreDraw');
const resetBtn = document.getElementById('resetBtn');
const resetScoreBtn = document.getElementById('resetScoreBtn');

// Initialize the game board
function initializeBoard() {
    gameBoard.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('button');
        cell.classList.add('cell');
        cell.setAttribute('data-index', i);
        cell.addEventListener('click', () => handleCellClick(i, cell));
        gameBoard.appendChild(cell);
    }
}

// Handle cell click
function handleCellClick(index, cell) {
    if (gameBoard[index] !== '' || !gameActive) return;

    // Place mark
    gameBoard[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());

    // Check for win or draw
    checkResult();
}

// Check game result
function checkResult() {
    let roundWon = false;
    let winningCombo = [];

    // Check winning conditions
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            roundWon = true;
            winningCombo = condition;
            break;
        }
    }

    if (roundWon) {
        // Highlight winning cells
        winningCombo.forEach(index => {
            document.querySelector(`.cell[data-index="${index}"]`).classList.add('win');
        });

        // Update score
        scores[currentPlayer]++;
        updateScoreDisplay();

        // Show win message
        showMessage(`Player ${currentPlayer} wins!`, 'win');
        gameActive = false;
        return;
    }

    // Check for draw
    if (!gameBoard.includes('')) {
        scores.draw++;
        updateScoreDisplay();
        showMessage("It's a draw!", 'draw');
        gameActive = false;
        return;
    }

    // Switch player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateTurnIndicator();
}

// Show message
function showMessage(message, type) {
    let messageDiv = document.querySelector('.message');
    if (!messageDiv) {
        messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        document.querySelector('.controls').after(messageDiv);
    }
    messageDiv.textContent = message;
    messageDiv.className = 'message ' + type;
}

// Update turn indicator
function updateTurnIndicator() {
    currentPlayerSpan.textContent = currentPlayer;
    currentPlayerSpan.style.color = currentPlayer === 'X' ? '#667eea' : '#764ba2';
}

// Update score display
function updateScoreDisplay() {
    scoreX.textContent = scores.X;
    scoreO.textContent = scores.O;
    scoreDraw.textContent = scores.draw;
}

// Reset game (keep scores)
function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    updateTurnIndicator();
    initializeBoard();
    
    // Remove message
    const messageDiv = document.querySelector('.message');
    if (messageDiv) messageDiv.remove();
}

// Reset scores
function resetScores() {
    scores = { X: 0, O: 0, draw: 0 };
    updateScoreDisplay();
    resetGame();
}

// Event Listeners
resetBtn.addEventListener('click', resetGame);
resetScoreBtn.addEventListener('click', resetScores);

// Initialize the game
initializeBoard();
updateTurnIndicator();
updateScoreDisplay();