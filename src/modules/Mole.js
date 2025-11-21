export class Mole {
    constructor(cellElement, timeToLive = 900) {
        this.cellElement = cellElement;
        this.timeToLive = timeToLive;

        this.timeout = null;
        this.root = null;
    }

    placeMole(onExpire) {
        this.root = document.createElement("div");
        this.root.className = 'mole';
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
        this.root.remove();
        this.cellElement.classList.remove("has-mole");
        this.root = null;
    }
}

