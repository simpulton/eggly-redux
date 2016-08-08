import angular from 'angular';
import SaveBookmarksModule from './save-bookmark/save-bookmark';

import template from './bookmarks.html';
import './bookmarks.css';

class BookmarksController {
  constructor($scope, BookmarksModel, $ngRedux) {
    'ngInject';

    this.$scope = $scope;
    this.BookmarksModel = BookmarksModel;
    this.store = $ngRedux;
  }

  $onInit() {
    this.BookmarksModel.getBookmarks()
      .then(result => this.bookmarks = result);

    this.$scope.$on('onCurrentCategoryUpdated', this.reset.bind(this));
    this.deleteBookmark = this.BookmarksModel.deleteBookmark;

    this.store.subscribe(() => {
      this.currentCategory = this.store.getState().category;
    });

    this.reset();
  }

  createBookmark() {
    this.currentBookmark = this.initNewBookmark();
  }

  editBookmark(bookmark) {
    this.currentBookmark = bookmark;
  }

  initNewBookmark() {
    return {
      id: null,
      title: '',
      url: '',
      category: this.CategoriesModel.getCurrentCategory().name
    };
  }

  saveBookmark(bookmark) {
    if (bookmark.id) {
      this.BookmarksModel.updateBookmark(bookmark);
    } else {
      this.BookmarksModel.createBookmark(bookmark);
    }
  }

  onSave(bookmark) {
    this.saveBookmark(bookmark);
    this.reset();
  }

  reset() {
    this.currentBookmark = null;
  }
}

const BookmarksComponent = {
  template,
  controller: BookmarksController,
  controllerAs: 'bookmarksListCtrl'
};

const BookmarksModule = angular.module('bookmarks', [
    SaveBookmarksModule.name
  ])
  .component('bookmarks', BookmarksComponent);

export default BookmarksModule;
