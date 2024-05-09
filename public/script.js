import {Router} from "./js/Router.js";
import {NavigationBar} from "./components/navigation-bar/navigation-bar.js";
import {HeaderSection} from "./components/header-section/header-section.js";
import {MasonryFeed} from "./components/masonry-feed/masonry-feed.js";
import {BoardFeed} from "./components/board-feed/board-feed.js";
import {BoardCard} from "./components/board-card/board-card.js";
import {PinFeed} from "./components/pin-feed/pin-feed.js";
import {CrawlerController} from "../../js/API.js";
import {AuthController} from "./js/API.js";

customElements.define('pin-feed', PinFeed);
customElements.define('navigation-bar', NavigationBar);
customElements.define('masonry-feed', MasonryFeed);
customElements.define('board-feed', BoardFeed);
customElements.define('board-card', BoardCard);
customElements.define('header-section', HeaderSection);

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

            router.handleNavigation('/');
        }
    });

    const btnSignIn = document.getElementById("sign-in");
    btnSignIn.classList.add("hidden");

    const profile = document.getElementById("profile");
    profile.classList.remove("hidden");
}

const authController = new AuthController();

const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get("code");
if (code) {
    localStorage.setItem('code', code);
}

if (!localStorage.getItem('code')) {
    const data = {url: "https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&client_id=938276127101-roljisla2hu5nta50tv888bmj1b2ci95.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F&response_type=code&access_type=offline&state=state_parameter_passthrough_value&include_granted_scopes=true"}
    window.location.href = data.url;
}