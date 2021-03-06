export class SettingsController {
  constructor($rootScope, $http, Utils, ApiService, $timeout) {
    'ngInject';
    this.$rootScope = $rootScope;
    this.$http = $http;
    this.Utils = Utils;
    this.ApiService = ApiService;
    this.$timeout = $timeout;

    this.$rootScope.pageTitle = '设置';
    this.$timeout(() => {
      this.query();
    }, 300);
  }

  query() {
    this.showLoading = true;
    this.ApiService.get('setting')
      .then(res => {
        this.settings = res.data;
      })
      .finally(() => {
        this.showLoading = false;
      });

  }

  save() {
    this.showLoading = true;
    this.ApiService.post('setting', this.settings)
      .then(res => {
        this.settings = res.data;
        this.Utils.toast('success', '保存设置成功');
      })
      .finally(() => {
        this.showLoading = false;
      });
  }

}