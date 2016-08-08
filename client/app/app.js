import 'bootstrap-css-only';
import 'normalize.css';

import angular from 'angular';
import CommonModule from './common/common';
import ComponentsModule from './components/components';

import { categories, initialCategories } from './components/categories/categories.state';
import ngRedux from 'ng-redux';

import template from './app.html';
import './app.css';

const config = $ngReduxProvider => {
  'ngInject';

  $ngReduxProvider.createStoreWith(categories, [], [], initialCategories);
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
