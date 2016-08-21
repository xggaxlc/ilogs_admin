export class SigninController {
  constructor($q, $rootScope, $state, $timeout, AuthService, Utils, $mdDialog, ApiService) {
    'ngInject';
    this.$q = $q;
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.$timeout = $timeout;
    this.AuthService = AuthService;
    this.Utils = Utils;
    this.$mdDialog = $mdDialog;
    this.ApiService = ApiService;
    this.autoLogin = false;
    this.$rootScope.autoLogin = this.autoLogin;
  }

  changeAutoLogin() {
    this.$rootScope.autoLogin = this.autoLogin;
  }

  forgetPass(ev) {
    let confirm = this.$mdDialog.prompt()
      .title('重置密码')
      .placeholder('邮箱')
      .ariaLabel('email')
      .targetEvent(ev)
      .ok('确定')
      .cancel('取消');

    this.$mdDialog.show(confirm)
      .then(email => {
        if (!email) return this.$q.reject();
        this.Utils.showLoading();
        return this.ApiService.post('sign/applyResetPass', { email: email });
      })
      .then(res => {
        this.Utils.toast('success', res.message, 7000);
      })
      .finally(() => {
        this.Utils.hideLoading();
      })
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