import {BoardCard} from "../web-card/web-card.js";

export class WebFeed extends HTMLElement {

    constructor() {
        super();
        this.spins = []
    }

    connectedCallback() {
        fetch('components/web-feed/web-feed.html')
            .then(response => response.text())
            .then(html => {            
                this.innerHTML = html;
                this.addButtonEvents();
            });
    }

    attributeChangedCallback(property, oldValue, newValue) {
        if (oldValue === newValue) return;
        this[property] = newValue;
    }

    addButtonEvents() {
        const showCreateWebButton = document.getElementById('create-card');
        const createWebPopup = document.getElementById('create-web');
        const createWebButton = document.getElementById('btnCreate');

        showCreateWebButton.addEventListener('click', () => {createWebPopup.showModal();})
        createWebButton.addEventListener('click', () => {
            createWebPopup.close();
        })
    }
}
