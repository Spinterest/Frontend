import {Router} from "./js/Router.js";
import {NavigationBar} from "./components/navigation-bar/navigation-bar.js";
import {MasonryFeed} from "./components/masonry-feed/masonry-feed.js";
import {PinFeed} from "./components/pin-feed/pin-feed.js";

customElements.define('navigation-bar', NavigationBar);
customElements.define('masonry-feed', MasonryFeed);
customElements.define('pin-feed', PinFeed);

const router = new Router();
router.handleNavigation('/');
