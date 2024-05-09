import {Router} from "../../js/Router.js";
import {Toast} from "../../js/Toast.js";

import {
    ComplexController,
    SpinController,
    TagController,
    WebSpinsController
} from "../../js/API.js";

export class MasonryFeed extends HTMLElement {

    constructor() {
        super();

        this.upload = this.hasAttribute('upload') && !this.hasAttribute('webView');
        this.webView = this.hasAttribute('webView') && !this.hasAttribute('upload');

        this.complexClass = new ComplexController();
        this.spinClass = new SpinController();
        this.webSpinClass = new WebSpinsController();
        this.tagClass = new TagController();

        this.crawlerID = localStorage.getItem("crawlerID")
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

    handleViews() {
        document.getElementById("header-section-web-section").classList.add("hidden");

        if (this.webView) {
            document.getElementById("header-section-web-section").classList.remove("hidden");

            const headerTitle = document.getElementById("header-section-title");
            const headerDescription = document.getElementById("header-section-description");

            headerTitle.classList.add("hidden");
            headerDescription.classList.add("hidden");

            if (this.web.webTitle != null) {
                headerTitle.textContent = this.web.webTitle;
                headerTitle.classList.remove("hidden");
            }

            if (this.web.webDescription != null) {
                headerDescription.textContent = this.web.webDescription;
                headerDescription.classList.remove("hidden");
            }
        }
    }

    loadProfileWebs() {
        this.complexClass.getWebsForCrawler(
            this.crawlerID,
            this.loadData.bind(this)
        )
    }

    loadData(profileWebs) {

        if (profileWebs != null) {
            this.profileWebTitles = profileWebs;
        }

        if (this.upload) {
            if (this.crawlerID) {
                this.spinClass.getUserSpinsWithUserID(
                    this.crawlerID,
                    this.populateFeed.bind(this)
                );
                return;
            }
            new Toast('Please Log In To Use This Feature', 'error');
            new Router().handleNavigation('/');
            return;
        }

        if (this.webView) {
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


    getExistingTags(){
        const tagOverFlow = document.getElementById("tag-overflow-area");
        const tagNames = [];
        for (let index = 0; index < tagOverFlow.children.length; index++) {
            const tagOverflowSection = tagOverFlow.children[index];
            tagNames.push(tagOverflowSection.querySelector('.tag-button').textContent);
        }
        return tagNames;
    }

    populateTagDropDown(tags) {
        if (!tags) {
            tags = [];
        }

        if (!Array.isArray(tags)) {
            tags = [tags];
        }

        const tagContainer = document.getElementById("tag-dropdown-content");
        while (tagContainer.firstChild) {
            tagContainer.removeChild(tagContainer.firstChild);
        }

        const btnAddTag = document.getElementById("add-tag-button");
        const tagInput = document.getElementById("inpTag");
        tags.forEach(tag => {
            const tagLabel = document.createElement("p");
            tagLabel.textContent = tag.tagName;
            tagContainer.appendChild(tagLabel);

            tagLabel.addEventListener('click', () => {
                tagInput.value = tag.tagName;
                btnAddTag.click();

                tagInput.focus();
            });
        });
    }

    // TODO: Infinity Scroll
    populateFeed(data) {
        if (!data) {
            data = []
        }

        if (!Array.isArray(data)) {
            data = [data];
        }

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

            document.getElementById('btnClose').addEventListener('click', () => {
                this.closeModal(modal);
            });

            const tagsInput = document.getElementById("inpTag");
            const tagOverFlow = document.getElementById("tag-overflow-area");

            const addTagButton = document.getElementById("add-tag-button");
            addTagButton.addEventListener("click",
                (event) => {
                    event.preventDefault();

                    if (tagsInput.value.length === 0) {
                        new Toast(`Enter text to add tag`, 'error');
                        return
                    }

                    const existingTagOverflowSection = document.getElementById(`tag-overflow-section-${tagsInput.value.toLowerCase()}`);
                    if (!existingTagOverflowSection) {
                        const tagOverflowSection = document.createElement("section");
                        tagOverflowSection.id = `tag-overflow-section-${tagsInput.value.toLowerCase()}`;
                        tagOverflowSection.classList.add("overlay-wrapper");
                        tagOverflowSection.classList.add("overlay-wrapper-tag-button");

                        const tagButton = document.createElement("button");
                        tagButton.classList.add("tag-button");
                        tagButton.textContent = tagsInput.value.toLowerCase();
                        tagsInput.value = '';
                        tagButton.id = 'tag-overflow-section-button';

                        const tagButtonDelete = document.createElement("button");
                        tagButtonDelete.classList.add("tag-button-delete");
                        tagButtonDelete.textContent = 'X';

                        tagOverflowSection.appendChild(tagButton);
                        tagOverflowSection.appendChild(tagButtonDelete);
                        tagOverFlow.appendChild(tagOverflowSection);

                        tagButtonDelete.addEventListener('click', (event) => {
                            tagOverFlow.removeChild(tagOverflowSection);
                        });

                        tagButton.addEventListener('click', (event) => {
                            event.preventDefault();
                            event.stopPropagation();
                        })
                    } else {
                        const tagButton = existingTagOverflowSection.querySelector("#tag-overflow-section-button");
                        new Toast(`You have already added tag: ${tagButton.textContent}`, 'info');
                    }
                }
            );

            tagsInput.addEventListener('focusin', () => {
                if (tagsInput.value === '') {
                    this.complexClass.getTopTags(
                        this.populateTagDropDown.bind(this),
                        this.getExistingTags()
                );
                    return;
                }
                this.tagClass.filterTags(
                    tagsInput.value,
                    this.getExistingTags(),
                    this.populateTagDropDown.bind(this)
                );
            });

            tagsInput.addEventListener('input', () => {
                if (tagsInput.value === '') {
                    this.complexClass.getTopTags(
                        this.populateTagDropDown.bind(this),
                        this.getExistingTags()
                    );
                    return;
                }
                this.tagClass.filterTags(
                    tagsInput.value,
                    this.getExistingTags(),
                    this.populateTagDropDown.bind(this)
                );
            });

            buttonCreate.addEventListener("click", () => {
                const tagNames = this.getExistingTags();
                this.complexClass.getNewSpinLink(this.createSpin.bind(this));
            });
        }

        const router = new Router();
        data.forEach(spin => {
            const imageSection = document.createElement('section');
            imageSection.setAttribute('class', 'overlay-wrapper');

            const dropDownContainer = document.createElement('div');
            dropDownContainer.setAttribute('class', 'dropdown');

            const dropDownContentContainer = document.createElement('div');
            dropDownContentContainer.setAttribute('class', 'dropdown-content');

            if (this.profileWebTitles) {

                if (!Array.isArray(this.profileWebTitles)) {
                    this.profileWebTitles = [this.profileWebTitles];
                }

                this.profileWebTitles.forEach(web => {
                    const item = document.createElement('p');
                    item.textContent = web.webTitle || `Web-${web.webID}`;
                    dropDownContentContainer.appendChild(item);

                    item.addEventListener('click', () => {
                        this.webSpinClass.addSpinToWeb(
                            web.webID,
                            spin.spinID,
                            (data) => {
                                if (!data || data.hasOwnProperty('error')) {
                                    new Toast(
                                        `There was an error adding that Spin to ${item.textContent}. Please try again later`,
                                        'error'
                                    );
                                    return;
                                }
                                if (data.hasOwnProperty('alert')) {
                                    new Toast(`Spin already existed in ${item.textContent}`, 'info');
                                    return;
                                }

                                new Toast(`Successfully added spin to ${item.textContent}`, 'success');
                            }
                        )
                    });
                });
            }

            const imageButton = document.createElement('button');
            imageButton.setAttribute('class', 'overlay-button');
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
        });
    }

    closeModal(modal) {
        const titleInput = document.getElementById("inpTitle");
        const descriptionTextArea = document.getElementById("txtDesc");
        const tagsInput = document.getElementById("inpTag");
        const imageInput = document.getElementById("inpImg");
        const uploadIcon = document.getElementById("upload-icon");
        const imageLabel = document.getElementById("lblImg");
        const imageSpan = document.getElementById("spnImg");
        const tagOverFlow = document.getElementById("tag-overflow-area");

        while (tagOverFlow.firstChild) {
            tagOverFlow.removeChild(tagOverFlow.firstChild);
        }

        titleInput.value = "";
        descriptionTextArea.value = "";
        tagsInput.value = "";
        imageInput.value = "";
        imageLabel.classList.remove("filled");
        imageSpan.classList.remove("filled");
        uploadIcon.classList.remove("filled");
        imageSpan.textContent = "Select Image";

        modal.close();
    }

    async createSpin(data){
        const titleInput = document.getElementById("inpTitle");
        const descriptionTextArea = document.getElementById("txtDesc");
        const imageInput = document.getElementById("inpImg");
        var url = data.result;
        var link = url.split('?')[0];
        var id = localStorage.getItem("crawlerID");
        var desc = descriptionTextArea.value;
        var title = titleInput.value;
        var image = imageInput.files[imageInput.files.length-1];

        await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "multipart/form-data"
            },
            body: image
        })

        this.spinClass.createSpin(link, desc, title, id,
            (data) => {
                const modal = document.getElementById('create-image');
                this.closeModal(modal);
            }
        )
    }
}