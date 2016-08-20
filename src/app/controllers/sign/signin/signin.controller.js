export class SigninController {
  constructor($rootScope, $state, $timeout, AuthService, Utils) {
    'ngInject';
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.$timeout = $timeout;
    this.AuthService = AuthService;
    this.Utils = Utils;
    this.autoLogin = true;
    this.$rootScope.autoLogin = this.autoLogin;
  }

  changeAutoLogin() {
    this.$rootScope.autoLogin = this.autoLogin;
  }

  submit() {
    this.showLoading = true;
    this.AuthService.login(this.user)
      .then(res => {
        let userInfo = res.user;
        this.$timeout(() => {
          this.Utils.toast('success', `登录成功！欢迎${userInfo.name}`);
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