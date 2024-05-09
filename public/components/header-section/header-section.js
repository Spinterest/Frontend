export class HeaderSection extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        fetch('components/header-section/header-section.html')
            .then(response => response.text())
            .then(html => {
                this.innerHTML = html;
            });
    }

}
