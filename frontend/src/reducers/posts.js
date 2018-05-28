import { FETCH_ALL_POSTS, FETCH_POST_BY_ID, UPDATE_POST_VOTESCORE, DELETE_POST, EDIT_POST, REQUEST_POSTS } from '../actions/actionTypes';

import { combineReducers } from 'redux';
import ServiceFacade from '../services/ServiceFacade';

function posts(state = {}, action) {

    switch (action.type) {

        case FETCH_ALL_POSTS:
            return action.posts;

        case FETCH_POST_BY_ID:
            return action.post;
        case DELETE_POST:
            return ServiceFacade.removeByKey(state, action.postId)

        case EDIT_POST:
            return action.post;

        case UPDATE_POST_VOTESCORE:
            return {
                ...state,
                [action.post.id]: action.post,
            };
        default:
            return state;
    }
}

const isFetching = (state = false, action) => {
    switch (action.type) {
        case REQUEST_POSTS:
            return true;
        case FETCH_POST_BY_ID:
            return false;
        case FETCH_ALL_POSTS:
            return false;
        default:
            return state;
    }
}
export default combineReducers({
    ids: posts,
    isFetching
});