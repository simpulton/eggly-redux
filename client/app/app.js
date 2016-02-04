import 'bootstrap-css-only';
import 'normalize.css';

import angular from 'angular';
import uiRouter from 'angular-ui-router';
import angularComponent from 'angular-component';

// Redux dependencies
import ngRedux from 'ng-redux';
import thunk from 'redux-thunk';
import rootReducer from './components/root.reducer';

// Components
import Components from './components/components';
import AppComponent from './app.component';

angular.module('app', [
  uiRouter,
  ngRedux,
  Components.name
])

.config(($stateProvider, $urlRouterProvider, $ngReduxProvider) => {
  'ngInject';

  $urlRouterProvider.otherwise('/');

  $stateProvider
    //abstract state serves as a PLACEHOLDER or NAMESPACE for application states
    .state('eggly', {
    url: '',
    abstract: true
  });

  $ngReduxProvider.createStoreWith(rootReducer, [thunk]);
})

.component('app', AppComponent);
