import HelperService from './HelperService';
import PostService from './PostService';
import CategoryService from './CategoryService';
import CommentService from './CommentService';

class ServiceFacade {

    /* Categories */
    static getAllCategories() {
        return CategoryService.getInstance().getAllCategories();
    }

    /* Posts */
    static getAllPosts(category) {
        return PostService.getInstance().getAllPosts(category);
    }
    static getPostById(postId){
        return PostService.getInstance().getPostById(postId);
    }
    static updatePostVoteScore(postId, upVote){
        return PostService.getInstance().updatePostVoteScore(postId,upVote);
    }
    static deletePost(postId){
        return PostService.getInstance().deletePost(postId);
    }
    static editPost(postId, title, body){
        return PostService.getInstance().editPost(postId, title, body);
    }
    static addPost(post){
        return PostService.getInstance().addPost(post);
    }

    /* Comments */
    static getAllComments(postId) {
        return CommentService.getInstance().getAllComments(postId);
    }
    static updateCommentVoteScore(commentId, upVote){
        return CommentService.getInstance().updateCommentVoteScore(commentId,upVote);
    }
    static updateComment(commentId, data){
        return CommentService.getInstance().updateComment(commentId, data);
    }
    static deleteComment(commentId){
        return CommentService.getInstance().deleteComment(commentId);
    }
    static addComment(postId, data){
        return CommentService.getInstance().addComment(postId, data);
    }

    /* Helper */
    static removeByKey(myObj, deleteKey){
        return HelperService.getInstance().removeByKey(myObj, deleteKey);
    }
    
}
export default ServiceFacade;