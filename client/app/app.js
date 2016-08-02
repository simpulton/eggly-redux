import 'bootstrap-css-only';
import 'normalize.css';

import angular from 'angular';
import CommonModule from './common/common';
import ComponentsModule from './components/components';

import './app.css';

const AppComponent = {
  template: `
    <div class="app">
    	<div class="container-fluid">
    		<div class="row">
    			<div class="col-sm-3 col-md-2 sidebar">
    				<categories></categories>
    			</div>
    			<div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
    				<bookmarks></bookmarks>
    			</div>
    		</div>
    	</div>
    </div>
  `
};

angular.module('app', [
    CommonModule.name,
    ComponentsModule.name
  ])
  .component('app', AppComponent)
;
