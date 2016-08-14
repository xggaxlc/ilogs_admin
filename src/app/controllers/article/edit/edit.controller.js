import {
  AddArticleController
} from '../add/add.controller';

export class EditArticleController extends AddArticleController {
  constructor($scope, $rootScope, $timeout, $http, $state, $mdDialog, Utils, AuthService, $stateParams) {
    'ngInject';
    super($scope, $rootScope, $timeout, $http, $state, $mdDialog, Utils, AuthService);

    this.$stateParams = $stateParams;
  }

  init() {
    this.$scope.$emit('event:showNarrowMenu');
    this.$rootScope.pageTitle = '编辑文章';
    this.showLoading = true;
    this.$timeout(() => {
      this.$http.get(`post/${this.$stateParams.id}`)
        .then(res => {
          this.article = res.data.data;
          this.editor.setHTML(this.article.content);
        })
        .finally(() => {
          this.showLoading = false;
        });
    }, this.$rootScope.viewAnimateDelay);
  }

}