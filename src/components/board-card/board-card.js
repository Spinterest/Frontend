import{ComplexController
} from "../../js/api.js";

export class BoardCard extends HTMLElement {

    constructor() {
        super();
        this.webID = 0;
        this.complexClass = new ComplexController ();
    }

    connectedCallback() {
        fetch('components/board-card/board-card.html')
            .then(response => response.text())
            .then(html => {
                this.innerHTML = html;
                this.getData();
            });
    }

    attributeChangedCallback(property, oldValue, newValue) {
        if (oldValue === newValue) return;
        this[property] = newValue;
    }

    getData(){
        this.complexClass.getWebCard(
            this.webID,
            this.populateCard.bind(this)
        );
    }

    populateCard(board) {
        const image1 = document.getElementById("image1");
        image1.classList.add('hidden');
        if (board[0].spinLink!=undefined)
        {
            image1.src = board[0].spinLink;
            image1.classList.remove('hidden');
        };
        image1.id = this.boardId+"-image1";

        const image2 = document.getElementById("image2");
        image2.classList.add('hidden');
        if (board.length>1)
        {
            image2.src = board[1].spinLink;
            image2.classList.remove('hidden');
        };
        image2.id = this.boardId+"-image2"

        const image3 = document.getElementById("image3");
        image3.classList.add('hidden');
        if (board.length>2)
        {
            image3.src = board[2].spinLink;
            image3.classList.remove('hidden');
        };
        image3.id = this.boardId+"-image3"

        const image4 = document.getElementById("image4");
        image4.classList.add('hidden');
        if (board.length>3)
        {
            image4.src = board[3].spinLink;
            image4.classList.remove('hidden');
        };
        image4.id = this.boardId+"-image4"

        const title = document.getElementById("title");
        title.textContent = board[0].webTitle;
        title.id = this.boardId+"-title";

        const subtitle = document.getElementById("subtitle");
        subtitle.textContent = board[0].webDescription;
        subtitle.id = this.boardId+"-subtitle";
    }
}
