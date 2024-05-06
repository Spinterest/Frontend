import {BoardCard} from "../board-card/board-card.js";
import {
    WebController, WebSpinsController
} from "../../js/api.js";

export class BoardFeed extends HTMLElement {

    constructor() {
        super();
        this.webClass = new WebController ();
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

    getData(){
        this.webClass.getUserWebsWithUserID(
            0,
            this.populateFeed.bind(this)
        );
    }

    populateFeed(boards) {
        const feed = document.getElementById("card-feed");

        try {
            boards.forEach(board => {
                const boardCard = document.createElement('board-card');
                boardCard.webID = board.webID;
    
                feed.appendChild(boardCard);
            })
            
        } catch (error) {
            const boardCard = document.createElement('board-card');
            boardCard.webID = boards.webID;

            feed.appendChild(boardCard); 
        }
        
    }

    closePopup(createBoardPopup, titleInput, descriptionTextArea){
        createBoardPopup.close();
        titleInput.value="";
        descriptionTextArea.value="";
    }
}
