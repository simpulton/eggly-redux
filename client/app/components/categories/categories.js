import angular from 'angular';
import { CategoriesActions } from './categories.state';
import CategoryItemModule from './category-item/category-item';

import template from './categories.html';
import './categories.css';

class CategoriesController {
  constructor(CategoriesActions, BookmarksActions, $ngRedux) {
    'ngInject';

    this.$ngRedux = $ngRedux;
    this.CategoriesActions = CategoriesActions;
    this.BookmarksActions = BookmarksActions;
  }

  $onInit() {
    const actions = Object.assign({}, this.BookmarksActions, this.CategoriesActions);
    this.unsubscribe = this.$ngRedux.connect(this.mapStateToThis, {})(this);
    this.getCategories();
  }

  $onDestroy() {
    this.unsubscribe();
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
  template,
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
