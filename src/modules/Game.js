import { Mole } from "./Mole.js";

export class Game {

    constructor({boardElement, scoreElement, timerElement, missesElement}) {
        this.boardElement = boardElement;
        this.scoreElement = scoreElement;
        this.timerElement = timerElement;
        this.missesElement = missesElement;

        this.gridSize = 3;
        this.gameDuration = 60;
        this.gameState = { score: 0, misses: 0, timeLeft: this.gameDuration, gameRunning: false }

        this.timeToLiveDefault = 500;
        this.timeToLiveOffset = 400;

        this.molesActive = new Set();

        this.handleBoardClick = this.handleBoardClick.bind(this);

        this.gameTimer;
    }

    initGame() {
        this.createGameGrid(this.gridSize);

        this.boardElement.addEventListener('click', this.handleBoardClick)
        this.boardElement.addEventListener('keydown', (event) => {
            if (event.key === "Enter" || event.key === ' ') this.handleBoardClick(event);
        })
    }

    createGameGrid(size) {
        this.boardElement.replaceChildren("");
        for (let i = 0; i < size * size; i++) {
            const gridCell = document.createElement("button");
            gridCell.classList.add("cell");
            gridCell.id = "cell" + (i + 1);
            this.boardElement.appendChild(gridCell);
        }
    }

    handleBoardClick(event) {
        const cell = event.target.closest('.cell');
        if (!cell || !this.gameState.gameRunning) return;
        if (cell.classList.contains('has-mole')) {
            this.gameState.score += 1;
            for (let mole of this.molesActive) {
                if (cell === mole.cellElement) {
                    mole.removeMole();
                    this.molesActive.delete(mole);
                }
            }
        } else this.gameState.misses += 1;
        this.updateHud();
    }

    start() {
        if (this.gameState.gameRunning) return;
        this.gameState.gameRunning = true;
        this.gameState.score = 0;
        this.gameState.misses = 0;
        this.gameState.timeLeft = this.gameDuration;
        this.updateHud();

        this.gameTimer = setInterval(() => {
            this.spawnMole();
            this.gameState.timeLeft -= 1;
            this.updateHud()
        }, 1000)
    }

    spawnMole() {
        const emptyGameCells = [...this.boardElement.querySelectorAll('.cell:not(.has-mole)')];
        const cell = emptyGameCells[Math.floor(Math.random() * emptyGameCells.length)]
        const mole = new Mole(cell, this.timeToLiveDefault + (Math.floor(Math.random() * this.timeToLiveOffset)))
        this.molesActive.add(mole);
        mole.placeMole(() => {this.molesActive.delete(mole); this.gameState.misses++})
    }

    updateHud() {
        this.scoreElement.textContent = `Score: ${this.gameState.score}`
        this.timerElement.textContent = `Time: ${this.gameState.timeLeft}`
        this.missesElement.textContent = `Misses: ${this.gameState.misses}`
    }

    stopGame() {
        clearInterval(this.gameTimer);
        for (let mole of this.molesActive) {
            mole.removeMole();
        }
    }


    //TODO: reset and start function
}
