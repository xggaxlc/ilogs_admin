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
import { BASEURL } from '../config.js';

angular.module('ilogs_admin', [
    'ngSanitize',
    'ngMessages',
    'ngStorage',
    'ngAnimate',
    'ngMaterial',
    'ui.router',
    'ui.bootstrap',
    'md.data.table',
    'ngFileUpload',
		'ngImgCrop',
    'chart.js',
    'ng-fx'
  ])
  .constant('BASEURL', BASEURL)
  .config(config)
  .config(routerConfig)
  .run(runBlock)
  .factory('authInterceptor', Service.authInterceptor)
  .factory('errorInterceptor', Service.errorInterceptor)
  .service('Utils', Service.Utils)
  .service('AuthService', Service.AuthService)
  .service('ApiService', Service.ApiService)
  .filter('permission', Filter.permission)
  .directive('editorMd', Directive.editorMd)
  .directive('mediumEditor', Directive.mediumEditor)
  .directive('paging', Directive.paging);