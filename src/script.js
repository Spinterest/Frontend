import {Router} from "./js/Router.js";
import {NavigationBar} from "./components/navigation-bar/navigation-bar.js";

customElements.define('navigation-bar', NavigationBar);

const router = new Router();