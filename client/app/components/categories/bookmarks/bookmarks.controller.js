class BookmarksController {
  constructor(CategoriesModel, BookmarksModel, $stateParams, $ngRedux, $scope) {
    'ngInject';

    let actions = Object.assign({}, BookmarksModel, CategoriesModel),
        unsubscribe = $ngRedux.connect(this.mapStateToThis, actions)(this);

    this.getBookmarks();
    this.setCurrentCategory($stateParams.category);

    $scope.$on('$destroy', unsubscribe);
  }

  mapStateToThis(state) {
    return {
      currentCategory: state.category,
      bookmarks: state.bookmarks
    };
  }
}

export default BookmarksController;
