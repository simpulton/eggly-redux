class CategoriesController {
  constructor(CategoriesModel, $scope, $ngRedux) {
    'ngInject';

    let unsubscribe = $ngRedux.connect(this.mapStateToThis, CategoriesModel)(this);

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
