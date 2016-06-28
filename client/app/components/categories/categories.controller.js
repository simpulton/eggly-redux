class CategoriesController {
  constructor(CategoriesActions, $scope, $ngRedux) {
    'ngInject';

    this.$scope = $scope;
    this.$ngRedux = $ngRedux;
    this.CategoriesActions = CategoriesActions;
  }

  $onInit() {
    let unsubscribe = this.$ngRedux.connect(this.mapStateToThis, this.CategoriesActions)(this);
    this.getCategories();

    this.$scope.$on('$destroy', unsubscribe);
  }

  mapStateToThis(state) {
    return {
      categories: state.categories
    };
  }
}

export default CategoriesController;
