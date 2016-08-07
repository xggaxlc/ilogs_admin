export class ArticleIndexController {
  constructor($rootScope, $timeout, $http, $stateParams) {
    'ngInject';
    $rootScope.pageTitle = '文章列表';
    this.$timeout = $timeout;
    this.$http = $http;
    this.$stateParams = $stateParams;

    this.selected = [];
    this.$stateParams.limit = 10;
    this.pageOptions = {
      // count: 0,
      perPage: this.$stateParams.limit
    }

    this.getArticle();

  }

  refresh() {
    this.getArticle();
  }

  getArticle() {
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