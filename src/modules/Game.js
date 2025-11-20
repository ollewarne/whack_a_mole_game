export class Game {

    constructor({gameBoardElement, scoreElement, timerElement, missesElement}) {
        this.gameBoardElement = gameBoardElement;
        this.scoreElement = scoreElement;
        this.timerElement = timerElement;
        this.missesElement = missesElement;

        this.gridSize = 3;
        this.gameDuration = 60;
        this.gameState = { score: 0, misses: 0, timeLeft: this.gameDuration, gameRunning: false }
    }

    initGame() {
        this.createGameGrid(this.gridSize);
    }

    createGameGrid(size) {
        this.gameBoardElement.replaceChildren("");
        for (let i = 0; i < size * size; i++) {
            const gridCell = document.createElement("button");
            gridCell.classList.add("cell");
            gridCell.id = "cell" + (i + 1);
            this.gameBoardElement.appendChild(gridCell);
        }
    }
}
