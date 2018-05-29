import {
    FETCH_ALL_POSTS,
    FETCH_POST_BY_ID,
    DELETE_POST,
    EDIT_POST,
    UPDATE_POST_VOTESCORE,
    REQUEST_POSTS,
    ADD_POST
} from './actionTypes';

import ServiceFacade from '../services/ServiceFacade';

//get all posts
export const getAllPosts = (category) => dispatch => {
    dispatch(requestPosts());
    ServiceFacade.getAllPosts(category)
        .then(posts => {
            dispatch(fetchAllPosts(posts));
        }).catch(err => {
            console.warn(err);
        })
};
export function fetchAllPosts(posts) {
    return {
        type: FETCH_ALL_POSTS,
        posts,
    }
}

//get post by id
export const getPostById = (postId) => dispatch => {
    dispatch(requestPosts());
    ServiceFacade.getPostById(postId)
        .then(result => {
            let post = result[0];
            let comments = result[1];
            dispatch(fetchPostById(post, comments));
        }).catch(err => {
            console.warn(err);
        })
};
export function requestPosts() {
    return {
        type: REQUEST_POSTS,
    }
}

//fetch post
export function fetchPostById(post, comments) {
    return {
        type: FETCH_POST_BY_ID,
        post,
        comments,
    }
}

//edit post
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

//delete post
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

//add post
export const addPost = (data) => dispatch => (
    ServiceFacade.addPost(data)
        .then(post => {
            dispatch(addPostSync(post));
        }).catch(err => {
            console.warn(err);
        })
);
export function addPostSync(post) {
    return {
        type: ADD_POST,
        post,
    }
}

//update voteScore
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
