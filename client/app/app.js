import 'bootstrap-css-only';
import 'normalize.css';

import angular from 'angular';
import ComponentsModule from './components/components';

import { combineReducers } from 'redux';
import thunk from 'redux-thunk';
import ngRedux from 'ng-redux';
import { categories, category } from './components/categories/categories.state';
import { bookmarks, bookmark } from './components/bookmarks/bookmarks.state';

import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

import template from './app.html';
import './app.css';

const rootReducer = combineReducers({
  categories,
  category,
  bookmarks,
  bookmark
});

const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey='ctrl-h'
                changePositionKey='ctrl-q'
                defaultIsVisible={false}>
    <LogMonitor theme='tomorrow' />
  </DockMonitor>
);

const config = $ngReduxProvider => {
  'ngInject';

  $ngReduxProvider.createStoreWith(rootReducer, [thunk], [DevTools.instrument()]);
};

const run = ($ngRedux, $rootScope) => {
  'ngInject';

  const componentDidUpdate = DockMonitor.prototype.componentDidUpdate;
  DockMonitor.prototype.componentDidUpdate = function() {
    $rootScope.$evalAsync();
    if (componentDidUpdate) {
      return componentDidUpdate.apply(this, arguments);
    }
  };

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
