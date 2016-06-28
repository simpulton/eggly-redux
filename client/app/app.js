import 'bootstrap-css-only';
import 'normalize.css';

// Angular
import angular from 'angular';
import uiRouter from 'angular-ui-router';

// Components
import Components from './components/components';
import AppComponent from './app.component';

// State
import State from './state/state';

const config = ($stateProvider, $urlRouterProvider) => {
  'ngInject';

  $urlRouterProvider.otherwise('/');

  $stateProvider
    //abstract state serves as a PLACEHOLDER or NAMESPACE for application states
    .state('eggly', {
      url: '',
      abstract: true
    });

  $urlRouterProvider.otherwise('/');
}

angular.module('app', [
    uiRouter,
    Components.name,
    State.name
  ])
  .config(config)
  .component('app', AppComponent);
