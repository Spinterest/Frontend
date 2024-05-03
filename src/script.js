import {Router} from "./js/Router.js";
import {NavigationBar} from "./components/navigation-bar/navigation-bar.js";
import {MasonryFeed} from "./components/masonry-feed/masonry-feed.js";
import {WebFeed} from "./components/web-feed/web-feed.js";
import {WebCard} from "./components/web-card/web-card.js";


customElements.define('navigation-bar', NavigationBar);
customElements.define('masonry-feed', MasonryFeed);
customElements.define('web-feed', WebFeed);
customElements.define('web-card', WebCard);

const router = new Router();