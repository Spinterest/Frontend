import {BoardCard} from "../board-card/board-card.js";

export class BoardFeed extends HTMLElement {

    constructor() {
        super();
        this.pins = []
    }

    connectedCallback() {
        fetch('components/board-feed/board-feed.html')
            .then(response => response.text())
            .then(html => {            
                this.innerHTML = html;
                this.populateFeed()
            });
    }

    attributeChangedCallback(property, oldValue, newValue) {
        if (oldValue === newValue) return;
        this[property] = newValue;
    }

    populateFeed() {
        customElements.define('board-card', BoardCard);
    }
}
