export class BoardCard extends HTMLElement {

    constructor() {
        super();
        this.pins = []
    }

    connectedCallback() {
        fetch('components/board-card/board-card.html')
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
        const article = this.querySelector('article');
        // for each imageUrl in the pins list, go get the image (or attach to src - we could just use the src as s3 bucket source.)
        // create the tag - <section><img src="images/2.png" alt=""></section>
        // add tag to article.
    }
}
