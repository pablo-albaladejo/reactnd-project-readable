
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

        let category_filter = "";
        if (category) {
            category_filter = category + "/";
        }

        return this.apiRequest(this.BASE_URL + category_filter + this.POSTS_URL, this.GET_METHOD, null);
    }

    getPostById(postId) {
        return new Promise((resolve, reject) => {


            Promise.all([
                //get post details
                this.apiRequest(this.BASE_URL + this.POSTS_URL + "/" + postId, this.GET_METHOD, null),

                //get post comments
                this.apiRequest(this.BASE_URL + this.POSTS_URL + "/" + postId + "/" + this.COMMENTS_URL, this.GET_METHOD, null),
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

    /* COMMENTS */
    getAllComments(postId) {
        return this.apiRequest(this.BASE_URL + this.POSTS_URL + "/" + postId + "/" + this.COMMENTS_URL, this.GET_METHOD, null);
    }


    apiRequest(endpoint, method, body) {
        return new Promise((resolve, reject) => {

            //https://github.com/udacity/reactnd-project-myreads-starter/blob/master/src/BooksAPI.js
            let token = localStorage.token;
            if (!token)
                token = localStorage.token = Math.random().toString(36).substr(-8)

            fetch(endpoint, {
                method,
                headers: {
                    'Accept': 'application/json',
                    'Authorization': token
                },
                body,
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    resolve(responseJson);
                }).catch(err => {
                    reject(err);
                });
        });
    }
}
export default APIService;