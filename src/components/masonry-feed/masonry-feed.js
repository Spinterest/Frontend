export class MasonryFeed extends HTMLElement {

    constructor() {
        super();

        this.upload = this.hasAttribute('upload');

        const spinsString = this.getAttribute('spins');
        // TODO: Uncomment
        // this.spins = spinsString ? JSON.parse(spinsString) : [];

        // TODO: Remove this.spins details.
        this.spins = [
            {
                "spinID": 14,
                "crawlerID": 1,
                "spinIsDeleted": false,
                "spinTitle": "",
                "spinDescription": "",
                "spinTimestamp": "2024-05-01T14:15:51.153Z",
                "spinLink": "https://i.pinimg.com/564x/76/98/57/769857ba643bf547c9aefcca8bbeaca5.jpg"
            },
            {
                "spinID": 15,
                "crawlerID": 1,
                "spinIsDeleted": false,
                "spinTitle": "",
                "spinDescription": "",
                "spinTimestamp": "2024-05-01T14:15:51.153Z",
                "spinLink": "https://i.pinimg.com/564x/19/16/f9/1916f9ec9d37db7b5599b25747aef3fe.jpg"
            },
            {
                "spinID": 16,
                "crawlerID": 1,
                "spinIsDeleted": false,
                "spinTitle": "",
                "spinDescription": "",
                "spinTimestamp": "2024-05-01T14:15:51.153Z",
                "spinLink": "https://i.pinimg.com/564x/df/76/e2/df76e29118c254d7eadf1e6d5014bdff.jpg"
            },
            {
                "spinID": 17,
                "crawlerID": 1,
                "spinIsDeleted": false,
                "spinTitle": "",
                "spinDescription": "",
                "spinTimestamp": "2024-05-01T14:15:51.153Z",
                "spinLink": "https://i.pinimg.com/564x/50/ec/07/50ec07698fc465016ba06479dbb1f3b0.jpg"
            },
            {
                "spinID": 18,
                "crawlerID": 1,
                "spinIsDeleted": false,
                "spinTitle": "",
                "spinDescription": "",
                "spinTimestamp": "2024-05-01T14:15:51.153Z",
                "spinLink": "https://i.pinimg.com/564x/53/2f/4a/532f4a46412e946350288190c7b88058.jpg"
            },
            {
                "spinID": 18,
                "crawlerID": 1,
                "spinIsDeleted": false,
                "spinTitle": "",
                "spinDescription": "",
                "spinTimestamp": "2024-05-01T14:15:51.153Z",
                "spinLink": "https://i.pinimg.com/564x/79/80/53/798053f50f3fe69f2b221a8b398685d2.jpg"
            },
            {
                "spinID": 18,
                "crawlerID": 1,
                "spinIsDeleted": false,
                "spinTitle": "",
                "spinDescription": "",
                "spinTimestamp": "2024-05-01T14:15:51.153Z",
                "spinLink": "https://i.pinimg.com/564x/b0/7b/36/b07b363cd5512c6f1025be413a77f618.jpg"
            },
            {
                "spinID": 18,
                "crawlerID": 1,
                "spinIsDeleted": false,
                "spinTitle": "",
                "spinDescription": "",
                "spinTimestamp": "2024-05-01T14:15:51.153Z",
                "spinLink": "https://i.pinimg.com/564x/da/65/b9/da65b99681d8a74bc0fa4340a632798a.jpg"
            },
            {
                "spinID": 18,
                "crawlerID": 1,
                "spinIsDeleted": false,
                "spinTitle": "",
                "spinDescription": "",
                "spinTimestamp": "2024-05-01T14:15:51.153Z",
                "spinLink": "https://i.pinimg.com/564x/0e/5d/d3/0e5dd35314fd1f9a4d2d6318dc39fb93.jpg"
            },
            {
                "spinID": 18,
                "crawlerID": 1,
                "spinIsDeleted": false,
                "spinTitle": "",
                "spinDescription": "",
                "spinTimestamp": "2024-05-01T14:15:51.153Z",
                "spinLink": "https://i.pinimg.com/564x/53/2f/4a/532f4a46412e946350288190c7b88058.jpg"
            },
             {
                "spinID": 18,
                "crawlerID": 1,
                "spinIsDeleted": false,
                "spinTitle": "",
                "spinDescription": "",
                "spinTimestamp": "2024-05-01T14:15:51.153Z",
                "spinLink": "https://i.pinimg.com/564x/53/2f/4a/532f4a46412e946350288190c7b88058.jpg"
            },
             {
                "spinID": 18,
                "crawlerID": 1,
                "spinIsDeleted": false,
                "spinTitle": "",
                "spinDescription": "",
                "spinTimestamp": "2024-05-01T14:15:51.153Z",
                "spinLink": "https://i.pinimg.com/564x/53/2f/4a/532f4a46412e946350288190c7b88058.jpg"
            },
             {
                "spinID": 18,
                "crawlerID": 1,
                "spinIsDeleted": false,
                "spinTitle": "",
                "spinDescription": "",
                "spinTimestamp": "2024-05-01T14:15:51.153Z",
                "spinLink": "https://i.pinimg.com/564x/0c/c8/31/0cc83134ebd7c7968446308ed616ac79.jpg"
            }
        ]
    }

    connectedCallback() {
        fetch('components/masonry-feed/masonry-feed.html')
            .then(response => response.text())
            .then(html => {
                this.innerHTML = html;
                this.populateFeed()
            });
    }

    // TODO: Infinity Scroll
    populateFeed() {
        const article = this.querySelector('article');

        if (this.upload) {
            const button = document.createElement('button');
            button.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="5em" height="5em" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
                </svg>
                <span>Create Spin</span>
            `;

            const modal = document.getElementById('create-image');

            button.addEventListener('click', () => {
                modal.showModal()
            })

            article.appendChild(button);
        }

        this.spins.forEach(spin => {
            const img = document.createElement('img')
            img.src = spin.spinLink;
            img.alt = spin.spinDescription

            article.appendChild(img);
        })

    }


}
