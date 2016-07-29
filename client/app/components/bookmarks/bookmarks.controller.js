class BookmarksController {
  constructor(CategoriesActions, BookmarksActions, $ngRedux, $scope) {
    'ngInject';

    this.CategoriesActions = CategoriesActions;
    this.BookmarksActions = BookmarksActions;
    this.$ngRedux = $ngRedux;
    this.$scope = $scope;
  }

  $onInit() {
    let actions = Object.assign({}, this.BookmarksActions, this.CategoriesActions),
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

export default BookmarksController;
