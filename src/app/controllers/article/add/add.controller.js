export class AddArticleController {
  constructor($scope, $rootScope, $timeout, $http, Utils, AuthService) {
    'ngInject';
    this.$scope = $scope;
    this.$rootScope = $rootScope;
    this.$timeout = $timeout;
    this.$http = $http;
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

  save() {
    this.showLoading = true;
    this.article.content = this.editor.getContent();
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

  delete() {

  }
  
}