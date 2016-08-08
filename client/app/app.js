import 'bootstrap-css-only';
import 'normalize.css';

import angular from 'angular';
import ComponentsModule from './components/components';

import { combineReducers } from 'redux';
import thunk from 'redux-thunk';
import ngRedux from 'ng-redux';
import { categories, category } from './components/categories/categories.state';
import { bookmarks, bookmark } from './components/bookmarks/bookmarks.state';

import React from 'react';
import ReactDOM from 'react-dom';
import DevTools from './dev-tools';

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

  $ngReduxProvider.createStoreWith(rootReducer, [thunk], [DevTools.instrument()]);
};

const run = ($ngRedux) => {
  'ngInject';
  ReactDOM.render(
    <DevTools store={$ngRedux}/>,
    document.getElementById('devTools')
  );
};

const AppComponent = {
  template
};

let appModule = angular.module('app', [
    ComponentsModule.name,
    ngRedux
  ])
  .config(config)
  .run(run)
  .component('app', AppComponent)
;

export default appModule;
