export class AddArticleController {
  constructor($scope, $rootScope) {
    'ngInject';
    $rootScope.pageTitle = '新建文章';
    $scope.$emit('event:showNarrowMenu');

  }
  test() {}
}