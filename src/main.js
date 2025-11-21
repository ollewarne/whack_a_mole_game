import { Game } from "./modules/Game.js";

const gameUi = {
    boardElement: document.querySelector("#board"),
    scoreElement: document.querySelector("#score"),
    timerElement: document.querySelector("#timer"),
    missesElement: document.querySelector("#misses"),
    startButton: document.querySelector("#start-button"),
    resetButton: document.querySelector("#reset-button"),
}

const game = new Game(gameUi);
game.initGame();


gameUi.startButton.addEventListener('click', () => game.start());
gameUi.resetButton.addEventListener('click', () => game.reset());
