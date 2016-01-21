class BookmarksController {
  constructor(CategoriesModel, BookmarksModel, $stateParams, $ngRedux, $scope) {
    'ngInject';

    let actions = Object.assign({}, BookmarksModel, CategoriesModel);
    let unsubscribe = $ngRedux.connect(this.mapStateToThis, actions)(this);
    this.getBookmarks();
    this.setCurrentCategory($stateParams.category);

    // bookmarksListCtrl.getCurrentCategory = CategoriesModel.getCurrentCategory.bind(CategoriesModel);
    // bookmarksListCtrl.getCurrentCategoryName = CategoriesModel.getCurrentCategoryName.bind(CategoriesModel);
    // bookmarksListCtrl.deleteBookmark = BookmarksModel.deleteBookmark;
  }

  // Which part of the Redux global state does our component want to receive?
  mapStateToThis(state) {
    return {
      currentCategory: state.category,
      bookmarks: state.bookmarks
    };
  }
}

export default BookmarksController;
