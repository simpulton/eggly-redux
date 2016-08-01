import angular from 'angular';
import { BookmarksActions } from './bookmarks.state';
import SaveBookmarksModule from './save-bookmark/save-bookmark';

import template from './bookmarks.html';
import controller from './bookmarks.controller';
import './bookmarks.styl';

const bookmarksComponent = {
  template,
  controller,
  controllerAs: 'bookmarksListCtrl'
};

const BookmarksModule = angular.module('bookmarks', [
      SaveBookmarksModule.name
    ])
    .factory('BookmarksActions', BookmarksActions)
    .component('bookmarks', bookmarksComponent)
  ;

export default BookmarksModule;