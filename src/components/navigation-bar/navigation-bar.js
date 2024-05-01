import {Router} from "../../js/Router.js";

export class NavigationBar extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        fetch('components/navigation-bar/navigation-bar.html')
            .then(response => response.text())
            .then(html => {
                this.innerHTML = html;
                this.addNavigation();
            });
    }

    addNavigation() {
        // get all the nav a
        const router = new Router();
        const links = this.querySelectorAll('nav a');
        links.forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                const href = link.getAttribute('href');
                router.handleNavigation(href)
            });
        });
    }
}
