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
                const pinButton = document.getElementById("btnPin");
                const boardButton = document.getElementById("btnBoard");
                const spiderImage = document.getElementById("imgSpider");

                function home(){
                    homeButton.classList.add('active');
                    pinButton.classList.remove('active');
                    boardButton.classList.remove('active');
                }

                homeButton.addEventListener("click",home);

                spiderImage.addEventListener("click",home);

                function pin(){
                    homeButton.classList.remove('active');
                    pinButton.classList.add('active');
                    boardButton.classList.remove('active');
                }

                pinButton.addEventListener("click",pin);

                function board(){
                    homeButton.classList.remove('active');
                    pinButton.classList.remove('active');
                    boardButton.classList.add('active');
                }

                boardButton.addEventListener("click",board);
    }
}
