import angular from 'angular';
import uiRouter from 'angular-ui-router';
import angularComponent from 'angular-component';
import Components from './components/components';
import AppComponent from './app.component';
import Common from './common/common';
import 'normalize.css';
import 'bootstrap-css-only';
import '../assets/css/eggly.css';

angular.module('app', [
  uiRouter,
  Components.name,
  Common.name
])

.config(function($stateProvider, $urlRouterProvider) {
  'ngInject';

  $stateProvider
  //abstract state serves as a PLACEHOLDER or NAMESPACE for application states
    .state('eggly', {
    url: '',
    abstract: true
  });

  $urlRouterProvider.otherwise('/');
})

.component('app', AppComponent);
