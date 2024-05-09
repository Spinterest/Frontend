import {WebController} from "../../js/API.js";
import {Router} from "../../js/Router.js";
import {Toast} from "../../js/Toast.js";

export class BoardFeed extends HTMLElement {

    constructor() {
        super();
        this.webClass = new WebController();
        this.crawlerID = localStorage.getItem("crawlerID")
    }

    connectedCallback() {
        fetch('components/board-feed/board-feed.html')
            .then(response => response.text())
            .then(html => {
                if (this.crawlerID) {
                    this.innerHTML = html;
                    this.addButtonEvents();
                    this.getData();
                    return;
                }

                new Toast('Please Log In To Use This Feature', 'error');
                new Router().handleNavigation('/');
            });
    }

    attributeChangedCallback(property, oldValue, newValue) {
        if (oldValue === newValue) return;
        this[property] = newValue;
    }

    addButtonEvents() {

        const createBoardPopup = document.getElementById('create-board');
        const titleInput = document.getElementById("inpBoardTitle");
        const descriptionTextArea = document.getElementById("txtBoardDesc");
        const labelCreateWebError = document.getElementById("labelCreateWebError");
        labelCreateWebError.style.display = 'none';

        function closePopup() {
            createBoardPopup.close();
            titleInput.value = "";
            descriptionTextArea.value = "";
            labelCreateWebError.style.display = 'none';
        }

        const showCreateBoardButton = document.getElementById('create-card');
        showCreateBoardButton.addEventListener('click', () => {
            createBoardPopup.showModal();
        });

        const createBoardButton = document.getElementById('btnCreate');
        createBoardButton.addEventListener('click', (event) => {
            event.preventDefault();

            // validation
            if (titleInput.value === '') {
                new Toast('Title cannot be empty.','error')
                return;
            }

            const webController = new WebController();
            webController.createWeb(
                this.crawlerID,
                descriptionTextArea.value,
                titleInput.value,
                (data) => {
                    // The update didnt happen
                    if (!data || data.hasOwnProperty('error')) {
                        labelCreateWebError.style.display = 'inherit';
                        return;
                    }

                    if (data.hasOwnProperty('alert')) {
                        labelCreateWebError.textContent = data.alert;
                        labelCreateWebError.style.display = 'inherit';
                        return;
                    }

                    closePopup();
                    this.getData();
                }
            )
        });

        document
            .getElementById('btnClose')
            .addEventListener('click', () => {
                closePopup();
            });
    }

    getData() {
        this.webClass.getUserWebsWithUserID(
            this.crawlerID,
            this.populateFeed.bind(this)
        );
    }

    populateFeed(webs) {
        document.getElementById("header-section-web-section").classList.add("hidden");
        const feed = document.getElementById("card-feed");

        if (!webs) {
            webs = []
        } else if (!Array.isArray(webs)) {
            webs = [webs];
        }

        webs.forEach(web => {
            const existingBoardCard = document.getElementById(`$board-card-${web.webID}`);
            if (!existingBoardCard) {
                const boardCard = document.createElement('board-card');
                boardCard.id = `$board-card-${web.webID}`;
                boardCard.webID = web.webID;
                boardCard.webTitle = web.webTitle;
                boardCard.webDescription = web.webDescription;

                boardCard.addEventListener('click', (event) => {
                    const router = new Router();
                    router.handleNavigation('/boards-view', web);
                });

                feed.appendChild(boardCard);
            }
        });
    }
}