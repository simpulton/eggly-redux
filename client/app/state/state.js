import angular from 'angular';
import ngRedux from 'ng-redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/root.reducer';
import CategoriesActions from './actions/categories.actions';
import BookmarksActions from './actions/bookmarks.actions';

const config = ($ngReduxProvider) => {
  'ngInject';

  $ngReduxProvider.createStoreWith(rootReducer, [thunk]);
};

let StateModule = angular.module('state', [ngRedux])
  .config(config)
  .factory('CategoriesActions', CategoriesActions)
  .factory('BookmarksActions', BookmarksActions);

export default StateModule;
