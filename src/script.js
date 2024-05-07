import {Router} from "./js/Router.js";
import {NavigationBar} from "./components/navigation-bar/navigation-bar.js";
import {HeaderSection} from "./components/header-section/header-section.js";
import {MasonryFeed} from "./components/masonry-feed/masonry-feed.js";
import {BoardFeed} from "./components/board-feed/board-feed.js";
import {BoardCard} from "./components/board-card/board-card.js";
import {PinFeed} from "./components/pin-feed/pin-feed.js";


customElements.define('pin-feed', PinFeed);
customElements.define('navigation-bar', NavigationBar);
customElements.define('masonry-feed', MasonryFeed);
customElements.define('board-feed', BoardFeed);
customElements.define('board-card', BoardCard);
customElements.define('header-section', HeaderSection);

const router = new Router();
router.handleNavigation('/');
