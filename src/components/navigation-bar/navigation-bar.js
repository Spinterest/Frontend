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
                this.addButtonEvents();
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

    addButtonEvents() {
        const homeButton = document.getElementById("btnHome");
                const spinButton = document.getElementById("btnSpin");
                const webButton = document.getElementById("btnWeb");
                const spiderImage = document.getElementById("imgSpider");

                function home(){
                    homeButton.classList.add('active');
                    spinButton.classList.remove('active');
                    webButton.classList.remove('active');
                }

                homeButton.addEventListener("click",home);

                spiderImage.addEventListener("click",home);

                function spin(){
                    homeButton.classList.remove('active');
                    spinButton.classList.add('active');
                    webButton.classList.remove('active');
                }

                spinButton.addEventListener("click",spin);

                function web(){
                    homeButton.classList.remove('active');
                    spinButton.classList.remove('active');
                    webButton.classList.add('active');
                }

                webButton.addEventListener("click",web);
    }
}
