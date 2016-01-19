import template from './bookmarks.html';
import controller from './bookmarks.controller';
import './bookmarks.styl';

let bookmarksComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default bookmarksComponent;
