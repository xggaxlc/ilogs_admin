export class UserIndexController{
  constructor($rootScope, $timeout, $http, $state, $stateParams) {
    'ngInject';
    this.$rootScope = $rootScope;
    this.$timeout = $timeout;
    this.$http = $http;
    this.$state = $state;
    this.$stateParams = $stateParams;

    this.init();
  }

  init() {
    this.$rootScope.pageTitle = '用户列表';
    this.keyword = this.$stateParams.name;
    this.selected = [];
    this.pageOptions = {
      perPage: this.$stateParams.limit
    }
    this.query();
  }

  search(e) {
    if(e.keyCode === 13) {
      this.$state.go(this.$state.current.name, {
        page: null,
        name: this.keyword
      });
    }
  }

  query() {
    this.showLoading = true;
    this.$timeout(() => {
      this.$http.get('user', {
        params: this.$stateParams
      })
      .then(res => {
        this.pageOptions.count = res.data.count;
        this.users = res.data.data;
      })
      .finally(() => {
        this.showLoading = false;
      });
    });
  }


}