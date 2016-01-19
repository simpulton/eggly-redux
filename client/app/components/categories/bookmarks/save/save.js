import angular from 'angular';
import uiRouter from 'angular-ui-router';
import saveComponent from './save.component';

let saveModule = angular.module('save', [
  uiRouter
])

.component('save', saveComponent);

export default saveModule;
