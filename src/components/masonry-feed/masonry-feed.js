import {Router} from "../../js/Router.js";
import {Toast} from "../../js/Toast.js";

import {
    ComplexController,
    SpinController,
    WebSpinsController
} from "../../js/api.js";

export class MasonryFeed extends HTMLElement {

    constructor() {
        super();

        this.upload = this.hasAttribute('upload');
        this.webView = this.hasAttribute('webView');

        this.complexClass = new ComplexController ();
        this.spinClass = new SpinController();
        this.webSpinClass = new WebSpinsController();

        // ToDo, properly get crawlerID / crawlerEmail
        this.crawlerID = 3;
    }

    handleViews(){
        document.getElementById("header-section-web-section").classList.add("hidden");

        if (this.webView){
            document.getElementById("header-section-web-section").classList.remove("hidden");

            const headerTitle = document.getElementById("header-section-title");
            const headerDescription = document.getElementById("header-section-description");

            headerTitle.classList.add("hidden");
            headerDescription.classList.add("hidden");

            if (this.web.webTitle != null){
                headerTitle.textContent = this.web.webTitle;
                headerTitle.classList.remove("hidden");
            }

            if (this.web.webDescription != null){
                headerDescription.textContent = this.web.webDescription;
                headerDescription.classList.remove("hidden");
            }
        }
    }

    loadProfileWebs(){
        this.complexClass.getWebsForCrawler(
            this.crawlerID,
            this.loadData.bind(this)
        )
    }

    loadData(profileWebs){
        if (profileWebs != null){
            this.profileWebTitles = profileWebs;
        }

        if (this.upload){
            this.spinClass.getUserSpinsWithUserID(
                this.crawlerID,
                this.populateFeed.bind(this)
            );
            return;
        }

        if (this.webView){
            this.complexClass.getSpinsForWeb(
                this.web.webID,
                this.populateFeed.bind(this)
            );
            return;
        }

        this.complexClass.likedUserFeed(
            this.crawlerID,
            this.populateFeed.bind(this)
        );
    }

    connectedCallback() {
        fetch('components/masonry-feed/masonry-feed.html')
            .then(response => response.text())
            .then(html => {
                this.innerHTML = html;
                this.web = history.state;
                this.handleViews();
                this.loadProfileWebs();
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
            const imageSection = document.createElement('section');
            imageSection.setAttribute('class', 'image-wrapper');

            const dropDownContainer = document.createElement('div');
            dropDownContainer.setAttribute('class', 'dropdown');

            const dropDownContentContainer = document.createElement('div');
            dropDownContentContainer.setAttribute('class', 'dropdown-content');

            if (this.profileWebTitles){
                this.profileWebTitles.forEach(web => {
                   const item = document.createElement('p');
                   item.textContent = web.webTitle || `Web-${web.webID}`;
                   dropDownContentContainer.appendChild(item);

                   item.addEventListener('click', () => {
                       this.webSpinClass.addSpinToWeb(
                           web.webID,
                           spin.spinID,
                           (data) => {
                               if (!data || data.hasOwnProperty('error')){
                                   new Toast(
                                       `There was an error adding that Spin to ${item.textContent}. Please try again later`,
                                       'error'
                                   );
                                   return;
                               }
                               if (data.hasOwnProperty('alert')) {
                                   new Toast(`Spin already existed in ${item.textContent}`, 'warning');
                                   return;
                               }

                               new Toast(`Successfully added spin to ${item.textContent}`, 'success');
                           }
                       )
                   });
                });
            }

            const imageButton = document.createElement('button');
            imageButton.setAttribute('class', 'image-button');
            imageButton.classList.add('hidden');
            imageButton.textContent = "X";

            const image = document.createElement('img')
            image.src = spin.spinLink;
            image.alt = spin.spinDescription;

            image.addEventListener('click', (event) => {
                router.handleNavigation('/pin', spin);
            });

            imageSection.addEventListener('mouseover', (event) => {
                imageButton.classList.remove("hidden");
            });

            imageSection.addEventListener('mouseleave', (event) => {
                imageButton.classList.add("hidden");
            });

            dropDownContainer.appendChild(imageButton);
            dropDownContainer.appendChild(dropDownContentContainer);

            imageSection.appendChild(image);
            imageSection.appendChild(dropDownContainer);

            article.appendChild(imageSection);
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
