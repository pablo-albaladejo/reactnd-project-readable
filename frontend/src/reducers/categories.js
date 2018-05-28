import { FETCH_ALL_CATEGORIES, REQUEST_CATEGORIES } from '../actions/actionTypes';
import { combineReducers } from 'redux';

function categories(state = {}, action) {

    switch (action.type) {

        case FETCH_ALL_CATEGORIES:
            return action.categories;

        default:
            return state;
    }
}

const isFetching = (state = false, action) => {
    switch (action.type) {
        case REQUEST_CATEGORIES:
            return true;
        case FETCH_ALL_CATEGORIES:
            return false;
        default:
            return state;
    }
}
export default combineReducers({
    ids: categories,
    isFetching
});