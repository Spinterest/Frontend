import {ComplexController, CrawlerController, SpinController} from "../../js/API.js";

export class PinFeed extends HTMLElement {

    constructor() {

        super();
        this.spinController = new SpinController();
        this.crawlerController = new CrawlerController();
        this.complexController = new ComplexController();

    }

    connectedCallback() {

        fetch('components/pin-feed/pin-feed.html')
            .then(response => response.text())
            .then(html => {
                this.innerHTML = html;
                const pin = history.state;
                this.loadData(pin);
            });

    }

    loadData(spin) {

        this.populateImage(spin);
        this.spinController.getSpinWithID(spin.spinID, this.populateSpinDetails.bind(this))

        this.complexController.getCommentsForSpin(spin.spinID, this.populateComments.bind(this))

    }

    populateImage(pin) {

        const img = this.querySelector('article > img');

        img.src = pin.spinLink;
        img.alt = 'spin feed image';

    }

    populateSpinDetails(spin) {

        this.crawlerController.getUserWithID(spin.crawlerID, this.populateUsername.bind(this))

        if (!spin.spinTitle) {
            this.querySelector('.image-title').remove();
        }

        if (!spin.spinDescription) {
            this.querySelector('.image-description').remove();
        }

        this.innerHTML = this.innerHTML
            .replace('{{pin.imageTitle}}', spin.spinTitle)
            .replace('{{pin.imageDescription}}', spin.spinDescription);

    }

    populateUsername(crawler) {

        this.innerHTML = this.innerHTML
            .replace('{{pin.username}}', crawler.crawlerUserName)

    }

    populateComments(comments) {

        const commentsSection = this.querySelector('.comments');
        const commentOutput = this.querySelector('.comment-output');

        comments
            .map(comment => this.createComment(comment))
            .forEach(section => commentOutput.appendChild(section));

        this.styleCommentsToFitImage();

    }

    styleCommentsToFitImage() {

        const imageHeight = this.querySelector('article > img').offsetHeight - 150;
        const commentsElement= this.querySelector('.comments');

        const adjustedHeight = Math.max(imageHeight, 400);

        commentsElement.style.maxHeight = adjustedHeight + 'px';

    }

    createComment(comment) {

        const section = document.createElement('section');
        section.className = 'comment';

        const h3 = document.createElement('h3');

        h3.textContent = comment.crawlerUserName;

        const p = document.createElement('p');
        p.textContent = comment.spinCommentMessage;

        const button = document.createElement('button');
        button.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
            </svg>
        `

        const span = document.createElement('span');
        span.textContent = comment.spinCommentLikeCount;

        button.appendChild(span);

        section.appendChild(h3);
        section.appendChild(p);
        section.appendChild(button);

        return section;

    }
}
