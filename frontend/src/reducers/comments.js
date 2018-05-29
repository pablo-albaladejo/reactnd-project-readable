import { FETCH_POST_BY_ID, UPDATE_COMMENT_VOTESCORE, DELETE_POST, DELETE_COMMENT, REQUEST_POSTS, UPDATE_COMMENT } from "../actions/actionTypes";
import { combineReducers } from 'redux';
import ServiceFacade from "../services/ServiceFacade";

function comments(state = {}, action) {

    switch (action.type) {

        case FETCH_POST_BY_ID:
            return action.comments;

        case UPDATE_COMMENT_VOTESCORE:
            return {
                ...state,
                [action.comment.id]: action.comment,
            };
        case DELETE_COMMENT:
            return ServiceFacade.removeByKey(state, action.comment.id);

        case UPDATE_COMMENT:
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
const isFetching = (state = false, action) => {
    switch (action.type) {
        case REQUEST_POSTS:
            return true;
        case FETCH_POST_BY_ID:
            return false;
        default:
            return state;
    }
}
export default combineReducers({
    ids: comments,
    isFetching
});