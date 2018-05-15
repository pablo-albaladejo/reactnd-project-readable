import {
    FETCH_ALL_POSTS,
    FETCH_POST_BY_ID,
    FETCH_ALL_CATEGORIES
} from './actionTypes';

import ServiceFacade from '../services/ServiceFacade';

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