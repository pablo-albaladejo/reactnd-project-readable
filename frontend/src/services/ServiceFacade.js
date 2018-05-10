import APIService from './APIService';

class ServiceFacade {

    /* 
        API 
    */

    /* Categories */
    static getAllCategories() {
        return APIService.getInstance().getAllCategories();
    }

    /* Posts */
    static getAllPosts() {
        return APIService.getInstance().getAllPosts();
    }
    /* Comments */
    static getAllComments(postId) {
        return APIService.getInstance().getAllComments(postId);
    }
}
export default ServiceFacade;