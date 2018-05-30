import { combineReducers } from 'redux';

import posts from './posts';
import comments from './comments';
import categories from './categories';
import { reducer as form } from 'redux-form';

export default combineReducers({
    posts,
    comments,
    categories,
    form,
});