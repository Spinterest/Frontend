import {BoardCard} from "../board-card/board-card.js";

export class BoardFeed extends HTMLElement {

    constructor() {
        super();
        this.boards = [
            {
                "webID": 14,
                "crawlerID": 5,
                "webDescription": "desc",
                "webIsDeleted": false,
                "webTitle": "title"
            },
            {
                "webID": 16,
                "crawlerID": 7,
                "webDescription": "desc",
                "webIsDeleted": false,
                "webTitle": "title"
            }
        ]
    }

    connectedCallback() {
        fetch('components/board-feed/board-feed.html')
            .then(response => response.text())
            .then(html => {            
                this.innerHTML = html;
                this.addButtonEvents();
                this.populateFeed();
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

        showCreateBoardButton.addEventListener('click', () => {createBoardPopup.showModal();});
        createBoardButton.addEventListener('click', () => 
        {
            this.closePopup(createBoardPopup, titleInput, descriptionTextArea);
        });
        document.getElementById('btnClose').addEventListener('click', () => 
        {
            this.closePopup(createBoardPopup, titleInput, descriptionTextArea);
        });
    }

    populateFeed() {
        const feed = document.getElementById("card-feed");

        this.boards.forEach(board => {
            const boardCard = document.createElement('board-card');
            boardCard.boardId = board.webID;

            feed.appendChild(boardCard);
        })
    }

    closePopup(createBoardPopup, titleInput, descriptionTextArea){
        createBoardPopup.close();
        titleInput.value="";
        descriptionTextArea.value="";
    }
}
