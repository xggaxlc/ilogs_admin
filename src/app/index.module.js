import {
  config
} from './index.config';
import {
  routerConfig
} from './index.route';
import {
  runBlock
} from './index.run';

import * as Service from './service/index';
import * as Directive from './components/index';

angular.module('ilogs', [
    'ngAnimate',
    'ngSanitize',
    'ngMessages',
    'ngStorage',
    'ui.router',
    'ngMaterial',
    'ngFileUpload',
		'ngImgCrop',
    'chart.js'
  ])
  .config(config)
  .config(routerConfig)
  .run(runBlock)
  .service('AuthService', Service.AuthService)
  .directive('editorMd', Directive.editorMd)
  .directive('mediumEditor', Directive.mediumEditor);