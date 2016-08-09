export class ArticleIndexController {
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
    this.$rootScope.pageTitle = '文章列表';
    this.keyword = this.$stateParams.title;
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
        title: this.keyword
      });
    }
  }

  query() {
    this.showLoading = true;
    this.$timeout(() => {
      this.$http.get('post', {
        params: this.$stateParams
      })
      .then(res => {
        this.pageOptions.count = res.data.count;
        this.posts = res.data.data;
      })
      .finally(() => {
        this.showLoading = false;
      });
    });
  }

}