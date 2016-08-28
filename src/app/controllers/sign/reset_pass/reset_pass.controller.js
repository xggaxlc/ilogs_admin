export class ResetPassController {
  constructor(ApiService, $stateParams, $state, Utils, $timeout) {
    'ngInject';
    this.ApiService = ApiService;
    this.$stateParams = $stateParams;
    this.$state = $state;
    this.Utils = Utils;
    this.$timeout = $timeout;
  }

  submit() {
    this.showLoading = true;
    this.ApiService.put('sign/resetPass', angular.merge({}, this.user, {
        key: this.$stateParams.key
      }))
      .then(() => {
        this.$timeout(() => {
          this.Utils.toast('success', `重置密码成功！请登录！`);
          this.$state.go('signin', {}, {
            replace: true
          });
        });
      })
      .finally(() => {
        this.showLoading = false;
      });
  }

}