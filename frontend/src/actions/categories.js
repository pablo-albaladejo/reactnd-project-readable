import {
    FETCH_ALL_CATEGORIES,
    REQUEST_CATEGORIES,
} from './actionTypes';

import ServiceFacade from '../services/ServiceFacade';

//get all categories
export const getAllCategories = () => dispatch => {
    dispatch(requestCategories());
    ServiceFacade.getAllCategories()
        .then(categories => {
            dispatch(fetchAllCategories(categories));
        }).catch(err => {
            console.warn(err);
        })
};
export function requestCategories() {
    return {
        type: REQUEST_CATEGORIES,
    }
}

//fetch all categories
export function fetchAllCategories(categories) {
    return {
        type: FETCH_ALL_CATEGORIES,
        categories,
    }
}