let list = [];
let game_starts = true;
let currentPlayer = "X";

const status = document.getElementById("status");
const button = document.getElementById("restart");

document.addEventListener("click", function (event) {
    if (!game_starts) return;

    const element = event.target;
    const id = element.id;

    if (id && !list.includes(id)) {
        element.textContent = currentPlayer;
        list.push(id);

        currentPlayer = currentPlayer === "X" ? "O" : "X";

        status.textContent = `Player ${currentPlayer}'s turn`;
    }

    console.log(list);
});

button.addEventListener("click", function () {
    list = [];
    game_starts = true;
    currentPlayer = "X";

    const cells = document.querySelectorAll(".box");

    cells.forEach(function (cell) {
        cell.textContent = "";
    });

    status.textContent = "Player X's turn";
});