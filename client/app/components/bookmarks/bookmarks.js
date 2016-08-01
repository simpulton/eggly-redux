import angular from 'angular';
import { BookmarksActions } from './bookmarks.state';
import SaveBookmarksModule from './save-bookmark/save-bookmark';

import './bookmarks.styl';

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
  template: `
    <div class="bookmarks">
      <div ng-repeat="bookmark in bookmarksListCtrl.bookmarks | filter:{category:bookmarksListCtrl.currentCategory.name}">
        <button type="button" class="close" ng-click="bookmarksListCtrl.deleteBookmark(bookmark)">&times;</button>
        <button type="button" class="btn btn-link" ng-click="bookmarksListCtrl.getBookmarkById(bookmark.id)">
          <span class="glyphicon glyphicon-pencil"></span>
        </button>
        <a href="{{bookmark.url}}" target="_blank">{{bookmark.title}}</a>
      </div>
      <div ng-if="bookmarksListCtrl.currentCategory.name">
        <button type="button" class="btn btn-link"
          ng-if="!bookmarksListCtrl.currentBookmark.category"
          ng-click="bookmarksListCtrl.getBookmarkById(null)">
          <span class="glyphicon glyphicon-plus"></span>
          Create Bookmark
        </button>
      </div>
      <save-bookmark
        ng-if="bookmarksListCtrl.currentBookmark.category"
        bookmark="bookmarksListCtrl.currentBookmark"
        save="bookmarksListCtrl.onSave(bookmark)"
        cancel="bookmarksListCtrl.resetSelectedBookmark()">
      </save-bookmark>
    </div>
  `,
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