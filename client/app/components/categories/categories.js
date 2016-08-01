import angular from 'angular';
import { CategoriesActions } from './categories.state';
import CategoryItemModule from './category-item/category-item';

import template from './categories.html';
import controller from './categories.controller';
import './categories.styl';

const categoriesComponent = {
  template,
  controller,
  controllerAs: 'categoriesListCtrl'
};

const CategoriesModule = angular.module('categories', [
      CategoryItemModule.name
    ])
    .factory('CategoriesActions', CategoriesActions)
    .component('categories', categoriesComponent)
  ;

export default CategoriesModule;
