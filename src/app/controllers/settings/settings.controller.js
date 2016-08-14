export class SettingsController {
  constructor($rootScope, $http, Utils) {
    'ngInject';
    this.$rootScope = $rootScope;
    this.$http =  $http;
    this.Utils = Utils;

    this.init();
  }

  init() {
    this.$rootScope.pageTitle = '设置';
  }

}