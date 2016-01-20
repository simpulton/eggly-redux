import { combineReducers } from 'redux';
import counter from './counter';
import {categories, category} from './categories';

const rootReducer = combineReducers({
  counter,
  categories,
  category
});

export default rootReducer;
