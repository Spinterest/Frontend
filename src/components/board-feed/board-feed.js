import {WebController, WebSpinsController} from "../../js/API.js";
import {Router} from "../../js/Router.js";

export class BoardFeed extends HTMLElement {

    constructor() {
        super();
        this.webClass = new WebController ();

        //Todo, get a proper crawlerID
        this.crawlerID = 3;
    }

    connectedCallback() {
        fetch('components/board-feed/board-feed.html')
            .then(response => response.text())
            .then(html => {            
                this.innerHTML = html;
                this.addButtonEvents();
                this.getData();
            });
    }

    attributeChangedCallback(property, oldValue, newValue) {
        if (oldValue === newValue) return;
        this[property] = newValue;
    }

    addButtonEvents() {
        const showCreateBoardButton = document.getElementById('create-card');
        const createBoardPopup = document.getElementById('create-board');
        const createBoardButton = document.getElementById('btnCreate');
        const titleInput = document.getElementById("inpBoardTitle");
        const descriptionTextArea = document.getElementById("txtBoardDesc");
        const labelCreateWebError = document.getElementById("labelCreateWebError");
        labelCreateWebError.style.display = 'none';

        function closePopup(){
            createBoardPopup.close();
            titleInput.value="";
            descriptionTextArea.value="";
            labelCreateWebError.style.display = 'none';
        }

        showCreateBoardButton.addEventListener('click', () => {createBoardPopup.showModal();});
        createBoardButton.addEventListener('click', (event) =>
        {
            // Todo, give real crawler
            event.preventDefault();

            const webController = new WebController();
            webController.createWeb(
                this.crawlerID,
                descriptionTextArea.value,
                titleInput.value,
                (data) => {
                    // The update didnt happen
                    if (!data || data.hasOwnProperty('error')){
                        labelCreateWebError.style.display = 'inherit';
                        return;
                    }

                    if (data.hasOwnProperty('alert')){
                        labelCreateWebError.textContent = data.alert;
                        labelCreateWebError.style.display = 'inherit';
                        return;
                    }

                    closePopup();
                    this.getData();
                }
            )
        });
        document.getElementById('btnClose').addEventListener('click', () => {closePopup();});
    }

    getData(){
        this.webClass.getUserWebsWithUserID(
            this.crawlerID,
            this.populateFeed.bind(this)
        );
    }

    populateFeed(webs) {
        document.getElementById("header-section-web-section").classList.add("hidden");
        const feed = document.getElementById("card-feed");

        if (!webs){
            webs = []
        }
        else if (!Array.isArray(webs)){
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
