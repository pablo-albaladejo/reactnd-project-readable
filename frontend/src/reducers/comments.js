import { FETCH_POST_BY_ID } from "../actions/actionTypes";

function comments(state = {}, action) {

    switch (action.type) {

        case FETCH_POST_BY_ID:
            return action.comments;

        default:
            return state;
    }
}
export default comments;