import { FETCH_POST_BY_ID, UPDATE_COMMENT_VOTESCORE, DELETE_POST } from "../actions/actionTypes";

function comments(state = {}, action) {

    switch (action.type) {

        case FETCH_POST_BY_ID:
            return action.comments;

        case UPDATE_COMMENT_VOTESCORE:
            return {
                ...state,
                [action.comment.id]: action.comment,
            };

        case DELETE_POST:
            return {};

        default:
            return state;
    }
}
export default comments;