import angular from 'angular';
import uiRouter from 'angular-ui-router';
import categoriesComponent from './categories.component';

let categoriesModule = angular.module('categories', [
  uiRouter
])

.component('categories', categoriesComponent);

export default categoriesModule;
