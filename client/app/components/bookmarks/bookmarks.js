import angular from 'angular';
import { BookmarksActions } from './bookmarks.state';
import SaveBookmarksModule from './save-bookmark/save-bookmark';

import template from './bookmarks.html';
import './bookmarks.css';

class BookmarksController {
  constructor(CategoriesActions, BookmarksActions, $ngRedux, $scope) {
    'ngInject';

    this.CategoriesActions = CategoriesActions;
    this.BookmarksActions = BookmarksActions;
    this.$ngRedux = $ngRedux;
    this.$scope = $scope;
  }

  $onInit() {
    const actions = Object.assign({}, this.BookmarksActions, this.CategoriesActions),
      unsubscribe = this.$ngRedux.connect(this.mapStateToThis, actions)(this);

    this.getBookmarks();

    this.$scope.$on('$destroy', unsubscribe);
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