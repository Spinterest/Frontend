import {ComplexController} from "../../js/API.js";

export class BoardCard extends HTMLElement {

    constructor() {
        super();
        this.complexClass = new ComplexController();
    }

    connectedCallback() {
        fetch('components/board-card/board-card.html')
            .then(response => response.text())
            .then(html => {
                this.innerHTML = html;
                this.getData();
            });
    }

    attributeChangedCallback(property, oldValue, newValue) {
        if (oldValue === newValue) return;
        this[property] = newValue;
    }

    getData() {
        if (this.webID != null) {
            this.complexClass.getLimitedSpinsForWeb(
                this.webID,
                this.populateCard.bind(this)
            );
        }
    }

    populateCard(data) {
        if (!data){
            data = [];
        }
        else if (!Array.isArray(data)) {
            data = [data];
        }

        const boardCardContainer = this.querySelector('#board-card-container');
        const boardCardImageContainer = this.querySelector('#board-card-image-container');

        for (let index = 0; index < 4; index++) {
            const imageSection = document.createElement("section");
            imageSection.setAttribute('class', 'image');

            const image = document.createElement(`img`);
            image.classList.add('hidden');
            if (data && index < data.length) {
                image.src = data[index].spinLink;
                image.classList.remove('hidden');
            }

            imageSection.appendChild(image);
            boardCardImageContainer.appendChild(imageSection);
        }

        const title = document.createElement('h4');
        title.setAttribute('class', 'web-text-cutter');
        title.textContent = this.webTitle;
        title.id = `${this.webID}-title`;

        const subtitle = document.createElement('p');
        subtitle.setAttribute('class', 'web-text-cutter');
        subtitle.textContent = this.webDescription || "Description";
        subtitle.id = `${this.webID}-subtitle`;

        boardCardContainer.appendChild(title);
        boardCardContainer.appendChild(subtitle);
    }
}
