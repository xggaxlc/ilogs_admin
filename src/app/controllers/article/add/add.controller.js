export class AddArticleController {
  constructor($scope, $rootScope, $timeout, $http, $state, $mdDialog, Utils, AuthService) {
    'ngInject';
    this.$scope = $scope;
    this.$rootScope = $rootScope;
    this.$timeout = $timeout;
    this.$http = $http;
    this.$state = $state;
    this.$mdDialog = $mdDialog;
    this.Utils = Utils;
    this.currentUser = AuthService.currentUser;
    this.init();
  }

  init(){
    this.$scope.$emit('event:showNarrowMenu');
    this.$rootScope.pageTitle = '新建文章';

    this.article = {
      author: this.currentUser._id
    }
    
  }

  showDeleteConfirm(ev) {
    let confirm = this.$mdDialog.confirm()
      .title(`删除文章`)
      .htmlContent(`你确定要 <strong class="red">删除</strong> 这篇文章吗 ?`)
      .ariaLabel('delete article')
      .targetEvent(ev)
      .ok('确定')
      .cancel('取消');

    this.$mdDialog.show(confirm)
      .then(() => {
        this.delete();
      });
  }

  delete() {
    this.Utils.showLoading();
    this.$http.delete(`post/${this.article._id}`)
      .then(() => {
        this.Utils.toast('success', '删除文章成功！');
        this.$state.go('main.article.index');
      })
      .finally(() => {
        this.Utils.hideLoading();
      });
  }

  save() {
    this.showLoading = true;
    this.article.content = this.editor.getHTML();
    this.article._id ? this.update() : this.create();
  }

  publish() {
    this.article.published = true;
    this.update(false)
      .then(() => {
        this.Utils.toast('success', '发布成功！');
      });
  }

  unPublish() {
    this.article.published = false;
    this.update(false) 
      .then(() => {
        this.Utils.toast('warn', '已撤销发布！');
      });
  }

  create() {
    this.showLoading = true;
    this.$http.post('post', this.article)
      .then(res => {
        this.article = res.data.data;
        this.Utils.toast('success', '保存成功！');
      })
      .finally(() => {
        this.showLoading = false;
      });
  }

  update(autoToast = true) {
    this.showLoading = true;
    return this.$http.put(`post/${this.article._id}`, this.article)
      .then(res => {
        this.article = res.data.data;
        if (autoToast) {
          this.Utils.toast('success', '更新成功！');
        }
      })
      .finally(() => {
        this.showLoading = false;
      });
  }
  
}