import _ from 'lodash';

class SaveController {
  constructor(BookmarksModel, $stateParams, $ngRedux) {
    'ngInject';

    this.$stateParams = $stateParams;

    let unsubscribe = $ngRedux.connect(this.mapStateToThis, BookmarksModel)(this);
    this.getBookmarkById($stateParams.bookmarkId);
  }

  mapStateToThis(state) {
    return {
      editedBookmark: state.bookmark,
      bookmarks: state.bookmarks
    };
  }

  save(bookmark) {
    this.saveBookmark(bookmark, bookmark.id, this.$stateParams.category);
    this.returnToBookmarks();
    this.resetEditedBookmark();
  }
}

export default SaveController;
