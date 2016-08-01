import angular from 'angular';
import bookmarksComponent from './bookmarks.component';
import BookmarksActions from './bookmarks.actions';
import SaveBookmarksModule from './save-bookmark/save-bookmark';

const BookmarksModule = angular.module('bookmarks', [
      SaveBookmarksModule.name
    ])
    .factory('BookmarksActions', BookmarksActions)
    .component('bookmarks', bookmarksComponent)
  ;

export default BookmarksModule;