const localBaseURL = "http://spinback.eu-west-1.elasticbeanstalk.com";

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
            `${localBaseURL}/${this.baseURL}/dislikeComment`,
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

    unLoggedInUserFeed(
        callback,
        offset = 0,
        limit = 100
    ){
        apiCallBuilder(
            `${localBaseURL}/${this.baseURL}/unLoggedInUserFeed/${offset}/${limit}`,
            callTypes.get,
            callback
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

    getCommentsLikedByCrawlerID(
        crawlerID,
        callback
    ){
        apiCallBuilder(
            `${localBaseURL}/${this.baseURL}/commentsLikedByCrawlerID/${crawlerID}`,
            callTypes.get,
            callback
        );
    }

    getTopTags(
        callback,
        existingTags
    ){
        apiCallBuilder(
            `${localBaseURL}/${this.baseURL}/topTags`,
            callTypes.post,
            callback,
            {
                existingTags: existingTags
            }
        );
    }

    getNewSpinLink(callBack){
        apiCallBuilder(
            `${localBaseURL}/${this.baseURL}/spinLink`,
            callTypes.get,
            callBack
        )
    }
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

    login(crawlerEmail, callBack){
        apiCallBuilder(
            `${localBaseURL}/${this.baseURL}/login`,
            callTypes.post,
            callBack,
            {crawlerEmail: crawlerEmail}
        );
    };

    deleteUserWithEmail(crawlerEmail, callBack){
        apiCallBuilder(
            `${localBaseURL}/${this.baseURL}/crawlerEmail`,
            callTypes.put,
            callBack,
            {crawlerEmail: crawlerEmail}
        );
    };

    deleteUserWithID(crawlerID, callBack){
        apiCallBuilder(
            `${localBaseURL}/${this.baseURL}/crawlerID`,
            callTypes.put,
            callBack,
            {crawlerID: crawlerID}
        );
    };

    editCrawlerNameWithID(crawlerID, crawlerUserName, callBack){
        apiCallBuilder(
            `${localBaseURL}/${this.baseURL}/editCrawlerNameWithID`,
            callTypes.put,
            callBack,
            {
                crawlerID: crawlerID,
                crawlerUserName: crawlerUserName
            }
        );
    };

    editCrawlerNameWithEmail(crawlerEmail, crawlerUserName, callBack){
        apiCallBuilder(
            `${localBaseURL}/${this.baseURL}/editCrawlerNameWithEmail`,
            callTypes.put,
            callBack,
            {
                crawlerEmail: crawlerEmail,
                crawlerUserName: crawlerUserName
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

    makeCommentToSpin(spinID, crawlerID, spinCommentMessage, callback){
        apiCallBuilder(
            `${localBaseURL}/${this.baseURL}/spinComment`,
            callTypes.post,
            callback,
            {
                spinID: spinID,
                crawlerID: crawlerID,
                spinCommentMessage: spinCommentMessage
            }
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

    createSpin(spinLink, spinDescription, spinTitle, crawlerID, callback){
        apiCallBuilder(
            `${localBaseURL}/${this.baseURL}/createSpin`,
            callTypes.post,
            callback,
            {
                spinLink: spinLink,
                spinDescription: spinDescription ?? '',
                spinTitle: spinTitle ?? '',
                crawlerID: crawlerID
            }
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

    likeSpin(spinID, crawlerID, callback){
        apiCallBuilder(
            `${localBaseURL}/${this.baseURL}/spinLike`,
            callTypes.post,
            callback,
            {
                spinID: spinID,
                crawlerID: crawlerID
            }
        );
    };

    removeLikeFromSpin(spinID, crawlerID, callback){
        apiCallBuilder(
            `${localBaseURL}/${this.baseURL}/spinLike`,
            callTypes.delete,
            callback,
            {
                spinID: spinID,
                crawlerID: crawlerID
            }
        );
    };
}

export class SpinTagsController {
    constructor() {
        this.baseURL = "spinTags";
    }

    addTagToSpin(tagID, spinID, callback){
        apiCallBuilder(
            `${localBaseURL}/${this.baseURL}/spinTag`,
            callTypes.post,
            callback,
            {
                tagID: tagID,
                spinID: spinID
            }
        );
    };

    removeTagFromSpin(tagID, spinID, callback){
        apiCallBuilder(
            `${localBaseURL}/${this.baseURL}/spinTag`,
            callTypes.delete,
            callback,
            {
                tagID: tagID,
                spinID: spinID
            }
        );
    };

    addTagsToSpinByTagNames(spinLink, tagNames, callback){
        apiCallBuilder(
            `${localBaseURL}/${this.baseURL}/addTagsToSpinByTagNames`,
            callTypes.post,
            callback,
            {
                spinLink: spinLink,
                tagNames: tagNames,
            }
        );
    }
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

    addTags(tagNames, callback){
        apiCallBuilder(
            `${localBaseURL}/${this.baseURL}/createTag`,
            callTypes.post,
            callback,
            {tagNames: tagNames}
        );
    };

    filterTags(tagName, existingTags, callback){
        apiCallBuilder(
            `${localBaseURL}/${this.baseURL}/filter/tagName`,
            callTypes.post,
            callback,
            {
                tagName: tagName,
                existingTags: existingTags,
            }
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

    createWeb(crawlerID, webDescription, webTitle, callback){
        apiCallBuilder(
            `${localBaseURL}/${this.baseURL}/createWeb`,
            callTypes.post,
            callback,
            {
                webDescription: webDescription ?? '',
                webTitle: webTitle ?? '',
                crawlerID: crawlerID
            }
        );
    };

    getUserWebsWithUserID(crawlerID, callback){
        crawlerID = crawlerID ?? -1;
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

    addSpinToWeb(webID, spinID, callback) {
        apiCallBuilder(
            `${localBaseURL}/${this.baseURL}/createWebSpin`,
            callTypes.post,
            callback,
            {
                webID: webID,
                spinID: spinID
            }
        );
    };

    removeSpinFromWeb(webID, spinID, callback) {
        apiCallBuilder(
            `${localBaseURL}/${this.baseURL}/deleteWebSpin`,
            callTypes.delete,
            callback,
            {
                webID: webID,
                spinID: spinID
            }
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

    fetch(url, options)
    .then(async (response)  =>  {
        if (!response.ok) {
            console.error('Network response was not ok');
            callback(null);
            return;
        }

        try{
            const data = await response.json();
            callback(data);
        }
        catch {
            callback(null);
        }
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}