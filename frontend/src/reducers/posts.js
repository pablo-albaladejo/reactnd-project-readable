import { FETCH_ALL_POSTS, FETCH_POST_BY_ID, UPDATE_POST_VOTESCORE } from '../actions/actionTypes';

function posts(state = {}, action) {

    switch (action.type) {

        case FETCH_ALL_POSTS:
            return action.posts;

        case FETCH_POST_BY_ID:
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
export default posts;