import {Router} from "../../js/Router.js";
import {CrawlerController} from "../../js/api.js";


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
                this.populateBar();
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
        const btnHome = document.getElementById("btnHome");
        const btnPin = document.getElementById("btnPin");
        const btnBoard = document.getElementById("btnBoard");
        const imgSpider = document.getElementById("imgSpider");
        const btnEditProfile = document.getElementById("btnEditProfile");

        const labelUpdateUsernameError = document.getElementById("labelUpdateUsernameError");
        const inpUsername = document.getElementById("inpUsername");
        const modalEditProfile = document.getElementById("modelEditProfile");
        const btnUpdateUsername = document.getElementById("btnUpdateUsername");
        const btnCloseUpdateUsername = document.getElementById("btnCloseUpdateUsername");
        const btnSignOut = document.getElementById("btnSignOut");
        const profile = document.getElementById("profile");
        const signIn = document.getElementById("sign-in");

        labelUpdateUsernameError.style.display = 'none';

        function home(){
            btnHome.classList.add('active');
            btnPin.classList.remove('active');
            btnBoard.classList.remove('active');
        }

        btnHome.addEventListener("click",home);
        imgSpider.addEventListener("click",home);

        btnPin.addEventListener(
            "click",
            () => {
                btnHome.classList.remove('active');
                btnPin.classList.add('active');
                btnBoard.classList.remove('active');
                console.log(Login.userEmail)
            }
        );

        btnBoard.addEventListener(
            "click",
            () => {
                btnHome.classList.remove('active');
                btnPin.classList.remove('active');
                btnBoard.classList.add('active');
            }
        );

        function closeModal(){
            inpUsername.value = '';
            labelUpdateUsernameError.style.display = 'none';

            modalEditProfile.close();
        }

        btnEditProfile.addEventListener('click', () => {modalEditProfile.showModal();});
        btnCloseUpdateUsername.addEventListener("click", closeModal.bind(this));

        btnUpdateUsername.addEventListener(
            'click',
            (event) => {
                event.preventDefault();

                // Todo, can use email or ID, add proper one though
                const crawlerController = new CrawlerController();

                const crawlerID = 3
                // const crawlerEmail = "katlego.kungoane@bbd.co.za"

                // crawlerController.editCrawlerNameWithEmail(crawlerEmail, callBack);
                crawlerController.editCrawlerNameWithID(
                    {
                        crawlerID: crawlerID,
                        crawlerUserName: inpUsername.value
                    },
                    (data) => {
                        // Todo, maybe add red glow on button for error
                        // The update didnt happen
                        if (data.hasOwnProperty('alert')){
                            labelUpdateUsernameError.textContent = data.alert;
                            labelUpdateUsernameError.style.display = 'inherit';
                            return;
                        }

                        if (!data || data.crawlerUserName !== inpUsername.value){
                            labelUpdateUsernameError.style.display = 'inherit';
                            return;
                        }

                        // Todo, maybe add a successful animation
                        closeModal();
                    }
                )
            }
        )

        btnSignOut.addEventListener("click", () => {
            localStorage.removeItem("crawlerID");
            localStorage.removeItem("crawlerEmail");
            localStorage.removeItem("crawlerToken");
            localStorage.removeItem("crawlerUserName");
            profile.classList.add("hidden");
            signIn.classList.remove("hidden");
        })
    }

    populateBar(){
        const profile = document.getElementById("profile");
        const signIn = document.getElementById("sign-in")
        if (localStorage.getItem("crawlerID")==null){
            profile.classList.add("hidden");
            signIn.classList.remove("hidden");
        } else {
            signIn.classList.add("hidden");
            profile.classList.remove("hidden");
        }
    }
}
