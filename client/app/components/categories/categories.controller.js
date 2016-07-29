class CategoriesController {
  constructor(CategoriesActions, BookmarksActions, $scope, $ngRedux) {
    'ngInject';

    this.$scope = $scope;
    this.$ngRedux = $ngRedux;
    this.CategoriesActions = CategoriesActions;
    this.BookmarksActions = BookmarksActions;
  }

  $onInit() {
    let actions = Object.assign({}, this.BookmarksActions, this.CategoriesActions),
        unsubscribe = this.$ngRedux.connect(this.mapStateToThis, actions)(this);
    this.getCategories();

    this.$scope.$on('$destroy', unsubscribe);
  }

  mapStateToThis(state) {
    return {
      categories: state.categories,
      currentCategory: state.category
    };
  }

  setCategory(category) {
    this.setCurrentCategory(category);
    this.resetSelectedBookmark();
  }

  isCurrentCategory(category) {
    return this.currentCategory && this.currentCategory.id === category.id;
  }
}

export default CategoriesController;
