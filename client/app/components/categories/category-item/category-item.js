import angular from 'angular';
import template from './category-item.html';
import './category-item.css';

const categoryItemComponent = {
  bindings: {
    category: '<',
    selected: '&'
  },
  template,
  controllerAs: 'categoryItemCtrl'
};

const CategoryItemModule = angular.module('categoryItem', [])
  .component('categoryItem', categoryItemComponent);

export default CategoryItemModule;