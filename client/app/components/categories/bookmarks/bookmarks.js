import angular from 'angular';
import uiRouter from 'angular-ui-router';
import bookmarksComponent from './bookmarks.component';

let bookmarksModule = angular.module('bookmarks', [
  uiRouter
])

.component('bookmarks', bookmarksComponent);

export default bookmarksModule;
