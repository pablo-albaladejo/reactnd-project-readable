import { FETCH_ALL_CATEGORIES } from '../actions/actionTypes';

function categories(state = {}, action) {

    switch (action.type) {

        case FETCH_ALL_CATEGORIES:
            return action.categories;

        default:
            return state;
    }
}
export default categories;