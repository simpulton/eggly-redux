import angular from 'angular';
import categoriesComponent from './categories.component';
import CategoriesActions from './categories.actions';
import CategoryItemModule from './category-item/category-item';

const CategoriesModule = angular.module('categories', [
      CategoryItemModule.name
    ])
    .factory('CategoriesActions', CategoriesActions)
    .component('categories', categoriesComponent)
  ;

export default CategoriesModule;
