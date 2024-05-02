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
                customElements.define('board-card', BoardCard);
                this.innerHTML = html;
                this.populateFeed()
            });
    }

    attributeChangedCallback(property, oldValue, newValue) {
        if (oldValue === newValue) return;
        this[property] = newValue;
    }

    populateFeed() {
        const article = this.querySelector('article');
        // for each imageUrl in the pins list, go get the image (or attach to src - we could just use the src as s3 bucket source.)
        // create the tag - <section><img src="images/2.png" alt=""></section>
        // add tag to article.
    }
}