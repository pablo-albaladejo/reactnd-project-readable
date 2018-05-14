import { FETCH_ALL_POSTS, FETCH_POST_BY_ID } from '../actions/actionTypes';

function posts(state = {}, action) {

    switch (action.type) {

        case FETCH_ALL_POSTS:
            return action.posts;

        case FETCH_POST_BY_ID:
            return action.post;

        default:
            return state;
    }
}
export default posts;