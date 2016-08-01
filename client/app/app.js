import 'bootstrap-css-only';
import 'normalize.css';

import angular from 'angular';
import ngRedux from 'ng-redux';
import thunk from 'redux-thunk';

import ComponentsModule from './components/components';

import { combineReducers } from 'redux';
import { categories, category } from './components/categories/categories.state';
import { bookmarks, bookmark } from './components/bookmarks/bookmarks.state';

import './app.styl';

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
  template: `
    <div class="app">
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-3 col-md-2 sidebar">
            <categories></categories>
          </div>
          <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
            <bookmarks></bookmarks>
          </div>
        </div>
      </div>
    </div>
  `
};

angular.module('app', [
    ngRedux,
    ComponentsModule.name
  ])
  .config(config)
  .component('app', AppComponent)
;
