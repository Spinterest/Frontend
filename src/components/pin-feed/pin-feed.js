
export class PinFeed extends HTMLElement {

    constructor() {
        super();
        this.pin = {
            "pinID": 16,
            "googleUserID": 1,
            "pinIsDeleted": false,
            "pinTitle": "",
            "pinDescription": "",
            "pinTimestamp": "2024-05-01T14:15:51.153Z",
            "pinLink": "https://i.pinimg.com/564x/df/76/e2/df76e29118c254d7eadf1e6d5014bdff.jpg"
        }
    }

    connectedCallback() {
        fetch('components/pin-feed/pin-feed.html')
            .then(response => response.text())
            .then(html => {
                this.innerHTML = html;
                this.populatePage()
            });
    }

    populatePage() {
        const article = this.querySelector('article');
        if (!history.state) {
            const error = document.createElement('p');
            error.innerText = 'It seems like the image could not be found. Please return home.';
            article.appendChild(error)
        }

        // add the image

    }
}
