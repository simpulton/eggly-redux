import { combineReducers } from 'redux';
import { categories, category } from './reducers/categories.reducers';
import { bookmarks, bookmark } from './reducers/bookmarks.reducers';

let rootReducer = combineReducers({
  categories,
  category,
  bookmarks,
  bookmark
});

export default rootReducer;
