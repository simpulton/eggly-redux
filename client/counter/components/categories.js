export default function categories() {
  return {
    restrict: 'E',
    controllerAs: 'categoriesListCtrl',
    controller: CategoriesController,
    template: require('./categories.html'),
    scope: {}
  };
}

class CategoriesController {

  constructor($ngRedux, $scope, CategoriesModel) {
    'ngInject';

    const unsubscribe = $ngRedux.connect(this.mapStateToThis, CategoriesModel)(this);

    this.getCategories();
    this.setCurrentCategory('Development');

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
