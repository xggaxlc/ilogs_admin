import {
  AddArticleController
} from '../add/add.controller';

export class EditArticleController extends AddArticleController {
  constructor($scope, $rootScope, $timeout, $state, $mdDialog, Utils, AuthService, ApiService, $stateParams, $document, $mdSidenav, article) {
    'ngInject';
    super($scope, $rootScope, $timeout, $state, $mdDialog, Utils, AuthService, ApiService, $stateParams, $document, $mdSidenav);

    this.$rootScope.pageTitle = '编辑文章';

    this.article = article;
    this.categorySelected = this.article.category;
    this.markdown = article.md || '';

    this.$timeout(() => { 
      this.checkSummary();
    });

  }

  checkSummary() {
    // 判断自定义简介
    if (this.article.summary && !this.article.html) {
      this.custom_summary = true;
    } else if (this.article.html && ($(this.article.html).text().substring(0, this.summary_length) !== this.article.summary)) {
      this.custom_summary = true;
    } else {
      this.custom_summary = false;
    }
  }

}

EditArticleController.resolve = {
  article: (ApiService, Utils, $stateParams) => {
    'ngInject';
    Utils.showLoading();
    return ApiService.get(`post/${$stateParams.id}`)
      .then(res => {
        return res.data;
      })
      .finally(() => {
        Utils.hideLoading();
      });
  }
}