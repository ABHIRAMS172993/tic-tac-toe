let board = {};
let isGameActive = true;
let currentPlayer = "X";

const statusText = document.getElementById("status");
const restartButton = document.getElementById("restart");

const WINNING_PATTERNS = [
    ["1", "2", "3"], // Rows
    ["4", "5", "6"],
    ["7", "8", "9"],

    ["1", "4", "7"], // Columns
    ["2", "5", "8"],
    ["3", "6", "9"],

    ["1", "5", "9"], // Diagonals
    ["3", "5", "7"]
];

function updateTurnDisplay() {
    statusText.className = "";
    statusText.innerHTML = `Player <span class="player-${currentPlayer.toLowerCase()}">${currentPlayer}</span>'s turn`;
}

function checkGameStatus() {
    
    for (const [a, b, c] of WINNING_PATTERNS) {
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            statusText.className = "status-won";
            statusText.innerHTML = `🎉 Player <span class="player-${currentPlayer.toLowerCase()}">${currentPlayer}</span> won!`;
            
            
            [a, b, c].forEach(id => {
                document.getElementById(id)?.classList.add("winning-cell");
            });

            isGameActive = false;
            return;
        }
    }

    
    if (Object.keys(board).length === 9) {
        statusText.className = "status-draw";
        statusText.innerHTML = `🤝 It's a Draw!`;
        isGameActive = false;
    }
}


document.addEventListener("click", function (event) {
    if (!isGameActive) return;

    const element = event.target;

    if (element.classList.contains("box") && !board[element.id]) {
        element.textContent = currentPlayer;
        element.classList.add(`symbol-${currentPlayer.toLowerCase()}`, "pop-in");
        board[element.id] = currentPlayer;

        checkGameStatus();

        if (isGameActive) {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            updateTurnDisplay();
        }
    }
});


restartButton.addEventListener("click", function () {
    board = {};
    isGameActive = true;
    currentPlayer = "X";

    const cells = document.querySelectorAll(".box");
    cells.forEach(cell => {
        cell.textContent = "";
        cell.className = "box";
    });

    updateTurnDisplay();
});