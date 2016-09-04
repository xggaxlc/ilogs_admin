export class ArticleIndexController {
  constructor($rootScope, $timeout, $state, $stateParams, $mdDialog, Utils, ApiService) {
    'ngInject';
    this.$rootScope = $rootScope;
    this.$timeout = $timeout;
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.$mdDialog = $mdDialog;
    this.Utils = Utils;
    this.ApiService = ApiService;

    this.$rootScope.pageTitle = '文章';

    this.searchOptions = {
      search: [{
        name: '文章标题',
        value: 'title'
      }]
    }

    this.categoryFilterOptions = {
      field: 'category',
      filter: [{
        name: '全部分类',
        value: ''
      }]
    }

    this.pageOptions = {
      perPage: this.$stateParams.limit
    }


    this.$timeout(() => {
      this.queryCategory();
      this.query();
    }, 200);


  }

  queryCategory() {
    this.ApiService.get('category')
      .then(res => {
        this.categoryFilterOptions.filter = this.categoryFilterOptions.filter
          .concat(
            res.data.map(item => {
              return {
                name: item.name,
                value: item._id
              }
            })
          );
      });
  }

  query() {
    this.showLoading = true;
    this.ApiService.get('post', this.$stateParams)
      .then(res => {
        this.pageOptions.count = res.count;
        this.posts = res.data;
      })
      .finally(() => {
        this.showLoading = false;
      });
  }

  showDeleteConfirm(ev, item) {
    let confirm = this.$mdDialog.confirm()
      .title(`删除文章`)
      .htmlContent(`<p class="margin-top-16">你确定要删除 <strong class="red">${item.title}</strong> ?</p>`)
      .ariaLabel('delete article')
      .targetEvent(ev)
      .ok('删除')
      .cancel('取消');

    this.$mdDialog.show(confirm)
      .then(() => {
        this.delete(item._id);
      });
  }

  delete(id) {
    this.Utils.showLoading();
    this.ApiService.delete(`post/${id}`)
      .then(() => {
        this.Utils.toast('success', '删除文章成功！');
        this.$state.reload();
      })
      .finally(() => {
        this.Utils.hideLoading();
      });
  }

}