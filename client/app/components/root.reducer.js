import { combineReducers } from 'redux';
import {categories, category} from './categories/categories.reducers';
import {bookmarks} from './categories/bookmarks/bookmarks.reducers';

const rootReducer = combineReducers({
  categories,
  category,
  bookmarks
});

export default rootReducer;
