import {Router} from "./js/Router.js";
import {NavigationBar} from "./components/navigation-bar/navigation-bar.js";
import {MasonryFeed} from "./components/masonry-feed/masonry-feed.js";
import {BoardFeed} from "./components/board-feed/board-feed.js";
import {BoardCard} from "./components/board-card/board-card.js";
import {PinFeed} from "./components/pin-feed/pin-feed.js";
import {CrawlerController} from "../../js/api.js";



customElements.define('pin-feed', PinFeed);
customElements.define('navigation-bar', NavigationBar);
customElements.define('masonry-feed', MasonryFeed);
customElements.define('board-feed', BoardFeed);
customElements.define('board-card', BoardCard);

const router = new Router();
router.handleNavigation('/');

function decodeJwtResponse(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
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
        }
    });

    const btnSignIn = document.getElementById("sign-in");
    btnSignIn.classList.add("hidden");

    const profile = document.getElementById("profile");
    profile.classList.remove("hidden");
}



  
