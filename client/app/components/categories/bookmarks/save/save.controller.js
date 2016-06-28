import {clone} from 'lodash';

class SaveController {
  constructor(BookmarksActions, $stateParams, $ngRedux, $scope) {
    'ngInject';

    this.$stateParams = $stateParams;
    this.$ngRedux = $ngRedux;
    this.$scope = $scope;
    this.BookmarksActions = BookmarksActions;
  }

  $onInit() {
    let unsubscribe = this.$ngRedux.connect(this.mapStateToThis, this.BookmarksActions)(this);
    this.resetSelectedBookmark();
    this.getBookmarkById(this.$stateParams.bookmarkId);

    this.$scope.$on('$destroy', unsubscribe);
  }

  mapStateToThis(state) {
    return {
      editedBookmark: clone(state.bookmark),
      bookmarks: state.bookmarks,
      category: state.category
    };
  }

  save() {
    this.saveBookmark(this.editedBookmark, this.$stateParams.category);
    this.returnToBookmarks();
    this.resetSelectedBookmark();
  }

  currentBookmarkExists() {
    return this.editedBookmark.id || this.editedBookmark.id === 0;
  }
}

export default SaveController;
