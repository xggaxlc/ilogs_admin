export class ResetPassController {
  constructor(ApiService, $stateParams,  $state, Utils) {
    'ngInject';
    this.ApiService = ApiService;
    this.$stateParams = $stateParams;
    this.$state = $state;
    this.Utils = Utils;
  }

  submit() {
    this.ApiService.post('sign/resetPass', angular.merge({}, this.user, { key: this.$stateParams.key }))
      .then(() => {
        this.$timeout(() => {
          this.Utils.toast('success', `修改密码成功！请登录！`);
          this.$state.go('signin', {}, {
            replace: true
          });
        });
      });
  }

}