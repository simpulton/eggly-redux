import 'bootstrap-css-only';
import 'normalize.css';

import angular from 'angular';
import CommonModule from './common/common';
import ComponentsModule from './components/components';

import template from './app.html';
import './app.css';

const AppComponent = {
  template
};

angular.module('app', [
    CommonModule.name,
    ComponentsModule.name
  ])
  .component('app', AppComponent)
;
