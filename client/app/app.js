import 'bootstrap-css-only';
import 'normalize.css';

import angular from 'angular';
import appComponent from './app.component';
import ComponentsModule from './components/components';
import StateModule from './state/state';

angular.module('app', [
    ComponentsModule.name,
    StateModule.name
  ])
  .component('app', appComponent)
;
