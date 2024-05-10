import {Router} from "../../js/Router.js";
import {AutherController, CrawlerController} from "../../js/API.js";
import {Toast} from "../../js/Toast.js";


export class NavigationBar extends HTMLElement {

    constructor() {
        super();

    }

    static hideLogin(){
        document.getElementById("profile").classList.add("hidden");
        document.getElementById("profile").classList.remove("visible");

        document.getElementById("sign-in").classList.add("visible");
        document.getElementById("sign-in").classList.remove("hidden");
    }

    static hideSignUp(){
        document.getElementById("sign-in").classList.add("hidden");
        document.getElementById("sign-in").classList.remove("visible");

        document.getElementById("profile").classList.add("visible");
        document.getElementById("profile").classList.remove("hidden");
    }

    connectedCallback() {
        fetch('components/navigation-bar/navigation-bar.html')
            .then(response => response.text())
            .then(html => {
                this.innerHTML = html;

                if (!localStorage.getItem('access_token')) {
                    NavigationBar.hideLogin();
                }
                else {
                    NavigationBar.hideSignUp();
                }

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

        const inpUsername = document.getElementById("inpUsername");
        const modalEditProfile = document.getElementById("modelEditProfile");
        const btnUpdateUsername = document.getElementById("btnUpdateUsername");
        const btnCloseUpdateUsername = document.getElementById("btnCloseUpdateUsername");
        const btnSignOut = document.getElementById("btnSignOut");
        const btnSignIn = document.getElementById("sign-in");

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
            modalEditProfile.close();
        }

        btnEditProfile.addEventListener('click', () => {modalEditProfile.showModal();});
        btnCloseUpdateUsername.addEventListener("click", closeModal.bind(this));

        modalEditProfile.addEventListener('submit', (event) => {
            event.preventDefault();

            const crawlerController = new CrawlerController();
            const crawlerID = parseInt(localStorage.getItem("crawlerID"));

            crawlerController.editCrawlerNameWithID(
                crawlerID,
                inpUsername.value,
                (data) => {
                    if (!data || data.hasOwnProperty('error')){
                        new Toast("There was an issue trying to change your username. Please try again later", "error");
                        return;
                    }

                    if (data.hasOwnProperty('alert')){
                        new Toast(`Username (${inpUsername.value}) is in use.`, "error");
                        return;
                    }

                    new Toast(`You have successfully changed your username to ${inpUsername.value}`, "success");
                    closeModal();
                }
            )
        });

        btnSignOut.addEventListener("click", () => {
            localStorage.removeItem("crawlerID");
            localStorage.removeItem("crawlerEmail");
            localStorage.removeItem("crawlerUserName");
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");

            NavigationBar.hideLogin();
        });

        btnSignIn.addEventListener('click', () => {
            const autherController = new AutherController();
            autherController.getCode((redirect) => {
                window.location.href = redirect.url;
            });
        });
    }

    populateBar(){
        if (!localStorage.getItem("access_token")){
            NavigationBar.hideLogin();
            return;
        }

        NavigationBar.hideSignUp();
    }
}
