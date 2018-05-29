const Endpoint = {
    
    //https://stackoverflow.com/a/35470995/3395884
    BASE_URL: !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ?
        'http://localhost:3001/'
        : 'https://us-central1-reactnd-project-readable.cloudfunctions.net/app/',

    //https://github.com/udacity/reactnd-project-readable-starter/tree/master/api-server#api-endpoint
    CATEGORIES_URL: 'categories',
    POSTS_URL: 'posts',
    COMMENTS_URL: 'comments',

    GET_METHOD: 'GET',
    POST_METHOD: 'POST',
    PUT_METHOD: 'PUT',
    DELETE_METHOD: 'DELETE',
}
export default Endpoint;