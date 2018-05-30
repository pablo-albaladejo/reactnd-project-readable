import Endpoint from "../config/Endpoint";

import APIService from "./APIService";
import HelperService from "./HelperService";
import CommentService from "./CommentService";

class PostService {

    static _instance = null;

    static getInstance() {
        if (this._instance == null) {
            this._instance = new PostService();
        }
        return this._instance;
    }

    getAllPosts(category) {
        return new Promise((resolve, reject) => {
            let category_filter = "";
            if (category) {
                category_filter = category + "/";
            }

            APIService.getInstance().request(Endpoint.BASE_URL + category_filter + Endpoint.POSTS_URL, Endpoint.GET_METHOD, null)
                .then(result => {
                    let posts = {};

                    if (result) {
                        posts = APIService.getInstance().fixResult(result);
                    }

                    resolve(posts);
                })
                .catch(err => {
                    console.error(err);
                    reject(err);
                });
        });
    }

    getPostById(postId) {
        return new Promise((resolve, reject) => {
            Promise.all([
                //get post details
                APIService.getInstance().request(Endpoint.BASE_URL + Endpoint.POSTS_URL + "/" + postId, Endpoint.GET_METHOD, null),

                //get post comments
                CommentService.getInstance().getAllComments(postId)
            ]).then(result => {
                
                //post details
                let post = {};
                post[postId] = Object.keys(result[0]).length > 0 ? result[0] : {error: "Empty response"};
                
                //post comments
                let comments = {};
                comments = result[1];

                resolve([post, comments]);
            });
        });
    }

    updatePostVoteScore(postId, upVote) {
        let body = {
            option: upVote ? 'upVote' : 'downVote',
        };
        return APIService.getInstance().request(Endpoint.BASE_URL + Endpoint.POSTS_URL + "/" + postId, Endpoint.POST_METHOD, body);
    }

    deletePost(postId) {
        return APIService.getInstance().request(Endpoint.BASE_URL + Endpoint.POSTS_URL + "/" + postId, Endpoint.DELETE_METHOD, null)
    }
    editPost(postId, title, body) {
        return new Promise((resolve, reject) => {
            let requestBody = {
                title: title,
                body: body,
            }
            APIService.getInstance().request(Endpoint.BASE_URL + Endpoint.POSTS_URL + "/" + postId, Endpoint.PUT_METHOD, requestBody)
                .then(result => {
                    let post = {};

                    if (result) {
                        post[postId] = HelperService.getInstance().removeByKey(result, 'id');
                    }

                    resolve(post);
                })
                .catch(err => {
                    console.error(err);
                    reject(err);
                });
        });
    }

    addPost(post) {
        let body = {
            id: HelperService.getInstance().generateID(),
            timestamp: Date.now(),
            title: post.title,
            body: post.body,
            author: post.author,
            category: post.category,
        };

        return APIService.getInstance().request(Endpoint.BASE_URL + Endpoint.POSTS_URL, Endpoint.POST_METHOD, body)
    }
}
export default PostService;