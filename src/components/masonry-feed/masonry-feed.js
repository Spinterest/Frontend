export class MasonryFeed extends HTMLElement {

    constructor() {
        super();
        this.pins = []
    }

    connectedCallback() {
        fetch('components/masonry-feed/masonry-feed.html')
            .then(response => response.text())
            .then(html => {
                this.innerHTML = html;
                this.populateFeed()
            });
    }

    static get observedAttributes() {
        return ['pins'];
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
