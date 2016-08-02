import angular from 'angular';
import template from './save-bookmark.html';
import './save-bookmark.css';

class SaveController {
  $onChanges() {
    this.editedBookmark = Object.assign({}, this.bookmark);
  }
}

const SaveBookmarkComponent = {
  bindings: {
    bookmark: '<',
    save: '&',
    cancel: '&'
  },
  template,
  controller: SaveController,
  controllerAs: 'saveBookmarkCtrl'
};

const SaveBookmarkModule = angular.module('saveBookmark', [])
  .component('saveBookmark', SaveBookmarkComponent);

export default SaveBookmarkModule;
