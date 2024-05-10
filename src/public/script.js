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

const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get("code");

if (code && !localStorage.getItem("access_token")) {
    const autherController = new AutherController();
    autherController.getAccessToken(code, (data) => {
        // Take Tokens
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);

        // Get mail and all
        fetch(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${data.access_token}`)
            .then((response) => {
                response.json().then((response) => {
                    const crawlerEmail = response.email;

                    const crawlerController = new CrawlerController();
                    crawlerController.login(crawlerEmail, (crawlerData) => {
                        localStorage.removeItem("crawlerID");
                        localStorage.removeItem("crawlerEmail");
                        localStorage.removeItem("crawlerUserName");

                        localStorage.setItem('crawlerID', crawlerData.crawlerID);
                        localStorage.setItem('crawlerEmail', crawlerData.crawlerEmail);
                        localStorage.setItem('crawlerUserName', crawlerData.crawlerUserName);

                        NavigationBar.hideSignUp();

                        new Toast("You are now logged in", "success");
                    });
                });
            });
    });
}

router.handleNavigation('/');