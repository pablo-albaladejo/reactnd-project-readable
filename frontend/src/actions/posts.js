
import { FETCH_ALL_POSTS } from './actionTypes';

import ServiceFacade from '../services/ServiceFacade';

export const getAllPosts = () => dispatch => (
    ServiceFacade.getAllPosts()
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