export class Mole {
    constructor(cellElement, timeToLive = 900) {
        this.cellElement = cellElement;
        this.timeToLive = timeToLive;

        this.timeout = null;
        this.root = null;
    }

    placeMole(onExpire) {
        this.root = document.createElement("img");
        this.root.className = 'mole';
        this.root.src = './images/mole.png';
        this.root.alt = "A picture of a cartoon mole"
        this.cellElement.appendChild(this.root);
        this.cellElement.classList.add("has-mole");

        this.timeout = setTimeout(() => {
            this.removeMole();
            if (typeof onExpire === 'function') onExpire();
        }, this.timeToLive);
    }

    removeMole() {
        if (this.timeout) clearTimeout(this.timeout);
        this.timeout = null;
        if (this.root?.isConnected) this.root.remove();
        this.cellElement.classList.remove("has-mole");
        this.root = null;
    }
}

