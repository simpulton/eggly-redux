import 'bootstrap-css-only';
import 'normalize.css';

import angular from 'angular';
import CommonModule from './common/common';
import ComponentsModule from './components/components';

import { combineReducers } from 'redux';
import ngRedux from 'ng-redux';
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

const config = $ngReduxProvider => {
  'ngInject';

  $ngReduxProvider.createStoreWith(rootReducer, []);
};

const AppComponent = {
  template
};

let appModule = angular.module('app', [
    CommonModule.name,
    ComponentsModule.name,
    ngRedux
  ])
  .config(config)
  .component('app', AppComponent)
;

export default appModule;
