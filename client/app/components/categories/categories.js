import angular from 'angular';
import CategoryItemModule from './category-item/category-item';

import { CategoriesActions } from './categories.state';

import template from './categories.html';
import './categories.css';

class CategoriesController {
  constructor($ngRedux, CategoriesActions, BookmarksActions) {
    'ngInject';

    this.store = $ngRedux;
    this.CategoriesActions = CategoriesActions;
    this.BookmarksActions = BookmarksActions;
  }

  $onInit() {
    const actions = Object.assign({}, this.CategoriesActions, this.BookmarksActions);
    this.unsubscribe = this.store.connect(this.mapStateToThis, actions)(this);

    this.getCategories();
  }

  $onDestroy() {
    this.unsubscribe();
  }

  mapStateToThis(state) {
    return {
      categories: state.categories,
      currentCategory: state.category
    }
  }

  onCategorySelected(category) {
    this.selectCategory(category);
    this.resetSelectedBookmark();
  }

  isCurrentCategory(category) {
    return this.currentCategory &&
      this.currentCategory.id === category.id;
  }
}

const CategoriesComponent = {
  template,
  controller: CategoriesController,
  controllerAs: 'categoriesListCtrl'
};

const CategoriesModule = angular.module('categories', [
      CategoryItemModule.name
    ])
    .factory('CategoriesActions', CategoriesActions)
    .component('categories', CategoriesComponent)
  ;

export { CategoriesModule, CategoriesComponent, CategoriesController } ;
