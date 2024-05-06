import {Router} from "../../js/Router.js";
import {
    ComplexController,
    SpinController,
    CommentLikesController,
    CrawlerController,
    SpinCommentController,
    SpinLikesController,
    SpinTagsController,
    TagController, WebController, WebSpinsController
} from "../../js/api.js";

export class MasonryFeed extends HTMLElement {

    constructor() {
        super();

        this.upload = this.hasAttribute('upload');
        this.complexClass = new ComplexController ();
        this.spinClass = new SpinController();
    }

    loadData(){
        // ToDo, properly get crawlerID / crawlerEmail
        const crawlerID = 3;

        if (!this.upload){
            this.complexClass.likedUserFeed(
                crawlerID,
                this.populateFeed.bind(this)
            );
            return
        }

        this.spinClass.getUserSpinsWithUserID(
            crawlerID,
            this.populateFeed.bind(this)
        );
    }

    connectedCallback() {
        fetch('components/masonry-feed/masonry-feed.html')
            .then(response => response.text())
            .then(html => {
                this.innerHTML = html;
                this.loadData();;
            });
    }

    // TODO: Infinity Scroll
    populateFeed(data) {
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

            const buttonCreate = document.getElementById("btnCreate");

            document.getElementById('inpImg').onchange = function () {
                const fileName = this.files.item(0).name;
                const imageLabel = document.getElementById("lblImg");
                const imageSpan = document.getElementById("spnImg");
                const uploadIcon = document.getElementById("upload-icon");
                imageLabel.classList.add("filled");
                imageSpan.textContent = fileName;
                imageSpan.classList.add("filled");
                uploadIcon.classList.add("filled");
            };
    
            document.getElementById('btnClose').addEventListener('click', () => 
            {
                this.closeModal(modal);
            })

            buttonCreate.addEventListener("click", () => 
            {
                this.closeModal(modal);
            })
        }

        const router = new Router();
        data.forEach(spin => {
            const img = document.createElement('img')
            img.src = spin.spinLink;
            img.alt = spin.spinDescription

            article.appendChild(img);

            img.addEventListener('click', (e) => {
                router.handleNavigation('/pin', spin);
            })
        })
    }

    closeModal(modal) {
        const titleInput = document.getElementById("inpTitle");
        const descriptionTextArea = document.getElementById("txtDesc");
        const tagsInput = document.getElementById("inpTag");
        const imageInput = document.getElementById("inpImg");
        const uploadIcon = document.getElementById("upload-icon");
        const imageLabel = document.getElementById("lblImg");
        const imageSpan = document.getElementById("spnImg");

        titleInput.value="";
        descriptionTextArea.value="";
        tagsInput.value="";
        imageInput.value="";
        imageLabel.classList.remove("filled");
        imageSpan.classList.remove("filled");
        uploadIcon.classList.remove("filled");
        imageSpan.textContent = "Select Image";

        modal.close();
    }


}
