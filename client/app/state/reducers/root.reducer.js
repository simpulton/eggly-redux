import { combineReducers } from 'redux';
import { categories, category } from './categories.reducers';
import { bookmarks, bookmark } from './bookmarks.reducers';

let rootReducer = combineReducers({
  categories,
  category,
  bookmarks,
  bookmark
});

export default rootReducer;
