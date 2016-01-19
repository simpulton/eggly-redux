import template from './save.html';
import controller from './save.controller';
import './save.styl';

let saveComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'bookmarkSaveCtrl'
};

export default saveComponent;
