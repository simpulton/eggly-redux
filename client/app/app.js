import 'bootstrap-css-only';
import 'normalize.css';

import angular from 'angular';
import CommonModule from './common/common';
import ComponentsModule from './components/components';

import { categories, category } from './components/categories/categories.state';
import { combineReducers } from 'redux';
import ngRedux from 'ng-redux';

import template from './app.html';
import './app.css';

const rootReducer = combineReducers({
  categories,
  category
});

const config = $ngReduxProvider => {
  'ngInject';

  $ngReduxProvider.createStoreWith(rootReducer, []);
};

const AppComponent = {
  template
};

angular.module('app', [
    CommonModule.name,
    ComponentsModule.name,
    ngRedux
  ])
  .config(config)
  .component('app', AppComponent)
;
