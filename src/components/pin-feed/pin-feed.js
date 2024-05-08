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
                this.pin = history.state;
                this.loadData();
                this.addCommentEventListener();
                this.likeSpinEventListener()
            });

    }

    loadData() {
        document.getElementById("header-section-web-section").classList.add("hidden");

        this.populateImage(this.pin);
        this.spinController.getSpinWithID(this.pin.spinID, this.populateSpinDetails.bind(this))

        this.complexController.getCommentsForSpin(this.pin.spinID, this.populateComments.bind(this))

        this.complexController.getCrawlersWhoLikedSpin(this.pin.spinID, this.populateLikeButton.bind(this))
    }

    populateLikeButton(data) {
        if (!data || data.hasOwnProperty('error')) {
            new Toast('Could not load the likes for the spin.', 'error');
            return;
        }

        if (!Array.isArray(data)){
            data = [data];
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

        if (!Array.isArray(comments)){
            comments = [comments];
        }

        comments
            .map(comment => this.createComment(comment))
            .forEach(section => {
                if (section){
                    commentOutput.appendChild(section);
                }
            }
        );

        this.styleCommentsToFitImage();

        // add the likes to each comment
        const loggedInUser = 3
        this.complexController.getCommentsLikedByCrawlerID(loggedInUser, this.populateCommentLikes.bind(this))
    }

    populateCommentLikes(data) {
        if (!data || data.hasOwnProperty('error')) {
            new Toast('Could not load your liked comments.', 'error');
            return;
        }

        if (!Array.isArray(data)) {
            data = [data];
        }

        data
            .filter(spinComment => spinComment.spinID === this.pin.spinID)
            .forEach(spinComment => {
                const likedCommentButton = this.querySelector(`#comment-${spinComment.spinCommentID}`)

                likedCommentButton.classList.add('active-like');
            })
    }

    addCommentEventListener() {
        const button = this.querySelector("#sendButton");

        button.addEventListener('click', () => {
            // get input
            const input = this.querySelector('#typed-comment');

            if (!(input && input.value && input.value.length > 0)) {
                new Toast('Comment should be longer than 0 characters.', 'error')
                return;
            }

            // call api, create comment
            const loggedInUser = 3
            this.spinCommentController.makeCommentToSpin(
                this.pin.spinID,
                loggedInUser,
                input.value,
                this.addComment.bind(this));
        });

    }

    addComment(data) {
        if (!data || data.hasOwnProperty('error')) {
            new Toast('Something went wrong creating the comment.', 'error')
            return;
        }

        new Toast('Comment successfully created.', 'success')

        const input = this.querySelector('#typed-comment');
        input.value = '';

        this.complexController.getCommentsForSpin(this.pin.spinID, this.populateComments.bind(this));
        return;
    }

    styleCommentsToFitImage() {
        const imageHeight = this.querySelector('article > img').offsetHeight - 150;
        const commentsElement= this.querySelector('.comments');

        const adjustedHeight = Math.max(imageHeight, 600);

        commentsElement.style.maxHeight = adjustedHeight + 'px';
    }

    createComment(comment) {
        const existingCommentSection = document.getElementById(`comment-section-${comment.spinCommentID}`);
        if (existingCommentSection) {
            return null;
        }

        const section = document.createElement('section');
        section.className = 'comment';
        section.id = `comment-section-${comment.spinCommentID}`;

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
        button.addEventListener('click', (event) => this.handleCommentLikeButtonClick(comment, event.currentTarget));

        const span = document.createElement('span');
        span.id = `comment-like-count-${comment.spinCommentID}`;
        span.textContent = comment.spinCommentLikeCount;

        button.appendChild(span);

        section.appendChild(h3);
        section.appendChild(p);
        section.appendChild(button);


        return section;
    }

    handleCommentLikeButtonClick(comment, event) {
        const loggedInUser = 3;

        const idParts = event.id.split('-');
        const spinCommentID = parseInt(idParts[idParts.length - 1]);

        // unlike
        if (event.classList.contains('active-like')) {
            // remove
            this.commentLikesController.removeLikeFromComment(
                loggedInUser,
                spinCommentID,
                (data) => {
                    if (!data || data.hasOwnProperty('error')){
                        new Toast('There was an error trying to unlike this comment. Please try again later.', 'error');
                        return;
                    }

                    if (data.hasOwnProperty('alert')){
                        new Toast('This comment was already unliked.', 'info');
                        return;
                    }

                    event.classList.remove('active-like');
                    new Toast('Successfully unliked comment.', 'success');

                    const commentCountSpan = document.getElementById(`comment-like-count-${comment.spinCommentID}`);
                    commentCountSpan.textContent = `${Number(commentCountSpan.textContent) - 1}`;
               }
            )
            return;
        }

        // like
        this.commentLikesController.likeComment(
            loggedInUser,
            spinCommentID,
            (data) => {
                if (!data || data.hasOwnProperty('error')){
                    new Toast('There was an error trying to like this comment. Please try again later.', 'error');
                    return;
                }

                if (data.hasOwnProperty('alert')){
                    new Toast('This comment was already like.', 'info');
                    return;
                }

                event.classList.add('active-like');
                new Toast('Successfully like comment.', 'success');
                const commentCountSpan = document.getElementById(`comment-like-count-${comment.spinCommentID}`);
                commentCountSpan.textContent = `${Number(commentCountSpan.textContent) + 1}`;
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
            this.spinLikesController.removeLikeFromSpin(
                this.pin.spinID,
                loggedInUser,
                (data) => {
                    if (!data || data.hasOwnProperty('error')){
                        new Toast('There was an error trying to unlike this spin. Please try again later.', 'error');
                        return;
                    }

                    if (data.hasOwnProperty('alert')){
                        new Toast('This spin was already unliked.', 'info');
                        return;
                    }

                    likeButton.classList.remove('active-like');
                    new Toast('Successfully unliked spin.', 'success');

                    const likeCountSpan = this.querySelector('.like-image-button > span');
                    likeCountSpan.textContent = `${Number(likeCountSpan.textContent) - 1}`;
                }
            );
            return;
        }

        // like
        this.spinLikesController.likeSpin(
            this.pin.spinID,
            loggedInUser,
            (data) => {
                if (!data || data.hasOwnProperty('error')){
                    new Toast('There was an error trying to like this spin. Please try again later.', 'error');
                    return;
                }

                if (data.hasOwnProperty('alert')){
                    new Toast('This spin was already like.', 'info');
                    return;
                }

                likeButton.classList.add('active-like');
                new Toast('Successfully like spin.', 'success');

                const likeCountSpan = this.querySelector('.like-image-button > span');
                likeCountSpan.textContent = `${Number(likeCountSpan.textContent) + 1}`;
            }
        );
    }
}
