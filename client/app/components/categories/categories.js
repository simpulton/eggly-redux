import angular from 'angular';
import CategoryItemModule from './category-item/category-item';

import { GET_CATEGORIES, category, GET_CURRENT_CATEGORY } from './categories.state';

import template from './categories.html';
import './categories.css';

class CategoriesController {
  constructor($timeout, store) {
    'ngInject';

    this.$timeout = $timeout;
    this.store = store;
  }

  $onInit() {
    this.store.subscribe(() => {
      this.categories = this.store.getState();
    });
    this.store.dispatch({ type: GET_CATEGORIES });

    this.$timeout(() => {
      const payload = [
        { id: 0, name: 'Redux' },
        { id: 1, name: 'Angular' }
      ];

      this.store.dispatch({ type: GET_CATEGORIES, payload });
    }, 3000);

    this.$timeout(() => {
      const payload = [
        { id: 0, name: 'Un Oh!' }
      ];

      this.store.dispatch({ type: GET_CATEGORIES, payload });
    }, 6000);
  }

  onCategorySelected(currentCategory) {
    this.currentCategory = category(this.currentCategory, { type: GET_CURRENT_CATEGORY, payload: currentCategory });
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
    .component('categories', CategoriesComponent)
  ;

export { CategoriesModule, CategoriesComponent, CategoriesController } ;
