import angular from 'angular';
import { CategoriesActions } from './categories.state';
import CategoryItemModule from './category-item/category-item';

import './categories.styl';

class CategoriesController {
  constructor(CategoriesActions, BookmarksActions, $scope, $ngRedux) {
    'ngInject';

    this.$scope = $scope;
    this.$ngRedux = $ngRedux;
    this.CategoriesActions = CategoriesActions;
    this.BookmarksActions = BookmarksActions;
  }

  $onInit() {
    const actions = Object.assign({}, this.BookmarksActions, this.CategoriesActions),
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

const categoriesComponent = {
  template: `
    <span class="logo" ng-click="categoriesListCtrl.setCategory(null)">
      <img class="logo" src="assets/img/eggly-logo.png">
    </span>
    <ul class="nav nav-sidebar">
      <li class="category-item" ng-class="{'active':categoriesListCtrl.isCurrentCategory(category)}"
        ng-repeat="category in categoriesListCtrl.categories">
        <category-item
          category="category"
          selected="categoriesListCtrl.setCategory(category)">
        </category-item>
      </li>
    </ul>
  `,
  controller: CategoriesController,
  controllerAs: 'categoriesListCtrl'
};

const CategoriesModule = angular.module('categories', [
      CategoryItemModule.name
    ])
    .factory('CategoriesActions', CategoriesActions)
    .component('categories', categoriesComponent)
  ;

export default CategoriesModule;
