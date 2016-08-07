export class AuthService {
  constructor($http, $timeout, $state, $rootScope, $localStorage, $sessionStorage) {
    'ngInject';
    this.$http = $http;
    this.$timeout = $timeout;
    this.$state = $state;
    this.$rootScope = $rootScope;
    this.$localStorage = $localStorage;
    this.$sessionStorage = $sessionStorage;
    this.currentUser = $localStorage.currentUser || $localStorage.currentUser || {};
  }

  login(userInfo) {
    return this.$http.post('sign', userInfo)
      .then(res => {
        this.saveUserInfo(res.data.user);
        return res.data.user;
      });
  }

  requireLogin() {
    
  }

  logout() {
    this.clearUserInfo();
    this.$timeout(() => {
      this.$state.go('login', {}, {
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