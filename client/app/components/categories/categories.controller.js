class CategoriesController {
  constructor(CategoriesModel, $scope, $ngRedux) {
    'ngInject';

    let unsubscribe = $ngRedux.connect(this.mapStateToThis, CategoriesModel)(this);

    this.getCategories();

    $scope.$on('$destroy', unsubscribe);
  }

  // Which part of the Redux global state does our component want to receive?
  mapStateToThis(state) {
    return {
      categories: state.categories,
      category: state.category
    };
  }
}

export default CategoriesController;
