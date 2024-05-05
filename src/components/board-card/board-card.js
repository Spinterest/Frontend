export class BoardCard extends HTMLElement {

    constructor() {
        super();
        this.boardId = 0;
        this.board = 
        {
            "webID": 14,
            "webDescription": "This is a board",
            "webTitle": "Board",
            "image1": "https://i.pinimg.com/564x/76/98/57/769857ba643bf547c9aefcca8bbeaca5.jpg",
            "image2": "https://i.pinimg.com/564x/19/16/f9/1916f9ec9d37db7b5599b25747aef3fe.jpg",
            "image3": "https://i.pinimg.com/564x/df/76/e2/df76e29118c254d7eadf1e6d5014bdff.jpg",
            "image4": "https://i.pinimg.com/564x/50/ec/07/50ec07698fc465016ba06479dbb1f3b0.jpg"
        }
    }

    connectedCallback() {
        fetch('components/board-card/board-card.html')
            .then(response => response.text())
            .then(html => {
                this.innerHTML = html;
                this.populateCard()
            });
    }

    attributeChangedCallback(property, oldValue, newValue) {
        if (oldValue === newValue) return;
        this[property] = newValue;
    }

    populateCard() {
        console.log(this.board.webTitle);

        const image1 = document.getElementById("image1");
        image1.src = this.board.image1;
        image1.id = this.boardId+"-image1";

        const image2 = document.getElementById("image2");
        image2.src = this.board.image2;
        image2.id = this.boardId+"-image2"

        const image3 = document.getElementById("image3");
        image3.src = this.board.image3;
        image3.id = this.boardId+"-image3"

        const image4 = document.getElementById("image4");
        image4.src = this.board.image4;
        image4.id = this.boardId+"-image4"

        const title = document.getElementById("title");
        title.textContent = this.board.webTitle;
        title.id = this.boardId+"-title";

        const subtitle = document.getElementById("subtitle");
        subtitle.textContent = this.board.webDescription;
        subtitle.id = this.boardId+"-subtitle";

        console.log(this.boardId);
    }
}
