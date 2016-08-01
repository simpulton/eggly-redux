import 'bootstrap-css-only';
import 'normalize.css';

import angular from 'angular';
import ngRedux from 'ng-redux';
import thunk from 'redux-thunk';

import appComponent from './app.component';
import ComponentsModule from './components/components';

import { combineReducers } from 'redux';
import { categories, category } from './components/categories/categories.reducers';
import { bookmarks, bookmark } from './components/bookmarks/bookmarks.reducers';

const rootReducer = combineReducers({
  categories,
  category,
  bookmarks,
  bookmark
});

const config = ($ngReduxProvider) => {
  'ngInject';

  $ngReduxProvider.createStoreWith(rootReducer, [thunk]);
};

angular.module('app', [
    ngRedux,
    ComponentsModule.name
  ])
  .config(config)
  .component('app', appComponent)
;
