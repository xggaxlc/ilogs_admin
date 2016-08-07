export class AddArticleController {
  constructor($scope, $rootScope, $timeout, $http) {
    'ngInject';
    $rootScope.pageTitle = '新建文章';
    $scope.$emit('event:showNarrowMenu');
    this.$timeout = $timeout;
    this.$http = $http;
  }
  test() {}
}