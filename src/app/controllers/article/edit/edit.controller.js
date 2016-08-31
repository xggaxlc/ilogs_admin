import {
  AddArticleController
} from '../add/add.controller';

export class EditArticleController extends AddArticleController {
  constructor($scope, $rootScope, $timeout, $state, $mdDialog, Utils, AuthService, ApiService, $stateParams, $document, $mdSidenav) {
    'ngInject';
    super($scope, $rootScope, $timeout, $state, $mdDialog, Utils, AuthService, ApiService, $stateParams, $document, $mdSidenav);

    this.$rootScope.pageTitle = '编辑文章';

    this.$timeout(() => {
      this.queryArticle();
    });

  }

  queryArticle() {
    this.showLoading = true;
    this.$timeout(() => {
      this.ApiService.get(`post/${this.$stateParams.id}`)
        .then(res => {
          this.article = res.data;
          this.categorySelected = this.article.category;
          this.editor.setHTML(this.article.content);
          // 判断自定义简介
          if (this.article.summary && !this.article.content) {
            this.custom_summary = true;
          } else if (this.article.content && ($(this.article.content).text().substring(0, this.summary_length) !== this.article.summary)) {
            this.custom_summary = true;
          } else {
            this.custom_summary = false;
          }
        })
        .finally(() => {
          this.showLoading = false;
        });
    }, this.$rootScope.viewAnimateDelay);
  }

}