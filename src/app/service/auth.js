import { SigninController } from '../controllers/sign/signin/signin.controller';
class LoginCtrl extends SigninController{
  constructor($rootScope, $state, $timeout, AuthService, Utils, $mdDialog) {
    'ngInject';
    super($rootScope, $state, $timeout, AuthService, Utils);
    this.$mdDialog = $mdDialog;
  }

  submit() {
    // 必须要等待所有请求全部完成（不管成功还是失败），因为要知道哪些请求401需要在登陆成功后重新发起请求
    // $rootScope.reqPending => 当前pending状态AJAX数目 => //service/loading.facatory.js
    if (this.$rootScope.reqPending) {
      return this.Utils.toast('error', `当前还有${this.$rootScope.reqPending}个请求未完成，请等待所有请求完成！`);
    }
    this.showLoading = true;
    this.AuthService.login(this.user)
      .then(res => {
        let userInfo = res.user;
        this.$timeout(() => {
          this.Utils.toast('success', `登录成功！欢迎${userInfo.name}`);
          this.$mdDialog.hide(res.token);
        });
      })
      .finally(() => {
        this.showLoading = false;
      });
  }

}
export class AuthService {
  constructor($q, $http, $timeout, $state, $rootScope, $localStorage, $sessionStorage, $mdDialog, ApiService, Utils) {
    'ngInject';
    this.$q = $q;
    this.$http = $http;
    this.$timeout = $timeout;
    this.$state = $state;
    this.$rootScope = $rootScope;
    this.$localStorage = $localStorage;
    this.$sessionStorage = $sessionStorage;
    this.$mdDialog = $mdDialog;
    this.ApiService = ApiService;
    this.Utils = Utils;
    this.currentUser = $localStorage.currentUser || $localStorage.currentUser || {};

    this.isReLoginDialogOpen = false;
  }

  login(userInfo) {
    return this.ApiService.post('sign/signin', userInfo)
      .then(res => {
        this.saveUserInfo(res.user);
        return res;
      });
  }

  requireLogin(rejection) {
    // 已经弹窗了就不再弹窗了
    if (this.isReLoginDialogOpen) {
      let defferd = this.$q.defer();
      this.$rootScope.$on('event:loginSuccess', (ev, token) => {
        rejection.config.headers.token = token;
        defferd.resolve(this.$http(rejection.config));
      });
      this.$rootScope.$on('event:loginCancel', () => {
        defferd.reject();
      });
      return defferd.promise;
    } else {
      this.isReLoginDialogOpen = true;
      this.clearUserInfo();
      this.Utils.toast('error', rejection.data.message || '请登陆');
      return this.$mdDialog.show({
        controller: LoginCtrl,
        controllerAs: 'vm',
        template: `
          <md-dialog aria-label="login dialog" flex="95" flex-gt-xs="60" flex-gt-sm="40" flex-gt-md="30" flex-gt-lg="20">
            <md-toolbar>
              <div class="md-toolbar-tools">
                <h2>请登录</h2>
              </div>
            </md-toolbar>
            <md-dialog-content>
              <div layout-padding ng-include="'app/controllers/sign/signin/signin_form.html'"></div>
            </md-dialog-content>
          </md-dialog>
        `,
        clickOutsideToClose: false
      })
      .then(token => {
        this.$rootScope.$broadcast('event:loginSuccess', token);
        rejection.config.headers.token = token;
        return this.$http(rejection.config);
      })
      .catch(() => {
        this.$rootScope.$broadcast('event:loginCancel');
        this.logout();
        return this.$q.reject(rejection);
      })
      .finally(() => {
        this.isReLoginDialogOpen = false;
      });
    }
  }

  logout() {
    this.clearUserInfo();
    this.$timeout(() => {
      this.$state.go('signin', {}, {
        location: 'replace'
      });
    });
  }

  saveUserInfo(userInfo) {
    this.currentUser = userInfo;
    if (this.$rootScope.autoLogin) {
      this.$localStorage.currentUser = userInfo;
    } else {
      this.$sessionStorage.currentUser = userInfo;
    }
  }

  clearUserInfo() {
    this.currentUser = {};
    delete this.$sessionStorage.token;
    delete this.$localStorage.token;
    delete this.$sessionStorage.currentUser;
    delete this.$localStorage.currentUser;
  }

}