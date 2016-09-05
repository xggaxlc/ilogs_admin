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
    'ng-fx',
    'oc.lazyLoad'
  ])
  .constant('BASEURL', BASEURL)
  .config(config)
  .config(routerConfig)
  .run(runBlock)
  .factory('authInterceptor', Service.authInterceptor)
  .factory('errorInterceptor', Service.errorInterceptor)
  .factory('loadingInterceptor', Service.loadingInterceptor)
  .service('Utils', Service.Utils)
  .service('AuthService', Service.AuthService)
  .service('ApiService', Service.ApiService)
  .service('PermissionService', Service.PermissionService)
  .filter('permission', Filter.permission)
  .directive('editorMd', Directive.editorMd)
  .directive('paging', Directive.paging)
  .directive('compareTo', Directive.compareTo)
  .directive('loadingButton', Directive.loadingButton)
  .directive('search', Directive.search)
  .directive('filter', Directive.filter)
  .directive('uploadImage', Directive.uploadImage)
  .directive('permission', Directive.permission);