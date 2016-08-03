import 'bootstrap-css-only';
import 'normalize.css';

import angular from 'angular';
import ngRedux from 'ng-redux';
import thunk from 'redux-thunk';

import ComponentsModule from './components/components';

import { combineReducers } from 'redux';
import { categories, category } from './components/categories/categories.state';
import { bookmarks, bookmark } from './components/bookmarks/bookmarks.state';

import template from './app.html';
import './app.css';

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

const AppComponent = {
  template
};

angular.module('app', [
    ngRedux,
    ComponentsModule.name
  ])
  .config(config)
  .component('app', AppComponent)
;
