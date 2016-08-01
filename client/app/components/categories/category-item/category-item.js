import angular from 'angular';
import './category-item.styl';

const categoryItemComponent = {
  bindings: {
    category: '<',
    selected: '&'
  },
  template: `
    <div class="categoryItem"
      ng-click="categoryItemCtrl.selected({category:categoryItemCtrl.category.name})">
      {{categoryItemCtrl.category.name}}
    </div>
  `,
  controllerAs: 'categoryItemCtrl'
};

const CategoryItemModule = angular.module('categoryItem', [])
  .component('categoryItem', categoryItemComponent);

export default CategoryItemModule;