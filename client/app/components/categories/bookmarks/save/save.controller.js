import {clone} from 'lodash';

class SaveController {
  constructor(BookmarksModel, $stateParams, $ngRedux, $scope) {
    'ngInject';

    this.$stateParams = $stateParams;

    let unsubscribe = $ngRedux.connect(this.mapStateToThis, BookmarksModel)(this);
    this.getBookmarkById($stateParams.bookmarkId);

    $scope.$on('$destroy', unsubscribe);
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
    this.resetEditedBookmark();
  }

  currentBookmarkExists() {
    return this.editedBookmark.id || this.editedBookmark.id === 0;
  }
}

export default SaveController;
