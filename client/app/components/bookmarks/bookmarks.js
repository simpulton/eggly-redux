import angular from 'angular';
import { BookmarksActions } from './bookmarks.state';
import SaveBookmarksModule from './save-bookmark/save-bookmark';

import template from './bookmarks.html';
import './bookmarks.css';

class BookmarksController {
  constructor(CategoriesActions, BookmarksActions, $ngRedux) {
    'ngInject';

    this.CategoriesActions = CategoriesActions;
    this.BookmarksActions = BookmarksActions;
    this.$ngRedux = $ngRedux;
  }

  $onInit() {
    const actions = Object.assign({}, this.BookmarksActions, this.CategoriesActions);
    this.unsubscribe = this.$ngRedux.connect(this.mapStateToThis, actions)(this);
    this.getBookmarks();
  }

  $onDestroy() {
    this.unsubscribe();
  }

  mapStateToThis(state) {
    return {
      currentCategory: state.category,
      currentBookmark: state.bookmark,
      bookmarks: state.bookmarks
    };
  }

  onSave(bookmark) {
    this.saveBookmark(bookmark);
    this.resetSelectedBookmark();
  }
}

const bookmarksComponent = {
  template,
  controller: BookmarksController,
  controllerAs: 'bookmarksListCtrl'
};

const BookmarksModule = angular.module('bookmarks', [
    SaveBookmarksModule.name
  ])
    .factory('BookmarksActions', BookmarksActions)
    .component('bookmarks', bookmarksComponent)
  ;

export default BookmarksModule;
