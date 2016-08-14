export class ArticleIndexController {
  constructor($rootScope, $timeout, $http, $state, $stateParams, $mdDialog, Utils) {
    'ngInject';
    this.$rootScope = $rootScope;
    this.$timeout = $timeout;
    this.$http = $http;
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.$mdDialog = $mdDialog;
    this.Utils = Utils;

    this.init();

  }

  init() {
    this.$rootScope.pageTitle = '文章列表';
    this.keyword = this.$stateParams.title;
    this.pageOptions = {
      perPage: this.$stateParams.limit
    }

    this.query();
  }

  search(e) {
    if (e.keyCode === 13) {
      this.$state.go(this.$state.current.name, {
        page: null,
        title: this.keyword
      });
    }
  }

  showDeleteConfirm(ev, item) {
    let confirm = this.$mdDialog.confirm()
      .title(`删除文章`)
      .htmlContent(`你确定要删除 <strong class="red">${item.title}</strong> ?`)
      .ariaLabel('delete article')
      .theme('confirm')
      .targetEvent(ev)
      .ok('确定')
      .cancel('取消');

    this.$mdDialog.show(confirm)
      .then(() => {
        this.delete(item._id);
      });
  }

  delete(id) {
    this.Utils.showLoading();
    this.$http.delete(`post/${id}`)
      .then(() => {
        this.Utils.toast('success', '删除文章成功！');
        this.$state.reload();
      })
      .finally(() => {
        this.Utils.hideLoading();
      });
  }

  query() {
    this.posts = [];
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
    }, this.$rootScope.viewAnimateDelay);
  }

}