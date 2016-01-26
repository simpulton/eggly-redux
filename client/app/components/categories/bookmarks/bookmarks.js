import angular from 'angular';
import uiRouter from 'angular-ui-router';
import bookmarksComponent from './bookmarks.component';
import BookmarksModel from './bookmarks.actions';
import SaveModule from './save/save';

let bookmarksModule = angular.module('bookmarks', [
  uiRouter,
  SaveModule.name
])

.config(($stateProvider) => {
  'ngInject';

  $stateProvider
    .state('eggly.categories.bookmarks', {
      url: 'categories/:category',
      views: {
        'bookmarks@': {
          template: '<bookmarks></bookmarks>'
        }
      }
    });
})

.component('bookmarks', bookmarksComponent)

.factory('BookmarksModel', BookmarksModel);

export default bookmarksModule;
