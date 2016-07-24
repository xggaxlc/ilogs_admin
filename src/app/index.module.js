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

angular.module('ilogs', [
    'ngAnimate',
    'ngSanitize',
    'ngMessages',
    'ngStorage',
    'restangular',
    'ui.router',
    'ngMaterial',
    'ngFileUpload',
		'ngImgCrop',
    'toastr'
  ])
  .config(config)
  .config(routerConfig)
  .run(runBlock)
  .service('AuthService', Service.AuthService);