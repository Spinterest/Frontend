import {Router} from "./js/Router.js";
import {NavigationBar} from "./components/navigation-bar/navigation-bar.js";
import {MasonryFeed} from "./components/masonry-feed/masonry-feed.js";

customElements.define('navigation-bar', NavigationBar);
customElements.define('masonry-feed', MasonryFeed);

const router = new Router();