export function search($timeout, $state, $stateParams) {
  'ngInject';
  let directive = {
    restrict: 'EA',
    scope: {
      options: '='
    },
    link: linkFunc,
    template: `
      <div class="search-box" layout="row" layout-align="center center">
        <md-input-container ng-show="searchType.length > 1">
          <md-select ng-model="searchTypeSelected" aria-label="search select options">
            <md-option value="{{item.value}}" ng-repeat="item in searchType">{{item.name}}</md-option>
          </md-select>
        </md-input-container>
        <md-input-container md-no-float layout="row">
          <input type="text" ng-model="keyword" placeholder="{{placeholder}}" ng-keyup="search($event)" aria-label="search input">
          <md-icon class="search-btn" ng-click="search()">search</md-icon>
        </md-input-container>
      </div>
    `
  }

  return directive;

  function linkFunc(scope, ele, attr) {
    scope.searchType = scope.options.search;
    scope.searchTypeSelected = scope.searchType[0].value;
    scope.placeholder = attr.placeholder || '请输入关键字搜索';
    $timeout(() => {
      for (var i = 0; i < scope.searchType.length; i++) {
        if ($stateParams[scope.searchType[i].value]) {
          scope.keyword = $stateParams[scope.searchType[i].value];
          scope.searchTypeSelected = scope.searchType[i].value;
          return;
        }
      }
    });

    scope.search = function($event) {
      if ($event && $event.keyCode !== 13) return;
      angular.forEach(scope.searchType, item => {
        $stateParams[item.value] = null;
      });
      $stateParams.page = null;
      $stateParams[scope.searchTypeSelected] = scope.keyword;
      $state.go($state.current.name, $stateParams);
    }

  }

}