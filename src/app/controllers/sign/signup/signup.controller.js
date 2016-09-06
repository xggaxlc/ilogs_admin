export class SignupController {
  constructor(ApiService, AuthService, $stateParams, $rootScope, $state, $timeout, Utils) {
    'ngInject';
    this.ApiService = ApiService;
    this.AuthService = AuthService;
    this.$stateParams = $stateParams;
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.$timeout = $timeout;
    this.Utils = Utils;
    this.$rootScope.autoLogin = false;

    // 注册页清空个人信息先
    this.AuthService.clearUserInfo();
  }

  submit() {
    this.showLoading = true;
    this.ApiService.post('sign/signup', angular.merge({}, this.user, { key: this.$stateParams.key }))
      .then(res => {
        let userInfo = res.user;
        this.AuthService.saveUserInfo(res.user);
        this.$timeout(() => {
          this.Utils.toast('success', `注册成功！欢迎${userInfo.name}`);
          this.$state.go('main.home', {}, {
            replace: true
          });
        });
      })
      .finally(() => {
        this.showLoading = false;
      });
  }

}