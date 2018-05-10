import { FETCH_ALL_COMMENTS } from '../actions/actionTypes';

function comments(state = {}, action) {

    switch (action.type) {

        case FETCH_ALL_COMMENTS:
            return action.comments;

        default:
            return state;
    }
}
export default comments;