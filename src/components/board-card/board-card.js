export class WebCard extends HTMLElement {

    constructor() {
        super();
        this.spins = []
    }

    connectedCallback() {
        fetch('components/web-card/web-card.html')
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
        // for each imageUrl in the spins list, go get the image (or attach to src - we could just use the src as s3 bucket source.)
        // create the tag - <section><img src="images/2.png" alt=""></section>
        // add tag to article.
    }
}
