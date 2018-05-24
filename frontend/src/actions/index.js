import {
    FETCH_ALL_POSTS,
    FETCH_POST_BY_ID,
    DELETE_POST,
    EDIT_POST,
    FETCH_ALL_CATEGORIES,
    UPDATE_POST_VOTESCORE,
    UPDATE_COMMENT_VOTESCORE,
    DELETE_COMMENT,
} from './actionTypes';

import ServiceFacade from '../services/ServiceFacade';

/* POSTS */
/* getAllPosts */
export const getAllPosts = (category) => dispatch => (
    ServiceFacade.getAllPosts(category)
        .then(posts => {
            dispatch(fetchAllPosts(posts));
        }).catch(err => {
            console.warn(err);
        })
);

export function fetchAllPosts(posts) {
    return {
        type: FETCH_ALL_POSTS,
        posts,
    }
}

/* getPostById */
export const getPostById = (postId) => dispatch => (
    ServiceFacade.getPostById(postId)
        .then(result => {
            let post = result[0];
            let comments = result[1];
            dispatch(fetchPostById(post, comments));
        }).catch(err => {
            console.warn(err);
        })
);

export function fetchPostById(post, comments) {
    return {
        type: FETCH_POST_BY_ID,
        post,
        comments,
    }
}

export const editPost = (postId, title, body) => dispatch => (
    ServiceFacade.editPost(postId, title, body)
        .then(post => {
            dispatch(editPostSync(post));
        }).catch(err => {
            console.warn(err);
        })
);

export function editPostSync(post) {
    return {
        type: EDIT_POST,
        post,
    }
}

export const deletePost = (postId) => dispatch => (
    ServiceFacade.deletePost(postId)
        .then(posts => {
            dispatch(deletePostSync(postId));
        }).catch(err => {
            console.warn(err);
        })
);

export function deletePostSync(postId) {
    return {
        type: DELETE_POST,
        postId,
    }
}


/* CATEGORIES */
export const getAllCategories = () => dispatch => (
    ServiceFacade.getAllCategories()
        .then(categories => {
            dispatch(fetchAllCategories(categories));
        }).catch(err => {
            console.warn(err);
        })
);

export function fetchAllCategories(categories) {
    return {
        type: FETCH_ALL_CATEGORIES,
        categories,
    }
}

/* VOTES */
/* Post */
export const updatePostVoteScore = (postId, upVote) => dispatch => (
    ServiceFacade.updatePostVoteScore(postId, upVote)
        .then(post => {
            dispatch(updatePostVoteScoreSync(post));
        }).catch(err => {
            console.warn(err);
        })
);

export function updatePostVoteScoreSync(post) {
    return {
        type: UPDATE_POST_VOTESCORE,
        post,
    }
}

/* Comment */
export const updateCommentVoteScore = (commentId, upVote) => dispatch => (
    ServiceFacade.updateCommentVoteScore(commentId, upVote)
        .then(comment => {
            dispatch(updateCommentVoteScoreSync(comment));
        }).catch(err => {
            console.warn(err);
        })
);

export function updateCommentVoteScoreSync(comment) {
    return {
        type: UPDATE_COMMENT_VOTESCORE,
        comment,
    }
}

export const deleteComment = (commentId) => dispatch => (
    ServiceFacade.deleteComment(commentId)
        .then(posts => {
            dispatch(deleteCommentSync(commentId));
        }).catch(err => {
            console.warn(err);
        })
);

export function deleteCommentSync(commentId) {
    return {
        type: DELETE_COMMENT,
        commentId,
    }
}