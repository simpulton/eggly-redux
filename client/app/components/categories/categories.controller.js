class CategoriesController {
  constructor(CategoriesActions, $scope, $ngRedux) {
    'ngInject';

    let unsubscribe = $ngRedux.connect(this.mapStateToThis, CategoriesActions)(this);
    this.getCategories();

    $scope.$on('$destroy', unsubscribe);
  }

  mapStateToThis(state) {
    return {
      categories: state.categories
    };
  }
}

export default CategoriesController;
