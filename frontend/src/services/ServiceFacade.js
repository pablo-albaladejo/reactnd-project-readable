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
    static getAllPosts(category) {
        return APIService.getInstance().getAllPosts(category);
    }
    static getPostById(postId){
        return APIService.getInstance().getPostById(postId);
    }
    static updatePostVoteScore(postId, upVote){
        return APIService.getInstance().updatePostVoteScore(postId,upVote);
    }

    /* Comments */
    static getAllComments(postId) {
        return APIService.getInstance().getAllComments(postId);
    }
}
export default ServiceFacade;