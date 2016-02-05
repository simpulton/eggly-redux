import 'bootstrap-css-only';
import 'normalize.css';

// Angular
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import angularComponent from 'angular-component';

// Components
import Components from './components/components';
import AppComponent from './app.component';

// State
import State from './state/state';

angular.module('app', [
  uiRouter,
  State.name,
  Components.name
])

.config(($stateProvider, $urlRouterProvider) => {
  'ngInject';

  $urlRouterProvider.otherwise('/');

  $stateProvider
    //abstract state serves as a PLACEHOLDER or NAMESPACE for application states
    .state('eggly', {
    url: '',
    abstract: true
  });
})

.component('app', AppComponent);
