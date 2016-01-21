import angular from 'angular';
import CategoriesModel from './models/categories-model';
import BookmarksModel from './models/bookmarks-model';

let commonModule = angular.module('common', [])
  // .service('BookmarksModel', BookmarksModel);

export default commonModule;
