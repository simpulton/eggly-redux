import 'bootstrap-css-only';
import 'normalize.css';

import angular from 'angular';
import CommonModule from './common/common';
import ComponentsModule from './components/components';

import { categories, initialCategories } from './components/categories/categories.state';
import Store from './app.store';

import template from './app.html';
import './app.css';

const store = new Store(categories, initialCategories);

const AppComponent = {
  template
};

let appModule = angular.module('app', [
    CommonModule.name,
    ComponentsModule.name
  ])
  .value('store', store)
  .component('app', AppComponent)
;

export default appModule;
