import {
  config
} from './index.config';
import {
  routerConfig
} from './index.route';
import {
  runBlock
} from './index.run';

import * as Filter from './filter/index';
import * as Service from './service/index';
import * as Directive from './components/index';

angular.module('ilogs', [
    // 'ngAnimate',
    'ngSanitize',
    'ngMessages',
    'ngStorage',
    'ui.router',
    'ui.bootstrap',
    'ngMaterial',
    'md.data.table',
    'ngFileUpload',
		'ngImgCrop',
    'chart.js',
    'ngAnimate-animate.css'
  ])
  .constant('BASEURL', 'http://localhost:9000/api/v1/')
  .config(config)
  .config(routerConfig)
  .run(runBlock)
  .factory('authInterceptor', Service.authInterceptor)
  .factory('errorInterceptor', Service.errorInterceptor)
  .service('Utils', Service.Utils)
  .service('AuthService', Service.AuthService)
  .filter('permission', Filter.permission)
  .directive('editorMd', Directive.editorMd)
  .directive('mediumEditor', Directive.mediumEditor)
  .directive('paging', Directive.paging);