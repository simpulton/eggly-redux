class BookmarksController {
  constructor(CategoriesModel, BookmarksModel, $stateParams, $ngRedux, $scope) {
    'ngInject';

    let actions = Object.assign({}, BookmarksModel, CategoriesModel);
    let unsubscribe = $ngRedux.connect(this.mapStateToThis, actions)(this);
    this.getBookmarks();
    this.setCurrentCategory($stateParams.category);
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
