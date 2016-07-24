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
    'restangular',
    'ui.router',
    'ngMaterial',
    'toastr'
  ])
  .config(config)
  .config(routerConfig)
  .run(runBlock)
  .service('AuthService', Service.AuthService);