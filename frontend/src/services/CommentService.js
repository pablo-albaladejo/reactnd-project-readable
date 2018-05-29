import Endpoint from "../config/Endpoint";

import HelperService from "./HelperService";
import APIService from "./APIService";

class CommentService {
    
    static _instance = null;
    
    static getInstance() {
        if (this._instance == null) {
            this._instance = new CommentService();
        }
        return this._instance;
    }

    getAllComments(postId) {
        return new Promise((resolve, reject) => {
            APIService.getInstance().request(Endpoint.BASE_URL + Endpoint.POSTS_URL + "/" + postId + "/" + Endpoint.COMMENTS_URL, Endpoint.GET_METHOD, null)
                .then(result => {
                    let comments = {};

                    if (result) {
                        comments = APIService.getInstance().fixResult(result);
                    }

                    resolve(comments);
                })
                .catch(err => {
                    console.error(err);
                    reject(err);
                });
        });
    }
    updateCommentVoteScore(commentId, upVote) {
        let body = {
            option: upVote ? 'upVote' : 'downVote',
        };

        return APIService.getInstance().request(Endpoint.BASE_URL + Endpoint.COMMENTS_URL + "/" + commentId, Endpoint.POST_METHOD, body);
    }
    updateComment(commentId, data) {
        let body = {
            timestamp: Date.now(),
            body: data.body,
        }
        return APIService.getInstance().request(Endpoint.BASE_URL + Endpoint.COMMENTS_URL + "/" + commentId, Endpoint.PUT_METHOD, body)
    }
    deleteComment(commentId) {
        return APIService.getInstance().request(Endpoint.BASE_URL + Endpoint.COMMENTS_URL + "/" + commentId, Endpoint.DELETE_METHOD, null)
    }
    addComment(postId, data) {
        let body = {
            id: HelperService.getInstance().generateID(),
            timestamp: Date.now(),
            body: data.body,
            author: data.author,
            parentId: postId,
        };
        return APIService.getInstance().request(Endpoint.BASE_URL + Endpoint.COMMENTS_URL, Endpoint.POST_METHOD, body)
    }

}
export default CommentService;