import { FETCH_ALL_POSTS } from '../actions/actionTypes';

function posts(state = {}, action) {

    switch (action.type) {
        
        case FETCH_ALL_POSTS: 
            return action.posts;

        default:
            return state;
    }
}
export default posts;