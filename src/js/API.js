const localBaseURL = "http://localhost:8080";

const callTypes = {
    get: "GET",
    put: "PUT",
    post: "POST",
    delete: "DELETE"
}

export class CommentLikesController{
    constructor() {
        this.baseURL = "commentLikes";
    }

    likeComment(
        crawlerID,
        spinCommentID,
        callback
    ){
        apiCallBuilder(
            `${localBaseURL}/${this.baseURL}/commentLike`,
            callTypes.post,
            callback,
            {
                crawlerID: crawlerID,
                spinCommentID: spinCommentID,
            }
        );
    };

    removeLikeFromComment(
        crawlerID,
        spinCommentID,
        callback
    ){

        apiCallBuilder(
            `${localBaseURL}/${this.baseURL}/commentLike`,
            callTypes.delete,
            callback,
            {
                crawlerID: crawlerID,
                spinCommentID: spinCommentID,
            }
        );
    };
}

export class ComplexController {
    constructor() {
        this.baseURL = "complexCalls";
    };

    getCrawlersWhoLikedComment(spinCommentID, callback){
        apiCallBuilder(
            `${localBaseURL}/${this.baseURL}/usersWhoLikedComment/${spinCommentID}`,
            callTypes.get,
            callback
        );
    };

    getCommentsForSpin(spinID, callback){
        apiCallBuilder(
            `${localBaseURL}/${this.baseURL}/commentsForSpin/${spinID}`,
            callTypes.get,
            callback
        );
    };

    getCrawlersWhoLikedSpin(spinID, callback){
        apiCallBuilder(
            `${localBaseURL}/${this.baseURL}/usersWhoLikedSpin/${spinID}`,
            callTypes.get,
            callback
        );
    };

    getWebsForCrawler(crawlerID, callback){
        apiCallBuilder(
            `${localBaseURL}/${this.baseURL}/websForUser/${crawlerID}`,
            callTypes.get,
            callback
        );
    }

    getSpinsForWeb(webID, callback){
        apiCallBuilder(
            `${localBaseURL}/${this.baseURL}/spinsForWeb/${webID}`,
            callTypes.get,
            callback
        );
    };

    getLimitedSpinsForWeb(webID, callback){
        apiCallBuilder(
            `${localBaseURL}/${this.baseURL}/limitedSpinsForWeb/${webID}`,
            callTypes.get,
            callback
        );
    };

    getNumberOfSpinsInWeb(webID, callback){
        apiCallBuilder(
            `${localBaseURL}/${this.baseURL}/numberOfSpinsInWeb/${webID}`,
            callTypes.get,
            callback
        );
    };

    dislikedUserFeed(
        crawlerID,
        callBack,
        offset = 0,
        limit = 100){

        apiCallBuilder(
            `${localBaseURL}/${this.baseURL}/dislikedUserFeed/${crawlerID}/${offset}/${limit}`,
            callTypes.get,
            callBack
        );
    };

    likedUserFeed(
        crawlerID,
        callBack,
        offset = 0,
        limit = 100){

        apiCallBuilder(
            `${localBaseURL}/${this.baseURL}/likedUserFeed/${crawlerID}/${offset}/${limit}`,
            callTypes.get,
            callBack
        );
    };
}

export class CrawlerController{
    constructor() {
        this.baseURL = 'crawlers';
    }

    getUserWithID(crawlerID, callBack){
        apiCallBuilder(
            `${localBaseURL}/${this.baseURL}/crawlerID/${crawlerID}`,
            callTypes.get,
            callBack
        );
    };

    getUserWithEmail(crawlerEmail, callBack){
        apiCallBuilder(
            `${localBaseURL}/${this.baseURL}/crawlerEmail/${crawlerEmail}`,
            callTypes.get,
            callBack
        );
    };

    login(crawler, callBack){
        apiCallBuilder(
            `${localBaseURL}/${this.baseURL}/login`,
            callTypes.post,
            callBack,
            {crawlerEmail: crawler.crawlerEmail}
        );
    };

    deleteUserWithEmail(crawler, callBack){
        apiCallBuilder(
            `${localBaseURL}/${this.baseURL}/crawlerEmail`,
            callTypes.put,
            callBack,
            {crawlerEmail: crawler.crawlerEmail}
        );
    };

    deleteUserWithID(crawler, callBack){
        apiCallBuilder(
            `${localBaseURL}/${this.baseURL}/crawlerID`,
            callTypes.put,
            callBack,
            {crawlerID: crawler.crawlerID}
        );
    };

    editCrawlerNameWithID(crawler, callBack){
        apiCallBuilder(
            `${localBaseURL}/${this.baseURL}/editCrawlerNameWithID`,
            callTypes.put,
            callBack,
            {
                crawlerID: crawler.crawlerID,
                crawlerUserName: crawler.crawlerUserName
            }
        );
    };

    editCrawlerNameWithEmail(crawler, callBack){
        apiCallBuilder(
            `${localBaseURL}/${this.baseURL}/editCrawlerNameWithEmail`,
            callTypes.put,
            callBack,
            {
                crawlerEmail: crawler.crawlerEmail,
                crawlerUserName: crawler.crawlerUserName
            }
        );
    };
}

export class SpinCommentController{
    constructor() {
        this.baseURL = 'spinComments';
    }

    getSpinCommentWithID(spinCommentID, callback){
        apiCallBuilder(
            `${localBaseURL}/${this.baseURL}/spinCommentID/${spinCommentID}`,
            callTypes.get,
            callback
        );
    };

    deleteSpinCommentWithID(spinCommentID, callback){
        apiCallBuilder(
            `${localBaseURL}/${this.baseURL}/spinCommentID`,
            callTypes.put,
            callback,
            {spinCommentID: spinCommentID}
        );
    };

    makeCommentToSpin(spinComment, callback){
        apiCallBuilder(
            `${localBaseURL}/${this.baseURL}/spinComment`,
            callTypes.post,
            callback,
            spinComment
        );
    };
}

export class SpinController {
    constructor() {
        this.baseURL = "spins";
    };

    getSpinWithID(spinID, callback){
        apiCallBuilder(
            `${localBaseURL}/${this.baseURL}/spinID/${spinID}`,
            callTypes.get,
            callback
        );
    };

    deleteSpinWithID(spinID, callback){
        apiCallBuilder(
            `${localBaseURL}/${this.baseURL}/spinID/${spinID}`,
            callTypes.put,
            callback,
            {spinID: spinID}
        );
    };

    createSpin(spin, callback){
        apiCallBuilder(
            `${localBaseURL}/${this.baseURL}/createSpin`,
            callTypes.post,
            callback,
            spin
        );
    };

    getUserSpinsWithUserID(crawlerID, callback){
        apiCallBuilder(
            `${localBaseURL}/${this.baseURL}/crawlerID/${crawlerID}`,
            callTypes.get,
            callback,
        );
    };

    getUserSpinsWithUserEmail(crawlerEmail, callback){
        apiCallBuilder(
            `${localBaseURL}/${this.baseURL}/crawlerEmail/${crawlerEmail}`,
            callTypes.get,
            callback,
        );
    };

    deleteUserSpinsWithUserID(crawlerID, callback){
        apiCallBuilder(
            `${localBaseURL}/${this.baseURL}/crawlerID`,
            callTypes.put,
            callback,
            {crawlerID: crawlerID}
        );
    };

    deleteUserSpinsWithUserEmail(crawlerEmail, callback){
        apiCallBuilder(
            `${localBaseURL}/${this.baseURL}/crawlerEmail`,
            callTypes.put,
            callback,
            {crawlerEmail: crawlerEmail}
        );
    };
}

export class SpinLikesController {
    constructor() {
        this.baseURL = "spinLikes";
    }

    likeSpin(spinLike, callback){
        apiCallBuilder(
            `${localBaseURL}/${this.baseURL}/spinLike`,
            callTypes.post,
            callback,
            spinLike
        );
    };

    removeLikeFromSpin(spinLike, callback){
        apiCallBuilder(
            `${localBaseURL}/${this.baseURL}/spinLike`,
            callTypes.delete,
            callback,
            spinLike
        );
    };
}

export class SpinTagsController {
    constructor() {
        this.baseURL = "spinTags";
    }

    addTagToSpin(spinTag, callback){
        apiCallBuilder(
            `${localBaseURL}/${this.baseURL}/spinTag`,
            callTypes.post,
            callback,
            spinTag
        );
    };

    removeTagFromSpin(spinTag, callback){
        apiCallBuilder(
            `${localBaseURL}/${this.baseURL}/spinTag`,
            callTypes.delete,
            callback,
            spinTag
        );
    };
}

export class TagController {
    constructor() {
        this.baseURL = "tags";
    }

    getTagByName(tagName, callback){
        apiCallBuilder(
            `${localBaseURL}/${this.baseURL}/tagName/${tagName}`,
            callTypes.get,
            callback,
        );
    };

    addTag(tag, callback){
        apiCallBuilder(
            `${localBaseURL}/${this.baseURL}/createTag`,
            callTypes.post,
            callback,
            tag
        );
    };

    filterTags(tagName, callback){
        apiCallBuilder(
            `${localBaseURL}/${this.baseURL}/filter/tagName/${tagName}`,
            callTypes.get,
            callback,
        );
    };
}

export class WebController{
    constructor() {
        this.baseURL = 'webs';
    }

    getWebWithID(webID, callback){
        apiCallBuilder(
            `${localBaseURL}/${this.baseURL}/webID/${webID}`,
            callTypes.get,
            callback
        );
    };

    deleteWebWithID(webID, callback){
        apiCallBuilder(
            `${localBaseURL}/${this.baseURL}/webID`,
            callTypes.put,
            callback
        );
    };

    createWeb(web, callback){
        apiCallBuilder(
            `${localBaseURL}/${this.baseURL}/createWeb`,
            callTypes.post,
            callback,
            web
        );
    };

    getUserWebsWithUserID(crawlerID, callback){
        apiCallBuilder(
            `${localBaseURL}/${this.baseURL}/crawlerID/${crawlerID}`,
            callTypes.get,
            callback,
        );
    };

    getUserWebsWithUserEmail(crawlerEmail, callback){
        apiCallBuilder(
            `${localBaseURL}/${this.baseURL}/crawlerEmail/${crawlerEmail}`,
            callTypes.get,
            callback,
        );
    };

    deleteUserWebsWithUserID(crawlerID, callback){
        apiCallBuilder(
            `${localBaseURL}/${this.baseURL}/crawlerID`,
            callTypes.put,
            callback,
            {crawlerID: crawlerID}
        );
    };

    deleteUserWebsWithUserEmail(crawlerEmail, callback){
        apiCallBuilder(
            `${localBaseURL}/${this.baseURL}/crawlerEmail`,
            callTypes.put,
            callback,
            {crawlerEmail: crawlerEmail}
        );
    }
}

export class WebSpinsController {
    constructor() {
        this.baseURL = 'webSpins';
    }

    addSpinToWeb(webSpin, callback) {
        apiCallBuilder(
            `${localBaseURL}/${this.baseURL}/createWebSpin`,
            callTypes.post,
            callback,
            webSpin
        );
    };

    removeSpinFromWeb(webSpin, callback) {
        apiCallBuilder(
            `${localBaseURL}/${this.baseURL}/deleteWebSpin`,
            callTypes.delete,
            callback,
            webSpin
        );
    };
}

export const apiCallBuilder = async (
    url,
    methodType,
    callback,
    bodyData = null,
    headers = null
) => {
    if (headers === null){
        headers = {'Content-Type': 'application/json'};
    }

    const options = {
        method: methodType,
        headers: headers,
        body: JSON.stringify(bodyData)
    }

    if (methodType === callTypes.get) {
        delete options.body;
    }

    console.log("url", url)
    console.log("options", options)

    fetch(url, options)
    .then(async (response)  =>  {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json()

        callback(data);
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}