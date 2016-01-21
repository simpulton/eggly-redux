import { combineReducers } from 'redux';
import { categories, category } from './categories/categories.reducers';
import { bookmarks, bookmark } from './categories/bookmarks/bookmarks.reducers';

let rootReducer = combineReducers({
  categories,
  category,
  bookmarks,
  bookmark
});

export default rootReducer;
