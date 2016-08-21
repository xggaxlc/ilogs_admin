export class SignupController {
  constructor(ApiService, AuthService, $stateParams, $rootScope, $state, Utils) {
    'ngInject';
    this.ApiService = ApiService;
    this.AuthService = AuthService;
    this.$stateParams = $stateParams;
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.Utils = Utils;
    this.$rootScope.autoLogin = false;
  }

  submit() {
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
      });
  }

}