import {BoardCard} from "../board-card/board-card.js";

export class BoardFeed extends HTMLElement {

    constructor() {
        super();
        this.pins = []
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

    populateFeed() {
        
    }

    addButtonEvents() {
        const showCreateBoardButton = document.getElementById('create-card');
        const createBoardPopup = document.getElementById('create-board');
        const createBoardButton = document.getElementById('btnCreate');

        showCreateBoardButton.addEventListener('click', () => {createBoardPopup.showModal();})
        createBoardButton.addEventListener('click', () => {
            createBoardPopup.close();
        })
    }
}
