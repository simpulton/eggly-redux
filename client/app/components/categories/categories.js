import angular from 'angular';
import uiRouter from 'angular-ui-router';
import categoriesComponent from './categories.component';
import CategoriesModel from './categories.actions';
import CategoryItemModule from './categoryItem/categoryItem';
import BookmarksModule from './bookmarks/bookmarks';

let categoriesModule = angular.module('categories', [
  uiRouter,
  CategoryItemModule.name,
  BookmarksModule.name
])

.config(($stateProvider) => {
  'ngInject';

  $stateProvider
    .state('eggly.categories', {
      url: '/',
      views: {
        'categories@': {
          template: `<categories></categories>`
        },
        'bookmarks@': {
          template: `<bookmarks></bookmarks>`
        }
      }
    });
})

.component('categories', categoriesComponent)

.factory('CategoriesModel', CategoriesModel);

export default categoriesModule;
