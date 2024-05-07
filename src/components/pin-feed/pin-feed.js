import {
    CommentLikesController,
    ComplexController,
    CrawlerController,
    SpinCommentController,
    SpinController,
    SpinLikesController
} from "../../js/API.js";
import {Toast} from "../../js/Toast.js";

export class PinFeed extends HTMLElement {

    constructor() {

        super();
        this.spinController = new SpinController();
        this.crawlerController = new CrawlerController();
        this.complexController = new ComplexController();
        this.spinCommentController = new SpinCommentController();
        this.spinLikesController = new SpinLikesController();
        this.commentLikesController = new CommentLikesController();

    }

    connectedCallback() {

        fetch('components/pin-feed/pin-feed.html')
            .then(response => response.text())
            .then(html => {
                this.innerHTML = html;
                const pin = history.state;
                this.loadData(pin);
                this.addCommentEventListener();
                this.likeSpinEventListener()
            });

    }

    loadData(spin) {

        this.populateImage(spin);
        this.spinController.getSpinWithID(spin.spinID, this.populateSpinDetails.bind(this))

        this.complexController.getCommentsForSpin(spin.spinID, this.populateComments.bind(this))

        this.complexController.getCrawlersWhoLikedSpin(spin.spinID, this.populateLikeButton.bind(this))

    }

    populateLikeButton(data) {

        if (!data.length) {
            new Toast('Could not load the likes.', 'error');
            return;
        }

        const span = this.querySelector('.like-image-button > span');
        span.textContent = data.length

        // see if the current user liked the image:
        const loggedInUser = 3;
        if (data.find(crawler => crawler.crawlerID === loggedInUser)) {
            const likeButton = this.querySelector('.like-image-button');
            likeButton.classList.add('active-like');
        }

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

        const imageTitle = this.querySelector('.image-title');
        imageTitle.textContent = spin.spinTitle;

        const imageDescription = this.querySelector('.image-description');
        imageDescription.textContent = spin.spinDescription;

    }

    populateUsername(crawler) {

        const spinCrawler = this.querySelector('.spin-crawler');

        const span = document.createElement('span')
        span.textContent = '@'

        spinCrawler.appendChild(span);
        spinCrawler.appendChild(document.createTextNode(crawler.crawlerUserName));

    }

    populateComments(comments) {

        const commentOutput = this.querySelector('.comment-output');

        comments
            .map(comment => this.createComment(comment))
            .forEach(section => commentOutput.appendChild(section));

        this.styleCommentsToFitImage();

        // add the likes to each comment
        const loggedInUser = 3
        this.complexController.getCommentsLikedByCrawlerID(loggedInUser, this.populateCommentLikes.bind(this))

    }

    populateCommentLikes(data) {

        if (!data) {
            new Toast('Could not load your liked comments.', 'error');
            return;
        }

        data
            .filter(spin => spin.spinID === history.state.spinID)
            .forEach(spin => {
                const likedCommentButton = this.querySelector(`#comment-${spin.spinCommentID}`)

                likedCommentButton.classList.add('active-like');
            })
    }

    addCommentEventListener() {

        const button = this.querySelector("#sendButton");

        button.addEventListener('click', () => {
            // get input
            const input = this.querySelector('#typed-comment');

            if (!(input && input.value && input.value.length > 10)) {
                new Toast('Comment should be longer than 10 characters.', 'error')
                return;
            }

            // call api, create comment
            const loggedInUser = 3
            this.spinCommentController.makeCommentToSpin({
                "crawlerID": loggedInUser,
                "spinID": history.state.spinID,
                "spinCommentMessage": input.value
            }, this.addComment.bind(this))

        });

    }

    addComment(data) {

        if  (data && data.command === 'INSERT') {
            new Toast('Comment successfully created.', 'success')

            const input = this.querySelector('#typed-comment');
            input.value = '';

            this.complexController.getCommentsForSpin(history.state.spinID, this.populateComments.bind(this))
            return;
        }

        new Toast('Something went wrong creating the comment.', 'error')

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
        button.id = `comment-${comment.spinCommentID}`;
        button.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
            </svg>
        `

        // for each button - add an event listener
        button.addEventListener('click', (event) => this.handleCommentLikeButtonClick(event.currentTarget));

        const span = document.createElement('span');
        span.textContent = comment.spinCommentLikeCount;

        button.appendChild(span);

        section.appendChild(h3);
        section.appendChild(p);
        section.appendChild(button);


        return section;

    }

    handleCommentLikeButtonClick(event) {
        const loggedInUser = 3;

        const idParts = event.id.split('-');
        const spinCommentID = parseInt(idParts[idParts.length - 1]);

        // unlike
        if (event.classList.contains('active-like')) {
            // remove
            event.classList.remove('active-like');

            this.commentLikesController.removeLikeFromComment(
                loggedInUser,
                spinCommentID,
                () => {
                    // TODO : update frontend
               }
            )
            return;
        }

        // like
        event.classList.add('active-like');
        this.commentLikesController.likeComment(
            loggedInUser,
            spinCommentID,
            () => {
            // TODO : update frontend
            }
        )

    }

    likeSpinEventListener() {

        const likeButton = this.querySelector('.like-image-button');
        likeButton.addEventListener('click', this.handleLikeButtonClick.bind(this))

    }

    handleLikeButtonClick() {
        const likeButton = this.querySelector('.like-image-button');
        const loggedInUser = 3;

        // unlike
        if (likeButton.classList.contains('active-like')) {
            likeButton.classList.remove('active-like');
            this.spinLikesController.removeLikeFromSpin({
                "crawlerID": loggedInUser,
                "spinID": history.state.spinID
            }, () => {
                this.complexController.getCrawlersWhoLikedSpin(history.state.spinID, this.populateLikeButton.bind(this))
            });
            return;
        }

        // like
        likeButton.classList.add('active-like');

        this.spinLikesController.likeSpin({
            "crawlerID": loggedInUser,
            "spinID": history.state.spinID
        }, () => {
            this.complexController.getCrawlersWhoLikedSpin(history.state.spinID, this.populateLikeButton.bind(this));
        });

    }
}
