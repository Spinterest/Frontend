import {Toast} from "./Toast.js";

export class Router {

    routes = {
        '/': 'home.html',
        '/boards': 'boards.html',
        '/pins': 'pins.html',
        '/pin': 'pin.html',
        '/boards-view': 'viewBoard.html',
    };

    constructor() {
        window.addEventListener('popstate', () => {
            this.handleNavigation(window.location.pathname);
        });

        document.addEventListener('DOMContentLoaded', () => {
            this.handleNavigation(window.location.pathname);
        });
    }

    loadContent(route) {
        const filename =  'pages/' + this.routes[route];
        if (!filename) {
            console.error('Route not found:', route);
            return;
        }

        // Fetch HTML file
        fetch(filename)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch HTML file');
                }
                return response.text();
            })
            .then(html => {
                // Update the content area with the fetched HTML
                document.getElementById('content').innerHTML = html;
            })
            .catch(error => {
                console.error('Error loading HTML:', error);
            });
    }

    handleNavigation(path = '/', data = null) {
        history.pushState(data, null, path);
        this.loadContent(path);
    }

}