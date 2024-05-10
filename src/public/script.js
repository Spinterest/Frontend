import {Router} from "./js/Router.js";
import {NavigationBar} from "./components/navigation-bar/navigation-bar.js";
import {HeaderSection} from "./components/header-section/header-section.js";
import {MasonryFeed} from "./components/masonry-feed/masonry-feed.js";
import {BoardFeed} from "./components/board-feed/board-feed.js";
import {BoardCard} from "./components/board-card/board-card.js";
import {PinFeed} from "./components/pin-feed/pin-feed.js";
import {AutherController, CrawlerController} from "./js/API.js";
import {Toast} from "./js/Toast.js";

customElements.define('pin-feed', PinFeed);
customElements.define('navigation-bar', NavigationBar);
customElements.define('masonry-feed', MasonryFeed);
customElements.define('board-feed', BoardFeed);
customElements.define('board-card', BoardCard);
customElements.define('header-section', HeaderSection);

const router = new Router();

function decodeJwtResponse(token) {
    let base64Url = token.split(".")[1];
    let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    let jsonPayload = decodeURIComponent(
    atob(base64)
        .split("")
        .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
}

window.handleCredentialResponse = (response) => {
    const responsePayload = decodeJwtResponse(response.credential);
    const crawlerController = new CrawlerController();
    crawlerController.login(responsePayload.email, (data) => {
        if (data!=null){
            localStorage.setItem('crawlerID',data.crawlerID);
            localStorage.setItem('crawlerEmail',data.crawlerEmail);
            localStorage.setItem('crawlerUserName',data.crawlerUserName);
            localStorage.setItem('crawlerToken',responsePayload.jti);

            const autherController = new AutherController();
            autherController.getCode((redirect) => {
                window.location.href = redirect.url;
            });

            router.handleNavigation('/');
        }
    });

    const btnSignIn = document.getElementById("sign-in");
    btnSignIn.classList.add("hidden");

    const profile = document.getElementById("profile");
    profile.classList.remove("hidden");
}

const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get("code");

if (code && !localStorage.getItem("access_token")) {
    const autherController = new AutherController();
    autherController.getAccessToken(code, (data) => {
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);
        new Toast("You are now logged in", "success");
    });
}

router.handleNavigation('/');