
class APIService {
    static _instance = null;

    BASE_URL = 'http://localhost:3001/';

    //https://github.com/udacity/reactnd-project-readable-starter/tree/master/api-server#api-endpoint
    CATEGORIES_URL = 'categories';
    POSTS_URL = 'posts';
    COMMENTS_URL = 'comments';

    GET_METHOD = 'GET';
    POST_METHOD = 'POST';
    PUT_METHOD = 'PUT';
    DELETE_METHOD = 'DELETE';

    static getInstance() {
        if (this._instance == null) {
            this._instance = new APIService();
        }
        return this._instance;
    }

    /* CATEGORIES */
    getAllCategories() {
        return new Promise((resolve, reject) => {
            this.apiRequest(this.BASE_URL + this.CATEGORIES_URL, this.GET_METHOD, null)
                .then(result => {
                    resolve(result.categories);
                }).catch(err => {
                    console.warn(err);
                    reject(err);
                });
        });
    }

    /* POSTS */
    getAllPosts(category) {
        return new Promise((resolve, reject) => {
            let category_filter = "";
            if (category) {
                category_filter = category + "/";
            }

            this.apiRequest(this.BASE_URL + category_filter + this.POSTS_URL, this.GET_METHOD, null)
                .then(result => {
                    let posts = {};

                    if (result) {
                        posts = this.fixResult(result);
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
                this.apiRequest(this.BASE_URL + this.POSTS_URL + "/" + postId, this.GET_METHOD, null),

                //get post comments
                this.getAllComments(postId)
            ]).then(result => {

                //post details
                let post = {};
                post[postId] = result[0];

                //post comments
                let comments = result[1]

                resolve([post, comments]);
            })
        });
    }

    updatePostVoteScore(postId, upVote) {
        let body = {
            option: upVote ? 'upVote' : 'downVote',
        };
        return this.apiRequest(this.BASE_URL + this.POSTS_URL + "/" + postId, this.POST_METHOD, body);
    }

    deletePost(postId){
        return this.apiRequest(this.BASE_URL + this.POSTS_URL + "/" + postId, this.DELETE_METHOD, null)
    }

    /* COMMENTS */
    getAllComments(postId) {
        return new Promise((resolve, reject) => {

            this.apiRequest(this.BASE_URL + this.POSTS_URL + "/" + postId + "/" + this.COMMENTS_URL, this.GET_METHOD, null)
                .then(result => {
                    let comments = {};

                    if (result) {
                        comments = this.fixResult(result);
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

        return this.apiRequest(this.BASE_URL + this.COMMENTS_URL + "/" + commentId, this.POST_METHOD, body);
    }


    /* HELPER */
    apiRequest(endpoint, method, body) {
        return new Promise((resolve, reject) => {

            //https://github.com/udacity/reactnd-project-myreads-starter/blob/master/src/BooksAPI.js
            let token = localStorage.token;
            if (!token)
                token = localStorage.token = Math.random().toString(36).substr(-8)

            fetch(endpoint, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': token
                },
                body: body ? JSON.stringify(body) : null,
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    resolve(responseJson);
                }).catch(err => {
                    reject(err);
                });
        });
    }

    fixResult(result) {
        let items = {};
        //fixing data structure according denormalized data
        Object.keys(result).forEach(key => {
            let item = result[key];

            items[item.id] = item;
            items[item.id].id = null; //remove id from the object content
        });

        return items;
    }
}
export default APIService;