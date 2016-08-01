import angular from 'angular';

import template from './save-bookmark.html';
import controller from './save-bookmark.controller';
import './save-bookmark.styl';

const saveBookmarkComponent = {
  bindings: {
    bookmark: '<',
    save: '&',
    cancel: '&'
  },
  template,
  controller,
  controllerAs: 'saveBookmarkCtrl'
};

const SaveBookmarkModule = angular.module('saveBookmark', [])
  .component('saveBookmark', saveBookmarkComponent);

export default SaveBookmarkModule;