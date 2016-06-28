class BookmarksController {
  constructor(CategoriesActions, BookmarksActions, $stateParams, $ngRedux, $scope) {
    'ngInject';

    this.CategoriesActions = CategoriesActions;
    this.BookmarksActions = BookmarksActions;
    this.$stateParams = $stateParams;
    this.$ngRedux = $ngRedux;
    this.$scope = $scope;
  }

  $onInit() {
    let actions = Object.assign({}, this.BookmarksActions, this.CategoriesActions),
        unsubscribe = this.$ngRedux.connect(this.mapStateToThis, actions)(this);

    this.getBookmarks();
    this.setCurrentCategory(this.$stateParams.category);

    this.$scope.$on('$destroy', unsubscribe);
  }

  mapStateToThis(state) {
    return {
      currentCategory: state.category,
      bookmarks: state.bookmarks
    };
  }
}

export default BookmarksController;
