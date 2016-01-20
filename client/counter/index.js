import angular from 'angular';
import ngRedux from 'ng-redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import counter from './components/counter';
import categories from './components/categories';
import categoryActions from './actions/categories';

let counterModule = angular.module('counter', [ngRedux])
  .config(($stateProvider, $ngReduxProvider) => {
    'ngInject';

    $stateProvider
      .state('counter', {
        url:'/counter',
        views: {
          'bookmarks@': {
            template: `<ngr-counter></ngr-counter>`
          },
          'categories@': {
            template: `<ngr-categories></ngr-categories>`
          }
        }
      })
    $ngReduxProvider.createStoreWith(rootReducer, [thunk]);
  })
  .factory('CategoriesModel', categoryActions)
  .directive('ngrCounter', counter)
  .directive('ngrCategories', categories);

export default counterModule;
