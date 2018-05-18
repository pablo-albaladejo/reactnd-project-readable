import { FETCH_POST_BY_ID, UPDATE_COMMENT_VOTESCORE } from "../actions/actionTypes";

function comments(state = {}, action) {

    switch (action.type) {

        case FETCH_POST_BY_ID:
            return action.comments;

        case UPDATE_COMMENT_VOTESCORE:
            return {
                ...state,
                [action.comment.id]: action.comment,
            };
        default:
            return state;
    }
}
export default comments;